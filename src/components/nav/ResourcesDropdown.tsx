'use client'

import posthog from 'posthog-js'
import { DEMO_URL } from '@/lib/env'
import Link from 'next/link'

const resources = [
  {
    label: 'Documentation',
    description: 'Guides, API reference, and quickstarts',
    route: '/docs',
    external: false,
  },
  {
    label: 'CLI Reference',
    description: 'The `dt` command-line tool — install and usage',
    route: '/cli',
    external: false,
  },
  {
    label: 'API Reference',
    description: 'REST endpoints, auth, webhooks',
    route: '/api-reference',
    external: false,
  },
  {
    label: 'Blog',
    description: 'Engineering posts and product updates',
    route: '/blog',
    external: false,
  },
  {
    label: 'Live Demo',
    description: 'Trigger a real deploy from your browser',
    route: DEMO_URL,
    external: true,
  },
]

interface Props {
  onClose: () => void
}

export function ResourcesDropdown({ onClose }: Props) {
  const handleClick = (label: string, external: boolean) => {
    posthog.capture('nav_resource_clicked', { resource_label: label, external })
    onClose()
  }

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface border border-line shadow-[0_8px_32px_rgba(8,5,3,0.08)] z-50"
      style={{ borderRadius: '2px', minWidth: '340px' }}
    >
      <div className="px-5 pt-5 pb-3 border-b border-line-subtle">
        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
          Resources
        </span>
      </div>

      <ul className="py-2">
        {resources.map((r) => (
          <li key={r.label}>
            {r.external ? (
              <a
                href={r.route}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(r.label, true)}
                className="group flex items-start gap-3 px-5 py-3 hover:bg-surface-alt transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink group-hover:text-primary-dark transition-colors flex items-center gap-1.5">
                    {r.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="opacity-40"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                  <span className="text-xs text-ink-tertiary">{r.description}</span>
                </div>
              </a>
            ) : (
              <Link
                href={r.route}
                onClick={() => handleClick(r.label, false)}
                className="group flex items-start gap-3 px-5 py-3 hover:bg-surface-alt transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink group-hover:text-primary-dark transition-colors">
                    {r.label}
                  </span>
                  <span className="text-xs text-ink-tertiary">{r.description}</span>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
