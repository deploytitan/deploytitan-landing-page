import { fetchGa4PageMetrics } from './fetch-ga4'
import { fetchPosthogMetrics } from './fetch-posthog'
import { fetchSearchConsoleMetrics } from './fetch-search-console'
import { getTrackedArticles } from './get-tracked-articles'
import { evaluateArticleKpi } from './evaluate-kpis'
import { saveArticlePerformanceSnapshot, saveContentInsight } from './save-performance'
import type { ArticlePerformanceInput, ReviewWindow } from './types'

function todayIso() {
  return new Date().toISOString()
}

export async function syncContentPerformance(reviewWindow: ReviewWindow) {
  const articles = await getTrackedArticles()
  const [ga4MetricsByPath, posthogMetricsBySlug, searchMetricsByArticleId] = await Promise.all([
    fetchGa4PageMetrics(articles, reviewWindow),
    fetchPosthogMetrics(articles, reviewWindow),
    fetchSearchConsoleMetrics(articles, reviewWindow),
  ])

  const captureDate = todayIso()
  const results: Array<{ articleId: string; snapshotId: string; insightId?: string }> = []

  for (const article of articles) {
    const path = `/blog/${article.slug.current}`
    const ga4Metrics = ga4MetricsByPath.get(path) ?? {
      views: 0,
      uniqueVisitors: 0,
      avgTimeOnPageSeconds: 0,
    }
    const posthogMetrics = posthogMetricsBySlug.get(article.slug.current) ?? {
      scroll50Count: 0,
      scroll90Count: 0,
      newsletterSignups: 0,
      researchCtaClicks: 0,
      interviewRequests: 0,
      shares: 0,
      outboundToolClicks: 0,
    }
    const searchMetrics = searchMetricsByArticleId.get(article._id) ?? {
      searchClicks: 0,
      searchImpressions: 0,
      searchCtr: 0,
    }

    const input: ArticlePerformanceInput = {
      article,
      reviewWindow,
      captureDate,
      metrics: {
        ...ga4Metrics,
        ...posthogMetrics,
        ...searchMetrics,
      },
      notes: `Synced from GA4, PostHog, and Search Console for ${reviewWindow}.`,
    }

    const snapshotId = await saveArticlePerformanceSnapshot(input)
    const evaluation = evaluateArticleKpi(input)
    const insightId = evaluation ? await saveContentInsight(input, snapshotId, evaluation) : undefined
    results.push({
      articleId: article._id,
      snapshotId,
      insightId,
    })
  }

  return {
    articleCount: articles.length,
    reviewWindow,
    results,
  }
}
