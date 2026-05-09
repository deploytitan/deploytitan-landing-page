'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'

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
    body: 'Product teams deploy without opening a ticket. Titan Foresight enforces your risk thresholds automatically — no platform team in the loop for every release.',
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
              href="https://cal.com/deploytitan/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Book a 20-min walkthrough
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
              href={`${APP_URL}/signup`}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Start free trial →
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

      {/* What teams do today */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The status quo
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              What platform teams are stuck doing — instead of building.
            </h2>
            <p className="text-ink-secondary text-sm max-w-xl">
              Platform engineering teams spend most of their time as human circuit breakers instead
              of building the golden path they were hired to create.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tool: 'Deployment ticket queue',
                workaround: 'Product teams open JIRA tickets for every production deploy. Platform team reviews, approves, and sometimes executes the deployment.',
                failure: 'Platform team becomes the bottleneck. 2-day deploy queue. Product engineers stop shipping because the process is too slow.',
              },
              {
                tool: 'Per-cloud console access',
                workaround: 'Different engineers have different console access across AWS, GCP, and Azure. Deployments require coordinating the right person with the right access.',
                failure: 'No unified audit trail. Runbooks differ per cloud. New engineers need weeks of onboarding before they can deploy independently.',
              },
              {
                tool: 'Slack-based approval flows',
                workaround: 'Deploys require a #deploy-approvals Slack thread with a thumbs-up from an SRE before proceeding. All manual, all async.',
                failure: 'SREs spend 2+ hours/day reviewing deploys they don\'t fully understand. No programmatic enforcement — approvals get bypassed under pressure.',
              },
            ].map((item, i) => (
              <Card
                key={item.tool}
                padding="none"
                className="p-7"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">
                  {item.tool}
                </p>
                <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{item.workaround}</p>
                <div className="border-t border-line pt-4">
                  <p className="text-[11px] font-mono text-red-400/80 uppercase tracking-wider mb-1">
                    Failure mode
                  </p>
                  <p className="text-xs text-ink-tertiary leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-20 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How we compare
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              DeployTitan vs. the alternatives.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 pr-6 text-xs font-mono uppercase tracking-wider text-ink-tertiary w-1/4">
                    Capability
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-primary">
                    DeployTitan
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    Backstage (Spotify)
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-mono uppercase tracking-wider text-ink-tertiary">
                    Internal portal (DIY)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Policy-as-code enforcement', '✓', '~ (plugins)', '✗ (manual)'],
                  ['Unified multi-cloud audit log', '✓', '✗', '✗'],
                  ['Self-service with SLO guardrails', '✓', '✗', '✗'],
                  ['IaC-native (Terraform/Pulumi)', '✓', '✗', '~'],
                  ['Time to first golden path', '< 1 day', '2–6 months', '6–12 months'],
                ].map(([cap, dt, backstage, diy]) => (
                  <tr key={String(cap)} className="border-b border-line/50">
                    <td className="py-3 pr-6 text-xs text-ink-secondary">{cap}</td>
                    <td className="py-3 px-4 text-center text-xs text-signal-success font-mono">{dt}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{backstage}</td>
                    <td className="py-3 px-4 text-center text-xs text-ink-tertiary font-mono">{diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <Container width="4xl" padding="default">
          <div className="text-center" data-reveal>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
              Build your golden path in a single afternoon.
            </h2>
            <p className="text-ink-secondary text-sm mb-8 max-w-lg mx-auto">
              We'll walk through policy-as-code setup, show you how product teams self-serve against
              your guardrails, and connect your existing Terraform — all in 20 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/deploytitan/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
                style={{ borderRadius: '2px' }}
              >
                Book a 20-min walkthrough
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href={`${APP_URL}/signup`}
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Start free trial →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
