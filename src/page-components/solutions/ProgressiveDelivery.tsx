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
    title: 'Risk score before the first byte ships',
    body: 'Titan Foresight analyses every PR against your live dependency graph. You see a 0–100 risk score, blast-radius map, and SLO impact estimate — all before you merge.',
    metric: { value: '< 2s', label: 'analysis time per PR' },
  },
  {
    number: '02',
    title: 'Progressive canary with automatic weight stepping',
    body: 'Deploy to 1% → 10% → 50% → 100% on a schedule you define. Each step is gated by your real SLO metrics — latency, error rate, custom Datadog queries.',
    metric: { value: '3×', label: 'deploy frequency increase' },
  },
  {
    number: '03',
    title: 'Auto-rollback before your on-call wakes up',
    body: 'The moment a metric crosses your threshold, DeployTitan reverses the traffic shift. No human in the loop, no runbook lookup, no 3 AM escalation.',
    metric: { value: '30s', label: 'median rollback time' },
  },
  {
    number: '04',
    title: 'Full deploy lineage for every release',
    body: 'Every deployment is versioned, audited, and linked to the CI run, PR, and deploying engineer. Post-incident RCA takes minutes, not hours.',
    metric: { value: '85%', label: 'fewer production incidents' },
  },
]

const BEFORE = [
  '5-step human approval chain for every release',
  'Friday deploys require a dedicated war-room channel',
  'Rollback = redeploy last tag and watch dashboards',
  'Blast radius discovered in the post-mortem',
]

const AFTER = [
  'Self-service deploys with SLO guardrails',
  'Ship Friday with confidence — rollback is automatic',
  'Single API call to reverse traffic in 30 seconds',
  'Risk scored before the first byte shifts to production',
]

export default function SolutionProgressiveDelivery() {
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
            Powered by Titan Rollout + Titan Foresight
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Ship confidently,
            <br className="hidden md:block" /> every day of the week.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Progressive delivery isn't just canary deploys. It's a full system: risk-scored PRs,
            automated canary stepping, SLO-gated promotion, and instant rollback — wired together so
            your team ships faster without accepting more risk.
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
              href="/products/titan-rollout"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Explore Titan Rollout →
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
              Before and after DeployTitan.
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
              Four phases, one workflow.
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

      {/* Code snippet */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              One command
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Canary to production in a single CLI call.
            </h2>
            <p className="text-sm text-ink-secondary">
              Everything else — traffic stepping, metric polling, rollback decisions — happens
              automatically.
            </p>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-danger/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-warning/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-success/40" />
              <span className="font-mono text-[10px] text-ink-quaternary ml-2">terminal</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
              <p className="text-ink-quaternary">
                # Deploy with canary strategy, auto-rollback on SLO breach
              </p>
              <p className="text-ink mt-2">
                <span className="text-primary">$</span> dt deploy --strategy canary --canary-weight
                5 --auto-rollback
              </p>
              <p className="text-ink-tertiary mt-3">
                ✓ Risk score: 12/100 (low) — 0 SLO violations in last 7d
              </p>
              <p className="text-ink-tertiary">
                ✓ Blast radius: 2 downstream services (non-critical)
              </p>
              <p className="text-ink-tertiary">→ Shifting 5% traffic to v2.4.1...</p>
              <p className="text-signal-success mt-1">
                ✓ p99 stable at 43ms (+2ms). Stepping to 25%.
              </p>
              <p className="text-signal-success">✓ p99 stable at 44ms. Stepping to 100%.</p>
              <p className="text-primary mt-1 font-semibold">✓ Deploy complete — 8m 43s total.</p>
            </div>
          </Card>
        </Container>
      </section>

      
    </>
  )
}
