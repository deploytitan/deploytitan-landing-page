import process from 'node:process'

import { google } from 'googleapis'

import type { ReviewWindow, TrackedArticleRecord } from './types'

type SearchMetrics = {
  searchClicks: number
  searchImpressions: number
  searchCtr: number
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

function startOfUtcDay(value = new Date()) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()))
}

function getEnv(name: string) {
  return process.env[name]
}

function requireEnv(name: string) {
  const value = getEnv(name)
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function getWindow(reviewWindow: ReviewWindow) {
  const reference = startOfUtcDay(new Date())
  const laggedEnd = addDays(reference, -4)
  const days = reviewWindow === '7d' ? 6 : 29
  const startDate = addDays(laggedEnd, -days)

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(laggedEnd),
  }
}

async function createSearchConsoleClient() {
  const serviceAccountJson = getEnv('GOOGLE_SERVICE_ACCOUNT_JSON')

  if (serviceAccountJson) {
    const credentials = JSON.parse(serviceAccountJson) as {
      client_email?: string
      private_key?: string
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })

    return google.webmasters({ version: 'v3', auth })
  }

  const clientId = requireEnv('GOOGLE_CLIENT_ID')
  const clientSecret = requireEnv('GOOGLE_CLIENT_SECRET')
  const refreshToken = requireEnv('GOOGLE_REFRESH_TOKEN')
  const auth = new google.auth.OAuth2(clientId, clientSecret)
  auth.setCredentials({ refresh_token: refreshToken })
  return google.webmasters({ version: 'v3', auth })
}

function canonicalCandidates(article: TrackedArticleRecord) {
  const canonicalUrl = article.seo?.canonicalUrl
  const root = getEnv('NEXT_PUBLIC_SITE_URL') || 'https://deploytitan.com'
  const generated = `${root.replace(/\/$/, '')}/blog/${article.slug.current}/`
  return [...new Set([canonicalUrl, generated, generated.replace(/\/$/, '')].filter(Boolean) as string[])]
}

export async function fetchSearchConsoleMetrics(
  articles: TrackedArticleRecord[],
  reviewWindow: ReviewWindow,
): Promise<Map<string, SearchMetrics>> {
  const siteUrl = getEnv('GSC_SITE_URL')
  if (!siteUrl || !articles.length) return new Map()

  const searchconsole = await createSearchConsoleClient()
  const window = getWindow(reviewWindow)
  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: window.startDate,
      endDate: window.endDate,
      dimensions: ['page'],
      type: 'web',
      rowLimit: 25000,
    },
  })

  const rows = response.data.rows ?? []
  const rowByPage = new Map(
    rows.map((row) => [
      String(row.keys?.[0] ?? ''),
      {
        searchClicks: Number(row.clicks ?? 0),
        searchImpressions: Number(row.impressions ?? 0),
        searchCtr: Number(row.ctr ?? 0),
      },
    ]),
  )

  const metricsByArticleId = new Map<string, SearchMetrics>()
  for (const article of articles) {
    const match = canonicalCandidates(article)
      .map((candidate) => rowByPage.get(candidate))
      .find(Boolean)

    metricsByArticleId.set(article._id, match ?? {
      searchClicks: 0,
      searchImpressions: 0,
      searchCtr: 0,
    })
  }

  return metricsByArticleId
}
