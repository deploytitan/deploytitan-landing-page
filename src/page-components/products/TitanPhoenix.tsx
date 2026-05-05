'use client'

import { APP_URL } from '@/lib/env'
import { MidCTA } from '../../components/MidCTA'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const POLICY_SNIPPET = `# titan.yaml
rollback:
  triggers:
    - slo: api-error-rate
      threshold: 0.5%
      window: 2m
  scope: cohort          # only the affected cohort, not the whole service
  mode: auto             # no human required
  dry_run: false         # set true to simulate without acting
  post_rollback:
    notify: [slack, pagerduty]
    packet: true         # generate incident packet for Insight`

const CAPABILITIES = [
  {
    title: 'SLO-triggered automatic rollback',
    desc: 'Define an SLO threshold and a measurement window. Phoenix watches continuously and acts the moment the window closes over the limit — no alert fatigue, no human required.',
  },
  {
    title: 'Scoped rollback — cohort, region, or flag',
    desc: 'Phoenix doesn\'t roll back the whole service. It identifies the exact slice that\'s failing — a specific user cohort, a single region, or a feature flag state — and reverts only that.',
  },
  {
    title: 'Feature-flag-aware rollback',
    desc: 'When a flag is the blast surface, Phoenix flips it — not the binary. Your users on unaffected variants keep running the new version without interruption.',
  },
  {
    title: 'Rollback simulation / dry-run',
    desc: 'Run Phoenix in dry-run mode against a policy before deploying it to production. See exactly what would be rolled back, and what would be left untouched.',
  },
  {
    title: 'Post-rollback incident packet',
    desc: 'Every Phoenix action produces a structured incident packet: what failed, what was reverted, which users were affected, and for how long. Feeds directly into Titan Insight.',
  },
  {
    title: 'Audit trail',
    desc: 'Every rollback — automatic or manual — is recorded with the triggering SLO breach, the scope of the action, the actor (Phoenix or human), and the resolution time.',
  },
]

const METRICS = [
  { value: '< 30s', label: 'Median time to rollback decision' },
  { value: 'Scoped', label: 'Only the failing slice reverted' },
  { value: 'Zero', label: 'Manual approvals required in auto mode' },
  { value: 'Dry-run', label: 'Test any policy before it ships' },
]

const CROSS_LINKS = [
  { label: 'Titan Rollout', desc: 'Move traffic to a new version, safely', href: '/products/titan-rollout' },
  { label: 'Titan Foresight', desc: 'Score every change before it ships', href: '/products/titan-foresight' },
  { label: 'Titan Ledger', desc: 'Every deploy, measured automatically', href: '/products/titan-ledger' },
]

export default function TitanPhoenix() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Titan Phoenix · Recover
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            Undo a bad release
            <br className="hidden md:block" /> in seconds — only where it broke.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            When a release breaks, Phoenix doesn't roll back the whole service. It reverts the
            exact slice that's failing — bad cohort, bad region, bad flag — triggered by your
            SLOs in seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-primary text-ink text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-2 border border-line text-ink-secondary text-sm px-5 py-2.5 hover:border-primary/40 hover:text-ink transition-colors"
              style={{ borderRadius: '2px' }}
            >
              How it works
            </a>
          </div>
        </Container>
      </section>

      {/* Wedge framing */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            How Phoenix is different
          </p>
          <blockquote className="text-xl font-semibold text-ink leading-snug mb-4 border-l-2 border-primary pl-5">
            "Argo rolls back the deployment.<br />Phoenix rolls back the failure."
          </blockquote>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Deployment-level rollback tools revert the whole service. Phoenix identifies the scope
            of the failure first — then acts only on that scope. The rest of your users keep
            running the new version.
          </p>
        </Container>
      </section>

      {/* Metrics */}
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
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Capabilities
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              The only product in the suite that undoes a release.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Scoped, SLO-triggered, and audited — every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((c) => (
              <Card key={c.title} className="flex flex-col gap-3" data-reveal>
                <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                <p className="text-xs text-ink-tertiary leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Policy snippet */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div data-reveal>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
                Policy as code
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                Define once. Runs automatically.
              </h2>
              <p className="text-ink-secondary leading-relaxed mb-6">
                Phoenix rollback policy lives in your repo alongside your deploy config. Every SLO
                threshold, every scope constraint, every notification — version-controlled and
                reviewable.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'SLO thresholds and measurement windows as code',
                  'Scope: cohort, region, flag, or service-wide',
                  'Dry-run mode to validate policy before production',
                  'Post-rollback packet generation for incident review',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                titan.yaml
              </p>
              <CodeBlock code={POLICY_SNIPPET} lang="yaml" filename="titan.yaml" />
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-links */}
      <section className="py-16 border-t border-line">
        <Container width="6xl" padding="default">
          <p className="text-xs font-mono tracking-widest uppercase text-ink-tertiary mb-6" data-reveal>
            Also in DeployTitan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CROSS_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="sharp-card border border-line p-5 flex flex-col gap-1.5 hover:border-primary/30 hover:bg-surface-alt/50 transition-colors"
                data-reveal
              >
                <span className="text-sm font-semibold text-ink">{l.label}</span>
                <span className="text-xs text-ink-tertiary">{l.desc}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <MidCTA
        heading="Stop treating every rollback like a fire drill."
        subheading="14-day free trial. No credit card. Phoenix responds to your first SLO breach in under 30 seconds."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Talk to an engineer"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
