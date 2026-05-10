'use client'

import { useScrollReveal } from '../../utils'
import { RoadmapBadge } from '../../components/shared/RoadmapBadge'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const SIGNALS = [
  {
    title: 'Production-shaped environments per branch',
    desc: 'Each branch or PR gets an isolated environment wired to real data shapes, not mocks, not stubs. What you test is what will ship.',
  },
  {
    title: 'Automatic teardown',
    desc: 'Environments are created when a branch opens and torn down when it merges or closes. No manual cleanup, no forgotten long-running envs eating cost.',
  },
  {
    title: 'Real data shapes, not fixtures',
    desc: 'Sandbox clones the schema and traffic shapes of production, anonymised where required. Your service sees load that looks like production, not test data.',
  },
  {
    title: 'Wired to Rollout on merge',
    desc: 'When a branch ships, the Sandbox environment becomes the canary cohort for Rollout. The inner loop and the delivery loop share one source of truth.',
  },
]

export default function TitanSandbox() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default">
          <div className="flex items-center gap-3 mb-4" data-reveal data-reveal-delay="1">
            <p className="text-xs font-mono tracking-widest uppercase text-primary">
              Titan Sandbox · Reproduce
            </p>
            <RoadmapBadge variant="roadmap" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6" data-reveal data-reveal-delay="2">
            A production-shaped environment
            <br className="hidden md:block" /> for every branch.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8" data-reveal data-reveal-delay="3">
            Sandbox spins up an isolated, prod-shaped environment per branch or PR, wired to real
            data shapes, torn down when you're done.
          </p>
          <a
            href="/early-access"
            className="inline-flex items-center gap-2 bg-primary text-ink text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors"
            style={{ borderRadius: '2px' }}
            data-reveal
            data-reveal-delay="4"
          >
            Join the waitlist
          </a>
        </Container>
      </section>

      {/* What Sandbox owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            What Sandbox owns
          </p>
          <h2 className="text-xl font-semibold text-ink mb-3">
            Sandbox owns the developer's inner loop.
          </h2>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Rollout uses environments that exist. Sandbox creates them. It's the earliest point in
            the lifecycle, where code becomes something testable before it ever touches production
            traffic.
          </p>
        </Container>
      </section>

      {/* Signals */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              What's coming
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Test against production, before you ship to it.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              We're designing Sandbox with early partners now. Join the waitlist to shape
              what gets built.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIGNALS.map((s) => (
              <Card key={s.title} className="flex flex-col gap-3" data-reveal>
                <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                <p className="text-xs text-ink-tertiary leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      
    </>
  )
}
