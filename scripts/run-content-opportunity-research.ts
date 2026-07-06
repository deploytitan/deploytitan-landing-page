import './load-dotenv'

import process from 'node:process'

import { runContentOpportunityResearch } from '@/lib/content-opportunities'

function readArg(name: string) {
  const index = process.argv.findIndex((argument) => argument === name)
  if (index === -1) return undefined
  return process.argv[index + 1]
}

async function main() {
  const outputDir = readArg('--output-dir')
  const candidateLimit = Number(readArg('--candidate-limit') ?? 20)
  const result = await runContentOpportunityResearch({
    outputDir,
    candidateLimit: Number.isFinite(candidateLimit) ? candidateLimit : 20,
  })

  console.log(`Search Console site: ${result.siteUrl}`)
  console.log(
    `Current window: ${result.windows.current.startDate} to ${result.windows.current.endDate} (${result.currentRowCount} rows)`,
  )
  console.log(
    `Previous window: ${result.windows.previous.startDate} to ${result.windows.previous.endDate} (${result.previousRowCount} rows)`,
  )
  console.log(`Scored candidates: ${result.candidateCount}`)
  console.log(`Candidates exported for review: ${result.exportedCandidateCount}`)
  console.log(`Existing article records loaded: ${result.existingArticleCount}`)
  console.log(`Competitor signals collected: ${result.competitorSignalCount}`)
  console.log(`Market signals collected: ${result.marketSignalCount}`)
  console.log(`Social signals collected: ${result.socialSignalCount}`)
  console.log(`Combined market opportunities scored: ${result.marketOpportunityCount}`)
  console.log(`Prompt written to: ${result.promptPath}`)
  console.log(`Payload written to: ${result.bundlePath}`)
  console.log(`Social evidence written to: ${result.socialEvidencePath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
