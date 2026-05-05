'use client'

import { APP_URL } from '@/lib/env'
import { Solution } from '../../components/Solution'
import { BeforeAfter } from '../../components/BeforeAfter'
import { MidCTA } from '../../components/MidCTA'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'


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

const CROSS_LINKS = [
  { label: 'Titan Shield', desc: 'Your users stay up when a region doesn\'t', href: '/products/titan-shield' },
  { label: 'Titan Foresight', desc: 'Score every change before it ships', href: '/products/titan-foresight' },
  { label: 'Titan Phoenix', desc: 'Undo a bad release in seconds', href: '/products/titan-phoenix' },
]

export default function TitanRollout() {  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Titan Rollout
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            Progressive deployments.
            <br className="hidden md:block" /> Zero-drama releases.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Shift traffic gradually, gate on real signals, and roll back in seconds — all from a
            single{' '}
            <code className="font-mono text-sm text-ink/80 bg-ink/[0.05] px-1.5 py-0.5">
              dt deploy
            </code>{' '}
            command.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-primary text-ink text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors"
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

      {/* Key capabilities — reuse existing Solution component */}
      <Solution />

      {/* Before / After */}
      <BeforeAfter />

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
            {CROSS_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="sharp-card border border-line p-5 flex flex-col gap-1.5 hover:border-primary/30 hover:bg-surface-alt/50 transition-colors"
                data-reveal
              >
                <span className="text-sm font-semibold text-ink">{l.label}</span>
                <span className="text-xs text-ink-tertiary">{l.desc}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <MidCTA
        heading="Ship your next release with Titan Rollout."
        subheading="14-day free trial. No credit card. Full progressive rollout on day one."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Talk to an engineer"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
