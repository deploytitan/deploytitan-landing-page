import process from 'node:process'

import type { ReviewWindow, TrackedArticleRecord } from './types'

type PosthogMetrics = {
  scroll50Count: number
  scroll90Count: number
  newsletterSignups: number
  researchCtaClicks: number
  interviewRequests: number
  shares: number
  outboundToolClicks: number
}

function getEnv(name: string) {
  return process.env[name]
}

function getDateRange(reviewWindow: ReviewWindow) {
  return reviewWindow === '7d'
    ? { interval: 'INTERVAL 7 DAY', label: '7d' }
    : { interval: 'INTERVAL 30 DAY', label: '30d' }
}

function escapeSqlString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export async function fetchPosthogMetrics(
  articles: TrackedArticleRecord[],
  reviewWindow: ReviewWindow,
): Promise<Map<string, PosthogMetrics>> {
  const host = getEnv('NEXT_PUBLIC_POSTHOG_HOST')
  const projectId = getEnv('POSTHOG_PROJECT_ID')
  const apiKey = getEnv('POSTHOG_PERSONAL_API_KEY')

  if (!host || !projectId || !apiKey || !articles.length) {
    return new Map()
  }

  const slugs = articles.map((article) => article.slug.current).filter(Boolean)
  if (!slugs.length) return new Map()

  const dateRange = getDateRange(reviewWindow)
  const slugList = slugs.map((slug) => `'${escapeSqlString(slug)}'`).join(', ')

  const query = `
    select
      properties.articleSlug as articleSlug,
      countIf(event = 'article50PercentRead') as scroll50Count,
      countIf(event = 'article90PercentRead') as scroll90Count,
      countIf(event = 'newsletterSignup') as newsletterSignups,
      countIf(event = 'researchCtaClicked') as researchCtaClicks,
      countIf(event = 'interviewRequested') as interviewRequests,
      countIf(event = 'articleShared') as shares,
      countIf(event = 'outboundToolLinkClicked') as outboundToolClicks
    from events
    where timestamp >= now() - ${dateRange.interval}
      and properties.articleSlug in (${slugList})
    group by articleSlug
  `

  const response = await fetch(`${host.replace(/\/$/, '')}/api/projects/${projectId}/query/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      name: `deploytitan article content metrics ${dateRange.label}`,
      query: {
        kind: 'HogQLQuery',
        query,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`PostHog query failed with status ${response.status}`)
  }

  const payload = (await response.json()) as {
    results?: {
      columns?: string[]
      results?: Array<Array<string | number | null>>
    }
  }

  const columns = payload.results?.columns ?? []
  const rows = payload.results?.results ?? []
  const indexByColumn = new Map(columns.map((column, index) => [column, index]))
  const metricsBySlug = new Map<string, PosthogMetrics>()

  for (const row of rows) {
    const slug = String(row[indexByColumn.get('articleSlug') ?? -1] ?? '')
    if (!slug) continue

    metricsBySlug.set(slug, {
      scroll50Count: Number(row[indexByColumn.get('scroll50Count') ?? -1] ?? 0),
      scroll90Count: Number(row[indexByColumn.get('scroll90Count') ?? -1] ?? 0),
      newsletterSignups: Number(row[indexByColumn.get('newsletterSignups') ?? -1] ?? 0),
      researchCtaClicks: Number(row[indexByColumn.get('researchCtaClicks') ?? -1] ?? 0),
      interviewRequests: Number(row[indexByColumn.get('interviewRequests') ?? -1] ?? 0),
      shares: Number(row[indexByColumn.get('shares') ?? -1] ?? 0),
      outboundToolClicks: Number(row[indexByColumn.get('outboundToolClicks') ?? -1] ?? 0),
    })
  }

  return metricsBySlug
}
