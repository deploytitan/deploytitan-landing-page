import { useScrollReveal, useSpotlight } from '../utils'
import { Container } from './shared/Container'
import { Card } from './shared/Card'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

const capabilities = [
  {
    label: 'Versioned deployments',
    summary: 'Every release is preserved and addressable.',
    detail:
      'Traffic stays on the last known-good version until you explicitly shift it. Nothing is overwritten.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="2" y="17" width="20" height="5" rx="1" />
        <line x1="6" y1="5.5" x2="6.01" y2="5.5" />
        <line x1="6" y1="12.5" x2="6.01" y2="12.5" />
        <line x1="6" y1="19.5" x2="6.01" y2="19.5" />
      </svg>
    ),
    color: '#3b82f6',
    tag: 'Version control',
  },
  {
    label: 'Cohort rollouts',
    summary: "Send a new version to a small group first, expand when it's safe.",
    detail:
      'Route beta testers, internal users, or a percentage slice to the new version — independently of everyone else.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: PRIMARY,
    tag: 'Progressive delivery',
  },
  {
    label: 'Policy-based rollouts',
    summary: 'Actions fire on health signals, not deployment events.',
    detail:
      'Define thresholds — error rate, latency, custom metrics. DeployTitan promotes or reverts traffic automatically when those thresholds breach. Not just on deploy.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    color: '#22c55e',
    tag: 'Automated control',
  },
  {
    label: 'Geo & timezone-aware rollouts',
    summary: "Roll out per region, during that region's business hours.",
    detail:
      'Deploy to US during US business hours, EU during EU business hours — automatically. Policies respect geography and time, so your team is always awake when a rollout runs.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    color: '#8b5cf6',
    tag: 'Geo targeting',
  },
  {
    label: 'Real-time observability',
    summary: 'See traffic distribution, version health, and policy state at a glance.',
    detail:
      'Monitor which version is serving which users, watch health signals live, and audit every automated action — all in one view.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: '#f59e0b',
    tag: 'Visibility',
  },
  {
    label: 'Guardrails and thresholds',
    summary: 'Set the rules once. Let the system enforce them.',
    detail:
      'Configure per-version error budgets, latency ceilings, and custom signal weights. Rollouts automatically pause or revert when limits are exceeded — no one needs to be watching.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    color: '#ef4444',
    tag: 'Safety rails',
  },
]

export function Solution() {
  const ref = useScrollReveal()
  const spotlightRef = useSpotlight()

  return (
    <section id="solution" className="py-16 lg:py-20 border-t border-line relative" ref={ref}>
      <div
        className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Header */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6"
          >
            <span className="w-8 h-px bg-primary/40" />
            The solution
          </span>

          <h2
            data-reveal
            data-reveal-delay="1"
            className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5"
          >
            Control your system
            <br />
            <span className="text-ink-secondary">after deployment.</span>
          </h2>

          <p
            data-reveal
            data-reveal-delay="2"
            className="text-lg text-ink-secondary leading-relaxed"
          >
            DeployTitan gives your team real-time control over production—without redeploying.
            Detect issues as they happen, respond automatically or instantly, and keep systems
            stable under pressure.
          </p>
        </div>

        {/* Capability cards — 2x2 grid */}
        <div ref={spotlightRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <Card
              key={cap.label}
              variant="spotlight"
              data-reveal
              data-reveal-delay={String(i + 3)}
              className="p-8 lg:p-10 group"
            >
              {/* Gold top corner on hover */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/0 group-hover:border-primary/30 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/0 group-hover:border-primary/30 transition-all duration-300" />

              <div className="relative z-10">
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center border transition-all duration-300 group-hover:shadow-[0_0_0_1px_rgba(201,168,76,0.1)]"
                    style={{
                      borderRadius: '2px',
                      color: cap.color,
                      borderColor: `${cap.color}22`,
                      backgroundColor: `${cap.color}08`,
                    }}
                  >
                    {cap.icon}
                  </div>
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.08em] px-2 py-1"
                    style={{
                      borderRadius: '1px',
                      color: `${PRIMARY_RGBA},0.6)`,
                      backgroundColor: `${PRIMARY_RGBA},0.06)`,
                      border: `1px solid ${PRIMARY_RGBA},0.12)`,
                    }}
                  >
                    {cap.tag}
                  </span>
                </div>

                <h3 className="font-display font-medium text-lg tracking-[-0.01em] mb-2">
                  {cap.label}
                </h3>
                <p className="text-sm font-medium text-ink mb-3 leading-relaxed">{cap.summary}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{cap.detail}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust line */}
        <div data-reveal data-reveal-delay="9" className="mt-8 text-center">
          <p className="text-sm font-mono text-ink-tertiary">
            Works with your existing stack. No rewrites required.
          </p>
        </div>

        <div className="gold-line mt-12 max-w-xs mx-auto" />
      </Container>
    </section>
  )
}
