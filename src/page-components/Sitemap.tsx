'use client'

import { useState, Suspense, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  nodeMeta,
  GROUP_COLORS,
  GROUP_LABELS,
  type NodeGroup,
  type NodeMeta,
} from '../data/siteGraph.meta'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { useTheme } from '../hooks/useTheme'

// Dynamic import to avoid SSR — ForceGraph2D requires browser APIs
const SiteGraph = dynamic(
  () => import('../components/graph/SiteGraph').then((m) => ({ default: m.SiteGraph })),
  { ssr: false },
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugToTitle(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-ink rounded-[1px] px-px">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

// ─── Group-by-section view ────────────────────────────────────────────────────

interface GroupCardProps {
  group: NodeGroup
  nodes: NodeMeta[]
  query: string
  inboundCount: Map<string, number>
  outboundCount: Map<string, number>
}

function GroupCard({ group, nodes, query, inboundCount, outboundCount }: GroupCardProps) {
  const { resolved } = useTheme()
  const color = GROUP_COLORS[group]?.[resolved] ?? '#888'
  const [open, setOpen] = useState(true)

  // Filter nodes by search
  const filtered = useMemo(() => {
    if (!query) return nodes
    const q = query.toLowerCase()
    return nodes.filter(
      (n) =>
        (n.label ?? n.id).toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        (n.description ?? '').toLowerCase().includes(q),
    )
  }, [nodes, query])

  if (filtered.length === 0) return null

  return (
    <div
      className="border border-line bg-surface"
      style={{ borderRadius: '2px' }}
    >
      {/* Group header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-alt transition-colors text-left"
        aria-expanded={open}
      >
        <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: color, borderRadius: '1px' }} />
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-tertiary flex-1">
          {GROUP_LABELS[group]}
        </span>
        <span className="font-mono text-[10px] text-ink-tertiary tabular-nums">
          {filtered.length}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-tertiary transition-transform duration-200 shrink-0"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsible rows — CSS grid trick for smooth height animation */}
      <div
        className="transition-[grid-template-rows] duration-200"
        style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <ul className="border-t border-line divide-y divide-line-subtle" role="list">
            {filtered.map((n) => {
              const label = n.label ?? slugToTitle(n.id.split('/').pop() ?? n.id)
              const ib = inboundCount.get(n.id) ?? 0
              const ob = outboundCount.get(n.id) ?? 0
              return (
                <li key={n.id}>
                  <Link
                    href={n.id}
                    className="group flex items-start gap-3 px-4 py-3 hover:bg-surface-alt transition-colors"
                  >
                    {/* Color dot */}
                    <span
                      className="w-1.5 h-1.5 mt-1.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: color, borderRadius: '1px' }}
                    />

                    {/* Label + path + desc */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-ink group-hover:text-primary-dark transition-colors font-medium leading-snug">
                          {highlight(label, query)}
                        </span>
                        {n.weight && n.weight >= 4 && (
                          <span
                            className="font-mono text-[8px] border border-primary/30 text-primary px-1.5 py-0.5 leading-none"
                            style={{ borderRadius: '2px' }}
                          >
                            featured
                          </span>
                        )}
                      </div>
                      <span className="block font-mono text-[10px] text-ink-tertiary mt-0.5 truncate">
                        {highlight(n.id, query)}
                      </span>
                      {n.description && (
                        <span className="block text-xs text-ink-tertiary mt-1 leading-relaxed line-clamp-2">
                          {highlight(n.description, query)}
                        </span>
                      )}
                    </div>

                    {/* Link badges */}
                    <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                      {ob > 0 && (
                        <span
                          className="font-mono text-[9px] text-ink-tertiary border border-line px-1.5 py-0.5 leading-none"
                          style={{ borderRadius: '2px' }}
                          title={`${ob} outbound links`}
                        >
                          ↗ {ob}
                        </span>
                      )}
                      {ib > 0 && (
                        <span
                          className="font-mono text-[9px] text-primary/60 border border-primary/20 px-1.5 py-0.5 leading-none"
                          style={{ borderRadius: '2px' }}
                          title={`${ib} backlinks`}
                        >
                          ↙ {ib}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ─── URL hierarchy view ───────────────────────────────────────────────────────

interface TreeNode {
  id: string
  label: string
  meta?: NodeMeta
  children: TreeNode[]
}

function buildUrlTree(nodes: NodeMeta[]): TreeNode[] {
  const root: TreeNode[] = []
  const map = new Map<string, TreeNode>()

  // Sort shallower paths first so parents are created before children
  const sorted = [...nodes].sort(
    (a, b) => a.id.split('/').length - b.id.split('/').length,
  )

  for (const n of sorted) {
    const parts = n.id.split('/').filter(Boolean)
    const node: TreeNode = {
      id: n.id,
      label: n.label ?? slugToTitle(parts[parts.length - 1] ?? n.id),
      meta: n,
      children: [],
    }
    map.set(n.id, node)

    if (parts.length <= 1) {
      root.push(node)
    } else {
      // Find closest ancestor
      let parentId = ''
      for (let i = parts.length - 1; i >= 1; i--) {
        const candidate = '/' + parts.slice(0, i).join('/')
        if (map.has(candidate)) { parentId = candidate; break }
      }
      if (parentId) {
        map.get(parentId)!.children.push(node)
      } else {
        root.push(node)
      }
    }
  }

  return root
}

interface TreeNodeRowProps {
  node: TreeNode
  depth: number
  query: string
  inboundCount: Map<string, number>
  outboundCount: Map<string, number>
  defaultOpen?: boolean
  resolved: 'light' | 'dark'
}

function TreeNodeRow({
  node,
  depth,
  query,
  inboundCount,
  outboundCount,
  defaultOpen = depth === 0,
  resolved,
}: TreeNodeRowProps) {
  const [open, setOpen] = useState(defaultOpen || !!query)
  const hasChildren = node.children.length > 0
  const group = node.meta?.group ?? 'resource'
  const color = GROUP_COLORS[group]?.[resolved] ?? '#888'
  const ib = inboundCount.get(node.id) ?? 0
  const ob = outboundCount.get(node.id) ?? 0

  // Auto-expand when there's a search query
  useEffect(() => {
    if (query) setOpen(true)
  }, [query])

  const label = node.label
  const matchesQuery = !query ||
    label.toLowerCase().includes(query.toLowerCase()) ||
    node.id.toLowerCase().includes(query.toLowerCase()) ||
    (node.meta?.description ?? '').toLowerCase().includes(query.toLowerCase())

  // If searching and nothing in subtree matches, hide
  const subtreeHasMatch = useMemo(() => {
    if (!query) return true
    const q = query.toLowerCase()
    function check(n: TreeNode): boolean {
      if (
        (n.label).toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        (n.meta?.description ?? '').toLowerCase().includes(q)
      ) return true
      return n.children.some(check)
    }
    return check(node)
  }, [node, query])

  if (!subtreeHasMatch) return null

  return (
    <li>
      <div
        className={`flex items-start gap-2 py-2 pr-3 rounded-[2px] transition-colors ${
          matchesQuery ? 'hover:bg-surface-alt' : 'opacity-40'
        }`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {/* Expand toggle */}
        <button
          onClick={() => hasChildren && setOpen((v) => !v)}
          className="shrink-0 w-4 h-4 flex items-center justify-center mt-0.5"
          aria-label={open ? 'Collapse' : 'Expand'}
          tabIndex={hasChildren ? 0 : -1}
          style={{ visibility: hasChildren ? 'visible' : 'hidden' }}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink-tertiary transition-transform duration-150"
            style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Color dot */}
        <span
          className="w-1.5 h-1.5 mt-1.5 shrink-0"
          style={{ backgroundColor: color, borderRadius: '1px' }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={node.id}
              className="text-sm text-ink hover:text-primary-dark transition-colors font-medium"
            >
              {highlight(label, query)}
            </Link>
            {(node.meta?.weight ?? 0) >= 4 && (
              <span
                className="font-mono text-[8px] border border-primary/30 text-primary px-1.5 py-0.5 leading-none"
                style={{ borderRadius: '2px' }}
              >
                featured
              </span>
            )}
            <span className="font-mono text-[10px] text-ink-tertiary">
              {highlight(node.id, query)}
            </span>
          </div>
          {node.meta?.description && (
            <p className="text-xs text-ink-tertiary mt-0.5 leading-relaxed line-clamp-1">
              {highlight(node.meta.description, query)}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {ob > 0 && (
            <span
              className="font-mono text-[9px] text-ink-tertiary border border-line px-1.5 py-0.5"
              style={{ borderRadius: '2px' }}
              title={`${ob} outbound links`}
            >
              ↗ {ob}
            </span>
          )}
          {ib > 0 && (
            <span
              className="font-mono text-[9px] text-primary/60 border border-primary/20 px-1.5 py-0.5"
              style={{ borderRadius: '2px' }}
              title={`${ib} backlinks`}
            >
              ↙ {ib}
            </span>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          className="transition-[grid-template-rows] duration-200"
          style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <ul>
              {node.children.map((child) => (
                <TreeNodeRow
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  query={query}
                  inboundCount={inboundCount}
                  outboundCount={outboundCount}
                  defaultOpen={false}
                  resolved={resolved}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}

// ─── Rich Tree View ───────────────────────────────────────────────────────────

type GroupBy = 'section' | 'url'

function TreeView() {
  const { resolved } = useTheme()
  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState<GroupBy>(() => {
    try { return (localStorage.getItem('sitemap-groupby') as GroupBy) ?? 'section' }
    catch { return 'section' }
  })

  useEffect(() => {
    try { localStorage.setItem('sitemap-groupby', groupBy) } catch { /* noop */ }
  }, [groupBy])

  // Build inbound / outbound counts from extraLinks
  const { inboundCount, outboundCount } = useMemo(() => {
    const ib = new Map<string, number>()
    const ob = new Map<string, number>()
    // We can only count from meta (extraLinks); generated links would need dynamic import
    // Import at module level would be ideal but keep it simple here
    return { inboundCount: ib, outboundCount: ob }
  }, [])

  // Group by section
  const grouped = useMemo(() => {
    const m = new Map<NodeGroup, NodeMeta[]>()
    for (const n of nodeMeta) {
      if (!m.has(n.group)) m.set(n.group, [])
      m.get(n.group)!.push(n)
    }
    return m
  }, [])

  // URL tree
  const urlTree = useMemo(() => buildUrlTree(nodeMeta), [])

  const matchCount = useMemo(() => {
    if (!query) return nodeMeta.length
    const q = query.toLowerCase()
    return nodeMeta.filter(
      (n) =>
        (n.label ?? n.id).toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        (n.description ?? '').toLowerCase().includes(q),
    ).length
  }, [query])

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search pages, paths, descriptions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 text-sm font-mono bg-surface border border-line text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-primary/40 transition-colors"
            style={{ borderRadius: '2px' }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink transition-colors text-xs font-mono"
            >
              ✕
            </button>
          )}
        </div>

        {/* Group-by toggle */}
        <div className="flex border border-line shrink-0" style={{ borderRadius: '2px' }}>
          {(['section', 'url'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGroupBy(g)}
              className={`px-3 py-2 text-xs font-mono transition-colors ${
                groupBy === g ? 'bg-ink text-surface' : 'text-ink-secondary hover:text-ink'
              }`}
              style={{ borderRadius: '0' }}
            >
              {g === 'section' ? '⊞ By section' : '⌥ By URL'}
            </button>
          ))}
        </div>

        {/* Result count */}
        {query && (
          <span className="font-mono text-xs text-ink-tertiary self-center whitespace-nowrap">
            {matchCount} match{matchCount !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      {groupBy === 'section' ? (
        <div className="flex flex-col gap-3">
          {([...grouped.entries()] as [NodeGroup, NodeMeta[]][]).map(([group, nodes]) => (
            <GroupCard
              key={group}
              group={group}
              nodes={nodes}
              query={query}
              inboundCount={inboundCount}
              outboundCount={outboundCount}
            />
          ))}
          {matchCount === 0 && (
            <p className="text-sm text-ink-tertiary font-mono py-8 text-center">
              No pages match "{query}"
            </p>
          )}
        </div>
      ) : (
        <div className="border border-line bg-surface" style={{ borderRadius: '2px' }}>
          <ul className="divide-y divide-line-subtle" role="tree">
            {urlTree.map((node) => (
              <TreeNodeRow
                key={node.id}
                node={node}
                depth={0}
                query={query}
                inboundCount={inboundCount}
                outboundCount={outboundCount}
                defaultOpen={true}
                resolved={resolved}
              />
            ))}
          </ul>
          {matchCount === 0 && (
            <p className="text-sm text-ink-tertiary font-mono py-8 text-center">
              No pages match "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Sitemap() {
  const [view, setView] = useState<'graph' | 'tree'>('graph')

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-10 sm:py-16">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-widest">
              Site Graph
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-display font-medium tracking-tight text-ink leading-[1.15]">
              Every page, every connection
            </h1>
            <p className="mt-4 text-base text-ink-secondary leading-relaxed max-w-lg">
              An Obsidian-style force graph of the DeployTitan website — nodes are pages, edges are
              backlinks and cross-references. Click any node to navigate.
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
                    view === v ? 'bg-ink text-surface' : 'text-ink-secondary hover:text-ink'
                  }`}
                  style={{ borderRadius: '0' }}
                >
                  {v === 'graph' ? '⬡ Graph' : '≡ Tree'}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] text-ink-tertiary">
              {nodeMeta.length} pages
            </span>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Container as="section" className="py-6 sm:py-10">
        {view === 'graph' ? (
          <Suspense
            fallback={
              <div
                className="border border-line bg-surface-alt flex items-center justify-center"
                style={{ height: 400, borderRadius: '2px' }}
              >
                <span className="font-mono text-sm text-ink-tertiary animate-pulse">
                  Loading graph…
                </span>
              </div>
            }
          >
            {/* Shorter on mobile so the graph doesn't dominate the whole viewport */}
            <SiteGraph height={typeof window !== 'undefined' && window.innerWidth < 768 ? 420 : 640} />
          </Suspense>
        ) : (
          <TreeView />
        )}
      </Container>

      {/* Legend */}
      {view === 'graph' && (
        <Section border="top" tone="muted" padding="none">
          <Container className="py-8">
            <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest block mb-4">
              Legend — node groups
            </span>
            <div className="flex flex-wrap gap-4">
              {(Object.entries(GROUP_COLORS) as [NodeGroup, { light: string; dark: string }][]).map(
                ([group, colors]) => (
                  <div key={group} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-[2px]"
                      style={{ backgroundColor: colors.light }}
                    />
                    <span className="text-xs font-mono text-ink-secondary capitalize">
                      {GROUP_LABELS[group]}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ backgroundColor: 'rgba(212,180,84,0.5)' }} />
                <span className="text-xs font-mono text-ink-tertiary">CTA link</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ backgroundColor: 'rgba(59,130,246,0.4)' }} />
                <span className="text-xs font-mono text-ink-tertiary">Cross-sell</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.12)' }} />
                <span className="text-xs font-mono text-ink-tertiary">Internal link</span>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  )
}
