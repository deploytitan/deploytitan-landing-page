'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { CodeBlock, InlineCode } from '../../components/shared/CodeBlock'
import { SolutionNav } from '../../components/shared/SolutionNav'
import { SolutionPageHero } from '../../components/shared/SolutionPageHero'

const PHASES = [
  {
    number: '01',
    title: 'SLO breach detected, automatically',
    body: 'Phoenix continuously watches the SLO metrics you define. The moment a measurement window closes over your threshold, Phoenix triggers: no alert, no Slack message, no human in the loop.',
    metric: { value: '< 30s', label: 'median time to rollback decision' },
  },
  {
    number: '02',
    title: 'Blast radius scoped to the failing slice',
    body: "Phoenix doesn't roll back your whole service. It identifies exactly which cohort, region, or feature-flag state is failing, and reverts only that. Every other user keeps running the new version.",
    metric: { value: 'Scoped', label: 'only the failing slice reverted' },
  },
  {
    number: '03',
    title: 'Traffic restored in under 10 seconds',
    body: 'Once the scope is determined, Phoenix reverses the traffic shift. No redeploy, no pipeline run, no manual approval. The release is preserved: only its routing is changed.',
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
  'Full service rollback: even unaffected users impacted',
  'Rollback = redeploy last tag and watch dashboards for 20 minutes',
  'Incident timeline reconstructed manually from logs',
]

const AFTER = [
  'Phoenix detects and responds before on-call even wakes up',
  'Scoped rollback: only the failing cohort reverted',
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
      <SolutionPageHero
        poweredBy="Powered by Titan Phoenix"
        heading={<>Your on-call is the<br className="hidden md:block" /> last line of defense.</>}
        description="A bad deploy fires PagerDuty. Someone wakes up. They read through Grafana, confirm the problem is real, find the right kubectl command, and watch dashboards for another 20 minutes to verify recovery. By then, thousands of users have already hit the bug."
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
                "3:14 AM. PagerDuty fires. The senior engineer on call squints at Grafana, confirms
                it's real, and starts looking for the rollback runbook."
              </blockquote>
              <p className="text-ink-secondary leading-relaxed">
                By the time they've identified the bad deploy, found the right command, executed it,
                and confirmed recovery, 22 minutes have passed. Error rates were elevated for every
                one of those minutes. Every user who hit checkout during that window got an error.
                The post-mortem will call this a "fast response." It wasn't fast enough.
              </p>
            </div>

            {/* The villain */}
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-red-400/80 uppercase">
                The real problem
              </p>
              <p className="text-ink text-base leading-relaxed">
                The rollback tools already exist. <InlineCode>kubectl rollout undo</InlineCode>{' '}
                works. The problem is the pipeline from "error rate spikes" to "rollback complete"
                runs entirely through a human being, who has to be awake, alert, and in front of a
                laptop to execute it. That pipeline has a minimum latency of 10–15 minutes on a good
                night. On a bad night, it's 45.
              </p>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed">
                There's a second, quieter problem: most rollbacks are too broad. Rolling back the
                entire service when only 3% of users (in one region, on one feature flag) are
                affected is a blunt instrument. You're degrading the 97% to protect the 3%. And you
                still have to redeploy when you're ready to try again.
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
                    stat: '12–25 min',
                    label: 'mean time to rollback',
                    detail:
                      'Median time from PagerDuty alert to traffic fully restored, when a human executes the rollback manually.',
                  },
                  {
                    stat: '~$5,400',
                    label: 'per minute of downtime',
                    detail:
                      'Median cost of unplanned downtime for a mid-size B2B SaaS. A 20-minute incident is a $108k event.',
                  },
                  {
                    stat: '2–4×',
                    label: 'faster burnout',
                    detail:
                      'Engineers on high-rotation on-call with manual rollback processes burn out significantly faster than those on automated systems.',
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
                The rollback decision needs to happen before the human wakes up. That means a system
                continuously watching your SLO metrics (not alerts, which are already late) and
                triggering a scoped reversion the moment a measurement window closes over your
                threshold. No runbook. No approval. No redeploy. Just traffic back where it was, in
                under 10 seconds, with an automatic incident packet generated for the post-mortem.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Policy config — shown early so engineers can evaluate the mechanism before the walkthrough */}
      <section className="border-line bg-surface-alt/30 border-b py-14">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              Configuration
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold">
              Define your rollback policy once.
            </h2>
            <p className="text-ink-secondary text-sm">
              A single stanza in your <InlineCode variant="accent">titan.yaml</InlineCode> is all
              Phoenix needs. No runbooks, no on-call scripts.
            </p>
          </div>
          <div data-reveal>
            <CodeBlock
              variant="terminal"
              filename="titan.yaml"
              lang="yaml"
              code={POLICY_SNIPPET}
              copy={false}
            />
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              The transformation
            </p>
            <h2 className="text-ink text-2xl leading-snug font-semibold lg:text-3xl">
              Before and after Phoenix rollback.
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
              <p className="text-primary-accessible mb-5 font-mono text-[11px] tracking-widest uppercase">
                With DeployTitan
              </p>
              <ul className="flex flex-col gap-4">
                {AFTER.map((a) => (
                  <li key={a} className="text-ink-secondary flex items-start gap-3 text-sm">
                    <span className="border-primary/30 text-primary-accessible dark:text-primary mt-1 flex h-4 w-4 shrink-0 items-center justify-center border font-mono text-[10px]">
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

      {/* How it works — vertical urgency timeline */}
      <section className="border-line border-b py-24">
        <Container width="4xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              How it works
            </p>
            <h2 className="text-ink text-2xl leading-snug font-semibold lg:text-3xl">
              Four steps. Under 10 seconds.
            </h2>
          </div>
          <div className="relative flex flex-col gap-0" data-reveal>
            {/* Vertical connector line */}
            <div className="bg-line absolute top-8 bottom-8 left-[19px] w-px" aria-hidden="true" />
            {PHASES.map((phase, i) => (
              <div key={phase.number} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Step dot */}
                <div className="flex shrink-0 flex-col items-center" style={{ width: '40px' }}>
                  <div
                    className="bg-surface border-line text-primary-accessible dark:text-primary z-10 flex h-10 w-10 items-center justify-center border font-mono text-[11px] font-semibold"
                    style={{ borderRadius: '2px' }}
                  >
                    {phase.number}
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pt-1 pb-2">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-ink text-base leading-snug font-semibold">{phase.title}</h3>
                    <div className="shrink-0 text-right">
                      <p className="text-primary-accessible text-xl leading-none font-bold">
                        {phase.metric.value}
                      </p>
                      <p className="text-ink-tertiary mt-0.5 font-mono text-[9px] tracking-wider uppercase">
                        {phase.metric.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-ink-secondary text-base leading-relaxed">{phase.body}</p>
                </div>
              </div>
            ))}
          </div>
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
              How teams handle rollbacks today, and the cost.
            </h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              The manual rollback playbook has three failure modes: too slow, too broad, and too
              dependent on a human being awake.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                tool: 'kubectl rollout undo',
                workaround:
                  'SRE wakes up, confirms the issue is real, runs kubectl rollout undo, watches dashboards for 20 minutes to verify recovery.',
                failure:
                  "Mean time from deploy to rollback decision: 12–25 minutes. That's 12–25 minutes of every user hitting the bug.",
              },
              {
                tool: 'Redeploy last good tag',
                workaround:
                  'Trigger a new pipeline run for the previous image tag. Wait for CI, wait for deploy, watch for health checks.',
                failure:
                  "A full redeploy takes 6–15 minutes. You're also burning CI minutes and potentially racing against another deploy.",
              },
              {
                tool: 'Feature flag kill switch',
                workaround:
                  'Toggle a LaunchDarkly flag to disable the bad feature. Requires the engineer who wrote the flag to be available.',
                failure:
                  "Flags don't roll back infrastructure changes, DB migrations, or cross-service API changes. Half of rollbacks need more than a flag.",
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
              DeployTitan vs. the alternatives.
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
                    Manual runbook
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
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
                  <tr key={String(cap)} className="border-line/50 border-b">
                    <td className="text-ink-secondary py-3 pr-6 text-xs">{cap}</td>
                    <td className="text-signal-success-text dark:text-signal-success px-4 py-3 text-center font-mono text-xs">
                      {dt}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {manual}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {flags}
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
              See Phoenix roll back a live canary in under 10 seconds.
            </h2>
            <p className="text-ink-secondary mx-auto mb-8 max-w-lg text-sm">
              We'll trigger a real SLO breach in a sandbox environment and show you exactly what
              Phoenix does, automatically, before you'd even finish reading the alert.
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

      <SolutionNav currentRoute="/solutions/instant-rollback" />
    </>
  )
}
