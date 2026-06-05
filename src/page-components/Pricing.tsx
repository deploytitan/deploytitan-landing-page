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

const ANNUAL_DISCOUNT = 0.17 // ~2 months free

const STARTER_MONTHLY = 19
const GROWTH_MONTHLY = 49
const SCALE_MONTHLY = 149

const STARTER_FEATURES = [
  'Release objects — group PRs from multiple repositories into one release',
  'Dependency ordering — set which service merges before which',
  '1-click sequential merge — execute in dependency order',
  'GitHub integration',
]

const GROWTH_FEATURES = [
  'Slack notifications when a merge completes or is blocked',
  'Multiple environments (staging and production)',
]

const SCALE_FEATURES = [
  { label: 'Unlimited services and members', detail: 'No caps as your release surface grows' },
  { label: 'Priority support', detail: 'Faster response times and hands-on onboarding' },
]

const PLAN_LIMITS = {
  starter: [
    ['Services', '5'],
    ['Members', '5'],
    ['Releases', 'Unlimited'],
  ],
  growth: [
    ['Services', '20'],
    ['Members', '25'],
    ['Releases', 'Unlimited'],
  ],
  scale: [
    ['Services', 'Unlimited'],
    ['Members', 'Unlimited'],
    ['Releases', 'Unlimited'],
  ],
} satisfies Record<string, [string, string][]>

const INCLUDED_ALWAYS = [
  'Release history and merge timeline on every plan',
  'No per-release, per-merge, or per-event fees',
]

const BILLING_ROWS = [
  {
    label: 'Base plans',
    value: 'Fixed monthly price based on service count. Starter $19, Growth $49, Scale $149.',
  },
  {
    label: 'Extra services',
    value: 'Add services beyond your plan limit at $10/service/month.',
  },
  {
    label: 'Never metered',
    value:
      'No deployment events, per-merge fees, or overage surprises. Releases are always unlimited.',
  },
]

const SERVICE_BANDS = [
  { label: '1 to 5 services', plan: 'starter' as const },
  { label: '6 to 20 services', plan: 'growth' as const },
  { label: '20+ services', plan: 'scale' as const },
]

// Trial Q is surfaced first because it is the most common hesitation at this point in the page.
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What does the free trial include?',
    a: 'The trial runs on the Growth plan: release objects, dependency ordering, 1-click sequential merge, Slack notifications, and multiple environments. No credit card required.',
  },
  {
    q: 'What happens if we exceed the service limit?',
    a: 'You can add services at $10/service/month. If you need more than 20 services, Scale removes the limit entirely.',
  },
  {
    q: 'Do we need to replace GitHub or our CI/CD pipeline?',
    a: 'No. DeployTitan sits above those tools. GitHub handles code review; CI/CD handles pipeline execution. DeployTitan handles the multi-repo sequencing — which PR merges first, and in what order — that neither manages today.',
  },
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
    <dl className="border-line grid grid-cols-3 border-t">
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
  const [highlightedPlan, setHighlightedPlan] = useState<'starter' | 'growth' | 'scale' | null>(
    null,
  )

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
            Start with a predictable plan. Add services as your release surface grows.
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
                Price follows
              </p>
              <p className="text-ink text-sm leading-6">Services and team size.</p>
            </div>
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 text-xs font-medium tracking-[0.1em] uppercase">
                Never follows
              </p>
              <p className="text-ink text-sm leading-6">
                Merge events, releases run, or per-PR fees.
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
                className="border-line bg-line grid grid-cols-3 gap-px border"
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
                <span className="text-primary-accessible font-mono text-[9px] tracking-[0.1em] whitespace-nowrap uppercase">
                  2 months free
                </span>
              </button>
            </div>
          </div>

          {/* Fixed plan ladder */}
          <div
            className="border-line bg-line grid grid-cols-1 gap-px border xl:grid-cols-3"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            {/* ── Starter ── */}
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
                  Up to 5 services, 5 members
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For small teams coordinating releases across more than one repository.
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
                Start free trial
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
              </div>
            </div>

            {/* ── Growth ── */}
            <div
              className={`bg-surface-alt/50 relative flex flex-col p-8 transition-opacity duration-150 ${
                highlightedPlan !== null && highlightedPlan !== 'growth'
                  ? 'opacity-40'
                  : 'opacity-100'
              }`}
            >
              <div className="mb-8">
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
                  Up to 20 services, 25 members
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For growing teams with more repositories and a need for release notifications.
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
                Start free trial
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
              </div>
            </div>

            {/* ── Scale ── */}
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
                    ${scalePrice}
                  </span>
                  <span className="text-ink-secondary pb-1 text-sm">/mo</span>
                  {annual && (
                    <span className="text-ink-tertiary mb-[3px] font-mono text-[9px] tracking-[0.1em] uppercase">
                      billed annually
                    </span>
                  )}
                </div>
                <p className="text-ink-tertiary mt-1 font-mono text-[10px] tracking-[0.1em] uppercase">
                  Unlimited services and members
                </p>
                <p className="text-ink-secondary mt-4 text-sm leading-6">
                  For platform teams managing releases across many repositories.
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
                Start free trial
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
              Every plan. No exceptions.
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
    </>
  )
}
