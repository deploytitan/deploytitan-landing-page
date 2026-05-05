'use client'

import { APP_URL } from '@/lib/env'
import Link from 'next/link'
import { useScrollReveal } from '../../utils'

/* ── Mini visual: Titan Foresight ── */
function ForesightVisual() {
  const checks = [
    { label: 'Dependency graph', value: '4 services affected', level: 'warn' },
    { label: 'Change velocity', value: '+3 PRs this hour', level: 'warn' },
    { label: 'Auth service', value: 'unrelated — safe', level: 'ok' },
    { label: 'Payment gateway', value: 'dependency flagged', level: 'err' },
  ]
  return (
    <div className="p-6 h-full flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-ink-quaternary mb-1">
        <span className="w-2 h-2 rounded-full bg-primary/60 animate-[pulse-anim_2s_ease-in-out_infinite]" />
        <span>titan-foresight · PR #2847 analysis</span>
      </div>
      {checks.map((c) => (
        <div key={c.label} className="flex items-start justify-between gap-4">
          <span className="text-ink-tertiary shrink-0">{c.label}</span>
          <span className={`text-right ${c.level === 'err' ? 'text-signal-danger' : c.level === 'warn' ? 'text-signal-warning' : 'text-signal-success'}`}>
            {c.value}
          </span>
        </div>
      ))}
      <div className="mt-auto border-t border-line pt-3 flex items-center justify-between">
        <span className="text-ink-tertiary">Risk score</span>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 bg-line rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-signal-warning rounded-full" />
          </div>
          <span className="text-signal-warning font-semibold">Medium</span>
        </div>
      </div>
    </div>
  )
}

/* ── Mini visual: Titan Rollout ── */
function RolloutVisual() {
  return (
    <div className="p-6 h-full flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-ink-quaternary mb-1">
        <span className="w-2 h-2 rounded-full bg-signal-success animate-[pulse-anim_2s_ease-in-out_infinite]" />
        <span>titan-rollout · canary deploy active</span>
      </div>
      {[
        { label: 'v2.4.1 (stable)', pct: 75, color: 'bg-primary/30' },
        { label: 'v2.4.2 (canary)', pct: 25, color: 'bg-signal-deploy/70' },
      ].map((v) => (
        <div key={v.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-ink-secondary">{v.label}</span>
            <span className="text-ink font-semibold">{v.pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-line overflow-hidden">
            <div className={`h-full ${v.color} rounded-full transition-all duration-1000`} style={{ width: `${v.pct}%` }} />
          </div>
        </div>
      ))}
      <div className="mt-2 border border-signal-success/20 bg-signal-success/5 rounded-sm p-3 flex flex-col gap-1">
        <span className="text-signal-success">✓ SLOs holding — error rate 0.02%</span>
        <span className="text-ink-tertiary">p95 latency: 118ms · threshold: 250ms</span>
        <span className="text-primary/80 mt-1">→ Promoting to 50% in 4 min…</span>
      </div>
      <div className="mt-auto border-t border-line pt-3 text-ink-tertiary flex items-center justify-between">
        <span>Auto-pause armed</span>
        <span className="text-signal-success">● monitoring</span>
      </div>
    </div>
  )
}

/* ── Mini visual: Titan Shield ── */
function ShieldVisual() {
  const regions = [
    { label: 'AWS us-east-1', status: 'healthy', latency: '12ms' },
    { label: 'GCP us-central1', status: 'healthy', latency: '18ms' },
    { label: 'Azure eastus', status: 'failover', latency: '—' },
  ]
  return (
    <div className="p-6 h-full flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-ink-quaternary mb-1">
        <span className="w-2 h-2 rounded-full bg-signal-warning animate-[pulse-anim_1.5s_ease-in-out_infinite]" />
        <span>titan-shield · failover in progress</span>
      </div>
      {regions.map((r) => (
        <div key={r.label} className={`flex items-center justify-between border rounded-sm px-3 py-2.5 transition-colors ${r.status === 'failover' ? 'border-signal-warning/40 bg-signal-warning/5' : 'border-line'}`}>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'healthy' ? 'bg-signal-success' : 'bg-signal-warning animate-[pulse-anim_1s_ease-in-out_infinite]'}`} />
            <span className="text-ink-secondary">{r.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={r.status === 'failover' ? 'text-signal-warning' : 'text-ink-tertiary'}>{r.latency}</span>
            <span className={`text-[10px] uppercase tracking-wide ${r.status === 'failover' ? 'text-signal-warning' : 'text-signal-success'}`}>{r.status}</span>
          </div>
        </div>
      ))}
      <div className="border border-line rounded-sm px-3 py-2.5 text-ink-tertiary flex items-center justify-between">
        <span>Traffic rerouted to AWS + GCP</span>
        <span className="text-signal-success">automatic</span>
      </div>
    </div>
  )
}

/* ── Mini visual: Titan Ledger ── */
function LedgerVisual() {
  const metrics = [
    { label: 'Deploy frequency', value: '4.2 / day', trend: '+12%' },
    { label: 'Lead time', value: '38 min', trend: '-8%' },
    { label: 'Change failure rate', value: '1.4%', trend: '-3%' },
    { label: 'MTTR', value: '11 min', trend: '-22%' },
  ]
  return (
    <div className="p-6 h-full flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-ink-quaternary mb-1">
        <span className="w-2 h-2 rounded-full bg-primary/60 animate-[pulse-anim_3s_ease-in-out_infinite]" />
        <span>titan-ledger · DORA · last 30 days</span>
      </div>
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center justify-between">
          <span className="text-ink-tertiary">{m.label}</span>
          <div className="flex items-center gap-3">
            <span className="text-ink font-semibold">{m.value}</span>
            <span className={`text-[10px] ${m.trend.startsWith('-') ? 'text-signal-success' : 'text-signal-warning'}`}>{m.trend}</span>
          </div>
        </div>
      ))}
      <div className="mt-auto border-t border-line pt-3 text-ink-tertiary text-[10px]">
        Sourced from CI/CD events · no agents · no tagging
      </div>
    </div>
  )
}

/* ── Platform Overview section ── */
const products = [
  {
    route: '/products/titan-foresight',
    eyebrow: 'Detect · Titan Foresight',
    name: 'See risk before it ships.',
    tagline: 'One explained risk score per PR — before a single byte of traffic changes.',
    description: 'Foresight reads each pull request against your live dependency graph and produces one score: safe, review, or hold. Every flag is explained. No runbook required.',
    bullets: [
      'Dependency graph analysis — maps which services a change can reach',
      'Change velocity signals — flags bursts of concurrent changes',
      'One score, fully explained — no dashboards to interpret',
    ],
    visual: <ForesightVisual />,
    flip: false,
  },
  {
    route: '/products/titan-rollout',
    eyebrow: 'Deliver · Titan Rollout',
    name: 'Ship progressively. Pause on signal.',
    tagline: 'Cohort rollouts gated on real SLO signals — promote when healthy, pause when not.',
    description: 'Define rollout cohorts, set SLO thresholds, and let Rollout promote or pause automatically. Every release is a named, addressable version. Rollout moves traffic — Phoenix handles recovery.',
    bullets: [
      'Canary and cohort rollouts — promote by error rate, latency, or custom signals',
      'Versioned releases — every deploy is a named, addressable version',
      'Auto-pause on threshold breach — no 3am runbook',
    ],
    visual: <RolloutVisual />,
    flip: true,
  },
  {
    route: '/products/titan-shield',
    eyebrow: 'Defend · Titan Shield',
    name: 'Stay up across every cloud.',
    tagline: 'Multi-cloud failover that happens automatically — before your users notice.',
    description: 'Route traffic intelligently across AWS, GCP, and Azure. When a region degrades, Shield shifts traffic in real time — zero manual intervention. This is infrastructure resilience, not release recovery.',
    bullets: [
      'Automatic failover across AWS, GCP, and Azure',
      'Zero-latency in-memory routing — no proxy overhead',
      'Built-in geo-aware failover policies',
    ],
    visual: <ShieldVisual />,
    flip: false,
  },
  {
    route: '/products/titan-ledger',
    eyebrow: 'Measure · Titan Ledger',
    name: 'DORA metrics. No agents. No tagging.',
    tagline: 'Automatic deploy telemetry — every release measured from your existing CI/CD signals.',
    description: 'Ledger reads your CI/CD events and produces DORA metrics, team scorecards, and trend charts — no instrumentation, no agents, no manual tagging. It records what happened. Insight explains what it meant.',
    bullets: [
      'Four DORA metrics computed automatically from existing events',
      'Team and service scorecards — per-team breakdown out of the box',
      'Trend lines — see whether delivery is improving quarter over quarter',
    ],
    visual: <LedgerVisual />,
    flip: true,
  },
]

export function PlatformOverview() {
  const ref = useScrollReveal()

  return (
    <section className="py-20 lg:py-28 border-t border-line relative" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16 lg:mb-20">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">The platform</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] text-ink leading-tight">
            Detect. Deliver. Defend. Recover. Measure.
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed max-w-lg">
            Five products that cover every stage of the release lifecycle — use one or the full platform.
          </p>
        </div>

        {/* Product teasers */}
        <div className="flex flex-col divide-y divide-line">
          {products.map((p) => (
            <div
              key={p.route}
              data-reveal
              className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Copy */}
              <div className={`flex flex-col gap-6 ${p.flip ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">{p.eyebrow}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink leading-tight">{p.name}</h3>
                  <p className="text-base text-ink-secondary mt-1 font-medium">{p.tagline}</p>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed">{p.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-ink-secondary">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-5 pt-2">
                  <Link
                    href={p.route}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary-dark transition-colors group"
                  >
                    See details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                  <Link href="/docs" className="text-sm text-ink-tertiary hover:text-ink-secondary transition-colors">Read the docs</Link>
                </div>
              </div>

              {/* Visual */}
              <div className={`relative ${p.flip ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="border border-line bg-surface-alt/60 overflow-hidden" style={{ borderRadius: '2px', minHeight: '280px' }}>
                  {p.visual}
                </div>
                <span className="absolute -top-px -left-px w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-primary/30" />
                <span className="absolute -bottom-px -right-px w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-primary/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Platform CTA strip */}
        <div className="mt-12 pt-10 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-ink-secondary">Use one product or the full platform — pricing scales with usage.</p>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-ink-secondary hover:text-ink transition-colors">View pricing →</Link>
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
