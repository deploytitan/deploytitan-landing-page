'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'
import { Button } from '../components/shared/Button'
import { WAITLIST_URL } from '@/lib/env'

const PRIMARY = 'var(--color-primary)'

const OUTCOMES = [
  {
    number: '01',
    title: 'Clear thinking before another tool',
    body: 'Phase 1 is content because teams need to understand where AI improved throughput and where it pushed stress into review, verification, and release.',
  },
  {
    number: '02',
    title: 'A practical map of the bottleneck',
    body: 'We write for teams trying to identify whether the constraint is review capacity, CI load, release confidence, or custom internal tooling.',
  },
  {
    number: '03',
    title: 'Products shaped by real adoption pain',
    body: 'DeployTitan Rollout is in development for teams that need faster shipping without turning release safety into a manual coordination exercise.',
  },
  {
    number: '04',
    title: 'Consultation when the system needs help',
    body: 'The next phase is hands-on support and products for teams that want AI leverage without building distracting internal platforms.',
  },
]

const BAD_PATTERNS = [
  {
    label: 'Review overload',
    desc: 'AI creates more code than senior engineers can confidently review',
    consequence: 'The team moves faster until the approval queue becomes the release plan.',
  },
  {
    label: 'Verification debt',
    desc: 'Tests, CI, and observability were designed for the old pace',
    consequence: 'Generated work ships only as fast as the safety system can prove it.',
  },
  {
    label: 'Internal tooling drift',
    desc: 'Teams start building custom AI delivery glue',
    consequence: 'The product roadmap loses time to infrastructure the customer never sees.',
  },
]

export default function Journey() {
  const ref = useScrollReveal()

  return (
    <div ref={ref}>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="blueprint-grid border-line border-b pt-28 pb-20">
        <Container width="3xl" padding="default" data-reveal>
          <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
            My journey
          </p>
          <h1 className="text-ink mb-7 text-[clamp(2.25rem,5vw,4rem)] leading-[0.96] font-semibold tracking-[-0.03em]">
            I built DeployTitan
            <br className="hidden md:block" /> because I lived the problem.
          </h1>
          <p className="text-ink-secondary max-w-xl text-xl leading-relaxed">
            Not from a whiteboard. Not from a pitch deck. From years of watching teams move faster
            in one part of engineering while review, verification, and deployment safety struggled
            to keep up.
          </p>
        </Container>
      </section>

      {/* ── The Pattern ───────────────────────────────────────────────────────── */}
      <section className="border-line border-b py-20">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="text-ink-tertiary mb-6 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="bg-primary/40 h-px w-6" aria-hidden="true" />
            The pattern before AI
          </span>

          {/* Anchor sentence for scanning leaders */}
          <p data-reveal className="text-ink mb-8 text-2xl leading-snug font-semibold">
            Every company I worked at had brilliant engineers and still treated delivery confidence
            as something fragile.
          </p>

          <div className="space-y-5">
            <p data-reveal className="text-ink-secondary text-lg leading-relaxed">
              I worked across multiple engineering organizations. Different tools, different stacks,
              different processes. The same pattern kept returning: teams could build, but the
              system around shipping stayed tense.
            </p>
            <p data-reveal className="text-ink-secondary text-lg leading-relaxed">
              Review queues. Fragile deploy windows. On-call rotations staffed by engineers who
              inherited risk from code they did not always write.
            </p>

            <figure data-reveal className="border-line my-8 border-t border-b py-7">
              <blockquote>
                <p className="text-ink text-xl leading-relaxed font-medium">
                  I watched smart, capable people slow themselves down, not because they lacked
                  ambition, but because their delivery system could not absorb more speed safely.
                </p>
              </blockquote>
              <figcaption
                className="mt-3 font-mono text-[10px] tracking-widest uppercase"
                style={{ color: PRIMARY }}
              >
                — Justine, founder
              </figcaption>
            </figure>

            <p data-reveal className="text-ink-secondary text-lg leading-relaxed">
              AI made this more urgent. It helped teams create more work, but it also made the old
              bottlenecks impossible to ignore.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The real problem ──────────────────────────────────────────────────── */}
      <section className="border-line bg-surface-alt/30 border-b pt-16 pb-24">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="text-ink-tertiary mb-6 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="bg-primary/40 h-px w-6" aria-hidden="true" />
            The new bottleneck
          </span>

          <h2
            data-reveal
            className="text-ink mb-3 text-[clamp(1.75rem,3.5vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.025em]"
          >
            AI did not remove the constraint.
            <br />
            It moved it.
          </h2>

          {/* Anchor sentence */}
          <p data-reveal className="text-ink-secondary mb-10 text-lg leading-relaxed">
            Faster code generation creates value only when review, verification, release
            coordination, and production confidence can keep pace. Otherwise the team just moves the
            queue downstream.
          </p>

          {/* Pattern list: no cards, structured rows */}
          <div
            data-reveal
            className="border-line divide-line divide-y border"
            style={{ borderRadius: 'var(--radius-standard)' }}
            role="list"
            aria-label="Common AI delivery bottlenecks"
          >
            {BAD_PATTERNS.map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-1 items-start gap-3 px-6 py-5 sm:grid-cols-[2rem_1fr_1fr] sm:gap-8"
                role="listitem"
              >
                <span
                  className="text-primary-accessible dark:text-primary hidden pt-0.5 font-mono text-xs tabular-nums sm:block"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div>
                  <p className="text-ink mb-1 text-sm font-semibold">{item.label}</p>
                  <p className="text-ink-secondary text-xs leading-relaxed">{item.desc}</p>
                </div>
                <p className="text-ink-tertiary font-mono text-xs leading-relaxed">
                  {item.consequence}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What I'm building ─────────────────────────────────────────────────── */}
      <section className="border-line bg-surface-alt/20 border-b py-28">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="text-ink-tertiary mb-6 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
            aria-label="What I'm building"
          >
            <span className="bg-primary/40 h-px w-6" aria-hidden="true" />
            What I&apos;m building now
          </span>

          <h2
            data-reveal
            className="text-ink mb-3 text-[clamp(1.75rem,3.5vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.025em]"
          >
            AI delivery should feel controlled.
          </h2>
          <p data-reveal className="text-ink-secondary mb-14 max-w-lg text-lg leading-relaxed">
            DeployTitan starts with clear, practical publishing for teams adopting AI. The products
            come next, shaped by the bottlenecks those teams are already living with.
          </p>

          <div
            className="border-line space-y-px overflow-hidden border"
            style={{ borderRadius: 'var(--radius-standard)' }}
          >
            {OUTCOMES.map((p) => (
              <div
                key={p.number}
                className="group hover:bg-surface-alt/40 border-line border-b p-7 transition-colors last:border-b-0"
                data-reveal
              >
                <div className="flex items-start gap-5">
                  <span className="text-primary-accessible dark:text-primary shrink-0 pt-0.5 font-mono text-xs tabular-nums">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-ink mb-2 text-base font-semibold">{p.title}</h3>
                    <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Founder note ──────────────────────────────────────────────────────── */}
      <section className="border-line border-b pt-16 pb-20" id="founder-note">
        <Container width="3xl" padding="default">
          <Card padding="none" className="relative overflow-hidden p-8 lg:p-12" data-reveal>
            <div
              className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2"
              style={{ borderColor: PRIMARY, opacity: 0.3 }}
            />
            <div
              className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2"
              style={{ borderColor: PRIMARY, opacity: 0.3 }}
            />

            <p className="text-primary-accessible mb-6 font-mono text-xs tracking-widest uppercase">
              A note from me
            </p>
            <div className="text-ink mb-8 space-y-5 text-base leading-relaxed">
              <p>
                If AI helped your team write faster but made review, verification, or deployment
                confidence harder, I&apos;m building this for you.
              </p>
              <p>
                If your team is building custom internal tools just to make AI adoption usable, I
                want DeployTitan to help you get back to the product only you can build.
              </p>
              <p>
                I want to hear your AI delivery story. Every conversation with an engineer or
                founder makes the bottleneck sharper.
              </p>
            </div>

            <div className="border-line flex items-center gap-4 border-t pt-6">
              <div>
                <p className="text-ink text-sm font-semibold">Justine, Founder, DeployTitan</p>
                <a
                  href="mailto:justine@deploytitan.com"
                  className="text-primary-accessible font-mono text-xs hover:underline"
                  aria-label="Email Justine at justine@deploytitan.com"
                >
                  justine@deploytitan.com
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="border-line border-b py-20">
        <Container width="3xl" padding="default" data-reveal>
          <p className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.22em] uppercase">
            Early access
          </p>
          <h2 className="text-ink mb-6 text-[clamp(2rem,4vw,3.4rem)] leading-[1.0] font-medium tracking-[-0.04em]">
            Tell us where AI slowed the system down.
          </h2>
          <p className="text-ink-secondary mb-8 max-w-[42ch] text-lg leading-8">
            Join the waitlist, share what changed after AI adoption, and we&apos;ll send practical
            notes while DeployTitan Rollout moves toward early access.
          </p>
          <Button as="a" href={WAITLIST_URL} variant="primary" size="lg">
            Join waitlist
          </Button>
        </Container>
      </section>
    </div>
  )
}
