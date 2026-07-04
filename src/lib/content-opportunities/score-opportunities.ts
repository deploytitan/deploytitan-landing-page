import type { GscComparisonRow, GscMetricRow, ScoredOpportunityCandidate } from './types'

const BRANDED_QUERY_PATTERNS = [/deploytitan/i]
const IRRELEVANT_QUERY_PATTERNS = [
  /\bfacebook\b/i,
  /\byoutube\b/i,
  /\btwitter\b/i,
  /\blinkedin\b/i,
  /\binstagram\b/i,
  /\bjobs?\b/i,
  /\bsalary\b/i,
  /\bmeaning\b/i,
  /\bdefinition\b/i,
]

function normalizeQuery(query: string) {
  return query.trim().toLowerCase().replace(/\s+/g, ' ')
}

function normalizePage(page: string | null) {
  return page?.trim().toLowerCase() ?? ''
}

function metricKey(row: Pick<GscMetricRow, 'query' | 'page'>) {
  return `${normalizeQuery(row.query)}::${normalizePage(row.page)}`
}

function zeroMetricRow(query: string, page: string | null): GscMetricRow {
  return {
    query,
    page,
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
  }
}

function combineRows(currentRows: GscMetricRow[], previousRows: GscMetricRow[]): GscComparisonRow[] {
  const currentByKey = new Map(currentRows.map((row) => [metricKey(row), row]))
  const previousByKey = new Map(previousRows.map((row) => [metricKey(row), row]))
  const keys = new Set([...currentByKey.keys(), ...previousByKey.keys()])

  return [...keys].map((key) => {
    const current = currentByKey.get(key)
    const previous = previousByKey.get(key)
    const query = current?.query ?? previous?.query ?? ''
    const page = current?.page ?? previous?.page ?? null

    return {
      query,
      page,
      current: current ?? zeroMetricRow(query, page),
      previous: previous ?? zeroMetricRow(query, page),
    }
  })
}

function isBrandedQuery(query: string) {
  return BRANDED_QUERY_PATTERNS.some((pattern) => pattern.test(query))
}

function isIrrelevantQuery(query: string) {
  return IRRELEVANT_QUERY_PATTERNS.some((pattern) => pattern.test(query))
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function pickBucket(row: GscComparisonRow) {
  const { current, previous, page } = row
  const impressionGrowthRatio =
    previous.impressions > 0 ? (current.impressions - previous.impressions) / previous.impressions : current.impressions > 0 ? 1 : 0
  const ctrDrop = previous.ctr - current.ctr

  if (page && current.impressions >= 25 && current.position >= 3 && current.position <= 20 && current.ctr <= 0.04) {
    return 'refresh-candidate' as const
  }

  if (current.impressions >= 40 && current.position >= 4 && current.position <= 15) {
    return 'striking-distance' as const
  }

  if (current.impressions >= 60 && current.position <= 12 && current.ctr <= 0.025) {
    return 'high-impression-low-ctr' as const
  }

  if (current.impressions >= 25 && (impressionGrowthRatio >= 0.35 || ctrDrop <= -0.01 || current.clicks > previous.clicks + 3)) {
    return 'growing-query' as const
  }

  return null
}

function buildSummary(row: GscComparisonRow, bucket: NonNullable<ReturnType<typeof pickBucket>>) {
  const { current, previous } = row
  const positionDelta = previous.position > 0 ? round(previous.position - current.position) : null
  const impressionDelta = round(current.impressions - previous.impressions)
  const ctrDelta = round((current.ctr - previous.ctr) * 100)

  if (bucket === 'striking-distance') {
    return `Ranks near page one with ${current.impressions} impressions and avg position ${round(current.position)}.`
  }

  if (bucket === 'high-impression-low-ctr') {
    return `Visible query with ${current.impressions} impressions, ${round(current.ctr * 100)}% CTR, and avg position ${round(current.position)}.`
  }

  if (bucket === 'refresh-candidate') {
    return `Existing page opportunity with ${current.impressions} impressions, ${round(current.ctr * 100)}% CTR, and ${positionDelta ?? 0} positions of movement versus prior window.`
  }

  return `Momentum query with ${impressionDelta} impression change and ${ctrDelta}% CTR movement versus the prior window.`
}

function scoreCandidate(row: GscComparisonRow, bucket: NonNullable<ReturnType<typeof pickBucket>>) {
  const { current, previous, page } = row
  const impressionScore = clamp(Math.log10(current.impressions + 1) * 16, 0, 26)
  const clicksScore = clamp(Math.log10(current.clicks + 1) * 8, 0, 12)
  const positionScore =
    current.position > 0 && current.position <= 20 ? clamp((20 - current.position) * 1.4, 0, 20) : 0
  const ctrGapScore =
    current.position > 0 && current.position <= 15 ? clamp((0.06 - current.ctr) * 220, 0, 18) : 0
  const growthScore =
    previous.impressions > 0
      ? clamp(((current.impressions - previous.impressions) / previous.impressions) * 18, -5, 18)
      : current.impressions > 0
        ? 8
        : 0
  const pageScore = page ? 7 : 0
  const bucketBonus =
    bucket === 'refresh-candidate'
      ? 14
      : bucket === 'striking-distance'
        ? 12
        : bucket === 'high-impression-low-ctr'
          ? 10
          : 8

  return clamp(Math.round(impressionScore + clicksScore + positionScore + ctrGapScore + growthScore + pageScore + bucketBonus), 0, 100)
}

export function scoreContentOpportunities(currentRows: GscMetricRow[], previousRows: GscMetricRow[]) {
  const combinedRows = combineRows(currentRows, previousRows)
  const filteredRows = combinedRows.filter((row) => {
    const normalized = normalizeQuery(row.query)
    const totalImpressions = row.current.impressions + row.previous.impressions

    if (!normalized) return false
    if (isBrandedQuery(normalized) || isIrrelevantQuery(normalized)) return false
    if (totalImpressions < 20) return false

    return true
  })

  const candidates: ScoredOpportunityCandidate[] = filteredRows
    .map((row) => {
      const bucket = pickBucket(row)
      if (!bucket) return null

      return {
        query: row.query,
        page: row.page,
        bucket,
        score: scoreCandidate(row, bucket),
        summary: buildSummary(row, bucket),
        current: row.current,
        previous: row.previous,
        supportingQueries: [row.query],
      }
    })
    .filter((candidate): candidate is ScoredOpportunityCandidate => Boolean(candidate))
    .sort((left, right) => right.score - left.score || right.current.impressions - left.current.impressions)

  return dedupeCandidates(candidates)
}

function dedupeCandidates(candidates: ScoredOpportunityCandidate[]) {
  const seen = new Set<string>()
  const deduped: ScoredOpportunityCandidate[] = []

  for (const candidate of candidates) {
    const queryKey = normalizeQuery(candidate.query)
    const compactKey = queryKey.replace(/\b(an?|the|for|to|of|in|on|and)\b/g, '').replace(/\s+/g, ' ').trim()
    const pageKey = normalizePage(candidate.page)
    const dedupeKey = `${compactKey}::${pageKey}`

    if (seen.has(dedupeKey)) continue
    seen.add(dedupeKey)
    deduped.push(candidate)
  }

  return deduped
}
