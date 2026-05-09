'use client'

import { useScrollReveal } from '../utils'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

const heavySteps = [
  { label: 'Write change', desc: 'Developer makes a code edit' },
  { label: 'Open PR', desc: 'Pull request review process begins' },
  { label: 'CI / Build', desc: 'Pipeline runs, image is built' },
  { label: 'Deploy', desc: 'Full deployment to production' },
  { label: 'Verify', desc: 'Manual checks and log watching' },
]

const burdens = [
  { label: 'Takes time', detail: 'Minutes to hours per change' },
  { label: 'Requires coordination', detail: 'Dev, QA, ops all involved' },
  { label: 'Carries risk', detail: 'Every deploy is a potential incident' },
]

export function Reframe() {
  const ref = useScrollReveal()

  return (
    <Section border="top" padding="lg" tone="muted" className="relative">
      <div ref={ref} className="contents">
        <div
          className="absolute inset-0 hero-grid opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <span
              data-reveal
              className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6 justify-center"
            >
              <span className="w-8 h-px bg-primary/40" />
              The real issue
              <span className="w-8 h-px bg-primary/40" />
            </span>

            <h2
              data-reveal
              data-reveal-delay="1"
              className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-6"
            >
              The problem isn't your team—
              <br />
              <span className="text-ink-secondary">it's your control.</span>
            </h2>

            <p
              data-reveal
              data-reveal-delay="2"
              className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Most teams rely on deployments to make changes. That means every fix, rollback, or
              adjustment goes through the same heavy pipeline:
            </p>
          </div>

          {/* Pipeline visualization */}
          <div data-reveal data-reveal-delay="3" className="max-w-3xl mx-auto mb-12">
            {/* Mobile: vertical stack */}
            <div className="flex flex-col gap-0 sm:hidden">
              {heavySteps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-stretch">
                  <div
                    className="border border-line bg-surface px-4 py-3 flex items-center gap-3 group hover:border-signal-warning/30 hover:bg-signal-warning/[0.02] transition-all duration-300"
                    style={{
                      borderRadius:
                        i === 0 ? '2px 2px 0 0' : i === heavySteps.length - 1 ? '0 0 2px 2px' : '0',
                      borderTop: i > 0 ? 'none' : undefined,
                    }}
                  >
                    <div
                      className="text-[9px] font-mono uppercase tracking-[0.08em] shrink-0 w-6"
                      style={{ color: `${PRIMARY_RGBA},0.5)` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[11px] font-mono font-medium text-ink">{step.label}</div>
                    <div className="text-[9px] font-mono text-ink-tertiary ml-auto leading-tight text-right">
                      {step.desc}
                    </div>
                  </div>
                  {i < heavySteps.length - 1 && (
                    <div className="flex items-center justify-center h-4 border-l border-r border-line bg-surface-alt/60 -my-px relative z-10">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M5 2v6M3 6l2 2 2-2"
                          stroke="rgba(8,5,3,0.2)"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: horizontal */}
            <div className="hidden sm:flex items-stretch gap-0">
              {heavySteps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1 min-w-0">
                  <div
                    className="flex-1 border border-line bg-surface p-4 text-center group hover:border-signal-warning/30 hover:bg-signal-warning/[0.02] transition-all duration-300"
                    style={{
                      borderRadius:
                        i === 0 ? '2px 0 0 2px' : i === heavySteps.length - 1 ? '0 2px 2px 0' : '0',
                      borderLeft: i > 0 ? 'none' : undefined,
                    }}
                  >
                    <div
                      className="text-[9px] font-mono uppercase tracking-[0.08em] mb-1.5 transition-colors duration-300"
                      style={{ color: `${PRIMARY_RGBA},0.5)` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[11px] font-mono font-medium text-ink truncate">
                      {step.label}
                    </div>
                    <div className="text-[9px] font-mono text-ink-tertiary mt-1 leading-tight">
                      {step.desc}
                    </div>
                  </div>
                  {i < heavySteps.length - 1 && (
                    <div className="shrink-0 w-5 flex items-center justify-center bg-surface-alt border-t border-b border-line h-full -mx-px relative z-10">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5h6M6 3l2 2-2 2"
                          stroke="rgba(8,5,3,0.2)"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Heavy label */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px flex-1 bg-signal-warning/20" />
              <span className="text-[10px] font-mono text-signal-warning/90 uppercase tracking-wider px-2">
                Required for every single change
              </span>
              <div className="h-px flex-1 bg-signal-warning/20" />
            </div>
          </div>

          {/* The three burdens */}
          <div data-reveal data-reveal-delay="4" className="max-w-2xl mx-auto">
            <div
              className="border border-line bg-surface p-5 sm:p-8 lg:p-10"
              style={{ borderRadius: '2px' }}
            >
              <p className="text-sm font-mono text-ink-secondary uppercase tracking-wider mb-6 text-center">
                Every fix, rollout, or rollback:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {burdens.map((b, i) => (
                  <div
                    key={b.label}
                    className="text-center p-4 border border-line/60"
                    style={{
                      borderRadius: '2px',
                      backgroundColor: 'rgba(239,68,68,0.02)',
                      borderColor: 'rgba(239,68,68,0.1)',
                    }}
                    data-reveal
                    data-reveal-delay={String(5 + i)}
                  >
                    <div className="text-xs font-mono font-medium text-signal-danger mb-1">
                      {b.label}
                    </div>
                    <div className="text-[10px] font-mono text-ink-tertiary">{b.detail}</div>
                  </div>
                ))}
              </div>

              {/* Closing reframe line */}
              <div className="pt-6 border-t border-line text-center">
                <p className="text-base font-medium tracking-[-0.01em] text-ink">
                  Deployments became the bottleneck.
                </p>
                <p className="text-sm text-ink-secondary mt-1">
                  We treat them as something you can{' '}
                  <span className="font-medium" style={{ color: PRIMARY }}>
                    control after the fact.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="gold-line mt-10 max-w-xs mx-auto" />
        </Container>
      </div>
    </Section>
  )
}
