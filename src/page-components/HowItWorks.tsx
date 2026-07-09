'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import Link from 'next/link'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

const INTEGRATIONS = [
  { name: 'PR volume', category: 'Throughput' },
  { name: 'Review queues', category: 'Constraint' },
  { name: 'CI load', category: 'Verification' },
  { name: 'Release confidence', category: 'Safety' },
  { name: 'Internal tooling', category: 'Distraction' },
  { name: 'AI ROI', category: 'Leadership' },
]

const STEPS = [
  {
    number: '01',
    title: 'Start with the bottleneck AI exposed',
    body: 'We look at where AI changed your engineering system: more code, larger review queues, heavier CI, less confidence at release time, or new internal tools nobody planned to build.',
    detail: 'Review load · verification capacity · release safety',
  },
  {
    number: '02',
    title: 'Separate speed gains from throughput debt',
    body: 'AI can make one step faster while pushing the constraint downstream. We help teams see whether the real limit is senior review, test confidence, deployment coordination, or operating ownership.',
    detail: 'Throughput map · constraint diagnosis · delivery risk',
  },
  {
    number: '03',
    title: 'Publish the practical playbook',
    body: 'Phase 1 is content because teams need clear operating guidance before another platform. Articles turn real AI adoption problems into concrete decisions founders and engineers can act on.',
    detail: 'Content · frameworks · operator notes',
  },
  {
    number: '04',
    title: 'Show where internal tooling stops paying back',
    body: 'Some teams start building custom glue for AI review, test triage, or release coordination. We help name when that work protects the core product and when it steals from it.',
    detail: 'Build vs buy · team focus · operating cost',
  },
  {
    number: '05',
    title: 'Bring qualified teams into early access',
    body: 'When the bottleneck is release coordination and shipping safety, DeployTitan Rollout becomes the next step. It is in development, so we frame it honestly as early access.',
    detail: 'Rollout · early access · release coordination',
  },
  {
    number: '06',
    title: 'Turn education into products and consultation',
    body: 'Phase 2 expands from content into products, solutions, and hands-on support for teams that need help adapting delivery systems around AI adoption.',
    detail: 'Products · solutions · consultation',
  },
]

const TOOL_COMPARISON = [
  {
    tool: 'AI coding tools',
    does: 'Increase implementation speed and help engineers create more working code',
    gap: 'They do not guarantee review capacity, verification confidence, or release safety',
  },
  {
    tool: 'Code review',
    does: 'Catches design, correctness, security, and maintainability issues before merge',
    gap: 'Senior attention becomes scarce when generated work volume rises faster than review systems',
  },
  {
    tool: 'CI and testing',
    does: 'Proves that code still behaves against known checks',
    gap: 'Queues, flaky tests, and missing coverage become the new speed limit',
  },
  {
    tool: 'Release process',
    does: 'Moves merged work into production with approvals, monitoring, and rollback discipline',
    gap: 'More code creates more coordination unless release ownership and safety systems improve',
  },
]

export default function HowItWorks() {
  useScrollReveal()

  return (
    <>
      <section className="blueprint-grid border-line border-b pt-28 pb-16">
        <Container width="4xl" padding="default" className="text-center" data-reveal>
          <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
            How it works
          </p>
          <h1 className="text-ink mb-5 text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.05em]">
            From AI speed
            <br />
            to shipping safety.
          </h1>
          <p className="text-ink-secondary mx-auto mb-10 max-w-xl text-lg leading-8">
            DeployTitan starts with practical content for teams adopting AI, then turns the clearest
            delivery bottlenecks into products, solutions, and consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button as="a" href={WAITLIST_URL} variant="primary" size="lg">
              Join waitlist
            </Button>
            <Link
              href="/blog"
              className="text-primary-accessible hover:text-primary text-sm font-medium transition-colors"
            >
              Read the research →
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-line border-b py-24">
        <Container width="5xl" padding="default">
          <div className="mb-14" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Where DeployTitan fits
            </p>
            <h2 className="text-ink mb-4 text-3xl leading-tight font-medium tracking-tight lg:text-4xl">
              AI did not remove the delivery system.
            </h2>
            <p className="text-ink-secondary max-w-lg text-sm leading-relaxed">
              It changed the load on it. The work now is understanding where faster code generation
              creates real leverage, and where it creates throughput debt.
            </p>
          </div>

          <div
            className="border-line border"
            style={{ borderRadius: 'var(--radius-standard)' }}
            data-reveal
          >
            <div className="border-line bg-surface-alt/60 grid gap-4 border-b px-5 py-4 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)]">
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                Layer
              </p>
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                What improves
              </p>
              <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                What becomes the bottleneck
              </p>
            </div>
            {TOOL_COMPARISON.map((row, i) => (
              <div
                key={row.tool}
                className={`border-line grid gap-4 border-b px-5 py-5 last:border-b-0 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] ${i % 2 === 0 ? '' : 'bg-surface-alt/20'}`}
              >
                <p className="text-ink text-sm font-medium">{row.tool}</p>
                <p className="text-ink-secondary text-sm leading-7">{row.does}</p>
                <p className="text-ink-secondary text-sm leading-7">{row.gap}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line border-b py-28">
        <Container width="5xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Walkthrough
            </p>
            <h2 className="text-ink text-3xl leading-tight font-medium tracking-tight lg:text-4xl">
              From unclear AI ROI to a safer delivery system.
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative flex gap-8 pb-12 last:pb-0"
                data-reveal
                data-reveal-delay={String(i)}
              >
                {i < STEPS.length - 1 && (
                  <div
                    className="bg-line absolute top-10 bottom-0 left-[18px] w-px"
                    aria-hidden="true"
                  />
                )}

                <div
                  className="border-primary/30 bg-primary/5 z-10 flex h-9 w-9 shrink-0 items-center justify-center border"
                  style={{ borderRadius: 'var(--radius-serious)' }}
                >
                  <span className="text-primary-accessible dark:text-primary font-mono text-[11px] font-bold">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1 pt-0.5">
                  <h3 className="text-ink mb-2 text-base leading-snug font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-ink-secondary mb-3 max-w-xl text-sm leading-relaxed">
                    {step.body}
                  </p>
                  <p className="text-ink-tertiary font-mono text-[9px] tracking-widest uppercase">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-line border-b py-24">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Signals
            </p>
            <h2 className="text-ink mb-3 text-3xl leading-tight font-medium tracking-tight lg:text-4xl">
              We focus on the constraints AI makes visible.
            </h2>
            <p className="text-ink-secondary max-w-lg text-sm leading-relaxed">
              The content program starts with the recurring signs that teams are moving fast in one
              layer and getting stuck in another.
            </p>
          </div>

          <div
            className="border-line bg-line grid grid-cols-2 gap-px border sm:grid-cols-3"
            style={{ borderRadius: 'var(--radius-standard)' }}
            data-reveal
          >
            {INTEGRATIONS.map((item) => (
              <div key={item.name} className="bg-surface flex items-center gap-3 px-5 py-5">
                <span
                  className="bg-primary/60 block h-2 w-2 shrink-0"
                  style={{ borderRadius: '1px' }}
                />
                <div>
                  <p className="text-ink text-sm font-medium">{item.name}</p>
                  <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.12em] uppercase">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-ink-tertiary mt-6 text-sm" data-reveal>
            DeployTitan Rollout is in development for teams whose bottleneck is release coordination
            and shipping safety.{' '}
            <Link
              href="/waitlist"
              className="text-primary-accessible hover:text-primary transition-colors"
            >
              Join early access →
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container width="3xl" padding="default" className="text-center">
          <p
            className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.22em] uppercase"
            data-reveal
          >
            Next step
          </p>
          <p className="text-ink mx-auto mb-8 max-w-2xl text-lg font-semibold" data-reveal>
            Bring us the place where AI made the team faster and the system slower. We will help
            name the bottleneck.
          </p>
          <div className="mx-auto max-w-sm" data-reveal>
            <Button as="a" href={WAITLIST_URL} variant="primary" size="lg" block>
              Join waitlist
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
