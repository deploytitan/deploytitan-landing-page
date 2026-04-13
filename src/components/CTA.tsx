import { useState, type FormEvent } from 'react'
import { useScrollReveal } from '../utils'

const GOLD = '#c9a84c'
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const trustSignals = [
  { label: 'Self-hosted secrets', detail: 'Your keys never leave your infra' },
  { label: 'No vendor lock-in', detail: 'Works with any CI/CD' },
  { label: 'Read-only by default', detail: 'Agent observes — you approve actions' },
]

const costStats = [
  {
    stat: '$300K+',
    context: 'Average cost per hour of deployment-related downtime for growth-stage companies.',
    source: 'ITIC Hourly Cost of Downtime Survey, 2023',
  },
  {
    stat: '70%+',
    context: 'of production incidents are triggered by changes — deployments, config updates, or migrations.',
    source: 'Google SRE Workbook',
  },
  {
    stat: '24 min',
    context: 'Median time to detect a deployment-caused incident, before any remediation begins.',
    source: 'DORA State of DevOps, 2023',
  },
]

export function CTA() {
  const ref = useScrollReveal()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!FORM_ENDPOINT) {
      setError('Form endpoint not configured.')
      return
    }

    const data = new FormData(e.currentTarget)
    const email = data.get('email') as string

    setSubmitting(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'cta' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="py-24 lg:py-32 border-t border-line relative" ref={ref}>
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div
          className="relative border border-line overflow-hidden bg-white/60 corner-accent"
          style={{ borderRadius: '2px' }}
        >
          {/* Additional corners for full four-corner treatment */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-30" style={{ borderColor: 'var(--color-gold)' }} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-30" style={{ borderColor: 'var(--color-gold)' }} aria-hidden="true" />

          {/* Subtle scan line animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 bottom-0 w-32 opacity-[0.03]"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                animation: 'scan-line 8s linear infinite',
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Deployment failure cost stats + trust */}
            <div className="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-line">
              {/* Cost stats */}
              <div className="mb-10">
                <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-ink-quaternary mb-6">The cost of unprotected deploys</p>
                <div className="space-y-6">
                  {costStats.map((s, i) => (
                    <div key={i} data-reveal data-reveal-delay={String(i)}>
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="font-display font-medium text-3xl lg:text-4xl tracking-[-0.02em]" style={{ color: i === 0 ? '#ef4444' : i === 1 ? GOLD : '#f59e0b' }}>
                          {s.stat}
                        </span>
                      </div>
                      <p className="text-sm text-ink-secondary leading-relaxed mb-1">{s.context}</p>
                      <span className="text-[10px] font-mono text-ink-quaternary">{s.source}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust signals */}
              <div data-reveal data-reveal-delay="2" className="space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-ink-quaternary mb-4">Enterprise ready</p>
                {trustSignals.map((ts) => (
                  <div key={ts.label} className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    <span className="text-sm">
                      <span className="font-medium text-ink">{ts.label}</span>
                      <span className="text-ink-tertiary"> — {ts.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <span data-reveal data-reveal-delay="1" className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-5">
                <span className="w-8 h-px bg-gold/40" />
                Early access
              </span>

              <h2 data-reveal data-reveal-delay="2" className="font-display font-medium text-3xl lg:text-4xl tracking-[-0.022em] leading-[1.12] mb-4">
                Be the first to<br />deploy safely.
              </h2>

              <p data-reveal data-reveal-delay="3" className="text-base text-ink-secondary leading-relaxed mb-8 max-w-sm">
                We're working with a small group of engineering teams to shape the product. Limited spots available.
              </p>

              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  data-reveal
                  data-reveal-delay="4"
                  className="space-y-3 max-w-sm"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your work email"
                    required
                    autoComplete="email"
                    disabled={submitting}
                    className="w-full px-5 py-4 border border-line text-sm bg-white text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-gold/40 transition-colors disabled:opacity-50"
                    style={{ borderRadius: '2px' }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-ink text-surface px-7 py-4 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] disabled:opacity-60"
                    style={{ borderRadius: '2px' }}
                  >
                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-surface/30 border-t-surface animate-spin" style={{ borderRadius: '50%' }} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="text-xs text-signal-danger font-mono text-center pt-1">{error}</p>
                  )}
                  <p className="text-xs text-ink-tertiary font-mono text-center pt-1">No credit card required. No spam. Just early access.</p>
                </form>
              ) : (
                <div data-reveal className="flex flex-col items-start gap-3 py-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    <span className="text-base font-medium text-ink">You're on the list.</span>
                  </div>
                  <p className="text-sm text-ink-secondary">We'll reach out within 48 hours to schedule your onboarding.</p>
                </div>
              )}

              {/* Urgency signal */}
              <div data-reveal data-reveal-delay="5" className="mt-8 pt-6 border-t border-line">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full bg-gold opacity-50" style={{ animation: 'ping-anim 2s cubic-bezier(0,0,0.2,1) infinite', borderRadius: '1px' }} />
                    <span className="relative inline-flex h-2 w-2 bg-gold" style={{ borderRadius: '1px' }} />
                  </div>
                  <span className="text-xs text-ink-secondary">
                    Accepting early access partners — <span className="font-medium text-ink">limited availability</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
