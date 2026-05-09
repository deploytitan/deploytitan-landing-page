'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'

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
    color: 'text-signal-warning',
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
    color: 'text-signal-danger',
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
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 mb-6"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 bg-signal-success" style={{ borderRadius: '1px' }} />
            Powered by Titan Foresight
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            You find out your
            <br className="hidden md:block" /> blast radius in the post-mortem.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            A PR ships. Something breaks. Three services you didn't know depended on this one start
            erroring. The post-mortem question, "did anyone check the dependency graph?", has no
            good answer, because there was no tool that did it automatically before the deploy.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://cal.com/deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
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
              href={`${APP_URL}/signup`}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Start free trial →
            </a>
          </div>
        </Container>
      </section>

      {/* Narrative */}
      <section className="py-20 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default">
          <div className="flex flex-col gap-10" data-reveal>
            {/* The scene */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
                The situation
              </p>
              <blockquote className="text-xl lg:text-2xl font-semibold text-ink leading-snug border-l-2 border-primary pl-6 mb-6">
                "The PR looked fine. Two approvals. Staging passed. It shipped Thursday at noon.
                By 12:40, three teams were paging."
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
              <p className="text-xs font-mono tracking-widest uppercase text-red-400/80 mb-4">
                The real problem
              </p>
              <p className="text-ink leading-relaxed text-base">
                Deploy risk is a function of four things: what changed, what depends on it, how
                healthy your error budget is, and when you're shipping. Most teams have none of
                these systematically available at merge time. They rely on reviewer familiarity,
                which is tribal knowledge that doesn't scale. The senior engineer who knows every
                dependency is one vacation away from being the single point of failure in your
                release process.
              </p>
              <p className="text-ink-secondary leading-relaxed text-base mt-4">
                And even when teams do check (manually pulling up Datadog before a deploy, eyeing
                the error budget, pinging the downstream service owners), none of that is
                connected to a deploy gate. A high-risk PR can still ship on a depleted error
                budget on a Friday afternoon, because nothing blocks it.
              </p>
            </div>

            {/* Cost of inaction */}
            <div className="sharp-card border border-signal-danger/20 bg-signal-danger/[0.03] p-6">
              <p className="text-xs font-mono tracking-widest uppercase text-signal-danger/80 mb-4">
                Cost of staying put
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    stat: '70%',
                    label: 'of prod incidents',
                    detail: 'trace back to a deploy. Most were foreseeable: the blast radius was knowable before the change shipped.',
                  },
                  {
                    stat: '5–15 min',
                    label: 'per PR, per reviewer',
                    detail: 'spent mentally mapping dependencies that a system could compute in under 2 seconds. Every single PR.',
                  },
                  {
                    stat: '1 engineer',
                    label: 'who knows the graph',
                    detail: 'Most teams have a single person who intuitively knows which services depend on what. That\'s your single point of failure.',
                  },
                ].map((item) => (
                  <div key={item.stat}>
                    <p className="text-2xl font-bold text-signal-danger/80 mb-1">{item.stat}</p>
                    <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-2">{item.label}</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The resolution */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
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
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Risk model
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              Six factors. One score.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Sentinel weighs six signals against your specific service's history and dependency
              graph to produce a calibrated risk score.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RISK_FACTORS.map((f, i) => (
              <Card
                key={f.label}
                padding="sm"
                className="hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i % 3)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-ink leading-snug">{f.label}</h3>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 ${
                      f.weight === 'High'
                        ? 'text-signal-danger/80 bg-signal-danger/8 border border-signal-danger/20'
                        : 'text-signal-warning/80 bg-signal-warning/8 border border-signal-warning/20'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {f.weight}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Guardrails */}
      <section className="py-20 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Guardrails
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              Automated enforcement, not just warnings.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Configure what happens at each risk threshold. From advisory notifications to hard
              blocks: you define the policy, Sentinel enforces it.
            </p>
          </div>
          <div className="flex flex-col gap-4" data-reveal>
            {GUARDRAILS.map((g) => (
              <div
                key={g.level}
                className={`sharp-card border p-6 ${g.border} ${g.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${g.color}`}
                  >
                    {g.level}
                  </span>
                  <p className="text-sm text-ink-secondary">{g.description}</p>
                </div>
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-wider border px-2 py-1 ${g.border} ${g.color}`}
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
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              GitHub integration
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Risk score on every PR. No workflow change required.
            </h2>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-ink-quaternary"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="font-mono text-[10px] text-ink-quaternary">
                titan-foresight · PR #847 comment
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-[2px] bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
                  DT
                </div>
                <span className="text-xs font-semibold text-ink">Titan Foresight</span>
                <span className="text-xs text-ink-quaternary font-mono">just now</span>
              </div>
              <div className="border border-line rounded-sm p-4 text-xs font-mono">
                <p className="font-semibold text-ink mb-2">
                  🛡 Risk Analysis ·{' '}
                  <span className="text-signal-warning">Score: 62/100, Advisory</span>
                </p>
                <p className="text-ink-secondary mb-2">
                  Analysed 847 lines changed across 3 files.
                </p>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">Blast radius</td>
                      <td className="text-ink">4 downstream services</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">Error budget</td>
                      <td className="text-signal-warning">38% remaining (caution)</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">SLO violations (7d)</td>
                      <td className="text-ink">2</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">Recommendation</td>
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
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The status quo
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              How teams assess deploy risk today, and why it fails.
            </h2>
            <p className="text-ink-secondary text-sm max-w-xl">
              Most teams have no systematic risk model. They rely on gut feel, reviewer experience,
              and "it worked in staging."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tool: 'Manual PR review',
                workaround: 'Senior engineers eyeball every PR for risky patterns. Tribal knowledge determines what gets extra scrutiny.',
                failure: 'Doesn\'t scale. Senior engineers become the bottleneck. Friday PRs get rushed approvals. Blast radius is never quantified.',
              },
              {
                tool: 'Staging environment',
                workaround: 'Run the change in staging for a few hours. If nothing breaks, ship to production.',
                failure: 'Staging traffic is synthetic. Dependency graphs differ. 70% of production incidents don\'t reproduce in staging.',
              },
              {
                tool: 'Error budget tracking in dashboards',
                workaround: 'SREs check Grafana/Datadog before each deploy to see if error budget is healthy. Manual lookup, no automation.',
                failure: 'No connection between the dashboard check and the deploy decision. Nothing blocks a high-risk deploy on a depleted budget.',
              },
            ].map((item, i) => (
              <Card
                key={item.tool}
                padding="none"
                className="p-7"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">
                  {item.tool}
                </p>
                <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{item.workaround}</p>
                <div className="border-t border-line pt-4">
                  <p className="text-[11px] font-mono text-red-400/80 uppercase tracking-wider mb-1">
                    Failure mode
                  </p>
                  <p className="text-xs text-ink-tertiary leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-20 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How we compare
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              DeployTitan vs. the alternatives.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 pr-6 text-xs font-mono uppercase tracking-wider text-ink-tertiary w-1/4">
                    Capability
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-primary">
                    DeployTitan
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    Manual review
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
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
                  <tr key={String(cap)} className="border-b border-line/50">
                    <td className="py-3 pr-6 text-xs text-ink-secondary">{cap}</td>
                    <td className="py-3 px-4 text-center text-xs text-signal-success font-mono">{dt}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{manual}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{dora}</td>
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
              See a risk score on one of your real PRs.
            </h2>
            <p className="text-ink-secondary text-sm mb-8 max-w-lg mx-auto">
              Connect your GitHub repo, pick a recent PR, and we'll show you the blast radius map,
              error budget check, and risk score, live in 20 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/deploytitan/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
                style={{ borderRadius: '2px' }}
              >
                Book a 20-min walkthrough
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href={`${APP_URL}/signup`}
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Start free trial →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
