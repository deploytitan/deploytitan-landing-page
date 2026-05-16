'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'
import { Button } from '../components/shared/Button'

const PRIMARY = 'var(--color-primary)'

const OUTCOMES = [
  {
    number: '01',
    title: 'Reduce deployment risk',
    body: 'Progressive rollouts, automated risk scoring, and real-time traffic control, catching problems before they reach all your users.',
  },
  {
    number: '02',
    title: 'Recover in seconds, not minutes',
    body: `Instant rollback without coordination. The system recovered from a failure without your users being any wiser, and that's confidence.`,
  },
  {
    number: '03',
    title: 'Protect your SLOs and SLAs',
    body: 'Full visibility into blast radius before you ship. Stop discovering compliance breaches in a post-incident review.',
  },
  {
    number: '04',
    title: 'Deploy whenever you want',
    body: 'Friday afternoons. Multiple times a day. Whatever works for your team, because you have the confidence to back it up.',
  },
]

const BAD_PATTERNS = [
  {
    label: 'Night windows',
    desc: 'Pushed to off-hours to reduce perceived risk',
    consequence: 'Real traffic exposes issues after the team goes dark.',
  },
  {
    label: '24/7 on-call',
    desc: "Engineers paged for code they didn't write",
    consequence: 'Slower response when it matters most.',
  },
  {
    label: 'No Fridays',
    desc: 'Entire deployment windows blocked out of fear',
    consequence: 'Velocity sacrificed for anxiety management.',
  },
]

export default function Journey() {
  useScrollReveal()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="blueprint-grid border-line border-b pt-28 pb-20">
        <Container width="3xl" padding="default" data-reveal>
          <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
            My journey
          </p>
          <h1 className="text-ink mb-7 text-4xl leading-tight font-semibold lg:text-5xl">
            I built DeployTitan
            <br className="hidden md:block" /> because I lived the problem.
          </h1>
          <p className="text-ink-secondary max-w-xl text-xl leading-relaxed">
            Not from a whiteboard. Not from a VC pitch. From 8 years of watching brilliant engineers
            treat every deployment like defusing a bomb, and deciding I&apos;d had enough.
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
            Eight years of the same fear
          </span>

          {/* Anchor sentence for scanning leaders */}
          <p data-reveal className="text-ink mb-8 text-2xl leading-snug font-semibold">
            Every company I worked at treated deployments as a risk to minimize, not a capability to
            own.
          </p>

          <div className="space-y-5">
            <p data-reveal className="text-ink-secondary text-lg leading-relaxed">
              I worked across multiple engineering organizations. Every company had different tools,
              different stacks, different processes. But one thing was always the same: the anxiety
              was the same everywhere.
            </p>
            <p data-reveal className="text-ink-secondary text-lg leading-relaxed">
              Night windows. No-deploy Fridays. On-call rotations staffed by engineers who
              didn&apos;t build the thing they were now responsible for keeping alive at 2am.
            </p>

            <figure
              data-reveal
              className="border-line my-8 border-t border-b py-7"
            >
              <blockquote>
                <p className="text-ink text-xl leading-relaxed font-medium">
                  I watched smart, capable people slow themselves down, not because they lacked
                  discipline, but because their tooling made every release feel dangerous.
                </p>
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: PRIMARY }}>
                — Justine, founder
              </figcaption>
            </figure>

            <p data-reveal className="text-ink-secondary text-lg leading-relaxed">
              And honestly? I hated it. I hated the anxiety. I hated the 11pm deploys. I hated
              watching teams hold back features because nobody wanted to be the one who broke prod on
              a Friday.
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
            The real problem
          </span>

          <h2 data-reveal className="text-ink mb-3 text-3xl leading-snug font-semibold">
            It was never a people problem.
            <br />
            It was always a tooling problem.
          </h2>

          {/* Anchor sentence */}
          <p data-reveal className="text-ink-secondary mb-10 text-lg leading-relaxed">
            Tooling that gives teams no confidence, no visibility, and no fast path to recovery
            produces exactly the behaviors you see: night windows, pager anxiety, no-deploy Fridays.
            These aren&apos;t discipline failures.
          </p>

          {/* Pattern list: no cards, structured rows */}
          <div
            data-reveal
            className="border-line divide-line divide-y border"
            style={{ borderRadius: '2px' }}
            role="list"
            aria-label="Common deployment anti-patterns"
          >
            {BAD_PATTERNS.map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-[2rem_1fr_1fr] items-start gap-6 px-6 py-5 sm:gap-8"
                role="listitem"
              >
                <span
                  className="text-primary/50 pt-0.5 font-mono text-xs tabular-nums"
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
            What I&apos;m building
          </span>

          <h2 data-reveal className="text-ink mb-3 text-3xl leading-snug font-semibold">
            Deployments should feel boring.
          </h2>
          <p data-reveal className="text-ink-secondary mb-14 max-w-lg text-lg leading-relaxed">
            My mission with DeployTitan is simple: give every engineering team the controls,
            visibility, and recovery speed they need to deploy with confidence, any time they want.
          </p>

          <div className="border-line space-y-px border" style={{ borderRadius: '2px' }}>
            {OUTCOMES.map((p) => (
              <div
                key={p.number}
                className="group hover:bg-surface-alt/40 border-line border-b p-7 transition-colors last:border-b-0"
                data-reveal
              >
                <div className="flex items-start gap-5">
                  <span className="text-primary/50 shrink-0 pt-0.5 font-mono text-xs tabular-nums">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-ink mb-2 text-sm font-semibold">{p.title}</h3>
                    <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Founder note ──────────────────────────────────────────────────────── */}
      <section className="border-line border-b pt-16 pb-20">
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

            <p className="text-primary mb-6 font-mono text-xs tracking-widest uppercase">
              A note from me
            </p>
            <div className="text-ink mb-8 space-y-5 text-base leading-relaxed">
              <p>
                If you&apos;ve ever pushed a deploy at 11pm just to avoid risking a Friday, I built
                this for you.
              </p>
              <p>
                If you&apos;ve ever been the on-call engineer staring at an alert for a feature you
                didn&apos;t write, trying to decide if you should roll back or wait it out: I built
                this for you.
              </p>
              <p>
                I want to hear your deployment story. Every conversation I have with an engineer
                reminds me exactly why this matters.
              </p>
            </div>

            <div className="border-line flex items-center gap-4 border-t pt-6">
              <div>
                <p className="text-ink text-sm font-semibold">Justine, Founder, DeployTitan</p>
                <a
                  href="mailto:justine@deploytitan.com"
                  className="text-primary font-mono text-xs hover:underline"
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
        <Container width="3xl" padding="default">
          <div data-reveal className="space-y-6 text-center">
            <h2 className="text-ink text-3xl leading-snug font-semibold">
              Ready to deploy without the dread?
            </h2>
            <p className="text-ink-secondary mx-auto max-w-xl text-lg leading-relaxed">
              Early access is open. 14-day free trial, no credit card required. Run your first
              Lambda canary in under 5 minutes.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Button
                as="a"
                href="https://console.deploytitan.com/login"
                variant="primary"
                size="sm"
                aria-label="Start your free trial of DeployTitan"
              >
                Start free trial
              </Button>
              <Button
                as="a"
                href="mailto:justine@deploytitan.com"
                variant="outline"
                size="sm"
                aria-label="Email Justine, founder of DeployTitan"
              >
                Talk to the founder
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
