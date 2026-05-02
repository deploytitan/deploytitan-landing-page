import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { useScrollReveal } from '../../utils'
import { MidCTA } from '../../components/MidCTA'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'

const APP_URL = (import.meta.env.VITE_APP_URL as string) || 'https://app.deploytitan.com'

const WINS = [
  {
    title: 'Policy-as-code for every team',
    body: 'One HCL file defines which deployment strategies are allowed per service tier. Platform teams write the policy once — product teams self-serve safely.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Self-service deploys with guardrails',
    body: 'Product teams deploy without opening a ticket. Titan Sentinel enforces your risk thresholds automatically — no platform team in the loop for every release.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Unified audit log across all clouds',
    body: 'Every deployment, every rollback, every policy override — logged with actor, timestamp, and context. One query covers GKE, ECS, Lambda, and Cloud Run.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'IaC-native: Terraform + Pulumi providers',
    body: 'Register services, define policies, and configure failover routing in the same IaC repo as your infrastructure. DeployTitan is a Terraform resource, not a SaaS portal.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Reduce on-call escalations',
    body: 'Automated rollback and failover means platform teams stop being the human circuit breaker. Incidents resolve automatically before the pager fires.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: 'One CLI for every engineer',
    body: "No more per-cloud console access for deployments. Every engineer uses `dt deploy` regardless of whether they're shipping to Kubernetes, ECS, or Cloud Run.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
]

export default function SolutionPlatformEngineering() {
  useDocumentMeta(
    'Platform Engineering — DeployTitan',
    'Build the golden path. Give product teams self-serve deployments with guardrails — without becoming the deployment bottleneck.',
  )
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 mb-6"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal-success" />
            Full platform
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Build the golden path.
            <br className="hidden md:block" /> Get out of the way.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Platform teams shouldn't be the deployment bottleneck. DeployTitan gives you a single
            control plane to define deployment policies, enforce SLO guardrails, and let product
            teams self-serve — safely — across every cloud and cluster.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="https://cal.com/deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Talk to a platform engineer →
            </a>
          </div>
        </Container>
      </section>

      {/* Wins grid */}
      <section className="py-24 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              What you get
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink">
              Everything your golden path needs.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WINS.map((w, i) => (
              <Card
                key={w.title}
                padding="none"
                className="p-7 hover:border-primary/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200"
                data-reveal
                data-reveal-delay={String(i % 3)}
              >
                <div className="flex items-center gap-3 text-primary mb-4">{w.icon}</div>
                <h3 className="text-sm font-semibold text-ink mb-2 leading-snug">{w.title}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed">{w.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Terraform snippet */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              IaC native
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Register a service in your existing Terraform.
            </h2>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <span className="font-mono text-[10px] text-ink-quaternary">services.tf</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed text-ink-secondary">
              <p>
                <span className="text-primary">resource</span>{' '}
                <span className="text-ink">"deploytitan_service"</span>{' '}
                <span className="text-ink">"checkout"</span> {'{'}
              </p>
              <p className="ml-4">
                name = <span className="text-signal-success">"checkout-api"</span>
              </p>
              <p className="ml-4">
                environment = <span className="text-signal-success">"production"</span>
              </p>
              <p className="ml-4">
                tier = <span className="text-signal-success">"critical"</span>
              </p>
              <p className="ml-4 mt-2">deploy_policy {'{'}</p>
              <p className="ml-8">
                allowed_strategies = [<span className="text-signal-success">"canary"</span>,{' '}
                <span className="text-signal-success">"blue_green"</span>]
              </p>
              <p className="ml-8">
                max_risk_score = <span className="text-primary">70</span>
              </p>
              <p className="ml-8">
                auto_rollback = <span className="text-primary">true</span>
              </p>
              <p className="ml-4">{'}'}</p>
              <p>{'}'}</p>
            </div>
          </Card>
        </Container>
      </section>

      <MidCTA
        heading="Stop being the deployment bottleneck."
        subheading="Give product teams self-serve deploys with policy guardrails. Start your free trial or talk to an engineer."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Talk to an engineer"
        secondaryHref="https://cal.com/deploytitan/demo"
        secondaryExternal
      />
    </>
  )
}
