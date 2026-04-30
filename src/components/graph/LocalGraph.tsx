import { useLocation, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { nodeMeta, extraLinks, GROUP_COLORS } from '../../data/siteGraph.meta'
import { useTheme } from '../../hooks/useTheme'

interface RelatedNode {
  id: string
  label: string
  group: string
  color: string
  direction: 'outgoing' | 'incoming'
}

export function LocalGraph() {
  const location = useLocation()
  const { resolved } = useTheme()
  const currentId = location.pathname

  const related = useMemo((): RelatedNode[] => {
    const metaMap = new Map(nodeMeta.map((n) => [n.id, n]))
    const seen = new Set<string>()
    const nodes: RelatedNode[] = []

    for (const link of extraLinks) {
      if (link.source === currentId && !seen.has(link.target)) {
        seen.add(link.target)
        const m = metaMap.get(link.target)
        if (m) {
          nodes.push({
            id: link.target,
            label: m.label ?? link.target,
            group: m.group,
            color: GROUP_COLORS[m.group]?.[resolved] ?? '#888',
            direction: 'outgoing',
          })
        }
      }
      if (link.target === currentId && !seen.has(link.source)) {
        seen.add(link.source)
        const m = metaMap.get(link.source)
        if (m) {
          nodes.push({
            id: link.source,
            label: m.label ?? link.source,
            group: m.group,
            color: GROUP_COLORS[m.group]?.[resolved] ?? '#888',
            direction: 'incoming',
          })
        }
      }
    }
    return nodes.slice(0, 8)
  }, [currentId, resolved])

  if (related.length === 0) return null

  return (
    <div className="sharp-card p-4 bg-surface-alt">
      <div className="flex items-center gap-2 mb-3">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
          <circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/>
          <line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
        </svg>
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Related pages</span>
      </div>

      <div className="flex flex-col gap-1">
        {related.map((n) => (
          <Link
            key={n.id}
            to={n.id}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-surface transition-colors group"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: n.color }} />
            <span className="text-xs text-ink-secondary group-hover:text-ink transition-colors font-mono">{n.label}</span>
            {n.direction === 'incoming' && (
              <span className="ml-auto font-mono text-[9px] text-ink-quaternary">← backlink</span>
            )}
          </Link>
        ))}
      </div>

      <Link
        to="/sitemap"
        className="mt-3 flex items-center gap-1 text-[10px] font-mono text-primary hover:text-primary-dark transition-colors"
      >
        View full site graph →
      </Link>
    </div>
  )
}
