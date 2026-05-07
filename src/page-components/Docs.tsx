import Link from 'next/link'
import { MidCTA } from '../components/MidCTA'
import { CodeBlock } from '../components/shared/CodeBlock'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'

const quickLinks = [
  // {
  //   title: 'Quickstart',
  //   description: 'Deploy your first service in under 5 minutes',
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <polygon points="5 3 19 12 5 21 5 3" />
  //     </svg>
  //   ),
  //   href: '/cli',
  //   external: false,
  // },
  {
    title: 'CLI Reference',
    description: 'Full reference for the `dt` command-line tool',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    href: '/cli',
    external: false,
  },
  {
    title: 'API Reference',
    description: 'REST API endpoints, auth, webhooks',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
    href: '/api-reference',
    external: false,
  },
  // {
  //   title: 'Concepts',
  //   description: 'Progressive delivery, rollbacks, SLO guardrails',
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <circle cx="12" cy="12" r="10" />
  //       <line x1="12" y1="8" x2="12" y2="12" />
  //       <line x1="12" y1="16" x2="12.01" y2="16" />
  //     </svg>
  //   ),
  //   href: DOCS_URL,
  //   external: true,
  // },
  // {
  //   title: 'Guides',
  //   description: 'Canary on EKS, GitHub Actions, Datadog alerts',
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
  //       <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  //     </svg>
  //   ),
  //   href: DOCS_URL,
  //   external: true,
  // },
  // {
  //   title: 'Integrations',
  //   description: 'Kubernetes, ArgoCD, GitHub Actions, Datadog…',
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <rect x="2" y="7" width="20" height="14" rx="2" />
  //       <path d="M16 3l-4 4-4-4" />
  //     </svg>
  //   ),
  //   href: '/integrations',
  //   external: false,
  // },
]

const installCode = `
npm install @deploytitan/cli
dt --version`

export default function Docs() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">
              Documentation
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Build faster.
              <br />
              Deploy smarter.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              Everything you need to integrate DeployTitan into your delivery pipeline — from a
              5-minute quickstart to deep-dive architecture guides.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cli"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                Get started with CLI
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <a
                href="/api-reference"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-5 py-3 text-sm font-medium transition-all"
                style={{ borderRadius: '2px' }}
              >
                Get started with API
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick links grid */}
      <Container as="section" className="py-14">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
          Quick links
        </span>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((ql) =>
            ql.external ? (
              <a
                key={ql.title}
                href={ql.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sharp-card spotlight-card bg-surface-alt p-6 group block hover:border-primary/30 transition-all"
              >
                <div
                  className="w-9 h-9 flex items-center justify-center border border-line text-ink-tertiary group-hover:text-primary group-hover:border-primary/30 transition-all mb-4"
                  style={{ borderRadius: '2px' }}
                >
                  {ql.icon}
                </div>
                <h3 className="text-base font-medium text-ink group-hover:text-primary transition-colors">
                  {ql.title}
                </h3>
                <p className="mt-1 text-sm text-ink-secondary leading-relaxed">{ql.description}</p>
              </a>
            ) : (
              <Link
                key={ql.title}
                href={ql.href}
                className="sharp-card spotlight-card bg-surface-alt p-6 group block hover:border-primary/30 transition-all"
              >
                <div
                  className="w-9 h-9 flex items-center justify-center border border-line text-ink-tertiary group-hover:text-primary group-hover:border-primary/30 transition-all mb-4"
                  style={{ borderRadius: '2px' }}
                >
                  {ql.icon}
                </div>
                <h3 className="text-base font-medium text-ink group-hover:text-primary transition-colors">
                  {ql.title}
                </h3>
                <p className="mt-1 text-sm text-ink-secondary leading-relaxed">{ql.description}</p>
              </Link>
            ),
          )}
        </div>
      </Container>

      {/* Install section */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
                Install
              </span>
              <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
                Up and running in seconds
              </h2>
              <p className="mt-3 text-sm text-ink-secondary leading-relaxed max-w-md">
                The{' '}
                <code className="font-mono text-primary text-xs bg-primary-muted px-1.5 py-0.5 rounded-sm">
                  dt
                </code>{' '}
                CLI is a single static binary — no runtime dependencies. Connects to your existing
                Kubernetes clusters and CI pipelines.
              </p>
              <div className="mt-5">
                <Link
                  href="/cli"
                  className="text-sm text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  View all install options →
                </Link>
              </div>
            </div>
            <CodeBlock code={installCode} lang="bash" filename="terminal" />
          </div>
        </Container>
      </Section>

      <MidCTA
        heading="Ready to ship safer?"
        subheading="Start your free trial — no credit card required."
        primaryLabel="Start free trial"
        primaryHref="/early-access"
        secondaryLabel="Talk to an engineer"
        secondaryHref="/contact"
      />
    </div>
  )
}
