import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import {
  buildManualAnalysisBundle,
  BuildManualAnalysisBundleOptions,
  renderManualAnalysisPrompt,
} from './analyse-with-llm'
import { fetchGscComparison, type GscComparisonResult } from './fetch-gsc'
import { fetchSocialSignals } from './fetch-social-signals'
import { getExistingArticles } from './get-existing-articles'
import { fetchWebSignals } from './fetch-web-signals'
import { scoreContentOpportunities } from './score-opportunities'
import { scoreMarketOpportunities } from './score-market-opportunities'
import { DEFAULT_SOCIAL_SOURCES } from './social-source-config'
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
  const socialSignals = await fetchSocialSignals(DEFAULT_SOCIAL_SOURCES)
  const combinedSignals = [...webSignals, ...socialSignals]
  const candidates = scoreContentOpportunities(fetched.currentRows, fetched.previousRows)
  const competitorSignals = combinedSignals.filter((signal) => signal.sourceType === 'competitor')
  const marketSignals = combinedSignals.filter((signal) => signal.sourceType === 'market')
  const marketOpportunities = scoreMarketOpportunities(combinedSignals)
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
  const socialEvidencePath = path.join(outputDir, 'social-evidence.json')
  await writeFile(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  await writeFile(promptPath, prompt, 'utf8')
  await writeFile(socialEvidencePath, `${JSON.stringify(socialSignals, null, 2)}\n`, 'utf8')

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
    socialSignalCount: socialSignals.length,
    marketOpportunityCount: marketOpportunities.length,
    bundlePath,
    promptPath,
    socialEvidencePath,
  }
}
