'use client'

import { MidCTA } from '../../components/MidCTA'
import { useScrollReveal } from '../../utils'
import { RoadmapBadge } from '../../components/shared/RoadmapBadge'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const SIGNALS = [
  {
    title: 'Deploy-to-metric correlation',
    desc: 'Insight joins every deploy event to the metrics that moved — latency, conversion, error budget, revenue — and surfaces the causal signal, not just correlation.',
  },
  {
    title: 'Release impact scoring',
    desc: 'Which releases improved things? Which shipped clean and changed nothing? Insight answers that question per release, per service, per team.',
  },
  {
    title: 'Outcome trends over time',
    desc: 'Track whether your team\'s releases are trending toward better outcomes quarter over quarter — not just faster, but better.',
  },
  {
    title: 'Feeds from Ledger & Phoenix',
    desc: 'Insight reads deploy history from Ledger and incident packets from Phoenix. No new instrumentation — outcomes explained from data you already produce.',
  },
]

export default function TitanInsight() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs font-mono tracking-widest uppercase text-primary">
              Titan Insight · Decide
            </p>
            <RoadmapBadge variant="roadmap" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            Did this release
            <br className="hidden md:block" /> actually improve anything?
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Insight correlates every deploy to the metrics that matter — latency, conversion,
            revenue, error budget — and tells you which releases moved the needle and which
            just shipped.
          </p>
          <a
            href="/early-access"
            className="inline-flex items-center gap-2 bg-primary text-ink text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors"
            style={{ borderRadius: '2px' }}
          >
            Join the waitlist
          </a>
        </Container>
      </section>

      {/* What Insight owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            What Insight owns
          </p>
          <h2 className="text-xl font-semibold text-ink mb-3">
            Insight owns the answer to "so what?"
          </h2>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Ledger counts deploys — factual, neutral. Insight judges them — causal, opinionated.
            Phoenix acts in seconds. Insight concludes in days. They don't overlap.
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

      <MidCTA
        heading="Know which releases actually mattered."
        subheading="Titan Insight is in design. Join the waitlist to be first in and shape the product."
        primaryLabel="Join the waitlist"
        primaryHref="/early-access"
        secondaryLabel="View live products"
        secondaryHref="/products/titan-rollout"
      />
    </>
  )
}
