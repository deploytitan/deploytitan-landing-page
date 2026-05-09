'use client'

import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function EmotionalClose() {
  const ref = useScrollReveal()
  const reducedMotion = useReducedMotion()

  return (
    <section className="py-16 lg:py-20 border-t border-line relative overflow-hidden" ref={ref}>
      {/* Very subtle grid */}
      <div
        className="absolute inset-0 hero-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Soft gold radial glow — center */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)`,
        }}
      />

      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6 justify-center"
          >
            <span className="w-8 h-px bg-primary/40" />
            How it feels
            <span className="w-8 h-px bg-primary/40" />
          </span>

          {/* "All clear" pulse indicator */}
          <div data-reveal data-reveal-delay="1" className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center">
              {/* Outer slow ring */}
              <div
                className="absolute w-12 h-12"
                style={{
                  borderRadius: '2px',
                  border: '1px solid rgba(34,197,94,0.12)',
                  animation: reducedMotion ? 'none' : 'pulse-anim 3s ease-in-out infinite',
                }}
              />
              {/* Middle ring */}
              <div
                className="absolute w-8 h-8"
                style={{
                  borderRadius: '2px',
                  border: '1px solid rgba(34,197,94,0.2)',
                  animation: reducedMotion ? 'none' : 'pulse-anim 3s ease-in-out 0.5s infinite',
                }}
              />
              {/* Inner square */}
              <div
                className="relative w-5 h-5 flex items-center justify-center"
                style={{
                  borderRadius: '2px',
                  backgroundColor: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2
            data-reveal
            data-reveal-delay="2"
            className="font-display font-medium text-[clamp(1.5rem,2.5vw,2.5rem)] tracking-[-0.018em] leading-[1.15] mb-6"
          >
            Make deployments
            <br />
            <span className="font-semibold"> boring</span>
            <span className="text-ink-secondary"> again.</span>
          </h2>

          <div
            data-reveal
            data-reveal-delay="3"
            className="space-y-3 text-lg text-ink leading-relaxed"
          >
            <p>No late-night monitoring.</p>
            <p>No panic rollbacks.</p>
            <p>No hesitation before shipping.</p>
            <p className="font-medium text-ink">Just smooth, controlled releases. Every time.</p>
          </div>

          {/* Quiet metrics */}
          <div
            data-reveal
            data-reveal-delay="4"
            className="mt-14 grid grid-cols-3 gap-3 max-w-sm mx-auto"
          >
            {[
              { value: '3x', label: 'Ship more often' },
              { value: '30s', label: 'Recovery time' },
              { value: '0', label: 'Panic deploys' },
            ].map((m) => (
              <div
                key={m.label}
                className="text-center p-3 border border-line/60"
                style={{ borderRadius: '2px', backgroundColor: 'rgba(34,197,94,0.02)' }}
              >
                <div className="font-mono font-medium text-lg mb-0.5 text-signal-success">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
