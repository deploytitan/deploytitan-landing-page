import type { WebSourceConfig } from './types'

export const DEFAULT_WEB_SOURCES: WebSourceConfig[] = [
  {
    name: 'LaunchDarkly Blog',
    url: 'https://launchdarkly.com/blog/',
    type: 'competitor',
    tags: ['feature-flags', 'progressive-delivery', 'release-engineering'],
    maxItems: 8,
  },
  {
    name: 'Harness Blog',
    url: 'https://www.harness.io/blog',
    type: 'competitor',
    tags: ['ci-cd', 'release-engineering', 'devops'],
    maxItems: 8,
  },
  {
    name: 'Unleash Blog',
    url: 'https://www.getunleash.io/blog',
    type: 'competitor',
    tags: ['feature-flags', 'progressive-delivery'],
    maxItems: 8,
  },
  {
    name: 'Flagsmith Blog',
    url: 'https://www.flagsmith.com/blog',
    type: 'competitor',
    tags: ['feature-flags', 'progressive-delivery'],
    maxItems: 8,
  },
  {
    name: 'OpenTelemetry Blog',
    url: 'https://opentelemetry.io/blog/',
    type: 'market',
    tags: ['opentelemetry', 'observability'],
    maxItems: 8,
  },
  {
    name: 'CNCF Announcements',
    url: 'https://www.cncf.io/announcements/',
    type: 'market',
    tags: ['cncf', 'platform-engineering', 'observability'],
    maxItems: 8,
  },
  {
    name: 'DORA Insights',
    url: 'https://dora.dev/insights/',
    type: 'market',
    tags: ['software-delivery', 'engineering-metrics'],
    maxItems: 8,
  },
]

