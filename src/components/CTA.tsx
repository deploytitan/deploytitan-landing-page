import { useState, type FormEvent } from 'react'
import { useScrollReveal } from '../utils'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
const DEMO_URL = (import.meta.env.VITE_DEMO_URL as string) || 'https://demo.deploytitan.com'

const trustSignals = [
  { label: 'Works with your existing stack', detail: 'No rewrites required' },
  { label: 'Self-hosted secrets', detail: 'Your keys never leave your infra' },
  { label: 'No vendor lock-in', detail: 'Works with any CI/CD' },
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
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, source: 'cta' }).toString(),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="final-cta" className="py-16 lg:py-20 border-t border-line relative" ref={ref}>
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative">
        <div
          className="relative border border-line overflow-hidden bg-surface corner-accent"
          style={{ borderRadius: '2px' }}
        >
          {/* Extra corners */}
          <div
            className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-30"
            style={{ borderColor: 'var(--color-primary)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-30"
            style={{ borderColor: 'var(--color-primary)' }}
            aria-hidden="true"
          />

          {/* Scan line animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 bottom-0 w-32 opacity-[0.03]"
              style={{
                background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                animation: 'scan-line 8s linear infinite',
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: live demo CTA */}
            <div className="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-line flex flex-col justify-center">
              <span
                data-reveal
                className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-5"
              >
                <span className="w-8 h-px bg-primary/40" />
                Live demo
              </span>

              <h2
                data-reveal
                data-reveal-delay="1"
                className="font-display font-medium text-3xl lg:text-4xl tracking-[-0.022em] leading-[1.12] mb-4"
              >
                Start shipping
                <br />
                without fear.
              </h2>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-base text-ink-secondary leading-relaxed mb-8 max-w-sm"
              >
                Works with your existing stack. No major changes required.
              </p>

              <div data-reveal data-reveal-delay="3" className="flex flex-col gap-3 max-w-sm">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-ink text-surface px-7 py-4 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] group"
                  style={{ borderRadius: '2px' }}
                >
                  See live demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>

                {/* Trust line */}
                <p className="text-xs font-mono text-ink-tertiary text-center">
                  Works with your existing stack. No rewrites required.
                </p>
              </div>

              {/* Trust signals */}
              <div
                data-reveal
                data-reveal-delay="4"
                className="mt-8 pt-6 border-t border-line space-y-3"
              >
                {trustSignals.map((ts) => (
                  <div key={ts.label} className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={PRIMARY}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 opacity-60"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm">
                      <span className="font-medium text-ink">{ts.label}</span>
                      <span className="text-ink-tertiary"> — {ts.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: email capture */}
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <span
                data-reveal
                data-reveal-delay="1"
                className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-5"
              >
                <span className="w-8 h-px bg-primary/40" />
                Early access
              </span>

              <h3
                data-reveal
                data-reveal-delay="2"
                className="font-display font-medium text-2xl lg:text-3xl tracking-[-0.02em] leading-[1.2] mb-3"
              >
                Get notified when we launch self-serve.
              </h3>

              <p
                data-reveal
                data-reveal-delay="3"
                className="text-sm text-ink-secondary leading-relaxed mb-8 max-w-sm"
              >
                We're working with a small group of teams to shape the product. Leave your email to
                stay in the loop.
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
                    className="w-full px-5 py-4 border border-line text-sm bg-surface-alt text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-primary/40 transition-colors disabled:opacity-50"
                    style={{ borderRadius: '2px' }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 border border-ink/20 text-ink px-7 py-4 text-sm font-medium transition-all active:scale-[0.97] hover:border-primary/40 hover:bg-primary-muted disabled:opacity-60"
                    style={{ borderRadius: '2px' }}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="w-3.5 h-3.5 border-2 border-ink/20 border-t-ink animate-spin"
                          style={{ borderRadius: '50%' }}
                        />
                        Submitting...
                      </>
                    ) : (
                      'Keep me updated'
                    )}
                  </button>
                  {error && (
                    <p className="text-xs text-signal-danger font-mono text-center pt-1">{error}</p>
                  )}
                  <p className="text-xs text-ink-tertiary font-mono text-center pt-1">
                    No spam. Just product updates.
                  </p>
                </form>
              ) : (
                <div data-reveal className="flex flex-col items-start gap-3 py-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-base font-medium text-ink">You're on the list.</span>
                  </div>
                  <p className="text-sm text-ink-secondary">
                    We'll reach out when self-serve is ready.
                  </p>
                </div>
              )}

              {/* Urgency signal */}
              <div data-reveal data-reveal-delay="5" className="mt-8 pt-6 border-t border-line">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full bg-primary opacity-50"
                      style={{
                        animation: 'ping-anim 2s cubic-bezier(0,0,0.2,1) infinite',
                        borderRadius: '1px',
                      }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 bg-primary"
                      style={{ borderRadius: '1px' }}
                    />
                  </div>
                  <span className="text-xs text-ink-secondary">
                    Accepting early access partners —{' '}
                    <span className="font-medium text-ink">limited availability</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
