'use client'

import React, { useState } from 'react'
import { DEMO_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

// TODO: wire up per-tier CTAs to distinct entry points when demo routing supports it
const TRIAL_URL = DEMO_URL
const GROWTH_DEMO_URL = DEMO_URL
const ENTERPRISE_URL = DEMO_URL

const ANNUAL_DISCOUNT = 0.17 // ~2 months free

const TEAM_MONTHLY = 199
const GROWTH_MONTHLY = 999

const TEAM_FEATURES = [
  'Release coordination for up to 10 services',
  'GitHub integration',
  'Release DAGs and dependency tracking',
  'Release readiness timeline',
  'Shared release record and blockers',
  'Unlimited team members',
]

const GROWTH_FEATURES = [
  'Release promotion gates across environments',
  'Multi-team rollback coordination',
  'Cross-service dependency locking during deploy windows',
  'Slack and Jira integrations',
  'Release analytics and readiness reporting',
]

const ENTERPRISE_FEATURES = [
  { label: 'SSO + SCIM provisioning', detail: 'Okta, Azure AD, Google Workspace' },
  { label: 'Approval workflows and compliance controls', detail: 'SOC 2, change management gates' },
  { label: 'Advanced recovery playbooks', detail: 'Coordinated rollback across 50+ services' },
  { label: 'Private deployment options', detail: 'VPC, air-gapped, on-premises' },
  { label: 'Dedicated deployment architect', detail: 'Named engineer for your rollout design' },
  { label: 'SLA-backed rollback coordination', detail: 'Contractual recovery time targets' },
]

const INCLUDED_ALWAYS = [
  'Release visibility and timeline history',
  'Dependency graphing and blocking state',
  'Slack release updates and blocked release alerts',
]

const BILLING_ROWS = [
  {
    label: 'What pricing follows',
    value: 'Release coordination complexity, service count, and workflow needs.',
  },
  {
    label: 'What pricing does not follow',
    value: 'Requests, deployments, runtime traffic, or infrastructure consumption.',
  },
  {
    label: 'Why it matters',
    value: 'Teams should pay for solving release pain, not for how often they ship.',
  },
]

// Trial Q surfaced first — it is the most common hesitation at this point in the page
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What does the 30-day trial include?',
    a: 'Full Growth feature set, up to 50 services, no credit card required. Promotion gates, multi-team rollback, cross-service dependency locking, Slack and Jira integrations, and release analytics are all active. At the end of the trial you continue with a paid plan or cancel with no obligation.',
  },
  {
    q: 'Why not charge per deployment?',
    a: 'Charging per deployment punishes healthy engineering behavior. Teams should deploy when they need to, not when billing math says they can.',
  },
  {
    q: 'What counts as service complexity?',
    a: 'Mainly the number of services, the number of teams involved in a release, and whether you need approvals, promotions, rollback workflows, or compliance controls.',
  },
  {
    q: 'Do we need to replace GitHub or CI/CD?',
    a: 'No. DeployTitan sits above your existing tooling and coordinates the release lifecycle that those systems do not manage well today.',
  },
  {
    q: 'Is Titan Rollouts the only core product right now?',
    a: 'Yes. Titan Rollouts is the core product. Intelligence and enterprise recovery features are positioned as the next layers on top of that workflow.',
  },
]

const SERVICE_BANDS = [
  { label: 'Up to 10 services', plan: 'team' as const },
  { label: '10 to 50 services', plan: 'growth' as const },
  { label: 'More than 50 services', plan: 'enterprise' as const },
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

function annualPrice(monthly: number) {
  return Math.round(monthly * (1 - ANNUAL_DISCOUNT))
}

export default function Pricing() {
  useScrollReveal()
  const [annual, setAnnual] = useState(true)
  const [highlightedPlan, setHighlightedPlan] = useState<'team' | 'growth' | 'enterprise' | null>(
    null,
  )

  const teamPrice = annual ? annualPrice(TEAM_MONTHLY) : TEAM_MONTHLY
  const growthPrice = annual ? annualPrice(GROWTH_MONTHLY) : GROWTH_MONTHLY

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
            Price the workflow pain, not the infrastructure meter.
          </h1>
          <p
            className="text-ink-secondary mx-auto mt-6 max-w-2xl text-lg leading-8"
            data-reveal
            data-reveal-delay="2"
          >
            DeployTitan charges for release coordination complexity: service count, team boundaries,
            and workflow depth. Not deployments. Not runtime traffic. Not seats.
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
                Charges for
              </p>
              <p className="text-ink text-sm leading-6">
                Coordination complexity, service count, workflow depth.
              </p>
            </div>
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 text-xs font-medium tracking-[0.1em] uppercase">
                Never charges for
              </p>
              <p className="text-ink text-sm leading-6">
                Deployments, requests, runtime traffic, infrastructure consumption.
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
                How many services does your team coordinate?
              </p>
              <div
                className="border-line bg-line flex flex-wrap gap-px border"
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
                      className={`focus-visible:ring-primary px-4 py-3 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
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
                    className={`bg-ink absolute top-[3px] h-[11px] w-[11px] transition-[left] duration-150 ease-out`}
                    style={{
                      left: annual ? 'calc(100% - 14px)' : '3px',
                      borderRadius: '1px',
                    }}
                  />
                </span>
              </button>
              <button
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={`focus-visible:ring-primary flex items-center gap-2 py-3 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none ${
                  annual ? 'text-ink' : 'text-ink-tertiary hover:text-ink-secondary'
                }`}
              >
                Annual
                <span className="text-primary-accessible font-mono text-[9px] tracking-[0.1em] uppercase">
                  2 months free
                </span>
              </button>
            </div>
          </div>

          {/* Team + Growth side by side */}
          <div
            className="border-line bg-line grid grid-cols-1 gap-px border lg:grid-cols-[1fr_1.6fr]"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            {/* Team — lean entry */}
            <div
              className={`bg-surface flex flex-col p-8 transition-opacity duration-150 ${
                highlightedPlan !== null && highlightedPlan !== 'team'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              <div className="mb-8">
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.18em] uppercase">
                  Team
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-ink font-mono text-4xl font-semibold tracking-[-0.03em]">
                    ${teamPrice}
                  </span>
                  <span className="text-ink-secondary pb-1 text-sm">/mo</span>
                  {annual && (
                    <span className="text-ink-tertiary mb-[3px] font-mono text-[9px] tracking-[0.1em] uppercase">
                      billed annually
                    </span>
                  )}
                </div>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.1em] uppercase">
                  Up to 10 services
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For engineering teams validating release coordination before scaling it.
                </p>
                <p className="text-ink-tertiary mt-3 text-xs leading-5">
                  30-day trial included. Full Growth features, up to 50 services. No card required.
                </p>
              </div>

              <Button
                as="a"
                href={TRIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                block
                className="mb-8"
              >
                Start 30-day trial
              </Button>

              <div className="border-line mt-auto border-t pt-6">
                <ul className="space-y-3">
                  {TEAM_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Growth — dominant, structurally heavier */}
            <div
              className={`bg-surface-alt/40 relative flex flex-col p-8 transition-opacity duration-150 ${
                highlightedPlan !== null && highlightedPlan !== 'growth'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              {/* Most teams at this scale badge */}
              <span
                className="text-primary-accessible absolute top-8 right-8 font-mono text-[9px] tracking-[0.18em] uppercase"
                aria-label="Most teams with 10 to 50 services start here"
              >
                Most teams 10–50 services
              </span>

              <div className="mb-8 pr-40">
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
                  Up to 50 services
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For distributed organizations coordinating release windows across multiple teams.
                  The coordination problems change at this scale: it is no longer about tracking, it
                  is about control.
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
                  Everything in Team, plus:
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {GROWTH_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Enterprise — full width, capability-forward */}
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
                  50+ services
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  Scoped to your architecture. Compliance controls, private deployment options, and
                  a named engineer who knows your rollout topology.
                </p>
              </div>

              <div>
                <p className="text-ink-tertiary mb-4 font-mono text-[9px] tracking-[0.1em] uppercase">
                  Capabilities not in Growth
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
                  Design your rollout architecture
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

      {/* ─── Billing clarity ──────────────────────────────────────────────── */}
      <section className="border-line bg-surface-alt/35 border-b py-20">
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
