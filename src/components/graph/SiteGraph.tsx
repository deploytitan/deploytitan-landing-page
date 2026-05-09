'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useRouter, usePathname } from 'next/navigation'
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
  const gen = await import('../../data/siteGraph.generated')
  _generatedNodes = gen.generatedNodes ?? []
  _generatedLinks = gen.generatedLinks ?? []
} catch {
  // Plugin hasn't run yet — fall through to meta-only
}

// ─── Merge meta + generated ───────────────────────────────────────────────────

function buildGraphData(theme: 'light' | 'dark') {
  const nodeMap = new Map<string, {
    id: string; label: string; group: NodeGroup; weight: number; description: string; file: string
  }>()

  for (const n of _generatedNodes) {
    nodeMap.set(n.id, { id: n.id, label: n.label, group: 'resource', weight: 2, description: '', file: n.file })
  }

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

  const nodes = [...nodeMap.values()].map((n) => ({
    ...n,
    color: GROUP_COLORS[n.group]?.[theme] ?? '#888',
  }))

  // Neighbour adjacency for hover-dim (read at paint time, never stored on nodes)
  const neighbours = new Map<string, Set<string>>()
  for (const l of links) {
    const s = l.source as string
    const t = l.target as string
    if (!neighbours.has(s)) neighbours.set(s, new Set())
    if (!neighbours.has(t)) neighbours.set(t, new Set())
    neighbours.get(s)!.add(t)
    neighbours.get(t)!.add(s)
  }

  return { nodes, links, neighbours }
}

// ─── Per-frame label collision tracking ───────────────────────────────────────

interface LabelBox { x: number; y: number; w: number; h: number }
const _frameLabels = new WeakMap<CanvasRenderingContext2D, { ts: number; boxes: LabelBox[] }>()

function tryPlaceLabel(
  ctx: CanvasRenderingContext2D,
  frameTs: number,
  cx: number,
  cy: number,
  w: number,
  h: number,
): boolean {
  let entry = _frameLabels.get(ctx)
  if (!entry || entry.ts !== frameTs) {
    entry = { ts: frameTs, boxes: [] }
    _frameLabels.set(ctx, entry)
  }
  const box: LabelBox = { x: cx - w / 2, y: cy, w, h }
  const pad = 2
  for (const b of entry.boxes) {
    if (
      box.x < b.x + b.w + pad &&
      box.x + box.w + pad > b.x &&
      box.y < b.y + b.h + pad &&
      box.y + box.h + pad > b.y
    ) {
      return false
    }
  }
  entry.boxes.push(box)
  return true
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  height?: number
  mini?: boolean
  focusId?: string
}

export function SiteGraph({ height = 600, mini = false, focusId }: Props) {
  const { resolved } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // Hover is a ref — never triggers re-render / graphData rebuild
  const hoveredIdRef = useRef<string | null>(focusId ?? null)
  const [search, setSearch] = useState('')
  const [activeGroups, setActiveGroups] = useState<Set<NodeGroup>>(
    new Set(Object.keys(GROUP_LABELS) as NodeGroup[])
  )
  // Mobile: sidebar starts hidden on narrow screens
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // canvasRef measures the actual canvas container (not the outer wrapper)
  // so dims.width is exactly the pixel budget for the canvas — no subtraction needed.
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [canvasWidth, setCanvasWidth] = useState(300)
  const [canvasHeight, setCanvasHeight] = useState(height)
  const graphRef = useRef<any>(null)
  const frameRef = useRef(0)

  // Observe the canvas container for true available width
  useEffect(() => {
    const el = canvasContainerRef.current
    if (!el) return
    // Read initial size immediately (avoids one frame of wrong width)
    setCanvasWidth(el.clientWidth || 300)
    setCanvasHeight(el.clientHeight || height)

    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setCanvasWidth(Math.floor(e.contentRect.width))
        setCanvasHeight(Math.floor(e.contentRect.height))
      }
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [height])

  const { nodes, links, neighbours } = useMemo(
    () => buildGraphData(resolved),
    [resolved]
  )

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
  const bgRgba = resolved === 'dark' ? 'rgba(13,12,10,0.82)' : 'rgba(250,250,249,0.82)'

  const handleNodeClick = useCallback((node: any) => {
    if (node.id && node.id.startsWith('/')) router.push(node.id)
  }, [router])

  const handleNodeHover = useCallback((node: any) => {
    hoveredIdRef.current = node ? node.id : null
    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.cursor = node ? 'pointer' : 'default'
    }
  }, [])

  const onRenderFramePre = useCallback(() => {
    frameRef.current += 1
  }, [])

  const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const hovered = hoveredIdRef.current
    const nodeNeighbours = hovered ? (neighbours.get(hovered) ?? new Set<string>()) : null
    const isDimmed = hovered !== null && hovered !== node.id && !(nodeNeighbours?.has(node.id))

    const radius = Math.max(3, (node.weight ?? 2) * 3.5)
    const isActive = pathname === node.id

    ctx.globalAlpha = isDimmed ? 0.2 : 1

    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = node.color
    ctx.fill()

    if (isActive) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 2.5, 0, 2 * Math.PI)
      ctx.strokeStyle = node.color
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const labelThreshold = mini ? 3 : 1.2
    const baseSize = Math.max(8, Math.min(13, (node.weight ?? 2) * 2.5))
    const fontSize = Math.max(6, Math.min(14, baseSize * (globalScale / Math.max(1, labelThreshold))))
    const shouldShowLabel = !mini && (globalScale >= labelThreshold || (node.weight ?? 2) >= 5)

    if (shouldShowLabel) {
      const label = node.label as string
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'

      const textWidth = ctx.measureText(label).width
      const textHeight = fontSize
      const labelY = node.y + radius + 4

      if (!tryPlaceLabel(ctx, frameRef.current, node.x, labelY, textWidth, textHeight)) {
        ctx.globalAlpha = 1
        return
      }

      const pad = { x: 3, y: 1.5 }
      ctx.globalAlpha = isDimmed ? 0.08 : 0.82
      ctx.fillStyle = bgRgba
      ctx.beginPath()
      ctx.roundRect(
        node.x - textWidth / 2 - pad.x,
        labelY - pad.y,
        textWidth + pad.x * 2,
        textHeight + pad.y * 2,
        2,
      )
      ctx.fill()

      ctx.globalAlpha = isDimmed ? 0.1 : 0.9
      ctx.fillStyle = textColor
      ctx.fillText(label, node.x, labelY)
    }

    ctx.globalAlpha = 1
  }, [pathname, textColor, bgRgba, mini, neighbours])

  const toggleGroup = (g: NodeGroup) => {
    setActiveGroups((prev) => {
      const next = new Set(prev)
      if (next.has(g)) { if (next.size > 1) next.delete(g) } else next.add(g)
      return next
    })
  }

  const zoomIn  = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.4, 300)
  const zoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() / 1.4, 300)
  const zoomFit = () => graphRef.current?.zoomToFit(400, 40)

  // ── Mini variant ─────────────────────────────────────────────────────────────
  if (mini) {
    return (
      <div ref={canvasContainerRef} className="w-full overflow-hidden" style={{ height, borderRadius: '2px' }}>
        <ForceGraph2D
          ref={graphRef}
          width={canvasWidth}
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

  // ── Sidebar panel (shared between desktop inline + mobile drawer) ─────────────
  const SidebarContent = (
    <>
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
        <span className="font-mono text-[9px] text-ink-quaternary uppercase tracking-widest mb-1">
          Filter by group
        </span>
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
              <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: color, borderRadius: '1px' }} />
              <span className="text-ink-secondary font-mono">{label}</span>
            </button>
          )
        })}
      </div>

      {/* Zoom controls */}
      <div className="p-3 border-t border-line flex items-center gap-1">
        <button onClick={zoomIn}  className="flex-1 px-2 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink hover:bg-surface transition-colors border border-line" style={{ borderRadius: '2px' }} title="Zoom in">+</button>
        <button onClick={zoomOut} className="flex-1 px-2 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink hover:bg-surface transition-colors border border-line" style={{ borderRadius: '2px' }} title="Zoom out">−</button>
        <button onClick={zoomFit} className="flex-1 px-2 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink hover:bg-surface transition-colors border border-line" style={{ borderRadius: '2px' }} title="Fit to view">⊡</button>
      </div>

      {/* Node count */}
      <div className="p-3 border-t border-line">
        <span className="font-mono text-[10px] text-ink-quaternary">
          {graphData.nodes.length} pages · {graphData.links.length} links
        </span>
      </div>
    </>
  )

  // ── Full graph layout ─────────────────────────────────────────────────────────
  return (
    <div className="border border-line flex flex-col" style={{ borderRadius: '2px' }}>

      {/* Mobile toolbar row */}
      <div className="flex items-center gap-2 p-2 border-b border-line lg:hidden bg-surface-alt">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink border border-line bg-surface transition-colors"
          style={{ borderRadius: '2px' }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6"  x2="21" y2="6"  />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Filters
        </button>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={zoomIn}  className="px-2.5 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink border border-line bg-surface transition-colors" style={{ borderRadius: '2px' }}>+</button>
          <button onClick={zoomOut} className="px-2.5 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink border border-line bg-surface transition-colors" style={{ borderRadius: '2px' }}>−</button>
          <button onClick={zoomFit} className="px-2.5 py-1.5 text-xs font-mono text-ink-secondary hover:text-ink border border-line bg-surface transition-colors" style={{ borderRadius: '2px' }}>⊡</button>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="lg:hidden border-b border-line bg-surface-alt flex flex-col" style={{ maxHeight: 280 }}>
          {SidebarContent}
        </div>
      )}

      {/* Main area: desktop sidebar + canvas */}
      <div className="flex" style={{ height }}>
        {/* Desktop sidebar — hidden on mobile */}
        <div className="hidden lg:flex w-56 shrink-0 border-r border-line flex-col bg-surface-alt" style={{ height }}>
          {SidebarContent}
        </div>

        {/* Canvas — fills ALL remaining width via flex-1 */}
        <div ref={canvasContainerRef} className="flex-1 min-w-0 overflow-hidden" style={{ height }}>
          <ForceGraph2D
            ref={graphRef}
            width={canvasWidth}
            height={canvasHeight}
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
            onRenderFramePre={onRenderFramePre}
            cooldownTime={3000}
            nodeLabel={(node: any) => `${node.label}\n${node.description || node.id}`}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
          />
        </div>
      </div>
    </div>
  )
}
