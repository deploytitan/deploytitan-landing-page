import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../utils'

const APP_URL = import.meta.env.VITE_APP_URL as string || 'https://app.deploytitan.com'

/* ── Mini visual: Titan Rollout ── */
function RolloutVisual() {
  return (
    <div className="p-6 h-full flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-ink-quaternary mb-1">
        <span className="w-2 h-2 rounded-full bg-signal-success animate-[pulse-anim_2s_ease-in-out_infinite]" />
        <span>titan-rollout · canary deploy active</span>
      </div>
      {[
        { label: 'v2.4.1 (stable)', pct: 75, color: 'bg-primary/30', status: 'stable' },
        { label: 'v2.4.2 (canary)', pct: 25, color: 'bg-signal-deploy/70', status: 'canary' },
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
        <span>Auto-rollback armed</span>
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

/* ── Mini visual: Titan Sentinel ── */
function SentinelVisual() {
  const checks = [
    { label: 'Blast radius', value: '3 services affected', level: 'warn' },
    { label: 'Error rate delta', value: '+0.8% vs baseline', level: 'warn' },
    { label: 'Auth service', value: 'unrelated — safe', level: 'ok' },
    { label: 'Payment gateway', value: 'dependency flagged', level: 'err' },
  ]
  return (
    <div className="p-6 h-full flex flex-col gap-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-ink-quaternary mb-1">
        <span className="w-2 h-2 rounded-full bg-primary/60 animate-[pulse-anim_2s_ease-in-out_infinite]" />
        <span>titan-sentinel · PR #2847 analysis</span>
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

/* ── Platform Overview section ── */
const products = [
  {
    route: '/products/titan-rollout',
    eyebrow: 'Titan Rollout',
    name: 'Ship progressively. Roll back instantly.',
    tagline: 'Cohort rollouts and automatic rollback — controlled by your SLOs, not by luck.',
    description: 'Define rollout cohorts, set SLO thresholds, and let DeployTitan promote or roll back automatically. Every release is versioned. Every change is reversible in seconds.',
    bullets: [
      'Canary and cohort rollouts — promote by error rate, latency, or custom signals',
      'Versioned releases — every deploy is a named, addressable version',
      'Automatic rollback — no runbook, no 3am page',
    ],
    visual: <RolloutVisual />,
    flip: false,
  },
  {
    route: '/products/titan-shield',
    eyebrow: 'Titan Shield',
    name: 'Stay up across every cloud.',
    tagline: 'Multi-cloud failover that happens automatically — before your users notice.',
    description: 'Route traffic intelligently across AWS, GCP, and Azure. When a region degrades, Titan Shield shifts traffic in real time — zero manual intervention, zero latency penalty.',
    bullets: [
      'Automatic failover across AWS, GCP, and Azure',
      'Zero-latency in-memory routing — no proxy overhead',
      'Built-in disaster recovery with geo-aware policies',
    ],
    visual: <ShieldVisual />,
    flip: true,
  },
  {
    route: '/products/titan-sentinel',
    eyebrow: 'Titan Sentinel',
    name: 'See risk before it ships.',
    tagline: 'Shift-left risk scoring on every PR — blast-radius analysis, live observability, and SLO guardrails.',
    description: 'Titan Sentinel scores every pull request against your production blast radius, flags dependency risk, and enforces SLO-bound thresholds during rollout — so risk is visible and controllable from the first commit.',
    bullets: [
      'PR-level risk scoring — blast radius, dependency graph, change velocity',
      'Live observability — real-time error rates, p95/p99 latency, health signals',
      'SLO guardrails — configurable thresholds with automatic enforcement',
    ],
    visual: <SentinelVisual />,
    flip: false,
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
            From commit to production, safely.
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed max-w-lg">
            Three products that work independently or as a unified control plane for every deploy.
          </p>
        </div>

        {/* Product teasers */}
        <div className="flex flex-col divide-y divide-line">
          {products.map((p) => (
            <div
              key={p.route}
              data-reveal
              className={`py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
            >
              {/* Copy — swap order on flip */}
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
                    to={p.route}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary-dark transition-colors group"
                  >
                    See details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                  <Link to="/docs" className="text-sm text-ink-tertiary hover:text-ink-secondary transition-colors">Read the docs</Link>
                </div>
              </div>

              {/* Visual */}
              <div className={`relative ${p.flip ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="border border-line bg-surface-alt/60 overflow-hidden" style={{ borderRadius: '2px', minHeight: '280px' }}>
                  {p.visual}
                </div>
                {/* Corner accents */}
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
            <Link to="/pricing" className="text-sm text-ink-secondary hover:text-ink transition-colors">View pricing →</Link>
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
