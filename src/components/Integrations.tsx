import { useScrollReveal } from '../utils'

const integrations = [
  { name: 'Kubernetes', category: 'compute' },
  { name: 'AWS EKS', category: 'compute' },
  { name: 'GCP Cloud Run', category: 'compute' },
  { name: 'AWS Lambda', category: 'compute' },
  { name: 'Azure AKS', category: 'compute' },
  { name: 'Docker Swarm', category: 'compute' },
  { name: 'GitHub Actions', category: 'ci' },
  { name: 'GitLab CI', category: 'ci' },
  { name: 'CircleCI', category: 'ci' },
  { name: 'Terraform', category: 'iac' },
  { name: 'Pulumi', category: 'iac' },
  { name: 'Datadog', category: 'observability' },
  { name: 'Prometheus', category: 'observability' },
  { name: 'PagerDuty', category: 'alerting' },
]

export function Integrations() {
  const ref = useScrollReveal()

  return (
    <section className="py-16 lg:py-20 border-t border-line" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">Integrations</span>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] text-ink">
            Works with your entire stack.
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-md">
            Drop into your existing CI/CD pipeline in minutes. No forklift upgrades, no lock-in.
          </p>
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2" data-reveal>
          {integrations.map((i) => (
            <div
              key={i.name}
              className="sharp-card flex flex-col items-center justify-center gap-1.5 p-3 text-center"
            >
              {/* Placeholder icon box */}
              <div className="w-8 h-8 rounded-sm bg-surface-alt border border-line flex items-center justify-center">
                <span className="font-mono text-[9px] text-ink-tertiary font-bold uppercase">{i.name.slice(0, 2)}</span>
              </div>
              <span className="text-xs text-ink-secondary leading-tight">{i.name}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-quaternary">
          And many more via our open API and CLI.{' '}
          <a href="/docs" className="text-primary hover:text-primary-dark transition-colors">Browse the directory →</a>
        </p>
      </div>
    </section>
  )
}
