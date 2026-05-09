'use client'

import { APP_URL } from '@/lib/env'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'

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

const CAPABILITIES = [
  {
    title: 'PR risk score',
    desc: 'Every pull request gets a single, explained score — computed from your live dependency graph, change size, and historical failure patterns for this service.',
  },
  {
    title: 'Blast-radius graph',
    desc: 'Visualise exactly which downstream services are at risk before the branch merges. Ownership attributed automatically from CODEOWNERS and team mappings.',
  },
  {
    title: 'Ownership-aware attribution',
    desc: 'Risk is broken down by the teams who own the affected services — so the right people are looped in before a risky change ships, not after.',
  },
  {
    title: 'Risk-based rollout policy',
    desc: 'High-risk changes automatically get tighter Rollout policies: smaller initial cohorts, shorter promotion windows, mandatory SLO gates.',
  },
  {
    title: 'Inline PR surface',
    desc: 'Risk score, blast-radius summary, and recommended rollout policy posted as a PR check — no dashboard to open, no tool-switching required.',
  },
  {
    title: 'Slack & webhook delivery',
    desc: 'Risk assessments delivered where your team already works. Configurable thresholds for when to notify, when to block, and when to auto-approve.',
  },
]

const CROSS_LINKS = [
  {
    label: 'Titan Rollout',
    desc: 'Move traffic to a new version, safely',
    href: '/products/titan-rollout',
  },
  {
    label: 'Titan Phoenix',
    desc: 'Undo a bad release in seconds',
    href: '/products/titan-phoenix',
  },
  { label: 'Solutions', desc: 'See all use cases', href: '/solutions' },
]

export default function TitanForesight() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Titan Foresight · Detect
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            Score every change
            <br className="hidden md:block" /> before it ships.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Foresight reads each PR against your live dependency graph and produces one explained
            risk score. Risky changes get tighter rollout policies, automatically.
          </p>
          <div className="flex flex-wrap gap-4">
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

      {/* What Foresight owns */}
      <section className="py-16 border-b border-line bg-surface-alt/20">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            What Foresight owns
          </p>
          <h2 className="text-xl font-semibold text-ink mb-3">
            Foresight owns what we know before we ship.
          </h2>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Pre-merge. Pre-deploy. Before any traffic moves. Foresight is the judgment layer —
            turning a code change into a risk assessment that shapes how the version ships.
          </p>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Capabilities
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-3">
              From change to verdict in seconds.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              No manual risk reviews. No tribal knowledge. One score, explained — for every change.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((c) => (
              <Card key={c.title} className="flex flex-col gap-3" data-reveal>
                <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                <p className="text-xs text-ink-tertiary leading-relaxed">{c.desc}</p>
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
              Risk scoring in your CI pipeline in 5 minutes.
            </h2>
            <p className="text-ink-secondary max-w-xl">
              Add one GitHub Actions step. Get risk scores, blast-radius maps, and ownership
              attribution on every PR — automatically.
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
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
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
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-3">
                  {group.category}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.tools.map((t) => (
                    <li key={t} className="text-xs text-ink-secondary flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-6" data-reveal>
            <a
              href="/docs/titan-foresight"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Read the docs →
            </a>
            <a
              href="/docs/titan-foresight/integrations"
              className="text-sm text-ink-tertiary hover:text-ink-secondary transition-colors"
            >
              See all integrations
            </a>
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

      
    </>
  )
}
