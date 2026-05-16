'use client'

import Link from 'next/link'
import { RoadmapBadge } from '../shared/RoadmapBadge'

const ACTIVE_SOLUTIONS = [
  {
    route: '/solutions/release-coordination',
    eyebrow: 'Release Coordination',
    tagline: 'One release object for many repos.',
    description:
      'Link PRs across repositories into a single release, track blocking dependencies, and sequence merges before they become production risk.',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
]

const ROADMAP_SOLUTIONS = [
  {
    route: '/solutions/instant-rollback',
    eyebrow: 'Instant Rollback',
    tagline: 'Owners, playbooks, sequence: before day one.',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  },
  {
    route: '/solutions/risk-intelligence',
    eyebrow: 'Risk Intelligence',
    tagline: 'Blast radius before you ship.',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    route: '/solutions/platform-engineering',
    eyebrow: 'Platform Engineering',
    tagline: 'Shared release record across all teams.',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

interface Props {
  onClose: () => void
}

export function SolutionsDropdown({ onClose }: Props) {
  return (
    <div
      className="absolute top-full mt-2 bg-surface border border-line shadow-[0_8px_32px_rgba(8,5,3,0.08)] z-50"
      style={{ borderRadius: '2px', minWidth: '700px' }}
    >
      {/* Header */}
      <div className="px-6 pt-4 pb-3 border-b border-line-subtle flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
          Solutions
        </span>
        <span className="text-[11px] text-ink-tertiary">
          Release coordination use cases
        </span>
      </div>

      {/* Body: asymmetric two-zone layout */}
      <div className="flex">
        {/* Left zone: active solution */}
        <div className="flex min-w-0 flex-1 flex-col border-r border-line">
          <div className="border-b border-line-subtle px-5 py-2">
            <span className="font-mono text-[9px] text-ink-tertiary uppercase tracking-widest">
              Available now
            </span>
          </div>
          {ACTIVE_SOLUTIONS.map((s) => (
            <Link
              key={s.route}
              href={s.route}
              onClick={onClose}
              className="group flex flex-col gap-3 px-5 py-5 hover:bg-surface-alt transition-colors duration-150"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-primary/60 group-hover:text-primary transition-colors duration-150">
                  {s.icon}
                </span>
                <span className="text-sm font-semibold tracking-tight text-ink group-hover:text-primary-dark transition-colors duration-150">
                  {s.eyebrow}
                </span>
              </div>
              <p className="text-[13px] text-ink-tertiary leading-relaxed max-w-[38ch]">
                {s.description}
              </p>
            </Link>
          ))}
          <div className="mt-auto border-t border-line-subtle px-5 py-3">
            <Link
              href="/docs"
              onClick={onClose}
              className="text-xs text-ink-secondary hover:text-ink transition-colors duration-150"
            >
              Read the docs →
            </Link>
          </div>
        </div>

        {/* Right zone: roadmap solutions */}
        <div className="flex w-[280px] shrink-0 flex-col">
          <div className="border-b border-line-subtle px-5 py-2">
            <span className="font-mono text-[9px] text-ink-tertiary uppercase tracking-widest">
              Coming soon
            </span>
          </div>
          <div className="flex flex-col divide-y divide-line-subtle">
            {ROADMAP_SOLUTIONS.map((s) => (
              <Link
                key={s.route}
                href={s.route}
                onClick={onClose}
                className="group flex flex-col gap-1.5 px-5 py-4 hover:bg-surface-alt/60 transition-colors duration-150"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-ink-tertiary group-hover:text-ink-tertiary transition-colors duration-150">
                      {s.icon}
                    </span>
                    <span className="text-[13px] font-semibold tracking-tight text-ink-secondary group-hover:text-ink transition-colors duration-150">
                      {s.eyebrow}
                    </span>
                  </div>
                  <RoadmapBadge variant="roadmap" />
                </div>
                <p className="pl-[22px] text-[11px] text-ink-tertiary group-hover:text-ink-tertiary leading-relaxed transition-colors duration-150">
                  {s.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-line-subtle flex items-center justify-between bg-surface-alt/40">
        <Link
          href="/solutions"
          onClick={onClose}
          className="text-xs text-ink-secondary hover:text-ink transition-colors duration-150"
        >
          View all solutions →
        </Link>
        <Link
          href="/pricing"
          onClick={onClose}
          className="text-xs text-ink-secondary hover:text-ink font-medium transition-colors duration-150"
        >
          View pricing →
        </Link>
      </div>
    </div>
  )
}
