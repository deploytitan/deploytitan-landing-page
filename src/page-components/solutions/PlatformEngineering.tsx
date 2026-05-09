'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { SolutionNav } from '../../components/shared/SolutionNav'

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
            <span className="w-1.5 h-1.5 bg-signal-success" style={{ borderRadius: '1px' }} />
            Powered by the full platform
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Build the golden path.
            <br className="hidden md:block" /> Get out of the way.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Platform teams shouldn't be the deployment bottleneck. DeployTitan gives you a single
            control plane to define deployment policies, enforce SLO guardrails, and let product
            teams self-serve safely across every cloud and cluster.
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

      {/* Policy flow — replaces the identical 6-card WINS grid */}
      <section className="py-24 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-16" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How it works
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug">
              Platform team writes policy once. Every team ships safely, forever.
            </h2>
          </div>

          {/* Flow: four horizontal steps connected by arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-px bg-line" data-reveal>
            {[
              {
                step: '01',
                actor: 'Platform team',
                action: 'Write policy in HCL',
                detail: 'Defines allowed strategies, max risk scores, and auto-rollback rules per service tier. Committed to your IaC repo.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
                detail: 'One CLI command. No cloud console, no Slack approvals, no ticket queue. The same command works on GKE, ECS, and Cloud Run.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                ),
              },
              {
                step: '03',
                actor: 'Titan Foresight',
                action: 'Enforce at deploy time',
                detail: 'Scores the PR against live dependency graph and SLO budget. Blocks, soft-blocks, or proceeds based on the policy you wrote in step 01.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
              {
                step: '04',
                actor: 'Titan Ledger',
                action: 'Capture audit trail',
                detail: 'Every deployment, rollback, and override logged with actor, timestamp, and policy version. One query covers every cloud.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
              <div key={item.step} className="bg-surface p-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-quaternary">
                    Step {item.step}
                  </span>
                  <span className="text-primary opacity-70">{item.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-ink-tertiary mb-1">
                    {item.actor}
                  </p>
                  <h3 className="text-sm font-semibold text-ink leading-snug">{item.action}</h3>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed flex-1">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Supporting capabilities — row list, not cards */}
          <div className="mt-12 border-t border-line pt-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-6">
              Also included
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {[
                { label: 'IaC-native', detail: 'Terraform + Pulumi providers. Register services and define policies in the same repo as your infrastructure.' },
                { label: 'One CLI for every engineer', detail: '`dt deploy` works regardless of cloud target. No per-cloud console access required.' },
                { label: 'Automated rollback', detail: 'Phoenix triggers on SLO breach before on-call wakes up. Platform team is not the human circuit breaker.' },
                { label: 'Multi-cloud audit log', detail: 'GKE, ECS, Lambda, Cloud Run: one unified query surface. Compliance-ready out of the box.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 py-3 border-b border-line/50 last:border-0">
                  <span className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center border border-primary/30 text-primary text-[10px] font-mono">
                    ✓
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-ink">{item.label}</span>
                    <span className="text-sm text-ink-secondary"> — {item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Terraform snippet */}
      <section className="py-14 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              IaC native
            </p>
            <h2 className="text-2xl font-semibold text-ink leading-snug mb-2">
              Register a service in your existing Terraform.
            </h2>
          </div>
          <div data-reveal>
          <CodeBlock variant="code" filename="services.tf" copy={false}>
            <p className="text-ink-secondary">
              <span className="text-primary">resource</span>{' '}
              <span className="text-ink">"deploytitan_service"</span>{' '}
              <span className="text-ink">"checkout"</span> {'{'}
            </p>
            <p className="ml-4 text-ink-secondary">
              name = <span className="text-signal-success">"checkout-api"</span>
            </p>
            <p className="ml-4 text-ink-secondary">
              environment = <span className="text-signal-success">"production"</span>
            </p>
            <p className="ml-4 text-ink-secondary">
              tier = <span className="text-signal-success">"critical"</span>
            </p>
            <p className="ml-4 mt-2 text-ink-secondary">deploy_policy {'{'}</p>
            <p className="ml-8 text-ink-secondary">
              allowed_strategies = [<span className="text-signal-success">"canary"</span>,{' '}
              <span className="text-signal-success">"blue_green"</span>]
            </p>
            <p className="ml-8 text-ink-secondary">
              max_risk_score = <span className="text-primary">70</span>
            </p>
            <p className="ml-8 text-ink-secondary">
              auto_rollback = <span className="text-primary">true</span>
            </p>
            <p className="ml-4 text-ink-secondary">{'}'}</p>
            <p className="text-ink-secondary">{'}'}</p>
          </CodeBlock>
          </div>
        </Container>
      </section>

      {/* What teams do today */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              The status quo
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug mb-2">
              What platform teams are stuck doing, instead of building.
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
                failure: 'SREs spend 2+ hours/day reviewing deploys they don\'t fully understand. No programmatic enforcement; approvals get bypassed under pressure.',
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
                  <p className="text-sm text-ink-tertiary leading-relaxed">{item.failure}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-16 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              How we compare
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug mb-2">
              DeployTitan vs. Backstage and DIY portals.
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink leading-snug mb-4">
              Build your golden path in a single afternoon.
            </h2>
            <p className="text-ink-secondary text-sm mb-8 max-w-lg mx-auto">
              We'll walk through policy-as-code setup, show you how product teams self-serve against
              your guardrails, and connect your existing Terraform, all in 20 minutes.
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

      <SolutionNav currentRoute="/solutions/platform-engineering" />
    </>
  )
}
