'use client'

import { useScrollReveal } from '../utils'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

export function ShiftLeft() {
  const ref = useScrollReveal()

  return (
    <Section border="top" padding="lg" tone="muted" className="relative">
      <div ref={ref} className="contents">
        <div
          className="absolute inset-0 hero-grid opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <span
                data-reveal
                className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6"
              >
                <span className="w-8 h-px bg-primary/40" />
                Shift-left safety
              </span>

              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5"
              >
                Catch risky changes
                <br />
                <span className="text-ink-secondary">before they ship.</span>
              </h2>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-lg"
              >
                DeployTitan analyzes every change before it reaches production. Ship with
                confidence—not guesswork.
              </p>

              <div className="space-y-4">
                {[
                  {
                    label: 'Risk scoring on pull requests',
                    detail: 'Every PR gets a risk signal before merge',
                  },
                  {
                    label: 'Visibility into potential impact',
                    detail: 'Understand blast radius before deploying',
                  },
                  {
                    label: 'Better decisions before deployment',
                    detail: 'Ship confidently, not hopefully',
                  },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    data-reveal
                    data-reveal-delay={String(i + 3)}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="shrink-0 w-8 h-8 flex items-center justify-center border border-line bg-surface text-ink/40 group-hover:text-primary group-hover:border-primary/20 transition-all duration-300"
                      style={{ borderRadius: '2px' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{item.label}</p>
                      <p className="text-xs text-ink-tertiary mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: PR risk card */}
            <div data-reveal data-reveal-delay="6">
              <div
                className="relative border border-line bg-surface p-5 sm:p-8 lg:p-10"
                style={{ borderRadius: '2px' }}
              >
                <div
                  className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-30"
                  style={{ borderColor: PRIMARY }}
                />
                <div
                  className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-30"
                  style={{ borderColor: PRIMARY }}
                />

                <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-5 text-ink-quaternary">
                  PR risk analysis
                </p>

                {[
                  {
                    pr: '#1842 — refactor auth flow',
                    risk: 'High',
                    riskColor: '#ef4444',
                    services: '3 services affected',
                  },
                  {
                    pr: '#1843 — update API timeout',
                    risk: 'Medium',
                    riskColor: '#f59e0b',
                    services: '1 service affected',
                  },
                  {
                    pr: '#1844 — fix typo in copy',
                    risk: 'Low',
                    riskColor: '#22c55e',
                    services: 'No services affected',
                  },
                ].map((item) => (
                  <div
                    key={item.pr}
                    className="flex items-center justify-between gap-2 py-3 border-b border-line/60 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-ink truncate">{item.pr}</p>
                      <p className="text-[10px] text-ink-tertiary mt-0.5">{item.services}</p>
                    </div>
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 shrink-0"
                      style={{
                        color: item.riskColor,
                        backgroundColor: `${item.riskColor}12`,
                        border: `1px solid ${item.riskColor}25`,
                        borderRadius: '1px',
                      }}
                    >
                      {item.risk} risk
                    </span>
                  </div>
                ))}

                <div className="mt-4 flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5"
                    style={{ backgroundColor: `${PRIMARY_RGBA},0.5)`, borderRadius: '0.5px' }}
                  />
                  <span className="text-[10px] font-mono text-ink-tertiary">
                    Analyzed before merge · updated on each push
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
