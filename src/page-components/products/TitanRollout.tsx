'use client'

import { APP_URL } from '@/lib/env'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

const DEPLOY_CODE = `# Deploy with a canary strategy
dt deploy \\
  --service my-api \\
  --image registry/my-api:v2.4.1 \\
  --strategy canary \\
  --initial-weight 5 \\
  --pause-on "error_rate > 0.5%"

# Foresight scores the change before traffic shifts.
# Cohort expands automatically as health gates pass.
# Rollout pauses — Phoenix acts if a threshold is breached.`

const POLICY_CODE = `# titan-rollout.hcl
rollout "my-api" {
  strategy       = "canary"
  initial_weight = 5
  increment      = 10
  interval       = "2m"

  pause {
    trigger = "error_rate > 0.5% OR p99_latency > 200ms"
  }
}`

// Primary: the 2 most differentiating Rollout capabilities
const PRIMARY_CAPABILITIES = [
  {
    title: 'Traffic splitting with real-signal gates',
    desc: 'Shift a configurable percentage of traffic to the new version. Rollout expands automatically as health gates pass and pauses the moment a signal breaches its threshold, before users notice.',
  },
  {
    title: 'Strategy flexibility: canary, blue-green, ring',
    desc: 'One CLI command, three strategies. Canary for gradual expansion, blue-green for instant cutover with a clean fallback, ring for staged rollout by team, region, or customer tier.',
  },
]

// Supporting: 4 tighter items
const SUPPORTING_CAPABILITIES = [
  {
    title: 'Health gates as code',
    desc: 'Define pause triggers in HCL alongside your deploy config. Error rate, p99 latency, custom metrics: any signal Rollout can observe can become a gate.',
  },
  {
    title: 'Automatic cohort promotion',
    desc: 'Rollout advances the traffic weight on a configurable interval as long as health gates hold. No manual promotion step; no human in the loop unless a gate fires.',
  },
  {
    title: 'Foresight integration',
    desc: 'Risky PRs automatically get tighter initial cohorts and shorter promotion windows. Foresight sets the policy; Rollout enforces it.',
  },
  {
    title: 'Phoenix handoff on breach',
    desc: 'If a health gate fires during rollout, Rollout pauses and hands the incident to Phoenix for scoped rollback. The two products are designed to work as a unit.',
  },
]

const CROSS_LINKS = [
  {
    label: 'Titan Shield',
    desc: "Your users stay up when a region doesn't",
    href: '/products/titan-shield',
  },
  {
    label: 'Titan Foresight',
    desc: 'Score every change before it ships',
    href: '/products/titan-foresight',
  },
  {
    label: 'Titan Phoenix',
    desc: 'Undo a bad release in seconds',
    href: '/products/titan-phoenix',
  },
]

export default function TitanRollout() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4" data-reveal data-reveal-delay="1">
            Titan Rollout
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6" data-reveal data-reveal-delay="2">
            Progressive deployments.
            <br className="hidden md:block" /> Zero-drama releases.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8" data-reveal data-reveal-delay="3">
            Shift traffic gradually, gate on real signals, and roll back in seconds, all from a
            single{' '}
            <code className="font-mono text-sm text-ink/80 bg-ink/[0.05] px-1.5 py-0.5">
              dt deploy
            </code>{' '}
            command.
          </p>
          <div className="flex flex-wrap gap-4" data-reveal data-reveal-delay="4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-primary text-ink dark:text-surface text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
            </a>
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 border border-line text-ink-secondary text-sm px-5 py-2.5 hover:border-primary/40 hover:text-ink transition-colors"
              style={{ borderRadius: '2px' }}
            >
              See use cases
            </a>
          </div>
        </Container>
      </section>

      {/* Wedge framing */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            How Rollout is different
          </p>
          <p className="text-2xl font-medium text-ink leading-snug mb-4">
            A deploy command that knows when to stop.
          </p>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Most deployment tools move traffic and wait for a human to intervene. Rollout moves
            traffic, watches your SLOs, and pauses or hands off to Phoenix the moment a threshold
            breaks. The human stays in the loop only when it matters.
          </p>
        </Container>
      </section>

      {/* Capabilities — Rollout-specific, broken grid hierarchy */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Capabilities
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Traffic control with real guardrails.
            </h2>
            {/* Leadership brief */}
            <p className="text-ink-secondary max-w-2xl leading-relaxed">
              Rollout turns a single deploy command into a progressive, gated release. It shifts
              traffic in configurable increments, advances automatically when health gates hold, and
              hands off to Phoenix the moment they don't. Engineers ship more; on-call gets fewer
              pages.
            </p>
          </div>

          {/* Primary capabilities: 2 lead items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" data-reveal>
            {PRIMARY_CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="border border-line p-6 bg-surface-alt/30"
                style={{ borderRadius: '2px' }}
              >
                <h3 className="text-base font-semibold text-ink mb-2">{c.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Supporting capabilities: 4 tighter items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" data-reveal>
            {SUPPORTING_CAPABILITIES.map((c) => (
              <Card key={c.title} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                <p className="text-sm text-ink-tertiary leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Quickstart */}
      <section className="py-24 border-t border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Quickstart
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Up and running in one command.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Install the CLI, run{' '}
              <code className="font-mono text-sm text-ink/80 bg-ink/[0.05] px-1.5 py-0.5">
                dt deploy
              </code>
              , and your first progressive rollout starts automatically.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-reveal>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                  Install
                </p>
                <InstallTabs />
              </div>
              <div>
                <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                  Deploy
                </p>
                <CodeBlock code={DEPLOY_CODE} lang="bash" filename="terminal" />
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Policy-as-code (optional)
              </p>
              <CodeBlock code={POLICY_CODE} lang="hcl" filename="titan-rollout.hcl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Integrations matrix */}
      <section className="py-20 border-t border-line">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Integrations
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Works with your existing stack.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Titan Rollout plugs into the tools your team already runs: no forklift migration.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal>
            {[
              { category: 'CI / CD', tools: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Buildkite'] },
              { category: 'Observability', tools: ['Datadog', 'Prometheus', 'Grafana', 'New Relic'] },
              { category: 'Traffic', tools: ['Kubernetes Ingress', 'AWS ALB', 'Istio', 'Envoy'] },
              { category: 'Notifications', tools: ['Slack', 'PagerDuty', 'Opsgenie', 'Webhooks'] },
            ].map((group) => (
              <Card key={group.category} padding="none" className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-3">
                  {group.category}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.tools.map((t) => (
                    <li key={t} className="text-xs text-ink-secondary flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary/50 shrink-0" style={{ borderRadius: '1px' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          {/* Harden: replaced dead doc links with functional alternatives */}
          <div className="mt-8 flex items-center gap-6" data-reveal>
            <a
              href="#capabilities"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              See capabilities →
            </a>
            <a
              href={`${APP_URL}/signup`}
              className="text-sm text-ink-tertiary hover:text-ink-secondary transition-colors"
            >
              Start free trial
            </a>
          </div>
        </Container>
      </section>

      {/* Cross-links */}
      <section className="py-16 border-t border-line">
        <Container width="6xl" padding="default">
          <p
            className="text-xs font-mono tracking-widest uppercase text-ink-secondary mb-6 font-medium"
            data-reveal
          >
            Also in DeployTitan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CROSS_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="sharp-card border border-line p-5 flex flex-col gap-1.5 hover:border-primary/30 hover:bg-surface-alt/50 transition-colors"
                data-reveal
                data-reveal-delay={String(i + 1)}
              >
                <span className="text-sm font-semibold text-ink">{l.label}</span>
                <span className="text-xs text-ink-tertiary">{l.desc}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
