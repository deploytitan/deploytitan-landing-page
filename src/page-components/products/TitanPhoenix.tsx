'use client'

import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Button } from '../../components/shared/Button'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const WHAT_IT_SOLVES = [
  {
    title: 'SLO-triggered rollback',
    desc: 'Phoenix watches your SLO metrics continuously and acts the moment a measurement window closes over your threshold. No alert, no Slack message, no human in the loop.',
  },
  {
    title: 'Scoped revert',
    desc: 'Rolls back the exact cohort, region, or feature flag state that is failing — not the whole service. The 97% of users unaffected keep running the new version.',
  },
  {
    title: 'Traffic restored in under 10 seconds',
    desc: 'No redeploy, no pipeline run, no manual approval. The release is preserved; only its routing changes.',
  },
  {
    title: 'Structured incident packet',
    desc: 'Every Phoenix action produces a record: what SLO breached, which users were affected, how long the impact lasted, what was reverted. Postmortems have the full timeline automatically.',
  },
]

export default function TitanPhoenix() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Phoenix"
        badge="roadmap"
        heading={<>Rollback the failure,<br className="hidden md:block" /> not the service.</>}
        description="When a release breaks, Phoenix identifies the exact slice that is failing and reverts only that — triggered by your SLOs in seconds. This is Phase 3 of the DeployTitan platform, the autonomous rollout layer."
        ctas={[
          { label: 'Join the waitlist', href: '/pricing' },
          { label: 'See what is available now', href: '/products/titan-rollout', variant: 'secondary' },
        ]}
      />

      {/* What it will solve */}
      <section className="border-line border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              What Phoenix solves
            </p>
            <h2 className="text-ink text-2xl font-semibold">
              Your on-call is the last line of defense, not the first.
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
            Phase 3 — Roadmap
          </p>
          <p className="text-ink mx-auto mb-3 max-w-2xl text-xl font-semibold" data-reveal>
            Phoenix is being designed now.
          </p>
          <p className="text-ink-secondary mx-auto mb-8 max-w-xl text-sm" data-reveal>
            Leave your email and we will notify you when Phoenix enters early access. One email when
            it is ready.
          </p>
          <div className="mx-auto max-w-sm" data-reveal>
            <Button as="a" href="/pricing" variant="primary" size="lg" block>
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
