export type ReferenceLike = {
  _ref?: string
} | null

type ResearchEvidenceValidationRecord = {
  _id: string
  visibility?: 'internal' | 'public' | 'publicSummaryOnly' | null
  publicSummary?: string | null
} | null

type ContentBriefValidationRecord = {
  _id: string
  directAnswer?: string | null
  thesis?: string | null
  ctaGoal?: string | null
  primaryKeyword?: string | null
  targetPersona?: { name?: string | null } | null
  outline?: unknown[] | null
  researchEvidence?: ReferenceLike[] | null
} | null

type ValidationContextLike = {
  getClient?: (options: { apiVersion: string }) => {
    fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
  }
}

const PUBLIC_PROOF_READY_STATUSES = new Set(['publicationReady', 'scheduled', 'published'])

function refIds(refs: ReferenceLike[] | null | undefined) {
  return (refs ?? []).map((entry) => String(entry?._ref ?? '').trim()).filter(Boolean)
}

export function isProofReadyStatus(status?: string | null) {
  return PUBLIC_PROOF_READY_STATUSES.has(String(status ?? ''))
}

async function fetchEvidenceRecords(context: ValidationContextLike, evidenceIds: string[]) {
  if (!evidenceIds.length || !context.getClient) return []

  const client = context.getClient({ apiVersion: '2025-01-01' })
  return client.fetch<ResearchEvidenceValidationRecord[]>(
    `*[_type == "researchEvidence" && _id in $ids]{
      _id,
      visibility,
      publicSummary
    }`,
    { ids: evidenceIds },
  )
}

export async function hasClassifiedEvidence(
  context: ValidationContextLike,
  evidenceRefs: ReferenceLike[] | null | undefined,
): Promise<
  | {
      ok: false
      publishableEvidenceCount: 0
      message: string
    }
  | {
      ok: true
      publishableEvidenceCount: number
      message: null
    }
> {
  const evidenceIds = refIds(evidenceRefs)
  if (!evidenceIds.length) {
    return {
      ok: false,
      publishableEvidenceCount: 0,
      message: 'Link at least one research evidence item.',
    }
  }

  const records = await fetchEvidenceRecords(context, evidenceIds)
  const visibilityById = new Map(records.map((record) => [record?._id ?? '', record]))
  const unclassified = evidenceIds.filter((id) => {
    const record = visibilityById.get(id)
    return !record?.visibility
  })

  if (unclassified.length) {
    return {
      ok: false,
      publishableEvidenceCount: 0,
      message: 'Classify every linked research evidence item for visibility before advancing.',
    }
  }

  const invalidSummaries = records.filter(
    (record) =>
      record?.visibility === 'publicSummaryOnly' && !String(record.publicSummary ?? '').trim(),
  )

  if (invalidSummaries.length) {
    return {
      ok: false,
      publishableEvidenceCount: 0,
      message: 'Public-summary evidence needs a sanitized public summary before it can be used.',
    }
  }

  return {
    ok: true,
    publishableEvidenceCount: records.filter(
      (record) => record?.visibility === 'public' || record?.visibility === 'publicSummaryOnly',
    ).length,
    message: null,
  }
}

export async function fetchContentBriefValidationRecord(
  context: ValidationContextLike,
  contentBriefRef?: ReferenceLike,
) {
  const briefId = String(contentBriefRef?._ref ?? '').trim()
  if (!briefId || !context.getClient) return null

  const client = context.getClient({ apiVersion: '2025-01-01' })
  return client.fetch<ContentBriefValidationRecord>(
    `*[_type == "contentBrief" && _id == $id][0]{
      _id,
      directAnswer,
      thesis,
      ctaGoal,
      primaryKeyword,
      targetPersona,
      outline,
      researchEvidence
    }`,
    { id: briefId },
  )
}

export async function validateBriefReadiness(
  context: ValidationContextLike,
  brief:
    | {
        directAnswer?: string | null
        thesis?: string | null
        ctaGoal?: string | null
        primaryKeyword?: string | null
        targetPersona?: { name?: string | null } | null
        outline?: unknown[] | null
        researchEvidence?: ReferenceLike[] | null
      }
    | undefined,
): Promise<true | string> {
  if (!brief) return 'Brief-ready briefs require a content brief payload.'
  if (!String(brief.directAnswer ?? '').trim()) return 'Brief-ready briefs require a direct answer.'
  if (!String(brief.thesis ?? '').trim()) return 'Brief-ready briefs require a thesis.'
  if (!String(brief.ctaGoal ?? '').trim()) return 'Brief-ready briefs require a CTA goal.'
  if (!brief.targetPersona?.name) return 'Brief-ready briefs require a target persona.'
  if (!String(brief.primaryKeyword ?? '').trim()) return 'Brief-ready briefs require a primary keyword.'
  if (!(brief.outline ?? []).length) return 'Brief-ready briefs require an outline.'

  const evidenceResult = await hasClassifiedEvidence(context, brief.researchEvidence)
  if (!evidenceResult.ok) return evidenceResult.message

  return true
}
