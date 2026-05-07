'use client'

import { useScrollReveal } from '../utils'
import { MidCTA } from '../components/MidCTA'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRIMARY = 'var(--color-primary)'

// ── What we're building toward ────────────────────────────────────────────────
const OUTCOMES = [
  {
    number: '01',
    title: 'Reduce deployment risk',
    body: 'Progressive rollouts, automated risk scoring, and real-time traffic control — so you catch problems before they reach all your users.',
  },
  {
    number: '02',
    title: 'Recover from failures faster',
    body: 'Instant rollback in seconds, not minutes. When something goes wrong, the people who built the feature can fix it without coordinating a team.',
  },
  {
    number: '03',
    title: 'Protect SLOs and SLAs',
    body: 'Deploy with full visibility into blast radius and SLO proximity. Stop discovering compliance breaches in a post-incident review.',
  },
  {
    number: '04',
    title: 'Eliminate deployment anxiety',
    body: 'Deploy on Fridays. Deploy multiple times a day. Deploy at night if you want — but because you chose to, not because you had to.',
  },
]

export default function Journey() {
  useScrollReveal()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="blueprint-grid pt-28 pb-24 border-b border-line">
        <Container width="3xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Our journey
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-7">
            We built DeployTitan
            <br className="hidden md:block" /> because we lived the problem.
          </h1>
          <p className="text-xl text-ink-secondary leading-relaxed mb-5">
            Not as a thought experiment. Not from a whiteboard session. For 7 years, across
            multiple engineering organizations, I watched the same fear play out in different
            forms. The tools changed. The fear didn't.
          </p>
          <p className="text-lg text-ink-secondary leading-relaxed">
            This is the honest story of why that matters — and what we decided to do about it.
          </p>
        </Container>
      </section>

      {/* ── The Pattern ───────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            Seven years of the same problem
          </span>

          <div className="space-y-6">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              For the last 7 years, I worked across multiple engineering organizations — and every
              company handled deployments differently.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              Some teams only deployed late at night during narrow maintenance windows because
              production changes during the day were considered too risky. Other teams allowed
              deployments during working hours, usually between 10am and 5pm, but even then Fridays
              were avoided because nobody wanted to spend the weekend firefighting.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              The deployment process changed from company to company. But the fear around
              deployments was always the same.
            </p>

            {/* Pull quote */}
            <div data-reveal className="my-10 border-l-2 pl-6" style={{ borderColor: PRIMARY }}>
              <p className="text-xl font-medium text-ink leading-relaxed">
                "And honestly, I hated it."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Night deployments ─────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            The night deployment trap
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-8 leading-snug">
            Safe in theory.
            <br />
            Dangerous in practice.
          </h2>

          <div className="space-y-6 mb-12">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              Night deployments sound safe in theory, but they create a different problem entirely.
              We would deploy, run a quick sanity check, and assume things were fine — only for
              real production traffic to hit later and expose issues that never appeared during
              testing.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              By then, the engineering team might already be offline, asleep, or unavailable.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              To solve that, some organizations tried building permanent 24x7 on-call rotations.
              But that created another challenge: the on-call engineer often didn't fully understand
              the newly released feature, the rollout context, or the edge cases behind the change.
              When incidents happened, response time slowed down because the people handling the
              issue weren't always the people who built it.
            </p>
          </div>

          {/* Pain pattern cards */}
          <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: 'Night windows',
                desc: 'Deployments pushed to off-hours to reduce perceived risk',
                context: 'but real traffic hits after the team goes offline',
              },
              {
                stat: '24x7 on-call',
                desc: 'Rotations staffed by engineers who didn\'t build the feature',
                context: 'slower response when it matters most',
              },
              {
                stat: 'No Fridays',
                desc: 'Entire deployment windows blocked to avoid weekend incidents',
                context: 'velocity sacrificed for fear management',
              },
            ].map((item) => (
              <Card key={item.stat} padding="sm">
                <p className="text-base font-semibold text-ink mb-1">{item.stat}</p>
                <p className="text-xs text-ink-secondary leading-relaxed mb-2">{item.desc}</p>
                <p className="text-xs font-mono text-ink-tertiary">{item.context}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Rollback problem ──────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            When rollback fails you
          </span>

          <div className="space-y-6">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              Rollback processes weren't much better either.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              Even in mature systems, rolling back production changes could take precious minutes.
              Those minutes directly affected uptime, customer trust, SLOs, and SLA commitments.
              The larger the system became, the harder and riskier deployments felt.
            </p>

            {/* Pull quote */}
            <div data-reveal className="my-10 border-l-2 pl-6" style={{ borderColor: PRIMARY }}>
              <p className="text-xl font-medium text-ink leading-relaxed">
                "Over time, one thing became very clear: the problem wasn't just deployment
                tooling. The real problem was confidence."
              </p>
            </div>

            <p data-reveal className="text-lg text-ink leading-relaxed">
              Engineering teams needed a safer way to release continuously — without relying on
              fear, rigid deployment windows, or manual operational coordination.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              That idea eventually became DeployTitan.
            </p>
          </div>
        </Container>
      </section>

      {/* ── What we believe ───────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line bg-surface-alt/20">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            What we're building
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-4 leading-snug">
            Deployments should not feel dangerous.
          </h2>
          <p data-reveal className="text-lg text-ink-secondary leading-relaxed mb-12">
            Teams should be able to release during the day, at night, on Fridays, or multiple
            times an hour — while still maintaining high reliability and strong operational
            control.
          </p>

          <div className="space-y-px border border-line">
            {OUTCOMES.map((p) => (
              <Card
                key={p.number}
                padding="none"
                className="p-7 border-b border-line last:border-b-0 group hover:bg-surface-alt/40 transition-colors"
                data-reveal
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs text-primary/60 pt-0.5 shrink-0">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink mb-2">{p.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Founder note ──────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <Container width="3xl" padding="default">
          <Card padding="none" className="p-8 lg:p-12 relative overflow-hidden" data-reveal>
            {/* Gold corner accents */}
            <div
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
              style={{ borderColor: PRIMARY, opacity: 0.3 }}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
              style={{ borderColor: PRIMARY, opacity: 0.3 }}
            />

            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-6">
              A note from the founder
            </p>
            <div className="space-y-5 text-base text-ink leading-relaxed mb-8">
              <p>
                Modern engineering teams shouldn't have to choose between speed and stability.
              </p>
              <p>
                I've spent 7 years watching smart, capable teams slow themselves down — not
                because they lacked discipline, but because their deployment tooling forced them
                to treat every release as a high-risk event. That's not an engineering problem.
                That's a tooling problem.
              </p>
              <p>
                DeployTitan is built around a simple belief: if you give teams the right
                controls, visibility, and recovery mechanisms, deployment anxiety disappears on
                its own. You don't need rigid deployment windows. You need confidence.
              </p>
              <p>
                If you're evaluating us, we'd love to talk — not to sell you, but because every
                conversation with an engineering team teaches us something we couldn't have
                figured out on our own.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-line">
              <div>
                <p className="text-sm font-semibold text-ink">The DeployTitan team</p>
                <a
                  href="mailto:hello@deploytitan.com"
                  className="text-xs text-primary hover:underline font-mono"
                >
                  hello@deploytitan.com
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <MidCTA />
    </>
  )
}
