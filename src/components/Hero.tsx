'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Button } from './shared/Button'
import { Container } from './shared/Container'

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeStatus = 'pending' | 'deploying' | 'success' | 'blocked' | 'paused'

interface NodeState {
  id: string
  status: NodeStatus
}

interface LogEntry {
  time: string
  label: string
  kind: 'info' | 'warn' | 'error'
}

// ─── Static layout data ───────────────────────────────────────────────────────

// Tree: checkout-api (root) → web-storefront + pricing-migration (children)
//       web-storefront → fulfillment-worker (grandchild)
//       pricing-migration → payments-service (grandchild, paused on parent failure)
const NODE_IDS = ['checkout-api', 'web-storefront', 'pricing-migration', 'fulfillment-worker', 'payments-service'] as const
type NodeId = (typeof NODE_IDS)[number]

const TREE_EDGES: [NodeId, NodeId][] = [
  ['checkout-api',      'web-storefront'],
  ['checkout-api',      'pricing-migration'],
  ['web-storefront',    'fulfillment-worker'],
  ['pricing-migration', 'payments-service'],
]

// ─── Animation script ─────────────────────────────────────────────────────────
// Each event fires at `t` ms from cycle start.
// 'node' events update a node's status.
// 'log' events push a log entry.
// 'panel' events reveal the freeze / intelligence panels.

type Event =
  | { t: number; type: 'node'; id: NodeId; status: NodeStatus }
  | { t: number; type: 'log';  entry: LogEntry }
  | { t: number; type: 'panel'; panel: 'freeze' | 'intelligence' }

const SCRIPT: Event[] = [
  // t=0: graph appears, all nodes pending
  // t=1700: start deploying root
  { t: 1700, type: 'node', id: 'checkout-api',      status: 'deploying' },
  { t: 1700, type: 'log',  entry: { time: '09:10', label: 'Release object created — 6 PRs across 5 services.', kind: 'info' } },

  { t: 4500, type: 'node', id: 'checkout-api',      status: 'success' },
  { t: 4500, type: 'log',  entry: { time: '09:18', label: 'checkout-api promoted to production.', kind: 'info' } },

  // Both children start after root succeeds
  { t: 6200, type: 'node', id: 'web-storefront',    status: 'deploying' },
  { t: 6200, type: 'log',  entry: { time: '09:24', label: 'Freeze window confirmed. Deployment window open.', kind: 'info' } },

  { t: 6800, type: 'node', id: 'pricing-migration', status: 'deploying' },
  { t: 6800, type: 'panel', panel: 'freeze' },

  // web-storefront succeeds
  { t: 9400, type: 'node', id: 'web-storefront',    status: 'success' },
  { t: 9400, type: 'log',  entry: { time: '09:29', label: 'web-storefront deployed successfully.', kind: 'info' } },

  // pricing-migration blocks
  { t: 10400, type: 'node', id: 'pricing-migration', status: 'blocked' },
  { t: 10400, type: 'log',  entry: { time: '09:31', label: 'pricing-migration blocked — schema review required.', kind: 'error' } },

  // payments-service paused immediately after its parent blocks
  { t: 11200, type: 'node', id: 'payments-service',  status: 'paused' },
  { t: 11200, type: 'log',  entry: { time: '09:32', label: 'payments-service paused — upstream failure in pricing-migration.', kind: 'warn' } },

  // fulfillment-worker can start (its parent web-storefront succeeded)
  { t: 11800, type: 'node', id: 'fulfillment-worker', status: 'deploying' },
  { t: 11800, type: 'log',  entry: { time: '09:38', label: 'fulfillment-worker started. Rollback owner assigned.', kind: 'warn' } },

  { t: 14800, type: 'node', id: 'fulfillment-worker', status: 'success' },
  { t: 14800, type: 'log',  entry: { time: '09:46', label: 'fulfillment-worker approved. Release partially halted.', kind: 'warn' } },

  { t: 15800, type: 'panel', panel: 'intelligence' },
  // hold until t=21000 then loop
]

const CYCLE_DURATION = 21000

// ─── Node status config ───────────────────────────────────────────────────────

const STATUS_CONFIG: Record<NodeStatus, { label: string; textClass: string; borderClass: string; bgClass: string }> = {
  pending:   { label: 'Pending',   textClass: 'text-ink-tertiary',  borderClass: 'border-line',               bgClass: '' },
  deploying: { label: 'Deploying', textClass: 'text-signal-warning',  borderClass: 'border-signal-warning/50',  bgClass: 'bg-signal-warning/[0.03]' },
  success:   { label: 'Success',   textClass: 'text-signal-success',  borderClass: 'border-signal-success/50',  bgClass: '' },
  blocked:   { label: 'Blocked',   textClass: 'text-signal-danger',   borderClass: 'border-signal-danger/60',   bgClass: 'bg-signal-danger/[0.04]' },
  paused:    { label: 'Paused',    textClass: 'text-ink-tertiary',    borderClass: 'border-signal-warning/30',  bgClass: 'bg-surface-alt/60' },
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

function GraphKeyframes({ normalLengths }: { normalLengths: number[] }) {
  const css = [
    ...normalLengths.map(len => `
      @keyframes drawEdge${len} {
        from { stroke-dashoffset: ${len}px; }
        to   { stroke-dashoffset: 0px; }
      }`),
    `@keyframes edgeFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }`,
    `@keyframes marchDash {
      from { stroke-dashoffset: 0px; }
      to   { stroke-dashoffset: -16px; }
    }`,
    `@keyframes deployPulse {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0.2; }
    }`,
    `@keyframes dotBlink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.25; transform: scale(1.8); }
    }`,
    `@keyframes spinRing {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }`,
    `@media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    }`,
  ].join('\n')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

// ─── Spinner indicator ────────────────────────────────────────────────────────

function DeployingSpinner() {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full border border-signal-warning border-t-transparent"
      style={{
        borderRadius: '50%',
        animation: 'spinRing 0.9s linear infinite',
        verticalAlign: 'middle',
        marginRight: '4px',
      }}
    />
  )
}

// ─── Dependency tree ──────────────────────────────────────────────────────────

interface EdgePath { id: string; d: string; isBlocked: boolean; isPaused: boolean; isActive: boolean; length: number }

function DependencyTree({
  nodeStates,
  cycleKey,
  onNormalLengths,
}: {
  nodeStates: Record<NodeId, NodeStatus>
  cycleKey: number
  onNormalLengths: (lengths: number[]) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs     = useRef<Record<string, HTMLDivElement | null>>({})
  const [edgePaths, setEdgePaths] = useState<EdgePath[]>([])
  const reported = useRef(false)

  useEffect(() => { reported.current = false }, [cycleKey])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const recalc = () => {
      const cr = container.getBoundingClientRect()
      const paths = TREE_EDGES.map(([fromId, toId]) => {
        const fe = nodeRefs.current[fromId]
        const te = nodeRefs.current[toId]
        if (!fe || !te) return null

        const fr = fe.getBoundingClientRect()
        const tr = te.getBoundingClientRect()

        const fx = fr.left - cr.left + fr.width / 2
        const fy = fr.top  - cr.top  + fr.height   // bottom of parent
        const tx = tr.left - cr.left + tr.width / 2
        const ty = tr.top  - cr.top                 // top of child

        const my = (fy + ty) / 2
        const d  = `M ${fx} ${fy} L ${fx} ${my} L ${tx} ${my} L ${tx} ${ty}`
        const len = Math.round(Math.abs(fy - my) + Math.abs(tx - fx) + Math.abs(ty - my))

        const toStatus = nodeStates[toId]
        const isBlocked = toStatus === 'blocked'
        const isPaused  = toStatus === 'paused'
        const isActive  = toStatus !== 'pending'

        return { id: `${fromId}→${toId}`, d, isBlocked, isPaused, isActive, length: len }
      }).filter(Boolean) as EdgePath[]

      setEdgePaths(paths)

      if (!reported.current && paths.length === TREE_EDGES.length) {
        onNormalLengths(paths.filter(p => !p.isBlocked && !p.isPaused).map(p => p.length))
        reported.current = true
      }
    }

    recalc()
    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    return () => ro.disconnect()
  }, [nodeStates, onNormalLengths])

  function renderNode(id: NodeId) {
    const status = nodeStates[id]
    const cfg    = STATUS_CONFIG[status]
    const visible = status !== 'pending' || cycleKey === 0
      ? true // always shown structurally; color/opacity signals state
      : true

    return (
      <div
        ref={el => { nodeRefs.current[id] = el }}
        className={`relative border px-2.5 py-2 ${cfg.borderClass} ${cfg.bgClass}`}
        style={{
          borderRadius: '2px',
          transition: 'border-color 0.5s ease-out, background-color 0.5s ease-out',
        }}
      >
        {status === 'blocked' && (
          <span
            className="absolute -top-px -right-px h-1.5 w-1.5 bg-signal-danger"
            style={{ borderRadius: '50%', animation: 'dotBlink 1.8s ease-in-out infinite' }}
          />
        )}
        {status === 'paused' && (
          <span
            className="absolute -top-px -right-px h-1.5 w-1.5 bg-signal-warning/50"
            style={{ borderRadius: '50%' }}
          />
        )}
        <p className="font-mono text-[9.5px] leading-tight text-ink truncate">{id}</p>
        <p
          className={`mt-1 font-mono text-[8.5px] tracking-[0.1em] uppercase flex items-center gap-1 ${cfg.textClass}`}
          style={{ transition: 'color 0.4s ease-out' }}
        >
          {status === 'deploying' && <DeployingSpinner />}
          {status === 'paused' && <span style={{ marginRight: '4px', fontSize: '8px', opacity: 0.7 }}>‖</span>}
          {cfg.label}
        </p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <marker id="arr-n" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L5,2.5 z" fill="oklch(0.60 0.005 60)" />
          </marker>
          <marker id="arr-b" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L5,2.5 z" fill="oklch(0.52 0.20 25)" />
          </marker>
          <marker id="arr-a" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L5,2.5 z" fill="oklch(0.55 0.10 145)" />
          </marker>
          <marker id="arr-p" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L5,2.5 z" fill="oklch(0.65 0.08 70)" />
          </marker>
        </defs>

        {edgePaths.map((edge) => {
          if (!edge.isActive) {
            // Pending edge: faint dashed placeholder
            return (
              <path
                key={`${edge.id}-${cycleKey}-pending`}
                d={edge.d}
                fill="none"
                stroke="oklch(0.75 0.003 60)"
                strokeWidth={1}
                strokeDasharray="2 4"
                opacity={0.4}
              />
            )
          }

          if (edge.isBlocked) {
            return (
              <path
                key={`${edge.id}-${cycleKey}-blocked`}
                d={edge.d}
                fill="none"
                stroke="oklch(0.52 0.20 25)"
                strokeWidth={1.5}
                markerEnd="url(#arr-b)"
                style={{
                  strokeDasharray: '4 4',
                  animation: 'edgeFadeIn 0.5s ease-out both, marchDash 1.5s linear infinite',
                }}
              />
            )
          }

          if (edge.isPaused) {
            return (
              <path
                key={`${edge.id}-${cycleKey}-paused`}
                d={edge.d}
                fill="none"
                stroke="oklch(0.65 0.08 70)"
                strokeWidth={1}
                markerEnd="url(#arr-p)"
                opacity={0.55}
                style={{
                  strokeDasharray: '3 5',
                  animation: 'edgeFadeIn 0.5s ease-out both',
                }}
              />
            )
          }

          return (
            <path
              key={`${edge.id}-${cycleKey}-active`}
              d={edge.d}
              fill="none"
              stroke="oklch(0.55 0.10 145)"
              strokeWidth={1.5}
              markerEnd="url(#arr-a)"
              style={{
                strokeDasharray: `${edge.length} ${edge.length}`,
                strokeDashoffset: `${edge.length}px`,
                animation: `drawEdge${edge.length} 0.7s cubic-bezier(0.22,1,0.36,1) both`,
              }}
            />
          )
        })}
      </svg>

      {/* Tree grid: 3 cols, 3 rows
           Row 1: [empty]         [checkout-api]     [empty]
           Row 2: [web-storefront] [empty]           [pricing-migration]
           Row 3: [fulfillment]    [empty]           [payments-service]
      */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-6">
        <div className="col-start-2">{renderNode('checkout-api')}</div>
        <div className="col-start-1">{renderNode('web-storefront')}</div>
        <div className="col-start-3">{renderNode('pricing-migration')}</div>
        <div className="col-start-1">{renderNode('fulfillment-worker')}</div>
        <div className="col-start-3">{renderNode('payments-service')}</div>
      </div>
    </div>
  )
}

// ─── Freeze window panel ──────────────────────────────────────────────────────
// Displays a 2-hour production window as a horizontal timeline bar.
// A cursor indicates the current time within the window.

function FreezeWindowPanel({ visible }: { visible: boolean }) {
  // Window: 10:00–12:00 UTC. Current time: ~10:48 (40% through)
  // The cursor animates from 0% to 40% on reveal.
  const [cursorPct, setCursorPct] = useState(0)

  useEffect(() => {
    if (!visible) { setCursorPct(0); return }
    const start = performance.now()
    const duration = 1400
    const target = 40
    const frame = (now: number) => {
      const t    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 4)
      setCursorPct(ease * target)
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [visible])

  const checklistItems = [
    { label: 'Rollback owner assigned', done: true },
    { label: 'Downstream notified',     done: true },
    { label: 'Schema migration approved', done: false },
  ]

  return (
    <div
      className="min-h-[120px] border border-line bg-surface-alt/40 p-3"
      style={{
        borderRadius: '2px',
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">Freeze window</p>
        <span className="font-mono text-[9px] text-signal-warning tracking-wider uppercase">Active</span>
      </div>

      {/* Window bar */}
      <div className="relative h-5 bg-surface-alt border border-line overflow-hidden" style={{ borderRadius: '1px' }}>
        {/* Shaded "elapsed" fill */}
        <div
          className="absolute inset-y-0 left-0 bg-primary/10"
          style={{ width: `${cursorPct}%`, transition: 'none' }}
        />
        {/* Time cursor line */}
        <div
          className="absolute inset-y-0 w-px bg-primary"
          style={{ left: `${cursorPct}%`, transition: 'none' }}
        />
        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <span className="font-mono text-[8px] text-ink-tertiary">10:00</span>
          <span className="font-mono text-[8px] text-ink-tertiary">UTC</span>
          <span className="font-mono text-[8px] text-ink-tertiary">12:00</span>
        </div>
      </div>

      {/* Current time label under cursor */}
      <div className="mt-1.5 mb-3" style={{ paddingLeft: `calc(${cursorPct}% - 12px)` }}>
        <span className="font-mono text-[8px] text-primary-accessible">10:48 now</span>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5">
        {checklistItems.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
            style={{
              opacity:   visible ? 1 : 0,
              transition: `opacity 0.2s ease-out ${0.3 + i * 0.12}s`,
            }}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 ${item.done ? 'bg-signal-success' : 'bg-signal-danger'}`}
              style={{ borderRadius: '1px' }}
            />
            <span className={`font-mono text-[9px] ${item.done ? 'text-ink-secondary' : 'text-signal-danger'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Intelligence panel ───────────────────────────────────────────────────────

function IntelligencePanel({ visible }: { visible: boolean }) {
  const bullets = [
    { icon: '↑', label: 'High rollback rate', detail: 'checkout historically ~12% in prod' },
    { icon: '⚠', label: '1 migration in scope', detail: 'pricing-migration schema change' },
    { icon: '⊘', label: '7 downstream affected', detail: 'payments, inventory, reporting…' },
  ]

  return (
    <div
      className="min-h-[108px] border border-primary/25 bg-primary/[0.03] p-3"
      style={{
        borderRadius: '2px',
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <p className="font-mono text-[10px] tracking-[0.16em] text-primary-accessible uppercase mb-3">
        Rollouts Intelligence
      </p>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div
            key={b.label}
            className="flex items-start gap-2.5"
            style={{
              opacity:   visible ? 1 : 0,
              transition: `opacity 0.25s ease-out ${0.15 + i * 0.12}s`,
            }}
          >
            <span className="font-mono text-[9px] text-primary/60 shrink-0 mt-px w-3 text-center">{b.icon}</span>
            <div>
              <p className="font-mono text-[9.5px] text-ink-secondary leading-tight">{b.label}</p>
              <p className="font-mono text-[8.5px] text-ink-tertiary leading-tight mt-0.5">{b.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Log panel ────────────────────────────────────────────────────────────────

const KIND_CLASS: Record<LogEntry['kind'], string> = {
  info:  'text-ink-secondary',
  warn:  'text-signal-warning',
  error: 'text-signal-danger',
}
const KIND_DOT: Record<LogEntry['kind'], string> = {
  info:  'bg-ink-quaternary',
  warn:  'bg-signal-warning',
  error: 'bg-signal-danger',
}

function LogPanel({ logs, visible }: { logs: LogEntry[]; visible: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div
      className="border border-line bg-surface-alt/30 p-3"
      style={{
        borderRadius: '2px',
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase mb-2.5">
        Event log
      </p>
      <div
        ref={scrollRef}
        className="space-y-2 overflow-hidden"
        style={{ height: '100px' }}
      >
        {logs.map((entry, i) => (
          <div
            key={i}
            className="grid grid-cols-[36px_1fr] gap-1.5 items-start"
            style={{
              animation: 'logSlideIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            <span className="font-mono text-[8.5px] text-ink-tertiary pt-px">{entry.time}</span>
            <div className="flex items-start gap-1.5">
              <span className={`mt-[3px] h-1 w-1 shrink-0 ${KIND_DOT[entry.kind]}`} style={{ borderRadius: '50%' }} />
              <p className={`font-mono text-[9.5px] leading-[1.35] ${KIND_CLASS[entry.kind]}`}>{entry.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const INITIAL_NODE_STATES: Record<NodeId, NodeStatus> = {
  'checkout-api':       'pending',
  'web-storefront':     'pending',
  'pricing-migration':  'pending',
  'fulfillment-worker': 'pending',
  'payments-service':   'pending',
}

export function Hero() {
  const ref = useScrollReveal()

  const [nodeStates,   setNodeStates]   = useState<Record<NodeId, NodeStatus>>(INITIAL_NODE_STATES)
  const [logs,         setLogs]         = useState<LogEntry[]>([])
  const [showFreeze,   setShowFreeze]   = useState(false)
  const [showIntel,    setShowIntel]    = useState(false)
  const [cycleKey,     setCycleKey]     = useState(0)
  const [normalLengths, setNormalLengths] = useState<number[]>([])

  // Derive overall card status from node states
  const hasBlocked   = Object.values(nodeStates).some(s => s === 'blocked')
  const hasPaused    = Object.values(nodeStates).some(s => s === 'paused')
  const hasDeploying = Object.values(nodeStates).some(s => s === 'deploying')
  const headerStatus = hasBlocked ? 'blocked' : hasDeploying ? 'deploying' : hasPaused ? 'paused' : 'pending'

  const onNormalLengths = useCallback((lengths: number[]) => {
    setNormalLengths(lengths)
  }, [])

  // Add logSlideIn keyframe to injected CSS (appended dynamically)
  const extraCss = `
    @keyframes logSlideIn {
      from { opacity: 0; transform: translateY(5px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const reset = () => {
      setNodeStates({ ...INITIAL_NODE_STATES })
      setLogs([])
      setShowFreeze(false)
      setShowIntel(false)
    }

    if (prefersReduced) {
      // Show final state immediately
      setNodeStates({
        'checkout-api':       'success',
        'web-storefront':     'success',
        'pricing-migration':  'blocked',
        'fulfillment-worker': 'success',
        'payments-service':   'paused',
      })
      setLogs(SCRIPT.filter(e => e.type === 'log').map(e => (e as { type: 'log'; entry: LogEntry }).entry))
      setShowFreeze(true)
      setShowIntel(true)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    const runCycle = (key: number) => {
      reset()
      setCycleKey(key)

      for (const event of SCRIPT) {
        const t = setTimeout(() => {
          if (event.type === 'node') {
            setNodeStates(prev => ({ ...prev, [event.id]: event.status }))
          } else if (event.type === 'log') {
            setLogs(prev => [...prev, event.entry])
          } else if (event.type === 'panel') {
            if (event.panel === 'freeze')       setShowFreeze(true)
            if (event.panel === 'intelligence') setShowIntel(true)
          }
        }, event.t)
        timers.push(t)
      }

      // Schedule next cycle
      const loopT = setTimeout(() => runCycle(key + 1), CYCLE_DURATION)
      timers.push(loopT)
    }

    // Initial delay
    const init = setTimeout(() => runCycle(0), 800)
    timers.push(init)

    return () => timers.forEach(clearTimeout)
  }, [])

  const logVisible = logs.length > 0

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-line pt-28 pb-20 lg:pt-34 lg:pb-28"
    >
      <GraphKeyframes normalLengths={normalLengths} />
      <style dangerouslySetInnerHTML={{ __html: extraCss }} />

      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(180deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 42%, rgba(201,168,76,0) 100%)',
        }}
        aria-hidden="true"
      />

      <Container width="page" padding="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-start">

          {/* Left column */}
          <div className="max-w-2xl">
            <p data-reveal className="mb-5 font-mono text-[11px] tracking-[0.24em] text-ink-tertiary uppercase">
              Release coordination infrastructure
            </p>
            <h1
              data-reveal
              data-reveal-delay="1"
              className="max-w-[13ch] font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.96] tracking-[-0.05em] text-ink"
            >
              Ship multi-service releases with full dependency control.
            </h1>
            <p
              data-reveal
              data-reveal-delay="2"
              className="mt-6 max-w-[52ch] text-lg leading-8 text-ink-secondary lg:text-[1.125rem]"
            >
              Titan Rollouts models your release as a dependency graph: merges sequence by upstream
              readiness, freeze windows close on checklist completion, and rollback owners are
              assigned before the window opens.
            </p>
            <div
              data-reveal
              data-reveal-delay="3"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button as="a" href={CREATE_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                Create account
              </Button>
              <Button as="a" href="#release-workflow" variant="outline" size="lg">
                ↓ See how it works
              </Button>
            </div>
          </div>

          {/* Right column */}
          <div data-reveal data-reveal-delay="3">
            <div
              className="relative overflow-hidden border border-line bg-surface"
              style={{ borderRadius: '2px' }}
            >

              {/* Card header */}
              <div className="border-line bg-surface-alt/70 flex items-center justify-between border-b px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/20 flex h-5 w-5 items-center justify-center" style={{ borderRadius: '1px' }}>
                    <span className="bg-primary block h-2 w-2" style={{ borderRadius: '1px' }} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">Titan Rollouts</p>
                    <p className="font-mono text-[11px] text-ink">release / spring-checkout / prod-window-b</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {headerStatus === 'blocked' && (
                    <>
                      <span
                        className="h-1.5 w-1.5 bg-signal-danger"
                        style={{ borderRadius: '50%', animation: 'dotBlink 1.8s ease-in-out infinite' }}
                      />
                      <p className="font-mono text-[10px] tracking-[0.08em] text-signal-danger uppercase">Blocked</p>
                    </>
                  )}
                  {headerStatus === 'deploying' && (
                    <>
                      <DeployingSpinner />
                      <p className="font-mono text-[10px] tracking-[0.08em] text-signal-warning uppercase">Deploying</p>
                    </>
                  )}
                  {headerStatus === 'pending' && (
                    <p className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary uppercase">Pending</p>
                  )}
                </div>
              </div>

              <div className="space-y-4 p-4 md:p-4">

                {/* Dependency tree */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-ink-tertiary uppercase">Dependency graph</p>
                    <p className="font-mono text-[10px] text-ink-tertiary">5 services · 6 PRs</p>
                  </div>
                  <div className="min-h-[184px] sm:min-h-[196px]">
                    <DependencyTree
                      nodeStates={nodeStates}
                      cycleKey={cycleKey}
                      onNormalLengths={onNormalLengths}
                    />
                  </div>
                </div>

                {/* Event log */}
                <LogPanel logs={logs} visible={logVisible} />

                {/* Freeze window */}
                <FreezeWindowPanel visible={showFreeze} />

                {/* Intelligence */}
                <IntelligencePanel visible={showIntel} />

              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
