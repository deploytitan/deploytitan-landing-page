'use client'

import { useScrollReveal } from '../utils'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

const capabilities = [
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
    label: 'Rollback owners assigned before rollout',
    detail:
      'Every service in a release has a named rollback owner attached to the release object itself, before the first merge happens.',
  },
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: 'Rollback playbooks linked to the release',
    detail:
      'Recovery steps, migration reversal procedures, and dependency rollback order are documented on the release record, not in someone\'s head.',
  },
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: 'Dependency-aware rollback sequencing',
    detail:
      'When a rollback touches multiple services, DeployTitan sequences the revert order based on the same dependency graph used during the original release.',
  },
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    label: 'Rollback coordination via Slack',
    detail:
      'When a rollback is triggered, the right people are notified in the right channels with the release context already attached.',
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
            <div className="order-1">
              <span
                data-reveal
                className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6"
              >
                <span className="w-8 h-px bg-primary/40" />
                Rollback coordination
              </span>

              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5"
              >
                Prepare the recovery path
                <br />
                <span className="text-ink-secondary">before the rollout starts.</span>
              </h2>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-lg"
              >
                Most rollback incidents are painful because the recovery plan only gets made
                after something breaks. DeployTitan attaches owners, playbooks, and
                dependency-aware sequencing to the release before a single merge happens.
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
                      className="w-6 h-6 flex items-center justify-center border shrink-0 mt-0.5"
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
                className="mt-8 text-sm font-medium text-ink-secondary"
              >
                Rollback confidence before release day, not after.
              </p>
            </div>

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

                <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-6 text-ink-tertiary">
                  Rollback checklist — spring-checkout
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { service: 'fulfillment-worker', owner: 'alice@', status: 'assigned', color: '#22c55e' },
                    { service: 'checkout-api', owner: 'bob@', status: 'assigned', color: '#22c55e' },
                    { service: 'pricing-migration', owner: 'carol@', status: 'playbook linked', color: `${PRIMARY_RGBA},0.8)` },
                    { service: 'web-storefront', owner: 'dave@', status: 'pending', color: '#f59e0b' },
                  ].map((row) => (
                    <div key={row.service} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-1.5 h-1.5 shrink-0"
                          style={{ backgroundColor: row.color, borderRadius: '0.5px' }}
                        />
                        <span className="text-xs font-mono text-ink">{row.service}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-ink-tertiary hidden sm:block">{row.owner}</span>
                        <span
                          className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5"
                          style={{
                            color: row.color,
                            backgroundColor: `${row.color}12`,
                            border: `1px solid ${row.color}25`,
                            borderRadius: '1px',
                          }}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-line space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-ink-tertiary">Rollback readiness</span>
                    <span className="text-ink font-medium">3 / 4 services ready</span>
                  </div>
                  <div
                    className="w-full bg-surface-alt overflow-hidden"
                    style={{ height: '4px', borderRadius: '1px' }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: '75%',
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
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span className="text-[10px] font-mono text-signal-warning">
                      web-storefront rollback owner unassigned. Block promotion until resolved.
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="relative border border-line bg-surface p-5 sm:p-6 mt-4"
                style={{ borderRadius: '2px' }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-4 text-ink-tertiary">
                  Rollback sequence — if production degrades
                </p>
                <div className="space-y-2">
                  {[
                    { step: '1', action: 'Revert web-storefront', note: 'no downstream deps' },
                    { step: '2', action: 'Revert checkout-api', note: 'after storefront stable' },
                    { step: '3', action: 'Revert pricing-migration', note: 'schema rollback script linked' },
                    { step: '4', action: 'Revert fulfillment-worker', note: 'last: no upstream risk' },
                  ].map((r) => (
                    <div key={r.step} className="grid grid-cols-[24px_1fr_auto] gap-3 items-start">
                      <span className="font-mono text-[10px] text-ink-tertiary mt-0.5">{r.step}.</span>
                      <span className="text-xs font-mono text-ink">{r.action}</span>
                      <span className="text-[10px] font-mono text-ink-tertiary hidden sm:block">{r.note}</span>
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
