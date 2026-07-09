/**
 * Breadcrumbs.tsx
 *
 * Auto-derives the breadcrumb trail from the current route path.
 * Uses nodeMeta labels when available, otherwise humanises the slug.
 *
 * /solutions/progressive-delivery → Home / Solutions / Progressive Delivery
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nodeMeta, GROUP_LABELS, type NodeGroup } from '../../data/siteGraph.meta'

// Build a quick lookup: route id → label
const routeLabels = new Map<string, string>(
  nodeMeta.map((n) => [n.id, n.label ?? slugToTitle(n.id.split('/').pop() ?? n.id)]),
)

// Group-level labels for intermediate segments that may not have a nodeMeta entry
// e.g. /solutions → "Solutions" (from GROUP_LABELS)
const segmentGroupMap: Record<string, string> = {
  products: GROUP_LABELS['product' as NodeGroup],
  solutions: GROUP_LABELS['solution' as NodeGroup],
  for: GROUP_LABELS['persona' as NodeGroup],
  docs: GROUP_LABELS['developer' as NodeGroup],
}

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function getLabel(path: string, segment: string): string {
  // Exact match in nodeMeta
  if (routeLabels.has(path)) return routeLabels.get(path)!
  // Group map for top-level segments
  if (segmentGroupMap[segment]) return segmentGroupMap[segment]
  return slugToTitle(segment)
}

interface BreadcrumbsProps {
  /** Extra CSS classes on the wrapper */
  className?: string
}

export function Breadcrumbs({ className = '' }: BreadcrumbsProps) {
  const pathname = usePathname() ?? '/'
  const parts = pathname.split('/').filter(Boolean)

  // Build trail: [{label, path}]
  const trail: { label: string; path: string }[] = [{ label: 'Home', path: '/' }]

  let cumulative = ''
  for (const segment of parts) {
    cumulative += `/${segment}`
    trail.push({ label: getLabel(cumulative, segment), path: cumulative })
  }

  // Nothing interesting if we're on Home
  if (trail.length <= 1) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex max-w-full min-w-0 items-center gap-1.5 overflow-hidden ${className}`}
    >
      {trail.map((crumb, i) => {
        const isLast = i === trail.length - 1
        return (
          <span key={crumb.path} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <span className="text-ink-tertiary shrink-0 text-xs select-none">→</span>}
            {isLast ? (
              <span className="text-primary-accessible max-w-[14rem] truncate font-mono text-xs sm:max-w-[20rem] lg:max-w-[24rem]">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="text-ink-secondary hover:text-ink inline-flex min-h-11 min-w-11 max-w-[8rem] items-center truncate text-xs transition-colors sm:max-w-[10rem]"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
