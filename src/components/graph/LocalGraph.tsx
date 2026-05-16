'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { nodeMeta, extraLinks, GROUP_COLORS } from '../../data/siteGraph.meta'
import { useTheme } from '../../hooks/useTheme'

// Lazily merge in auto-generated links (Vite plugin output)
let _generatedLinks: { source: string; target: string; kind: string }[] = []
try {
  const gen = await import('../../data/siteGraph.generated')
  _generatedLinks = gen.generatedLinks ?? []
} catch {
  // Plugin hasn't run yet or file doesn't exist — use only extraLinks
}

interface RelatedNode {
  id: string
  label: string
  group: string
  color: string
  direction: 'outgoing' | 'incoming'
}

export function LocalGraph() {
  const pathname = usePathname()
  const { resolved } = useTheme()
  const currentId = pathname

  const related = useMemo((): RelatedNode[] => {
    const metaMap = new Map(nodeMeta.map((n) => [n.id, n]))
    const seen = new Set<string>()
    const nodes: RelatedNode[] = []

    // Combine curated extra links with auto-generated nav/link/href links
    const allLinks = [...extraLinks, ..._generatedLinks]

    for (const link of allLinks) {
      const src = link.source as string
      const tgt = link.target as string

      if (src === currentId && !seen.has(tgt)) {
        seen.add(tgt)
        const m = metaMap.get(tgt)
        if (m) {
          nodes.push({
            id: tgt,
            label: m.label ?? tgt,
            group: m.group,
            color: GROUP_COLORS[m.group]?.[resolved] ?? '#888',
            direction: 'outgoing',
          })
        }
      }
      if (tgt === currentId && !seen.has(src)) {
        seen.add(src)
        const m = metaMap.get(src)
        if (m) {
          nodes.push({
            id: src,
            label: m.label ?? src,
            group: m.group,
            color: GROUP_COLORS[m.group]?.[resolved] ?? '#888',
            direction: 'incoming',
          })
        }
      }
    }

    // Sort: curated (extraLinks covered first) then generated; dedup already handled by `seen`
    // Show backlinks first (incoming), then outgoing
    return nodes
      .sort((a, b) => {
        if (a.direction !== b.direction) return a.direction === 'incoming' ? -1 : 1
        return 0
      })
      .slice(0, 8)
  }, [currentId, resolved])

  if (related.length === 0) return null

  return (
    <div className="sharp-card p-4 bg-surface-alt">
      <div className="flex items-center gap-2 mb-3">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
          <circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/>
          <line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
        </svg>
        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">Related pages</span>
      </div>

      <div className="flex flex-col gap-1">
        {related.map((n) => (
          <Link
            key={n.id}
            href={n.id}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-surface transition-colors group"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 shrink-0" style={{ backgroundColor: n.color, borderRadius: '1px' }} />
            <span className="text-xs text-ink-secondary group-hover:text-ink transition-colors font-mono">{n.label}</span>
            {n.direction === 'incoming' && (
              <span className="ml-auto font-mono text-[9px] text-ink-tertiary">← backlink</span>
            )}
          </Link>
        ))}
      </div>

      <Link
        href="/sitemap"
        className="mt-3 flex items-center gap-1 text-[10px] font-mono text-primary-accessible hover:text-primary transition-colors"
      >
        View full site graph →
      </Link>
    </div>
  )
}
