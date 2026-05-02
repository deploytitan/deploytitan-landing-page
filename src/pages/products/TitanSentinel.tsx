import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { ShiftLeft } from '../../components/ShiftLeft'
import { MidCTA } from '../../components/MidCTA'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { InstallTabs } from '../../components/shared/InstallTabs'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'

const APP_URL = (import.meta.env.VITE_APP_URL as string) || 'https://app.deploytitan.com'

const CI_SNIPPET = `# .github/workflows/deploy.yml
- name: Titan Sentinel risk check
  uses: deploytitan/sentinel-action@v2
  with:
    service: my-api
    token: \${{ secrets.DT_TOKEN }}
  # Fails the step if risk score > configured threshold.
  # Reports blast radius, affected services, and SLO impact.`

const CLI_CODE = `# Score the risk of the current branch before shipping
dt sentinel score --service my-api --ref HEAD

# Output:
#   Risk score : 34 / 100  (medium)
#   Blast radius: 3 downstream services
#   SLO impact  : api-gateway (99.9% → 99.7% projected)
#   Recommendation: proceed with canary, not blue-green`

const CROSS_LINKS = [
  { label: 'Titan Rollout', desc: 'Progressive deployments', href: '/products/titan-rollout' },
  { label: 'Titan Shield', desc: 'Multi-cloud failover', href: '/products/titan-shield' },
  { label: 'Solutions', desc: 'See all use cases', href: '/solutions' },
]

export default function TitanSentinel() {
  useDocumentMeta(
    'Titan Sentinel — Pre-Deploy Risk Scoring | DeployTitan',
    'Shift-left risk scoring, blast-radius analysis, and SLO guardrails — before a single byte of traffic shifts. Know your risk before you ship.',
  )
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Titan Sentinel
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            Know your risk
            <br className="hidden md:block" /> before you ship.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Titan Sentinel scores every release against your live dependency graph, calculates blast
            radius, and enforces SLO guardrails — before traffic ever shifts.
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

      {/* Capabilities */}
      <ShiftLeft />

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
              Add one GitHub Actions step. Get risk scores, blast-radius maps, and SLO impact
              reports on every PR — automatically.
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

      {/* Cross-links */}
      <section className="py-16 border-t border-line">
        <div className="max-w-6xl mx-auto px-6">
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
        </div>
      </section>

      <MidCTA
        heading="Stop finding out about risk in the post-mortem."
        subheading="14-day free trial. No credit card. Sentinel scores your first deploy risk in under 5 minutes."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Talk to an engineer"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
