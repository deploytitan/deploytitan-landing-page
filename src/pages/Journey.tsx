import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useScrollReveal } from '../utils'
import { MidCTA } from '../components/MidCTA'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const PRIMARY = 'var(--color-primary)'

// ── Timeline milestones ────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: '2019',
    label: 'The incident',
    summary:
      'A routine deploy at 11 PM ate 30% of production traffic. The rollback script failed. We manually rerouted for 47 minutes while our monitoring dashboard showed green.',
  },
  {
    year: '2020',
    label: 'The workarounds',
    summary:
      'We built internal tooling — Bash scripts, Slack bots, a shared runbook Google Doc. It worked, until the person who wrote it left. Then we were back to hoping.',
  },
  {
    year: '2021',
    label: 'The search',
    summary:
      'We evaluated every tool on the market. Some were too narrowly scoped. Some required re-platforming our entire stack. None felt like they understood the actual problem.',
  },
  {
    year: '2022',
    label: 'The decision',
    summary:
      'We stopped looking and started building. Not a wrapper around Kubernetes. A deployment control plane — opinionated, composable, and built for real engineering teams.',
  },
  {
    year: '2024',
    label: 'DeployTitan ships',
    summary:
      'First design partners onboarded. 14 integrations live. Progressive rollouts, multi-cloud failover, and risk scoring — all from a single dt deploy command.',
  },
]

// ── Principles ────────────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    number: '01',
    title: 'Deployments should be boring',
    body: 'The best deploy is the one nobody notices. We measure success by how few Slack messages a release generates — not how many dashboards it touches.',
  },
  {
    number: '02',
    title: 'Risk should be visible before traffic shifts',
    body: "Every release carries information about its own risk. Dependency changes, service blast radius, SLO proximity — it's all knowable at PR time. We surface it.",
  },
  {
    number: '03',
    title: 'Rollback is not failure — slowness is',
    body: 'A rollback in 8 seconds is a feature, not a failure mode. What kills teams is rollbacks that take 12 minutes and require three engineers to coordinate.',
  },
  {
    number: '04',
    title: 'Platform teams should set policies, not bottlenecks',
    body: 'Product engineers should deploy independently within guardrails. Platform engineers should write policy-as-code, not become the approval step for every release.',
  },
]

export default function Journey() {
  useDocumentMeta(
    'Why We Built DeployTitan — Our Journey',
    'The story behind DeployTitan — the 3 AM incidents, the lost deploys, and why we decided to build the deployment control plane we always wanted.',
  )
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
            Not as a thought experiment. Not from a whiteboard session about developer experience.
            We were the engineers getting paged at 3 AM, watching a deploy silently eat production
            while every monitor showed green.
          </p>
          <p className="text-lg text-ink-secondary leading-relaxed">
            This is the honest story of that night — and why it took us three more years to stop
            complaining and start building.
          </p>
        </Container>
      </section>

      {/* ── The Incident ──────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            The night it broke
          </span>

          <div className="space-y-6">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              November 2019. We pushed a routine API change — a config tweak, nothing that touched
              the critical path. CI passed. Staging looked fine. We deployed at 11 PM to avoid peak
              traffic.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              At 11:23 PM, customer support started getting tickets. Payment confirmations weren't
              sending. Our monitoring dashboard showed{' '}
              <span className="font-medium text-ink">
                100% uptime, p99 latency nominal, error rate 0.02%
              </span>
              . Nothing looked wrong.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              The config change had silently misconfigured our email service's retry queue. Requests
              were succeeding — they just weren't doing anything. By the time we traced it, 30% of
              that night's transactions had incomplete confirmation emails. We had no automated
              rollback. The runbook was outdated. We spent 47 minutes manually rerouting traffic and
              another two hours writing apology emails to customers.
            </p>

            {/* Pull quote */}
            <div data-reveal className="my-10 border-l-2 pl-6" style={{ borderColor: PRIMARY }}>
              <p className="text-xl font-medium text-ink leading-relaxed">
                "The worst part wasn't the incident. It was realising we had no way to prevent the
                next one — or catch it faster when it happened."
              </p>
            </div>

            <p data-reveal className="text-lg text-ink leading-relaxed">
              We wrote a postmortem. We added more monitoring. We updated the runbook. Three months
              later, a different engineer made a different change, and we had a very similar night.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The Pattern ───────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            What we kept seeing
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-8 leading-snug">
            It wasn't bad luck.
            <br />
            It was a structural problem.
          </h2>

          <div className="space-y-6 mb-12">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              After that incident, we started paying attention differently. We talked to teams at
              other companies — startups, scale-ups, large orgs. The stories were almost identical:
              a deploy that looked fine but wasn't, a rollback that took too long, monitoring that
              told you everything except the thing that mattered.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              The tools hadn't kept pace with how teams actually ship. CI/CD pipelines got faster
              and faster — but nobody added intelligence to what happened <em>during</em> a deploy.
              Traffic shifted in one big step. Rollbacks were manual. Risk was invisible until it
              was a customer complaint.
            </p>
          </div>

          {/* Pain pattern cards */}
          <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: '47 min',
                desc: 'Average time to detect a silent regression',
                context: 'when monitoring shows green',
              },
              {
                stat: '3 engineers',
                desc: 'Typically needed to coordinate a manual rollback',
                context: 'at 2 AM',
              },
              {
                stat: '400 lines',
                desc: 'Average rollback script length',
                context: 'untested until the moment you need it',
              },
            ].map((item) => (
              <Card key={item.stat} padding="sm">
                <p className="text-2xl font-semibold text-ink mb-1">{item.stat}</p>
                <p className="text-xs text-ink-secondary leading-relaxed mb-2">{item.desc}</p>
                <p className="text-xs font-mono text-ink-tertiary">{item.context}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <Container width="3xl" padding="default">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            How we got here
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-12 leading-snug">
            Five years of trying to solve this the right way.
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-line"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-8 group" data-reveal>
                  {/* Year + dot */}
                  <div className="flex flex-col items-center shrink-0 w-16 pt-1">
                    <p className="text-xs font-mono text-primary mb-2">{item.year}</p>
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 relative z-10" />
                  </div>

                  {/* Content */}
                  <div className={`pb-10 ${i === TIMELINE.length - 1 ? 'pb-0' : ''}`}>
                    <p className="text-sm font-semibold text-ink mb-1.5">{item.label}</p>
                    <p className="text-sm text-ink-secondary leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
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
            Our convictions
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-4 leading-snug">
            The principles we built DeployTitan on.
          </h2>
          <p data-reveal className="text-lg text-ink-secondary leading-relaxed mb-12">
            These aren't marketing copy. They're the decisions we find ourselves making over and
            over when we're in disagreement about a feature.
          </p>

          <div className="space-y-px border border-line">
            {PRINCIPLES.map((p) => (
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
              A note from the team
            </p>
            <div className="space-y-5 text-base text-ink leading-relaxed mb-8">
              <p>
                We are not a big company with a large sales org telling you that enterprise
                deployment orchestration is the future. We're a small team that got tired of losing
                sleep over deploys — and decided to do something about it.
              </p>
              <p>
                DeployTitan is opinionated. We've made bets about how deployment control should
                work, and not every bet will be right. But we'd rather ship something with a clear
                point of view than a configuration surface that can theoretically do anything and
                actually helps no one.
              </p>
              <p>
                If you're evaluating us, we'd love to talk to you directly — not to sell you, but
                because every conversation with an engineering team teaches us something we couldn't
                have figured out by ourselves.
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

      {/* ── The Incident ──────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            The night it broke
          </span>

          <div className="space-y-6">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              November 2019. We pushed a routine API change — a config tweak, nothing that touched
              the critical path. CI passed. Staging looked fine. We deployed at 11 PM to avoid peak
              traffic.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              At 11:23 PM, customer support started getting tickets. Payment confirmations weren't
              sending. Our monitoring dashboard showed{' '}
              <span className="font-medium text-ink">
                100% uptime, p99 latency nominal, error rate 0.02%
              </span>
              . Nothing looked wrong.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              The config change had silently misconfigured our email service's retry queue. Requests
              were succeeding — they just weren't doing anything. By the time we traced it, 30% of
              that night's transactions had incomplete confirmation emails. We had no automated
              rollback. The runbook was outdated. We spent 47 minutes manually rerouting traffic and
              another two hours writing apology emails to customers.
            </p>

            {/* Pull quote */}
            <div data-reveal className="my-10 border-l-2 pl-6" style={{ borderColor: PRIMARY }}>
              <p className="text-xl font-medium text-ink leading-relaxed">
                "The worst part wasn't the incident. It was realising we had no way to prevent the
                next one — or catch it faster when it happened."
              </p>
            </div>

            <p data-reveal className="text-lg text-ink leading-relaxed">
              We wrote a postmortem. We added more monitoring. We updated the runbook. Three months
              later, a different engineer made a different change, and we had a very similar night.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Pattern ───────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line bg-surface-alt/30">
        <div className="max-w-3xl mx-auto px-6">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            What we kept seeing
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-8 leading-snug">
            It wasn't bad luck.
            <br />
            It was a structural problem.
          </h2>

          <div className="space-y-6 mb-12">
            <p data-reveal className="text-lg text-ink leading-relaxed">
              After that incident, we started paying attention differently. We talked to teams at
              other companies — startups, scale-ups, large orgs. The stories were almost identical:
              a deploy that looked fine but wasn't, a rollback that took too long, monitoring that
              told you everything except the thing that mattered.
            </p>
            <p data-reveal className="text-lg text-ink leading-relaxed">
              The tools hadn't kept pace with how teams actually ship. CI/CD pipelines got faster
              and faster — but nobody added intelligence to what happened <em>during</em> a deploy.
              Traffic shifted in one big step. Rollbacks were manual. Risk was invisible until it
              was a customer complaint.
            </p>
          </div>

          {/* Pain pattern cards */}
          <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: '47 min',
                desc: 'Average time to detect a silent regression',
                context: 'when monitoring shows green',
              },
              {
                stat: '3 engineers',
                desc: 'Typically needed to coordinate a manual rollback',
                context: 'at 2 AM',
              },
              {
                stat: '400 lines',
                desc: 'Average rollback script length',
                context: 'untested until the moment you need it',
              },
            ].map((item) => (
              <div key={item.stat} className="sharp-card border border-line p-5">
                <p className="text-2xl font-semibold text-ink mb-1">{item.stat}</p>
                <p className="text-xs text-ink-secondary leading-relaxed mb-2">{item.desc}</p>
                <p className="text-xs font-mono text-ink-tertiary">{item.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            How we got here
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-12 leading-snug">
            Five years of trying to solve this the right way.
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-line"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-8 group" data-reveal>
                  {/* Year + dot */}
                  <div className="flex flex-col items-center shrink-0 w-16 pt-1">
                    <p className="text-xs font-mono text-primary mb-2">{item.year}</p>
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 relative z-10" />
                  </div>

                  {/* Content */}
                  <div className={`pb-10 ${i === TIMELINE.length - 1 ? 'pb-0' : ''}`}>
                    <p className="text-sm font-semibold text-ink mb-1.5">{item.label}</p>
                    <p className="text-sm text-ink-secondary leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What we believe ───────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line bg-surface-alt/20">
        <div className="max-w-3xl mx-auto px-6">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-xs font-mono text-ink-tertiary uppercase tracking-widest mb-8"
          >
            <span className="w-6 h-px bg-primary/40" />
            Our convictions
          </span>

          <h2 data-reveal className="text-3xl font-semibold text-ink mb-4 leading-snug">
            The principles we built DeployTitan on.
          </h2>
          <p data-reveal className="text-lg text-ink-secondary leading-relaxed mb-12">
            These aren't marketing copy. They're the decisions we find ourselves making over and
            over when we're in disagreement about a feature.
          </p>

          <div className="space-y-px border border-line">
            {PRINCIPLES.map((p) => (
              <div
                key={p.number}
                className="sharp-card bg-surface p-7 border-b border-line last:border-b-0 group hover:bg-surface-alt/40 transition-colors"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder note ──────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <div
            data-reveal
            className="sharp-card border border-line p-8 lg:p-12 relative overflow-hidden"
          >
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
              A note from the team
            </p>
            <div className="space-y-5 text-base text-ink leading-relaxed mb-8">
              <p>
                We are not a big company with a large sales org telling you that enterprise
                deployment orchestration is the future. We're a small team that got tired of losing
                sleep over deploys — and decided to do something about it.
              </p>
              <p>
                DeployTitan is opinionated. We've made bets about how deployment control should
                work, and not every bet will be right. But we'd rather ship something with a clear
                point of view than a configuration surface that can theoretically do anything and
                actually helps no one.
              </p>
              <p>
                If you're evaluating us, we'd love to talk to you directly — not to sell you, but
                because every conversation with an engineering team teaches us something we couldn't
                have figured out by ourselves.
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
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <MidCTA
        heading="Build with a team that's been in your shoes."
        subheading="We're onboarding design partners now. No sales pitch — just a conversation about your deploys."
        primaryLabel="Apply for early access"
        primaryHref="/early-access"
        secondaryLabel="Read the docs"
        secondaryHref="/docs"
      />
    </>
  )
}
