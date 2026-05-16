'use client'

import { useScrollReveal } from '../../utils'
import { RoadmapBadge } from '../../components/shared/RoadmapBadge'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const CROSS_LINKS = [
  {
    label: 'Titan Rollouts',
    desc: 'Coordinate multi-service releases',
    href: '/products/titan-rollout',
  },
  {
    label: 'Release Coordination',
    desc: 'Orchestrate multi-service releases end to end',
    href: '/solutions/release-coordination',
  },
  {
    label: 'Release Intelligence',
    desc: 'Visibility into every release in flight',
    href: '/solutions/release-intelligence',
  },
]

const CAPABILITIES = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Zero-instrumentation event bus',
    desc: 'Every deploy emits structured events automatically: stage transitions, health-gate outcomes, and completion status, captured from the controller, not the workload.',
    badge: 'available' as const,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'DORA metrics out of the box',
    desc: 'Deployment frequency, lead time, change failure rate, and MTTR, computed automatically from deploy events. No manual tagging, no spreadsheets.',
    badge: 'preview' as const,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Historical trend analysis',
    desc: 'Compare deploy velocity and failure rates across sprints, quarters, or releases. Spot regressions in team performance before they compound.',
    badge: 'preview' as const,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Team & service scorecards',
    desc: 'Benchmark deploy health by team, service, or domain. Identify which squads are shipping fastest and most reliably, and share what works.',
    badge: 'roadmap' as const,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Native exporters',
    desc: 'Ship deploy history to Datadog, Prometheus, Grafana, or any OpenTelemetry collector. Retention and routing configurable per team.',
    badge: 'available' as const,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Threshold-based notifications',
    desc: 'Set delivery targets for when a metric crosses a defined threshold. Slack, PagerDuty, and webhook delivery.',
    badge: 'roadmap' as const,
  },
]

const METRICS = [
  { value: '4 DORA', label: 'Metrics computed automatically' },
  { value: '100%', label: 'Deploy events captured' },
  { value: '0', label: 'Manual tagging required' },
  { value: 'OTel', label: 'Native exporter format' },
]

const DORA_METRICS = [
  {
    metric: 'Deployment Frequency',
    desc: 'How often does your team ship to production? Ledger counts every completed deploy, broken down by service, team, and environment.',
    benchmark: 'Elite: multiple times per day',
  },
  {
    metric: 'Lead Time for Changes',
    desc: 'Time from commit to production. Ledger connects deploy events to CI pipelines to compute end-to-end flow efficiency.',
    benchmark: 'Elite: less than one hour',
  },
  {
    metric: 'Change Failure Rate',
    desc: 'What percentage of releases required a remediation? Ledger tracks every failure event and its resolution.',
    benchmark: 'Elite: 0–15%',
  },
  {
    metric: 'Mean Time to Recovery',
    desc: 'How quickly do you restore service after an incident? Measured from first failure event to confirmed recovery.',
    benchmark: 'Elite: less than one hour',
  },
]

export default function TitanLedger() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Ledger · Measure"
        badge="roadmap"
        heading={<>Every deploy,<br className="hidden md:block" /> measured automatically.</>}
        description="Ledger turns the events your deploys already produce into history you can act on. DORA, trends, and team scorecards: no agents, no tagging."
        ctas={[
          { label: 'Join early access', href: '/pricing' },
          { label: 'How it works', href: '/how-it-works', variant: 'secondary' },
        ]}
      />

      {/* What Ledger owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
            What Ledger owns
          </p>
          <h2 className="text-xl font-semibold text-ink mb-3">
            Ledger owns the truth about how you deploy.
          </h2>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Not predictions, not judgments, but facts. Ledger is the historical record of every deploy
            event your system produced. Neutral, complete, and queryable.
          </p>
        </Container>
      </section>

      {/* Headline metrics */}
      <section className="py-14 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-surface px-6 py-8 text-center" data-reveal>
                <p className="text-3xl font-semibold text-ink mb-1">{m.value}</p>
                <p className="text-xs text-ink-tertiary font-mono">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Capabilities
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              The complete record of how your team ships.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Built on top of DeployTitan's event bus: no agents, no sidecars, no manual
              instrumentation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((c) => (
              <Card key={c.title} className="flex flex-col gap-3" data-reveal>
                <div className="flex items-start justify-between">
                  <span className="text-primary/70">{c.icon}</span>
                  <RoadmapBadge variant={c.badge} />
                </div>
                <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                <p className="text-xs text-ink-tertiary leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Architecture */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-reveal>
              <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
                Architecture
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                Zero-instrumentation telemetry.
              </h2>
              <p className="text-ink-secondary leading-relaxed mb-6">
                Ledger is built directly into the DeployTitan controller. Every deploy stage emits
                structured events automatically. There's nothing to wire up.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Events emitted by the controller, not the workload',
                  'Structured JSON: queryable with any BI or log tool',
                  'Native Datadog, Prometheus, Grafana, and OTel exporters',
                  'Retention and routing configurable per team',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                    <span className="w-1.5 h-1.5 bg-primary/60 shrink-0 mt-1.5" style={{ borderRadius: '1px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sharp-card border border-line p-6 bg-ink dark:bg-surface" data-reveal>
              <p className="text-xs font-mono text-surface/40 uppercase tracking-widest mb-5">
                Event flow
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'dt deploy', sub: 'CLI / CI trigger', color: 'text-primary' },
                  {
                    label: 'DeployTitan Controller',
                    sub: 'Orchestration + health gates',
                    color: 'text-surface/80',
                  },
                  {
                    label: 'Ledger Event Bus',
                    sub: 'Structured deploy events',
                    color: 'text-primary',
                  },
                  {
                    label: 'DORA · Trends · Exporters',
                    sub: 'Your analytics stack',
                    color: 'text-surface/80',
                  },
                ].map((row, i) => (
                  <div key={row.label}>
                    <div className="sharp-card border border-line/30 bg-surface-alt/10 px-4 py-3">
                      <p className={`text-sm font-mono font-medium ${row.color}`}>{row.label}</p>
                      <p className="text-xs text-surface/40">{row.sub}</p>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center py-1">
                        <svg
                          width="12"
                          height="16"
                          viewBox="0 0 12 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-primary/40"
                        >
                          <line x1="6" y1="0" x2="6" y2="12" />
                          <polyline points="3 9 6 12 9 9" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* DORA detail */}
      <section className="py-24 border-b border-line bg-surface-alt/20">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              DORA Metrics
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Automatic engineering health tracking.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              The four DORA metrics, computed from actual deploy events: no spreadsheets, no
              retros, no guessing.
            </p>
            <div className="mt-2">
              <RoadmapBadge variant="preview" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DORA_METRICS.map((d) => (
              <Card key={d.metric} data-reveal>
                <h3 className="text-sm font-semibold text-ink mb-2">{d.metric}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-3">{d.desc}</p>
                <p className="text-xs font-mono text-primary/80">{d.benchmark}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Cross-links */}
      <section className="py-16 border-b border-line">
        <Container width="6xl" padding="default">
          <p
            className="text-xs font-mono tracking-widest uppercase text-ink-tertiary mb-6"
            data-reveal
          >
            Also in DeployTitan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CROSS_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="sharp-card border border-line p-5 flex flex-col gap-1.5 hover:border-primary/30 hover:bg-surface-alt transition-colors"
                data-reveal
                data-reveal-delay={String(i + 1)}
              >
                <span className="text-sm font-semibold text-ink">{l.label}</span>
                <span className="text-xs text-ink-tertiary">{l.desc}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      
    </>
  )
}
