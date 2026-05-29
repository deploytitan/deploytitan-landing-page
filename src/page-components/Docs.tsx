import Link from 'next/link'
import { CodeBlock } from '../components/shared/CodeBlock'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

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

const installCode = `npm install -g @deploytitan/cli
dt --version`

const quickstartSteps = [
  {
    step: '01',
    title: 'Install the CLI',
    code: 'npm install -g @deploytitan/cli',
    description: 'The dt CLI is a single binary. No runtime dependencies beyond Node.',
  },
  {
    step: '02',
    title: 'Authenticate',
    code: 'dt login',
    description: 'Creates your DeployTitan account and stores credentials locally. No credit card required.',
  },
  {
    step: '03',
    title: 'Add a titan.yaml to your repo',
    code: `# titan.yaml
service: my-lambda
runtime: lambda
function_arn: arn:aws:lambda:us-east-1:123456789:function:my-lambda
strategy: canary
canary:
  initial_traffic: 10
  increment: 20
  interval: 5m
  rollback_on:
    error_rate: "> 1%"
    p99_latency: "> 800ms"`,
    description: 'One YAML file defines your deployment strategy, traffic policy, and rollback conditions. No CRDs, no Helm charts.',
  },
  {
    step: '04',
    title: 'Deploy',
    code: 'dt deploy --service=my-lambda',
    description: 'DeployTitan shifts traffic to the new alias incrementally. CloudWatch metrics are monitored continuously. If error rate exceeds your threshold, it rolls back automatically.',
  },
]

const COMING_SOON_GUIDES = [
  {
    title: 'Canary deployment tutorial',
    description: 'Step-by-step guide: API Gateway + Lambda alias canary with auto-rollback.',
    eta: 'Coming soon',
  },
  {
    title: 'Cohort-based rollouts',
    description: 'Route internal users, beta testers, and paying customers to different Lambda versions.',
    eta: 'Coming soon',
  },
  {
    title: 'Policy configuration reference',
    description: 'Full titan.yaml schema: rollback conditions, traffic shapes, health check config.',
    eta: 'Coming soon',
  },
  {
    title: 'Troubleshooting guide',
    description: 'Common deployment failures, rollback debugging, and CloudWatch metric setup.',
    eta: 'Coming soon',
  },
]

export default function Docs() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-widest">
              Documentation
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Lambda canary in
              <br />
              under 5 minutes.
            </h1>
            <p className="mt-5 text-base text-ink-secondary leading-relaxed max-w-lg">
              Install the CLI, add a titan.yaml, and run your first canary deployment against a live
              Lambda function. Full guides and architecture docs are being written; they will appear
              here as they ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cli"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                CLI reference
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
                className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-5 py-3 text-sm font-medium transition-all"
                style={{ borderRadius: '2px' }}
              >
                API reference
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lambda quickstart */}
      <Container as="section" className="py-16">
        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
          Lambda quickstart
        </span>
        <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em] mb-10">
          Your first canary deployment
        </h2>
        <div className="space-y-0 border border-line" style={{ borderRadius: '2px' }}>
          {quickstartSteps.map((s, i) => (
            <div
              key={s.step}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 p-7 ${i < quickstartSteps.length - 1 ? 'border-b border-line' : ''}`}
            >
              <div>
                <span className="text-primary-accessible dark:text-primary font-mono text-xs tabular-nums">{s.step}</span>
                <h3 className="text-ink mt-1 text-sm font-semibold">{s.title}</h3>
                <p className="text-ink-secondary mt-2 text-xs leading-relaxed max-w-[40ch]">{s.description}</p>
              </div>
              <CodeBlock code={s.code} lang="bash" filename={s.code.startsWith('#') ? 'titan.yaml' : 'terminal'} />
            </div>
          ))}
        </div>
      </Container>

      {/* Guides — coming soon */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
                Guides
              </span>
              <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
                In-depth guides
              </h2>
              <p className="mt-2 text-sm text-ink-secondary max-w-lg leading-relaxed">
                These guides are being written. If you need help before they ship, email{' '}
                <a href="mailto:justine@deploytitan.com" className="text-primary-accessible hover:underline">
                  justine@deploytitan.com
                </a>
                {' '}directly.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMING_SOON_GUIDES.map((g) => (
              <Card key={g.title} tone="muted" className="opacity-70">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-ink text-sm font-medium">{g.title}</h3>
                    <p className="mt-1 text-xs text-ink-secondary leading-relaxed">{g.description}</p>
                  </div>
                  <span
                    className="shrink-0 px-2 py-1 font-mono text-[9px] tracking-wider uppercase text-ink-tertiary border border-line"
                    style={{ borderRadius: '1px' }}
                  >
                    {g.eta}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Install section */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
                Install
              </span>
              <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
                Up and running in seconds
              </h2>
              <p className="mt-3 text-sm text-ink-secondary leading-relaxed max-w-md">
                The{' '}
                <code className="font-mono text-primary-accessible dark:text-primary text-xs bg-surface-alt px-1.5 py-0.5" style={{ borderRadius: '1px' }}>
                  dt
                </code>{' '}
                CLI connects to your AWS account via standard IAM credentials. Requires Lambda alias
                management permissions. No agents, no sidecars.
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
    </div>
  )
}
