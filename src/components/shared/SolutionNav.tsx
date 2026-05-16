import { Container } from './Container'

interface SolutionLink {
  name: string
  route: string
  tagline: string
}

const ALL_SOLUTIONS: SolutionLink[] = [
  {
    name: 'Release Coordination',
    route: '/solutions/release-coordination',
    tagline: 'Orchestrate multi-service releases',
  },
  {
    name: 'Instant Rollback',
    route: '/solutions/instant-rollback',
    tagline: 'Safe, sequenced rollback across services',
  },
  {
    name: 'Risk Intelligence',
    route: '/solutions/risk-intelligence',
    tagline: 'Visibility into every release in flight',
  },
  {
    name: 'Platform Engineering',
    route: '/solutions/platform-engineering',
    tagline: 'Policy-as-code golden path',
  },
]

interface SolutionNavProps {
  currentRoute: string
}

export function SolutionNav({ currentRoute }: SolutionNavProps) {
  const related = ALL_SOLUTIONS.filter((s) => s.route !== currentRoute)

  return (
    <section className="py-16 border-t border-line bg-surface-alt/20">
      <Container width="6xl" padding="default">
        <p className="text-xs font-mono tracking-widest uppercase text-ink-tertiary mb-6">
          Related solutions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line">
          {related.map((s) => (
            <a
              key={s.route}
              href={s.route}
              className="bg-surface px-6 py-5 flex flex-col gap-1.5 hover:bg-surface-alt/60 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                  {s.name}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-ink-tertiary group-hover:text-primary transition-colors shrink-0"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <span className="text-xs text-ink-tertiary font-mono">{s.tagline}</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
