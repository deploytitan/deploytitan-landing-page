'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../shared/ThemeToggle'
import { CONSOLE_URL, STEALTH_PRODUCTS } from '@/lib/env'
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
  { label: 'Instant Rollback', route: '/solutions/instant-rollback' },
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
    <div className="border-line border-b">
      <button
        onClick={() => setOpen(!open)}
        className="text-ink flex w-full items-center justify-between px-6 py-4 text-base font-medium"
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
      className="bg-surface fixed right-0 bottom-0 left-0 z-40 flex flex-col overflow-y-auto"
      style={{ top: topOffset }}
    >
      {/* Products group */}
      <AccordionGroup label="Products">
        {productLinks.map((l) => (
          <Link
            key={l.route}
            href={l.route}
            onClick={onClose}
            className="hover:bg-surface-alt flex items-center gap-2 px-8 py-3 transition-colors"
          >
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-ink text-sm font-medium">{l.label}</span>
              <span className="text-ink-tertiary text-xs">{l.sub}</span>
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
            className="text-ink-secondary hover:text-ink hover:bg-surface-alt block px-8 py-3 text-sm transition-colors"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/solutions"
          onClick={onClose}
          className="text-primary hover:bg-surface-alt block px-8 py-3 text-sm font-medium transition-colors"
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
            className="text-ink-secondary hover:text-ink hover:bg-surface-alt block px-8 py-3 text-sm transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </AccordionGroup>

      {/* Flat links */}
      {[
        // { label: 'How it works', route: '/how-it-works' },
        { label: 'Pricing', route: '/pricing' },
        { label: 'Blog', route: '/blog' },
        { label: 'My Journey', route: '/journey' },
      ].map((l) => (
        <Link
          key={l.route}
          href={l.route}
          onClick={onClose}
          className="text-ink border-line hover:bg-surface-alt block border-b px-6 py-4 text-base font-medium transition-colors"
        >
          {l.label}
        </Link>
      ))}

      {/* Auth buttons */}
      <div className="border-line mt-auto mb-4 flex flex-col gap-3 border-t px-6 py-8 md:mb-[unset]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
            Appearance
          </span>
          <ThemeToggle />
        </div>
        <a
          href={`${CONSOLE_URL}/login`}
          onClick={onClose}
          className="bg-ink text-surface inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] active:scale-[0.97]"
          style={{ borderRadius: '2px' }}
        >
          Get started
        </a>
      </div>
    </div>
  )
}
