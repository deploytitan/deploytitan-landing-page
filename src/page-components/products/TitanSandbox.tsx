'use client'

import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

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
      <ProductPageHero
        eyebrow="Titan Sandbox · Reproduce"
        badge="roadmap"
        heading={<>A production-shaped environment<br className="hidden md:block" /> for every branch.</>}
        description="Sandbox spins up an isolated, prod-shaped environment per branch or PR, wired to real data shapes, torn down when you're done."
        ctas={[
          { label: 'Join the waitlist', href: '/pricing' },
        ]}
      />

      {/* What Sandbox owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
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
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
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
