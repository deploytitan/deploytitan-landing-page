'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import Link from 'next/link'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const PAIN_POINTS = [
  {
    pain: "You're the human circuit breaker",
    solution:
      "Automated rollback fires before you're paged. Titan Shield shifts traffic in seconds.",
  },
  {
    pain: 'Error budget burns during rollouts',
    solution:
      'Canary steps are gated by your SLOs. The deploy pauses — or reverses — before the budget is gone.',
  },
  {
    pain: 'Post-mortems point to "surprise" blast radius',
    solution: 'Titan Foresight maps blast radius before every deploy. No surprises.',
  },
  {
    pain: 'Manual failover runbooks',
    solution: 'Declarative failover policy. One HCL file. Shield handles it — even at 3 AM.',
  },
]

const WINS = [
  { value: '30s', label: 'Median rollback time' },
  { value: '85%', label: 'Fewer production incidents' },
  { value: '< 10s', label: 'Failure detection time' },
  { value: '0', label: 'Manual runbook steps' },
]

export default function ForSRE() {
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-4">
            For SRE Teams
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Stop being the human
            <br className="hidden md:block" /> circuit breaker.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            SREs shouldn't spend their on-call shift manually rolling back deploys and executing
            failover runbooks. DeployTitan makes those responses automatic — so you spend your time
            improving reliability, not reacting to it.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
            {WINS.map((w) => (
              <Card key={w.label} padding="sm" className="text-center">
                <p className="text-2xl font-bold text-ink">{w.value}</p>
                <p className="text-[10px] text-ink-tertiary leading-tight mt-1">{w.label}</p>
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={WAITLIST_URL}
              className="inline-flex items-center gap-2 bg-ink text-surface dark:text-surface px-6 py-3 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Join waitlist
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
              href="/solutions/instant-rollback"
              className="text-sm font-medium text-primary-accessible hover:text-primary transition-colors"
            >
              Explore resilience solutions →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              SRE-specific wins
            </p>
            <h2 className="text-2xl font-semibold text-ink">Every SRE pain point, addressed.</h2>
          </div>
          <div className="flex flex-col gap-4">
            {PAIN_POINTS.map((p, i) => (
              <Card
                key={p.pain}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-400/60 text-[10px] font-mono uppercase tracking-wider mt-1 shrink-0">
                    Pain
                  </span>
                  <p className="text-sm text-ink-secondary">{p.pain}</p>
                </div>
                <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-4">
                  <span className="text-primary-accessible text-[10px] font-mono uppercase tracking-wider mt-1 shrink-0">
                    Fixed
                  </span>
                  <p className="text-sm text-ink-secondary">{p.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="5xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Products for SREs
            </p>
            <h2 className="text-2xl font-semibold text-ink">Titan Shield + Titan Foresight.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-reveal>
            {[
              {
                to: '/products/titan-rollout',
                name: 'Titan Rollout',
                desc: 'SLO-gated canary deployments. Automated rollback fires before you are paged.',
              },
              {
                to: '/products/titan-foresight',
                name: 'Titan Foresight',
                desc: 'Pre-deploy risk scoring. Blast-radius analysis. SLO guardrails that actually block bad deploys.',
              },
            ].map((p) => (
              <Link
                key={p.to}
                href={p.to}
                className="sharp-card border border-line p-6 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all group"
              >
                <p className="text-sm font-semibold text-ink group-hover:text-primary-dark transition-colors mb-2">
                  {p.name} →
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      
    </>
  )
}
