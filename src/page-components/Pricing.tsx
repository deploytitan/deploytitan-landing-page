'use client'

import React, { useState } from 'react'
import { WAITLIST_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Button } from '../components/shared/Button'

const PLANS = [
  {
    name: 'Starter',
    price: '$59',
    fit: 'For small teams shipping a few repos each sprint.',
    accent: 'outline' as const,
    projects: '1 project',
    services: '3 services or repos',
  },
  {
    name: 'Growth',
    price: '$199',
    fit: 'For growing teams coordinating several release surfaces at once.',
    accent: 'primary' as const,
    projects: '3 projects',
    services: '10 services or repos',
  },
  {
    name: 'Scale',
    price: '$599',
    fit: 'For teams running many services across several active projects.',
    accent: 'outline' as const,
    projects: '5 projects',
    services: '30 services or repos',
  },
]

const ALWAYS_INCLUDED = [
  'Release creation',
  'Approval messages in Slack',
  'Release posting to Slack',
  'Impact reports from Grafana',
  'All integrations included',
  'Unlimited deployments on every plan',
]

const BILLING_ROWS = [
  {
    label: 'How pricing works',
    value: 'Plans are priced per org. Service and repo limits apply across all projects in that org.',
  },
  {
    label: 'Extra usage',
    value: 'Add more usage without changing plans: $25 per extra service or repo, $10 per extra project.',
  },
  {
    label: 'What stays unlimited',
    value: 'Deployments are unlimited on every plan. You are never billed per deploy.',
  },
]

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Do we need to replace GitHub, Jenkins, or Grafana?',
    a: 'No. DeployTitan sits on top of the tools you already run. It gives the release one place to coordinate PRs, approvals, alerts, and post-deploy checks.',
  },
  {
    q: 'What integrations are available now?',
    a: 'Phase 1 supports GitHub, GitHub Actions, Jenkins, Grafana, and Slack.',
  },
  {
    q: 'How do we know if this is for us?',
    a: 'If release day means someone is watching CI, chasing approvals in Slack, and checking metrics by hand across multiple repos, you will know quickly whether DeployTitan removes that work.',
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
      className="bg-primary mt-[0.45em] block h-[7px] w-[7px] shrink-0"
      style={{ borderRadius: '1px' }}
      aria-hidden="true"
    />
  )
}

export default function Pricing() {
  const ref = useScrollReveal()

  return (
    <div ref={ref}>
      <section className="blueprint-grid border-line border-b pt-28 pb-16">
        <div className="mx-auto w-full max-w-[1560px] px-6 text-center lg:px-10">
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
            Priced for teams, not deployments.
          </h1>
          <p
            className="text-ink-secondary mx-auto mt-6 max-w-2xl text-lg leading-8"
            data-reveal
            data-reveal-delay="2"
          >
            Simple plans for sprint release coordination. Every plan includes the same core workflow,
            then scales by how many projects and services your org needs to manage.
          </p>

          <div
            className="border-line bg-line mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-px border sm:grid-cols-3"
            style={{ borderRadius: '12px' }}
            data-reveal
            data-reveal-delay="3"
          >
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 font-mono text-[10px] tracking-[0.12em] uppercase">
                Works with
              </p>
              <p className="text-ink text-sm leading-6">GitHub, GitHub Actions, Jenkins, Grafana, Slack</p>
            </div>
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 font-mono text-[10px] tracking-[0.12em] uppercase">
                Best fit
              </p>
              <p className="text-ink text-sm leading-6">Teams shipping releases across multiple repos every sprint</p>
            </div>
            <div className="bg-surface px-6 py-5 text-left">
              <p className="text-ink-tertiary mb-1 font-mono text-[10px] tracking-[0.12em] uppercase">
                Goal
              </p>
              <p className="text-ink text-sm leading-6">Replace manual release coordination with one clear workflow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-line border-b py-16">
        <div className="mx-auto w-full max-w-[1560px] px-6 lg:px-10">
          <div className="mb-10 max-w-2xl" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              Available now
            </p>
            <h2 className="text-ink text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.04em]">
              Pick the plan that matches how much release coordination your team is carrying.
            </h2>
          </div>

          <div
            className="border-line bg-line grid grid-cols-1 gap-px border xl:grid-cols-3"
            style={{ borderRadius: '12px' }}
            data-reveal
            data-reveal-delay="1"
          >
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={plan.name === 'Growth' ? 'bg-surface-alt/50 flex flex-col p-8' : 'bg-surface flex flex-col p-8'}
              >
                <div className="mb-8">
                  <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.18em] uppercase">
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-ink font-mono text-4xl font-semibold tracking-[-0.03em]">
                      {plan.price}
                    </span>
                    <span className="text-ink-secondary pb-1 text-sm">/mo</span>
                  </div>
                  <p className="text-ink-secondary mt-4 text-sm leading-7">{plan.fit}</p>
                </div>

                <Button
                  as="a"
                  href={WAITLIST_URL}
                  variant={plan.accent}
                  size="sm"
                  block
                  className="mb-8"
                >
                  Join waitlist
                </Button>

                <div className="border-line mt-auto border-t pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">{plan.projects}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">{plan.services}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FeatureDot />
                      <span className="text-ink-secondary text-sm leading-6">Per org, across all projects</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line border-b py-20">
        <div className="mx-auto w-full max-w-[1560px] px-6 lg:px-10">
          <div className="mb-10" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              Always included
            </p>
            <p className="text-ink max-w-xl text-2xl leading-snug font-semibold">
              Every plan keeps the release visible, coordinated, and unmetered.
            </p>
          </div>

          <div className="border-line rounded-[12px] border" data-reveal data-reveal-delay="1">
            {ALWAYS_INCLUDED.map((item) => (
              <div key={item} className="border-line flex items-center gap-4 border-b px-6 py-5 last:border-b-0">
                <FeatureDot />
                <span className="text-ink-secondary text-sm leading-7">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-line border-b py-20">
        <div className="mx-auto w-full max-w-[1560px] px-6 lg:px-10">
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
            style={{ borderRadius: '12px' }}
            data-reveal
            data-reveal-delay="1"
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
        </div>
      </section>

      <section className="border-line border-b py-24">
        <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-10">
          <div className="mb-10" data-reveal>
            <p className="text-ink-tertiary mb-3 font-mono text-[11px] tracking-[0.22em] uppercase">
              FAQ
            </p>
            <h2 className="text-ink text-2xl font-semibold">
              Questions teams ask before they join the waitlist
            </h2>
          </div>
          <div data-reveal data-reveal-delay="1">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
