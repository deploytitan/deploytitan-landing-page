'use client'

import posthog from 'posthog-js'
import { ANALYTICS_CONSENT_COOKIE } from './consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export type ArticleAnalyticsContext = {
  articleId: string
  articleSlug: string
  canonicalUrl: string
  articleTitle: string
  topicCluster?: string | null
  articleType?: string | null
  primaryKeyword?: string | null
  targetPersona?: string | null
  distributionAssetId?: string | null
}

function readConsentFromDocument() {
  if (typeof document === 'undefined') return false
  return document.cookie
    .split(';')
    .map((part) => part.trim())
    .includes(`${ANALYTICS_CONSENT_COOKIE}=granted`)
}

function readAttributionFromLocation() {
  if (typeof window === 'undefined') {
    return {
      referrer: '',
      distributionAssetId: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
    }
  }

  const searchParams = new URLSearchParams(window.location.search)
  return {
    referrer: document.referrer || '',
    distributionAssetId:
      searchParams.get('distribution_asset_id') ??
      searchParams.get('distributionAssetId') ??
      '',
    utmSource: searchParams.get('utm_source') ?? '',
    utmMedium: searchParams.get('utm_medium') ?? '',
    utmCampaign: searchParams.get('utm_campaign') ?? '',
    utmTerm: searchParams.get('utm_term') ?? '',
    utmContent: searchParams.get('utm_content') ?? '',
  }
}

export function hasAnalyticsConsent() {
  return readConsentFromDocument()
}

export function buildArticleTrackingPayload(
  context: ArticleAnalyticsContext,
  payload: Record<string, unknown> = {},
) {
  const attribution = readAttributionFromLocation()
  return {
    articleId: context.articleId,
    articleSlug: context.articleSlug,
    canonicalUrl: context.canonicalUrl,
    articleTitle: context.articleTitle,
    topicCluster: context.topicCluster ?? '',
    articleType: context.articleType ?? 'TechArticle',
    primaryKeyword: context.primaryKeyword ?? '',
    targetPersona: context.targetPersona ?? '',
    ...attribution,
    distributionAssetId: context.distributionAssetId ?? attribution.distributionAssetId ?? '',
    ...payload,
  }
}

export function resolveArticleAnalyticsContext(context: ArticleAnalyticsContext): ArticleAnalyticsContext {
  const attribution = readAttributionFromLocation()
  return {
    ...context,
    distributionAssetId: context.distributionAssetId ?? attribution.distributionAssetId ?? '',
  }
}

export function trackEvent(name: string, payload: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return
  posthog.capture(name, payload)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, payload)
  }
}

export function identifyUser(id: string, payload: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return
  posthog.identify(id, payload)
}
