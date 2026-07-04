import type { ExternalContentSignal, MarketThemeId, WebSourceConfig } from './types'

const USER_AGENT = 'DeployTitanContentResearchBot/1.0 (+https://deploytitan.com)'

const THEME_PATTERNS: Array<{ id: MarketThemeId; patterns: RegExp[] }> = [
  {
    id: 'deployment-impact-analysis',
    patterns: [/\bdeployment impact\b/i, /\brelease impact\b/i, /\bchange impact\b/i],
  },
  {
    id: 'change-intelligence',
    patterns: [
      /\bchange intelligence\b/i,
      /\bchange analysis\b/i,
      /\bsoftware delivery knowledge graph\b/i,
    ],
  },
  {
    id: 'opentelemetry-observability',
    patterns: [/\bopentelemetry\b/i, /\botelemetry\b/i, /\bobservability\b/i, /\btraces?\b/i],
  },
  {
    id: 'progressive-delivery',
    patterns: [
      /\bprogressive delivery\b/i,
      /\bfeature flags?\b/i,
      /\bcanary\b/i,
      /\bblue[- ]green\b/i,
    ],
  },
  {
    id: 'release-safety',
    patterns: [/\brelease safety\b/i, /\bsafer releases?\b/i, /\brollback\b/i, /\brollouts?\b/i],
  },
  {
    id: 'post-deployment-verification',
    patterns: [/\bpost[- ]deployment\b/i, /\bverification\b/i, /\bregression\b/i, /\bincident\b/i],
  },
  {
    id: 'blast-radius-analysis',
    patterns: [
      /\bblast radius\b/i,
      /\bdependency graph\b/i,
      /\bservice map\b/i,
      /\bmicroservice\b/i,
    ],
  },
  {
    id: 'ai-software-delivery-risk',
    patterns: [/\bai\b/i, /\bllm\b/i, /\bagent(ic)?\b/i, /\bsoftware delivery\b/i],
  },
  {
    id: 'platform-engineering',
    patterns: [
      /\bplatform engineering\b/i,
      /\bdeveloper portal\b/i,
      /\binternal developer portal\b/i,
    ],
  },
]

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

function stripTags(value: string) {
  return decodeEntities(
    value
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function absolutizeUrl(baseUrl: string, candidate: string) {
  try {
    return new URL(candidate, baseUrl).toString()
  } catch {
    return candidate
  }
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

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

function scoreTitle(title: string) {
  const normalized = title.toLowerCase()
  let score = 0

  if (normalized.length >= 20) score += 2
  if (
    /\b(deploy|delivery|release|flag|canary|otel|telemetry|observability|platform|incident|verification|rollback|regression)\b/i.test(
      title,
    )
  ) {
    score += 4
  }
  if (/[?:-]/.test(title)) score += 1

  return score
}

function extractFeedUrl(baseUrl: string, html: string) {
  const match = html.match(
    /<link[^>]+type=["']application\/(?:rss\+xml|atom\+xml)["'][^>]+href=["']([^"']+)["'][^>]*>/i,
  )
  if (!match?.[1]) return null
  return absolutizeUrl(baseUrl, match[1])
}

function extractXmlTagValue(source: string, tagName: string) {
  const match = source.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))
  return match?.[1] ? stripTags(match[1]) : null
}

function extractAtomLink(entry: string) {
  const hrefMatch = entry.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/?>/i)
  return hrefMatch?.[1] ? decodeEntities(hrefMatch[1]) : null
}

function parseFeedItems(
  feedUrl: string,
  xml: string,
  source: WebSourceConfig,
): ExternalContentSignal[] {
  const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi)
  const entryMatches = xml.match(/<entry\b[\s\S]*?<\/entry>/gi)
  const chunks = itemMatches ?? entryMatches ?? []

  return uniqueBy(
    chunks
      .map((chunk) => {
        const title = extractXmlTagValue(chunk, 'title')
        const link = itemMatches ? extractXmlTagValue(chunk, 'link') : extractAtomLink(chunk)
        const excerpt =
          extractXmlTagValue(chunk, 'description') ??
          extractXmlTagValue(chunk, 'summary') ??
          extractXmlTagValue(chunk, 'content')
        const publishedAt =
          extractXmlTagValue(chunk, 'pubDate') ??
          extractXmlTagValue(chunk, 'published') ??
          extractXmlTagValue(chunk, 'updated')

        if (!title || !link) return null

        return {
          sourceType: source.type,
          sourceName: source.name,
          sourceUrl: source.url,
          title,
          url: absolutizeUrl(feedUrl, link),
          excerpt,
          publishedAt,
          matchedThemes: inferThemes(`${title} ${excerpt ?? ''}`),
        } satisfies ExternalContentSignal
      })
      .filter((item): item is ExternalContentSignal => Boolean(item))
      .sort((left, right) => scoreTitle(right.title) - scoreTitle(left.title))
      .slice(0, source.maxItems ?? 8),
    (item) => item.url,
  )
}

function extractHtmlSignals(html: string, source: WebSourceConfig): ExternalContentSignal[] {
  const matches = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]

  return uniqueBy(
    matches
      .map((match) => {
        const href = match[1]
        const text = stripTags(match[2] ?? '')
        if (text.length < 18) return null
        if (!/[a-z]/i.test(text)) return null
        if (/^(learn more|read more|blog|docs|events|contact|login|sign in)$/i.test(text))
          return null

        const url = absolutizeUrl(source.url, href)
        return {
          sourceType: source.type,
          sourceName: source.name,
          sourceUrl: source.url,
          title: text,
          url,
          excerpt: null,
          publishedAt: null,
          matchedThemes: inferThemes(text),
        } satisfies ExternalContentSignal
      })
      .filter(isDefined)
      .sort((left, right) => scoreTitle(right.title) - scoreTitle(left.title))
      .slice(0, (source.maxItems ?? 8) * 2),
    (item) => item.url,
  )
    .filter((item) => item.matchedThemes.length > 0)
    .slice(0, source.maxItems ?? 8)
}

export function inferThemes(text: string): MarketThemeId[] {
  return THEME_PATTERNS.filter((theme) => theme.patterns.some((pattern) => pattern.test(text))).map(
    (theme) => theme.id,
  )
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(12000),
  })

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`)
  }

  return response.text()
}

async function fetchSignalsForSource(source: WebSourceConfig): Promise<ExternalContentSignal[]> {
  try {
    const html = await fetchText(source.url)
    const feedUrl = extractFeedUrl(source.url, html)

    if (feedUrl) {
      const feed = await fetchText(feedUrl)
      const feedSignals = parseFeedItems(feedUrl, feed, source)
      if (feedSignals.length > 0) return feedSignals
    }

    return extractHtmlSignals(html, source)
  } catch {
    return [] as ExternalContentSignal[]
  }
}

export async function fetchWebSignals(
  sources: WebSourceConfig[],
): Promise<ExternalContentSignal[]> {
  const results = await Promise.all(sources.map((source) => fetchSignalsForSource(source)))
  return results.flat()
}
