import { createHash } from 'node:crypto'
import process from 'node:process'

import { createClient } from 'next-sanity'

import type { ArticlePerformanceInput, KpiEvaluation } from './types'

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

function buildSnapshotId(articleId: string, period: string, captureDate: string, source: string) {
  const digest = createHash('sha256')
    .update([articleId, period, captureDate, source].join(':'))
    .digest('hex')
    .slice(0, 24)
  return `articlePerformanceSnapshot.${digest}`
}

function buildInsightId(articleId: string, period: string, metric: string) {
  const digest = createHash('sha256')
    .update([articleId, period, metric].join(':'))
    .digest('hex')
    .slice(0, 24)
  return `contentInsight.${digest}`
}

function createSanityWriteClient() {
  return createClient({
    projectId: requireEnv('SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: requireEnv('SANITY_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: getEnv('SANITY_API_VERSION', 'NEXT_PUBLIC_SANITY_API_VERSION') ?? '2026-07-05',
    useCdn: false,
    token: requireEnv('SANITY_API_WRITE_TOKEN'),
    perspective: 'published',
  })
}

export async function saveArticlePerformanceSnapshot(input: ArticlePerformanceInput) {
  const client = createSanityWriteClient()
  const snapshotId = buildSnapshotId(
    input.article._id,
    input.reviewWindow,
    input.captureDate,
    'content-analytics-sync',
  )
  const canonicalUrl =
    input.article.seo?.canonicalUrl ??
    `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://deploytitan.com').replace(/\/$/, '')}/blog/${input.article.slug.current}/`

  await client.createOrReplace({
    _id: snapshotId,
    _type: 'articlePerformanceSnapshot',
    article: { _type: 'reference', _ref: input.article._id },
    period: input.reviewWindow,
    captureDate: input.captureDate,
    source: 'content-analytics-sync',
    canonicalUrl,
    metrics: input.metrics,
    notes: input.notes,
    idempotencyKey: snapshotId,
  })

  return snapshotId
}

export async function saveContentInsight(
  input: ArticlePerformanceInput,
  snapshotId: string,
  evaluation: KpiEvaluation,
) {
  const client = createSanityWriteClient()
  const metric = input.article.kpiTarget?.primaryMetric ?? 'unknown'
  const insightId = buildInsightId(input.article._id, input.reviewWindow, metric)
  const contentOpportunityRef = input.article.contentOpportunity?._ref
    ? { _type: 'reference' as const, _ref: input.article.contentOpportunity._ref }
    : null

  const payload = {
    _id: insightId,
    _type: 'contentInsight',
    title: evaluation.title,
    article: { _type: 'reference', _ref: input.article._id },
    snapshot: { _type: 'reference', _ref: snapshotId },
    signalType: evaluation.signalType,
    summary: evaluation.summary,
    recommendedAction: evaluation.recommendedAction,
    productHypothesisConfidence: {
      _type: 'productHypothesisConfidence',
      score: evaluation.confidenceScore,
      label: evaluation.confidenceLabel,
      rationale: `Auto-evaluated from KPI performance for ${input.reviewWindow}.`,
    },
    ...(contentOpportunityRef ? { contentOpportunity: contentOpportunityRef } : {}),
  }

  await client.createOrReplace(payload)

  return insightId
}
