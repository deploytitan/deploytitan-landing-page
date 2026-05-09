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
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 mb-6"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 bg-signal-success" style={{ borderRadius: '1px' }} />
            Powered by Titan Rollout + Titan Foresight
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Your team avoids
            <br className="hidden md:block" /> shipping on Fridays.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Not because they're lazy. Because a bad deploy at 4pm means a ruined weekend for
            whoever's on call. That fear (the unspoken deploy freeze) is costing you velocity,
            morale, and competitive ground every single week.
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
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default">
          <div className="flex flex-col gap-10 max-w-prose" data-reveal>
            {/* The scene */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
                The situation
              </p>
              <blockquote className="text-xl lg:text-2xl font-semibold text-ink/90 italic leading-snug mb-6">
                "It's Thursday. The feature's ready. Someone suggests shipping tomorrow morning
                instead of today, just to be safe."
              </blockquote>
              <p className="text-ink-secondary leading-relaxed">
                Everyone nods. No one says it out loud, but the real reason is: if something breaks
                on Friday afternoon, the person who shipped it owns the weekend. So the feature waits.
                The business waits. And the team quietly adds another unspoken rule to their deploy
                culture.
              </p>
            </div>

            {/* The villain */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-red-400/80 mb-4">
                The real problem
              </p>
              <p className="text-ink leading-relaxed text-base">
                The issue isn't your team's discipline. It's that your deploy process has no
                safety net. Traffic shifts all-or-nothing. Rollback means re-running CI and watching
                dashboards for 20 minutes. The blast radius of any given deploy is unknown until
                it's in production. So the only rational response is to treat every deploy as
                inherently dangerous, so they ship less.
              </p>
              <p className="text-ink-secondary leading-relaxed text-base mt-4">
                This isn't a people problem. It's a tooling gap. You've stitched together Argo
                Rollouts, Grafana dashboards, and Slack war rooms, and called it a deploy process.
                But no one wired them together. There's no automatic circuit breaker. The human is
                still the safety mechanism.
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
                    stat: '~40%',
                    label: 'of working hours',
                    detail: 'lost to deploy anxiety, war rooms, and slow release cycles in high-growth engineering teams.',
                  },
                  {
                    stat: '12–25 min',
                    label: 'mean time to rollback',
                    detail: 'when a human has to notice, decide, and execute. That\'s the entire impact window for your users.',
                  },
                  {
                    stat: '1–2 features',
                    label: 'per week, per team',
                    detail: 'held back by deploy fear in organizations without automated progressive delivery. Compounding over quarters.',
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
                Progressive delivery is the structural answer. Not canary as a manual step you add
                to your runbook, but as the default deploy mode, with SLO-gated promotion,
                automatic traffic reversion, and risk scoring wired in before anything ships. When
                the safety net is automatic, the fear disappears. Deploys become a non-event. Friday
                becomes like any other day.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The transformation
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug">
              Before and after DeployTitan.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-reveal>
            {/* Before */}
            <Card padding="none" className="p-8">
              <p className="text-[11px] font-mono tracking-widest uppercase text-red-400/70 mb-5">
                Without DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {BEFORE.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="mt-1 shrink-0 w-4 h-4 flex items-center justify-center border border-red-300/30 text-red-400/60 text-[10px] font-mono">
                      ✗
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
            {/* After */}
            <div className="sharp-card border border-primary/25 p-8 bg-primary/[0.02]">
              <p className="text-[11px] font-mono tracking-widest uppercase text-primary mb-5">
                With DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {AFTER.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="mt-1 shrink-0 w-4 h-4 flex items-center justify-center border border-primary/30 text-primary text-[10px] font-mono">
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
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How it works
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug">
              Four phases, one workflow.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHASES.map((phase, i) => (
              <Card
                key={phase.number}
                padding="none"
                className="p-8 hover:border-primary/20 transition-all duration-200"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-3xl font-bold text-ink/15 leading-none select-none">
                    {phase.number}
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{phase.metric.value}</p>
                    <p className="text-[10px] text-ink-tertiary font-mono uppercase tracking-wider">
                      {phase.metric.label}
                    </p>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-ink mb-2 leading-snug">
                  {phase.title}
                </h3>
                <p className="text-base text-ink-secondary leading-relaxed">{phase.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Code snippet */}
      <section className="py-14 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              One command
            </p>
            <h2 className="text-2xl font-semibold text-ink leading-snug mb-2">
              Canary to production in a single CLI call.
            </h2>
            <p className="text-sm text-ink-secondary">
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
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The status quo
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug mb-2">
              What teams are doing today, and why it breaks.
            </h2>
            <p className="text-ink-secondary text-sm max-w-xl">
              Most teams cobble together Argo Rollouts, feature flags, and manual dashboards. It
              works until it doesn't.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tool: 'Argo Rollouts + kubectl',
                workaround: 'Engineers manually watch Grafana during every canary step. One person owns the laptop, everyone waits.',
                failure: 'Traffic shift never reverts automatically. Rollback = kubectl rollout undo at 2am.',
              },
              {
                tool: 'LaunchDarkly feature flags',
                workaround: 'Wrap risky code in flags, manually toggle off when things go wrong. Flags accumulate, tech debt grows.',
                failure: 'No SLO awareness. Flags don\'t know about error rates; a human has to notice and react.',
              },
              {
                tool: 'Runbooks + Slack war rooms',
                workaround: 'Friday deploy requires a dedicated #deploy-watchroom channel and a senior engineer on standby for 2 hours.',
                failure: 'Human latency. Mean-time-to-notice is 8–15 minutes. By then, 100% of users have hit the bug.',
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
                  <p className="text-sm text-ink-tertiary leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-20 border-b border-line bg-surface-alt/20">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How we compare
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug mb-2">
              Rollout + Foresight vs. Argo + Spinnaker.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 pr-6 text-xs font-mono uppercase tracking-wider text-ink-tertiary w-1/4">
                    Capability
                  </th>
                  <th className="py-3 px-4 text-xs font-mono uppercase tracking-wider text-primary bg-primary/[0.04] border-x border-primary/10">
                    DeployTitan
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    DIY (Argo + scripts)
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
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
                  <tr key={String(cap)} className="border-b border-line/50">
                    <td className="py-3 pr-6 text-xs text-ink-secondary">{cap}</td>
                    <td className="py-3 px-4 text-center text-xs text-signal-success font-mono bg-primary/[0.03] border-x border-primary/8">{dt}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{diy}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{spinnaker}</td>
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug mb-4">
              See it running on your stack in 20 minutes.
            </h2>
            <p className="text-ink-secondary text-sm mb-8 max-w-lg mx-auto">
              We'll walk through a live canary deploy on your services, show you the risk score on a
              real PR, and configure auto-rollback against your SLOs.
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

      <SolutionNav currentRoute="/solutions/progressive-delivery" />
    </>
  )
}
