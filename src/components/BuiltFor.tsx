import type { ReactNode } from 'react'
import { useScrollReveal } from '../utils'

const GOLD = '#c9a84c'

interface AudienceCard {
  heading: string
  description: string
  icon: ReactNode
  items: { label: string; detail: string }[]
}

const audiences: AudienceCard[] = [
  {
    heading: 'Platform Engineering',
    description: 'Give your developers guardrails, not gates. DeployTitan integrates into your existing CI/CD — no workflow changes required.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="0"/><path d="M6 12h4"/><path d="M14 12h4"/><circle cx="12" cy="12" r="1"/>
      </svg>
    ),
    items: [
      { label: 'Internal Developer Platforms', detail: 'Backstage, Cortex, Port' },
      { label: 'CI/CD Pipelines', detail: 'GitHub Actions, GitLab CI, ArgoCD' },
      { label: 'Service Catalogs', detail: 'Auto-discovered from your infra' },
    ],
  },
  {
    heading: 'DevOps & SRE',
    description: 'Reduce MTTR from hours to seconds. Automated rollbacks mean your on-call engineers get paged less — and sleep more.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    items: [
      { label: 'Observability', detail: 'Datadog, Grafana, New Relic' },
      { label: 'Incident Response', detail: 'PagerDuty, OpsGenie, Slack' },
      { label: 'Runbook Automation', detail: 'Auto-generated post-mortems' },
    ],
  },
  {
    heading: 'Infrastructure Teams',
    description: 'Multi-cloud, hybrid, or bare metal — DeployTitan maps dependencies across any infrastructure topology.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="0"/><rect x="2" y="14" width="20" height="8" rx="0"/>
        <line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/>
      </svg>
    ),
    items: [
      { label: 'Kubernetes', detail: 'EKS, GKE, AKS, self-hosted' },
      { label: 'Serverless', detail: 'Lambda, Cloud Functions, Cloud Run' },
      { label: 'Multi-Cloud', detail: 'AWS, GCP, Azure, hybrid setups' },
    ],
  },
]

const architectures = [
  { label: 'Microservices', icon: '◇' },
  { label: 'Event-Driven', icon: '⚡' },
  { label: 'Monorepo', icon: '▤' },
  { label: 'Hybrid Platforms', icon: '◈' },
  { label: 'Service Mesh', icon: '◎' },
  { label: 'Edge Compute', icon: '◆' },
]

export function BuiltFor() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 lg:py-32 border-t border-line relative" ref={ref}>
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
          <span className="w-8 h-px bg-gold/40" />
          Built for
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-20 gap-4">
          <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08] max-w-2xl">
            Modern teams.<br />
            <span className="text-ink-secondary">Complex systems.</span>
          </h2>
          <p data-reveal data-reveal-delay="2" className="text-base text-ink-secondary max-w-md leading-relaxed lg:text-right">
            Whether you run 5 services or 500, DeployTitan adapts to your infrastructure and team structure.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16">
          {audiences.map((audience, ai) => (
            <div
              key={audience.heading}
              data-reveal
              data-reveal-delay={String(ai + 2)}
              className="group relative border border-line bg-white p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(201,168,76,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/0 group-hover:border-gold/30 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/0 group-hover:border-gold/30 transition-all duration-300" />

              {/* Icon + heading */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-line group-hover:border-gold/20 group-hover:bg-gold-muted/50 transition-all duration-300 text-ink-tertiary group-hover:text-gold"
                  style={{ borderRadius: '2px' }}
                >
                  {audience.icon}
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg tracking-[-0.01em]">{audience.heading}</h3>
                </div>
              </div>

              <p className="text-sm text-ink-secondary leading-relaxed mb-6">{audience.description}</p>

              {/* Integration items */}
              <div className="space-y-3">
                {audience.items.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-1.5 h-1.5" style={{ backgroundColor: `${GOLD}40`, borderRadius: '0.5px' }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-ink">{item.label}</span>
                      <span className="text-sm text-ink-tertiary ml-1.5">— {item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-4 border-t border-line/60">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.08em] text-ink-quaternary group-hover:text-gold/50 transition-colors">
                  <div className="w-3 h-px bg-current" />
                  {audience.heading === 'Platform Engineering' ? 'Zero-config integration' :
                   audience.heading === 'DevOps & SRE' ? '< 10s mean time to rollback' :
                   'Any topology supported'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture support bar */}
        <div data-reveal data-reveal-delay="5" className="border border-line bg-white/60 p-6 lg:p-8" style={{ borderRadius: '2px' }}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-shrink-0">
              <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-ink-tertiary flex items-center gap-2">
                <span className="w-1.5 h-1.5" style={{ backgroundColor: GOLD, borderRadius: '0.5px', opacity: 0.5 }} />
                Supported Architectures
              </h3>
            </div>
            <div className="flex-1 flex flex-wrap gap-3">
              {architectures.map((arch) => (
                <div
                  key={arch.label}
                  className="flex items-center gap-2 px-4 py-2.5 border border-line text-sm font-medium transition-all duration-300 cursor-default hover:border-gold/30 hover:bg-gold-muted/50 hover:text-ink"
                  style={{ borderRadius: '2px' }}
                >
                  <span className="text-gold/50 text-xs">{arch.icon}</span>
                  <span>{arch.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gold accent line at bottom */}
        <div className="gold-line mt-16 max-w-xs mx-auto" />
      </div>
    </section>
  )
}
