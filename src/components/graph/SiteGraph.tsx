import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import {
  nodeMeta,
  extraLinks,
  GROUP_COLORS,
  GROUP_LABELS,
  type NodeGroup,
} from '../../data/siteGraph.meta'

// Lazily import generated graph (may not exist on first run before Vite plugin fires)
let _generatedNodes: { id: string; label: string; file: string }[] = []
let _generatedLinks: { source: string; target: string; kind: string }[] = []
try {
  // @ts-ignore — generated at build time
  const gen = await import('../../data/siteGraph.generated')
  _generatedNodes = gen.generatedNodes ?? []
  _generatedLinks = gen.generatedLinks ?? []
} catch {
  // Plugin hasn't run yet — fall through to meta-only
}

// ─── Merge meta + generated ───────────────────────────────────────────────────

function buildGraphData(theme: 'light' | 'dark', hoveredId: string | null) {
  // Build node map
  const nodeMap = new Map<string, {
    id: string; label: string; group: NodeGroup; weight: number; description: string; file: string
  }>()

  // Seed from generated
  for (const n of _generatedNodes) {
    nodeMap.set(n.id, { id: n.id, label: n.label, group: 'resource', weight: 2, description: '', file: n.file })
  }

  // Apply/override with meta
  for (const m of nodeMeta) {
    const existing = nodeMap.get(m.id)
    nodeMap.set(m.id, {
      id: m.id,
      label: m.label ?? existing?.label ?? m.id,
      group: m.group,
      weight: m.weight ?? 2,
      description: m.description ?? '',
      file: existing?.file ?? '',
    })
  }

  // Build link set (deduplicate)
  const linkSet = new Set<string>()
  const links: { source: string; target: string; kind: string }[] = []

  const addLink = (s: string, t: string, kind: string) => {
    const key = `${s}→${t}`
    if (!linkSet.has(key) && nodeMap.has(s) && nodeMap.has(t)) {
      linkSet.add(key)
      links.push({ source: s, target: t, kind })
    }
  }

  for (const l of _generatedLinks) addLink(l.source, l.target, l.kind)
  for (const l of extraLinks) addLink(l.source, l.target, l.kind)

  // Build neighbour set for hover dim
  const neighbours = new Set<string>()
  if (hoveredId) {
    neighbours.add(hoveredId)
    for (const l of links) {
      if (l.source === hoveredId) neighbours.add(l.target as string)
      if (l.target === hoveredId) neighbours.add(l.source as string)
    }
  }

  const nodes = [...nodeMap.values()].map((n) => ({
    ...n,
    color: GROUP_COLORS[n.group]?.[theme] ?? '#888',
    dimmed: hoveredId !== null && !neighbours.has(n.id),
  }))

  return { nodes, links }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  height?: number
  /** When true, renders a compact version (no sidebar, no search) */
  mini?: boolean
  /** If provided, highlights this node and dims others */
  focusId?: string
}

export function SiteGraph({ height = 600, mini = false, focusId }: Props) {
  const { resolved } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [hoveredId, setHoveredId] = useState<string | null>(focusId ?? null)
  const [search, setSearch] = useState('')
  const [activeGroups, setActiveGroups] = useState<Set<NodeGroup>>(
    new Set(Object.keys(GROUP_LABELS) as NodeGroup[])
  )
  const [dims, setDims] = useState({ width: 800, height })
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<any>(null)

  // Responsive width
  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setDims({ width: e.contentRect.width, height })
      }
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [height])

  const { nodes, links } = useMemo(
    () => buildGraphData(resolved, hoveredId),
    [resolved, hoveredId]
  )

  // Filter by group and search
  const filteredNodeIds = useMemo(() => {
    const sq = search.toLowerCase()
    return new Set(
      nodes
        .filter((n) => activeGroups.has(n.group))
        .filter((n) => !sq || n.label.toLowerCase().includes(sq) || n.id.includes(sq))
        .map((n) => n.id)
    )
  }, [nodes, activeGroups, search])

  const graphData = useMemo(() => ({
    nodes: nodes.filter((n) => filteredNodeIds.has(n.id)),
    links: links.filter(
      (l) => filteredNodeIds.has(l.source as string) && filteredNodeIds.has(l.target as string)
    ),
  }), [nodes, links, filteredNodeIds])

  const bg = resolved === 'dark' ? '#0d0c0a' : '#fafaf9'
  const lineColor = resolved === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const textColor = resolved === 'dark' ? '#f5f4f1' : '#080503'

  const handleNodeClick = useCallback((node: any) => {
    if (node.id && node.id.startsWith('/')) navigate(node.id)
  }, [navigate])

  const handleNodeHover = useCallback((node: any) => {
    setHoveredId(node ? node.id : null)
    if (containerRef.current) {
      containerRef.current.style.cursor = node ? 'pointer' : 'default'
    }
  }, [])

  const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const radius = Math.max(3, (node.weight ?? 2) * 3.5)
    const isActive = location.pathname === node.id
    const isDimmed = node.dimmed

    ctx.globalAlpha = isDimmed ? 0.2 : 1

    // Node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = node.color
    ctx.fill()

    // Active ring
    if (isActive) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 2.5, 0, 2 * Math.PI)
      ctx.strokeStyle = node.color
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Label (only when zoomed in enough or high weight)
    const labelThreshold = mini ? 3 : 1.5
    if (globalScale > labelThreshold || (node.weight ?? 2) >= 4) {
      const label = node.label as string
      const fontSize = Math.max(8, Math.min(13, (node.weight ?? 2) * 2.5))
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillStyle = textColor
      ctx.globalAlpha = isDimmed ? 0.1 : 0.8
      ctx.fillText(label, node.x, node.y + radius + 3)
    }

    ctx.globalAlpha = 1
  }, [location.pathname, textColor, mini])

  const toggleGroup = (g: NodeGroup) => {
    setActiveGroups((prev) => {
      const next = new Set(prev)
      if (next.has(g)) { if (next.size > 1) next.delete(g) } else next.add(g)
      return next
    })
  }

  if (mini) {
    return (
      <div ref={containerRef} className="w-full overflow-hidden" style={{ height, borderRadius: '2px' }}>
        <ForceGraph2D
          ref={graphRef}
          width={dims.width}
          height={height}
          backgroundColor={bg}
          graphData={graphData}
          nodeCanvasObject={drawNode}
          nodeCanvasObjectMode={() => 'replace'}
          linkColor={() => lineColor}
          linkWidth={1}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          cooldownTime={2000}
          enableZoomInteraction={false}
          enablePanInteraction={false}
        />
      </div>
    )
  }

  return (
    <div className="flex gap-0 border border-line" style={{ borderRadius: '2px', height }}>
      {/* Sidebar */}
      <div
        className="w-56 shrink-0 border-r border-line flex flex-col bg-surface-alt"
        style={{ height }}
      >
        {/* Search */}
        <div className="p-3 border-b border-line">
          <input
            type="text"
            placeholder="Search pages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-surface border border-line text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-primary/40 transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        {/* Group filters */}
        <div className="p-3 flex flex-col gap-1 overflow-y-auto flex-1">
          <span className="font-mono text-[9px] text-ink-quaternary uppercase tracking-widest mb-1">Filter by group</span>
          {(Object.entries(GROUP_LABELS) as [NodeGroup, string][]).map(([g, label]) => {
            const color = GROUP_COLORS[g][resolved]
            const active = activeGroups.has(g)
            return (
              <button
                key={g}
                onClick={() => toggleGroup(g)}
                className="flex items-center gap-2 px-2 py-1.5 text-xs text-left transition-colors hover:bg-surface"
                style={{ borderRadius: '2px', opacity: active ? 1 : 0.4 }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-ink-secondary font-mono">{label}</span>
              </button>
            )
          })}
        </div>

        {/* Node count */}
        <div className="p-3 border-t border-line">
          <span className="font-mono text-[10px] text-ink-quaternary">
            {graphData.nodes.length} pages · {graphData.links.length} links
          </span>
        </div>
      </div>

      {/* Graph canvas */}
      <div ref={containerRef} className="flex-1 overflow-hidden">
        <ForceGraph2D
          ref={graphRef}
          width={dims.width - 224}
          height={height}
          backgroundColor={bg}
          graphData={graphData}
          nodeCanvasObject={drawNode}
          nodeCanvasObjectMode={() => 'replace'}
          linkColor={(link: any) => {
            const kind = (link as any).kind
            if (kind === 'cta') return resolved === 'dark' ? 'rgba(212,180,84,0.25)' : 'rgba(201,168,76,0.25)'
            if (kind === 'cross-sell') return resolved === 'dark' ? 'rgba(96,165,250,0.2)' : 'rgba(59,130,246,0.2)'
            return lineColor
          }}
          linkWidth={1}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={1}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          cooldownTime={3000}
          nodeLabel={(node: any) => `${node.label}\n${node.description || node.id}`}
        />
      </div>
    </div>
  )
}
