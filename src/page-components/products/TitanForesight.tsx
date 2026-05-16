'use client'

import { APP_URL } from '@/lib/env'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { ProductPageHero } from '../../components/shared/ProductPageHero'

const CI_SNIPPET = `# .github/workflows/deploy.yml
- name: Titan Foresight risk check
  uses: deploytitan/foresight-action@v2
  with:
    service: my-api
    token: \${{ secrets.DT_TOKEN }}
  # Blocks merge if risk score > configured threshold.
  # Reports blast radius, affected services, and ownership.`

const CLI_CODE = `# Score the risk of the current branch before shipping
dt foresight score --service my-api --ref HEAD

# Output:
#   Risk score   : 34 / 100  (medium)
#   Blast radius : 3 downstream services
#   Ownership    : platform-team (primary), payments (secondary)
#   Recommendation: tighten rollout policy to 5% initial cohort`

// Primary: the 2 most differentiating capabilities, shown at larger scale
const PRIMARY_CAPABILITIES = [
  {
    title: 'PR risk score',
    desc: 'Every pull request gets a single, explained score, computed from your live dependency graph, change size, and historical failure patterns for this service. One number. Enough context to act on it.',
  },
  {
    title: 'Blast-radius graph',
    desc: 'Visualise exactly which downstream services are at risk before the branch merges. Ownership attributed automatically from CODEOWNERS and team mappings, so the right people are looped in before anything ships.',
  },
]

// Supporting: 4 tighter items beneath
const SUPPORTING_CAPABILITIES = [
  {
    title: 'Ownership-aware attribution',
    desc: 'Risk broken down by the teams who own the affected services, so the right people are notified before a risky change ships, not after.',
  },
  {
    title: 'Risk-based rollout policy',
    desc: 'High-risk changes automatically get tighter Rollout policies: smaller initial cohorts, shorter promotion windows, mandatory SLO gates.',
  },
  {
    title: 'Inline PR surface',
    desc: 'Risk score, blast-radius summary, and recommended rollout policy posted as a PR check. No dashboard to open, no tool-switching required.',
  },
  {
    title: 'Slack & webhook delivery',
    desc: 'Risk assessments delivered where your team works. Configurable thresholds for when to notify, when to block, and when to auto-approve.',
  },
]

const CROSS_LINKS = [
  {
    label: 'Titan Rollouts',
    desc: 'Coordinate multi-service releases',
    href: '/products/titan-rollout',
  },
  {
    label: 'Release Intelligence',
    desc: 'Visibility into every release in flight',
    href: '/solutions/release-intelligence',
  },
  { label: 'Solutions', desc: 'See all use cases', href: '/solutions' },
]

export default function TitanForesight() {
  useScrollReveal()

  return (
    <>
      <ProductPageHero
        eyebrow="Titan Foresight · Rollouts Intelligence"
        badge="preview"
        heading={<>Score every change<br className="hidden md:block" /> before it ships.</>}
        description="Foresight reads each PR against your live dependency graph and produces one explained risk score. Risky changes get tighter rollout policies, automatically."
        ctas={[
          { label: 'Join the waitlist', href: '/pricing' },
          { label: 'See use cases', href: '/solutions/release-intelligence', variant: 'secondary' },
        ]}
      />

      {/* What Foresight owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-4">
            What Foresight owns
          </p>
          <p className="text-2xl font-medium text-ink leading-snug mb-4">
            Foresight owns what we know before we ship.
          </p>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Pre-merge. Pre-deploy. Before any traffic moves. Foresight is the judgment layer,
            turning a code change into a risk assessment that shapes how the version ships.
          </p>
        </Container>
      </section>

      {/* Capabilities — broken grid hierarchy */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Capabilities
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              From change to verdict in seconds.
            </h2>
            {/* Leadership brief */}
            <p className="text-ink-secondary max-w-2xl leading-relaxed">
              Foresight slots between code review and deploy, producing one risk score per PR with
              enough context to act on: blast radius, ownership map, and a recommended rollout
              policy. No manual risk reviews, no tribal knowledge required.
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
            <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
              Quickstart
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              Risk scoring in your CI pipeline in 5 minutes.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Add one GitHub Actions step. Get risk scores, blast-radius maps, and ownership
              attribution on every PR, automatically.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-reveal>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                  Install CLI
                </p>
                <InstallTabs />
              </div>
              <div>
                <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                  CLI risk check
                </p>
                <CodeBlock code={CLI_CODE} lang="bash" filename="terminal" />
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                GitHub Actions integration
              </p>
              <CodeBlock code={CI_SNIPPET} lang="yaml" filename=".github/workflows/deploy.yml" />
            </div>
          </div>
        </Container>
      </section>

      {/* Integrations matrix */}
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
              Foresight plugs into your source control, CI, and observability layer without changing
              how your team works.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal>
            {[
              { category: 'Source Control', tools: ['GitHub', 'GitLab', 'Bitbucket', 'Azure DevOps'] },
              { category: 'CI / CD', tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'] },
              { category: 'Observability', tools: ['Datadog', 'Prometheus', 'Grafana', 'Honeycomb'] },
              { category: 'Notifications', tools: ['Slack', 'GitHub PRs', 'PagerDuty', 'Webhooks'] },
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
          {/* Harden: replaced dead doc links with functional alternatives */}
          <div className="mt-8 flex items-center gap-6" data-reveal>
            <a
              href="#capabilities"
              className="text-sm font-medium text-primary-accessible hover:text-primary transition-colors"
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
