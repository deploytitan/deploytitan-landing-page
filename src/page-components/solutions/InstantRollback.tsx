'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import Link from 'next/link'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'

const PHASES = [
  {
    number: '01',
    title: 'SLO breach detected — automatically',
    body: 'Phoenix continuously watches the SLO metrics you define. The moment a measurement window closes over your threshold, Phoenix triggers — no alert, no Slack message, no human in the loop.',
    metric: { value: '< 30s', label: 'median time to rollback decision' },
  },
  {
    number: '02',
    title: 'Blast radius scoped to the failing slice',
    body: "Phoenix doesn't roll back your whole service. It identifies exactly which cohort, region, or feature-flag state is failing — and reverts only that. Every other user keeps running the new version.",
    metric: { value: 'Scoped', label: 'only the failing slice reverted' },
  },
  {
    number: '03',
    title: 'Traffic restored in under 10 seconds',
    body: 'Once the scope is determined, Phoenix reverses the traffic shift. No redeploy, no pipeline run, no manual approval. The release is preserved — only its routing is changed.',
    metric: { value: '< 10s', label: 'median traffic restoration time' },
  },
  {
    number: '04',
    title: 'Incident packet generated automatically',
    body: 'Every Phoenix action produces a structured incident packet: what SLO breached, which cohort was affected, how long the impact lasted, and what was reverted. Feeds directly into Titan Insight.',
    metric: { value: 'Zero', label: 'manual approvals required in auto mode' },
  },
]

const BEFORE = [
  'On-call woken up to decide whether to roll back',
  'Full service rollback — even unaffected users impacted',
  'Rollback = redeploy last tag and watch dashboards for 20 minutes',
  'Incident timeline reconstructed manually from logs',
]

const AFTER = [
  'Phoenix detects and responds before on-call even wakes up',
  'Scoped rollback — only the failing cohort reverted',
  'Traffic restored in under 10 seconds, no redeploy needed',
  'Structured incident packet generated automatically on every action',
]

const POLICY_SNIPPET = `# titan.yaml — phoenix rollback policy
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
    packet: true         # generate incident packet for Titan Insight`

export default function SolutionInstantRollback() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 mb-6"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal-success" />
            Powered by Titan Phoenix
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Undo a bad release
            <br className="hidden md:block" /> before users notice.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Instant rollback isn't a runbook. It's an automatic system that detects SLO breaches,
            scopes the blast radius, and restores traffic in under 10 seconds — without waking
            anyone up.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <Link
              href="/products/titan-phoenix"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Explore Titan Phoenix →
            </Link>
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The transformation
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Before and after instant rollback.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-reveal>
            {/* Before */}
            <Card padding="none" className="p-8">
              <p className="text-[11px] font-mono tracking-widest uppercase text-red-400/70 mb-5">
                Without DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {BEFORE.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="mt-1 shrink-0 w-4 h-4 flex items-center justify-center border border-red-300/30 text-red-400/60 text-[10px] font-mono">
                      ✗
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
            {/* After */}
            <div className="sharp-card border border-primary/25 p-8 bg-primary/[0.02]">
              <p className="text-[11px] font-mono tracking-widest uppercase text-primary mb-5">
                With DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {AFTER.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="mt-1 shrink-0 w-4 h-4 flex items-center justify-center border border-primary/30 text-primary text-[10px] font-mono">
                      ✓
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How it works
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Four steps. Under 10 seconds.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHASES.map((phase, i) => (
              <Card
                key={phase.number}
                padding="none"
                className="p-8 hover:border-primary/20 transition-all duration-200"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-3xl font-bold text-ink/8 leading-none select-none">
                    {phase.number}
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{phase.metric.value}</p>
                    <p className="text-[10px] text-ink-tertiary font-mono uppercase tracking-wider">
                      {phase.metric.label}
                    </p>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-ink mb-2 leading-snug">
                  {phase.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{phase.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Policy config */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Configuration
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Define your rollback policy once.
            </h2>
            <p className="text-sm text-ink-secondary">
              A single stanza in your{' '}
              <code className="font-mono text-primary text-xs">titan.yaml</code> is all Phoenix
              needs. No runbooks, no on-call scripts.
            </p>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-danger/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-warning/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-success/40" />
              <span className="font-mono text-[10px] text-ink-quaternary ml-2">titan.yaml</span>
            </div>
            <pre className="p-5 font-mono text-xs text-ink-secondary leading-relaxed overflow-x-auto">
              {POLICY_SNIPPET}
            </pre>
          </Card>
        </Container>
      </section>

      
    </>
  )
}
