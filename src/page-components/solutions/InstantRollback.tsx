'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'

const PHASES = [
  {
    number: '01',
    title: 'SLO breach detected — automatically',
    body: 'Phoenix continuously watches the SLO metrics you define. The moment a measurement window closes over your threshold, Phoenix triggers — no alert, no Slack message, no human in the loop.',
    metric: { value: '< 30s', label: 'median time to rollback decision' },
  },
  {
    number: '02',
    title: 'Blast radius scoped to the failing slice',
    body: "Phoenix doesn't roll back your whole service. It identifies exactly which cohort, region, or feature-flag state is failing — and reverts only that. Every other user keeps running the new version.",
    metric: { value: 'Scoped', label: 'only the failing slice reverted' },
  },
  {
    number: '03',
    title: 'Traffic restored in under 10 seconds',
    body: 'Once the scope is determined, Phoenix reverses the traffic shift. No redeploy, no pipeline run, no manual approval. The release is preserved — only its routing is changed.',
    metric: { value: '< 10s', label: 'median traffic restoration time' },
  },
  {
    number: '04',
    title: 'Incident packet generated automatically',
    body: 'Every Phoenix action produces a structured incident packet: what SLO breached, which cohort was affected, how long the impact lasted, and what was reverted. Feeds directly into Titan Insight.',
    metric: { value: 'Zero', label: 'manual approvals required in auto mode' },
  },
]

const BEFORE = [
  'On-call woken up to decide whether to roll back',
  'Full service rollback — even unaffected users impacted',
  'Rollback = redeploy last tag and watch dashboards for 20 minutes',
  'Incident timeline reconstructed manually from logs',
]

const AFTER = [
  'Phoenix detects and responds before on-call even wakes up',
  'Scoped rollback — only the failing cohort reverted',
  'Traffic restored in under 10 seconds, no redeploy needed',
  'Structured incident packet generated automatically on every action',
]

const POLICY_SNIPPET = `# titan.yaml — phoenix rollback policy
rollback:
  triggers:
    - slo: api-error-rate
      threshold: 0.5%
      window: 2m
  scope: cohort          # only the affected cohort, not the whole service
  mode: auto             # no human required
  dry_run: false         # set true to simulate without acting
  post_rollback:
    notify: [slack, pagerduty]
    packet: true         # generate incident packet for Titan Insight`

export default function SolutionInstantRollback() {
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
            <span className="w-1.5 h-1.5 rounded-full bg-signal-success" />
            Powered by Titan Phoenix
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Your on-call is the
            <br className="hidden md:block" /> last line of defense.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            A bad deploy fires PagerDuty. Someone wakes up. They read through Grafana, confirm the
            problem is real, find the right kubectl command, and watch dashboards for another 20
            minutes to verify recovery. By then, thousands of users have already hit the bug.
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
                "3:14 AM. PagerDuty fires. The senior engineer on call squints at Grafana,
                confirms it's real, and starts looking for the rollback runbook."
              </blockquote>
              <p className="text-ink-secondary leading-relaxed">
                By the time they've identified the bad deploy, found the right command, executed it,
                and confirmed recovery — 22 minutes have passed. Error rates were elevated for every
                one of those minutes. Every user who hit checkout during that window got an error.
                The post-mortem will call this a "fast response." It wasn't fast enough.
              </p>
            </div>

            {/* The villain */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-red-400/80 mb-4">
                The real problem
              </p>
              <p className="text-ink leading-relaxed text-base">
                The rollback tools already exist. <code className="font-mono text-sm text-ink/80 bg-ink/[0.05] px-1 py-0.5">kubectl rollout undo</code> works.
                The problem is the pipeline from "error rate spikes" to "rollback complete" runs
                entirely through a human being — who has to be awake, alert, and in front of a
                laptop to execute it. That pipeline has a minimum latency of 10–15 minutes on a
                good night. On a bad night, it's 45.
              </p>
              <p className="text-ink-secondary leading-relaxed text-base mt-4">
                There's a second, quieter problem: most rollbacks are too broad. Rolling back the
                entire service when only 3% of users — in one region, on one feature flag — are
                affected is a blunt instrument. You're degrading the 97% to protect the 3%. And
                you still have to redeploy when you're ready to try again.
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
                    stat: '12–25 min',
                    label: 'mean time to rollback',
                    detail: 'Median time from PagerDuty alert to traffic fully restored, when a human executes the rollback manually.',
                  },
                  {
                    stat: '~$5,400',
                    label: 'per minute of downtime',
                    detail: 'Median cost of unplanned downtime for a mid-size B2B SaaS. A 20-minute incident is a $108k event.',
                  },
                  {
                    stat: '2–4×',
                    label: 'faster burnout',
                    detail: 'Engineers on high-rotation on-call with manual rollback processes burn out significantly faster than those on automated systems.',
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
                The rollback decision needs to happen before the human wakes up. That means a
                system continuously watching your SLO metrics — not alerts, which are already late
                — and triggering a scoped reversion the moment a measurement window closes over
                your threshold. No runbook. No approval. No redeploy. Just traffic back where it
                was, in under 10 seconds, with an automatic incident packet generated for the
                post-mortem.
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Before and after instant rollback.
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Four steps. Under 10 seconds.
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
                  <span className="font-mono text-3xl font-bold text-ink/8 leading-none select-none">
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
                <p className="text-sm text-ink-secondary leading-relaxed">{phase.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Policy config */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Configuration
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Define your rollback policy once.
            </h2>
            <p className="text-sm text-ink-secondary">
              A single stanza in your{' '}
              <code className="font-mono text-primary text-xs">titan.yaml</code> is all Phoenix
              needs. No runbooks, no on-call scripts.
            </p>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-danger/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-warning/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-success/40" />
              <span className="font-mono text-[10px] text-ink-quaternary ml-2">titan.yaml</span>
            </div>
            <pre className="p-5 font-mono text-xs text-ink-secondary leading-relaxed overflow-x-auto">
              {POLICY_SNIPPET}
            </pre>
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
              How teams handle rollbacks today — and the cost.
            </h2>
            <p className="text-ink-secondary text-sm max-w-xl">
              The manual rollback playbook has three failure modes: too slow, too broad, and too
              dependent on a human being awake.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tool: 'kubectl rollout undo',
                workaround: 'SRE wakes up, confirms the issue is real, runs kubectl rollout undo, watches dashboards for 20 minutes to verify recovery.',
                failure: 'Mean time from deploy to rollback decision: 12–25 minutes. That\'s 12–25 minutes of every user hitting the bug.',
              },
              {
                tool: 'Redeploy last good tag',
                workaround: 'Trigger a new pipeline run for the previous image tag. Wait for CI, wait for deploy, watch for health checks.',
                failure: 'A full redeploy takes 6–15 minutes. You\'re also burning CI minutes and potentially racing against another deploy.',
              },
              {
                tool: 'Feature flag kill switch',
                workaround: 'Toggle a LaunchDarkly flag to disable the bad feature. Requires the engineer who wrote the flag to be available.',
                failure: 'Flags don\'t roll back infrastructure changes, DB migrations, or cross-service API changes. Half of rollbacks need more than a flag.',
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
                    Manual runbook
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    Feature flags only
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Automatic rollback (no human needed)', '✓', '✗', '✗'],
                  ['Scoped to failing cohort only', '✓', '✗ (full service)', '✗'],
                  ['Traffic restored in < 10s', '✓', '✗ (6–25 min)', '~ (flag toggle only)'],
                  ['SLO-aware trigger', '✓', '✗ (alert-based)', '✗'],
                  ['Structured incident packet', '✓', '✗ (manual postmortem)', '✗'],
                ].map(([cap, dt, manual, flags]) => (
                  <tr key={String(cap)} className="border-b border-line/50">
                    <td className="py-3 pr-6 text-xs text-ink-secondary">{cap}</td>
                    <td className="py-3 px-4 text-center text-xs text-signal-success font-mono">{dt}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{manual}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{flags}</td>
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
              See Phoenix roll back a live canary in under 10 seconds.
            </h2>
            <p className="text-ink-secondary text-sm mb-8 max-w-lg mx-auto">
              We'll trigger a real SLO breach in a sandbox environment and show you exactly what
              Phoenix does — automatically, before you'd even finish reading the alert.
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
