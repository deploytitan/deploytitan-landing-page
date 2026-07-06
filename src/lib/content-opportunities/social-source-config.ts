import type { SocialSourceConfig } from './types'

const DEPLOYMENT_RESEARCH_QUERIES = [
  'deployment rollback',
  'canary release failed',
  'post deployment verification',
  'OpenTelemetry dependency graph',
  'feature flags microservices',
  'blast radius analysis',
  'deployment caused incident',
  'release safety',
  'progressive delivery',
  'platform engineering golden path',
]

export const DEFAULT_SOCIAL_SOURCES: SocialSourceConfig[] = [
  {
    platform: 'reddit',
    name: 'Reddit engineering communities',
    communities: [
      'devops',
      'sre',
      'kubernetes',
      'observability',
      'softwarearchitecture',
      'ExperiencedDevs',
    ],
    queries: DEPLOYMENT_RESEARCH_QUERIES,
    maxItems: 24,
  },
  {
    platform: 'hacker-news',
    name: 'Hacker News',
    queries: DEPLOYMENT_RESEARCH_QUERIES,
    tags: ['story', 'comment'],
    maxItems: 18,
  },
  {
    platform: 'github',
    name: 'GitHub issues and discussions',
    repositories: [
      'open-telemetry/opentelemetry-collector',
      'open-telemetry/opentelemetry-js',
      'argoproj/argo-rollouts',
      'fluxcd/flagger',
      'open-feature/openfeature',
      'backstage/backstage',
      'kubernetes/kubernetes',
    ],
    queries: DEPLOYMENT_RESEARCH_QUERIES,
    maxItems: 18,
  },
  {
    platform: 'stack-exchange',
    name: 'Stack Overflow',
    queries: DEPLOYMENT_RESEARCH_QUERIES,
    tags: ['kubernetes', 'devops', 'opentelemetry', 'feature-flags', 'continuous-deployment'],
    maxItems: 16,
  },
  {
    platform: 'x',
    name: 'X recent posts',
    queries: DEPLOYMENT_RESEARCH_QUERIES,
    maxItems: 12,
  },
]
