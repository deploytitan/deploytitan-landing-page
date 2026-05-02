import { useScrollReveal } from '../utils'
import { Section } from './shared/Section'
import { Container } from './shared/Container'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_RGBA = 'rgba(201,168,76'

const points = [
  { label: 'Zero added latency to user requests', detail: 'Runs outside your request path' },
  {
    label: 'Routing decisions served from memory',
    detail: 'No external API calls during execution',
  },
  { label: 'No dependency on external APIs', detail: 'During execution — ever' },
]

export function Performance() {
  const ref = useScrollReveal()

  return (
    <Section border="top" padding="lg" className="relative">
      <div ref={ref} className="contents">
        <div
          className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <span
              data-reveal
              className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6 justify-center"
            >
              <span className="w-8 h-px bg-primary/40" />
              Performance
              <span className="w-8 h-px bg-primary/40" />
            </span>

            <h2
              data-reveal
              data-reveal-delay="1"
              className="font-display font-medium text-4xl lg:text-5xl tracking-[-0.022em] leading-[1.1] mb-5"
            >
              Built for production.
              <br />
              <span className="text-ink-secondary">No performance tradeoffs.</span>
            </h2>

            <p
              data-reveal
              data-reveal-delay="2"
              className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-xl mx-auto"
            >
              DeployTitan runs outside your request path—so your performance stays untouched. Your
              p99 stays exactly where it should be.
            </p>

            <div
              data-reveal
              data-reveal-delay="3"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              {points.map((p) => (
                <div
                  key={p.label}
                  className="border border-line bg-surface p-6 text-left"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="flex items-center gap-2 mb-3">
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
                      className="opacity-70 shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-xs font-mono font-medium text-ink">{p.label}</span>
                  </div>
                  <p className="text-[11px] text-ink-tertiary leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* p99 callout */}
            <div
              data-reveal
              data-reveal-delay="4"
              className="mt-8 inline-flex items-center gap-3 px-5 py-3 border border-line bg-surface"
              style={{ borderRadius: '2px' }}
            >
              <div
                className="w-1.5 h-1.5"
                style={{ backgroundColor: `${PRIMARY_RGBA},0.7)`, borderRadius: '0.5px' }}
              />
              <span className="text-sm font-mono text-ink-secondary">
                p99 latency impact: <span className="font-medium text-ink">0ms</span>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
