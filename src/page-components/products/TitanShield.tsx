'use client'

import { APP_URL } from '@/lib/env'
import { Resilience } from '../../components/Resilience'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'

const POLICY_CODE = `# titan-shield.hcl
failover "global-api" {
  primary   = "aws-us-east-1"
  secondary = ["aws-eu-west-1", "gcp-us-central1"]

  health_check {
    path      = "/healthz"
    interval  = "10s"
    threshold = 3
  }

  routing = "latency"
}`

const CLI_CODE = `# Real-time cross-region health
dt shield status --service global-api

# Trigger a DR drill
dt shield failover \\
  --service global-api \\
  --from aws-us-east-1 \\
  --to aws-eu-west-1

# Failback when primary recovers
dt shield failback --service global-api --auto`

const CROSS_LINKS = [
  {
    label: 'Titan Rollout',
    desc: 'Progressive deployments, SLO-gated',
    href: '/products/titan-rollout',
  },
  {
    label: 'Titan Phoenix',
    desc: 'Undo a bad release in seconds',
    href: '/products/titan-phoenix',
  },
  {
    label: 'Titan Foresight',
    desc: 'Score every change before it ships',
    href: '/products/titan-foresight',
  },
]

export default function TitanShield() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4" data-reveal data-reveal-delay="1">
            Titan Shield
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6" data-reveal data-reveal-delay="2">
            Multi-cloud resilience.
            <br className="hidden md:block" /> Failover in milliseconds.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8" data-reveal data-reveal-delay="3">
            Titan Shield watches every region continuously and shifts traffic before your on-call
            wakes up. Declare your failover policy once: never touch it again.
          </p>
          <div className="flex flex-wrap gap-4" data-reveal data-reveal-delay="4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-primary  text-ink text-sm font-semibold dark:text-surface px-5 py-2.5 hover:bg-primary-light transition-colors"
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

      {/* Capabilities */}
      <Resilience />

      {/* Quickstart */}
      <section className="py-24 border-t border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Quickstart
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Define your failover policy in minutes.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              One HCL file. Automatic health checks. Sub-second failover across every cloud you run
              on.
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
                  Manage failover
                </p>
                <CodeBlock code={CLI_CODE} lang="bash" filename="terminal" />
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Policy-as-code
              </p>
              <CodeBlock code={POLICY_CODE} lang="hcl" filename="titan-shield.hcl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-links */}
      <section className="py-16 border-t border-line">
        <Container width="6xl" padding="default">
          <p
            className="text-xs font-mono tracking-widest uppercase text-ink-tertiary mb-6"
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
