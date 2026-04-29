import { useScrollReveal } from '../utils'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

const steps = [
  {
    label: 'Works with your CI/CD pipeline',
    detail: 'GitHub Actions, GitLab CI, CircleCI — drop-in integration',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    label: 'Track deployments automatically',
    detail: 'Every push is logged and linked to production behavior',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    label: 'Link changes to production behavior',
    detail: 'Trace incidents directly to the commit that caused them',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
]

export function IntegrationSimplicity() {
  const ref = useScrollReveal()

  return (
    <section className="py-16 lg:py-20 border-t border-line relative" ref={ref}>
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
              <span className="w-8 h-px bg-primary/40" />
              Integration
            </span>

            <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5">
              Connect in minutes.<br />
              <span className="text-ink-secondary">No disruption.</span>
            </h2>

            <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary leading-relaxed mb-4 max-w-lg">
              No migrations. No rewrites. No new infrastructure to manage.
            </p>

            <p data-reveal data-reveal-delay="2" className="text-sm font-medium mb-8" style={{ color: PRIMARY }}>
              No complex setup. No disruption.
            </p>

            <div className="space-y-5">
              {steps.map((step, i) => (
                <div
                  key={step.label}
                  data-reveal
                  data-reveal-delay={String(i + 3)}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="shrink-0 w-9 h-9 flex items-center justify-center border border-line bg-white text-ink/40 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary-muted/50 transition-all duration-300"
                    style={{ borderRadius: '2px' }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{step.label}</p>
                    <p className="text-xs text-ink-tertiary mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stack logos card */}
          <div data-reveal data-reveal-delay="6">
            <div
              className="relative border border-line bg-white p-5 sm:p-8 lg:p-10"
              style={{ borderRadius: '2px' }}
            >
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-30" style={{ borderColor: PRIMARY }} />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-30" style={{ borderColor: PRIMARY }} />

              <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-6 text-ink-quaternary">Works with your existing stack</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Cloudflare',
                  'Amazon Web Services',
                  'GitHub Actions',
                  'GitLab CI',
                  'Kubernetes',
                  'Docker',
                ].map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-2 px-3 py-2 border border-line/60"
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="w-1.5 h-1.5 shrink-0" style={{ backgroundColor: `${PRIMARY_RGBA},0.4)`, borderRadius: '0.5px' }} />
                    <span className="text-xs font-mono text-ink-secondary">{tool}</span>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-line flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span className="text-xs font-mono text-ink-tertiary">Get started in minutes—not months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
