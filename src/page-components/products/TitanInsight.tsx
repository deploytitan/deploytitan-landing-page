'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const SIGNALS = [
  {
    title: 'Deploy-to-metric correlation',
    desc: 'Insight joins every deploy event to the metrics that moved (latency, conversion, error budget, revenue) and surfaces the causal signal, not just correlation.',
  },
  {
    title: 'Release impact scoring',
    desc: 'Which releases improved things? Which shipped clean and changed nothing? Insight answers that question per release, per service, per team.',
  },
  {
    title: 'Outcome trends over time',
    desc: 'Track whether your team\'s releases are trending toward better outcomes quarter over quarter, not just faster, but better.',
  },
  {
    title: 'Feeds from Ledger & Phoenix',
    desc: 'Insight reads deploy history from Ledger and incident packets from Phoenix. No new instrumentation: outcomes explained from data you already produce.',
  },
]

export default function TitanInsight() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Insight · Decide"
        badge="roadmap"
        heading={<>Did this release<br className="hidden md:block" /> actually improve anything?</>}
        description="Insight correlates every deploy to the metrics that matter: latency, conversion, revenue, error budget, and tells you which releases moved the needle and which just shipped."
        ctas={[
          { label: 'Join the waitlist', href: WAITLIST_URL },
        ]}
      />

      {/* What Insight owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
            What Insight owns
          </p>
          <h2 className="text-xl font-semibold text-ink mb-3">
            Insight owns the answer to "so what?"
          </h2>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Ledger counts deploys: factual, neutral. Insight judges them: causal, opinionated.
            Phoenix acts in seconds. Insight concludes in days. They don't overlap.
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
              Outcome intelligence for every release.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              We're designing Insight with early partners now. Join the waitlist to shape
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
