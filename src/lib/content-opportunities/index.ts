import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import {
  buildManualAnalysisBundle,
  BuildManualAnalysisBundleOptions,
  renderManualAnalysisPrompt,
} from './analyse-with-llm'
import { fetchGscComparison, type GscComparisonResult } from './fetch-gsc'
import { getExistingArticles } from './get-existing-articles'
import { fetchWebSignals } from './fetch-web-signals'
import { scoreContentOpportunities } from './score-opportunities'
import { scoreMarketOpportunities } from './score-market-opportunities'
import { DEFAULT_WEB_SOURCES } from './source-config'
import type { ExistingArticleSummary, ExternalContentSignal } from './types'

type RunContentOpportunityResearchOptions = {
  outputDir?: string
  candidateLimit?: number
}

export async function runContentOpportunityResearch(
  options: RunContentOpportunityResearchOptions = {},
) {
  const fetched: GscComparisonResult = await fetchGscComparison()
  const existingArticles: ExistingArticleSummary[] = await getExistingArticles()
  const webSignals = await fetchWebSignals(DEFAULT_WEB_SOURCES)
  const candidates = scoreContentOpportunities(fetched.currentRows, fetched.previousRows)
  const competitorSignals = webSignals.filter((signal) => signal.sourceType === 'competitor')
  const marketSignals = webSignals.filter((signal) => signal.sourceType === 'market')
  const marketOpportunities = scoreMarketOpportunities(webSignals)
  const bundle = buildManualAnalysisBundle({
    siteUrl: fetched.siteUrl,
    windows: fetched.windows,
    candidates,
    existingArticles,
    competitorSignals,
    marketSignals,
    marketOpportunities,
    candidateLimit: options.candidateLimit,
  } satisfies BuildManualAnalysisBundleOptions)
  const prompt = await renderManualAnalysisPrompt(bundle)
  const outputDir = path.resolve(
    options.outputDir ?? path.join(process.cwd(), 'tmp', 'content-opportunities'),
  )

  await mkdir(outputDir, { recursive: true })

  const bundlePath = path.join(outputDir, 'candidate-payload.json')
  const promptPath = path.join(outputDir, 'analysis-prompt.md')
  await writeFile(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  await writeFile(promptPath, prompt, 'utf8')

  return {
    siteUrl: fetched.siteUrl,
    windows: fetched.windows,
    currentRowCount: fetched.currentRows.length,
    previousRowCount: fetched.previousRows.length,
    candidateCount: candidates.length,
    exportedCandidateCount: bundle.gscCandidates.length,
    existingArticleCount: existingArticles.length,
    competitorSignalCount: competitorSignals.length,
    marketSignalCount: marketSignals.length,
    marketOpportunityCount: marketOpportunities.length,
    bundlePath,
    promptPath,
  }
}
