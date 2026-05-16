'use client'

import React, { useState } from 'react'
import { CONSOLE_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { InstallTabs } from '../components/shared/InstallTabs'
import { Container } from '../components/shared/Container'
import { Button } from '../components/shared/Button'

// ── Plan data ─────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    unit: 'mo',
    functionLimit: 10,
    description: 'For individual engineers and small teams validating safer deployments on Lambda.',
    features: [
      'Up to 10 Lambda functions under management',
      'Unlimited deployments and rollbacks',
      'Pre-deploy risk scan on every push',
      'CloudWatch metric health checks included',
      'Instant rollback in under 30 seconds',
      'Deployment audit log (90-day retention)',
      'titan.yaml config: no CRDs, no Helm',
      'Community support',
    ],
    cta: 'Start free trial',
    href: `${CONSOLE_URL}/login`,
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 149,
    unit: 'mo',
    functionLimit: 50,
    description: 'For growing teams shipping multiple times a day across multiple services.',
    features: [
      'Up to 50 Lambda functions under management',
      'Everything in Starter',
      'Cohort-based rollouts (internal / free / premium)',
      'Cross-function deployment groups',
      'SQS / EventBridge DLQ rollback signals',
      'Custom CloudWatch metric policies',
      'Deployment audit log (1-year retention)',
      'Slack and PagerDuty integration',
      'Priority email support',
    ],
    cta: 'Start free trial',
    href: `${CONSOLE_URL}/login`,
    highlighted: true,
  },
]

const INCLUDED_ALWAYS = [
  'Unlimited deployments, rollbacks, and risk scans',
  'Unlimited team members',
  'Reading dashboards, logs, and reports is always free',
  'Services stay live if you downgrade — no hostage-taking',
]

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Why per-function rather than per-deployment?',
    a: 'Charging per deployment creates a perverse incentive: teams avoid deploying often, which is the opposite of what safer delivery requires. A flat monthly rate per managed function removes that mental tax entirely. Deploy as often as you need.',
  },
  {
    q: 'What counts as a "Lambda function under management"?',
    a: 'Any Lambda function you connect to DeployTitan via titan.yaml. Functions are counted by ARN. You can add and remove functions freely; billing is based on your peak active count within a billing cycle.',
  },
  {
    q: 'Are rollbacks really unlimited?',
    a: 'Yes. Rollbacks, risk scans, and health checks are included in the flat rate. We never charge extra for safety actions. If the detector fires and triggers a rollback at 3am, that costs you nothing extra.',
  },
  {
    q: 'Do you support event-driven architectures (SQS, EventBridge)?',
    a: 'DLQ-based rollback signals — if your dead-letter queue grows beyond a threshold, Titan triggers a rollback — are available on Pro. Full event-driven traffic splitting is on the roadmap after Phase 1.',
  },
  {
    q: 'Does DeployTitan touch my traffic?',
    a: "No. Your traffic never passes through DeployTitan's infrastructure. The Titan Controller runs in your AWS account, manages Lambda alias weights via the AWS API, and sends only telemetry metadata to our control plane. Zero bytes of user traffic leave your environment.",
  },
  {
    q: 'What happens if I exceed the function limit?',
    a: "You'll see a warning in the dashboard before you hit the cap. You can upgrade at any time. Existing deployments keep running; only new function registrations are blocked until you upgrade or free a slot.",
  },
  {
    q: 'Can I use DeployTitan on Kubernetes or Cloud Run too?',
    a: "Yes, both are supported. The per-function pricing applies to Lambda. Kubernetes and Cloud Run deployments are metered separately — contact us for current rates if you're multi-platform.",
  },
  {
    q: 'Is there a free trial?',
    a: (
      <>
        Yes. Every account starts with a 14-day full-access trial — no credit card required. Run{' '}
        <code className="font-mono text-xs bg-surface-alt px-1.5 py-0.5" style={{ borderRadius: '1px' }}>dt login</code>{' '}
        to create an account from the CLI, connect your first Lambda function, and run a canary deployment before you pay a cent.
      </>
    ),
  },
  {
    q: 'Do you offer discounts for early-stage startups?',
    a: (
      <>
        Yes. Email{' '}
        <a href="mailto:support@deploytitan.com" className="text-ink-secondary underline hover:text-ink transition-colors">
          support@deploytitan.com
        </a>{' '}
        and we&apos;ll sort you out.
      </>
    ),
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const uid = React.useId()
  const answerId = `faq-answer-${uid}`
  const buttonId = `faq-btn-${uid}`
  const contentRef = React.useRef<HTMLDivElement>(null)
  return (
    <div className="border-line border-b last:border-b-0">
      <button
        id={buttonId}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        className="text-ink hover:text-primary flex w-full items-center justify-between py-5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      >
        {q}
        <svg
          className={`shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
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
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-[max-height,opacity] duration-200 ease-out"
        style={{
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 400) : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-ink-secondary pb-5 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

// ── PlanCard ──────────────────────────────────────────────────────────────────

function PlanCard({
  name,
  price,
  unit,
  functionLimit,
  description,
  features,
  cta,
  href,
  highlighted,
}: (typeof PLANS)[0]) {
  return (
    <div
      className={`flex flex-col border p-8 ${
        highlighted ? 'border-primary/40 bg-primary/[0.03]' : 'border-line bg-surface'
      }`}
      style={{ borderRadius: '2px' }}
      data-reveal
    >
      <p className="text-ink mb-1 text-sm font-semibold">{name}</p>
      <p className="text-ink-secondary mb-6 text-xs leading-relaxed">{description}</p>

      {/* Price */}
      <div className="mb-1 flex items-baseline gap-1">
        <span className="text-ink text-3xl font-bold">${price}</span>
        <span className="text-ink-secondary text-sm">/ {unit}</span>
      </div>
      <p className="text-ink-secondary mb-6 font-mono text-xs">
        Up to {functionLimit} Lambda functions
      </p>

      <Button
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cta} — ${name} plan`}
        variant={highlighted ? 'primary' : 'outline'}
        size="sm"
        block
        className="mb-8"
      >
        {cta}
      </Button>

      {/* Feature list */}
      <div className="border-line border-t pt-6">
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <svg
                className="text-primary mt-0.5 shrink-0"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-ink-secondary text-xs leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Pricing() {
  useScrollReveal()

  return (
    <>
      {/* ── Hero ── */}
      <section className="blueprint-grid border-line border-b pt-28 pb-16">
        <Container width="3xl" padding="default" className="text-center">
          <p className="text-ink-tertiary mb-4 font-mono text-xs tracking-widest uppercase" data-reveal data-reveal-delay="1">Pricing</p>
          <h1 className="text-ink mb-5 text-4xl leading-tight font-medium lg:text-5xl" data-reveal data-reveal-delay="2">
            Flat rate. Unlimited deployments.
            <br className="hidden md:block" /> No safety tax.
          </h1>
          <p className="text-ink-secondary mx-auto max-w-xl text-lg" data-reveal data-reveal-delay="3">
            One price per managed Lambda function. Every deployment, rollback, and risk scan is included.
            Charging extra for rollbacks would mean charging you for using the product correctly.
          </p>
        </Container>
      </section>

      {/* ── Plan cards ── */}
      <section className="border-line border-b py-16">
        <Container width="4xl" padding="default">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} {...plan} />
            ))}
          </div>

          {/* Enterprise block */}
          <div
            className="border-line bg-surface-alt/60 flex flex-col items-start justify-between gap-6 border p-8 sm:flex-row sm:items-center"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            <div>
              <p className="text-ink mb-1 text-sm font-semibold">Enterprise</p>
              <p className="text-ink-secondary max-w-md text-xs leading-relaxed">
                Unlimited Lambda functions at a flat annual rate. Predictable cost for procurement.
                Includes SSO, audit log export, private cloud deployment, SLA-backed support, and
                compliance documentation (SOC 2, ISO 27001). Priced per-function-under-management,
                not by credit volume.
              </p>
            </div>
            <a
              href="mailto:sales@deploytitan.com"
              className="border-line text-ink hover:border-primary/40 hover:text-primary inline-flex shrink-0 items-center gap-2 border px-5 py-3 text-sm font-medium transition-colors"
              style={{ borderRadius: '2px' }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Talk to sales
            </a>
          </div>

          <p className="text-ink-tertiary mt-6 text-center font-mono text-xs" data-reveal>
            14-day free trial on all plans · No credit card required · Cancel any time
          </p>
        </Container>
      </section>

      {/* ── What's always included ── */}
      <section className="border-line border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase">Always included</p>
            <p className="text-ink max-w-2xl text-2xl font-semibold leading-snug">
              One deployment = the full safety stack. Risk scan, health checks, and rollback are not add-ons.
            </p>
          </div>

          <dl className="border-line divide-line divide-y border-t" data-reveal>
            {INCLUDED_ALWAYS.map((item) => (
              <div key={item} className="flex items-center gap-4 py-5">
                <svg
                  className="text-primary shrink-0"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-ink-secondary text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Billing clarity ── */}
      <section className="border-line bg-surface-alt/40 border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase">How billing works</p>
            <h2 className="text-ink mb-2 text-2xl font-semibold">Simple enough to explain in one sentence.</h2>
          </div>

          <div
            className="border-line bg-surface border"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            <div className="border-line flex items-center gap-2 border-b px-6 py-4">
              <span className="bg-primary h-2 w-2" style={{ borderRadius: '1px' }} />
              <p className="text-ink-secondary font-mono text-xs">Billing model</p>
            </div>
            <div className="divide-line divide-y">
              {[
                {
                  label: 'What you pay for',
                  value: 'Lambda functions connected to DeployTitan (peak count per billing cycle)',
                },
                {
                  label: 'What is always free',
                  value: 'Deployments, rollbacks, risk scans, health checks, dashboard views, audit log reads',
                },
                {
                  label: 'Team members',
                  value: 'Unlimited on all plans',
                },
                {
                  label: 'Overage',
                  value: 'You are warned before you hit your function limit. No silent overcharges.',
                },
                {
                  label: 'Cancellation',
                  value: 'Cancel any time. Your running Lambdas keep running — DeployTitan never blocks traffic.',
                },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-start sm:gap-8">
                  <p className="text-ink w-44 shrink-0 text-sm font-medium">{row.label}</p>
                  <p className="text-ink-secondary text-sm leading-relaxed">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="border-line border-b py-24">
        <Container width="3xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-xs tracking-widest uppercase">FAQ</p>
            <h2 className="text-ink text-2xl font-semibold">Common questions</h2>
          </div>
          <div data-reveal>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Install strip ── */}
      <section className="border-line border-b py-16">
        <Container width="3xl" padding="default" className="text-center">
          <p className="text-ink-tertiary mb-4 font-mono text-xs tracking-widest uppercase" data-reveal>
            Get started now
          </p>
          <p className="text-ink mb-8 text-lg font-semibold" data-reveal>
            Install the CLI. Connect your first Lambda. Ship a canary in under 5 minutes.
          </p>
          <div className="mx-auto max-w-lg" data-reveal>
            <InstallTabs />
          </div>
        </Container>
      </section>
    </>
  )
}
