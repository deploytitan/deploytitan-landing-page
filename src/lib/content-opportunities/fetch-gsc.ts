import process from 'node:process'

import { google } from 'googleapis'

import type { GscMetricRow, ResearchWindow } from './types'

const COMPLETE_DATA_LAG_DAYS = 3
const WINDOW_DAYS = 28
const DEFAULT_ROW_LIMIT = 25000

export interface GscComparisonResult {
  siteUrl: string
  windows: {
    current: ResearchWindow
    previous: ResearchWindow
  }
  currentRows: GscMetricRow[]
  previousRows: GscMetricRow[]
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

function getResearchWindows(referenceDate = new Date()): { current: ResearchWindow; previous: ResearchWindow } {
  const reference = startOfUtcDay(referenceDate)
  const currentEnd = addDays(reference, -COMPLETE_DATA_LAG_DAYS - 1)
  const currentStart = addDays(currentEnd, -(WINDOW_DAYS - 1))
  const previousEnd = addDays(currentStart, -1)
  const previousStart = addDays(previousEnd, -(WINDOW_DAYS - 1))

  return {
    current: {
      label: 'current',
      startDate: formatDate(currentStart),
      endDate: formatDate(currentEnd),
    },
    previous: {
      label: 'previous',
      startDate: formatDate(previousStart),
      endDate: formatDate(previousEnd),
    },
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

async function fetchWindowRows(siteUrl: string, window: ResearchWindow): Promise<GscMetricRow[]> {
  const searchconsole = await createSearchConsoleClient()
  const rows: GscMetricRow[] = []
  let startRow = 0

  while (true) {
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: window.startDate,
        endDate: window.endDate,
        dimensions: ['query', 'page'],
        rowLimit: DEFAULT_ROW_LIMIT,
        startRow,
      },
    })

    const batch = response.data.rows ?? []
    rows.push(
      ...batch.map((row) => ({
        query: String(row.keys?.[0] ?? '').trim(),
        page: row.keys?.[1] ? String(row.keys[1]).trim() : null,
        clicks: Number(row.clicks ?? 0),
        impressions: Number(row.impressions ?? 0),
        ctr: Number(row.ctr ?? 0),
        position: Number(row.position ?? 0),
      })),
    )

    if (batch.length < DEFAULT_ROW_LIMIT) break
    startRow += DEFAULT_ROW_LIMIT
  }

  return rows.filter((row) => row.query)
}

export async function fetchGscComparison(referenceDate = new Date()): Promise<GscComparisonResult> {
  const siteUrl = requireEnv('GSC_SITE_URL')
  const windows = getResearchWindows(referenceDate)

  const [currentRows, previousRows] = await Promise.all([
    fetchWindowRows(siteUrl, windows.current),
    fetchWindowRows(siteUrl, windows.previous),
  ])

  return {
    siteUrl,
    windows,
    currentRows,
    previousRows,
  }
}
