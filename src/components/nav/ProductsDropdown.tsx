'use client'

import Link from 'next/link'
import { RoadmapBadge } from '../shared/RoadmapBadge'
import { STEALTH_PRODUCTS } from '@/lib/env'

const ALL_LIVE_PRODUCTS = [
  {
    route: '/products/titan-foresight',
    eyebrow: 'Titan Foresight',
    tagline: 'One explained risk score per PR — before traffic shifts.',
    bullets: ['Dependency graph analysis', 'Change velocity signals', 'Safe / review / hold score'],
    badge: null,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    route: '/products/titan-rollout',
    eyebrow: 'Titan Rollout',
    tagline: 'Cohort rollouts gated on real SLO signals.',
    bullets: ['Canary & cohort rollouts', 'Versioned releases', 'Auto-pause on threshold breach'],
    badge: null,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    route: '/products/titan-shield',
    eyebrow: 'Titan Shield',
    tagline: 'Multi-cloud failover before your users notice.',
    bullets: [
      'AWS / GCP / Azure failover',
      'Zero-latency in-memory routing',
      'Geo-aware failover policies',
    ],
    badge: null,
    stealth: true,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    route: '/products/titan-phoenix',
    eyebrow: 'Titan Phoenix',
    tagline: 'Undo a bad release in seconds — only where it broke.',
    bullets: ['SLO-triggered rollback', 'Scoped to affected cohort', 'Policy-as-code'],
    badge: null,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    route: '/products/titan-ledger',
    eyebrow: 'Titan Ledger',
    tagline: 'DORA metrics measured automatically from your CI/CD.',
    bullets: [
      'Zero-instrumentation events',
      'DORA metrics out of the box',
      'Team-level scorecards',
    ],
    badge: null,
    stealth: true,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

const LIVE_PRODUCTS = STEALTH_PRODUCTS
  ? ALL_LIVE_PRODUCTS.filter((p) => !p.stealth)
  : ALL_LIVE_PRODUCTS

const ALL_COMING_SOON = [
  {
    route: '/products/titan-insight',
    eyebrow: 'Titan Insight',
    tagline: 'Deploy-to-metric correlation & outcome intelligence.',
    stealth: true,
  },
  {
    route: '/products/titan-sandbox',
    eyebrow: 'Titan Sandbox',
    tagline: 'Production-shaped environments per branch.',
    stealth: true,
  },
]

const COMING_SOON = STEALTH_PRODUCTS ? ALL_COMING_SOON.filter((p) => !p.stealth) : ALL_COMING_SOON

interface Props {
  onClose: () => void
}

export function ProductsDropdown({ onClose }: Props) {
  return (
    <div
      className="bg-surface border-line absolute top-full z-50 mt-2 border shadow-[0_8px_32px_rgba(8,5,3,0.08)]"
      style={{ borderRadius: '2px', minWidth: '900px' }}
    >
      {/* Top bar */}
      <div className="border-line-subtle flex items-center justify-between border-b px-6 pt-5 pb-3">
        <span className="text-ink-quaternary font-mono text-[10px] tracking-widest uppercase">
          Products
        </span>
        <span className="text-ink-quaternary text-xs">
          Detect · Deliver · Defend · Recover · Measure
        </span>
      </div>

      {/* Live products */}
      <div
        className={`divide-line grid divide-x`}
        style={{ gridTemplateColumns: `repeat(${LIVE_PRODUCTS.length}, minmax(0, 1fr))` }}
      >
        {LIVE_PRODUCTS.map((p) => (
          <Link
            key={p.route}
            href={p.route}
            onClick={onClose}
            className="group hover:bg-surface-alt flex flex-col gap-3 px-4 py-5 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-primary/70 group-hover:text-primary transition-colors">
                  {p.icon}
                </span>
                <span className="font-display text-ink group-hover:text-primary-dark text-sm font-semibold transition-colors">
                  {p.eyebrow}
                </span>
              </div>
            </div>
            <span className="text-ink-tertiary text-xs leading-relaxed">{p.tagline}</span>
            <ul className="border-line-subtle mt-auto flex flex-col gap-1.5 border-t pt-2">
              {p.bullets.map((b) => (
                <li key={b} className="text-ink-secondary flex items-center gap-2 text-xs">
                  <span className="bg-primary/50 h-1 w-1 shrink-0 rounded-full" />
                  {b}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>

      {/* Coming soon strip */}
      <div className="border-line-subtle bg-surface-alt/30 flex items-center gap-6 border-t px-6 py-3">
        <span className="text-ink-quaternary shrink-0 font-mono text-[10px] tracking-widest uppercase">
          More products coming soon
        </span>
        {COMING_SOON.map((p) => (
          <Link
            key={p.route}
            href={p.route}
            onClick={onClose}
            className="group flex items-center gap-2"
          >
            <RoadmapBadge variant="roadmap" />
            <span className="text-ink-secondary group-hover:text-ink text-xs font-semibold transition-colors">
              {p.eyebrow}
            </span>
            <span className="text-ink-quaternary hidden text-xs md:inline">— {p.tagline}</span>
          </Link>
        ))}
      </div>

      {/* Footer row */}
      <div className="border-line-subtle bg-surface-alt/50 flex items-center justify-between border-t px-6 py-3">
        <Link
          href="/solutions"
          onClick={onClose}
          className="text-ink-secondary hover:text-ink text-xs transition-colors"
        >
          Browse by use case →
        </Link>
        <Link
          href="/pricing"
          onClick={onClose}
          className="text-primary hover:text-primary-dark text-xs font-medium transition-colors"
        >
          View pricing →
        </Link>
      </div>
    </div>
  )
}
