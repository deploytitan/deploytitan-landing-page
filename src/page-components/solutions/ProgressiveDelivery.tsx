'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { SolutionNav } from '../../components/shared/SolutionNav'

const PHASES = [
  {
    number: '01',
    title: 'Risk score before the first byte ships',
    body: 'Titan Foresight analyses every PR against your live dependency graph. You see a 0–100 risk score, blast-radius map, and SLO impact estimate, all before you merge.',
    metric: { value: '< 2s', label: 'analysis time per PR' },
  },
  {
    number: '02',
    title: 'Progressive canary with automatic weight stepping',
    body: 'Deploy to 1% → 10% → 50% → 100% on a schedule you define. Each step is gated by your real SLO metrics: latency, error rate, custom Datadog queries.',
    metric: { value: '3×', label: 'deploy frequency increase' },
  },
  {
    number: '03',
    title: 'Auto-rollback before your on-call wakes up',
    body: 'The moment a metric crosses your threshold, DeployTitan reverses the traffic shift. No human in the loop, no runbook lookup, no 3 AM escalation.',
    metric: { value: '30s', label: 'median rollback time' },
  },
  {
    number: '04',
    title: 'Full deploy lineage for every release',
    body: 'Every deployment is versioned, audited, and linked to the CI run, PR, and deploying engineer. Post-incident RCA takes minutes, not hours.',
    metric: { value: '85%', label: 'fewer production incidents' },
  },
]

const BEFORE = [
  '5-step human approval chain for every release',
  'Friday deploys require a dedicated war-room channel',
  'Rollback = redeploy last tag and watch dashboards',
  'Blast radius discovered in the post-mortem',
]

const AFTER = [
  'Self-service deploys with SLO guardrails',
  'Ship Friday with confidence; rollback is automatic',
  'Single API call to reverse traffic in 30 seconds',
  'Risk scored before the first byte shifts to production',
]

export default function SolutionProgressiveDelivery() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid border-line border-b pt-28 pb-20">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="text-primary border-primary/30 mb-6 inline-flex items-center gap-2 border px-2 py-1 font-mono text-[10px]"
            style={{ borderRadius: '2px' }}
          >
            <span className="bg-signal-success h-1.5 w-1.5" style={{ borderRadius: '1px' }} />
            Powered by Titan Rollout + Titan Foresight
          </div>
          <h1 className="text-ink mb-5 text-4xl leading-tight font-semibold lg:text-5xl">
            Your team avoids
            <br className="hidden md:block" /> shipping on Fridays.
          </h1>
          <p className="text-ink-secondary mb-8 max-w-2xl text-lg leading-relaxed">
            Not because they're lazy. Because a bad deploy at 4pm means a ruined weekend for
            whoever's on call. That fear (the unspoken deploy freeze) is costing you velocity,
            morale, and competitive ground every single week.
          </p>
          <div className="flex flex-wrap items-center gap-4">
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
              href={`${APP_URL}/signup`}
              className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
            >
              Start free trial →
            </a>
          </div>
        </Container>
      </section>

      {/* Narrative */}
      <section className="border-line bg-surface-alt/20 border-b py-16">
        <Container width="4xl" padding="default">
          <div className="flex max-w-prose flex-col gap-10" data-reveal>
            {/* The scene */}
            <div>
              <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
                The situation
              </p>
              <blockquote className="text-ink/90 mb-6 text-xl leading-snug font-semibold italic lg:text-2xl">
                "It's Thursday. The feature's ready. Someone suggests shipping tomorrow morning
                instead of today, just to be safe."
              </blockquote>
              <p className="text-ink-secondary leading-relaxed">
                Everyone nods. No one says it out loud, but the real reason is: if something breaks
                on Friday afternoon, the person who shipped it owns the weekend. So the feature
                waits. The business waits. And the team quietly adds another unspoken rule to their
                deploy culture.
              </p>
            </div>

            {/* The villain */}
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-red-400/80 uppercase">
                The real problem
              </p>
              <p className="text-ink text-base leading-relaxed">
                The issue isn't your team's discipline. It's that your deploy process has no safety
                net. Traffic shifts all-or-nothing. Rollback means re-running CI and watching
                dashboards for 20 minutes. The blast radius of any given deploy is unknown until
                it's in production. So the only rational response is to treat every deploy as
                inherently dangerous, so they ship less.
              </p>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed">
                This isn't a people problem. It's a tooling gap. You've stitched together Argo
                Rollouts, Grafana dashboards, and Slack war rooms, and called it a deploy process.
                But no one wired them together. There's no automatic circuit breaker. The human is
                still the safety mechanism.
              </p>
            </div>

            {/* Cost of inaction */}
            <div className="sharp-card border-signal-danger/20 bg-signal-danger/[0.03] border p-6">
              <p className="text-signal-danger/80 mb-4 font-mono text-xs tracking-widest uppercase">
                Cost of staying put
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    stat: '~40%',
                    label: 'of working hours',
                    detail:
                      'lost to deploy anxiety, war rooms, and slow release cycles in high-growth engineering teams.',
                  },
                  {
                    stat: '12–25 min',
                    label: 'mean time to rollback',
                    detail:
                      "when a human has to notice, decide, and execute. That's the entire impact window for your users.",
                  },
                  {
                    stat: '1–2 features',
                    label: 'per week, per team',
                    detail:
                      'held back by deploy fear in organizations without automated progressive delivery. Compounding over quarters.',
                  },
                ].map((item) => (
                  <div key={item.stat}>
                    <p className="text-signal-danger/80 mb-1 text-2xl font-bold">{item.stat}</p>
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
              <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
                The fix
              </p>
              <p className="text-ink-secondary leading-relaxed">
                Progressive delivery is the structural answer. Not canary as a manual step you add
                to your runbook, but as the default deploy mode, with SLO-gated promotion, automatic
                traffic reversion, and risk scoring wired in before anything ships. When the safety
                net is automatic, the fear disappears. Deploys become a non-event. Friday becomes
                like any other day.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              The transformation
            </p>
            <h2 className="text-ink text-2xl leading-snug font-semibold lg:text-3xl">
              Before and after DeployTitan.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-reveal>
            {/* Before */}
            <Card padding="none" className="p-8">
              <p className="mb-5 font-mono text-[11px] tracking-widest text-red-400/70 uppercase">
                Without DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {BEFORE.map((b) => (
                  <li key={b} className="text-ink-secondary flex items-start gap-3 text-sm">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center border border-red-300/30 font-mono text-[10px] text-red-400/60">
                      ✗
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
            {/* After */}
            <div className="sharp-card border-primary/25 bg-primary/[0.02] border p-8">
              <p className="text-primary mb-5 font-mono text-[11px] tracking-widest uppercase">
                With DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {AFTER.map((a) => (
                  <li key={a} className="text-ink-secondary flex items-start gap-3 text-sm">
                    <span className="border-primary/30 text-primary mt-1 flex h-4 w-4 shrink-0 items-center justify-center border font-mono text-[10px]">
                      ✓
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-line border-b py-24">
        <Container width="6xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              How it works
            </p>
            <h2 className="text-ink text-2xl leading-snug font-semibold lg:text-3xl">
              Four phases, one workflow.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PHASES.map((phase, i) => (
              <Card
                key={phase.number}
                padding="none"
                className="hover:border-primary/20 p-8 transition-all duration-200"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-ink/15 font-mono text-3xl leading-none font-bold select-none">
                    {phase.number}
                  </span>
                  <div className="text-right">
                    <p className="text-primary text-2xl font-bold">{phase.metric.value}</p>
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-wider uppercase">
                      {phase.metric.label}
                    </p>
                  </div>
                </div>
                <h3 className="text-ink mb-2 text-base leading-snug font-semibold">
                  {phase.title}
                </h3>
                <p className="text-ink-secondary text-base leading-relaxed">{phase.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Code snippet */}
      <section className="border-line bg-surface-alt/30 border-b py-14">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              One command
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold">
              Canary to production in a single CLI call.
            </h2>
            <p className="text-ink-secondary text-sm">
              Everything else (traffic stepping, metric polling, rollback decisions) happens
              automatically.
            </p>
          </div>
          <div data-reveal>
            <CodeBlock variant="terminal" filename="terminal" copy={false}>
              <p className="text-ink-quaternary">
                # Deploy with canary strategy, auto-rollback on SLO breach
              </p>
              <p className="text-ink mt-2">
                <span className="text-primary">$</span> dt deploy --strategy canary --canary-weight
                5 --auto-rollback
              </p>
              <p className="text-ink-tertiary mt-3">
                ✓ Risk score: 12/100 (low): 0 SLO violations in last 7d
              </p>
              <p className="text-ink-tertiary">
                ✓ Blast radius: 2 downstream services (non-critical)
              </p>
              <p className="text-ink-tertiary">→ Shifting 5% traffic to v2.4.1...</p>
              <p className="text-signal-success mt-1">
                ✓ p99 stable at 43ms (+2ms). Stepping to 25%.
              </p>
              <p className="text-signal-success">✓ p99 stable at 44ms. Stepping to 100%.</p>
              <p className="text-primary mt-1 font-semibold">✓ Deploy complete. 8m 43s total.</p>
            </CodeBlock>
          </div>
        </Container>
      </section>

      {/* What teams do today */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              The status quo
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              What teams are doing today, and why it breaks.
            </h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              Most teams cobble together Argo Rollouts, feature flags, and manual dashboards. It
              works until it doesn't.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                tool: 'Argo Rollouts + kubectl',
                workaround:
                  'Engineers manually watch Grafana during every canary step. One person owns the laptop, everyone waits.',
                failure:
                  'Traffic shift never reverts automatically. Rollback = kubectl rollout undo at 2am.',
              },
              {
                tool: 'LaunchDarkly feature flags',
                workaround:
                  'Wrap risky code in flags, manually toggle off when things go wrong. Flags accumulate, tech debt grows.',
                failure:
                  "No SLO awareness. Flags don't know about error rates; a human has to notice and react.",
              },
              {
                tool: 'Runbooks + Slack war rooms',
                workaround:
                  'Friday deploy requires a dedicated #deploy-watchroom channel and a senior engineer on standby for 2 hours.',
                failure:
                  'Human latency. Mean-time-to-notice is 8–15 minutes. By then, 100% of users have hit the bug.',
              },
            ].map((item, i) => (
              <Card
                key={item.tool}
                padding="none"
                className="p-7"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="text-primary mb-3 font-mono text-xs tracking-wider uppercase">
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
      <section className="border-line bg-surface-alt/20 border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              How we compare
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              Rollout + Foresight vs. Argo + Spinnaker.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-line border-b">
                  <th className="text-ink-tertiary w-1/4 py-3 pr-6 text-left font-mono text-xs tracking-wider uppercase">
                    Capability
                  </th>
                  <th className="text-primary bg-primary/[0.04] border-primary/10 border-x px-4 py-3 font-mono text-xs tracking-wider uppercase">
                    DeployTitan
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    DIY (Argo + scripts)
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    Spinnaker
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Automatic rollback on SLO breach', '✓', '✗ (manual)', '~  (with plugin)'],
                  ['Risk score before merge', '✓', '✗', '✗'],
                  ['Scoped rollback (cohort, not full service)', '✓', '✗', '✗'],
                  ['Zero-config canary stepping', '✓', '✗ (YAML + scripts)', '~ (complex setup)'],
                  ['Setup time', '< 1 day', '2–4 weeks', '4–8 weeks'],
                ].map(([cap, dt, diy, spinnaker]) => (
                  <tr key={String(cap)} className="border-line/50 border-b">
                    <td className="text-ink-secondary py-3 pr-6 text-xs">{cap}</td>
                    <td className="text-signal-success bg-primary/[0.03] border-primary/8 border-x px-4 py-3 text-center font-mono text-xs">
                      {dt}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {diy}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {spinnaker}
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
              See it running on your stack in 20 minutes.
            </h2>
            <p className="text-ink-secondary mx-auto mb-8 max-w-lg text-sm">
              We'll walk through a live canary deploy on your services, show you the risk score on a
              real PR, and configure auto-rollback against your SLOs.
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
                href={`${APP_URL}/signup`}
                className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
              >
                Start free trial →
              </a>
            </div>
          </div>
        </Container>
      </section>

      <SolutionNav currentRoute="/solutions/progressive-delivery" />
    </>
  )
}
