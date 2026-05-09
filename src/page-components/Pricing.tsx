'use client'

import React, { useState } from 'react'
import { CONSOLE_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { InstallTabs } from '../components/shared/InstallTabs'
import { Container } from '../components/shared/Container'
import type { PolarProduct } from '../lib/polar'

// ── Feature credit matrix ─────────────────────────────────────────────────────

const FEATURE_MATRIX = [
  {
    category: 'Deployments',
    features: [
      {
        name: 'Standard deployment',
        credits: 1,
        description: 'Push a new version to any environment',
      },
      {
        name: 'Canary deployment',
        credits: 1,
        description: 'Gradual traffic shift with automatic promotion',
      },
      {
        name: 'Blue / green deployment',
        credits: 1,
        description: 'Zero-downtime swap with instant rollback',
      },
      {
        name: 'Multi-region deployment',
        credits: 1,
        description: 'Fan out to multiple regions in one operation',
      },
    ],
  },
  {
    category: 'Risk & Safety',
    features: [
      {
        name: 'Pre-deploy risk scan',
        credits: 1,
        description: 'Automated change-risk analysis before every push',
      },
      {
        name: 'Deployment health check',
        credits: 1,
        description: 'Post-deploy signal aggregation and scoring',
      },
      {
        name: 'Automatic rollback trigger',
        credits: 1,
        description: 'Detected regression kicks off instant rollback',
      },
      {
        name: 'Manual rollback',
        credits: 1,
        description: 'One-click revert to any previous stable version',
      },
    ],
  },
  {
    category: 'Observability',
    features: [
      {
        name: 'Deployment timeline event',
        credits: 1,
        description: 'Every deploy recorded with full audit trail',
      },
      {
        name: 'Diff & change report',
        credits: 1,
        description: 'Structured summary of what changed and why',
      },
      { name: 'SLO impact report', credits: 1, description: 'Post-deploy SLO drift analysis' },
    ],
  },
  {
    category: 'Integrations',
    features: [
      {
        name: 'CI/CD pipeline trigger',
        credits: 1,
        description: 'Kick off a pipeline via Titan from any workflow',
      },
      {
        name: 'Slack / PagerDuty alert',
        credits: 1,
        description: 'Outbound notification on deploy events',
      },
      {
        name: 'Webhook dispatch',
        credits: 1,
        description: 'Custom payload sent to your systems on any event',
      },
    ],
  },
]

// ── Value props ───────────────────────────────────────────────────────────────

const VALUE_PROPS = [
  {
    heading: 'Unlimited orgs, projects, and users.',
    body: 'Every seat, every org, every project is included: no caps, no per-user charges, no add-on tiers. Onboard your whole company. Credits are pooled into a single billing account that multiple members across multiple orgs and projects can draw from.',
  },
  {
    heading: 'One billing account. Shared across everything.',
    body: 'Your billing account is not tied to a single org or project. Multiple members can manage it, and usage from every org, every project, and every team draws from the same credit pool. One invoice. Full visibility.',
  },
  {
    heading: 'One credit = one deployable unit.',
    body: 'Credits are counted per instance: a container, a Lambda function, a monolith. Deploy 5 separate services and that is 5 credits. Roll back 2 microservices and that is 2 credits. But deploy a single Docker container that serves 50 routes, or a monolith Lambda, that is 1 credit. We count what actually gets deployed, not how many endpoints or paths it serves.',
  },
  {
    heading: 'Credits out? Your services keep running.',
    body: 'Exhausted your monthly credits? Everything already deployed stays live: we never touch your running services or block traffic. Only new deployments from the platform pause until your next billing cycle or a top-up. No hostage-taking, ever.',
  },
  {
    heading: 'Prepaid. No surprise invoices.',
    body: "You subscribe monthly and your credit allowance is granted upfront each cycle. Unused credits expire at month end; they do not roll over. If you need more mid-cycle, additional credits are available at your plan's overage rate. No hidden charges.",
  },
  {
    heading: 'Billing accounts are transferable.',
    body: 'We do not issue refunds, but billing accounts can be transferred to another owner or organisation at any time. If your team structure changes, your credits go with you.',
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How do credits work?',
    a: 'Every plan includes a monthly credit allowance granted at the start of each billing cycle. Each platform action (a deployment, a risk scan, a rollback, a webhook dispatch) consumes exactly 1 credit, regardless of which org, project, or user triggered it. Credits that are not used by month end expire; they do not roll over.',
  },
  {
    q: 'Are there really no limits on users, orgs, or projects?',
    a: 'None. You can create unlimited organisations, unlimited projects, and invite unlimited users. Everyone on your account draws from the same shared credit pool. We do not count seats, we do not charge per org, and we do not gate features behind team size.',
  },
  {
    q: 'How does the billing account work across multiple orgs?',
    a: 'A billing account is a single entity that can be managed by multiple members. All orgs and projects linked to that billing account share its credit balance. You can see a unified usage breakdown (by org, by project, by action type) in the billing dashboard.',
  },
  {
    q: 'What happens when I run out of credits mid-month?',
    a: "Your running services are never affected. Everything already deployed keeps receiving traffic normally. Only new deployments initiated from the DeployTitan platform are paused. Credits reset at the start of your next billing cycle, or you can purchase additional credits at your plan's overage rate to resume immediately.",
  },
  {
    q: 'Do unused credits roll over?',
    a: 'No. Unused credits expire at the end of each monthly billing cycle. An active subscription must be maintained to receive your credit grant each month. If you consistently have leftover credits, a smaller plan may be a better fit; the dashboard will surface this.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We do not issue refunds for unused credits. However, billing accounts are fully transferable: if your team structure changes or you want to hand the account to another owner or organisation, you can do that and the remaining credit balance transfers with it.',
  },
  {
    q: 'Why not per-seat pricing?',
    a: 'Seat-based pricing punishes team growth. A deployment triggered by a senior engineer costs the same infrastructure resources as one triggered by a contractor. We charge for what actually runs on our platform, not for who can log in.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes: upgrade or downgrade at any time. Your credit balance adjusts immediately on upgrade. There are no lock-in periods on monthly plans.',
  },
  {
    q: 'Do you offer discounts for startups or open source projects?',
    a: (
      <>
        Yes. Email us at{' '}
        <a href="mailto:support@deploytitan.com" className="text-primary hover:underline">
          support@deploytitan.com
        </a>{' '}
        and we&apos;ll sort you out.
      </>
    ),
  },
]

// ── Static fallback plans (shown when Polar returns no products) ──────────────

const FALLBACK_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individual engineers and small teams getting started with safer deployments.',
    isHighlighted: false,
    isFree: false,
    isCustom: false,
    credits: 250,
    monthlyAmount: 1000,
    overageCentsPerCredit: 4.0,
    checkoutUrl: `${CONSOLE_URL}/login`,
    cta: 'Get started',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing engineering teams shipping multiple times a day.',
    isHighlighted: true,
    isFree: false,
    isCustom: false,
    credits: 1500,
    monthlyAmount: 3900,
    overageCentsPerCredit: 2.6,
    checkoutUrl: `${CONSOLE_URL}/login`,
    cta: 'Get started',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatCents(cents: number): string {
  return `$${Math.round(cents / 100)}`
}

function formatCredits(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-line border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
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
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      {open && <p className="text-ink-secondary pb-5 text-sm leading-relaxed">{a}</p>}
    </div>
  )
}

// ── PlanCard ──────────────────────────────────────────────────────────────────

interface PlanCardProps {
  name: string
  description: string
  isHighlighted: boolean
  isFree: boolean
  credits: number | null
  monthlyAmount: number | null // cents
  overageCentsPerCredit: number | null
  checkoutUrl: string
  cta: string
}

function PlanCard({
  name,
  description,
  isHighlighted,
  isFree,
  credits,
  monthlyAmount,
  overageCentsPerCredit,
  checkoutUrl,
  cta,
}: PlanCardProps) {
  const isMail = checkoutUrl.startsWith('mailto:')

  return (
    <div
      className={`sharp-card flex flex-col border p-8 ${
        isHighlighted ? 'border-primary/40 bg-primary/[0.03]' : 'border-line bg-surface'
      }`}
      data-reveal
    >
      {isHighlighted && (
        <p className="text-primary border-primary/30 mb-4 self-start border px-2 py-1 font-mono text-[10px] tracking-widest uppercase">
          Most popular
        </p>
      )}

      <p className="text-ink mb-1 text-sm font-semibold">{name}</p>
      <p className="text-ink-secondary mb-6 text-xs leading-relaxed">{description}</p>

      {/* Price */}
      <div className="mb-1">
        {isFree || monthlyAmount == null ? (
          <p className="text-ink text-3xl font-bold">Free</p>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-ink text-3xl font-bold">{formatCents(monthlyAmount)}</span>
            <span className="text-ink-secondary text-sm">/ mo</span>
          </div>
        )}
      </div>

      {/* Credits badge */}
      {credits != null && (
        <p className="text-primary mb-1 font-mono text-xs">
          {formatCredits(credits)} credits / month included
        </p>
      )}

      {/* Overage rate */}
      {overageCentsPerCredit != null && (
        <div className="border-line mb-6 mt-3 border-t pt-4">
          <p className="text-ink-secondary mb-0.5 font-mono text-xs">Additional credits</p>
          <p className="text-ink font-mono text-sm font-semibold">
            ${(overageCentsPerCredit / 100).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}{' '}
            <span className="text-ink-secondary font-normal">/ credit</span>
          </p>
        </div>
      )}
      {overageCentsPerCredit == null && credits == null && <div className="mb-6" />}
      {overageCentsPerCredit == null && credits != null && <div className="mb-6" />}

      <a
        href={checkoutUrl}
        target={isMail ? '_self' : '_blank'}
        rel={isMail ? undefined : 'noopener noreferrer'}
        className={`mt-auto px-4 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isHighlighted
            ? 'bg-primary text-ink hover:bg-primary-light'
            : 'border-line text-ink/80 hover:border-primary/30 hover:text-ink border'
        }`}
        style={{ borderRadius: '2px' }}
      >
        {cta}
      </a>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  polarProducts: PolarProduct[]
}

export default function Pricing({ polarProducts }: Props) {
  useScrollReveal()

  // Build plan cards from Polar data (excluding Enterprise/custom),
  // sorted smallest (free/lowest price) to largest, or fall back to static.
  const plans: PlanCardProps[] = (() => {
    const source =
      polarProducts.length > 0
        ? polarProducts
            .filter((p) => !p.isCustom)
            .map((p) => ({
              id: p.id,
              name: p.name,
              description: p.description ?? '',
              isHighlighted: p.isHighlighted,
              isFree: p.isFree,
              credits: p.credits,
              monthlyAmount: p.monthlyPrice?.amount ?? null,
              overageCentsPerCredit: p.overageCentsPerCredit ?? null,
              checkoutUrl: p.checkoutUrl,
              cta: p.isFree ? 'Get started free' : 'Get started',
            }))
        : FALLBACK_PLANS

    // Sort: free first, then ascending monthly price
    return [...source].sort((a, b) => {
      if (a.isFree && !b.isFree) return -1
      if (!a.isFree && b.isFree) return 1
      return (a.monthlyAmount ?? 0) - (b.monthlyAmount ?? 0)
    })
  })()

  return (
    <>
      {/* ── Hero ── */}
      <section className="blueprint-grid border-line border-b pt-28 pb-16">
        <Container width="3xl" padding="default" className="text-center" data-reveal>
          <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">Pricing</p>
          <h1 className="text-ink mb-5 text-4xl leading-tight font-semibold lg:text-5xl">
            Pay for what you deploy.
            <br className="hidden md:block" /> Not for who you hire.
          </h1>
          <p className="text-ink-secondary mx-auto max-w-xl text-lg">
            Credits-based billing. Prepaid. No per-seat charges. No surprise invoices. Unlimited
            users, orgs, and projects on every plan. Every platform action costs exactly 1 credit:
            deployments, rollbacks, risk scans, all of it.
          </p>
        </Container>
      </section>

      {/* ── Plan cards ── */}
      <section className="border-line border-b py-16">
        <Container width="4xl" padding="default">
          <div className="mb-10 text-center" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">Plans</p>
            <h2 className="text-ink text-2xl font-semibold">Simple, predictable plans</h2>
            <p className="text-ink-secondary mt-2 text-sm">
              Credits are shared across your whole team: no seat counting required.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
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
                Custom credit volumes, dedicated support SLAs, SSO, audit logs, private cloud
                deployment, and compliance documentation (SOC 2, ISO 27001). Pricing tailored to
                your scale.
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

          <p className="text-ink-quaternary mt-6 text-center font-mono text-xs">
            Credits shared across unlimited orgs, projects &amp; users · Unused credits expire
            monthly · Active subscription required
          </p>
        </Container>
      </section>

      {/* ── Value props ── */}
      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              How billing works
            </p>
            <p className="text-ink max-w-2xl text-2xl font-semibold leading-snug">
              Credits are the only unit of measure. Everything else, users, orgs, projects, seats,
              is unlimited and free.
            </p>
          </div>

          <dl className="border-line divide-line divide-y border-t" data-reveal>
            {VALUE_PROPS.map((vp, i) => (
              <div
                key={vp.heading}
                className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[2fr_3fr] md:gap-12"
              >
                <dt
                  className={`text-ink text-sm leading-snug ${i % 2 === 0 ? 'font-semibold' : 'font-medium'}`}
                >
                  {vp.heading}
                </dt>
                <dd className="text-ink-secondary text-sm leading-relaxed">{vp.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Credit calculator example ── */}
      <section className="border-line bg-surface-alt/40 border-b py-20">
        <Container width="4xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              Is Starter enough?
            </p>
            <h2 className="text-ink mb-2 text-2xl font-semibold">
              250 credits goes further than you think.
            </h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              We sized the Starter plan so that the vast majority of teams will never need to
              upgrade. Here is a realistic month for a small engineering team: 5 services, deployed
              once every working day, with a risk scan on every push.
            </p>
          </div>

          {/* Example scenario */}
          <div
            className="border-line bg-surface border"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            {/* Header */}
            <div className="border-line flex items-center gap-2 border-b px-6 py-4">
              <span className="bg-primary h-2 w-2" style={{ borderRadius: '1px' }} />
              <p className="text-ink-secondary font-mono text-xs">
                Scenario: 5 services, 1 deploy / day, every working day
              </p>
            </div>

            {/* Line items */}
            <div className="divide-line divide-y">
              {[
                {
                  action: 'Deployments',
                  calc: '5 services × 1× / day × 22 working days',
                  credits: 110,
                },
                {
                  action: 'Pre-deploy risk scans',
                  calc: '1 scan per deployment: 5 services × 1× / day × 22 days',
                  credits: 110,
                },
                {
                  action: 'Rollbacks, week 1',
                  calc: '2 services rolled back after a bad release',
                  credits: 2,
                },
                {
                  action: 'Rollbacks, week 2',
                  calc: '1 service rolled back mid-deploy',
                  credits: 1,
                },
                {
                  action: 'Rollbacks, week 3',
                  calc: '3 services rolled back after a config change went wrong',
                  credits: 3,
                },
                {
                  action: 'Rollbacks, week 4',
                  calc: '2 services rolled back during hotfix gone sideways',
                  credits: 2,
                },
              ].map((row) => (
                <div key={row.action} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="text-ink text-sm font-medium">{row.action}</p>
                    <p className="text-ink-tertiary mt-0.5 text-xs">{row.calc}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-ink font-mono text-sm font-semibold">{row.credits}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-line bg-surface-alt/60 flex items-center justify-between border-t px-6 py-4">
              <div>
                <p className="text-ink text-sm font-semibold">Total credits used</p>
                <p className="text-ink-tertiary mt-0.5 text-xs">Out of 250 included in Starter</p>
              </div>
              <div className="text-right">
                <p className="text-ink font-mono text-2xl font-bold">228</p>
                <p className="text-primary mt-0.5 font-mono text-xs">22 credits remaining</p>
              </div>
            </div>
          </div>

          <p className="text-ink-quaternary mt-5 text-center font-mono text-xs" data-reveal>
            Each deployable unit (container, Lambda, monolith) counts as 1 credit per action:
            regardless of how many routes, endpoints, or paths it serves. Browsing dashboards,
            viewing history, and reading reports is always free.
          </p>
        </Container>
      </section>

      {/* ── Feature credit matrix ── */}
      <section className="border-line border-b py-20">
        <Container width="5xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
              What costs a credit
            </p>
            <h2 className="text-ink mb-2 text-2xl font-semibold">Every action. One credit.</h2>
            <p className="text-ink-secondary max-w-xl text-sm">
              Credits are counted per deployable unit: each container, Lambda function, or
              standalone instance is one credit. A single monolith or single-container service is
              always 1 credit regardless of how many routes or endpoints it serves. No environment
              surcharges, no region premiums.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {FEATURE_MATRIX.map((cat) => (
              <div key={cat.category} data-reveal>
                <p className="text-primary border-line mb-4 border-b pb-2 font-mono text-[10px] tracking-widest uppercase">
                  {cat.category}
                </p>
                <ul className="flex flex-col gap-3">
                  {cat.features.map((f) => (
                    <li key={f.name} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-ink text-sm font-medium">{f.name}</p>
                        <p className="text-ink-tertiary mt-0.5 text-xs">{f.description}</p>
                      </div>
                      <span className="text-primary border-primary/30 mt-0.5 shrink-0 border px-2 py-0.5 font-mono text-[10px]">
                        1 credit
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-line bg-surface-alt/40 mt-10 flex items-start gap-3 border p-5"
            style={{ borderRadius: '2px' }}
            data-reveal
          >
            <svg
              className="text-primary mt-0.5 shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-ink-secondary text-xs leading-relaxed">
              <span className="text-ink font-medium">Reading data is always free.</span> Browsing
              the dashboard, viewing deployment history, audit logs, and reports never consumes
              credits. Credits are only deducted when you initiate an action on the platform.
            </p>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="border-line border-b py-24">
        <Container width="3xl" padding="default">
          <div className="mb-10" data-reveal>
            <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">FAQ</p>
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
          <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase" data-reveal>
            Get started now
          </p>
          <p className="text-ink mb-8 text-lg font-semibold" data-reveal>
            Install the CLI and try it for free in under 2 minutes.
          </p>
          <div className="mx-auto max-w-lg" data-reveal>
            <InstallTabs />
          </div>
        </Container>
      </section>
    </>
  )
}
