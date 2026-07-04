import './load-dotenv'

import { readFile } from 'node:fs/promises'
import process from 'node:process'

import { saveManualOpportunities } from '@/lib/content-opportunities/save-opportunities'
import { parseManualOpportunityResponse } from '@/lib/content-opportunities/analyse-with-llm'

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    throw new Error('Usage: pnpm content:import-opportunities <path-to-json>')
  }

  const raw = await readFile(filePath, 'utf8')
  const payload = parseManualOpportunityResponse(JSON.parse(raw))

  if (!payload.opportunities.length) {
    console.log('No opportunities found in input payload.')
    return
  }

  const documentIds = await saveManualOpportunities(payload.opportunities)

  for (const [index, opportunity] of payload.opportunities.entries()) {
    const documentId = documentIds[index]
    if (!documentId) continue
    console.log(`Upserted ${documentId} for query "${opportunity.primaryQuery}"`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
