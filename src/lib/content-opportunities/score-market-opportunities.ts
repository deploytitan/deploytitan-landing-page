import type { ExternalContentSignal, MarketOpportunityCandidate, MarketThemeId, SourceType } from './types'

const THEME_METADATA: Record<
  MarketThemeId,
  {
    label: string
    productPillar: string
    summary: string
  }
> = {
  'deployment-impact-analysis': {
    label: 'Deployment impact analysis',
    productPillar: 'Deployment impact analysis',
    summary: 'Teams want ways to connect a deploy to the systems, services, and customer paths it changed.',
  },
  'change-intelligence': {
    label: 'Software change intelligence',
    productPillar: 'Change intelligence',
    summary: 'The market is moving toward richer context graphs and impact-aware reasoning around code changes.',
  },
  'opentelemetry-observability': {
    label: 'OpenTelemetry and observability',
    productPillar: 'OpenTelemetry dependency analysis',
    summary: 'OpenTelemetry is becoming table stakes, creating room for content about using traces and service maps for release analysis.',
  },
  'progressive-delivery': {
    label: 'Progressive delivery',
    productPillar: 'Release safety',
    summary: 'Competitors keep educating the market on canaries, feature flags, and safer rollout patterns.',
  },
  'release-safety': {
    label: 'Release safety',
    productPillar: 'Release safety',
    summary: 'There is consistent demand for practical release-risk reduction, rollback, and rollout confidence guidance.',
  },
  'post-deployment-verification': {
    label: 'Post-deployment verification',
    productPillar: 'Post-deployment verification',
    summary: 'Teams need concrete workflows for checking regressions and production behavior immediately after releases.',
  },
  'blast-radius-analysis': {
    label: 'Blast-radius analysis',
    productPillar: 'API and microservice blast-radius analysis',
    summary: 'Distributed systems teams need ways to understand dependency impact before and after changes ship.',
  },
  'ai-software-delivery-risk': {
    label: 'AI-driven software delivery risk',
    productPillar: 'Release safety',
    summary: 'AI-assisted development is increasing release volume and making verification, impact analysis, and guardrails more important.',
  },
  'platform-engineering': {
    label: 'Platform engineering',
    productPillar: 'Platform engineering',
    summary: 'Platform teams remain a strong adjacent audience for change-risk and deployment intelligence content.',
  },
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function scoreSignalCount(count: number) {
  return clamp(count * 12, 0, 36)
}

function scoreSourceDiversity(sourceTypes: SourceType[]) {
  return sourceTypes.length === 2 ? 18 : sourceTypes.length === 1 ? 9 : 0
}

function scoreSourceNames(sourceNames: string[]) {
  return clamp(sourceNames.length * 6, 0, 24)
}

export function scoreMarketOpportunities(signals: ExternalContentSignal[]) {
  const grouped = new Map<MarketThemeId, ExternalContentSignal[]>()

  for (const signal of signals) {
    for (const theme of signal.matchedThemes) {
      const bucket = grouped.get(theme) ?? []
      bucket.push(signal)
      grouped.set(theme, bucket)
    }
  }

  const candidates: MarketOpportunityCandidate[] = [...grouped.entries()]
    .map(([theme, themeSignals]) => {
      const sourceTypes = [...new Set(themeSignals.map((signal) => signal.sourceType))].sort() as SourceType[]
      const sourceNames = [...new Set(themeSignals.map((signal) => signal.sourceName))].sort()
      const exampleTitles = themeSignals
        .slice()
        .sort((left, right) => (right.publishedAt ?? '').localeCompare(left.publishedAt ?? ''))
        .slice(0, 3)
        .map((signal) => signal.title)

      const metadata = THEME_METADATA[theme]
      const score = clamp(
        Math.round(scoreSignalCount(themeSignals.length) + scoreSourceDiversity(sourceTypes) + scoreSourceNames(sourceNames)),
        0,
        100,
      )

      return {
        theme,
        label: metadata.label,
        productPillar: metadata.productPillar,
        score,
        summary: metadata.summary,
        sourceTypes,
        sourceNames,
        signalCount: themeSignals.length,
        exampleTitles,
      }
    })
    .sort((left, right) => right.score - left.score || right.signalCount - left.signalCount)

  return candidates
}
