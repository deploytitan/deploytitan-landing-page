import { createHash } from 'node:crypto'
import process from 'node:process'

import { createClient } from 'next-sanity'

import { defaultOpportunityChecklist } from '../../sanity/lib/workflowDefaults'
import type { ManualOpportunity } from './types'

function getEnv(name: string, fallbackName?: string) {
  return process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
}

function requireEnv(name: string, fallbackName?: string) {
  const value = getEnv(name, fallbackName)
  if (!value) {
    throw new Error(`Missing required environment variable: ${fallbackName ? `${name} or ${fallbackName}` : name}`)
  }

  return value
}

export function createOpportunityId(primaryQuery: string, opportunityType: string) {
  const digest = createHash('sha256')
    .update(`${opportunityType}::${primaryQuery.trim().toLowerCase()}`)
    .digest('hex')
    .slice(0, 20)

  return `contentOpportunity.${digest}`
}

export function createSanityWriteClient() {
  return createClient({
    projectId: requireEnv('SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: requireEnv('SANITY_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: getEnv('SANITY_API_VERSION', 'NEXT_PUBLIC_SANITY_API_VERSION') ?? '2026-07-05',
    useCdn: false,
    token: requireEnv('SANITY_API_WRITE_TOKEN'),
    perspective: 'published',
  })
}

export async function findArticleIdBySlug(
  client: ReturnType<typeof createClient>,
  slug: string,
): Promise<string | null> {
  return client.fetch(`*[_type == "article" && slug.current == $slug][0]._id`, { slug })
}

export async function saveManualOpportunities(opportunities: ManualOpportunity[]) {
  const client = createSanityWriteClient()
  const results: string[] = []

  for (const opportunity of opportunities) {
    const documentId = createOpportunityId(opportunity.primaryQuery, opportunity.opportunityType)
    const existing = await client.fetch<{
      status?: string
      workflowChecklist?: unknown[] | null
    } | null>(`*[_id == $id][0]{status, workflowChecklist}`, { id: documentId })
    const matchedArticleId = opportunity.matchedArticleSlug
      ? await findArticleIdBySlug(client, opportunity.matchedArticleSlug)
      : null

    await client.createOrReplace({
      _id: documentId,
      _type: 'contentOpportunity',
      title: opportunity.proposedTitle,
      status: existing?.status && existing.status !== 'discovered' ? existing.status : 'discovered',
      opportunityType: opportunity.opportunityType,
      primaryQuery: opportunity.primaryQuery,
      supportingQueries: opportunity.supportingQueries ?? [],
      score: Math.max(0, Math.min(100, Math.round(opportunity.score))),
      productPillar: opportunity.productPillar,
      reasoning: opportunity.reasoning,
      uniqueAngle: opportunity.uniqueAngle,
      outline: opportunity.outline ?? [],
      source: 'manual-llm-review',
      sourcePage: opportunity.sourcePage ?? null,
      matchedArticle: matchedArticleId ? { _type: 'reference', _ref: matchedArticleId } : undefined,
      metrics: opportunity.metrics,
      workflowChecklist: existing?.workflowChecklist?.length
        ? existing.workflowChecklist
        : defaultOpportunityChecklist(),
      generatedAt: new Date().toISOString(),
    })

    results.push(documentId)
  }

  return results
}
