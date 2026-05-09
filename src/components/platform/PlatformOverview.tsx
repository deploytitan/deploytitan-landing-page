'use client'

import React from 'react'
import { APP_URL, STEALTH_PRODUCTS } from '@/lib/env'
import Link from 'next/link'
import { useScrollReveal } from '../../utils'
import { RoadmapBadge } from '../shared/RoadmapBadge'

/* ── Mini visual: Titan Foresight ── */
function ForesightVisual() {
  const checks = [
    { label: 'Dependency graph', value: '4 services affected', level: 'warn' },
    { label: 'Change velocity', value: '+3 PRs this hour', level: 'warn' },
    { label: 'Auth service', value: 'unrelated — safe', level: 'ok' },
    { label: 'Payment gateway', value: 'dependency flagged', level: 'err' },
  ]
  return (
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-primary/60 h-2 w-2 animate-[pulse-anim_2s_ease-in-out_infinite] rounded-full" />
        <span>titan-foresight · PR #2847 analysis</span>
      </div>
      {checks.map((c) => (
        <div key={c.label} className="flex items-start justify-between gap-4">
          <span className="text-ink-tertiary shrink-0">{c.label}</span>
          <span
            className={`text-right ${c.level === 'err' ? 'text-signal-danger' : c.level === 'warn' ? 'text-signal-warning' : 'text-signal-success'}`}
          >
            {c.value}
          </span>
        </div>
      ))}
      <div className="border-line mt-auto flex items-center justify-between border-t pt-3">
        <span className="text-ink-tertiary">Risk score</span>
        <div className="flex items-center gap-2">
          <div className="bg-line h-1.5 w-24 overflow-hidden rounded-full">
            <div className="bg-signal-warning h-full w-3/5 rounded-full" />
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
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-signal-success h-2 w-2 animate-[pulse-anim_2s_ease-in-out_infinite] rounded-full" />
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
          <div className="bg-line h-2 overflow-hidden rounded-full">
            <div
              className={`h-full ${v.color} rounded-full transition-all duration-1000`}
              style={{ width: `${v.pct}%` }}
            />
          </div>
        </div>
      ))}
      <div className="border-signal-success/20 bg-signal-success/5 mt-2 flex flex-col gap-1 rounded-sm border p-3">
        <span className="text-signal-success">✓ SLOs holding — error rate 0.02%</span>
        <span className="text-ink-tertiary">p95 latency: 118ms · threshold: 250ms</span>
        <span className="text-primary/80 mt-1">→ Promoting to 50% in 4 min…</span>
      </div>
      <div className="border-line text-ink-tertiary mt-auto flex items-center justify-between border-t pt-3">
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
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-signal-warning h-2 w-2 animate-[pulse-anim_1.5s_ease-in-out_infinite] rounded-full" />
        <span>titan-shield · failover in progress</span>
      </div>
      {regions.map((r) => (
        <div
          key={r.label}
          className={`flex items-center justify-between rounded-sm border px-3 py-2.5 transition-colors ${r.status === 'failover' ? 'border-signal-warning/40 bg-signal-warning/5' : 'border-line'}`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${r.status === 'healthy' ? 'bg-signal-success' : 'bg-signal-warning animate-[pulse-anim_1s_ease-in-out_infinite]'}`}
            />
            <span className="text-ink-secondary">{r.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={r.status === 'failover' ? 'text-signal-warning' : 'text-ink-tertiary'}>
              {r.latency}
            </span>
            <span
              className={`text-[10px] tracking-wide uppercase ${r.status === 'failover' ? 'text-signal-warning' : 'text-signal-success'}`}
            >
              {r.status}
            </span>
          </div>
        </div>
      ))}
      <div className="border-line text-ink-tertiary flex items-center justify-between rounded-sm border px-3 py-2.5">
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
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-primary/60 h-2 w-2 animate-[pulse-anim_3s_ease-in-out_infinite] rounded-full" />
        <span>titan-ledger · DORA · last 30 days</span>
      </div>
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center justify-between">
          <span className="text-ink-tertiary">{m.label}</span>
          <div className="flex items-center gap-3">
            <span className="text-ink font-semibold">{m.value}</span>
            <span
              className={`text-[10px] ${m.trend.startsWith('-') ? 'text-signal-success' : 'text-signal-warning'}`}
            >
              {m.trend}
            </span>
          </div>
        </div>
      ))}
      <div className="border-line text-ink-tertiary mt-auto border-t pt-3 text-[10px]">
        Sourced from CI/CD events · no agents · no tagging
      </div>
    </div>
  )
}

/* ── Mini visual: Titan Phoenix ── */
function PhoenixVisual() {
  const steps = [
    { label: 'Incident detected', time: '14:03:01', done: true },
    { label: 'Blast radius scoped', time: '14:03:04', done: true },
    { label: 'Rollback targeted', time: '14:03:07', done: true },
    { label: 'Traffic restored', time: '14:03:09', done: true },
  ]
  return (
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-signal-danger h-2 w-2 animate-[pulse-anim_1s_ease-in-out_infinite] rounded-full" />
        <span>titan-phoenix · recovery in progress</span>
      </div>
      {steps.map((s) => (
        <div key={s.label} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${s.done ? 'bg-signal-success' : 'bg-line'}`}
            />
            <span className={s.done ? 'text-ink-secondary' : 'text-ink-quaternary'}>{s.label}</span>
          </div>
          <span className="text-ink-tertiary">{s.time}</span>
        </div>
      ))}
      <div className="border-line mt-auto flex items-center justify-between border-t pt-3">
        <span className="text-ink-tertiary">Total recovery time</span>
        <span className="text-signal-success font-semibold">8 seconds</span>
      </div>
    </div>
  )
}

/* ── Mini visual: Titan Insight ── */
function InsightVisual() {
  const correlations = [
    { release: 'v2.4.1', metric: 'Checkout conversion', delta: '+2.3%', signal: 'pos' },
    { release: 'v2.4.1', metric: 'API error rate', delta: '-0.4%', signal: 'pos' },
    { release: 'v2.3.9', metric: 'Session duration', delta: '-1.1%', signal: 'neg' },
  ]
  return (
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-primary/60 h-2 w-2 animate-[pulse-anim_3s_ease-in-out_infinite] rounded-full" />
        <span>titan-insight · deploy → outcome</span>
      </div>
      {correlations.map((c) => (
        <div key={`${c.release}-${c.metric}`} className="flex items-center justify-between gap-2">
          <span className="text-ink-tertiary shrink-0">{c.release}</span>
          <span className="text-ink-secondary flex-1 truncate px-2">{c.metric}</span>
          <span
            className={`font-semibold ${c.signal === 'pos' ? 'text-signal-success' : 'text-signal-danger'}`}
          >
            {c.delta}
          </span>
        </div>
      ))}
      <div className="border-line text-ink-tertiary mt-auto border-t pt-3 text-[10px]">
        Correlates deploys with product metrics · no manual tagging
      </div>
    </div>
  )
}

/* ── Mini visual: Titan Sandbox ── */
function SandboxVisual() {
  const envs = [
    { branch: 'feature/auth-v2', status: 'ready', age: '2m' },
    { branch: 'fix/checkout-flash', status: 'ready', age: '8m' },
    { branch: 'chore/deps-bump', status: 'building', age: '1m' },
  ]
  return (
    <div className="flex h-full flex-col gap-4 p-6 font-mono text-xs">
      <div className="text-ink-quaternary mb-1 flex items-center gap-2">
        <span className="bg-signal-deploy/70 h-2 w-2 animate-[pulse-anim_2.5s_ease-in-out_infinite] rounded-full" />
        <span>titan-sandbox · branch environments</span>
      </div>
      {envs.map((e) => (
        <div
          key={e.branch}
          className="border-line flex items-center justify-between gap-3 rounded-sm border px-3 py-2"
        >
          <span className="text-ink-secondary truncate">{e.branch}</span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-ink-tertiary">{e.age}</span>
            <span
              className={`text-[10px] tracking-wide uppercase ${e.status === 'ready' ? 'text-signal-success' : 'text-primary/70'}`}
            >
              {e.status}
            </span>
          </div>
        </div>
      ))}
      <div className="border-line text-ink-tertiary mt-auto border-t pt-3 text-[10px]">
        Full production topology per branch · spun up on PR open
      </div>
    </div>
  )
}

/* ── Platform Overview section ── */
const products: {
  route: string
  eyebrow: string
  name: string
  tagline: string
  description: string
  bullets: string[]
  visual: React.ReactNode
  badge?: 'available' | 'preview' | 'roadmap'
  stealth?: boolean
}[] = [
  {
    route: '/products/titan-foresight',
    eyebrow: 'Detect · Titan Foresight',
    name: 'See risk before it ships.',
    tagline: 'One explained risk score per PR — before a single byte of traffic changes.',
    description:
      'Foresight reads each pull request against your live dependency graph and produces one score: safe, review, or hold. Every flag is explained. No runbook required.',
    bullets: [
      'Dependency graph analysis — maps which services a change can reach',
      'Change velocity signals — flags bursts of concurrent changes',
      'One score, fully explained — no dashboards to interpret',
    ],
    visual: <ForesightVisual />,
  },
  {
    route: '/products/titan-rollout',
    eyebrow: 'Deliver · Titan Rollout',
    name: 'Ship progressively. Pause on signal.',
    tagline: 'Cohort rollouts gated on real SLO signals — promote when healthy, pause when not.',
    description:
      'Define rollout cohorts, set SLO thresholds, and let Rollout promote or pause automatically. Every release is a named, addressable version. Rollout moves traffic — Phoenix handles recovery.',
    bullets: [
      'Canary and cohort rollouts — promote by error rate, latency, or custom signals',
      'Versioned releases — every deploy is a named, addressable version',
      'Auto-pause on threshold breach — no 3am runbook',
    ],
    visual: <RolloutVisual />,
  },
  {
    route: '/products/titan-phoenix',
    eyebrow: 'Recover · Titan Phoenix',
    name: 'Undo a bad release in seconds.',
    tagline: 'Surgical rollback scoped to exactly where the release broke — nothing else.',
    description:
      'When a release causes an incident, Phoenix scopes the blast radius, targets only the affected cohort, and restores traffic in under 10 seconds. No full redeploy. No manual steps.',
    bullets: [
      'Blast-radius scoping — rolls back only the affected slice of traffic',
      'Sub-10 second recovery — automated, not scripted',
      'Paired with Rollout — promotes carefully, recovers instantly',
    ],
    visual: <PhoenixVisual />,
    stealth: false,
  },
  ...(!STEALTH_PRODUCTS
    ? ([
        {
          route: '/products/titan-ledger',
          eyebrow: 'Measure · Titan Ledger',
          name: 'DORA metrics. No agents. No tagging.',
          tagline:
            'Automatic deploy telemetry — every release measured from your existing CI/CD signals.',
          description:
            'Ledger reads your CI/CD events and produces DORA metrics, team scorecards, and trend charts — no instrumentation, no agents, no manual tagging. It records what happened. Insight explains what it meant.',
          bullets: [
            'Four DORA metrics computed automatically from existing events',
            'Team and service scorecards — per-team breakdown out of the box',
            'Trend lines — see whether delivery is improving quarter over quarter',
          ],
          visual: <LedgerVisual />,
          stealth: true,
        },
        {
          route: '/products/titan-insight',
          eyebrow: 'Understand · Titan Insight',
          name: 'Did this release actually improve anything?',
          tagline:
            'Deploy-to-metric correlation — know the outcome of every release, not just the act.',
          description:
            'Insight correlates every deploy with the product and business metrics that followed. See which releases drove improvements and which quietly degraded the experience.',
          bullets: [
            'Automatic deploy-to-outcome correlation — no manual tagging',
            'Business metric integration — revenue, conversion, engagement',
            'Release retrospectives — before and after, per deploy',
          ],
          visual: <InsightVisual />,
          badge: 'roadmap' as const,
          stealth: true,
        },
        {
          route: '/products/titan-sandbox',
          eyebrow: 'Preview · Titan Sandbox',
          name: 'A production-shaped environment for every branch.',
          tagline: 'Spin up a full-fidelity environment per PR — no shared staging, no queue.',
          description:
            'Every branch gets its own isolated environment that mirrors production topology. Test with real service dependencies, real data shapes, and real traffic patterns — before any user sees it.',
          bullets: [
            'Per-branch environments — spun up on PR open, torn down on merge',
            'Production topology mirror — no mocked services',
            'Zero queue — every engineer gets an environment, immediately',
          ],
          visual: <SandboxVisual />,
          badge: 'roadmap' as const,
          stealth: true,
        },
        {
          route: '/products/titan-shield',
          eyebrow: 'Defend · Titan Shield',
          name: 'Stay up across every cloud.',
          tagline: 'Multi-cloud failover that happens automatically — before your users notice.',
          description:
            'Route traffic intelligently across AWS, GCP, and Azure. When a region degrades, Shield shifts traffic in real time — zero manual intervention. This is infrastructure resilience, not release recovery.',
          bullets: [
            'Automatic failover across AWS, GCP, and Azure',
            'Zero-latency in-memory routing — no proxy overhead',
            'Built-in geo-aware failover policies',
          ],
          visual: <ShieldVisual />,
          stealth: true,
        },
      ] as typeof products)
    : []),
]

export function PlatformOverview() {
  const ref = useScrollReveal()

  const numberInTextObj: Record<number, string> = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
  }
  const numberInText = numberInTextObj[products.length]

  return (
    <section className="border-line relative border-t pt-20 pb-10 lg:pt-28" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center gap-3 text-center lg:mb-20">
          <span className="text-primary font-mono text-xs tracking-widest uppercase">
            The platform
          </span>
          <h2 className="font-display text-ink text-3xl leading-tight font-medium tracking-[-0.02em] md:text-4xl">
            {numberInText} products. One release lifecycle.
          </h2>
          <p className="text-ink-secondary max-w-lg text-base leading-relaxed">
            {numberInText} products that cover every stage — from pre-merge risk to post-release
            outcome. Use one or the full platform.
          </p>
        </div>

        {/* Product teasers */}
        <div className="divide-line flex flex-col divide-y">
          {products.map((p, index) => (
            <div
              key={p.route}
              data-reveal
              className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20"
            >
              {/* Copy */}
              <div
                className={`flex flex-col gap-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-mono text-xs tracking-widest uppercase">
                      {p.eyebrow}
                    </span>
                    {p.badge && <RoadmapBadge variant={p.badge} />}
                  </div>
                  <h3 className="font-display text-ink text-2xl leading-tight font-semibold tracking-[-0.02em] md:text-3xl">
                    {p.name}
                  </h3>
                  <p className="text-ink-secondary mt-1 text-base font-medium">{p.tagline}</p>
                </div>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-ink-secondary flex items-start gap-3 text-sm">
                      <span className="bg-primary/60 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-5 pt-2">
                  <Link
                    href={p.route}
                    className="text-ink hover:text-primary-dark group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    See details
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/docs"
                    className="text-ink-tertiary hover:text-ink-secondary text-sm transition-colors"
                  >
                    Read the docs
                  </Link>
                </div>
              </div>

              {/* Visual */}
              <div className={`relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div
                  className="border-line bg-surface-alt/60 overflow-hidden border"
                  style={{ borderRadius: '2px', minHeight: '280px' }}
                >
                  {p.visual}
                </div>
                <span className="border-primary/30 absolute -top-px -left-px h-3 w-3 border-t-[1.5px] border-l-[1.5px]" />
                <span className="border-primary/30 absolute -right-px -bottom-px h-3 w-3 border-r-[1.5px] border-b-[1.5px]" />
              </div>
            </div>
          ))}
        </div>

        {/* Platform CTA strip */}
        <div className="border-line mt-12 flex flex-col items-center justify-between gap-6 border-t pt-10 sm:flex-row">
          <p className="text-ink-secondary text-sm">
            Use one product or the full platform — pricing scales with usage.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-ink-secondary hover:text-ink text-sm transition-colors"
            >
              View pricing →
            </Link>
            <a
              href={`${APP_URL}/signup`}
              className="bg-ink text-surface dark:text-surface inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] active:scale-[0.97]"
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
