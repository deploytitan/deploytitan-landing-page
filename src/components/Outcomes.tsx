import type { ReactNode } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../utils'

const GOLD = '#c9a84c'

/* ========== Animated Counter ========== */

function AnimatedStat({ value, suffix, duration = 1800 }: { value: number; suffix: string; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        observer.disconnect()

        const startTime = performance.now()
        const tick = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ========== Data ========== */

interface Outcome {
  stat: string
  numericValue: number
  suffix: string
  prefix?: string
  label: string
  description: string
  beforeLabel: string
  beforeValue: string
  afterLabel: string
  afterValue: string
  barPercent: number
  beforeBarPercent?: number
  barColor: string
  icon: ReactNode
}

const outcomes: Outcome[] = [
  {
    stat: '85%',
    numericValue: 85,
    suffix: '%',
    label: 'Fewer Deploy Incidents',
    description: 'Catch breaking changes, dependency conflicts, and config errors before they reach production. Most issues never make it past the PR.',
    beforeLabel: 'Without guardrails',
    beforeValue: '~12 deploy incidents/month',
    afterLabel: 'With DeployTitan',
    afterValue: '~2 deploy incidents/month',
    barPercent: 85,
    barColor: '#22c55e',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    stat: '30s',
    numericValue: 30,
    suffix: 's',
    label: 'Detection to Rollback',
    description: 'When issues slip through, automated detection and rollback contain them in seconds — not the 15-45 minutes most teams experience.',
    beforeLabel: 'Traditional monitoring',
    beforeValue: '15-45 min to detect + act',
    afterLabel: 'With DeployTitan',
    afterValue: '~30s detect + auto-rollback',
    barPercent: 5,
    beforeBarPercent: 92,
    barColor: '#3b82f6',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    stat: '100%',
    numericValue: 100,
    suffix: '%',
    label: 'Safe Deploy Ordering',
    description: 'Deterministic deployment manifests ensure services deploy in the correct order, every time. No more "it worked on staging."',
    beforeLabel: 'Manual ordering',
    beforeValue: 'Hope-based deploy sequences',
    afterLabel: 'With DeployTitan',
    afterValue: 'Dependency-aware ordering',
    barPercent: 100,
    barColor: GOLD,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/>
      </svg>
    ),
  },
  {
    stat: '3x',
    numericValue: 3,
    suffix: 'x',
    label: 'Faster Shipping',
    description: 'Deploy more frequently with less anxiety. Teams ship 3x more often when they trust their deployment guardrails.',
    beforeLabel: 'Fear-driven deploys',
    beforeValue: '2-3 deploys/week',
    afterLabel: 'With DeployTitan',
    afterValue: '8-12 deploys/day',
    barPercent: 85,
    barColor: '#22c55e',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
]

/* ========== Component ========== */

export function Outcomes() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 lg:py-32 border-t border-line bg-surface-alt/50 relative" ref={ref}>
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6 justify-center">
            <span className="w-8 h-px bg-gold/40" />
            The outcome
            <span className="w-8 h-px bg-gold/40" />
          </span>
          <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08] mb-5">
            Deploy with <span className="text-ink-secondary">confidence.</span>
          </h2>
          <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary max-w-lg mx-auto leading-relaxed">
            Measurable improvements from day one. Here's what engineering teams achieve with DeployTitan.
          </p>
        </div>

        {/* Outcome cards — 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {outcomes.map((o, oi) => (
            <div
              key={o.label}
              data-reveal
              data-reveal-delay={String(oi + 3)}
              className="group relative border border-line bg-white p-8 lg:p-10 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(201,168,76,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/0 group-hover:border-gold/30 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/0 group-hover:border-gold/30 transition-all duration-300" />

              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Left: Big stat */}
                <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                  <div
                    className="w-12 h-12 flex items-center justify-center border border-line mb-4 text-ink-tertiary group-hover:text-gold group-hover:border-gold/20 group-hover:bg-gold-muted/50 transition-all duration-300"
                    style={{ borderRadius: '2px' }}
                  >
                    {o.icon}
                  </div>
                  <div className="font-display font-medium text-5xl lg:text-6xl tracking-[-0.03em] leading-none" style={{ color: GOLD }}>
                    {o.prefix || ''}<AnimatedStat value={o.numericValue} suffix={o.suffix} />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-medium text-lg tracking-[-0.01em] mb-2">{o.label}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-5">{o.description}</p>

                  {/* Before / After comparison */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-[100px]">
                        <span className="text-[10px] font-mono uppercase tracking-[0.06em] text-ink-quaternary">{o.beforeLabel.length > 20 ? 'Before' : o.beforeLabel}</span>
                      </div>
                      <div className="flex-1 h-2 bg-surface-alt border border-line overflow-hidden" style={{ borderRadius: '1px' }}>
                        <div className="h-full bg-ink-quaternary/30" style={{ width: `${o.beforeBarPercent ?? 35}%`, borderRadius: '1px' }} />
                      </div>
                      <span className="text-[10px] text-ink-tertiary font-mono flex-shrink-0 w-[160px] text-right">{o.beforeValue}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-[100px]">
                        <span className="text-[10px] font-mono uppercase tracking-[0.06em] text-ink-secondary">With Titan</span>
                      </div>
                      <div className="flex-1 h-2 bg-surface-alt border border-line overflow-hidden" style={{ borderRadius: '1px' }}>
                        <div
                          className="h-full transition-all duration-1000"
                          style={{ width: `${o.barPercent}%`, backgroundColor: o.barColor, borderRadius: '1px' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono flex-shrink-0 w-[160px] text-right" style={{ color: o.barColor }}>{o.afterValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary strip */}
        <div data-reveal data-reveal-delay="7" className="mt-8 border border-line bg-white/60 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderRadius: '2px' }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-signal-success" style={{ borderRadius: '1px' }} />
            <span className="text-sm text-ink-secondary">
              Expected outcomes based on deployment failure analysis across design partners
            </span>
          </div>
          <a
            href="#waitlist"
            className="text-sm font-medium flex items-center gap-2 hover:text-gold transition-colors"
          >
            See it for your team
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
