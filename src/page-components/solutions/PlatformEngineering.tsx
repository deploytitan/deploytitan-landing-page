'use client'

import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { SolutionNav } from '../../components/shared/SolutionNav'
import { SolutionPageHero } from '../../components/shared/SolutionPageHero'

export default function SolutionPlatformEngineering() {
  useScrollReveal()

  return (
    <>
      <SolutionPageHero
        poweredBy="Powered by the full platform"
        heading={<>Build the golden path.<br className="hidden md:block" /> Get out of the way.</>}
        description="Platform teams shouldn't be the deployment bottleneck. DeployTitan gives you a single control plane to define deployment policies, enforce SLO guardrails, and let product teams self-serve safely across every cloud and cluster."
        ctas={[
          { label: 'Book a 20-min walkthrough', href: 'https://cal.com/justine-deploytitan/demo', variant: 'book', target: '_blank', rel: 'noopener noreferrer' },
          { label: 'Join waitlist →', href: WAITLIST_URL, variant: 'secondary' },
        ]}
      />

      {/* Policy flow — replaces the identical 6-card WINS grid */}
      <section className="border-line border-b py-24">
        <Container width="5xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              How it works
            </p>
            <h2 className="text-ink text-2xl leading-snug font-semibold lg:text-3xl">
              Platform team writes policy once. Every team ships safely, forever.
            </h2>
          </div>

          {/* Flow: four horizontal steps connected by arrows */}
          <div className="bg-line grid grid-cols-1 gap-px sm:grid-cols-4" data-reveal>
            {[
              {
                step: '01',
                actor: 'Platform team',
                action: 'Write policy in HCL',
                detail:
                  'Defines allowed strategies, max risk scores, and auto-rollback rules per service tier. Committed to your IaC repo.',
                icon: (
                  <svg
                    width="18"
                    height="18"
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
                  </svg>
                ),
              },
              {
                step: '02',
                actor: 'Engineer',
                action: 'Run dt deploy',
                detail:
                  'One CLI command. No cloud console, no Slack approvals, no ticket queue. The same command works on GKE, ECS, and Cloud Run.',
                icon: (
                  <svg
                    width="18"
                    height="18"
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
              {
                step: '03',
                actor: 'Titan Foresight',
                action: 'Enforce at deploy time',
                detail:
                  'Scores the PR against live dependency graph and SLO budget. Blocks, soft-blocks, or proceeds based on the policy you wrote in step 01.',
                icon: (
                  <svg
                    width="18"
                    height="18"
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
                step: '04',
                actor: 'Titan Ledger',
                action: 'Capture audit trail',
                detail:
                  'Every deployment, rollback, and override logged with actor, timestamp, and policy version. One query covers every cloud.',
                icon: (
                  <svg
                    width="18"
                    height="18"
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
            ].map((item, i) => (
              <div key={item.step} className="bg-surface flex flex-col gap-4 p-7">
                <div className="flex items-center justify-between">
                  <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
                    Step {item.step}
                  </span>
                  <span className="text-primary-accessible dark:text-primary">{item.icon}</span>
                </div>
                <div>
                  <p className="text-ink-tertiary mb-1 font-mono text-[10px] tracking-wider uppercase">
                    {item.actor}
                  </p>
                  <h3 className="text-ink text-sm leading-snug font-semibold">{item.action}</h3>
                </div>
                <p className="text-ink-secondary flex-1 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Supporting capabilities — row list, not cards */}
          <div className="border-line mt-12 border-t pt-10" data-reveal>
            <p className="text-primary-accessible mb-6 font-mono text-xs tracking-widest uppercase">
              Also included
            </p>
            <div className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
              {[
                {
                  label: 'IaC-native',
                  detail:
                    'Terraform + Pulumi providers. Register services and define policies in the same repo as your infrastructure.',
                },
                {
                  label: 'One CLI for every engineer',
                  detail:
                    '`dt deploy` works regardless of cloud target. No per-cloud console access required.',
                },
                {
                  label: 'Automated rollback',
                  detail:
                    'Phoenix triggers on SLO breach before on-call wakes up. Platform team is not the human circuit breaker.',
                },
                {
                  label: 'Multi-cloud audit log',
                  detail:
                    'GKE, ECS, Lambda, Cloud Run: one unified query surface. Compliance-ready out of the box.',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-line/50 flex items-start gap-3 border-b py-3 last:border-0"
                >
                  <span className="border-primary/30 text-primary-accessible dark:text-primary mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border font-mono text-[10px]">
                    ✓
                  </span>
                  <div>
                    <span className="text-ink text-sm font-semibold">{item.label}</span>
                    <span className="text-ink-secondary text-sm"> — {item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Terraform snippet */}
      <section className="border-line bg-surface-alt/30 border-b py-14">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              IaC native
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold">
              Register a service in your existing Terraform.
            </h2>
          </div>
          <div data-reveal>
            <CodeBlock variant="code" filename="services.tf" copy={false}>
              <p className="text-ink-secondary">
                <span className="text-primary-accessible dark:text-primary">resource</span>{' '}
                <span className="text-ink">"deploytitan_service"</span>{' '}
                <span className="text-ink">"checkout"</span> {'{'}
              </p>
              <p className="text-ink-secondary ml-4">
                name = <span className="text-signal-success-text dark:text-signal-success">"checkout-api"</span>
              </p>
              <p className="text-ink-secondary ml-4">
                environment = <span className="text-signal-success-text dark:text-signal-success">"production"</span>
              </p>
              <p className="text-ink-secondary ml-4">
                tier = <span className="text-signal-success-text dark:text-signal-success">"critical"</span>
              </p>
              <p className="text-ink-secondary mt-2 ml-4">deploy_policy {'{'}</p>
              <p className="text-ink-secondary ml-8">
                allowed_strategies = [<span className="text-signal-success-text dark:text-signal-success">"canary"</span>,{' '}
                <span className="text-signal-success-text dark:text-signal-success">"blue_green"</span>]
              </p>
              <p className="text-ink-secondary ml-8">
                max_risk_score = <span className="text-primary-accessible dark:text-primary">70</span>
              </p>
              <p className="text-ink-secondary ml-8">
                auto_rollback = <span className="text-primary-accessible dark:text-primary">true</span>
              </p>
              <p className="text-ink-secondary ml-4">{'}'}</p>
              <p className="text-ink-secondary">{'}'}</p>
            </CodeBlock>
          </div>
        </Container>
      </section>

      {/* What teams do today */}
      <section className="border-line border-b py-20">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              The status quo
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              What platform teams are stuck doing, instead of building.
            </h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              Platform engineering teams spend most of their time as human circuit breakers instead
              of building the golden path they were hired to create.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                tool: 'Deployment ticket queue',
                workaround:
                  'Product teams open JIRA tickets for every production deploy. Platform team reviews, approves, and sometimes executes the deployment.',
                failure:
                  'Platform team becomes the bottleneck. 2-day deploy queue. Product engineers stop shipping because the process is too slow.',
              },
              {
                tool: 'Per-cloud console access',
                workaround:
                  'Different engineers have different console access across AWS, GCP, and Azure. Deployments require coordinating the right person with the right access.',
                failure:
                  'No unified audit trail. Runbooks differ per cloud. New engineers need weeks of onboarding before they can deploy independently.',
              },
              {
                tool: 'Slack-based approval flows',
                workaround:
                  'Deploys require a #deploy-approvals Slack thread with a thumbs-up from an SRE before proceeding. All manual, all async.',
                failure:
                  "SREs spend 2+ hours/day reviewing deploys they don't fully understand. No programmatic enforcement; approvals get bypassed under pressure.",
              },
            ].map((item, i) => (
              <Card
                key={item.tool}
                padding="none"
                className="p-7"
                data-reveal
                data-reveal-delay={String(i)}
              >
                <p className="text-primary-accessible mb-3 font-mono text-xs tracking-wider uppercase">
                  {item.tool}
                </p>
                <p className="text-ink-secondary mb-4 text-sm leading-relaxed">{item.workaround}</p>
                <div className="border-line border-t pt-4">
                  <p className="mb-1 font-mono text-[11px] tracking-wider text-red-400/80 uppercase">
                    Failure mode
                  </p>
                  <p className="text-ink-tertiary text-sm leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="border-line border-b py-16">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary-accessible mb-3 font-mono text-xs tracking-widest uppercase">
              How we compare
            </p>
            <h2 className="text-ink mb-2 text-2xl leading-snug font-semibold lg:text-3xl">
              DeployTitan vs. Backstage and DIY portals.
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-line border-b">
                  <th className="text-ink-tertiary w-1/4 py-3 pr-6 text-left font-mono text-xs tracking-wider uppercase">
                    Capability
                  </th>
                  <th className="text-primary-accessible px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    DeployTitan
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
                    Backstage (Spotify)
                  </th>
                  <th className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs tracking-wider uppercase">
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
                  <tr key={String(cap)} className="border-line/50 border-b">
                    <td className="text-ink-secondary py-3 pr-6 text-xs">{cap}</td>
                    <td className="text-signal-success-text dark:text-signal-success px-4 py-3 text-center font-mono text-xs">
                      {dt}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {backstage}
                    </td>
                    <td className="text-ink-tertiary px-4 py-3 text-center font-mono text-xs">
                      {diy}
                    </td>
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
            <h2 className="text-ink mb-4 text-2xl leading-snug font-semibold lg:text-3xl">
              Build your golden path in a single afternoon.
            </h2>
            <p className="text-ink-secondary mx-auto mb-8 max-w-lg text-sm">
              We'll walk through policy-as-code setup, show you how product teams self-serve against
              your guardrails, and connect your existing Terraform, all in 20 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/justine-deploytitan/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-surface dark:text-surface inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97]"
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
                href={WAITLIST_URL}
                className="text-primary-accessible hover:text-primary text-sm font-medium transition-colors"
              >
                Join waitlist →
              </a>
            </div>
          </div>
        </Container>
      </section>

      <SolutionNav currentRoute="/solutions/platform-engineering" />
    </>
  )
}
