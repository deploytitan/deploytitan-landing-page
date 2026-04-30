import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { nodeMeta, GROUP_COLORS, GROUP_LABELS, type NodeGroup } from '../data/siteGraph.meta'

// Lazy-load the force graph to avoid blocking initial render
const SiteGraph = lazy(() =>
  import('../components/graph/SiteGraph').then((m) => ({ default: m.SiteGraph }))
)

// ─── Tree view ────────────────────────────────────────────────────────────────

function TreeView() {
  const grouped = new Map<NodeGroup, typeof nodeMeta>()
  for (const n of nodeMeta) {
    if (!grouped.has(n.group)) grouped.set(n.group, [])
    grouped.get(n.group)!.push(n)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {([...grouped.entries()] as [NodeGroup, typeof nodeMeta][]).map(([group, nodes]) => (
        <div key={group} className="sharp-card p-5 bg-surface-alt">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: GROUP_COLORS[group]?.light }}
            />
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-quaternary">
              {GROUP_LABELS[group]}
            </h3>
          </div>
          <ul className="flex flex-col gap-1">
            {nodes.map((n) => (
              <li key={n.id}>
                <Link
                  to={n.id}
                  className="flex items-center gap-2 text-sm text-ink-secondary hover:text-ink transition-colors group py-0.5"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-30 group-hover:opacity-70 transition-opacity shrink-0">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                  {n.label ?? n.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Sitemap() {
  useDocumentMeta(
    'Site Graph',
    'Interactive map of all pages and their connections across the DeployTitan website.',
  )

  const [view, setView] = useState<'graph' | 'tree'>('graph')

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="border-b border-line blueprint-grid">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">Site Graph</span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-display font-medium tracking-tight text-ink leading-[1.15]">
              Every page, every connection
            </h1>
            <p className="mt-4 text-base text-ink-secondary leading-relaxed max-w-lg">
              An Obsidian-style force graph of the DeployTitan website — nodes are pages,
              edges are backlinks and cross-references. Click any node to navigate.
            </p>
          </div>

          {/* View toggle */}
          <div className="mt-8 flex items-center gap-2">
            <div className="flex border border-line" style={{ borderRadius: '2px' }}>
              {(['graph', 'tree'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 text-xs font-mono transition-colors ${
                    view === v
                      ? 'bg-ink text-surface'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                  style={{ borderRadius: '0' }}
                >
                  {v === 'graph' ? '⬡ Graph' : '≡ Tree'}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] text-ink-quaternary">
              {nodeMeta.length} pages
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        {view === 'graph' ? (
          <Suspense
            fallback={
              <div
                className="border border-line bg-surface-alt flex items-center justify-center"
                style={{ height: 600, borderRadius: '2px' }}
              >
                <span className="font-mono text-sm text-ink-quaternary animate-pulse">Loading graph…</span>
              </div>
            }
          >
            <SiteGraph height={640} />
          </Suspense>
        ) : (
          <TreeView />
        )}
      </section>

      {/* Legend */}
      {view === 'graph' && (
        <section className="border-t border-line bg-surface-alt">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest block mb-4">Legend — node groups</span>
            <div className="flex flex-wrap gap-4">
              {(Object.entries(GROUP_COLORS) as [NodeGroup, { light: string; dark: string }][]).map(([group, colors]) => (
                <div key={group} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.light }} />
                  <span className="text-xs font-mono text-ink-secondary capitalize">{GROUP_LABELS[group]}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ backgroundColor: 'rgba(212,180,84,0.5)' }} />
                <span className="text-xs font-mono text-ink-quaternary">CTA link</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ backgroundColor: 'rgba(59,130,246,0.4)' }} />
                <span className="text-xs font-mono text-ink-quaternary">Cross-sell</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.12)' }} />
                <span className="text-xs font-mono text-ink-quaternary">Internal link</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
