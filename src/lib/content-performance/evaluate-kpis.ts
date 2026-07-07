import type {
  ArticlePerformanceInput,
  ContentKpiTarget,
  KpiEvaluation,
  TrackedArticleRecord,
} from './types'

function resolveTarget(article: TrackedArticleRecord): ContentKpiTarget | null {
  return article.kpiTarget ?? null
}

function confidenceLabel(score: number): 'Low' | 'Medium' | 'High' {
  if (score >= 0.75) return 'High'
  if (score >= 0.45) return 'Medium'
  return 'Low'
}

function metricLabel(metric: ContentKpiTarget['primaryMetric']) {
  if (metric === 'searchImpressions') return 'search impressions'
  if (metric === 'searchClicks') return 'search clicks'
  if (metric === 'searchCtr') return 'search CTR'
  if (metric === 'newsletterSignups') return 'newsletter signups'
  return 'research CTA clicks'
}

function signalTypeForMetric(metric: ContentKpiTarget['primaryMetric']): KpiEvaluation['signalType'] {
  return metric.startsWith('search') ? 'search' : 'distribution'
}

export function evaluateArticleKpi(input: ArticlePerformanceInput): KpiEvaluation | null {
  const target = resolveTarget(input.article)
  if (!target || !Number.isFinite(target.targetValue) || target.targetValue <= 0) return null

  const actualValue = input.metrics[target.primaryMetric]
  const ratio = actualValue / target.targetValue
  const metricName = metricLabel(target.primaryMetric)
  const reviewWindowDays = target.reviewWindowDays ?? (input.reviewWindow === '7d' ? 7 : 30)

  if (ratio >= 1.1) {
    return {
      title: `${input.article.title} is outperforming its KPI target`,
      signalType: signalTypeForMetric(target.primaryMetric),
      summary: `The article exceeded its ${reviewWindowDays}-day target for ${metricName} with ${actualValue} against a goal of ${target.targetValue}.`,
      recommendedAction: `Preserve the current positioning, expand distribution, and consider adjacent follow-up content while this topic is working.`,
      confidenceScore: Math.min(1, ratio / 1.5),
      confidenceLabel: confidenceLabel(Math.min(1, ratio / 1.5)),
    }
  }

  if (ratio >= 0.6) {
    return {
      title: `${input.article.title} is trending toward its KPI target`,
      signalType: signalTypeForMetric(target.primaryMetric),
      summary: `The article is at ${Math.round(ratio * 100)}% of its ${reviewWindowDays}-day target for ${metricName} (${actualValue} vs ${target.targetValue}).`,
      recommendedAction: `Keep distribution active and make one or two focused improvements rather than repositioning the whole article.`,
      confidenceScore: Math.min(0.85, ratio),
      confidenceLabel: confidenceLabel(Math.min(0.85, ratio)),
    }
  }

  const isSearchMetric = target.primaryMetric.startsWith('search')
  const recommendedAction = isSearchMetric
    ? `Revisit title, meta description, internal linking, and problem framing. If the article is older, consider a refresh angle tied more directly to DeployTitan's differentiation.`
    : `Strengthen the CTA placement, audience targeting, and distribution path. Validate whether the article is attracting the right reader intent.`

  return {
    title: `${input.article.title} is behind its KPI target`,
    signalType: isSearchMetric ? 'refresh' : 'distribution',
    summary: `The article reached ${actualValue} ${metricName} in ${reviewWindowDays} days against a target of ${target.targetValue}.`,
    recommendedAction,
    confidenceScore: Math.max(0.25, Math.min(0.65, ratio + 0.15)),
    confidenceLabel: confidenceLabel(Math.max(0.25, Math.min(0.65, ratio + 0.15))),
  }
}
