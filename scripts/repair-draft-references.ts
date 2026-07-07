import './load-dotenv'

import process from 'node:process'

import { createSanityWriteClient } from '../src/lib/content-opportunities/save-opportunities'

type Reference = {
  _key?: string
  _ref?: string
  _type?: string
}

type PipelineDocument = {
  _id: string
  _type: string
  article?: Reference | null
  articles?: Reference[] | null
  contentOpportunity?: Reference | null
  distributionAsset?: Reference | null
  hubArticle?: Reference | null
  marketQuestion?: Reference | null
  matchedArticle?: Reference | null
  publicEvidence?: Reference[] | null
  researchEvidence?: Reference[] | null
  snapshot?: Reference | null
}

const draftReferenceQuery = `*[
  _type in [
    "article",
    "articlePerformanceSnapshot",
    "contentBrief",
    "contentInsight",
    "contentOpportunity",
    "distributionAsset",
    "distributionAssetPerformanceSnapshot",
    "marketQuestion",
    "researchEvidence"
  ] && (
    article._ref match "drafts.*" ||
    contentOpportunity._ref match "drafts.*" ||
    distributionAsset._ref match "drafts.*" ||
    hubArticle._ref match "drafts.*" ||
    marketQuestion._ref match "drafts.*" ||
    matchedArticle._ref match "drafts.*" ||
    snapshot._ref match "drafts.*" ||
    count(articles[_ref match "drafts.*"]) > 0 ||
    count(publicEvidence[_ref match "drafts.*"]) > 0 ||
    count(researchEvidence[_ref match "drafts.*"]) > 0
  )
]{
  _id,
  _type,
  article,
  articles,
  contentOpportunity,
  distributionAsset,
  hubArticle,
  marketQuestion,
  matchedArticle,
  publicEvidence,
  researchEvidence,
  snapshot
}`

function toPublishedRef(ref: Reference | null | undefined) {
  if (!ref?._ref?.startsWith('drafts.')) return ref

  return {
    ...ref,
    _ref: ref._ref.replace(/^drafts\./, ''),
  }
}

function normalizeReferenceArray(refs: Reference[] | null | undefined) {
  if (!refs?.length) return refs
  return refs.map((ref) => toPublishedRef(ref))
}

function addReferencePatch(set: Record<string, unknown>, field: keyof PipelineDocument, value: Reference | null | undefined) {
  const nextValue = toPublishedRef(value)
  if (nextValue?._ref !== value?._ref) {
    set[field] = nextValue
  }
}

function addReferenceArrayPatch(
  set: Record<string, unknown>,
  field: keyof PipelineDocument,
  value: Reference[] | null | undefined,
) {
  const nextValue = normalizeReferenceArray(value)
  const changed = nextValue?.some((ref, index) => ref?._ref !== value?.[index]?._ref) ?? false

  if (changed) {
    set[field] = nextValue
  }
}

async function main() {
  const client = createSanityWriteClient()
  const documents = await client.fetch<PipelineDocument[]>(draftReferenceQuery)

  if (!documents.length) {
    console.log('No draft references found.')
    return
  }

  for (const document of documents) {
    const set: Record<string, unknown> = {}

    addReferencePatch(set, 'article', document.article)
    addReferencePatch(set, 'contentOpportunity', document.contentOpportunity)
    addReferencePatch(set, 'distributionAsset', document.distributionAsset)
    addReferencePatch(set, 'hubArticle', document.hubArticle)
    addReferencePatch(set, 'marketQuestion', document.marketQuestion)
    addReferencePatch(set, 'matchedArticle', document.matchedArticle)
    addReferencePatch(set, 'snapshot', document.snapshot)
    addReferenceArrayPatch(set, 'articles', document.articles)
    addReferenceArrayPatch(set, 'publicEvidence', document.publicEvidence)
    addReferenceArrayPatch(set, 'researchEvidence', document.researchEvidence)

    if (!Object.keys(set).length) continue

    await client.patch(document._id).set(set).commit()
    console.log(`Repaired draft references in ${document._type} ${document._id}`)
  }

  console.log(`Scanned ${documents.length} document(s) with draft references.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
