import React, { useState } from 'react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useScrollReveal } from '../utils'
import { MidCTA } from '../components/MidCTA'
import { InstallTabs } from '../components/shared/InstallTabs'

const APP_URL = import.meta.env.VITE_APP_URL as string || 'https://app.deploytitan.com'

// ── Plan data ─────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For individual engineers and small teams evaluating progressive delivery.',
    cta: 'Start for free',
    ctaHref: `${APP_URL}/signup`,
    highlight: false,
    features: [
      'Up to 3 services',
      '2 team members',
      'Canary & blue/green strategies',
      'Basic rollback (manual trigger)',
      '7-day deploy history',
      'Community support',
      'GitHub Actions integration',
    ],
    missing: [
      'Titan Shield (multi-cloud failover)',
      'Titan Sentinel risk scoring',
      'Policy-as-code (HCL)',
      'SSO / SAML',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    monthlyPrice: 149,
    annualPrice: 119,
    description: 'For growing engineering teams that ship multiple times a day.',
    cta: 'Start 14-day trial',
    ctaHref: `${APP_URL}/signup?plan=team`,
    highlight: true,
    features: [
      'Unlimited services',
      'Up to 25 team members',
      'All rollout strategies incl. cohort',
      'Auto-rollback on SLO breach',
      'Titan Shield — up to 3 clouds',
      'Titan Sentinel risk scoring',
      '90-day deploy history',
      'Policy-as-code (HCL / YAML)',
      'Datadog, Prometheus, PagerDuty',
      'Email + Slack support (next business day)',
    ],
    missing: [
      'Unlimited team members',
      'SSO / SAML',
      'Custom SLO policies',
      'Dedicated SRE onboarding',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For large orgs with custom compliance, security, and scale requirements.',
    cta: 'Contact sales',
    ctaHref: 'mailto:sales@deploytitan.com',
    highlight: false,
    features: [
      'Everything in Team',
      'Unlimited team members',
      'Unlimited clouds & regions',
      'SSO / SAML / SCIM',
      'Custom SLO policies',
      'Private cloud / on-prem deployment',
      'Custom data retention',
      'Dedicated SRE onboarding',
      'SLA with uptime guarantee',
      'Audit log export (S3 / GCS)',
      'Priority 24/7 support',
    ],
    missing: [],
  },
]

// ── Comparison matrix ─────────────────────────────────────────────────────────

const MATRIX = [
  {
    category: 'Deployments',
    rows: [
      { feature: 'Services', starter: '3', team: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'Canary / blue-green', starter: true, team: true, enterprise: true },
      { feature: 'Cohort targeting', starter: false, team: true, enterprise: true },
      { feature: 'Auto-rollback on SLO breach', starter: false, team: true, enterprise: true },
      { feature: 'Policy-as-code (HCL / YAML)', starter: false, team: true, enterprise: true },
      { feature: 'Deploy history', starter: '7 days', team: '90 days', enterprise: 'Custom' },
    ],
  },
  {
    category: 'Titan Shield',
    rows: [
      { feature: 'Multi-cloud failover', starter: false, team: '3 clouds', enterprise: 'Unlimited' },
      { feature: 'Geo-aware routing', starter: false, team: true, enterprise: true },
      { feature: 'DR drill mode', starter: false, team: true, enterprise: true },
    ],
  },
  {
    category: 'Titan Sentinel',
    rows: [
      { feature: 'Pre-deploy risk scoring', starter: false, team: true, enterprise: true },
      { feature: 'Blast-radius analysis', starter: false, team: true, enterprise: true },
      { feature: 'SLO guardrail blocks', starter: false, team: true, enterprise: true },
      { feature: 'GitHub PR annotations', starter: false, team: true, enterprise: true },
    ],
  },
  {
    category: 'Security & compliance',
    rows: [
      { feature: 'SSO / SAML', starter: false, team: false, enterprise: true },
      { feature: 'SCIM provisioning', starter: false, team: false, enterprise: true },
      { feature: 'Audit log export', starter: false, team: false, enterprise: true },
      { feature: 'Private cloud / on-prem', starter: false, team: false, enterprise: true },
    ],
  },
  {
    category: 'Support',
    rows: [
      { feature: 'Community forums', starter: true, team: true, enterprise: true },
      { feature: 'Email + Slack (next biz day)', starter: false, team: true, enterprise: true },
      { feature: 'Priority 24/7', starter: false, team: false, enterprise: true },
      { feature: 'Dedicated SRE onboarding', starter: false, team: false, enterprise: true },
    ],
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes — upgrade or downgrade at any time. Annual plans are pro-rated on upgrade and credited on downgrade.',
  },
  {
    q: 'What counts as a "service"?',
    a: 'Any independently deployable unit you register with dt init. Microservices, monolith, Lambda function — each dt init counts as one service.',
  },
  {
    q: 'Does the free tier ever expire?',
    a: 'No. Starter is free forever for up to 3 services and 2 seats. No credit card required to start.',
  },
  {
    q: 'Is there a free trial for Team?',
    a: 'Yes — 14 days, full Team features, no credit card required. After 14 days you\'re downgraded to Starter unless you add a payment method.',
  },
  {
    q: 'Do you offer discounts for startups or open source projects?',
    a: 'Yes. Email us at startups@deploytitan.com or opensource@deploytitan.com and we\'ll sort you out.',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function Check({ ok }: { ok: boolean | string }) {
  if (typeof ok === 'string') return <span className="text-xs text-ink-secondary">{ok}</span>
  return ok
    ? <svg className="text-primary shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    : <svg className="text-ink/20 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left text-sm font-medium text-ink hover:text-primary transition-colors"
      >
        {q}
        <svg
          className={`shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      {open && <p className="pb-5 text-sm text-ink-secondary leading-relaxed">{a}</p>}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Pricing() {
  useDocumentMeta(
    'Pricing — DeployTitan',
    'Free for individuals. Flat-rate Team plan. Enterprise with SSO, on-prem, and dedicated support. No per-seat surprises.'
  )
  useScrollReveal()
  const [annual, setAnnual] = useState(true)

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-16 border-b border-line">
        <div className="max-w-3xl mx-auto px-6 text-center" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Pricing</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Simple pricing.<br className="hidden md:block" /> No per-seat surprises.
          </h1>
          <p className="text-lg text-ink-secondary mb-8">
            Start free. Scale to Team. Bring your whole org on Enterprise.
          </p>
          {/* Annual / monthly toggle */}
          <div className="inline-flex items-center gap-3 border border-line p-1" style={{ borderRadius: '2px' }}>
              <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${!annual ? 'bg-surface-alt text-ink' : 'text-ink-tertiary hover:text-ink/70'}`}
              style={{ borderRadius: '2px' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors flex items-center gap-2 ${annual ? 'bg-surface-alt text-ink' : 'text-ink-tertiary hover:text-ink/70'}`}
              style={{ borderRadius: '2px' }}
            >
              Annual
              <span className="text-[10px] font-mono text-primary border border-primary/30 px-1.5 py-0.5">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-16 border-b border-line">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`sharp-card flex flex-col p-7 border ${plan.highlight ? 'border-primary/40 bg-primary/[0.03]' : 'border-line bg-surface'}`}
                data-reveal
              >
                {plan.highlight && (
                  <p className="text-[10px] font-mono tracking-widest uppercase text-primary border border-primary/30 px-2 py-1 self-start mb-4">Most popular</p>
                )}
                <p className="text-sm font-semibold text-ink mb-1">{plan.name}</p>
                <p className="text-xs text-ink-secondary mb-6 leading-relaxed">{plan.description}</p>
                {/* Price */}
                <div className="mb-6">
                  {plan.monthlyPrice === null ? (
                    <p className="text-3xl font-bold text-ink">Custom</p>
                  ) : plan.monthlyPrice === 0 ? (
                    <p className="text-3xl font-bold text-ink">Free</p>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-ink">${annual ? plan.annualPrice : plan.monthlyPrice}</span>
                      <span className="text-sm text-ink-secondary ml-1">/ mo{annual ? ', billed annually' : ''}</span>
                    </div>
                  )}
                </div>
                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith('mailto') ? '_self' : '_self'}
                  className={`text-sm font-semibold px-4 py-2.5 text-center transition-colors mb-7 ${
                    plan.highlight
                      ? 'bg-primary text-ink hover:bg-primary-light'
                      : 'border border-line text-ink/80 hover:border-primary/30 hover:text-ink'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  {plan.cta}
                </a>
                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                      <svg className="text-primary shrink-0 mt-px" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/25">
                      <svg className="shrink-0 mt-px" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section className="py-24 border-b border-line overflow-x-auto">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10" data-reveal>
            <h2 className="text-2xl font-semibold text-ink mb-2">Full feature comparison</h2>
            <p className="text-ink-secondary text-sm">Everything side-by-side so there are no surprises.</p>
          </div>
          <table className="w-full text-sm border-collapse" data-reveal>
            <thead>
              <tr className="border-b border-line">
                <th className="text-left pb-4 text-ink-tertiary font-normal w-1/2">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.id} className={`pb-4 text-center font-semibold ${p.highlight ? 'text-primary' : 'text-ink'}`}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((section) => (
                <React.Fragment key={section.category}>
                  <tr className="border-t border-line/60">
                    <td colSpan={4} className="pt-5 pb-2 text-[11px] font-mono tracking-widest uppercase text-ink-quaternary">{section.category}</td>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-line/30 hover:bg-surface-alt/40 transition-colors">
                      <td className="py-3 text-sm text-ink-secondary">{row.feature}</td>
                      <td className="py-3 text-center"><div className="flex justify-center"><Check ok={row.starter} /></div></td>
                      <td className="py-3 text-center"><div className="flex justify-center"><Check ok={row.team} /></div></td>
                      <td className="py-3 text-center"><div className="flex justify-center"><Check ok={row.enterprise} /></div></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-b border-line">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">FAQ</p>
            <h2 className="text-2xl font-semibold text-ink">Common questions</h2>
          </div>
          <div data-reveal>
            {FAQS.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* Install strip */}
      <section className="py-16 border-b border-line">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4" data-reveal>Get started now</p>
          <p className="text-ink font-semibold mb-8 text-lg" data-reveal>Install the CLI and try it for free in under 2 minutes.</p>
          <div className="max-w-lg mx-auto" data-reveal>
            <InstallTabs />
          </div>
        </div>
      </section>

      <MidCTA
        heading="Not sure which plan is right for you?"
        subheading="Talk to an engineer. We'll walk you through the right setup for your stack and team size — no sales pressure."
        primaryLabel="Contact sales"
        primaryHref="mailto:sales@deploytitan.com"
        secondaryLabel="Start free trial"
        secondaryHref={`${APP_URL}/signup`}
      />
    </>
  )
}
