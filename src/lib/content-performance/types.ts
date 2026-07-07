export type ReviewWindow = '7d' | '30d'

export type TrackedArticleRecord = {
  _id: string
  title: string
  slug: { current: string }
  seo?: {
    canonicalUrl?: string | null
  } | null
  status?: string | null
  publishedAt?: string | null
  primaryKeyword?: string | null
  targetPersona?: {
    name?: string | null
  } | null
  topicCluster?: {
    name?: string | null
  } | null
  contentOpportunity?: {
    _ref?: string
  } | null
  kpiTarget?: ContentKpiTarget | null
}

export type ContentKpiTarget = {
  primaryMetric: 'searchImpressions' | 'searchClicks' | 'searchCtr' | 'newsletterSignups' | 'researchCtaClicks'
  targetValue: number
  reviewWindowDays?: number
  notes?: string
}

export type ArticleSnapshotMetrics = {
  views: number
  uniqueVisitors: number
  avgTimeOnPageSeconds: number
  scroll50Count: number
  scroll90Count: number
  newsletterSignups: number
  researchCtaClicks: number
  interviewRequests: number
  shares: number
  outboundToolClicks: number
  searchClicks: number
  searchImpressions: number
  searchCtr: number
}

export type ArticlePerformanceInput = {
  article: TrackedArticleRecord
  reviewWindow: ReviewWindow
  captureDate: string
  metrics: ArticleSnapshotMetrics
  notes?: string
}

export type KpiEvaluation = {
  title: string
  signalType: 'search' | 'distribution' | 'refresh'
  summary: string
  recommendedAction: string
  confidenceScore: number
  confidenceLabel: 'Low' | 'Medium' | 'High'
}
