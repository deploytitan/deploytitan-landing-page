import { MidCTA } from '../components/MidCTA'
import Link from 'next/link'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

type Status = 'shipped' | 'in-progress' | 'planned' | 'considering'

interface RoadmapItem {
  title: string
  description: string
  status: Status
  quarter?: string
  tags: string[]
}

const items: RoadmapItem[] = [
  // Shipped
  {
    title: 'Canary deployments with automatic promotion',
    description:
      'Progressive traffic shifting with SLO-gated auto-promotion at 10%, 25%, 50%, 100%.',
    status: 'shipped',
    quarter: 'Q1 2026',
    tags: ['Core', 'Titan Rollout'],
  },
  {
    title: 'Multi-cloud blast-radius isolation',
    description:
      'Deployment scope controls to limit blast radius across AWS, GCP, and Azure simultaneously.',
    status: 'shipped',
    quarter: 'Q1 2026',
    tags: ['Core', 'Titan Shield'],
  },
  {
    title: 'GitHub Actions native integration',
    description:
      'First-class action for triggering, monitoring, and rolling back deployments from your CI workflow.',
    status: 'shipped',
    quarter: 'Q4 2025',
    tags: ['Integrations'],
  },
  {
    title: 'Datadog + PagerDuty signal routing',
    description: 'Route Datadog alerts and PagerDuty incidents directly into SLO guardrails.',
    status: 'shipped',
    quarter: 'Q4 2025',
    tags: ['Integrations', 'Titan Foresight'],
  },
  // In progress
  {
    title: 'ArgoCD native sync',
    description:
      'Deep integration with ArgoCD — use DeployTitan rollout policies with GitOps workflows.',
    status: 'in-progress',
    quarter: 'Q2 2026',
    tags: ['Integrations', 'Kubernetes'],
  },
  {
    title: 'Deployment cost attribution',
    description: 'Per-deployment cloud cost tracking linked to your AWS / GCP billing accounts.',
    status: 'in-progress',
    quarter: 'Q2 2026',
    tags: ['Observability', 'Titan Ledger'],
  },
  {
    title: 'RBAC and audit log',
    description:
      'Role-based access control with full audit trail — who deployed what, when, and from where.',
    status: 'in-progress',
    quarter: 'Q2 2026',
    tags: ['Security'],
  },
  // Planned
  {
    title: 'Terraform / Pulumi IaC deployments',
    description:
      'Bring infrastructure changes under the same progressive delivery model as application deployments.',
    status: 'planned',
    quarter: 'Q3 2026',
    tags: ['IaC'],
  },
  {
    title: 'Deployment SLA reporting',
    description:
      'Automated weekly SLA reports — MTTR, MTBF, deployment frequency, and change failure rate.',
    status: 'planned',
    quarter: 'Q3 2026',
    tags: ['Observability'],
  },
  {
    title: 'Feature flag management',
    description:
      'Built-in feature flags tied to deployment steps — ship dark, then flip the switch.',
    status: 'planned',
    quarter: 'Q3 2026',
    tags: ['Core'],
  },
  // Considering
  {
    title: 'ML-based rollback prediction',
    description:
      'Use historical deployment signals to predict and pre-emptively roll back risky releases.',
    status: 'considering',
    tags: ['AI', 'Core'],
  },
  {
    title: 'On-premise / air-gapped deployment',
    description: 'Run DeployTitan entirely within your VPC — no outbound traffic required.',
    status: 'considering',
    tags: ['Enterprise'],
  },
]

const statusConfig: Record<Status, { label: string; dot: string; badge: string }> = {
  shipped: {
    label: 'Shipped',
    dot: 'bg-emerald-500',
    badge:
      'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-800',
  },
  'in-progress': {
    label: 'In progress',
    dot: 'bg-primary',
    badge: 'text-primary-dark bg-primary-muted border-primary/30',
  },
  planned: {
    label: 'Planned',
    dot: 'bg-ink-tertiary',
    badge: 'text-ink-secondary bg-surface-alt border-line',
  },
  considering: {
    label: 'Considering',
    dot: 'bg-ink-quaternary',
    badge: 'text-ink-tertiary bg-surface border-line-subtle',
  },
}

const order: Status[] = ['in-progress', 'planned', 'shipped', 'considering']

export default function Roadmap() {
  const grouped = order.map((status) => ({
    status,
    items: items.filter((i) => i.status === status),
  }))

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">
              Roadmap
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              What we're building.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              A live view of shipped features, what's in active development, and what's coming next.
              We ship fast — check the changelog for detailed release notes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                View changelog
              </Link>
              <a
                href="mailto:feedback@deploytitan.com"
                className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-5 py-3 text-sm font-medium transition-all"
                style={{ borderRadius: '2px' }}
              >
                Submit feedback
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Legend */}
      <Section border="bottom" tone="muted" padding="none">
        <Container className="py-4 flex flex-wrap items-center gap-6">
          {order.map((s) => {
            const cfg = statusConfig[s]
            return (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-xs text-ink-secondary">{cfg.label}</span>
              </div>
            )
          })}
        </Container>
      </Section>

      {/* Roadmap items */}
      <Container as="section" className="py-14 space-y-14">
        {grouped.map(({ status, items: group }) => {
          if (!group.length) return null
          const cfg = statusConfig[status]
          return (
            <div key={status}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                <h2 className="font-display text-xl font-medium text-ink tracking-tight">
                  {cfg.label}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((item) => (
                  <Card key={item.title} tone="muted" className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-ink leading-snug">{item.title}</h3>
                      {item.quarter && (
                        <span className="font-mono text-[10px] text-ink-quaternary shrink-0">
                          {item.quarter}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-1.5 py-0.5 border border-line text-ink-tertiary"
                          style={{ borderRadius: '2px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </Container>

      <MidCTA
        heading="Have a feature request?"
        subheading="We read every piece of feedback. Email us or join our community Slack."
        primaryLabel="Submit feedback"
        primaryHref="mailto:feedback@deploytitan.com"
        secondaryLabel="View changelog"
        secondaryHref="/changelog"
        secondaryExternal={false}
      />
    </div>
  )
}
