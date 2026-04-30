import { useScrollReveal } from '../utils'

const bullets = [
  {
    text: 'A small issue can impact thousands of users',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    text: 'Fixing something means another deployment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    text: 'Teams monitor after release, hoping nothing breaks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    text: 'Rollbacks take time—and often come too late',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        <line x1="8" y1="12" x2="16" y2="12" strokeOpacity="0.4"/>
      </svg>
    ),
  },
]

export function Problem() {
  const ref = useScrollReveal()

  return (
    <section id="problem" className="py-16 lg:py-20 border-t border-line relative" ref={ref}>
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
              <span className="w-8 h-px bg-primary/40" />
              The problem
            </span>

            <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5">
              Why releases feel<br />
              <span className="text-ink-secondary">slow—and risky.</span>
            </h2>

            <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-lg">
              As your product grows, every release carries more risk:
            </p>

            {/* Bullet list */}
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <div
                  key={i}
                  data-reveal
                  data-reveal-delay={String(i + 3)}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="shrink-0 w-8 h-8 flex items-center justify-center border border-line bg-surface text-ink/40 group-hover:text-signal-warning group-hover:border-signal-warning/20 group-hover:bg-signal-warning/[0.03] transition-all duration-300"
                    style={{ borderRadius: '2px' }}
                  >
                    {b.icon}
                  </div>
                  <p className="text-base text-ink leading-relaxed pt-1">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: closing statement card */}
          <div data-reveal data-reveal-delay="7">
            <div
              className="relative border border-line bg-surface p-10 lg:p-12 corner-accent"
              style={{ borderRadius: '2px' }}
            >
              {/* Extra corners */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-30" style={{ borderColor: 'var(--color-primary)' }} />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-30" style={{ borderColor: 'var(--color-primary)' }} />

              <div className="mb-6">
                <div
                  className="w-10 h-10 flex items-center justify-center border mb-5"
                  style={{ borderRadius: '2px', borderColor: 'rgba(245,158,11,0.25)', backgroundColor: 'rgba(245,158,11,0.04)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>

                <p className="text-xl font-display font-medium tracking-[-0.015em] leading-[1.3] mb-3">
                  Over time, shipping becomes{' '}
                  <span className="text-ink-secondary">stressful instead of routine.</span>
                </p>

                <p className="text-sm text-ink leading-relaxed">
                  So teams slow down… just to stay safe. Every release feels heavier than the last.
                </p>
              </div>

              {/* Tension metric row */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-line">
                {[
                  { label: 'Slower releases', icon: '↓' },
                  { label: 'More stress', icon: '↑' },
                  { label: 'Less confidence', icon: '↓' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-3 border border-line/60"
                    style={{ borderRadius: '2px', backgroundColor: 'rgba(245,158,11,0.02)' }}
                  >
                    <div className="text-lg font-mono font-medium mb-1" style={{ color: '#f59e0b', opacity: 0.7 }}>{item.icon}</div>
                    <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Gold accent line at bottom */}
        <div className="gold-line mt-10 max-w-xs mx-auto" />
      </div>
    </section>
  )
}
