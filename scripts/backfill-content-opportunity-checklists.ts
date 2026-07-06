import './load-dotenv'

import process from 'node:process'

import { createSanityWriteClient } from '../src/lib/content-opportunities/save-opportunities'
import { defaultOpportunityChecklist } from '../src/sanity/lib/workflowDefaults'

async function main() {
  const client = createSanityWriteClient()
  const opportunities = await client.fetch<Array<{ _id: string; title?: string }>>(
    '*[_type == "contentOpportunity" && (!defined(workflowChecklist) || count(workflowChecklist) == 0)]{_id, title}',
  )

  if (!opportunities.length) {
    console.log('No content opportunities need workflow checklist backfill.')
    return
  }

  for (const opportunity of opportunities) {
    await client
      .patch(opportunity._id)
      .set({ workflowChecklist: defaultOpportunityChecklist() })
      .commit()

    console.log(`Backfilled workflow checklist for ${opportunity._id} (${opportunity.title ?? 'Untitled'})`)
  }

  console.log(`Backfilled ${opportunities.length} content opportunity checklist(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
