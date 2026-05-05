'use client'

import { useScrollReveal } from '../utils'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

const capabilities = [
  {
    icon: '↺',
    label: 'Instant rollback to known-good',
    detail:
      'Shift 100% of traffic back to the last stable version in seconds — no redeploy, no pipeline run.',
  },
  {
    icon: '⚡',
    label: 'Policy-triggered, not event-triggered',
    detail:
      'Actions fire when health thresholds breach — error rate, latency, custom signals — not just on deployment events.',
  },
  {
    icon: '🌍',
    label: 'Geo-aware rollouts',
    detail:
      'Target rollouts per region. Roll to US during US business hours, EU during EU hours — automatically.',
  },
  {
    icon: '✓',
    label: 'Controller must be reachable',
    detail:
      'DeployTitan controls traffic routing within your deployment versions. It requires its controller to be reachable — it is not a network-level load balancer.',
  },
]

export function Resilience() {
  const ref = useScrollReveal()

  return (
    <Section border="top" padding="lg" tone="muted" className="relative">
      <div ref={ref} className="contents">
        <div
          className="absolute inset-0 hero-grid opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: copy */}
            <div className="order-1">
              <span
                data-reveal
                className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6"
              >
                <span className="w-8 h-px bg-primary/40" />
                Resilience
              </span>

              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5"
              >
                Rollback in seconds,
                <br />
                <span className="text-ink-secondary">not minutes.</span>
              </h2>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-lg"
              >
                DeployTitan is a real-time control plane for your deployment versions — not a load
                balancer. When health signals breach your defined thresholds, it shifts traffic back
                to the last known-good version instantly.
              </p>

              <div className="space-y-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={cap.label}
                    data-reveal
                    data-reveal-delay={String(i + 3)}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-6 h-6 flex items-center justify-center border shrink-0 text-sm font-mono mt-0.5"
                      style={{
                        borderRadius: '2px',
                        color: `${PRIMARY_RGBA},0.8)`,
                        borderColor: `${PRIMARY_RGBA},0.2)`,
                        backgroundColor: `${PRIMARY_RGBA},0.05)`,
                      }}
                    >
                      {cap.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink leading-snug">{cap.label}</p>
                      <p className="text-sm text-ink-secondary leading-relaxed mt-0.5">
                        {cap.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p
                data-reveal
                data-reveal-delay="7"
                className="mt-8 text-sm font-medium"
                style={{ color: PRIMARY }}
              >
                Policies act. You stay in control.
              </p>
            </div>

            {/* Right: visual card */}
            <div data-reveal data-reveal-delay="3" className="order-2">
              <div
                className="relative border border-line bg-surface p-5 sm:p-8 lg:p-10"
                style={{ borderRadius: '2px' }}
              >
                <div
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l opacity-30"
                  style={{ borderColor: PRIMARY }}
                />
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r opacity-30"
                  style={{ borderColor: PRIMARY }}
                />

                <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-6 text-ink-quaternary">
                  Policy rollback — live
                </p>

                {/* Health signal breach */}
                <div className="space-y-3 mb-6">
                  {[
                    {
                      label: 'Error rate',
                      value: '4.8%',
                      threshold: '> 2%',
                      status: 'breached',
                      color: '#ef4444',
                    },
                    {
                      label: 'p99 latency',
                      value: '1 240 ms',
                      threshold: '> 800 ms',
                      status: 'breached',
                      color: '#ef4444',
                    },
                    {
                      label: 'Active version',
                      value: 'v1.14.2',
                      threshold: '',
                      status: 'rolling back',
                      color: `${PRIMARY_RGBA},0.8)`,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-1.5 h-1.5 shrink-0"
                          style={{ backgroundColor: row.color, borderRadius: '0.5px' }}
                        />
                        <span className="text-xs font-mono text-ink">{row.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-ink">{row.value}</span>
                        {row.threshold && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5"
                            style={{
                              color: row.color,
                              backgroundColor: `${row.color}12`,
                              border: `1px solid ${row.color}25`,
                              borderRadius: '1px',
                            }}
                          >
                            {row.threshold}
                          </span>
                        )}
                        {!row.threshold && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5"
                            style={{
                              color: row.color,
                              backgroundColor: `${PRIMARY_RGBA},0.06)`,
                              border: `1px solid ${PRIMARY_RGBA},0.15)`,
                              borderRadius: '1px',
                            }}
                          >
                            {row.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Version revert */}
                <div className="pt-5 border-t border-line space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-ink-tertiary">Reverting to</span>
                    <span className="text-ink font-medium">v1.13.9 (known-good)</span>
                  </div>
                  <div
                    className="w-full bg-surface-alt rounded-sm overflow-hidden"
                    style={{ height: '4px', borderRadius: '1px' }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: '72%',
                        background: `${PRIMARY_RGBA},0.7)`,
                        borderRadius: '1px',
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[10px] font-mono text-signal-success">
                      No redeployment · No pipeline · 0 manual steps
                    </span>
                  </div>
                </div>
              </div>

              {/* Geo rollout card */}
              <div
                className="relative border border-line bg-surface p-5 sm:p-6 mt-4"
                style={{ borderRadius: '2px' }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-4 text-ink-quaternary">
                  Geo-aware rollout schedule
                </p>
                <div className="space-y-2">
                  {[
                    {
                      region: 'us-east',
                      window: 'Mon–Fri 09:00–17:00 ET',
                      status: 'deploying',
                      color: '#22c55e',
                    },
                    {
                      region: 'eu-west',
                      window: 'Mon–Fri 09:00–17:00 CET',
                      status: 'queued',
                      color: `${PRIMARY_RGBA},0.7)`,
                    },
                    {
                      region: 'ap-southeast',
                      window: 'Mon–Fri 09:00–17:00 SGT',
                      status: 'queued',
                      color: `${PRIMARY_RGBA},0.7)`,
                    },
                  ].map((r) => (
                    <div key={r.region} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 shrink-0"
                          style={{ backgroundColor: r.color, borderRadius: '0.5px' }}
                        />
                        <span className="text-xs font-mono text-ink">{r.region}</span>
                      </div>
                      <span className="text-[10px] font-mono text-ink-tertiary hidden sm:block">
                        {r.window}
                      </span>
                      <span
                        className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5"
                        style={{
                          color: r.color,
                          backgroundColor: `${r.color}12`,
                          border: `1px solid ${r.color}25`,
                          borderRadius: '1px',
                        }}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
