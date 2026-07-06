import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { inferThemes } from './fetch-web-signals'
import type { ExternalContentSignal, SocialPlatform, SocialSourceConfig } from './types'

const USER_AGENT = 'DeployTitanContentResearchBot/1.0 (+https://deploytitan.com)'
const CACHE_TTL_MS = Number(process.env.CONTENT_SOCIAL_CACHE_TTL_MS ?? 12 * 60 * 60 * 1000)
const DEFAULT_LOOKBACK_DAYS = Number(process.env.CONTENT_SOCIAL_LOOKBACK_DAYS ?? 30)

type Fetcher = (source: SocialSourceConfig) => Promise<ExternalContentSignal[]>

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>()
  const output: T[] = []

  for (const item of items) {
    const key = getKey(item)
    if (!key || seen.has(key)) continue
    seen.add(key)
    output.push(item)
  }

  return output
}

function stripHtml(value: string | null | undefined) {
  return String(value ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(value: string | null | undefined, maxLength = 420) {
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized || null
  return `${normalized.slice(0, maxLength - 1).trim()}...`
}

function buildSignal(input: {
  platform: SocialPlatform
  sourceName: string
  sourceUrl: string
  title: string
  url: string
  excerpt?: string | null
  publishedAt?: string | null
  community?: string | null
  authorHandle?: string | null
  query?: string | null
  contentKind?: string | null
  engagement?: ExternalContentSignal['engagement']
}): ExternalContentSignal | null {
  const title = stripHtml(input.title)
  const excerpt = truncate(stripHtml(input.excerpt))
  const searchable = `${title} ${excerpt ?? ''}`
  const matchedThemes = inferThemes(searchable)

  if (!title || matchedThemes.length === 0) return null

  return {
    sourceType: 'market',
    sourceName: input.sourceName,
    sourceUrl: input.sourceUrl,
    title,
    url: input.url,
    excerpt,
    publishedAt: input.publishedAt ?? null,
    matchedThemes,
    platform: input.platform,
    community: input.community ?? null,
    authorHandle: input.authorHandle ?? null,
    query: input.query ?? null,
    contentKind: input.contentKind ?? null,
    engagement: input.engagement ?? null,
    fetchedAt: new Date().toISOString(),
  }
}

function recentUnixSeconds(days = DEFAULT_LOOKBACK_DAYS) {
  return Math.floor((Date.now() - days * 24 * 60 * 60 * 1000) / 1000)
}

async function fetchJson<T>(url: string, init: RequestInit = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/json',
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`)
  }

  return response.json() as Promise<T>
}

function cachePathFor(source: SocialSourceConfig) {
  const safeName = `${source.platform}-${source.name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return path.join(process.cwd(), 'tmp', 'content-opportunities', 'social-cache', `${safeName}.json`)
}

async function readCachedSignals(source: SocialSourceConfig) {
  if (CACHE_TTL_MS <= 0) return null

  try {
    const cachePath = cachePathFor(source)
    const raw = await readFile(cachePath, 'utf8')
    const parsed = JSON.parse(raw) as { cachedAt?: string; signals?: ExternalContentSignal[] }
    const cachedAt = parsed.cachedAt ? Date.parse(parsed.cachedAt) : 0
    if (!Number.isFinite(cachedAt) || Date.now() - cachedAt > CACHE_TTL_MS) return null
    return parsed.signals ?? null
  } catch {
    return null
  }
}

async function writeCachedSignals(source: SocialSourceConfig, signals: ExternalContentSignal[]) {
  if (CACHE_TTL_MS <= 0) return

  try {
    const cachePath = cachePathFor(source)
    await mkdir(path.dirname(cachePath), { recursive: true })
    await writeFile(cachePath, `${JSON.stringify({ cachedAt: new Date().toISOString(), signals }, null, 2)}\n`, 'utf8')
  } catch {
    // Cache failures should never break research runs.
  }
}

async function fetchRedditAccessToken() {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  if (!clientId || !clientSecret) return null

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      authorization: `Basic ${credentials}`,
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': redditUserAgent(),
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) return null

  const body = (await response.json()) as { access_token?: string }
  return body.access_token ?? null
}

function redditUserAgent() {
  const username = process.env.REDDIT_USERNAME || process.env.REDDIT_USER || 'deploytitan'
  return `web:deploytitan-content-research:1.0.0 (by /u/${username})`
}

type RedditListing = {
  data?: {
    children?: Array<{
      data?: {
        title?: string
        selftext?: string
        permalink?: string
        url?: string
        subreddit_name_prefixed?: string
        author?: string
        created_utc?: number
        score?: number
        num_comments?: number
      }
    }>
  }
}

async function fetchRedditSignals(source: SocialSourceConfig) {
  const accessToken = await fetchRedditAccessToken()
  if (!accessToken) return []

  const communities = source.communities?.length ? source.communities : ['devops']
  const perQueryLimit = Math.max(3, Math.ceil((source.maxItems ?? 20) / Math.max(1, communities.length)))
  const signals: ExternalContentSignal[] = []

  for (const community of communities) {
    for (const query of source.queries.slice(0, 4)) {
      const params = new URLSearchParams({
        q: query,
        restrict_sr: '1',
        sort: 'relevance',
        t: 'month',
        limit: String(Math.min(10, perQueryLimit)),
      })
      const url = `https://oauth.reddit.com/r/${encodeURIComponent(community)}/search.json?${params.toString()}`

      try {
        const listing = await fetchJson<RedditListing>(url, {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'user-agent': redditUserAgent(),
          },
        })

        signals.push(
          ...(listing.data?.children ?? [])
            .map((child) => child.data)
            .filter(isDefined)
            .map((post) =>
              buildSignal({
                platform: 'reddit',
                sourceName: source.name,
                sourceUrl: `https://www.reddit.com/r/${community}/`,
                title: post.title ?? '',
                url: post.permalink ? `https://www.reddit.com${post.permalink}` : (post.url ?? `https://www.reddit.com/r/${community}/`),
                excerpt: post.selftext,
                publishedAt: post.created_utc ? new Date(post.created_utc * 1000).toISOString() : null,
                community: post.subreddit_name_prefixed ?? `r/${community}`,
                authorHandle: post.author ? `u/${post.author}` : null,
                query,
                contentKind: 'post',
                engagement: {
                  score: post.score ?? null,
                  comments: post.num_comments ?? null,
                },
              }),
            )
            .filter(isDefined),
        )
      } catch {
        continue
      }
    }
  }

  return uniqueBy(signals.filter(isDefined), (signal) => signal.url).slice(0, source.maxItems ?? 20)
}

type HackerNewsSearchResponse = {
  hits?: Array<{
    title?: string
    story_title?: string
    comment_text?: string
    url?: string
    story_url?: string
    objectID?: string
    story_id?: number
    author?: string
    created_at?: string
    points?: number
    num_comments?: number
    _tags?: string[]
  }>
}

async function fetchHackerNewsSignals(source: SocialSourceConfig) {
  const since = recentUnixSeconds()
  const signals: ExternalContentSignal[] = []
  const tags = source.tags?.length ? source.tags : ['story']

  for (const query of source.queries.slice(0, 6)) {
    for (const tag of tags) {
      const params = new URLSearchParams({
        query,
        tags: tag,
        numericFilters: `created_at_i>${since}`,
        hitsPerPage: '8',
      })
      const url = `https://hn.algolia.com/api/v1/search?${params.toString()}`

      try {
        const body = await fetchJson<HackerNewsSearchResponse>(url)
        signals.push(
          ...(body.hits ?? [])
            .map((hit) => {
              const id = hit.story_id ?? hit.objectID
              return buildSignal({
                platform: 'hacker-news',
                sourceName: source.name,
                sourceUrl: 'https://news.ycombinator.com/',
                title: hit.title ?? hit.story_title ?? stripHtml(hit.comment_text),
                url: hit.url ?? hit.story_url ?? (id ? `https://news.ycombinator.com/item?id=${id}` : 'https://news.ycombinator.com/'),
                excerpt: hit.comment_text,
                publishedAt: hit.created_at ?? null,
                community: 'Hacker News',
                authorHandle: hit.author ?? null,
                query,
                contentKind: tag === 'comment' || hit._tags?.includes('comment') ? 'comment' : 'story',
                engagement: {
                  score: hit.points ?? null,
                  comments: hit.num_comments ?? null,
                },
              })
            })
            .filter(isDefined),
        )
      } catch {
        continue
      }
    }
  }

  return uniqueBy(signals.filter(isDefined), (signal) => signal.url).slice(0, source.maxItems ?? 18)
}

type GitHubSearchResponse = {
  items?: Array<{
    html_url?: string
    title?: string
    body?: string
    state?: string
    comments?: number
    created_at?: string
    updated_at?: string
    user?: { login?: string }
    repository_url?: string
  }>
}

async function fetchGitHubSignals(source: SocialSourceConfig) {
  const repositories = source.repositories ?? []
  const signals: ExternalContentSignal[] = []
  const token = process.env.GITHUB_TOKEN

  for (const query of source.queries.slice(0, 5)) {
    for (const repository of repositories.slice(0, 4)) {
      const search = `${query} repo:${repository} is:issue created:>=${new Date(Date.now() - DEFAULT_LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}`
      const params = new URLSearchParams({
        q: search,
        sort: 'comments',
        order: 'desc',
        per_page: '4',
      })

      try {
        const body = await fetchJson<GitHubSearchResponse>(`https://api.github.com/search/issues?${params.toString()}`, {
          headers: {
            ...(token ? { authorization: `Bearer ${token}` } : {}),
            'x-github-api-version': '2022-11-28',
          },
        })

        signals.push(
          ...(body.items ?? [])
            .map((item) =>
              buildSignal({
                platform: 'github',
                sourceName: source.name,
                sourceUrl: 'https://github.com/search',
                title: item.title ?? '',
                url: item.html_url ?? 'https://github.com/search',
                excerpt: item.body,
                publishedAt: item.created_at ?? item.updated_at ?? null,
                community: item.repository_url?.replace('https://api.github.com/repos/', '') ?? repository,
                authorHandle: item.user?.login ?? null,
                query,
                contentKind: 'issue',
                engagement: {
                  comments: item.comments ?? null,
                },
              }),
            )
            .filter(isDefined),
        )
      } catch {
        continue
      }
    }
  }

  return uniqueBy(signals.filter(isDefined), (signal) => signal.url).slice(0, source.maxItems ?? 18)
}

type StackExchangeResponse = {
  items?: Array<{
    title?: string
    link?: string
    tags?: string[]
    owner?: { display_name?: string }
    creation_date?: number
    last_activity_date?: number
    score?: number
    answer_count?: number
    view_count?: number
  }>
}

async function fetchStackExchangeSignals(source: SocialSourceConfig) {
  const signals: ExternalContentSignal[] = []
  const key = process.env.STACK_EXCHANGE_KEY

  for (const query of source.queries.slice(0, 6)) {
    const params = new URLSearchParams({
      order: 'desc',
      sort: 'activity',
      q: query,
      site: 'stackoverflow',
      pagesize: '12',
      fromdate: String(recentUnixSeconds()),
      filter: 'default',
      ...(key ? { key } : {}),
    })

    try {
      const body = await fetchJson<StackExchangeResponse>(`https://api.stackexchange.com/2.3/search/advanced?${params.toString()}`)
      signals.push(
        ...(body.items ?? [])
          .map((item) =>
            buildSignal({
              platform: 'stack-exchange',
              sourceName: source.name,
              sourceUrl: 'https://stackoverflow.com/',
              title: item.title ?? '',
              url: item.link ?? 'https://stackoverflow.com/',
              excerpt: item.tags?.join(', ') ?? null,
              publishedAt: item.creation_date ? new Date(item.creation_date * 1000).toISOString() : null,
              community: 'Stack Overflow',
              authorHandle: item.owner?.display_name ?? null,
              query,
              contentKind: 'question',
              engagement: {
                score: item.score ?? null,
                comments: item.answer_count ?? null,
                views: item.view_count ?? null,
              },
            }),
          )
          .filter(isDefined),
      )
    } catch {
      continue
    }
  }

  return uniqueBy(signals.filter(isDefined), (signal) => signal.url).slice(0, source.maxItems ?? 16)
}

type XSearchResponse = {
  data?: Array<{
    id?: string
    text?: string
    author_id?: string
    created_at?: string
    public_metrics?: {
      retweet_count?: number
      reply_count?: number
      like_count?: number
      quote_count?: number
      impression_count?: number
    }
  }>
}

async function fetchXSignals(source: SocialSourceConfig) {
  const token = process.env.X_BEARER_TOKEN
  if (!token) return []

  const signals: ExternalContentSignal[] = []

  for (const query of source.queries.slice(0, 4)) {
    const params = new URLSearchParams({
      query: `${query} lang:en -is:retweet`,
      max_results: '10',
      'tweet.fields': 'created_at,public_metrics,author_id',
    })

    try {
      const body = await fetchJson<XSearchResponse>(`https://api.x.com/2/tweets/search/recent?${params.toString()}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      signals.push(
        ...(body.data ?? [])
          .map((post) =>
            buildSignal({
              platform: 'x',
              sourceName: source.name,
              sourceUrl: 'https://x.com/search',
              title: post.text ?? '',
              url: post.id ? `https://x.com/i/web/status/${post.id}` : 'https://x.com/search',
              excerpt: null,
              publishedAt: post.created_at ?? null,
              community: 'X',
              authorHandle: post.author_id ?? null,
              query,
              contentKind: 'post',
              engagement: {
                reposts: post.public_metrics?.retweet_count ?? null,
                comments: post.public_metrics?.reply_count ?? null,
                reactions: (post.public_metrics?.like_count ?? 0) + (post.public_metrics?.quote_count ?? 0),
                views: post.public_metrics?.impression_count ?? null,
              },
            }),
          )
          .filter(isDefined),
      )
    } catch {
      continue
    }
  }

  return uniqueBy(signals.filter(isDefined), (signal) => signal.url).slice(0, source.maxItems ?? 12)
}

const FETCHERS: Record<SocialPlatform, Fetcher> = {
  reddit: fetchRedditSignals,
  'hacker-news': fetchHackerNewsSignals,
  github: fetchGitHubSignals,
  'stack-exchange': fetchStackExchangeSignals,
  x: fetchXSignals,
}

async function fetchSignalsForSource(source: SocialSourceConfig) {
  if (source.enabled === false) return []

  const cached = await readCachedSignals(source)
  if (cached) return cached

  const fetcher = FETCHERS[source.platform]
  const signals = await fetcher(source)
  await writeCachedSignals(source, signals)
  return signals
}

export async function fetchSocialSignals(sources: SocialSourceConfig[]) {
  const results = await Promise.all(sources.map((source) => fetchSignalsForSource(source)))
  return results.flat()
}
