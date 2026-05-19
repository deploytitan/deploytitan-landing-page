'use client'

import React, { useState } from 'react'
import { DEMO_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

// TODO: wire up per-tier CTAs to distinct entry points when demo routing supports it
const STARTER_URL = DEMO_URL
const GROWTH_DEMO_URL = DEMO_URL
const SCALE_URL = DEMO_URL
const ENTERPRISE_URL = DEMO_URL

const ANNUAL_DISCOUNT = 0.17 // ~2 months free

const STARTER_MONTHLY = 49
const GROWTH_MONTHLY = 499
const SCALE_MONTHLY = 2499

const STARTER_FEATURES = [
  'Basic deployments and manual rollback',
  'Canary rollout support',
  'Deployment history and timeline',
  'Health-based rollback',
  'Basic alerts and deployment monitoring',
  'GitHub integration',
  'AWS Lambda and basic Kubernetes support',
]

const GROWTH_FEATURES = [
  'Automated progressive rollout',
  'Cohort routing and promotion gates',
  'Dependency-aware releases and DAG visualization',
  'Coordinated multi-service releases',
  'Automated rollback engine',
  'SLA/SLO-aware deployment guardrails',
  'Approvals, audit trail, tagging, and notes',
]

const SCALE_FEATURES = [
  { label: 'Multi-region rollout coordination', detail: 'Coordinate larger deployment orgs' },
  { label: 'Advanced policy engine', detail: 'Govern releases across teams and environments' },
  { label: 'DR orchestration', detail: 'Recovery workflows for critical systems' },
  { label: 'Advanced RBAC', detail: 'Control who can approve, deploy, and roll back' },
  { label: 'Compliance reporting', detail: 'Audit exports and immutable deployment history' },
  { label: 'Titan Foresight Lite', detail: 'Impact analysis, blast radius, risk indicators' },
]

const ENTERPRISE_FEATURES = [
  { label: 'Self-hosted and on-prem', detail: 'Private, hybrid, or air-gapped deployment' },
  { label: 'Custom integrations', detail: 'Connectors for internal platforms and workflows' },
  { label: 'Custom SLAs', detail: 'Support and recovery terms matched to your risk profile' },
  { label: 'Private networking', detail: 'Dedicated infrastructure and network controls' },
  { label: 'White-label options', detail: 'For internal platform programs and service catalogs' },
  { label: 'Multi-workspace governance', detail: 'Central policy across business units' },
]

const PLAN_LIMITS = {
  starter: [
    ['Organizations', '1'],
    ['Projects', '3'],
    ['Services', '10'],
    ['Team members', '10'],
    ['Environments', '2'],
    ['Retention', '14 days'],
  ],
  growth: [
    ['Organizations', '5'],
    ['Projects', '25'],
    ['Services', '100'],
    ['Team members', '50'],
    ['Environments', '10'],
    ['Retention', '90 days'],
  ],
  scale: [
    ['Organizations', '20'],
    ['Projects', '100'],
    ['Services', '500'],
    ['Team members', '250'],
    ['Environments', 'Unlimited'],
    ['Retention', '1 year'],
  ],
} satisfies Record<string, [string, string][]>

const INTEGRATIONS_BY_PLAN = {
  starter: 'GitHub, AWS Lambda, basic Kubernetes',
  growth: 'OpenTelemetry, Datadog, Grafana, CloudWatch, Slack',
  scale: 'Priority support, dedicated Slack channel, advanced analytics',
} satisfies Record<string, string>

const EXCLUDED_STARTER = [
  'Advanced DAG orchestration',
  'Sandbox environments',
  'Advanced policies',
  'SSO/SAML',
  'Self-hosted deployment',
  'Advanced analytics',
]

const INCLUDED_ALWAYS = [
  'Release visibility and timeline history',
  'Dependency graphing and blocked release state',
  'Slack release updates and blocked release alerts',
  'No per-deployment, per-event, or AI-token meters',
]

const ADD_ONS = [
  {
    name: 'Extra Protected Services',
    price: '+25: $99/mo, +100: $299/mo',
    description: 'Expand service coverage without changing the core plan or introducing meters.',
  },
  {
    name: 'Titan Foresight',
    price: '$499/mo',
    description: 'Impact analysis, downstream dependency detection, risk scoring, and recommendations.',
  },
  {
    name: 'Titan Sandbox',
    price: '$399/mo',
    description: 'Ephemeral environments, historical replay, and branch preview orchestration.',
  },
  {
    name: 'Self-Hosted Controllers',
    price: '$1,000/mo',
    description: 'Controller deployment for fintech, regulated infrastructure, and private networks.',
  },
  {
    name: 'Compliance Pack',
    price: '$499/mo',
    description: 'Audit exports, approval workflows, deployment attestations, and compliance reporting.',
  },
  {
    name: 'Advanced Observability',
    price: '$299/mo',
    description: 'Deeper telemetry analysis for teams that want DeployTitan to enrich existing tools.',
  },
]

const BILLING_ROWS = [
  {
    label: 'Base plans',
    value: 'Fixed monthly pricing tied to services, environments, and release capability depth.',
  },
  {
    label: 'Expansion',
    value: 'Optional add-ons for extra services, Foresight, Sandbox, self-hosted controllers, compliance, and observability.',
  },
  {
    label: 'Never metered',
    value: 'No credits, traces, rollout minutes, AI tokens, deployment events, or surprise incident invoices.',
  },
]

// Trial Q is surfaced first because it is the most common hesitation at this point in the page.
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What does the 30-day trial include?',
    a: 'Starter onboarding includes basic deployments, manual rollback, canary rollout support, deployment history, health-based rollback, and basic integrations. Teams evaluating larger rollout surfaces can request a Growth trial with advanced orchestration enabled.',
  },
  {
    q: 'Why not charge with credits?',
    a: 'Credits make teams hesitate during exactly the moments DeployTitan is supposed to protect: frequent releases, broader instrumentation, and incident response. Fixed plans keep the bill predictable while add-ons map to capabilities with clear operational value.',
  },
  {
    q: 'What changes as we move from Starter to Growth?',
    a: 'Starter is for early teams proving the workflow. Growth adds automated progressive rollout, dependency-aware releases, coordinated multi-service releases, guardrails, approvals, audit trails, and the integrations scaling teams expect.',
  },
  {
    q: 'Can we add capabilities without changing plans?',
    a: 'Yes. Add-ons are designed for expansion without billing ambiguity: extra protected services, Titan Foresight, Titan Sandbox, advanced observability, self-hosting, and compliance packs can be scoped separately.',
  },
  {
    q: 'Do we need to replace GitHub, CI/CD, or Datadog?',
    a: 'No. DeployTitan sits above your existing tooling and coordinates the release lifecycle those systems do not manage well today. Observability is integration-first and optional.',
  },
]

const SERVICE_BANDS = [
  { label: '1 to 10 services', plan: 'starter' as const },
  { label: '10 to 100 services', plan: 'growth' as const },
  { label: '100 to 500 services', plan: 'scale' as const },
  { label: 'Regulated org', plan: 'enterprise' as const },
]

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const uid = React.useId()
  const answerId = `faq-answer-${uid}`
  const buttonId = `faq-btn-${uid}`

  return (
    <div className="border-line border-b last:border-b-0">
      <button
        id={buttonId}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        className="text-ink hover:text-primary focus-visible:ring-primary flex w-full items-center justify-between py-5 text-left text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        {q}
        <svg
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="text-ink-secondary pb-5 text-sm leading-7">{a}</div>
        </div>
      </div>
    </div>
  )
}

function FeatureDot() {
  return (
    <span
      className="bg-primary mt-[0.4em] block h-[7px] w-[7px] shrink-0"
      style={{ borderRadius: '1px' }}
      aria-hidden="true"
    />
  )
}

function LimitTable({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="border-line grid grid-cols-2 border-t">
      {rows.map(([label, value]) => (
        <div key={label} className="border-line border-b py-3 pr-3">
          <dt className="text-ink-tertiary font-mono text-[8px] tracking-[0.1em] uppercase">
            {label}
          </dt>
          <dd className="text-ink mt-1 text-sm font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function annualPrice(monthly: number) {
  return Math.round(monthly * (1 - ANNUAL_DISCOUNT))
}

export default function Pricing() {
  useScrollReveal()
  const [annual, setAnnual] = useState(false)
  const [highlightedPlan, setHighlightedPlan] = useState<
    'starter' | 'growth' | 'scale' | 'enterprise' | null
  >(null)

  const starterPrice = annual ? annualPrice(STARTER_MONTHLY) : STARTER_MONTHLY
  const growthPrice = annual ? annualPrice(GROWTH_MONTHLY) : GROWTH_MONTHLY
  const scalePrice = annual ? annualPrice(SCALE_MONTHLY) : SCALE_MONTHLY

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="blueprint-grid border-line border-b pt-28 pb-16">
        <Container width="4xl" padding="default" className="text-center">
          <p
            className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.22em] uppercase"
            data-reveal
          >
            Pricing
          </p>
          <h1
            className="text-ink mx-auto max-w-[16ch] text-[clamp(2.8rem,6vw,5rem)] leading-[0.98] font-medium tracking-[-0.05em]"
            data-reveal
            data-reveal-delay="1"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Fixed plans for teams that cannot afford billing surprises.
          </h1>
          <p
            className="text-ink-secondary mx-auto mt-6 max-w-2xl text-lg leading-8"
            data-reveal
            data-reveal-delay="2"
          >
            Start with a predictable platform plan. Expand with protected services, foresight,
            sandboxing, observability, self-hosting, and compliance controls when release complexity
            actually requires them.
          </p>

          {/* Pricing philosophy callout */}
          <div
            className="border-line bg-line mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-px border sm:grid-cols-2"
            style={{ borderRadius: '2px' }}
            data-reveal
            data-reveal-delay="3"
          >
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 text-xs font-medium tracking-[0.1em] uppercase">
                Base price follows
              </p>
              <p className="text-ink text-sm leading-6">
                Services, environments, release maturity, and operational capability.
              </p>
            </div>
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 text-xs font-medium tracking-[0.1em] uppercase">
                Never follows
              </p>
              <p className="text-ink text-sm leading-6">
                Credits, deployment events, traces, rollout minutes, or AI-token usage.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Plans ────────────────────────────────────────────────────────── */}
      <section className="border-line border-b py-16">
        <Container width="page" padding="wide">
          {/* Controls row: plan selector + billing toggle */}
          <div
            className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            {/* Service count selector — recognition task, not recall */}
            <div>
              <p className="text-ink-tertiary mb-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                Where is your release surface today?
              </p>
              <div
                className="border-line bg-line grid grid-cols-2 gap-px border md:grid-cols-4"
                style={{ borderRadius: '2px' }}
                role="group"
                aria-label="Filter plans by service count"
              >
                {SERVICE_BANDS.map((band) => {
                  const active = highlightedPlan === band.plan
                  return (
                    <button
                      key={band.plan}
                      onClick={() => setHighlightedPlan(active ? null : band.plan)}
                      aria-pressed={active}
                      className={`focus-visible:ring-primary px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
                        active
                          ? 'bg-ink text-surface'
                          : 'bg-surface text-ink-secondary hover:bg-surface-alt hover:text-ink'
                      }`}
                    >
                      {band.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Billing cycle toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={`focus-visible:ring-primary py-3 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none ${
                  !annual ? 'text-ink' : 'text-ink-tertiary hover:text-ink-secondary'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(!annual)}
                aria-checked={annual}
                role="switch"
                aria-label="Annual billing"
                className="focus-visible:ring-primary relative flex h-11 w-11 items-center justify-center rounded-[2px] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
              >
                <span className="border-line bg-surface-alt relative h-5 w-9 rounded-[2px] border transition-colors">
                  <span
                    className="bg-ink absolute top-[3px] left-[3px] h-[11px] w-[11px] transition-transform duration-150 ease-out"
                    style={{
                      transform: annual ? 'translateX(16px)' : 'translateX(0)',
                      borderRadius: '1px',
                    }}
                  />
                </span>
              </button>
              <button
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={`focus-visible:ring-primary flex items-center gap-2 py-3 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none ${
                  annual ? 'text-ink' : 'text-ink-tertiary hover:text-ink-secondary'
                }`}
              >
                Annual
                <span className="text-primary-accessible font-mono text-[9px] tracking-[0.1em] uppercase whitespace-nowrap">
                  2 months free
                </span>
              </button>
            </div>
          </div>

          {/* Fixed plan ladder */}
          <div
            className="border-line bg-line grid grid-cols-1 gap-px border xl:grid-cols-[0.95fr_1.2fr_1fr]"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            <div
              className={`bg-surface flex flex-col p-8 transition-opacity duration-150 ${
                highlightedPlan !== null && highlightedPlan !== 'starter'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              <div className="mb-8">
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.18em] uppercase">
                  Starter
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-ink font-mono text-4xl font-semibold tracking-[-0.03em]">
                    ${starterPrice}
                  </span>
                  <span className="text-ink-secondary pb-1 text-sm">/mo</span>
                  {annual && (
                    <span className="text-ink-tertiary mb-[3px] font-mono text-[9px] tracking-[0.1em] uppercase">
                      billed annually
                    </span>
                  )}
                </div>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.1em] uppercase">
                  For teams getting serious about deployments
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For early SaaS teams with one release surface, a few services, and a healthy
                  instinct not to build this themselves.
                </p>
                <p className="text-ink-tertiary mt-3 text-xs leading-5">
                  1 organization, 3 projects, 10 services, 10 members, 2 environments, 14-day
                  retention.
                </p>
              </div>

              <Button
                as="a"
                href={STARTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                block
                className="mb-8"
              >
                Start with Starter
              </Button>

              <div className="border-line mt-auto border-t pt-6">
                <p className="text-ink-tertiary mb-4 font-mono text-[9px] tracking-[0.1em] uppercase">
                  Included
                </p>
                <ul className="space-y-3">
                  {STARTER_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <LimitTable rows={PLAN_LIMITS.starter} />
                </div>
                <p className="text-ink-tertiary mt-5 text-xs leading-5">
                  Excludes {EXCLUDED_STARTER.join(', ')}.
                </p>
              </div>
            </div>

            <div
              className={`bg-surface-alt/50 relative flex flex-col p-8 transition-opacity duration-150 ${
                highlightedPlan !== null && highlightedPlan !== 'growth'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              <span
                className="text-primary-accessible absolute top-8 right-8 font-mono text-[9px] tracking-[0.18em] uppercase"
                aria-label="Most important pricing tier"
              >
                Real PMF tier
              </span>

              <div className="mb-8 pr-28">
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.18em] uppercase">
                  Growth
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-ink font-mono text-4xl font-semibold tracking-[-0.03em]">
                    ${growthPrice}
                  </span>
                  <span className="text-ink-secondary pb-1 text-sm">/mo</span>
                  {annual && (
                    <span className="text-ink-tertiary mb-[3px] font-mono text-[9px] tracking-[0.1em] uppercase">
                      billed annually
                    </span>
                  )}
                </div>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.1em] uppercase">
                  For scaling engineering organizations
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For scale-ups and fintech teams where release coordination, rollback pain, and
                  merge freeze rituals are already slowing velocity.
                </p>
              </div>

              <Button
                as="a"
                href={GROWTH_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                block
                className="mb-8"
              >
                Book a release topology review
              </Button>

              <div className="border-line mt-auto border-t pt-6">
                <p className="text-ink-tertiary mb-4 font-mono text-[9px] tracking-[0.1em] uppercase">
                  Everything in Starter, plus:
                </p>
                <ul className="grid gap-3">
                  {GROWTH_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <LimitTable rows={PLAN_LIMITS.growth} />
                </div>
                <p className="text-ink-tertiary mt-5 font-mono text-[9px] leading-5 tracking-[0.08em] uppercase">
                  Integrations: {INTEGRATIONS_BY_PLAN.growth}
                </p>
              </div>
            </div>

            <div
              className={`bg-surface flex flex-col p-8 transition-opacity duration-150 ${
                highlightedPlan !== null && highlightedPlan !== 'scale'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              <div className="mb-8">
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.18em] uppercase">
                  Scale
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-ink font-mono text-4xl font-semibold tracking-[-0.03em]">
                    ${scalePrice.toLocaleString()}
                  </span>
                  <span className="text-ink-secondary pb-1 text-sm">/mo</span>
                  {annual && (
                    <span className="text-ink-tertiary mb-[3px] font-mono text-[9px] tracking-[0.1em] uppercase">
                      billed annually
                    </span>
                  )}
                </div>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.1em] uppercase">
                  For platform and infrastructure teams
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For larger deployment organizations that need governance, policy, analytics, and
                  risk visibility before release complexity becomes organizational drag.
                </p>
              </div>

              <Button
                as="a"
                href={SCALE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                block
                className="mb-8"
              >
                Scope a Scale plan
              </Button>

              <div className="border-line mt-auto border-t pt-6">
                <p className="text-ink-tertiary mb-4 font-mono text-[9px] tracking-[0.1em] uppercase">
                  Everything in Growth, plus:
                </p>
                <ul className="grid gap-3">
                  {SCALE_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <FeatureDot />
                      <div>
                        <span className="text-ink-secondary text-sm leading-5">{f.label}</span>
                        <span className="text-ink-tertiary mt-0.5 block font-mono text-[9px] tracking-[0.08em] uppercase">
                          {f.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <LimitTable rows={PLAN_LIMITS.scale} />
                </div>
                <p className="text-ink-tertiary mt-5 font-mono text-[9px] leading-5 tracking-[0.08em] uppercase">
                  Includes: {INTEGRATIONS_BY_PLAN.scale}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`border-line bg-surface mt-px border transition-opacity duration-150 ${
              highlightedPlan !== null && highlightedPlan !== 'enterprise'
                ? 'opacity-40'
                : 'opacity-100'
            }`}
            style={{ borderRadius: '2px' }}
            data-reveal
            data-reveal-delay="1"
          >
            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-[280px_1fr_auto]">
              <div>
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.18em] uppercase">
                  Enterprise
                </p>
                <p className="text-ink mt-4 text-2xl font-semibold tracking-[-0.02em]">
                  Custom pricing
                </p>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.1em] uppercase">
                  Regulated and mission-critical systems
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For banks, insurance, hybrid-cloud enterprises, and teams that need private
                  deployment, custom governance, and contract-level operating guarantees.
                </p>
              </div>

              <div>
                <p className="text-ink-tertiary mb-4 font-mono text-[9px] tracking-[0.1em] uppercase">
                  Everything in Scale, plus:
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {ENTERPRISE_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <FeatureDot />
                      <div>
                        <span className="text-ink-secondary text-sm leading-5">{f.label}</span>
                        <span className="text-ink-tertiary mt-0.5 block font-mono text-[9px] tracking-[0.08em] uppercase">
                          {f.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start lg:items-center">
                <Button
                  as="a"
                  href={ENTERPRISE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Talk to enterprise
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Always included ──────────────────────────────────────────────── */}
      <section className="border-line border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              Always included
            </p>
            <p className="text-ink max-w-xl text-2xl leading-snug font-semibold">
              Every plan includes the foundation. No metered safety features.
            </p>
          </div>

          <div className="border-line border-t" data-reveal>
            {INCLUDED_ALWAYS.map((item) => (
              <div key={item} className="border-line flex items-center gap-4 border-b py-5">
                <FeatureDot />
                <span className="text-ink-secondary text-sm leading-7">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Add-ons ─────────────────────────────────────────────────────── */}
      <section className="border-line bg-surface-alt/35 border-b py-20">
        <Container width="page" padding="wide">
          <div
            className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
            data-reveal
          >
            <div>
              <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
                Add-ons
              </p>
              <h2
                className="text-ink max-w-2xl text-[clamp(1.8rem,3vw,3rem)] leading-[1.08] font-medium tracking-[-0.03em]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Expansion follows capability, not consumption.
              </h2>
            </div>
            <p className="text-ink-secondary max-w-2xl text-sm leading-7 lg:justify-self-end">
              Add modules when release risk, compliance pressure, or coordination overhead grows.
              Your team can deploy more often without wondering which protection consumed the next
              credit.
            </p>
          </div>

          <div
            className="border-line bg-line grid grid-cols-1 gap-px border md:grid-cols-2 xl:grid-cols-3"
            style={{ borderRadius: '2px' }}
            data-reveal
            data-reveal-delay="1"
          >
            {ADD_ONS.map((addOn, index) => (
              <article
                key={addOn.name}
                className="group bg-surface min-h-[210px] p-6 transition-colors duration-200 hover:bg-surface-alt"
              >
                <div className="mb-8 flex items-start justify-between gap-5">
                  <span className="text-ink-tertiary font-mono text-[10px] tracking-[0.18em] uppercase">
                    Module {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="border-line text-ink-tertiary group-hover:border-primary/30 group-hover:text-primary-accessible rounded-[1px] border px-2 py-1 font-mono text-[9px] tracking-[0.1em] uppercase transition-colors">
                    {addOn.price}
                  </span>
                </div>
                <h3 className="text-ink text-lg leading-snug font-semibold tracking-[-0.015em]">
                  {addOn.name}
                </h3>
                <p className="text-ink-secondary mt-4 text-sm leading-7">{addOn.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Billing clarity ──────────────────────────────────────────────── */}
      <section className="border-line border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              Billing clarity
            </p>
            <h2 className="text-ink text-2xl font-semibold">
              Simple enough to explain in one sentence.
            </h2>
          </div>

          <div
            className="border-line bg-surface border"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            {BILLING_ROWS.map((row, index) => (
              <div
                key={row.label}
                className={`grid gap-2 px-6 py-5 sm:grid-cols-[220px_1fr] ${
                  index < BILLING_ROWS.length - 1 ? 'border-line border-b' : ''
                }`}
              >
                <p className="text-ink text-sm font-medium">{row.label}</p>
                <p className="text-ink-secondary text-sm leading-7">{row.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="border-line border-b py-24">
        <Container width="3xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              FAQ
            </p>
            <h2 className="text-ink text-2xl font-semibold">
              Questions engineers ask before signing
            </h2>
          </div>
          <div data-reveal>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container width="3xl" padding="default" className="text-center">
          <p
            className="text-ink-tertiary mb-4 font-mono text-[11px] tracking-[0.22em] uppercase"
            data-reveal
          >
            Next step
          </p>
          <p
            className="text-ink mx-auto text-xl"
            data-reveal
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Bring us your release topology. We will map your dependency graph and show you where the
            coordination breaks in the first call.
          </p>
        </Container>
      </section>
    </>
  )
}
