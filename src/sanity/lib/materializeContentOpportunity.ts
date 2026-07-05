import { createHash } from 'node:crypto'

import type { SanityClient } from 'sanity'
import { defaultArticleChecklist, defaultBriefChecklist } from './workflowDefaults'

type Reference = {
  _key?: string
  _ref: string
  _type: 'reference'
}

type KpiTarget = {
  primaryMetric?: string
  targetValue?: number
  reviewWindowDays?: number
  notes?: string
} | null

export type ContentOpportunityRecord = {
  _id: string
  _type: 'contentOpportunity'
  title?: string
  status?: string
  opportunityType?: string
  primaryQuery?: string
  supportingQueries?: string[]
  score?: number
  reasoning?: string
  uniqueAngle?: string
  outline?: string[]
  productPillar?: string
  source?: string
  sourcePage?: string | null
  matchedArticle?: Reference | null
  marketQuestion?: Reference | null
  researchEvidence?: Reference[] | null
  contentBrief?: Reference | null
  article?: Reference | null
  kpiTarget?: KpiTarget
  metrics?: {
    clicks?: number
    impressions?: number
    ctr?: number
    position?: number
    previousClicks?: number
    previousImpressions?: number
    previousCtr?: number
    previousPosition?: number
  } | null
}

type MaterializeResult = {
  marketQuestionId: string
  researchEvidenceIds: string[]
  contentBriefId: string
  articleId: string | null
}

function createDeterministicId(prefix: string, ...parts: string[]) {
  const digest = createHash('sha256')
    .update(parts.join('::'))
    .digest('hex')
    .slice(0, 20)

  return `${prefix}.${digest}`
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function summarizeMetrics(opportunity: ContentOpportunityRecord) {
  const metrics = opportunity.metrics
  if (!metrics) return ''

  const parts = [
    `current clicks ${Math.round(metrics.clicks ?? 0)}`,
    `current impressions ${Math.round(metrics.impressions ?? 0)}`,
    `current CTR ${(((metrics.ctr ?? 0) as number) * 100).toFixed(2)}%`,
    `current position ${Number(metrics.position ?? 0).toFixed(1)}`,
  ]

  if ((metrics.previousImpressions ?? 0) > 0 || (metrics.previousClicks ?? 0) > 0) {
    parts.push(
      `previous clicks ${Math.round(metrics.previousClicks ?? 0)}`,
      `previous impressions ${Math.round(metrics.previousImpressions ?? 0)}`,
      `previous CTR ${(((metrics.previousCtr ?? 0) as number) * 100).toFixed(2)}%`,
      `previous position ${Number(metrics.previousPosition ?? 0).toFixed(1)}`,
    )
  }

  return parts.join(', ')
}

function buildTopicCluster(productPillar?: string | null) {
  const name = String(productPillar ?? '').trim()
  if (!name) return undefined

  return {
    name,
    slug: {
      _type: 'slug' as const,
      current: slugify(name),
    },
    description: `Cluster derived from content opportunity pillar: ${name}.`,
  }
}

function buildTargetPersona(productPillar?: string | null) {
  const pillar = String(productPillar ?? '').toLowerCase()

  if (pillar.includes('release') || pillar.includes('deployment')) {
    return {
      name: 'Engineering leaders reducing release risk',
      seniority: 'Staff+',
      team: 'Platform / SRE / DevOps',
      painPoints: [
        'Too many deploys lack fast blast-radius understanding',
        'Post-release regressions take too long to isolate',
      ],
    }
  }

  if (pillar.includes('openTelemetry'.toLowerCase()) || pillar.includes('observability')) {
    return {
      name: 'Observability and platform engineers',
      seniority: 'Senior+',
      team: 'Platform / Observability',
      painPoints: [
        'Telemetry exists but is not tied directly to release decisions',
        'Dependency analysis is too manual during incidents',
      ],
    }
  }

  return {
    name: 'Platform-minded engineering teams',
    seniority: 'Senior+',
    team: 'Platform / DevOps',
    painPoints: [
      'Hard to prove what changed after a release',
      'Content and product narratives are not yet aligned to operational pain',
    ],
  }
}

function buildKpiTarget(opportunity: ContentOpportunityRecord) {
  if (opportunity.kpiTarget?.primaryMetric && typeof opportunity.kpiTarget.targetValue === 'number') {
    return opportunity.kpiTarget
  }

  if (opportunity.opportunityType === 'ctr') {
    return {
      primaryMetric: 'searchCtr',
      targetValue: Math.max(0.03, (opportunity.metrics?.ctr ?? 0) + 0.01),
      reviewWindowDays: 30,
      notes: 'Default CTR target derived from a CTR-focused opportunity.',
    }
  }

  if (opportunity.opportunityType === 'refresh') {
    return {
      primaryMetric: 'searchClicks',
      targetValue: Math.max(100, Math.round((opportunity.metrics?.clicks ?? 0) * 2)),
      reviewWindowDays: 60,
      notes: 'Default click target for refresh opportunities.',
    }
  }

  return {
    primaryMetric: 'searchImpressions',
    targetValue: 10000,
    reviewWindowDays: 90,
    notes: 'Default growth target for newly identified content opportunities.',
  }
}

function buildPrimaryQuestion(opportunity: ContentOpportunityRecord) {
  const query = String(opportunity.primaryQuery ?? '').trim()
  if (!query) return String(opportunity.title ?? 'Untitled opportunity')

  if (query.endsWith('?')) return query
  if (/^(what|why|how|when|where|which|who)\b/i.test(query)) return `${query}?`
  return `How should engineering teams approach ${query}?`
}

function buildOutlineSections(opportunity: ContentOpportunityRecord) {
  return (opportunity.outline ?? [])
    .map((heading) => String(heading ?? '').trim())
    .filter(Boolean)
    .map((heading) => ({
      _key: slugify(heading).slice(0, 32) || Math.random().toString(36).slice(2, 10),
      _type: 'articleOutlineSection' as const,
      heading,
      notes: [opportunity.uniqueAngle, opportunity.reasoning].map((value) => String(value ?? '').trim()).filter(Boolean),
    }))
}

function reference(_ref: string): Reference {
  return {
    _key: createDeterministicId('ref', _ref).replace(/^ref\./, ''),
    _type: 'reference',
    _ref,
  }
}

async function appendUniqueReferences(
  client: SanityClient,
  documentId: string,
  fieldName: string,
  refs: string[],
) {
  const existingDocument = await client.fetch<Record<string, Array<{ _ref?: string }> | null> | null>(
    `*[_id == $id][0]{researchEvidence, contentBriefs, articles}`,
    { id: documentId },
  )
  const existing = existingDocument?.[fieldName] ?? null

  const existingRefs = new Set((existing ?? []).map((entry) => String(entry?._ref ?? '')).filter(Boolean))
  const nextRefs = [...existingRefs]
  for (const refId of refs) {
    if (!existingRefs.has(refId)) {
      nextRefs.push(refId)
      existingRefs.add(refId)
    }
  }

  await client.patch(documentId).set({
    [fieldName]: nextRefs.map((refId) => reference(refId)),
  }).commit()
}

export async function materializeContentOpportunity(
  client: SanityClient,
  opportunity: ContentOpportunityRecord,
): Promise<MaterializeResult> {
  const opportunityTitle = String(opportunity.title ?? opportunity.primaryQuery ?? 'Untitled opportunity').trim()
  const primaryQuery = String(opportunity.primaryQuery ?? opportunityTitle).trim()
  const kpiTarget = buildKpiTarget(opportunity)

  const marketQuestionId =
    opportunity.marketQuestion?._ref ?? createDeterministicId('marketQuestion', opportunity._id, primaryQuery)
  const contentBriefId =
    opportunity.contentBrief?._ref ?? createDeterministicId('contentBrief', opportunity._id, primaryQuery)
  const gscEvidenceId = createDeterministicId('researchEvidence', opportunity._id, 'gsc')
  const sourceEvidenceId = opportunity.sourcePage
    ? createDeterministicId('researchEvidence', opportunity._id, 'source')
    : null

  const researchEvidenceIds = [gscEvidenceId, sourceEvidenceId].filter((value): value is string => Boolean(value))
  const articleId =
    opportunity.opportunityType === 'new-article'
      ? opportunity.article?._ref ?? createDeterministicId('article', opportunity._id, primaryQuery)
      : opportunity.article?._ref ?? opportunity.matchedArticle?._ref ?? null

  const primaryQuestion = buildPrimaryQuestion(opportunity)
  const topicCluster = buildTopicCluster(opportunity.productPillar)
  const targetPersona = buildTargetPersona(opportunity.productPillar)
  const directAnswer = String(opportunity.uniqueAngle ?? opportunity.reasoning ?? '').trim().slice(0, 600) || opportunityTitle
  const metricsSummary = summarizeMetrics(opportunity)

  const transaction = client.transaction()

  transaction.createIfNotExists({
    _id: marketQuestionId,
    _type: 'marketQuestion',
    question: primaryQuestion,
    status: 'validated',
    priority: (opportunity.score ?? 0) >= 75 ? 'High' : (opportunity.score ?? 0) >= 50 ? 'Medium' : 'Low',
    topicCluster,
    targetPersona,
    problemSummary: String(opportunity.reasoning ?? '').trim(),
    productHypothesis: String(opportunity.uniqueAngle ?? '').trim(),
    productHypothesisConfidence: {
      _type: 'productHypothesisConfidence',
      score: Math.max(0, Math.min(1, (opportunity.score ?? 50) / 100)),
      label: (opportunity.score ?? 0) >= 75 ? 'High' : (opportunity.score ?? 0) >= 50 ? 'Medium' : 'Low',
      rationale: `Auto-generated from content opportunity score ${Math.round(opportunity.score ?? 0)}.`,
    },
    researchEvidence: researchEvidenceIds.map((refId) => reference(refId)),
    contentBriefs: [reference(contentBriefId)],
  })

  transaction.createIfNotExists({
    _id: gscEvidenceId,
    _type: 'researchEvidence',
    title: `${opportunityTitle} · Search signal`,
    evidenceType: 'internalExperience',
    summary: [
      `Primary query: ${primaryQuery}.`,
      metricsSummary ? `Observed search performance: ${metricsSummary}.` : null,
      String(opportunity.reasoning ?? '').trim(),
    ].filter(Boolean).join(' '),
    marketQuestion: reference(marketQuestionId),
    signalsProductNeed: true,
    existingWorkaround: String(opportunity.uniqueAngle ?? '').trim() || undefined,
  })

  if (sourceEvidenceId && opportunity.sourcePage) {
    transaction.createIfNotExists({
      _id: sourceEvidenceId,
      _type: 'researchEvidence',
      title: `${opportunityTitle} · External source`,
      evidenceType: 'technicalSource',
      summary: String(opportunity.reasoning ?? opportunity.uniqueAngle ?? '').trim(),
      source: {
        _type: 'sourceCitation',
        label: opportunityTitle,
        url: opportunity.sourcePage,
        publisher: new URL(opportunity.sourcePage).hostname.replace(/^www\./, ''),
      },
      marketQuestion: reference(marketQuestionId),
      signalsProductNeed: true,
    })
  }

  transaction.createIfNotExists({
    _id: contentBriefId,
    _type: 'contentBrief',
    title: opportunityTitle,
    status: 'researching',
    marketQuestion: reference(marketQuestionId),
    targetPersona,
    primaryKeyword: primaryQuery,
    directAnswer,
    outline: buildOutlineSections(opportunity),
    researchEvidence: researchEvidenceIds.map((refId) => reference(refId)),
    articles: articleId ? [reference(articleId)] : [],
    distributionNotes: `Opportunity type: ${opportunity.opportunityType ?? 'unknown'}. Product pillar: ${opportunity.productPillar ?? 'unknown'}.`,
    productHypothesis: String(opportunity.uniqueAngle ?? '').trim(),
    contentOpportunity: reference(opportunity._id),
    kpiTarget,
    workflowChecklist: defaultBriefChecklist(),
  })

  if (articleId && opportunity.opportunityType === 'new-article') {
    transaction.createIfNotExists({
      _id: articleId,
      _type: 'article',
      title: opportunityTitle,
      slug: { _type: 'slug', current: slugify(opportunityTitle) || slugify(primaryQuery) },
      status: 'awaitingResearch',
      excerpt: String(opportunity.reasoning ?? '').trim().slice(0, 220),
      directAnswer,
      primaryQuestion,
      primaryKeyword: primaryQuery,
      secondaryKeywords: (opportunity.supportingQueries ?? []).slice(0, 5),
      relatedQuestions: (opportunity.supportingQueries ?? []).slice(0, 6),
      searchIntent: 'problem-solving',
      targetPersona,
      topicCluster,
      contentBrief: reference(contentBriefId),
      contentOpportunity: reference(opportunity._id),
      kpiTarget,
      workflowChecklist: defaultArticleChecklist(),
    })
    transaction.patch(articleId, {
      setIfMissing: {
        contentBrief: reference(contentBriefId),
        contentOpportunity: reference(opportunity._id),
        kpiTarget,
      },
    })
  }

  if (articleId && opportunity.opportunityType !== 'new-article') {
    const patchSetIfMissing: Record<string, unknown> = {
      contentBrief: reference(contentBriefId),
      contentOpportunity: reference(opportunity._id),
      kpiTarget,
    }
    const patchSet: Record<string, unknown> = {}
    if (opportunity.opportunityType === 'refresh') {
      patchSet.status = 'needsRefresh'
    }

    transaction.patch(articleId, {
      setIfMissing: patchSetIfMissing,
      ...(Object.keys(patchSet).length ? { set: patchSet } : {}),
    })
  }

  const opportunityPatch: Record<string, unknown> = {
    status: 'briefCreated',
    marketQuestion: reference(marketQuestionId),
    researchEvidence: researchEvidenceIds.map((refId) => reference(refId)),
    contentBrief: reference(contentBriefId),
    kpiTarget,
  }
  if (articleId) {
    opportunityPatch.article = reference(articleId)
  }

  transaction.patch(opportunity._id, {
    set: opportunityPatch,
  })

  await transaction.commit()

  await appendUniqueReferences(client, marketQuestionId, 'researchEvidence', researchEvidenceIds)
  await appendUniqueReferences(client, marketQuestionId, 'contentBriefs', [contentBriefId])
  await appendUniqueReferences(client, contentBriefId, 'researchEvidence', researchEvidenceIds)
  if (articleId) {
    await appendUniqueReferences(client, contentBriefId, 'articles', [articleId])
  }
  await client
    .patch(contentBriefId)
    .setIfMissing({
      marketQuestion: reference(marketQuestionId),
      contentOpportunity: reference(opportunity._id),
      kpiTarget,
    })
    .commit()

  return {
    marketQuestionId,
    researchEvidenceIds,
    contentBriefId,
    articleId,
  }
}
