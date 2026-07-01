'use client'

import Link from 'next/link'
import { RoadmapBadge } from '../shared/RoadmapBadge'

const ACTIVE_PRODUCTS = [
  {
    route: '/products/titan-rollout',
    name: 'Titan Rollouts',
    tagline:
      'Coordinate multi-service releases with dependency sequencing, freeze windows, and approval workflows.',
    bullets: [
      'Release objects linking PRs across repositories',
      'Dependency graph and merge sequencing',
      'Freeze windows, approvals, and rollback coordination',
    ],
    icon: (
      <svg
        width="16"
        height="16"
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
]

const ROADMAP_PRODUCTS = [
  {
    route: '/products/titan-foresight',
    name: 'Titan Foresight',
    tagline: 'Blast radius, downstream impact, and release risk scoring.',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    route: '/products/titan-phoenix',
    name: 'Titan Phoenix',
    tagline: 'SLO-triggered rollback scoped to the failing slice.',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  },
]

interface Props {
  onClose: () => void
}

export function ProductsDropdown({ onClose }: Props) {
  return (
    <div
      className="bg-surface border-line absolute top-full z-50 mt-2 border shadow-[0_8px_32px_rgba(8,5,3,0.08)]"
      style={{ borderRadius: '2px', minWidth: '760px' }}
    >
      {/* Header */}
      <div className="border-line-subtle flex items-center justify-between border-b px-6 pt-4 pb-3">
        <span className="text-ink-tertiary font-mono text-[10px] tracking-widest uppercase">
          Products
        </span>
        <span className="text-ink-tertiary text-[11px]">
          Release coordination — available now, with more on the roadmap
        </span>
      </div>

      {/* Body: two-zone asymmetric layout */}
      <div className="divide-line flex divide-x">
        {/* Left zone: active product(s) */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-line-subtle border-b px-5 py-2">
            <span className="text-ink-tertiary font-mono text-[9px] tracking-widest uppercase">
              Available now
            </span>
          </div>
          {ACTIVE_PRODUCTS.map((product) => (
            <Link
              key={product.route}
              href={product.route}
              onClick={onClose}
              className="group hover:bg-surface-alt flex flex-1 flex-col gap-3 px-5 py-5 transition-colors duration-150"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-primary/60 group-hover:text-primary transition-colors duration-150">
                  {product.icon}
                </span>
                <span className="text-ink group-hover:text-primary-dark text-sm font-semibold tracking-tight transition-colors duration-150">
                  {product.name}
                </span>
              </div>
              <p className="text-ink-tertiary text-[13px] leading-relaxed">{product.tagline}</p>
              <ul className="border-line-subtle mt-1 flex flex-col gap-1.5 border-t pt-3">
                {product.bullets.map((bullet) => (
                  <li key={bullet} className="text-ink-secondary flex items-center gap-2 text-xs">
                    <span
                      className="bg-primary/50 h-1 w-1 shrink-0"
                      style={{ borderRadius: '1px' }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        {/* Right zone: roadmap products */}
        <div className="flex w-[280px] shrink-0 flex-col">
          <div className="border-line-subtle border-b px-5 py-2">
            <span className="text-ink-tertiary font-mono text-[9px] tracking-widest uppercase">
              Coming soon
            </span>
          </div>
          <div className="divide-line-subtle flex flex-col divide-y">
            {ROADMAP_PRODUCTS.map((product) => (
              <Link
                key={product.route}
                href={product.route}
                onClick={onClose}
                className="group hover:bg-surface-alt/60 flex flex-col gap-1.5 px-5 py-4 transition-colors duration-150"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-ink-tertiary group-hover:text-ink-tertiary transition-colors duration-150">
                      {product.icon}
                    </span>
                    <span className="text-ink-secondary group-hover:text-ink text-[13px] font-semibold tracking-tight transition-colors duration-150">
                      {product.name}
                    </span>
                  </div>
                  <RoadmapBadge variant="roadmap" />
                </div>
                <p className="text-ink-tertiary group-hover:text-ink-tertiary pl-[22px] text-[11px] leading-relaxed transition-colors duration-150">
                  {product.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-line-subtle bg-surface-alt/40 flex items-center justify-end border-t px-6 py-3">
        <Link
          href="/waitlist"
          onClick={onClose}
          className="text-ink-secondary hover:text-ink text-xs font-medium transition-colors duration-150"
        >
          Join waitlist →
        </Link>
      </div>
    </div>
  )
}
