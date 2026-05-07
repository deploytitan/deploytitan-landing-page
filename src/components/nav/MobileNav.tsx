'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../shared/ThemeToggle'
import { APP_URL, STEALTH_PRODUCTS } from '@/lib/env'
import { RoadmapBadge } from '../shared/RoadmapBadge'

const ALL_PRODUCT_LINKS = [
  {
    label: 'Titan Foresight',
    sub: 'Pre-merge risk scoring',
    route: '/products/titan-foresight',
  },
  {
    label: 'Titan Rollout',
    sub: 'Progressive deployments & SLO gating',
    route: '/products/titan-rollout',
  },
  {
    label: 'Titan Shield',
    sub: 'Multi-cloud failover & resilience',
    route: '/products/titan-shield',
    stealth: true,
  },
  {
    label: 'Titan Phoenix',
    sub: 'SLO-triggered scoped rollback',
    route: '/products/titan-phoenix',
  },
  {
    label: 'Titan Ledger',
    sub: 'DORA metrics — no agents',
    route: '/products/titan-ledger',
    stealth: true,
  },
  {
    label: 'Titan Insight',
    sub: 'Outcome intelligence (coming soon)',
    route: '/products/titan-insight',
    preview: true,
    stealth: true,
  },
  {
    label: 'Titan Sandbox',
    sub: 'Branch environments (coming soon)',
    route: '/products/titan-sandbox',
    preview: true,
    stealth: true,
  },
]

const productLinks = STEALTH_PRODUCTS
  ? ALL_PRODUCT_LINKS.filter((l) => !l.stealth)
  : ALL_PRODUCT_LINKS

const solutionLinks = [
  { label: 'Progressive Delivery', route: '/solutions/progressive-delivery' },
  { label: 'Multi-Cloud Resilience', route: '/solutions/multi-cloud-resilience' },
  { label: 'Deploy Risk Intelligence', route: '/solutions/risk-intelligence' },
  { label: 'Platform Engineering', route: '/solutions/platform-engineering' },
]

const forLinks = [
  { label: 'For SREs', route: '/for/sre' },
  { label: 'For DevOps Engineers', route: '/for/devops' },
  { label: 'For CTOs', route: '/for/cto' },
]

interface Props {
  onClose: () => void
  barHeight?: number
}

function AccordionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-ink"
      >
        {label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-tertiary transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  )
}

export function MobileNav({ onClose, barHeight = 0 }: Props) {
  // Nav height is h-20 (80px). Offset overlay so it starts below nav + announcement bar.
  const topOffset = barHeight + 80
  return (
    <div
      className="fixed left-0 right-0 bottom-0 bg-surface z-40 flex flex-col overflow-y-auto"
      style={{ top: topOffset }}
    >
      {/* Products group */}
      <AccordionGroup label="Products">
        {productLinks.map((l) => (
          <Link
            key={l.route}
            href={l.route}
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-3 hover:bg-surface-alt transition-colors"
          >
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-sm font-medium text-ink">{l.label}</span>
              <span className="text-xs text-ink-tertiary">{l.sub}</span>
            </div>
            {l.preview && <RoadmapBadge variant="roadmap" />}
          </Link>
        ))}
      </AccordionGroup>

      {/* Solutions group */}
      <AccordionGroup label="Solutions">
        {solutionLinks.map((l) => (
          <Link
            key={l.route}
            href={l.route}
            onClick={onClose}
            className="block px-8 py-3 text-sm text-ink-secondary hover:text-ink hover:bg-surface-alt transition-colors"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/solutions"
          onClick={onClose}
          className="block px-8 py-3 text-sm text-primary font-medium hover:bg-surface-alt transition-colors"
        >
          View all solutions →
        </Link>
      </AccordionGroup>

      {/* For teams group */}
      <AccordionGroup label="For Teams">
        {forLinks.map((l) => (
          <Link
            key={l.route}
            href={l.route}
            onClick={onClose}
            className="block px-8 py-3 text-sm text-ink-secondary hover:text-ink hover:bg-surface-alt transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </AccordionGroup>

      {/* Flat links */}
      {[
        { label: 'How it works', route: '/how-it-works' },
        { label: 'Pricing', route: '/pricing' },
        { label: 'Customers', route: '/customers' },
        { label: 'Docs', route: '/docs' },
      ].map((l) => (
        <Link
          key={l.route}
          href={l.route}
          onClick={onClose}
          className="block px-6 py-4 text-base font-medium text-ink border-b border-line hover:bg-surface-alt transition-colors"
        >
          {l.label}
        </Link>
      ))}

      {/* Auth buttons */}
      <div className="mt-auto px-6 py-8 flex flex-col gap-3 border-t border-line">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Appearance
          </span>
          <ThemeToggle />
        </div>
        <a
          href={`${APP_URL}/signin`}
          onClick={onClose}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-line text-ink-secondary text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
          style={{ borderRadius: '2px' }}
        >
          Sign in
        </a>
        <Link
          href="/early-access"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-ink text-surface text-sm font-medium hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] transition-all active:scale-[0.97]"
          style={{ borderRadius: '2px' }}
        >
          Get started
        </Link>
      </div>
    </div>
  )
}
