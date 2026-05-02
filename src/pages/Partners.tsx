import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MidCTA } from '../components/MidCTA'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const partners = [
  {
    category: 'Cloud',
    items: [
      {
        name: 'Amazon Web Services',
        description: 'EKS, ECS, CodePipeline, and CloudFormation integrations.',
      },
      { name: 'Google Cloud', description: 'GKE, Cloud Run, and Cloud Deploy integrations.' },
      {
        name: 'Microsoft Azure',
        description: 'AKS, Azure Pipelines, and Azure DevOps integrations.',
      },
    ],
  },
  {
    category: 'CI/CD',
    items: [
      {
        name: 'GitHub',
        description: 'Native GitHub Actions integration and Deployments API support.',
      },
      { name: 'GitLab', description: 'GitLab CI/CD and GitLab Environments integration.' },
      { name: 'CircleCI', description: 'CircleCI Orbs and pipeline trigger support.' },
    ],
  },
  {
    category: 'Observability',
    items: [
      { name: 'Datadog', description: 'SLO guardrails powered by Datadog metrics and monitors.' },
      { name: 'Grafana', description: 'Grafana Cloud and Prometheus alert-driven rollbacks.' },
      {
        name: 'PagerDuty',
        description: 'Incident correlation and deployment pause on active incidents.',
      },
    ],
  },
]

export default function Partners() {
  useDocumentMeta(
    'Partners',
    'DeployTitan technology partners — cloud providers, CI/CD platforms, and observability tools.',
  )

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">
              Partners
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Works with your stack.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              DeployTitan integrates with the cloud providers, CI/CD platforms, and observability
              tools your team already relies on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:partners@deploytitan.com"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                Become a partner
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Partner grid */}
      {partners.map((group) => (
        <Section key={group.category} border="top" padding="none">
          <Container className="py-12">
            <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
              {group.category}
            </span>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((p) => (
                <Card key={p.name} tone="muted">
                  <h3 className="text-sm font-medium text-ink">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                    {p.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* Become a partner */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
              Partner program
            </span>
            <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
              Integrate with DeployTitan
            </h2>
            <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
              We work closely with technology partners to build deep, well-tested integrations. If
              you're a cloud provider, observability vendor, or DevOps platform, we'd love to talk.
            </p>
            <a
              href="mailto:partners@deploytitan.com"
              className="mt-6 inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-5 py-3 text-sm font-medium transition-all"
              style={{ borderRadius: '2px' }}
            >
              partners@deploytitan.com
            </a>
          </div>
        </Container>
      </Section>

      <MidCTA
        heading="See all integrations"
        subheading="Browse the full catalogue of supported tools and platforms."
        primaryLabel="View integrations"
        primaryHref="/integrations"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
        secondaryExternal={false}
      />
    </div>
  )
}
