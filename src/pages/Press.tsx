import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { MidCTA } from '../components/MidCTA'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const pressItems = [
  {
    date: 'March 2026',
    publication: 'TechCrunch',
    headline: 'DeployTitan emerges from stealth with $4M seed to make deployments boring again',
    href: '#',
  },
  {
    date: 'March 2026',
    publication: 'The New Stack',
    headline:
      'How DeployTitan is bringing progressive delivery to teams without dedicated platform engineering',
    href: '#',
  },
  {
    date: 'February 2026',
    publication: 'DevOps Weekly',
    headline: "Seed round spotlight: DeployTitan's SLO-gated canary rollouts",
    href: '#',
  },
]

export default function Press() {
  useDocumentMeta(
    'Press',
    'Press releases, media coverage, and press kit resources for DeployTitan.',
  )

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">
              Press
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              News & media.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              Press releases, coverage, and resources for journalists and analysts covering
              DeployTitan.
            </p>
            <div className="mt-8">
              <a
                href="mailto:press@deploytitan.com"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                Media inquiry
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Press coverage */}
      <Container as="section" className="py-14">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
          Coverage
        </span>
        <div className="mt-6 flex flex-col divide-y divide-line">
          {pressItems.map((item) => (
            <a
              key={item.headline}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-6 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="shrink-0">
                <span className="font-mono text-[10px] text-ink-quaternary">{item.date}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                  {item.publication}
                </span>
                <h3 className="text-base text-ink group-hover:text-primary-dark transition-colors leading-snug">
                  {item.headline}
                </h3>
              </div>
              <svg
                className="ml-auto shrink-0 opacity-30 group-hover:opacity-70 transition-opacity mt-1"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>
      </Container>

      {/* Press kit */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Press kit
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
            Assets & boilerplate
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Logo pack (SVG, PNG)', desc: 'Dark, light, and monochrome variants' },
              {
                label: 'Company boilerplate',
                desc: 'One-paragraph and two-paragraph descriptions',
              },
              { label: 'Founder headshots', desc: 'High-resolution press photos' },
            ].map((asset) => (
              <Card key={asset.label}>
                <h3 className="text-sm font-medium text-ink">{asset.label}</h3>
                <p className="mt-1 text-xs text-ink-secondary">{asset.desc}</p>
                <a
                  href="mailto:press@deploytitan.com"
                  className="mt-4 inline-flex items-center text-xs text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  Request via email →
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <MidCTA
        heading="Press inquiry?"
        subheading="Email us and we'll respond within one business day."
        primaryLabel="Contact press team"
        primaryHref="mailto:press@deploytitan.com"
        secondaryLabel="About DeployTitan"
        secondaryHref="/about"
        secondaryExternal={false}
      />
    </div>
  )
}
