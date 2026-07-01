'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { SolutionNav } from '../../components/shared/SolutionNav'
import { SolutionPageHero } from '../../components/shared/SolutionPageHero'

const RISK_FACTORS = [
  {
    label: 'Dependency blast radius',
    description: 'How many downstream services depend on this service?',
    weight: 'High',
  },
  {
    label: 'Deploy frequency delta',
    description: 'Is this change deploying more frequently than historical baseline?',
    weight: 'Medium',
  },
  {
    label: 'SLO error budget remaining',
    description: 'How much error budget is left? Low budget = higher risk.',
    weight: 'High',
  },
  {
    label: 'PR diff size',
    description: 'Large diffs correlate with higher incident rates.',
    weight: 'Medium',
  },
  {
    label: 'Time of day / day of week',
    description: 'Friday 4pm + large diff + low budget = maximum caution.',
    weight: 'Medium',
  },
  {
    label: 'Recent incident history',
    description: 'Services with recent incidents get elevated baseline risk.',
    weight: 'High',
  },
]

const GUARDRAILS = [
  {
    level: 'Advisory',
    color: 'text-signal-warning-text dark:text-signal-warning',
    border: 'border-signal-warning/30',
    bg: 'bg-signal-warning/5',
    description: 'Score 40–69. PR annotation warns the deployer. Deploy proceeds.',
    action: 'Notify + log',
  },
  {
    level: 'Soft block',
    color: 'text-orange-400',
    border: 'border-orange-400/30',
    bg: 'bg-orange-400/5',
    description: 'Score 70–84. Requires second approval or SRE sign-off in the PR.',
    action: 'Require approval',
  },
  {
    level: 'Hard block',
    color: 'text-signal-danger-text dark:text-signal-danger',
    border: 'border-signal-danger/30',
    bg: 'bg-signal-danger/5',
    description: 'Score 85+. Deploy is blocked until risk score drops below threshold.',
    action: 'Block deploy',
  },
]

export default function SolutionRiskIntelligence() {
  useScrollReveal()

  return (
    <>
      <SolutionPageHero
        poweredBy="Powered by Titan Foresight"
        heading={<>You find out your<br className="hidden md:block" /> blast radius in the post-mortem.</>}
        description="A PR ships. Something breaks. Three services you didn't know depended on this one start erroring. The post-mortem question, &ldquo;did anyone check the dependency graph?&rdquo;, has no good answer, because there was no tool that did it automatically before the deploy."
        ctas={[
          { label: 'Book a 20-min walkthrough', href: 'https://cal.com/justine-deploytitan/demo', variant: 'book', target: '_blank', rel: 'noopener noreferrer' },
          { label: 'Join waitlist →', href: WAITLIST_URL, variant: 'secondary' },
        ]}
      />

      {/* Narrative */}
      <section className="border-line bg-surface-alt/20 border-b py-16">
        <Container width="4xl" padding="default">
          <div className="flex max-w-prose flex-col gap-10" data-reveal>
            {/* The scene */}
            <div>
              <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
                The situation
              </p>
              <blockquote className="text-ink/90 mb-6 text-xl leading-snug font-semibold italic lg:text-2xl">
                "The PR looked fine. Two approvals. Staging passed. It shipped Thursday at noon. By
                12:40, three teams were paging."
              </blockquote>
              <p className="text-ink-secondary leading-relaxed">
                The change was 200 lines. It touched a shared auth utility that eight services
                called. Nobody knew, not because they were careless, but because that dependency
                information lives in a graph that nobody maintains, nobody queries before merging,
                and nobody thinks about until it's the subject of a post-mortem action item that
                also doesn't get done.
              </p>
            </div>

            {/* The villain */}
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-red-400/80 uppercase">
                The real problem
              </p>
              <p className="text-ink text-base leading-relaxed">
                Deploy risk is a function of four things: what changed, what depends on it, how
                healthy your error budget is, and when you're shipping. Most teams have none of
                these systematically available at merge time. They rely on reviewer familiarity,
                which is tribal knowledge that doesn't scale. The senior engineer who knows every
                dependency is one vacation away from being the single point of failure in your
                release process.
              </p>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed">
                And even when teams do check (manually pulling up Datadog before a deploy, eyeing
                the error budget, pinging the downstream service owners), none of that is connected
                to a deploy gate. A high-risk PR can still ship on a depleted error budget on a
                Friday afternoon, because nothing blocks it.
              </p>
            </div>

            {/* Cost of inaction */}
            <div className="sharp-card border-signal-danger/20 bg-signal-danger/[0.03] border p-6">
              <p className="text-signal-danger-text dark:text-signal-danger mb-4 font-mono text-xs tracking-widest uppercase">
                Cost of staying put
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    stat: '70%',
                    label: 'of prod incidents',
                    detail:
                      'trace back to a deploy. Most were foreseeable: the blast radius was knowable before the change shipped.',
                  },
                  {
                    stat: '5–15 min',
                    label: 'per PR, per reviewer',
                    detail:
                      'spent mentally mapping dependencies that a system could compute in under 2 seconds. Every single PR.',
                  },
                  {
                    stat: '1 engineer',
                    label: 'who knows the graph',
                    detail:
                      "Most teams have a single person who intuitively knows which services depend on what. That's your single point of failure.",
                  },
                ].map((item) => (
                  <div key={item.stat}>
                    <p className="text-signal-danger-text dark:text-signal-danger mb-1 text-2xl font-bold">{item.stat}</p>
                    <p className="text-ink-tertiary mb-2 font-mono text-xs tracking-wider uppercase">
                      {item.label}
                    </p>
                    <p className="text-ink-secondary text-xs leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The resolution */}
            <div>
              <p className="text-primary-accessible mb-4 font-mono text-xs tracking-widest uppercase">
                The fix
              </p>
              <p className="text-ink-secondary leading-relaxed">
                Risk intelligence needs to be automatic, pre-merge, and connected to a deploy gate.
                Not a dashboard someone checks. A system that reads every PR, walks your live
                dependency graph, checks your error budget balance, and surfaces a single risk score
                with a recommendation, as a PR comment, before anyone approves. High-risk changes
                get a soft block or a require-SRE-sign-off. The information that used to live in one
                senior engineer's head becomes systematic, enforced, and auditable.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Risk factors */}
      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Risk model
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              Six factors. One score.
            </h2>
            <p className="text-ink-secondary max-w-lg text-sm">
              Titan Foresight weighs six signals against your specific service's history and
              dependency graph to produce a calibrated risk score.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RISK_FACTORS.map((f, i) => (
              <Card
                key={f.label}
                padding="sm"
                className="hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i % 3)}
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-ink text-sm leading-snug font-semibold">{f.label}</h3>
                  <span
                    className={`px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase ${
                      f.weight === 'High'
                        ? 'text-signal-danger-text dark:text-signal-danger bg-signal-danger/8 border-signal-danger/20 border'
                        : 'text-signal-warning-text dark:text-signal-warning bg-signal-warning/8 border-signal-warning/20 border'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {f.weight}
                  </span>
                </div>
                <p className="text-ink-secondary text-xs leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Guardrails */}
      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Guardrails
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              Automated enforcement, not just warnings.
            </h2>
            <p className="text-ink-secondary max-w-lg text-sm">
              Configure what happens at each risk threshold. From advisory notifications to hard
              blocks: you define the policy, Titan Foresight enforces it.
            </p>
          </div>
          <div className="flex flex-col gap-4" data-reveal>
            {GUARDRAILS.map((g) => (
              <div
                key={g.level}
                className={`sharp-card border p-6 ${g.border} ${g.bg} flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider uppercase ${g.color}`}
                  >
                    {g.level}
                  </span>
                  <p className="text-ink-secondary text-sm">{g.description}</p>
                </div>
                <span
                  className={`shrink-0 border px-2 py-1 font-mono text-[10px] tracking-wider uppercase ${g.border} ${g.color}`}
                  style={{ borderRadius: '2px' }}
                >
                  {g.action}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PR annotation screenshot-style */}
      <section className="border-line bg-surface-alt/30 border-b py-16">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              GitHub integration
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold">
              Risk score on every PR. No workflow change required.
            </h2>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="border-line bg-surface-alt/60 flex items-center gap-2 border-b px-4 py-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-ink-tertiary"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="text-ink-tertiary font-mono text-[10px]">
                titan-foresight · PR #847 comment
              </span>
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-primary/20 text-primary-accessible dark:text-primary flex h-6 w-6 items-center justify-center rounded-[2px] text-[9px] font-bold">
                  DT
                </div>
                <span className="text-ink text-xs font-semibold">Titan Foresight</span>
                <span className="text-ink-tertiary font-mono text-xs">just now</span>
              </div>
              <div className="border-line rounded-sm border p-4 font-mono text-xs">
                <p className="text-ink mb-2 font-semibold">
                  🛡 Risk Analysis ·{' '}
                  <span className="text-signal-warning-text dark:text-signal-warning">Score: 62/100, Advisory</span>
                </p>
                <p className="text-ink-secondary mb-2">
                  Analysed 847 lines changed across 3 files.
                </p>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="text-ink-tertiary py-0.5 pr-4">Blast radius</td>
                      <td className="text-ink">4 downstream services</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary py-0.5 pr-4">Error budget</td>
                      <td className="text-signal-warning-text dark:text-signal-warning">38% remaining (caution)</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary py-0.5 pr-4">SLO violations (7d)</td>
                      <td className="text-ink">2</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary py-0.5 pr-4">Recommendation</td>
                      <td className="text-ink">Deploy off-peak or reduce canary weight</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* What teams do today */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              The status quo
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              How teams assess deploy risk today, and why it fails.
            </h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              Most teams have no systematic risk model. They rely on gut feel, reviewer experience,
              and "it worked in staging."
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                tool: 'Manual PR review',
                workaround:
                  'Senior engineers eyeball every PR for risky patterns. Tribal knowledge determines what gets extra scrutiny.',
                failure:
                  "Doesn't scale. Senior engineers become the bottleneck. Friday PRs get rushed approvals. Blast radius is never quantified.",
              },
              {
                tool: 'Staging environment',
                workaround:
                  'Run the change in staging for a few hours. If nothing breaks, ship to production.',
                failure:
                  "Staging traffic is synthetic. Dependency graphs differ. 70% of production incidents don't reproduce in staging.",
              },
              {
                tool: 'Error budget tracking in dashboards',
                workaround:
                  'SREs check Grafana/Datadog before each deploy to see if error budget is healthy. Manual lookup, no automation.',
                failure:
                  'No connection between the dashboard check and the deploy decision. Nothing blocks a high-risk deploy on a depleted budget.',
              },
            ].map((item, i) => (
              <Card
                key={item.tool}
                padding="none"
                className="p-7"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="text-primary-accessible mb-3 font-mono text-xs tracking-wider uppercase">
                  {item.tool}
                </p>
                <p className="text-ink-secondary mb-4 text-sm leading-relaxed">{item.workaround}</p>
                <div className="border-line border-t pt-4">
                  <p className="mb-1 font-mono text-[11px] tracking-wider text-red-400/80 uppercase">
                    Failure mode
                  </p>
                  <p className="text-ink-tertiary text-sm leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="border-line border-b py-16">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              How we compare
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              Foresight vs. gut feel and DORA dashboards.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-line border-b">
                  <th className="text-ink-tertiary w-1/4 py-3 pr-6 text-left font-mono text-xs tracking-wider uppercase">
                    Capability
                  </th>
                  <th className="text-primary-accessible px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    DeployTitan
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    Manual review
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    DORA metrics tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Risk score per PR (automated)', '✓', '✗ (gut feel)', '✗'],
                  ['Blast radius mapping', '✓', '✗', '✗'],
                  ['SLO error budget awareness', '✓', '✗ (manual check)', '~ (reporting only)'],
                  ['Automated deploy guardrails', '✓', '✗', '✗'],
                  ['Analysis time per PR', '< 2s', '5–15 min', 'N/A'],
                ].map(([cap, dt, manual, dora]) => (
                  <tr key={String(cap)} className="border-line/50 border-b">
                    <td className="text-ink-secondary py-3 pr-6 text-xs">{cap}</td>
                    <td className="text-signal-success-text dark:text-signal-success px-4 py-3 text-center font-mono text-xs">
                      {dt}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {manual}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {dora}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <Container width="4xl" padding="default">
          <div className="text-center" data-reveal>
            <h2 className="text-ink mb-4 text-2xl leading-snug font-semibold lg:text-3xl">
              See a risk score on one of your real PRs.
            </h2>
            <p className="text-ink-secondary mx-auto mb-8 max-w-lg text-sm">
              Connect your GitHub repo, pick a recent PR, and we'll show you the blast radius map,
              error budget check, and risk score, live in 20 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/justine-deploytitan/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-surface dark:text-surface inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97]"
                style={{ borderRadius: '2px' }}
              >
                Book a 20-min walkthrough
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href={WAITLIST_URL}
                className="text-primary-accessible hover:text-primary text-sm font-medium transition-colors"
              >
                Join waitlist →
              </a>
            </div>
          </div>
        </Container>
      </section>

      <SolutionNav currentRoute="/solutions/risk-intelligence" />
    </>
  )
}
