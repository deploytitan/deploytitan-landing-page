import './load-dotenv'

import process from 'node:process'

import { syncContentPerformance } from '@/lib/content-performance'
import type { ReviewWindow } from '@/lib/content-performance/types'

function readArg(name: string) {
  const index = process.argv.findIndex((argument) => argument === name)
  if (index === -1) return undefined
  return process.argv[index + 1]
}

function resolveReviewWindow(): ReviewWindow {
  const arg = readArg('--window')
  return arg === '7d' ? '7d' : '30d'
}

async function main() {
  const reviewWindow = resolveReviewWindow()
  const result = await syncContentPerformance(reviewWindow)

  console.log(`Synced ${result.articleCount} published article(s) for ${result.reviewWindow}.`)
  console.log(`Snapshots written: ${result.results.length}`)
  console.log(`Insights written: ${result.results.filter((entry) => entry.insightId).length}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
