'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { sleep, useScrollReveal } from '../utils'
import { APP_URL, DEMO_URL } from '@/lib/env'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

/* ========== Traffic Split Visual ========== */

type TrafficPhase = 'stable' | 'deploying' | 'splitting' | 'shifting' | 'rollback' | 'recovered'

interface Version {
  id: string
  label: string
  traffic: number
  status: 'stable' | 'active' | 'canary' | 'rolling-back' | 'healthy'
  color: string
}

const phaseLabels: Record<TrafficPhase, { text: string; color: string }> = {
  stable: { text: 'All traffic on v1.4.2 — stable', color: '#22c55e' },
  deploying: { text: 'Deploying v1.4.3 at 0% traffic...', color: '#3b82f6' },
  splitting: { text: 'Cohort: beta-testers → v1.4.3', color: PRIMARY },
  shifting: { text: 'Expanding rollout: 5% → 25%...', color: '#3b82f6' },
  rollback: { text: 'Error spike detected — rolling back', color: '#ef4444' },
  recovered: { text: 'Recovered — v1.4.2 at 100%', color: '#22c55e' },
}

function TrafficSplitVisual() {
  const [phase, setPhase] = useState<TrafficPhase>('stable')
  const [versions, setVersions] = useState<Version[]>([
    { id: 'v142', label: 'v1.4.2', traffic: 100, status: 'stable', color: '#22c55e' },
    { id: 'v143', label: 'v1.4.3', traffic: 0, status: 'canary', color: '#3b82f6' },
  ])
  const [cohortPinned, setCohortPinned] = useState(false)
  const [logLines, setLogLines] = useState<{ text: string; color: string }[]>([])
  const runningRef = useRef(true)

  const addLog = useCallback((text: string, color: string) => {
    setLogLines((prev) => [...prev.slice(-4), { text, color }])
  }, [])

  const runLoop = useCallback(async () => {
    while (runningRef.current) {
      // Phase 1: Stable
      setPhase('stable')
      setVersions([
        { id: 'v142', label: 'v1.4.2', traffic: 100, status: 'stable', color: '#22c55e' },
        { id: 'v143', label: 'v1.4.3', traffic: 0, status: 'canary', color: '#3b82f6' },
      ])
      setCohortPinned(false)
      setLogLines([{ text: 'v1.4.2 healthy · 100% traffic', color: '#22c55e' }])
      await sleep(2200)
      if (!runningRef.current) return

      // Phase 2: New version deployed at 0%
      setPhase('deploying')
      addLog('Deploying v1.4.3 → Cloud Run...', '#3b82f6')
      await sleep(1600)
      if (!runningRef.current) return

      // Phase 3: Cohort pinned
      setPhase('splitting')
      setCohortPinned(true)
      setVersions([
        { id: 'v142', label: 'v1.4.2', traffic: 100, status: 'stable', color: '#22c55e' },
        { id: 'v143', label: 'v1.4.3', traffic: 0, status: 'canary', color: PRIMARY },
      ])
      addLog('beta-testers cohort pinned → v1.4.3', PRIMARY)
      await sleep(1800)
      if (!runningRef.current) return

      // Phase 4: Gradual shift 5% → 25%
      setPhase('shifting')
      for (const pct of [5, 10, 15, 20, 25]) {
        if (!runningRef.current) return
        setVersions([
          { id: 'v142', label: 'v1.4.2', traffic: 100 - pct, status: 'stable', color: '#22c55e' },
          { id: 'v143', label: 'v1.4.3', traffic: pct, status: 'active', color: '#3b82f6' },
        ])
        await sleep(220)
      }
      addLog('Traffic: 25% on v1.4.3', '#3b82f6')
      await sleep(1400)
      if (!runningRef.current) return

      // Phase 5: Error spike → rollback
      setPhase('rollback')
      addLog('⚠ Error rate spike — rolling back', '#ef4444')
      setVersions([
        { id: 'v142', label: 'v1.4.2', traffic: 100, status: 'stable', color: '#22c55e' },
        { id: 'v143', label: 'v1.4.3', traffic: 0, status: 'rolling-back', color: '#ef4444' },
      ])
      setCohortPinned(false)
      for (const pct of [25, 20, 14, 8, 3, 0]) {
        if (!runningRef.current) return
        setVersions([
          { id: 'v142', label: 'v1.4.2', traffic: 100 - pct, status: 'stable', color: '#22c55e' },
          { id: 'v143', label: 'v1.4.3', traffic: pct, status: 'rolling-back', color: '#ef4444' },
        ])
        await sleep(160)
      }
      await sleep(800)
      if (!runningRef.current) return

      // Phase 6: Recovered
      setPhase('recovered')
      setVersions([
        { id: 'v142', label: 'v1.4.2', traffic: 100, status: 'healthy', color: '#22c55e' },
        { id: 'v143', label: 'v1.4.3', traffic: 0, status: 'canary', color: '#3b82f6' },
      ])
      addLog('v1.4.2 at 100% — stable', '#22c55e')
      await sleep(2800)
      if (!runningRef.current) return
    }
  }, [addLog])

  useEffect(() => {
    runningRef.current = true
    runLoop()
    return () => {
      runningRef.current = false
    }
  }, [runLoop])

  const info = phaseLabels[phase]

  return (
    <div
      className="relative w-full h-full border border-line/50 bg-surface overflow-hidden flex flex-col"
      style={{ borderRadius: '2px' }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line/50 bg-surface-alt/60 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 bg-ink flex items-center justify-center"
            style={{ borderRadius: '1px' }}
          >
            <svg
              className="w-2.5 h-2.5 text-surface"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-ink-tertiary tracking-wider uppercase">
            DeployTitan — Traffic Control
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 transition-all duration-500"
            style={{
              backgroundColor: info.color,
              borderRadius: '1px',
              boxShadow: `0 0 6px ${info.color}50`,
            }}
          />
          <span
            className="text-[9px] font-mono transition-colors duration-500"
            style={{ color: info.color }}
          >
            {info.text}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Version traffic bars */}
        <div className="space-y-3">
          <div className="text-[9px] font-mono text-ink-quaternary uppercase tracking-[0.08em]">
            Active versions
          </div>
          {versions.map((v) => (
            <div key={v.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 transition-colors duration-300"
                    style={{ backgroundColor: v.color, borderRadius: '0.5px' }}
                  />
                  <span className="text-[11px] font-mono font-medium text-ink">{v.label}</span>
                  <span
                    className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 transition-all duration-300"
                    style={{
                      color: v.color,
                      backgroundColor: `${v.color}12`,
                      borderRadius: '1px',
                      border: `1px solid ${v.color}25`,
                    }}
                  >
                    {v.status === 'rolling-back' ? 'rolling back' : v.status}
                  </span>
                  {v.id === 'v143' && cohortPinned && v.status !== 'rolling-back' && (
                    <span
                      className="text-[8px] font-mono px-1.5 py-0.5"
                      style={{
                        color: PRIMARY,
                        backgroundColor: `${PRIMARY_RGBA},0.08)`,
                        borderRadius: '1px',
                        border: `1px solid ${PRIMARY_RGBA},0.2)`,
                      }}
                    >
                      beta-testers
                    </span>
                  )}
                </div>
                <span
                  className="text-[13px] font-mono font-medium tabular-nums transition-colors duration-300"
                  style={{ color: v.traffic > 0 ? v.color : 'rgba(8,5,3,0.2)' }}
                >
                  {v.traffic}%
                </span>
              </div>
              {/* Traffic bar */}
              <div
                className="w-full h-2 bg-surface-alt overflow-hidden"
                style={{ borderRadius: '1px', border: '1px solid rgba(8,5,3,0.05)' }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${v.traffic}%`,
                    backgroundColor: v.color,
                    borderRadius: '1px',
                    opacity: v.traffic === 0 ? 0 : 1,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-line/60" />

        {/* Policy / action row */}
        <div className="flex items-center justify-between">
          <div className="text-[9px] font-mono text-ink-quaternary uppercase tracking-[0.08em]">
            Policy
          </div>
          <div className="flex items-center gap-2">
            {['Auto-rollback', 'Health checks', 'Cohort routing'].map((tag) => (
              <span
                key={tag}
                className="text-[8px] font-mono px-1.5 py-0.5"
                style={{
                  color: `${PRIMARY_RGBA},0.7)`,
                  backgroundColor: `${PRIMARY_RGBA},0.06)`,
                  border: `1px solid ${PRIMARY_RGBA},0.12)`,
                  borderRadius: '1px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Event log */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="text-[9px] font-mono text-ink-quaternary uppercase tracking-[0.08em] mb-1.5">
            Event log
          </div>
          <div className="space-y-1">
            {logLines.map((line, i) => (
              <div key={i} className="log-entry flex items-center gap-2">
                <div
                  className="w-1 h-1 shrink-0"
                  style={{ backgroundColor: line.color, borderRadius: '0.5px' }}
                />
                <span className="text-[9px] font-mono text-ink-secondary">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle gold scan line overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 bottom-0 w-20 opacity-[0.015]"
          style={{
            background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
            animation: 'scan-line 10s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

/* ========== Hero ========== */

export function Hero() {
  const ref = useScrollReveal()

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden max-w-page mx-auto"
      ref={ref}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 hero-grid opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Visual — right side, hidden on mobile */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 w-[52%] items-center pr-12 pl-4">
        <div className="w-full h-[460px]" data-reveal data-reveal-delay="3">
          <TrafficSplitVisual />
        </div>
        {/* Gradient fades for blending */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-surface to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
      </div>

      {/* Left copy */}
      <div className="relative z-10 flex flex-col justify-center px-6 lg:px-12 py-20 lg:py-0 w-full lg:w-[50%]">
        <div className="max-w-xl">
          {/* Status pill */}
          <div data-reveal className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-line bg-surface"
              style={{ borderRadius: '2px' }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full bg-signal-success opacity-75"
                  style={{
                    animation: 'ping-anim 1.5s cubic-bezier(0,0,0.2,1) infinite',
                    borderRadius: '1px',
                  }}
                />
                <span
                  className="relative inline-flex h-2 w-2 bg-signal-success"
                  style={{ borderRadius: '1px' }}
                />
              </span>
              <span className="text-xs text-ink-secondary font-mono">
                Live public demo available
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1
            data-reveal
            data-reveal-delay="1"
            className="font-display font-medium text-[clamp(2rem,3.8vw,4rem)] leading-[1.08] tracking-[-0.022em] mb-6"
          >
            Ship more.
            <br />
            Break less.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Know why.</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-3 -z-0"
                style={{ background: `${PRIMARY_RGBA},0.12)` }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-reveal
            data-reveal-delay="2"
            className="text-lg text-ink-secondary max-w-md mb-4 leading-relaxed"
          >
            Releases shouldn't be the scariest part of your week. Stop guessing which release broke
            production.
          </p>

          {/* Supporting line */}
          <p
            data-reveal
            data-reveal-delay="2"
            className="text-sm max-w-md mb-8 leading-relaxed font-medium"
            style={{ color: PRIMARY }}
          >
            Catch risk early. Ship without fear. Learn from every release.
          </p>

          {/* CTAs */}
          <div
            data-reveal
            data-reveal-delay="3"
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3"
          >
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center justify-center gap-2.5 bg-ink text-surface dark:text-surface px-8 py-4 text-base font-medium hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] transition-all active:scale-[0.97] group"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium border border-ink/15 hover:border-primary/40 hover:bg-primary-muted transition-all"
              style={{ borderRadius: '2px' }}
            >
              Talk to an engineer
            </a>
          </div>

          {/* Sub-text */}
          <p
            data-reveal
            data-reveal-delay="3"
            className="mt-3 text-xs text-ink-quaternary font-mono"
          >
            No credit card required · 14-day free trial ·{' '}
            <a href="/journey" className="text-primary/70 hover:text-primary transition-colors">
              Why we built this →
            </a>
          </p>

          {/* Trust tags */}
          <div data-reveal data-reveal-delay="4" className="mt-10 pt-10 border-t border-line">
            <p
              className="text-xs uppercase tracking-widest mb-4 font-mono"
              style={{ color: PRIMARY }}
            >
              Works with your existing stack
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
              {['Kubernetes', 'GCP Cloud Run', 'AWS Lambda'].map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <div
                    className="w-1 h-1"
                    style={{ backgroundColor: `${PRIMARY_RGBA},0.3)`, borderRadius: '0.5px' }}
                  />
                  <span className="font-mono text-xs">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — compact version with visual */}
      <div className="lg:hidden px-6 pb-12">
        <div className="w-full h-[360px]" data-reveal data-reveal-delay="4">
          <TrafficSplitVisual />
        </div>
      </div>
    </section>
  )
}
