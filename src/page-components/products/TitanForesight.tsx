'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Button } from '../../components/shared/Button'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const WHAT_IT_SOLVES = [
  {
    title: 'Blast radius',
    desc: 'Which downstream services break when this PR ships — computed from your live dependency graph before the branch merges.',
  },
  {
    title: 'Migration risk detection',
    desc: 'Changes that touch shared databases, schemas, or cross-service contracts are flagged before they reach production.',
  },
  {
    title: 'Dependency impact scoring',
    desc: 'A single risk number per PR, explained. Not a dashboard — a verdict with enough context to act on it.',
  },
  {
    title: 'Rollback advisories',
    desc: 'Before you promote, Foresight surfaces the revert sequence if something goes wrong. Powered by Git metadata, OpenTelemetry traces, and deployment history.',
  },
]

export default function TitanForesight() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Foresight"
        badge="preview"
        heading={<>Know the blast radius<br className="hidden md:block" /> before you ship.</>}
        description="Foresight reads each PR against your live dependency graph and surfaces what downstream services are at risk — before the branch merges. This is Phase 2 of the DeployTitan platform, in active design."
        ctas={[
          { label: 'Join the waitlist', href: WAITLIST_URL },
          { label: 'See what is available now', href: '/products/titan-rollout', variant: 'secondary' },
        ]}
      />

      {/* What it will solve */}
      <section className="border-line border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              What Foresight solves
            </p>
            <h2 className="text-ink text-2xl font-semibold">
              Risk that was invisible becomes legible.
            </h2>
          </div>
          <div className="flex flex-col gap-0" data-reveal>
            {WHAT_IT_SOLVES.map((item, i) => (
              <div
                key={item.title}
                className="border-line/50 flex items-start gap-4 border-b py-5 last:border-0"
              >
                <div
                  className="border-primary/30 bg-primary/5 flex h-7 w-7 shrink-0 items-center justify-center"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-primary-accessible dark:text-primary font-mono text-[10px] font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <p className="text-ink mb-1 text-sm font-semibold">{item.title}</p>
                  <p className="text-ink-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Roadmap status */}
      <section className="py-20">
        <Container width="3xl" padding="default" className="text-center">
          <p
            className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.22em] uppercase"
            data-reveal
          >
            Phase 2 — Roadmap
          </p>
          <p className="text-ink mx-auto mb-3 max-w-2xl text-xl font-semibold" data-reveal>
            Foresight is in active design.
          </p>
          <p className="text-ink-secondary mx-auto mb-8 max-w-xl text-sm" data-reveal>
            Leave your email and we will notify you when Foresight enters early access. One email
            when it is ready.
          </p>
          <div className="mx-auto max-w-sm" data-reveal>
            <Button as="a" href={WAITLIST_URL} variant="primary" size="lg" block>
              Join the waitlist
            </Button>
          </div>
          <p className="text-ink-tertiary mt-6 text-xs" data-reveal>
            While you wait:{' '}
            <a
              href="/products/titan-rollout"
              className="text-primary-accessible hover:text-primary transition-colors"
            >
              Titan Rollouts is available today →
            </a>
          </p>
        </Container>
      </section>
    </>
  )
}
