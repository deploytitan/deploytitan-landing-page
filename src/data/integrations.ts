export type IntegrationCategory = 'ci-cd' | 'observability' | 'cloud' | 'notifications' | 'iac' | 'security' | 'kubernetes'

export interface Integration {
  slug: string
  name: string
  category: IntegrationCategory
  description: string
  longDescription: string
  logoText: string   // Short abbreviation shown in place of real logo
  logoColor: string  // bg colour for logo badge
  status: 'ga' | 'beta' | 'coming-soon'
  products: string[] // Which Titan products this integrates with
  setupSnippet?: string
  setupLang?: 'yaml' | 'bash' | 'tsx' | 'hcl'
  docsHref?: string
}

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  'ci-cd':        'CI / CD',
  'observability': 'Observability',
  'cloud':        'Cloud',
  'notifications': 'Notifications',
  'iac':          'Infrastructure as Code',
  'security':     'Security',
  'kubernetes':   'Kubernetes',
}

export const integrations: Integration[] = [
  // Kubernetes / Orchestration
  {
    slug: 'kubernetes',
    name: 'Kubernetes',
    category: 'kubernetes',
    description: 'Native kubectl + CRD support. Manage rollouts alongside your existing manifests.',
    longDescription: 'DeployTitan ships a Kubernetes operator and custom resource definitions (CRDs) that let you define delivery policies declaratively. `dt.yaml` rollout policies sit alongside your Deployment and Service manifests in the same repo.',
    logoText: 'K8s',
    logoColor: '#326CE5',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Shield'],
    setupSnippet: `apiVersion: deploy.titan.io/v1
kind: RolloutPolicy
metadata:
  name: payment-service
spec:
  strategy: canary
  steps:
    - weight: 10
      pause: 5m
    - weight: 50
      pause: { analysis: slo }
    - weight: 100
  slo:
    errorRateBudget: 0.1
    p95LatencyMs: 250`,
    setupLang: 'yaml',
  },
  {
    slug: 'argocd',
    name: 'Argo CD',
    category: 'kubernetes',
    description: 'GitOps-native integration — Titan Rollout policies live in your Argo Application.',
    longDescription: 'Register DeployTitan as an Argo CD resource hook. Progressive rollout policies are driven by your existing Argo sync pipeline; no extra CI step needed.',
    logoText: 'Argo',
    logoColor: '#F05033',
    status: 'ga',
    products: ['Titan Rollout'],
    setupSnippet: `# dt.yaml (alongside your Argo Application)
rollout:
  strategy: canary
  argocd:
    app: payment-service
    syncPolicy: automated`,
    setupLang: 'yaml',
  },
  {
    slug: 'helm',
    name: 'Helm',
    category: 'kubernetes',
    description: 'Deploy Helm charts progressively with built-in SLO gate checks.',
    longDescription: 'The DeployTitan Helm plugin wraps `helm upgrade` with a canary gate. If your SLO thresholds are breached during the canary window, the plugin automatically calls `helm rollback`.',
    logoText: 'Helm',
    logoColor: '#0F1689',
    status: 'ga',
    products: ['Titan Rollout'],
    setupSnippet: `dt deploy helm \\
  --chart ./charts/payment-service \\
  --values prod-values.yaml \\
  --strategy=canary \\
  --slo=p95<250ms,error-rate<0.5%`,
    setupLang: 'bash',
  },
  // CI/CD
  {
    slug: 'github-actions',
    name: 'GitHub Actions',
    category: 'ci-cd',
    description: 'Official action: risk-score a PR before it merges, trigger progressive deploys on push.',
    longDescription: 'Two official actions: `deploytitan/risk-score@v1` analyzes blast-radius and dependency changes in a PR; `deploytitan/deploy@v1` triggers a progressive rollout from any workflow step.',
    logoText: 'GHA',
    logoColor: '#2088FF',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Foresight'],
    setupSnippet: `- name: Risk score PR
  uses: deploytitan/risk-score@v1
  with:
    token: \${{ secrets.DT_TOKEN }}
    fail-on: high

- name: Progressive deploy
  uses: deploytitan/deploy@v1
  with:
    service: payment-service
    strategy: canary
    slo: "p95<250ms,error-rate<0.5%"`,
    setupLang: 'yaml',
  },
  {
    slug: 'gitlab-ci',
    name: 'GitLab CI',
    category: 'ci-cd',
    description: 'Native `.gitlab-ci.yml` include template for risk scoring and canary deploys.',
    longDescription: 'Add the DeployTitan CI template to any GitLab pipeline. The template handles auth, risk scoring on MRs, and progressive deploy stages.',
    logoText: 'GL',
    logoColor: '#FC6D26',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Foresight'],
    setupSnippet: `include:
  - project: deploytitan/ci-templates
    ref: v2
    file: /templates/deploy.yml

deploy-canary:
  extends: .dt-deploy
  variables:
    DT_SERVICE: payment-service
    DT_STRATEGY: canary`,
    setupLang: 'yaml',
  },
  {
    slug: 'jenkins',
    name: 'Jenkins',
    category: 'ci-cd',
    description: 'Groovy shared library for Titan Rollout steps inside existing Jenkinsfiles.',
    longDescription: 'Load the DeployTitan shared library and call `deployTitan.canary()` steps directly inside your existing Jenkinsfiles with no pipeline rewrite required.',
    logoText: 'Jenkins',
    logoColor: '#D33833',
    status: 'beta',
    products: ['Titan Rollout'],
  },
  {
    slug: 'circle-ci',
    name: 'CircleCI',
    category: 'ci-cd',
    description: 'CircleCI orb for risk-score gates and progressive rollout triggers.',
    longDescription: 'The `deploytitan/deploy` orb wraps risk scoring and canary promotion into reusable CircleCI steps.',
    logoText: 'Circle',
    logoColor: '#343434',
    status: 'beta',
    products: ['Titan Rollout', 'Titan Foresight'],
  },
  // Observability
  {
    slug: 'datadog',
    name: 'Datadog',
    category: 'observability',
    description: 'Ingest Datadog SLO burn rates and monitors as rollout gates.',
    longDescription: 'Connect Datadog as a metric provider. Titan Rollout reads your Datadog SLO burn rates and custom monitors during the canary window, auto-promoting or rolling back based on real-time signal.',
    logoText: 'DD',
    logoColor: '#774AA4',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Foresight'],
    setupSnippet: `# dt.yaml
metrics:
  provider: datadog
  slo:
    id: abc123def456
    budget: 0.1
  monitors:
    - id: 12345678
      threshold: warn`,
    setupLang: 'yaml',
  },
  {
    slug: 'prometheus',
    name: 'Prometheus',
    category: 'observability',
    description: 'PromQL queries as SLO gates — works with any Prometheus-compatible stack.',
    longDescription: 'Point DeployTitan at any Prometheus endpoint. Write arbitrary PromQL expressions as rollout gates — error rate, latency histograms, custom business metrics.',
    logoText: 'Prom',
    logoColor: '#E6522C',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Ledger'],
    setupSnippet: `metrics:
  provider: prometheus
  address: https://prometheus.internal
  queries:
    errorRate: |
      sum(rate(http_requests_total{status=~"5.."}[5m]))
      / sum(rate(http_requests_total[5m]))
    threshold: 0.005`,
    setupLang: 'yaml',
  },
  {
    slug: 'grafana',
    name: 'Grafana',
    category: 'observability',
    description: 'Embed live Titan Rollout panels in your Grafana dashboards.',
    longDescription: 'The DeployTitan Grafana plugin adds a Rollout Status panel that shows canary weight, SLO burn rate, and rollback events inline with your existing dashboards.',
    logoText: 'GF',
    logoColor: '#F46800',
    status: 'beta',
    products: ['Titan Rollout', 'Titan Ledger'],
  },
  {
    slug: 'new-relic',
    name: 'New Relic',
    category: 'observability',
    description: 'New Relic NRQL queries as SLO gate conditions.',
    longDescription: 'Use New Relic as a metric provider for canary gates. Titan Rollout polls NRQL queries during the observation window and promotes or halts automatically.',
    logoText: 'NR',
    logoColor: '#00AC69',
    status: 'beta',
    products: ['Titan Rollout'],
  },
  // Cloud
  {
    slug: 'aws',
    name: 'AWS',
    category: 'cloud',
    description: 'ECS, EKS, Lambda, ALB, and Route 53 — full progressive deploy support.',
    longDescription: 'Titan Shield manages ALB listener rules for traffic splitting, Route 53 weighted records for multi-region failover, and integrates with ECS deployment circuits.',
    logoText: 'AWS',
    logoColor: '#FF9900',
    status: 'ga',
    products: ['Titan Shield', 'Titan Rollout'],
  },
  {
    slug: 'gcp',
    name: 'Google Cloud',
    category: 'cloud',
    description: 'GKE, Cloud Run, Cloud Load Balancing, and Traffic Director integration.',
    longDescription: 'Titan Shield uses GCP Traffic Director for multi-region failover and Cloud Load Balancing for traffic splitting during canary deployments.',
    logoText: 'GCP',
    logoColor: '#4285F4',
    status: 'ga',
    products: ['Titan Shield', 'Titan Rollout'],
  },
  {
    slug: 'azure',
    name: 'Azure',
    category: 'cloud',
    description: 'AKS, Azure Front Door, Application Gateway, and Traffic Manager support.',
    longDescription: 'Use Azure Front Door or Application Gateway as traffic split targets. Titan Shield automates failover via Traffic Manager for multi-region resilience.',
    logoText: 'Azure',
    logoColor: '#0078D4',
    status: 'ga',
    products: ['Titan Shield'],
  },
  // Notifications
  {
    slug: 'slack',
    name: 'Slack',
    category: 'notifications',
    description: 'Rich rollout status cards — promote, pause, or roll back from Slack.',
    longDescription: 'DeployTitan posts structured rollout status cards to any Slack channel. Engineers can approve promotion or trigger rollback without leaving Slack.',
    logoText: 'Slack',
    logoColor: '#4A154B',
    status: 'ga',
    products: ['Titan Rollout'],
    setupSnippet: `notifications:
  slack:
    channel: "#deploys"
    events: [started, promoted, rolled-back, paused]
    interactive: true   # Adds Promote / Rollback buttons`,
    setupLang: 'yaml',
  },
  {
    slug: 'pagerduty',
    name: 'PagerDuty',
    category: 'notifications',
    description: 'Auto-create incidents on SLO breach; auto-resolve on successful rollback.',
    longDescription: 'If a canary breaches an SLO, DeployTitan creates a PagerDuty incident immediately and tags it with the affected service, version, and blast-radius score. On successful rollback, the incident is auto-resolved.',
    logoText: 'PD',
    logoColor: '#25C151',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Foresight'],
  },
  {
    slug: 'opsgenie',
    name: 'OpsGenie',
    category: 'notifications',
    description: 'Route deploy alerts and SLO breach incidents to OpsGenie on-call schedules.',
    longDescription: 'Map DeployTitan event types (SLO breach, rollback triggered, manual pause) to OpsGenie alert priorities and on-call routing rules.',
    logoText: 'OG',
    logoColor: '#E5601C',
    status: 'beta',
    products: ['Titan Rollout'],
  },
  // IaC
  {
    slug: 'terraform',
    name: 'Terraform',
    category: 'iac',
    description: 'Terraform provider: manage rollout policies and shield configs as code.',
    longDescription: 'The `deploytitan` Terraform provider lets you define `dt_rollout_policy`, `dt_shield_region`, and `dt_sentinel_rule` resources alongside your infrastructure.',
    logoText: 'TF',
    logoColor: '#7B42BC',
    status: 'ga',
    products: ['Titan Rollout', 'Titan Shield', 'Titan Foresight'],
    setupSnippet: `terraform {
  required_providers {
    deploytitan = {
      source  = "deploytitan/deploytitan"
      version = "~> 1.0"
    }
  }
}

resource "dt_rollout_policy" "payment" {
  service  = "payment-service"
  strategy = "canary"
  slo = {
    error_rate_budget = 0.1
    p95_latency_ms    = 250
  }
}`,
    setupLang: 'hcl',
  },
  {
    slug: 'pulumi',
    name: 'Pulumi',
    category: 'iac',
    description: 'TypeScript / Python / Go SDK for managing DeployTitan resources.',
    longDescription: 'The DeployTitan Pulumi provider exposes all Titan resources as typed classes in TypeScript, Python, Go, and .NET.',
    logoText: 'Pulumi',
    logoColor: '#8A3391',
    status: 'beta',
    products: ['Titan Rollout', 'Titan Foresight'],
  },
  // Security
  {
    slug: 'vault',
    name: 'HashiCorp Vault',
    category: 'security',
    description: 'Dynamic secrets injection for deploy-time credentials — no hardcoded tokens.',
    longDescription: 'DeployTitan integrates with Vault dynamic secrets to inject short-lived credentials at deploy time. No plaintext secrets in your dt.yaml or CI environment.',
    logoText: 'Vault',
    logoColor: '#FFD814',
    status: 'beta',
    products: ['Titan Rollout'],
  },
  {
    slug: 'snyk',
    name: 'Snyk',
    category: 'security',
    description: 'Block deploys with critical CVEs — Titan Foresight reads Snyk scan results as a gate.',
    longDescription: 'Connect Snyk to Titan Foresight. If the container image being deployed has unresolved critical or high CVEs, the rollout is held pending engineer approval.',
    logoText: 'Snyk',
    logoColor: '#4C4A73',
    status: 'coming-soon',
    products: ['Titan Foresight'],
  },
]
