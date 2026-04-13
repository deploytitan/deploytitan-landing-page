import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollReveal, sleep } from '../utils'

/* ========== Colors ========== */
const GOLD = '#c9a84c'
const GOLD_RGBA = 'rgba(201,168,76'

/* ========== Service Map — Control Plane Visualization ========== */

interface ServiceNode {
  id: string
  label: string
  x: number
  y: number
  type: 'gateway' | 'service' | 'data'
}

interface ServiceEdge {
  from: string
  to: string
}

const nodes: ServiceNode[] = [
  { id: 'gateway', label: 'API Gateway', x: 200, y: 40, type: 'gateway' },
  { id: 'auth', label: 'Auth', x: 80, y: 120, type: 'service' },
  { id: 'orders', label: 'Orders', x: 200, y: 120, type: 'service' },
  { id: 'catalog', label: 'Catalog', x: 320, y: 120, type: 'service' },
  { id: 'payments', label: 'Payments', x: 120, y: 210, type: 'service' },
  { id: 'inventory', label: 'Inventory', x: 280, y: 210, type: 'service' },
  { id: 'users-db', label: 'Users DB', x: 60, y: 290, type: 'data' },
  { id: 'orders-db', label: 'Orders DB', x: 200, y: 290, type: 'data' },
  { id: 'cache', label: 'Cache', x: 340, y: 290, type: 'data' },
]

const edges: ServiceEdge[] = [
  { from: 'gateway', to: 'auth' },
  { from: 'gateway', to: 'orders' },
  { from: 'gateway', to: 'catalog' },
  { from: 'auth', to: 'payments' },
  { from: 'orders', to: 'payments' },
  { from: 'orders', to: 'inventory' },
  { from: 'catalog', to: 'inventory' },
  { from: 'auth', to: 'users-db' },
  { from: 'payments', to: 'orders-db' },
  { from: 'inventory', to: 'cache' },
]

type NodeStatus = 'healthy' | 'deploying' | 'anomaly' | 'affected' | 'rolling-back' | 'recovered'
type Phase = 'monitoring' | 'deploy' | 'anomaly' | 'tracing' | 'rollback' | 'stable'

/* Phase descriptions for the status bar */
const phaseInfo: Record<Phase, { label: string; color: string }> = {
  monitoring: { label: 'All services healthy', color: '#22c55e' },
  deploy: { label: 'Deploy detected: payments v4.1.0', color: '#3b82f6' },
  anomaly: { label: 'Anomaly: payments latency 5x spike', color: '#ef4444' },
  tracing: { label: 'Tracing blast radius...', color: GOLD },
  rollback: { label: 'Rolling back payments → v4.0.9', color: GOLD },
  stable: { label: 'Recovered — 0 user impact', color: '#22c55e' },
}

function getNodeMap(): Map<string, ServiceNode> {
  const m = new Map<string, ServiceNode>()
  for (const n of nodes) m.set(n.id, n)
  return m
}

function ServiceMap() {
  const [statuses, setStatuses] = useState<Record<string, NodeStatus>>(() => {
    const s: Record<string, NodeStatus> = {}
    for (const n of nodes) s[n.id] = 'healthy'
    return s
  })
  const [phase, setPhase] = useState<Phase>('monitoring')
  const [scanY, setScanY] = useState<number | null>(null)
  const [affectedEdges, setAffectedEdges] = useState<Set<string>>(new Set())
  const runningRef = useRef(true)
  const nodeMap = getNodeMap()

  const setNodeStatus = useCallback((id: string, status: NodeStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }))
  }, [])

  const resetAll = useCallback(() => {
    const s: Record<string, NodeStatus> = {}
    for (const n of nodes) s[n.id] = 'healthy'
    setStatuses(s)
    setAffectedEdges(new Set())
    setScanY(null)
  }, [])

  const runLoop = useCallback(async () => {
    while (runningRef.current) {
      // Phase 1: Monitoring — everything healthy
      resetAll()
      setPhase('monitoring')
      await sleep(2500)
      if (!runningRef.current) return

      // Phase 2: Deploy starts on payments
      setPhase('deploy')
      setNodeStatus('payments', 'deploying')
      await sleep(2000)
      if (!runningRef.current) return

      // Phase 3: Anomaly on payments
      setPhase('anomaly')
      setNodeStatus('payments', 'anomaly')
      await sleep(1500)
      if (!runningRef.current) return

      // Phase 4: AI traces blast radius — scan line sweeps, affected nodes light up
      setPhase('tracing')
      setScanY(0)

      // Animate scan line from top to bottom
      for (let y = 0; y <= 340; y += 8) {
        if (!runningRef.current) return
        setScanY(y)
        await sleep(20)
      }
      setScanY(null)

      // Mark affected edges and nodes
      setAffectedEdges(new Set(['auth-payments', 'orders-payments', 'payments-orders-db']))
      await sleep(400)
      setNodeStatus('orders', 'affected')
      await sleep(300)
      setNodeStatus('auth', 'affected')
      await sleep(300)
      setNodeStatus('orders-db', 'affected')
      await sleep(1200)
      if (!runningRef.current) return

      // Phase 5: Rollback
      setPhase('rollback')
      setNodeStatus('payments', 'rolling-back')
      await sleep(600)
      setNodeStatus('orders', 'rolling-back')
      await sleep(400)
      setNodeStatus('auth', 'rolling-back')
      await sleep(400)
      setNodeStatus('orders-db', 'rolling-back')
      await sleep(1500)
      if (!runningRef.current) return

      // Phase 6: Recovered
      setPhase('stable')
      setAffectedEdges(new Set())
      for (const n of nodes) {
        setNodeStatus(n.id, 'recovered')
      }
      await sleep(3000)
      if (!runningRef.current) return
    }
  }, [resetAll, setNodeStatus])

  useEffect(() => {
    runningRef.current = true
    runLoop()
    return () => { runningRef.current = false }
  }, [runLoop])

  const statusColor = (status: NodeStatus) => {
    switch (status) {
      case 'healthy': return { fill: 'white', stroke: 'rgba(8,5,3,0.12)', dot: '#22c55e' }
      case 'deploying': return { fill: 'rgba(59,130,246,0.04)', stroke: 'rgba(59,130,246,0.3)', dot: '#3b82f6' }
      case 'anomaly': return { fill: 'rgba(239,68,68,0.06)', stroke: '#ef4444', dot: '#ef4444' }
      case 'affected': return { fill: 'rgba(239,68,68,0.03)', stroke: 'rgba(239,68,68,0.4)', dot: '#f59e0b' }
      case 'rolling-back': return { fill: `${GOLD_RGBA},0.05)`, stroke: GOLD, dot: GOLD }
      case 'recovered': return { fill: 'rgba(34,197,94,0.03)', stroke: 'rgba(34,197,94,0.3)', dot: '#22c55e' }
    }
  }

  const info = phaseInfo[phase]

  return (
    <div
      className="relative w-full h-full border border-line/50 bg-white overflow-hidden"
      style={{ borderRadius: '2px' }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-line/50 bg-surface-alt/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-ink flex items-center justify-center" style={{ borderRadius: '1px' }}>
            <svg className="w-2.5 h-2.5 text-surface" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-[10px] font-mono text-ink-tertiary tracking-wider uppercase">DeployTitan — Control Plane</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 transition-all duration-300"
            style={{
              backgroundColor: info.color,
              borderRadius: '1px',
              boxShadow: `0 0 6px ${info.color}40`,
            }}
          />
          <span
            className="text-[9px] font-mono transition-colors duration-300"
            style={{ color: info.color }}
          >
            {info.label}
          </span>
        </div>
      </div>

      {/* Service map SVG */}
      <svg viewBox="0 0 400 340" className="w-full" style={{ height: 'calc(100% - 34px)' }}>
        {/* Subtle grid */}
        <defs>
          <pattern id="hero-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0V40H0" fill="none" stroke={`${GOLD_RGBA},0.04)`} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="340" fill="url(#hero-map-grid)" />

        {/* AI scan line */}
        {scanY !== null && (
          <g>
            <line x1="0" y1={scanY} x2="400" y2={scanY} stroke={`${GOLD_RGBA},0.3)`} strokeWidth="1" />
            <rect x="0" y={scanY - 8} width="400" height="16" fill={`${GOLD_RGBA},0.03)`} />
          </g>
        )}

        {/* Edges */}
        {edges.map((e) => {
          const from = nodeMap.get(e.from)!
          const to = nodeMap.get(e.to)!
          const edgeKey = `${e.from}-${e.to}`
          const isAffected = affectedEdges.has(edgeKey)
          const midY = (from.y + to.y) / 2

          return (
            <g key={edgeKey}>
              <path
                d={`M${from.x},${from.y} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}`}
                fill="none"
                stroke={isAffected ? 'rgba(239,68,68,0.35)' : 'rgba(8,5,3,0.06)'}
                strokeWidth={isAffected ? '1.5' : '1'}
                strokeDasharray={isAffected ? 'none' : '4 3'}
                style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
              />
              {/* Travelling dot on affected edges */}
              {isAffected && (
                <circle r="2.5" fill="rgba(239,68,68,0.5)">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={`M${from.x},${from.y} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}`}
                  />
                </circle>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const status = statuses[node.id]
          const colors = statusColor(status)
          const isAnomaly = status === 'anomaly'
          const isAffected = status === 'affected'
          const isRollingBack = status === 'rolling-back'
          const isDeploying = status === 'deploying'
          const nodeW = node.type === 'gateway' ? 80 : node.type === 'data' ? 60 : 64
          const nodeH = 28

          return (
            <g key={node.id}>
              {/* Pulse ring for anomaly */}
              {isAnomaly && (
                <circle cx={node.x} cy={node.y} r="28" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1">
                  <animate attributeName="r" values="20;32;20" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Scan ring for tracing */}
              {(isAffected || isRollingBack) && (
                <circle cx={node.x} cy={node.y} r="22" fill="none"
                  stroke={isRollingBack ? `${GOLD_RGBA},0.2)` : 'rgba(245,158,11,0.15)'}
                  strokeWidth="0.8" strokeDasharray="3 2">
                  <animateTransform attributeName="transform" type="rotate" values={`0 ${node.x} ${node.y};360 ${node.x} ${node.y}`} dur="6s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Deploy spinner */}
              {isDeploying && (
                <circle cx={node.x} cy={node.y} r="22" fill="none"
                  stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="6 8">
                  <animateTransform attributeName="transform" type="rotate" values={`0 ${node.x} ${node.y};360 ${node.x} ${node.y}`} dur="3s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Node body */}
              <rect
                x={node.x - nodeW / 2}
                y={node.y - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx="1"
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth="1"
                style={{ transition: 'fill 0.3s, stroke 0.3s' }}
              />

              {/* Status dot */}
              <circle
                cx={node.x - nodeW / 2 + 8}
                cy={node.y}
                r="2.5"
                fill={colors.dot}
                style={{ transition: 'fill 0.3s' }}
              >
                {(isAnomaly || isDeploying || isAffected) && (
                  <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                )}
              </circle>

              {/* Label */}
              <text
                x={node.x + 4}
                y={node.y + 3.5}
                fontSize="9"
                fontFamily="var(--font-mono)"
                fontWeight="500"
                fill="rgba(8,5,3,0.6)"
                textAnchor="middle"
                style={{ transition: 'fill 0.3s' }}
              >
                {node.label}
              </text>

              {/* Warning badge */}
              {isAnomaly && (
                <g>
                  <circle cx={node.x + nodeW / 2 - 2} cy={node.y - nodeH / 2 + 2} r="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="0.5" />
                  <text x={node.x + nodeW / 2 - 2} y={node.y - nodeH / 2 + 5} fontSize="7" fontWeight="bold" fill="#ef4444" textAnchor="middle">!</text>
                </g>
              )}

              {/* Rollback badge */}
              {isRollingBack && (
                <g>
                  <circle cx={node.x + nodeW / 2 - 2} cy={node.y - nodeH / 2 + 2} r="6" fill={`${GOLD_RGBA},0.12)`} stroke={GOLD} strokeWidth="0.5" />
                  <text x={node.x + nodeW / 2 - 2} y={node.y - nodeH / 2 + 5} fontSize="7" fill={GOLD} textAnchor="middle">↺</text>
                </g>
              )}

              {/* Recovered check */}
              {status === 'recovered' && (
                <g>
                  <circle cx={node.x + nodeW / 2 - 2} cy={node.y - nodeH / 2 + 2} r="6" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="0.5" />
                  <text x={node.x + nodeW / 2 - 2} y={node.y - nodeH / 2 + 5.5} fontSize="7" fill="#22c55e" textAnchor="middle">✓</text>
                </g>
              )}
            </g>
          )
        })}

        {/* "DeployTitan watching" label */}
        <g opacity="0.4">
          <rect x="140" y="318" width="120" height="14" rx="1" fill={`${GOLD_RGBA},0.06)`} stroke={`${GOLD_RGBA},0.12)`} strokeWidth="0.5" />
          <text x="200" y="328" fontSize="7" fontFamily="var(--font-mono)" fontWeight="500" fill={GOLD} textAnchor="middle" letterSpacing="0.06em">
            MONITORING 9 SERVICES
          </text>
        </g>
      </svg>

      {/* Subtle gold scan line overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 bottom-0 w-20 opacity-[0.015]"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            animation: 'scan-line 10s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

/* ========== Platform Interaction — Deploy Review Dashboard ========== */

type ReviewPhase = 'scanning' | 'review' | 'approving' | 'deploying' | 'verifying' | 'success'

const reviewPhaseInfo: Record<ReviewPhase, { label: string; color: string }> = {
  scanning: { label: 'Scanning deployment diff...', color: '#3b82f6' },
  review: { label: 'Review required: 3 risk signals detected', color: '#f59e0b' },
  approving: { label: 'Operator approved deployment', color: GOLD },
  deploying: { label: 'Canary deployment in progress...', color: '#3b82f6' },
  verifying: { label: 'Verifying health metrics...', color: GOLD },
  success: { label: 'Deployment successful — all checks passed', color: '#22c55e' },
}

interface DepService {
  name: string
  risk: 'none' | 'low' | 'medium' | 'high'
  change: string
}

const depServices: DepService[] = [
  { name: 'payments', risk: 'high', change: '+482 −31 lines' },
  { name: 'orders', risk: 'medium', change: 'schema migration' },
  { name: 'auth', risk: 'low', change: 'env config' },
  { name: 'gateway', risk: 'none', change: 'no changes' },
  { name: 'inventory', risk: 'none', change: 'no changes' },
]

const riskColor: Record<string, string> = {
  none: '#22c55e',
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
}

interface MetricRow {
  label: string
  value: number
  target: number
  unit: string
}

const healthMetrics: MetricRow[] = [
  { label: 'p99 Latency', value: 0, target: 142, unit: 'ms' },
  { label: 'Error Rate', value: 0, target: 0.02, unit: '%' },
  { label: 'Throughput', value: 0, target: 1247, unit: 'rps' },
  { label: 'CPU Usage', value: 0, target: 34, unit: '%' },
]

function PlatformInteraction() {
  const [phase, setPhase] = useState<ReviewPhase>('scanning')
  const [scanProgress, setScanProgress] = useState(0)
  const [visibleServices, setVisibleServices] = useState(0)
  const [canaryPercent, setCanaryPercent] = useState(0)
  const [metrics, setMetrics] = useState<MetricRow[]>(healthMetrics)
  const [cursorY, setCursorY] = useState(0)
  const [showApproveClick, setShowApproveClick] = useState(false)
  const runningRef = useRef(true)

  const runLoop = useCallback(async () => {
    while (runningRef.current) {
      // Reset
      setPhase('scanning')
      setScanProgress(0)
      setVisibleServices(0)
      setCanaryPercent(0)
      setMetrics(healthMetrics)
      setCursorY(0)
      setShowApproveClick(false)

      // Phase 1: Scanning
      for (let i = 0; i <= 100; i += 2) {
        if (!runningRef.current) return
        setScanProgress(i)
        await sleep(30)
      }
      await sleep(400)
      if (!runningRef.current) return

      // Phase 2: Review — reveal services one by one
      setPhase('review')
      for (let i = 1; i <= depServices.length; i++) {
        if (!runningRef.current) return
        setVisibleServices(i)
        await sleep(300)
      }
      await sleep(1200)
      if (!runningRef.current) return

      // Animate cursor moving to approve button
      for (let y = 0; y <= 100; y += 4) {
        if (!runningRef.current) return
        setCursorY(y)
        await sleep(20)
      }
      await sleep(300)
      setShowApproveClick(true)
      await sleep(500)
      if (!runningRef.current) return

      // Phase 3: Approving
      setPhase('approving')
      setShowApproveClick(false)
      await sleep(800)
      if (!runningRef.current) return

      // Phase 4: Canary deployment progress
      setPhase('deploying')
      for (let i = 0; i <= 100; i += 1) {
        if (!runningRef.current) return
        setCanaryPercent(i)
        await sleep(40)
      }
      await sleep(300)
      if (!runningRef.current) return

      // Phase 5: Verifying — animate metrics filling in
      setPhase('verifying')
      const steps = 20
      for (let step = 1; step <= steps; step++) {
        if (!runningRef.current) return
        const progress = step / steps
        setMetrics(healthMetrics.map((m) => ({
          ...m,
          value: Number((m.target * progress).toFixed(m.unit === '%' && m.target < 1 ? 2 : 0)),
        })))
        await sleep(60)
      }
      await sleep(600)
      if (!runningRef.current) return

      // Phase 6: Success
      setPhase('success')
      await sleep(3500)
      if (!runningRef.current) return
    }
  }, [])

  useEffect(() => {
    runningRef.current = true
    runLoop()
    return () => { runningRef.current = false }
  }, [runLoop])

  const pInfo = reviewPhaseInfo[phase]

  return (
    <div
      className="relative w-full h-full border border-line/50 bg-white overflow-hidden flex flex-col"
      style={{ borderRadius: '2px' }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-line/50 bg-surface-alt/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-ink flex items-center justify-center" style={{ borderRadius: '1px' }}>
            <svg className="w-2.5 h-2.5 text-surface" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 12l2 2 4-4" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-ink-tertiary tracking-wider uppercase">DeployTitan — Deploy Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 transition-all duration-300"
            style={{
              backgroundColor: pInfo.color,
              borderRadius: '1px',
              boxShadow: `0 0 6px ${pInfo.color}40`,
            }}
          />
          <span className="text-[9px] font-mono transition-colors duration-300" style={{ color: pInfo.color }}>
            {pInfo.label}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden p-4 flex flex-col gap-3 relative">

        {/* Deployment header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono font-medium text-ink">payments-service v2.14.0</div>
            <div className="text-[9px] font-mono text-ink-tertiary mt-0.5">PR #847 · feat: add retry logic for failed transactions</div>
          </div>
          <div
            className="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider"
            style={{
              borderRadius: '1px',
              backgroundColor: phase === 'success' ? 'rgba(34,197,94,0.08)' : phase === 'review' ? 'rgba(245,158,11,0.08)' : `${GOLD_RGBA},0.08)`,
              color: phase === 'success' ? '#22c55e' : phase === 'review' ? '#f59e0b' : GOLD,
              border: `1px solid ${phase === 'success' ? 'rgba(34,197,94,0.2)' : phase === 'review' ? 'rgba(245,158,11,0.2)' : `${GOLD_RGBA},0.2)`}`,
            }}
          >
            {phase === 'scanning' ? 'analyzing' : phase === 'success' ? 'deployed' : phase === 'review' ? 'needs review' : phase}
          </div>
        </div>

        {/* Scanning phase */}
        {phase === 'scanning' && (
          <div className="flex-1 flex flex-col justify-center items-center gap-3">
            <div className="w-full max-w-[280px]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono text-ink-tertiary">Scanning dependency graph</span>
                <span className="text-[9px] font-mono text-ink-secondary">{scanProgress}%</span>
              </div>
              <div className="w-full h-1 bg-surface-alt overflow-hidden" style={{ borderRadius: '0.5px' }}>
                <div
                  className="h-full transition-all duration-100"
                  style={{
                    width: `${scanProgress}%`,
                    background: `linear-gradient(90deg, ${GOLD}, #3b82f6)`,
                    borderRadius: '0.5px',
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {['5 services', '12 dependencies', '3 databases'].map((item, i) => (
                <div key={item} className="flex items-center gap-1.5" style={{ opacity: scanProgress > (i + 1) * 25 ? 1 : 0.3, transition: 'opacity 0.3s' }}>
                  <div className="w-1 h-1" style={{ backgroundColor: GOLD, borderRadius: '0.5px' }} />
                  <span className="text-[8px] font-mono text-ink-tertiary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review phase — impact assessment */}
        {(phase === 'review' || phase === 'approving') && (
          <div className="flex-1 flex flex-col gap-2.5 relative">
            <div className="text-[9px] font-mono text-ink-tertiary uppercase tracking-wider">Impact Assessment</div>

            <div className="flex flex-col gap-1.5">
              {depServices.map((svc, i) => (
                <div
                  key={svc.name}
                  className="flex items-center gap-3 px-2.5 py-1.5 border transition-all duration-300"
                  style={{
                    borderRadius: '1px',
                    opacity: i < visibleServices ? 1 : 0,
                    transform: i < visibleServices ? 'translateX(0)' : 'translateX(-8px)',
                    borderColor: svc.risk === 'high' ? 'rgba(239,68,68,0.2)' : svc.risk === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(8,5,3,0.06)',
                    backgroundColor: svc.risk === 'high' ? 'rgba(239,68,68,0.02)' : 'transparent',
                  }}
                >
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: riskColor[svc.risk], borderRadius: '0.5px' }} />
                  <span className="text-[10px] font-mono font-medium text-ink w-20">{svc.name}</span>
                  <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5" style={{
                    color: riskColor[svc.risk],
                    backgroundColor: `${riskColor[svc.risk]}10`,
                    borderRadius: '1px',
                  }}>{svc.risk}</span>
                  <span className="text-[8px] font-mono text-ink-quaternary ml-auto">{svc.change}</span>
                </div>
              ))}
            </div>

            {/* Approve / Reject buttons */}
            <div className="flex items-center gap-2 mt-auto relative">
              <div
                className="px-4 py-1.5 text-[9px] font-mono font-medium uppercase tracking-wider transition-all duration-300"
                style={{
                  borderRadius: '1px',
                  backgroundColor: phase === 'approving' ? '#22c55e' : 'rgba(34,197,94,0.06)',
                  color: phase === 'approving' ? 'white' : '#22c55e',
                  border: `1px solid ${phase === 'approving' ? '#22c55e' : 'rgba(34,197,94,0.2)'}`,
                  boxShadow: phase === 'approving' ? '0 0 12px rgba(34,197,94,0.2)' : 'none',
                }}
              >
                {phase === 'approving' ? '✓ Approved' : 'Approve Deploy'}
              </div>
              <div
                className="px-4 py-1.5 text-[9px] font-mono uppercase tracking-wider"
                style={{
                  borderRadius: '1px',
                  backgroundColor: 'rgba(239,68,68,0.04)',
                  color: 'rgba(239,68,68,0.5)',
                  border: '1px solid rgba(239,68,68,0.1)',
                }}
              >
                Reject
              </div>

              {/* Animated cursor */}
              {phase === 'review' && cursorY > 0 && (
                <div
                  className="absolute pointer-events-none z-10 transition-opacity duration-200"
                  style={{
                    left: `${20 + cursorY * 0.3}px`,
                    top: `${-30 + cursorY * 0.5}px`,
                    opacity: cursorY > 20 ? 0.6 : 0,
                  }}
                >
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path d="M1 1L1 13L4.5 10L7.5 16L9.5 15L6.5 9L11 9L1 1Z" fill="rgba(8,5,3,0.7)" stroke="white" strokeWidth="1" />
                  </svg>
                </div>
              )}

              {/* Click ripple */}
              {showApproveClick && (
                <div
                  className="absolute w-6 h-6 pointer-events-none"
                  style={{
                    left: '30px',
                    top: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34,197,94,0.15)',
                    animation: 'ping-anim 0.6s ease-out forwards',
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* Deploying phase — canary rollout */}
        {phase === 'deploying' && (
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-[9px] font-mono text-ink-tertiary uppercase tracking-wider">Canary Rollout</div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-ink-secondary">Traffic shifted to v2.14.0</span>
                <span className="text-[10px] font-mono font-medium" style={{ color: '#3b82f6' }}>{canaryPercent}%</span>
              </div>
              <div className="w-full h-2 bg-surface-alt overflow-hidden" style={{ borderRadius: '1px' }}>
                <div
                  className="h-full transition-all duration-100"
                  style={{
                    width: `${canaryPercent}%`,
                    background: `linear-gradient(90deg, #3b82f6, ${GOLD})`,
                    borderRadius: '1px',
                  }}
                />
              </div>
            </div>

            {/* Canary stages */}
            <div className="flex items-center gap-2">
              {[
                { label: '5%', threshold: 5 },
                { label: '25%', threshold: 25 },
                { label: '50%', threshold: 50 },
                { label: '100%', threshold: 100 },
              ].map((stage) => (
                <div
                  key={stage.label}
                  className="flex items-center gap-1.5 px-2 py-1 border transition-all duration-300"
                  style={{
                    borderRadius: '1px',
                    borderColor: canaryPercent >= stage.threshold ? 'rgba(59,130,246,0.2)' : 'rgba(8,5,3,0.06)',
                    backgroundColor: canaryPercent >= stage.threshold ? 'rgba(59,130,246,0.03)' : 'transparent',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 transition-colors duration-300"
                    style={{
                      backgroundColor: canaryPercent >= stage.threshold ? '#3b82f6' : 'rgba(8,5,3,0.15)',
                      borderRadius: '0.5px',
                    }}
                  />
                  <span className="text-[8px] font-mono" style={{
                    color: canaryPercent >= stage.threshold ? '#3b82f6' : 'rgba(8,5,3,0.3)',
                  }}>{stage.label}</span>
                </div>
              ))}
            </div>

            {/* Live metric tickers */}
            <div className="grid grid-cols-2 gap-1.5 mt-auto">
              {healthMetrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between px-2 py-1 border border-line/30" style={{ borderRadius: '1px' }}>
                  <span className="text-[8px] font-mono text-ink-tertiary">{m.label}</span>
                  <span className="text-[9px] font-mono text-ink-secondary">{m.target}{m.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verifying phase — health metrics */}
        {phase === 'verifying' && (
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-[9px] font-mono text-ink-tertiary uppercase tracking-wider">Health Verification</div>

            <div className="flex flex-col gap-2">
              {metrics.map((m) => {
                const pct = m.target > 0 ? Math.min((m.value / m.target) * 100, 100) : 0
                return (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono text-ink-secondary">{m.label}</span>
                      <span className="text-[9px] font-mono font-medium" style={{ color: GOLD }}>
                        {m.unit === '%' && m.target < 1 ? m.value.toFixed(2) : Math.round(m.value)}{m.unit}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-alt overflow-hidden" style={{ borderRadius: '0.5px' }}>
                      <div
                        className="h-full transition-all duration-100"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: GOLD,
                          borderRadius: '0.5px',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Scanning indicator */}
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-2 h-2" style={{ borderRadius: '1px', border: `1px solid ${GOLD}` }}>
                <div className="w-full h-full" style={{
                  backgroundColor: `${GOLD_RGBA},0.3)`,
                  animation: 'pulse-anim 1s ease-in-out infinite',
                }} />
              </div>
              <span className="text-[8px] font-mono" style={{ color: GOLD }}>Running 12 automated health checks...</span>
            </div>
          </div>
        )}

        {/* Success phase */}
        {phase === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{
                borderRadius: '2px',
                backgroundColor: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="text-center">
              <div className="text-[11px] font-mono font-medium text-ink">Deployment Verified</div>
              <div className="text-[9px] font-mono text-ink-tertiary mt-1">payments-service v2.14.0 is live</div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {[
                { label: '0 errors', color: '#22c55e' },
                { label: '142ms p99', color: '#22c55e' },
                { label: '12/12 checks', color: '#22c55e' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <div className="w-1 h-1" style={{ backgroundColor: stat.color, borderRadius: '0.5px' }} />
                  <span className="text-[8px] font-mono" style={{ color: stat.color }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtle gold scan line overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 bottom-0 w-20 opacity-[0.015]"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            animation: 'scan-line 10s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

/* ========== Hero Carousel ========== */

const SLIDE_COUNT = 2
const AUTO_ROTATE_MS = 18000

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-rotate
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT)
    }, AUTO_ROTATE_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
    // Reset timer on manual interaction
    if (timerRef.current) clearInterval(timerRef.current)
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT)
      }, AUTO_ROTATE_MS)
    }
  }

  const slideLabels = ['Control Plane', 'Deploy Review']

  return (
    <div
      className="w-full h-full flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide container */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          <div className="w-full h-full shrink-0">
            <ServiceMap />
          </div>
          <div className="w-full h-full shrink-0">
            <PlatformInteraction />
          </div>
        </div>
      </div>

      {/* Carousel controls — dots + labels */}
      <div className="flex items-center justify-center gap-3 mt-3">
        {slideLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => goToSlide(i)}
            className="flex items-center gap-1.5 px-2.5 py-1 transition-all duration-300"
            style={{
              borderRadius: '1px',
              backgroundColor: activeSlide === i ? `${GOLD_RGBA},0.08)` : 'transparent',
              border: `1px solid ${activeSlide === i ? `${GOLD_RGBA},0.2)` : 'rgba(8,5,3,0.06)'}`,
            }}
          >
            <div
              className="w-1.5 h-1.5 transition-all duration-300"
              style={{
                backgroundColor: activeSlide === i ? GOLD : 'rgba(8,5,3,0.15)',
                borderRadius: '0.5px',
              }}
            />
            <span
              className="text-[8px] font-mono uppercase tracking-wider transition-colors duration-300"
              style={{
                color: activeSlide === i ? GOLD : 'rgba(8,5,3,0.3)',
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ========== Hero ========== */

export function Hero() {
  const ref = useScrollReveal()

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" ref={ref}>
      {/* Grid bg */}
      <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Carousel — right side, hidden on mobile */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 w-[52%] items-center pr-12 pl-4">
        <div className="w-full h-[520px]" data-reveal data-reveal-delay="3">
          <HeroCarousel />
        </div>
        {/* Gradient fades for blending */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-surface to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
      </div>

      {/* Left copy */}
      <div className="relative z-10 flex flex-col justify-center px-6 lg:px-12 py-32 lg:py-0 w-full lg:w-[50%]">
        <div className="max-w-xl">
          {/* Status pill */}
          <div data-reveal className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-line bg-white" style={{ borderRadius: '2px' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full bg-signal-success opacity-75" style={{ animation: 'ping-anim 1.5s cubic-bezier(0,0,0.2,1) infinite', borderRadius: '1px' }} />
                <span className="relative inline-flex h-2 w-2 bg-signal-success" style={{ borderRadius: '1px' }} />
              </span>
              <span className="text-xs text-ink-secondary font-mono">Accepting early access partners</span>
            </div>
          </div>

          {/* Heading */}
          <h1 data-reveal data-reveal-delay="1" className="font-display font-medium text-[clamp(2rem,3.8vw,4rem)] leading-[1.08] tracking-[-0.022em] mb-6">
            Stop deployments<br />from breaking<br />
            <span className="relative inline-block">
              <span className="relative z-10">production.</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 -z-0" style={{ background: `${GOLD_RGBA},0.12)` }} />
            </span>
          </h1>

          {/* Subtitle */}
          <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary max-w-md mb-8 leading-relaxed">
            A deployment control plane that understands your service dependencies.
            Predict cascading failures. Auto-rollback before production breaks.
          </p>

          {/* CTAs */}
          <div data-reveal data-reveal-delay="3" className="flex flex-col sm:flex-row items-start gap-4">
            <a href="#waitlist" className="inline-flex items-center gap-2.5 bg-ink text-surface px-8 py-4 text-base font-medium hover:bg-ink/85 transition-all active:scale-[0.97] group" style={{ borderRadius: '2px' }}>
              Join the Waitlist
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
            <a href="#solution" className="inline-flex items-center px-8 py-4 text-base font-medium border border-ink/15 hover:border-gold/40 hover:bg-gold-muted transition-all" style={{ borderRadius: '2px' }}>
              Learn more
            </a>
          </div>

          {/* Platform tags */}
          <div data-reveal data-reveal-delay="4" className="mt-10 pt-10 border-t border-line">
            <p className="text-xs uppercase tracking-[0.1em] mb-4 font-mono" style={{ color: `${GOLD_RGBA},0.4)` }}>Built for modern infrastructure</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-ink-secondary">
              {['Kubernetes', 'AWS Lambda', 'GCP Cloud Run', 'Azure AKS', 'Docker Swarm'].map((p) => (
                <div key={p} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1" style={{ backgroundColor: `${GOLD_RGBA},0.3)`, borderRadius: '0.5px' }} />
                  <span className="font-mono text-xs">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — compact version with carousel */}
      <div className="lg:hidden px-6 pb-12">
        <div className="w-full h-[400px]" data-reveal data-reveal-delay="4">
          <HeroCarousel />
        </div>
      </div>
    </section>
  )
}
