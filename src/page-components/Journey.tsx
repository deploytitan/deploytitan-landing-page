'use client'

import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRIMARY = 'var(--color-primary)'

const OUTCOMES = [
  {
    number: '01',
    title: 'Reduce deployment risk',
    body: 'Progressive rollouts, automated risk scoring, and real-time traffic control — catch problems before they reach all your users.',
  },
  {
    number: '02',
    title: 'Recover in seconds, not minutes',
    body: 'Instant rollback without coordination. The person who built the feature can fix it — right now, without waking anyone up.',
  },
  {
    number: '03',
    title: 'Protect your SLOs and SLAs',
    body: 'Full visibility into blast radius before you ship. Stop discovering compliance breaches in a post-incident review.',
  },
  {
    number: '04',
    title: 'Deploy whenever you want',
    body: 'Friday afternoons. Multiple times a day. Whatever works for your team — because you have the confidence to back it up.',
  },
]

export default function Journey() {
  useScrollReveal()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="blueprint-grid border-line border-b pt-28 pb-24">
        <Container width="3xl" padding="default" data-reveal>
          <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
            My journey
          </p>
          <h1 className="text-ink mb-7 text-4xl leading-tight font-semibold lg:text-5xl">
            I built DeployTitan
            <br className="hidden md:block" /> because I lived the problem.
          </h1>
          <p className="text-ink-secondary text-xl leading-relaxed">
            Not from a whiteboard. Not from a VC pitch. From 7 years of watching brilliant engineers
            treat every deployment like defusing a bomb — and deciding I'd had enough.
          </p>
        </Container>
      </section>

      {/* ── The Pattern ───────────────────────────────────────────────────────── */}
      <section className="border-line border-b py-24">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="text-ink-tertiary mb-8 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="bg-primary/40 h-px w-6" />
            Seven years of the same fear
          </span>

          <div className="space-y-6">
            <p data-reveal className="text-ink text-lg leading-relaxed">
              I worked across multiple engineering organizations. Every company had different tools,
              different stacks, different processes. But one thing was always the same: deployments
              were treated as a risk to be minimized, not a capability to be owned.
            </p>
            <p data-reveal className="text-ink text-lg leading-relaxed">
              Night windows. No-deploy Fridays. On-call rotations staffed by engineers who didn't
              build the thing they were now responsible for keeping alive at 2am.
            </p>

            <div data-reveal className="my-10 border-l-2 pl-6" style={{ borderColor: PRIMARY }}>
              <p className="text-ink text-xl leading-relaxed font-medium">
                "I watched smart, capable people slow themselves down — not because they lacked
                discipline, but because their tooling made every release feel dangerous."
              </p>
            </div>

            <p data-reveal className="text-ink text-lg leading-relaxed">
              And honestly? I hated it. I hated the anxiety. I hated the 11pm deploys. I hated
              watching teams hold back features because nobody wanted to be the one who broke prod
              on a Friday.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The real problem ──────────────────────────────────────────────────── */}
      <section className="border-line bg-surface-alt/30 border-b py-24">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="text-ink-tertiary mb-8 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="bg-primary/40 h-px w-6" />
            The real problem
          </span>

          <h2 data-reveal className="text-ink mb-8 text-3xl leading-snug font-semibold">
            It was never a people problem.
            <br />
            It was always a tooling problem.
          </h2>

          <div className="mb-12 space-y-6">
            <p data-reveal className="text-ink text-lg leading-relaxed">
              Night deployments feel safer — until real production traffic hits hours later and the
              team is already offline. Rollbacks that take minutes feel like forever when an SLO is
              burning. On-call rotations slow incident response because the people paged didn't
              build the feature that's failing.
            </p>
            <p data-reveal className="text-ink text-lg leading-relaxed">
              These aren't discipline failures. They're the entirely predictable result of tooling
              that gives teams no confidence, no visibility, and no fast path to recovery.
            </p>
          </div>

          <div data-reveal className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                stat: 'Night windows',
                desc: 'Pushed to off-hours to reduce perceived risk',
                context: 'but real traffic exposes issues after the team goes dark',
              },
              {
                stat: '24x7 on-call',
                desc: "Engineers paged for code they didn't write",
                context: 'slower response when it matters most',
              },
              {
                stat: 'No Fridays',
                desc: 'Entire deployment windows blocked out of fear',
                context: 'velocity sacrificed for anxiety management',
              },
            ].map((item) => (
              <Card key={item.stat} padding="sm">
                <p className="text-ink mb-1 text-base font-semibold">{item.stat}</p>
                <p className="text-ink-secondary mb-2 text-xs leading-relaxed">{item.desc}</p>
                <p className="text-ink-tertiary font-mono text-xs">{item.context}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What I'm building ─────────────────────────────────────────────────── */}
      <section className="border-line bg-surface-alt/20 border-b py-24">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="text-ink-tertiary mb-8 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="bg-primary/40 h-px w-6" />
            What I'm building
          </span>

          <h2 data-reveal className="text-ink mb-4 text-3xl leading-snug font-semibold">
            Deployments should feel boring.
          </h2>
          <p data-reveal className="text-ink-secondary mb-12 text-lg leading-relaxed">
            My mission with DeployTitan is simple: give every engineering team the controls,
            visibility, and recovery speed they need to deploy with confidence — any time they want.
          </p>

          <div className="border-line space-y-px border">
            {OUTCOMES.map((p) => (
              <Card
                key={p.number}
                padding="none"
                className="border-line group hover:bg-surface-alt/40 border-b p-7 transition-colors last:border-b-0"
                data-reveal
              >
                <div className="flex items-start gap-5">
                  <span className="text-primary/60 shrink-0 pt-0.5 font-mono text-xs">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-ink mb-2 text-sm font-semibold">{p.title}</h3>
                    <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Founder note ──────────────────────────────────────────────────────── */}
      <section className="border-line border-b py-24">
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
                If you've ever pushed a deploy at 11pm just to avoid risking a Friday, I built this
                for you.
              </p>
              <p>
                If you've ever been the on-call engineer staring at an alert for a feature you
                didn't write, trying to decide if you should roll back or wait it out — I built this
                for you.
              </p>
              <p>
                I want to hear about your deployment story. Not to pitch you. Because every
                conversation I have with an engineer reminds me exactly why this matters.
              </p>
            </div>

            <div className="border-line flex items-center gap-4 border-t pt-6">
              <div>
                <p className="text-ink text-sm font-semibold">Justine — Founder, DeployTitan</p>
                <a
                  href="mailto:justine@deploytitan.com"
                  className="text-primary font-mono text-xs hover:underline"
                >
                  justine@deploytitan.com
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <Container width="3xl" padding="default">
          <div data-reveal className="space-y-6 text-center">
            <h2 className="text-ink text-3xl leading-snug font-semibold">
              Ready to deploy without the dread?
            </h2>
            <p className="text-ink-secondary mx-auto max-w-xl text-lg leading-relaxed">
              Join the engineers who are already shipping with confidence. Early access is open —
              get in before we close the waitlist.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <a
                href="https://console.deploytitan.com/login"
                className="bg-ink text-ink dark:text-surface inline-flex items-center gap-2 px-5.5 py-2.5 text-sm font-medium transition-all"
                style={{ background: PRIMARY }}
              >
                Get Started
              </a>
              <a
                href="mailto:justine@deploytitan.com"
                className="border-line text-ink hover:bg-surface-alt/40 inline-flex items-center justify-center border px-6 py-3 text-sm font-semibold transition-colors"
              >
                Talk to the founder
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
