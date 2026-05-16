'use client'

import { APP_URL, CREATE_ACCOUNT_URL } from '@/lib/env'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const RELEASE_CODE = `# Create a coordinated release across services
dt release create \\
  --name "checkout-v3.2" \\
  --services "payments,cart,order-api" \\
  --env production

# Check status across all services
dt release status checkout-v3.2

# Promote to the next stage when ready
dt release promote checkout-v3.2 --stage production`

const POLICY_CODE = `# release-policy.hcl
release "checkout-v3.2" {
  services = ["payments", "cart", "order-api"]

  gate "pre-deploy" {
    require = ["staging-green", "smoke-tests-pass"]
  }

  rollback {
    trigger = "error_rate > 1% OR p99_latency > 500ms"
    owner   = "@platform-oncall"
  }
}`

const PRIMARY_CAPABILITIES = [
  {
    title: 'Dependency-aware release sequencing',
    desc: 'Define which services must deploy before others. Titan Rollouts enforces the sequence, waits for health gates between stages, and surfaces any blocked step to the owning team.',
  },
  {
    title: 'Release gates and owner accountability',
    desc: 'Each stage gate requires explicit sign-off or automated health checks. Rollouts tracks who approved, when, and what signal cleared the gate, so every release has a complete audit trail.',
  },
]

const SUPPORTING_CAPABILITIES = [
  {
    title: 'Multi-service release graph',
    desc: 'Model a release as a DAG of services and stages. Rollouts resolves the order, parallelizes where safe, and holds where dependencies are not yet satisfied.',
  },
  {
    title: 'Coordinated rollback',
    desc: 'When a gate fires, Rollouts initiates rollback in reverse dependency order: no service rolls back before the services that depend on it are safe.',
  },
  {
    title: 'Slack and PagerDuty integration',
    desc: 'Gate approvals, stage promotions, and rollback triggers surface in the channels your team already uses. No context switching.',
  },
  {
    title: 'Release history and audit log',
    desc: 'Every gate, approval, promotion, and rollback is recorded. Incident postmortems have the full timeline without manual reconstruction.',
  },
]

const CROSS_LINKS = [
  {
    label: 'Release Coordination',
    desc: 'Orchestrate multi-service releases end to end',
    href: '/solutions/release-coordination',
  },
  {
    label: 'Instant Rollback',
    desc: 'Safe, sequenced rollback across services',
    href: '/solutions/instant-rollback',
  },
  {
    label: 'Risk Intelligence',
    desc: 'Visibility into every release in flight',
    href: '/solutions/risk-intelligence',
  },
]

export default function TitanRollout() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Rollouts"
        heading={<>Release coordination<br className="hidden md:block" /> for distributed teams.</>}
        description={<>Orchestrate multi-service releases with dependency sequencing, owner-gated stages, and coordinated rollback, all from a single{' '}<code className="font-mono text-sm text-ink/80 bg-ink/[0.05] px-1.5 py-0.5">dt release</code>{' '}command.</>}
        ctas={[
          { label: 'Create account', href: CREATE_ACCOUNT_URL, target: '_blank', rel: 'noopener noreferrer' },
          { label: 'See use cases', href: '/solutions/release-coordination', variant: 'secondary' },
        ]}
      />

      {/* Wedge framing */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-4">
            Why Titan Rollouts
          </p>
          <p className="text-2xl font-medium text-ink leading-snug mb-4">
            Coordination is not a spreadsheet problem.
          </p>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Most teams coordinate releases over Slack threads, shared docs, and manual handoffs.
            Titan Rollouts replaces that with a structured release graph: services declare their
            dependencies, stages require explicit gates, and every promotion or rollback is
            sequenced automatically.
          </p>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Capabilities
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              From release creation to safe completion.
            </h2>
            <p className="text-ink-secondary max-w-2xl leading-relaxed">
              Titan Rollouts models a release as a dependency graph of services and stages. It
              enforces the sequence, surfaces blocked steps to the right owners, and coordinates
              rollback when something goes wrong.
            </p>
          </div>

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
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Quickstart
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              A release in three commands.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Install the CLI, create a release, and Titan Rollouts sequences the rest according to
              your dependency graph and gate policy.
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
                  Release
                </p>
                <CodeBlock code={RELEASE_CODE} lang="bash" filename="terminal" />
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Policy-as-code (optional)
              </p>
              <CodeBlock code={POLICY_CODE} lang="hcl" filename="release-policy.hcl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="py-20 border-t border-line">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Integrations
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Works with your existing stack.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Titan Rollouts plugs into the tools your team already runs: no forklift migration.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal>
            {[
              { category: 'CI / CD', tools: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Buildkite'] },
              { category: 'Observability', tools: ['Datadog', 'Prometheus', 'Grafana', 'New Relic'] },
              { category: 'Notifications', tools: ['Slack', 'PagerDuty', 'Opsgenie', 'Webhooks'] },
              { category: 'Infrastructure', tools: ['Kubernetes', 'AWS ECS', 'Terraform', 'Helm'] },
            ].map((group) => (
              <Card key={group.category} padding="none" className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary-accessible mb-3">
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
          <div className="mt-8 flex items-center gap-6" data-reveal>
            <a
              href="/solutions/release-coordination"
              className="text-sm font-medium text-primary-accessible hover:text-primary transition-colors"
            >
              See release coordination use cases →
            </a>
            <a
              href={CREATE_ACCOUNT_URL}
              className="text-sm text-ink-tertiary hover:text-ink-secondary transition-colors"
            >
              Create account
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
            Explore solutions
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
