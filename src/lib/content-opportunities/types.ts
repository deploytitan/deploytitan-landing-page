import { z } from 'zod'

export const opportunityTypeSchema = z.enum(['new-article', 'refresh', 'ctr', 'internal-link'])

export type OpportunityType = z.infer<typeof opportunityTypeSchema>

export type ResearchWindow = {
  startDate: string
  endDate: string
  label: 'current' | 'previous'
}

export type GscMetricRow = {
  query: string
  page: string | null
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export type GscComparisonRow = {
  query: string
  page: string | null
  current: GscMetricRow
  previous: GscMetricRow
}

export type OpportunityBucket =
  | 'striking-distance'
  | 'high-impression-low-ctr'
  | 'growing-query'
  | 'refresh-candidate'

export type MarketThemeId =
  | 'deployment-impact-analysis'
  | 'change-intelligence'
  | 'opentelemetry-observability'
  | 'progressive-delivery'
  | 'release-safety'
  | 'post-deployment-verification'
  | 'blast-radius-analysis'
  | 'ai-software-delivery-risk'
  | 'platform-engineering'

export interface ScoredOpportunityCandidate {
  query: string
  page: string | null
  bucket: OpportunityBucket
  score: number
  summary: string
  current: GscMetricRow
  previous: GscMetricRow
  supportingQueries: string[]
}

export interface ExistingArticleSummary {
  _id: string
  title: string
  slug: string | null
  excerpt: string | null
  primaryKeyword: string | null
  relatedQuestions: string[]
  topicCluster: {
    name: string | null
    slug: string | null
  } | null
}

export const manualOpportunitySchema = z.object({
  proposedTitle: z.string().trim().min(1),
  opportunityType: opportunityTypeSchema,
  primaryQuery: z.string().trim().min(1),
  supportingQueries: z.array(z.string().trim().min(1)).optional().default([]),
  sourcePage: z.string().trim().url().nullable().optional().default(null),
  matchedArticleSlug: z.string().trim().min(1).nullable().optional().default(null),
  score: z.coerce.number().finite().min(0).max(100),
  productPillar: z.string().trim().min(1),
  reasoning: z.string().trim().min(1),
  uniqueAngle: z.string().trim().min(1),
  outline: z.array(z.string().trim().min(1)).optional().default([]),
  metrics: z
    .object({
      clicks: z.coerce.number().finite().optional().default(0),
      impressions: z.coerce.number().finite().optional().default(0),
      ctr: z.coerce.number().finite().optional().default(0),
      position: z.coerce.number().finite().optional().default(0),
      previousClicks: z.coerce.number().finite().optional().default(0),
      previousImpressions: z.coerce.number().finite().optional().default(0),
      previousCtr: z.coerce.number().finite().optional().default(0),
      previousPosition: z.coerce.number().finite().optional().default(0),
    })
    .optional(),
})

export type ManualOpportunity = z.infer<typeof manualOpportunitySchema>

export const manualOpportunityResponseSchema = z.object({
  opportunities: z.array(manualOpportunitySchema),
})

export type ManualOpportunityResponse = z.infer<typeof manualOpportunityResponseSchema>

export interface ManualAnalysisBundle {
  generatedAt: string
  siteUrl: string
  windows: {
    current: ResearchWindow
    previous: ResearchWindow
  }
  existingArticles: ExistingArticleSummary[]
  gscCandidates: Array<{
    query: string
    page: string | null
    bucket: OpportunityBucket
    score: number
    summary: string
    supportingQueries: string[]
    metrics: {
      clicks: number
      impressions: number
      ctr: number
      position: number
      previousClicks: number
      previousImpressions: number
      previousCtr: number
      previousPosition: number
    }
  }>
  competitorSignals: ExternalContentSignal[]
  marketSignals: ExternalContentSignal[]
  marketOpportunities: MarketOpportunityCandidate[]
}

export type SourceType = 'competitor' | 'market'

export type SocialPlatform = 'reddit' | 'x' | 'hacker-news' | 'github' | 'stack-exchange'

export interface WebSourceConfig {
  name: string
  url: string
  type: SourceType
  tags: string[]
  maxItems?: number
}

export interface SocialSourceConfig {
  platform: SocialPlatform
  name: string
  queries: string[]
  communities?: string[]
  repositories?: string[]
  tags?: string[]
  maxItems?: number
  enabled?: boolean
}

export interface SignalEngagement {
  score?: number | null
  comments?: number | null
  reactions?: number | null
  reposts?: number | null
  views?: number | null
}

export interface ExternalContentSignal {
  sourceType: SourceType
  sourceName: string
  sourceUrl: string
  title: string
  url: string
  excerpt: string | null
  publishedAt: string | null
  matchedThemes: MarketThemeId[]
  platform?: SocialPlatform | null
  community?: string | null
  authorHandle?: string | null
  query?: string | null
  contentKind?: string | null
  engagement?: SignalEngagement | null
  fetchedAt?: string | null
}

export interface MarketOpportunityCandidate {
  theme: MarketThemeId
  label: string
  productPillar: string
  score: number
  summary: string
  sourceTypes: SourceType[]
  sourceNames: string[]
  signalCount: number
  exampleTitles: string[]
}
