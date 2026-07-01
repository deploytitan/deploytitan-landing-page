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
    title: 'Every sprint PR in one view',
    body: 'Add every release PR across all repos to one release object. No links in chat, no spreadsheet, no guessing what is actually in the sprint.',
  },
  {
    number: '02',
    title: 'CI and Jenkins run without babysitting',
    body: 'Titan triggers your jobs automatically when the release starts. No one has to watch a terminal, refresh a dashboard, or remember to kick off the pipeline.',
  },
  {
    number: '03',
    title: 'Failures surface in Slack immediately',
    body: 'When a job fails, the right people get a Slack alert with the context they need to act. No tab-checking, no refresh loops, no delay.',
  },
  {
    number: '04',
    title: 'Approvals happen without leaving Slack',
    body: 'Stakeholders get a Slack message with the full release context. One click to approve. No browser, no GitHub, no friction at the moment that matters most.',
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

            <figure data-reveal className="border-line my-8 border-t border-b py-7">
              <blockquote>
                <p className="text-ink text-xl leading-relaxed font-medium">
                  I watched smart, capable people slow themselves down, not because they lacked
                  discipline, but because their tooling made every release feel dangerous.
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
              And honestly? I hated it. I hated the anxiety. I hated the 11pm deploys. I hated
              watching teams hold back features because nobody wanted to be the one who broke prod
              on a Friday.
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

          <h2
            data-reveal
            className="text-ink mb-3 text-[clamp(1.75rem,3.5vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.025em]"
          >
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
            What I&apos;m building
          </span>

          <h2
            data-reveal
            className="text-ink mb-3 text-[clamp(1.75rem,3.5vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.025em]"
          >
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
            Available now
          </p>
          <h2 className="text-ink mb-6 text-[clamp(2rem,4vw,3.4rem)] leading-[1.0] font-medium tracking-[-0.04em]">
            Try it on your next sprint.
          </h2>
          <p className="text-ink-secondary mb-8 max-w-[42ch] text-lg leading-8">
            Join the waitlist, share how your team ships today, and we&apos;ll bring you in as soon as
            early access opens for your workflow.
          </p>
          <Button
            as="a"
            href={WAITLIST_URL}
            variant="primary"
            size="lg"
            className="rounded-[8px]"
          >
            Join waitlist
          </Button>
        </Container>
      </section>
    </div>
  )
}
