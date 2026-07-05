import process from 'node:process'

import { google } from 'googleapis'

import type { ReviewWindow, TrackedArticleRecord } from './types'

type Ga4PageMetrics = {
  views: number
  uniqueVisitors: number
  avgTimeOnPageSeconds: number
}

function getEnv(name: string, fallbackName?: string) {
  return process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
}

function requireEnv(name: string, fallbackName?: string) {
  const value = getEnv(name, fallbackName)
  if (!value) {
    throw new Error(`Missing required environment variable: ${fallbackName ? `${name} or ${fallbackName}` : name}`)
  }

  return value
}

function getDateRange(reviewWindow: ReviewWindow) {
  return reviewWindow === '7d'
    ? { startDate: '7daysAgo', endDate: 'today' }
    : { startDate: '30daysAgo', endDate: 'today' }
}

async function createGoogleClient() {
  const serviceAccountJson = getEnv('GOOGLE_SERVICE_ACCOUNT_JSON')

  if (serviceAccountJson) {
    const credentials = JSON.parse(serviceAccountJson) as {
      client_email?: string
      private_key?: string
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/analytics.readonly',
        'https://www.googleapis.com/auth/webmasters.readonly',
      ],
    })

    return auth
  }

  const clientId = requireEnv('GOOGLE_CLIENT_ID')
  const clientSecret = requireEnv('GOOGLE_CLIENT_SECRET')
  const refreshToken = requireEnv('GOOGLE_REFRESH_TOKEN')
  const auth = new google.auth.OAuth2(clientId, clientSecret)
  auth.setCredentials({ refresh_token: refreshToken })
  return auth
}

function articlePath(article: TrackedArticleRecord) {
  return `/blog/${article.slug.current}`
}

export async function fetchGa4PageMetrics(
  articles: TrackedArticleRecord[],
  reviewWindow: ReviewWindow,
): Promise<Map<string, Ga4PageMetrics>> {
  if (!articles.length) return new Map()

  const propertyId = getEnv('GA4_PROPERTY_ID')
  if (!propertyId) return new Map()

  const auth = await createGoogleClient()
  const analyticsData = google.analyticsdata({
    version: 'v1beta',
    auth,
  })

  const pagePaths = articles.map(articlePath)
  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'views' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
      ],
      dateRanges: [getDateRange(reviewWindow)],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          inListFilter: {
            values: pagePaths,
          },
        },
      },
      limit: `${Math.max(articles.length, 1)}`,
      keepEmptyRows: true,
    },
  })

  const metricsByPath = new Map<string, Ga4PageMetrics>()

  for (const row of response.data.rows ?? []) {
    const path = String(row.dimensionValues?.[0]?.value ?? '')
    const views = Number(row.metricValues?.[0]?.value ?? 0)
    const uniqueVisitors = Number(row.metricValues?.[1]?.value ?? 0)
    const avgTimeOnPageSeconds = Number(row.metricValues?.[2]?.value ?? 0)

    metricsByPath.set(path, {
      views,
      uniqueVisitors,
      avgTimeOnPageSeconds,
    })
  }

  return metricsByPath
}
