import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type {
  ExternalContentSignal,
  ExistingArticleSummary,
  ManualAnalysisBundle,
  MarketOpportunityCandidate,
  ManualOpportunityResponse,
  ResearchWindow,
  ScoredOpportunityCandidate,
} from './types'
import { manualOpportunityResponseSchema } from './types'

export interface BuildManualAnalysisBundleOptions {
  generatedAt?: string
  siteUrl: string
  windows: {
    current: ResearchWindow
    previous: ResearchWindow
  }
  candidates: ScoredOpportunityCandidate[]
  existingArticles: ExistingArticleSummary[]
  competitorSignals: ExternalContentSignal[]
  marketSignals: ExternalContentSignal[]
  marketOpportunities: MarketOpportunityCandidate[]
  candidateLimit?: number
}

export async function loadOpportunityPrompt() {
  const promptPath = path.join(process.cwd(), 'prompts', 'content-opportunity-analysis.md')
  return readFile(promptPath, 'utf8')
}

export function buildManualAnalysisBundle(
  options: BuildManualAnalysisBundleOptions,
): ManualAnalysisBundle {
  const limitedCandidates = options.candidates.slice(0, options.candidateLimit ?? 20)

  return {
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    siteUrl: options.siteUrl,
    windows: options.windows,
    existingArticles: options.existingArticles,
    gscCandidates: limitedCandidates.map((candidate) => ({
      query: candidate.query,
      page: candidate.page,
      bucket: candidate.bucket,
      score: candidate.score,
      summary: candidate.summary,
      supportingQueries: candidate.supportingQueries,
      metrics: {
        clicks: candidate.current.clicks,
        impressions: candidate.current.impressions,
        ctr: candidate.current.ctr,
        position: candidate.current.position,
        previousClicks: candidate.previous.clicks,
        previousImpressions: candidate.previous.impressions,
        previousCtr: candidate.previous.ctr,
        previousPosition: candidate.previous.position,
      },
    })),
    competitorSignals: options.competitorSignals,
    marketSignals: options.marketSignals,
    marketOpportunities: options.marketOpportunities,
  }
}

export async function renderManualAnalysisPrompt(bundle: ManualAnalysisBundle) {
  const prompt = await loadOpportunityPrompt()

  return `${prompt.trim()}\n\nPayload:\n\n\`\`\`json\n${JSON.stringify(bundle, null, 2)}\n\`\`\`\n`
}

export function parseManualOpportunityResponse(input: unknown): ManualOpportunityResponse {
  return manualOpportunityResponseSchema.parse(input)
}
