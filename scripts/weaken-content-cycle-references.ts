import './load-dotenv'

import process from 'node:process'

import { createSanityWriteClient } from '../src/lib/content-opportunities/save-opportunities'

type Reference = {
  _key?: string
  _ref?: string
  _type?: string
  _weak?: boolean
}

type PipelineDocument = {
  _id: string
  _type: string
  article?: Reference | null
  articles?: Reference[] | null
  contentBrief?: Reference | null
  contentOpportunity?: Reference | null
  matchedArticle?: Reference | null
  publicEvidence?: Reference[] | null
  relatedArticles?: Reference[] | null
  researchEvidence?: Reference[] | null
}

const cycleReferenceQuery = `*[
  _type in ["article", "contentBrief", "contentOpportunity", "marketQuestion", "researchEvidence"]
]{
  _id,
  _type,
  article,
  articles,
  contentBrief,
  contentOpportunity,
  matchedArticle,
  publicEvidence,
  relatedArticles,
  researchEvidence
}`

const weakReferenceFieldsByType: Record<string, Array<keyof PipelineDocument>> = {
  article: ['contentBrief', 'contentOpportunity', 'publicEvidence', 'relatedArticles'],
  contentBrief: ['articles', 'contentOpportunity', 'researchEvidence'],
  contentOpportunity: ['article', 'matchedArticle', 'researchEvidence'],
  marketQuestion: ['article'],
  researchEvidence: ['article', 'contentOpportunity'],
}

function weakenReference(reference: Reference | null | undefined) {
  if (!reference?._ref || reference._weak) return reference

  return {
    ...reference,
    _weak: true,
  }
}

function weakenReferenceArray(references: Reference[] | null | undefined) {
  if (!references?.length) return references
  return references.map((reference) => weakenReference(reference))
}

function addWeakPatch(set: Record<string, unknown>, field: keyof PipelineDocument, value: unknown) {
  const nextValue = Array.isArray(value)
    ? weakenReferenceArray(value)
    : weakenReference(value as Reference | null | undefined)

  const changed = Array.isArray(nextValue)
    ? nextValue.some((reference, index) => reference?._weak !== (value as Reference[])[index]?._weak)
    : (nextValue as Reference | null | undefined)?._weak !== (value as Reference | null | undefined)?._weak

  if (changed) {
    set[field] = nextValue
  }
}

async function main() {
  const client = createSanityWriteClient()
  const documents = await client.fetch<PipelineDocument[]>(cycleReferenceQuery)
  let repairedCount = 0

  for (const document of documents) {
    const fields = weakReferenceFieldsByType[document._type] ?? []
    const set: Record<string, unknown> = {}

    for (const field of fields) {
      addWeakPatch(set, field, document[field])
    }

    if (!Object.keys(set).length) continue

    await client.patch(document._id).set(set).commit()
    repairedCount += 1
    console.log(`Weakened cycle references in ${document._type} ${document._id}`)
  }

  console.log(`Weakened references in ${repairedCount} of ${documents.length} scanned document(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
