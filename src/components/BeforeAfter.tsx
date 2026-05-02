import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'

const withoutChips = [
  { label: 'Change', color: 'rgba(8,5,3,0.4)' },
  { label: 'Deploy', color: '#f59e0b' },
  { label: 'Wait', color: '#f59e0b' },
  { label: 'Monitor', color: '#f59e0b' },
  { label: 'Debug', color: '#ef4444' },
  { label: 'Redeploy', color: '#ef4444' },
]

const withChips = [
  { label: 'Change', color: 'rgba(8,5,3,0.4)' },
  { label: 'Deploy', color: PRIMARY },
  { label: 'Automatically controlled', color: PRIMARY },
  { label: 'Stable system', color: '#22c55e' },
]

export function BeforeAfter() {
  const withoutRef = useRef<HTMLDivElement>(null)
  const withRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = withoutRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        observer.disconnect()

        // Animate "without" chips slowly (heaviness metaphor)
        const withoutChipEls = container.querySelectorAll<HTMLElement>('.ba-chip-without')
        withoutChipEls.forEach((el) => {
          el.style.opacity = '0'
          el.style.transform = 'translateX(-8px)'
        })
        animate(withoutChipEls, {
          opacity: [0, 1],
          translateX: [-8, 0],
          duration: 500,
          delay: stagger(180),
          ease: 'outExpo',
          onComplete: () => {
            withoutChipEls.forEach((el) => {
              el.style.opacity = ''
              el.style.transform = ''
            })
          },
        })

        // Animate "with" chips fast (snappy metaphor) — delayed after without finishes
        const withChipEls = withRef.current?.querySelectorAll<HTMLElement>('.ba-chip-with')
        if (!withChipEls) return
        withChipEls.forEach((el) => {
          el.style.opacity = '0'
          el.style.transform = 'translateY(8px)'
        })
        animate(withChipEls, {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 300,
          delay: stagger(80, { start: withoutChips.length * 180 + 400 }),
          ease: 'outExpo',
          onComplete: () => {
            withChipEls.forEach((el) => {
              el.style.opacity = ''
              el.style.transform = ''
            })
          },
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <Section border="top" padding="xl" tone="muted" className="relative">
      <div ref={withoutRef} className="sr-only" aria-hidden="true" />
      <div
        className="absolute inset-0 hero-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative">
        <div
          className="border border-line bg-surface overflow-hidden"
          style={{ borderRadius: '2px' }}
        >
          {/* Row 1 — Without */}
          <div ref={withoutRef} className="px-5 sm:px-8 lg:px-12 py-6 sm:py-8 border-b border-line">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
              <div className="shrink-0 sm:w-36">
                <div className="text-[9px] font-mono uppercase tracking-[0.1em] text-ink-quaternary mb-0.5">
                  Without
                </div>
                <div className="text-xs font-mono font-medium text-ink-tertiary">DeployTitan</div>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-1">
                {withoutChips.map((chip, i) => (
                  <div key={chip.label} className="flex items-center gap-1">
                    <div
                      className="ba-chip-without px-2.5 py-1.5 border text-[10px] font-mono font-medium"
                      style={{
                        borderRadius: '1px',
                        color: chip.color,
                        borderColor: `${chip.color}30`,
                        backgroundColor: `${chip.color}07`,
                      }}
                    >
                      {chip.label}
                    </div>
                    {i < withoutChips.length - 1 && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M2 6h8M7 3l3 3-3 3"
                          stroke="rgba(8,5,3,0.2)"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — With */}
          <div ref={withRef} className="px-5 sm:px-8 lg:px-12 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
              <div className="shrink-0 sm:w-36">
                <div
                  className="text-[9px] font-mono uppercase tracking-[0.1em]"
                  style={{ color: 'rgba(201,168,76,0.6)' }}
                >
                  With
                </div>
                <div className="text-xs font-mono font-medium" style={{ color: PRIMARY }}>
                  DeployTitan
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-1">
                {withChips.map((chip, i) => (
                  <div key={chip.label} className="flex items-center gap-1">
                    <div
                      className="ba-chip-with px-2.5 py-1.5 border text-[10px] font-mono font-medium"
                      style={{
                        borderRadius: '1px',
                        color: chip.color,
                        borderColor: `${chip.color}35`,
                        backgroundColor: `${chip.color}08`,
                        boxShadow:
                          chip.label === 'Stable system' ? `0 0 0 1px ${chip.color}20` : undefined,
                      }}
                    >
                      {chip.label}
                      {chip.label === 'Stable system' && (
                        <span
                          className="ml-1 inline-block"
                          style={{ animation: 'pulse-anim 2s ease-in-out infinite' }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    {i < withChips.length - 1 && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M2 6h8M7 3l3 3-3 3"
                          stroke="rgba(201,168,76,0.4)"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
