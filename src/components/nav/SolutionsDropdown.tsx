import {Link} from 'react-router-dom'

const solutions = [
  {
    route: '/solutions/progressive-delivery',
    eyebrow: 'Progressive Delivery',
    tagline: 'Canary deployments with automated rollback.',
    description: 'Risk-scored PRs, automatic canary stepping, and SLO-gated promotion.',
    product: 'Titan Rollout',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    route: '/solutions/multi-cloud-resilience',
    eyebrow: 'Multi-Cloud Resilience',
    tagline: 'Automated failover with sub-30s RTO.',
    description: 'Declarative cross-cloud routing and DR drill mode built-in.',
    product: 'Titan Shield',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    route: '/solutions/risk-intelligence',
    eyebrow: 'Deploy Risk Intelligence',
    tagline: 'Know your blast radius before you ship.',
    description: 'PR risk scoring, dependency graph analysis, and SLO guardrails.',
    product: 'Titan Sentinel',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    route: '/solutions/platform-engineering',
    eyebrow: 'Platform Engineering',
    tagline: 'Self-serve deploys with policy guardrails.',
    description: 'Give product teams the golden path without becoming the bottleneck.',
    product: 'Full platform',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
]

interface Props {
  onClose: () => void
}

export function SolutionsDropdown({ onClose }: Props) {
  return (
    <div
      className="absolute top-full mt-2 bg-surface border border-line shadow-[0_8px_32px_rgba(8,5,3,0.08)] z-50"
      style={{ borderRadius: '2px', minWidth: '680px' }}
    >
      {/* Top bar */}
      <div className="px-6 pt-5 pb-3 border-b border-line-subtle flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Solutions</span>
        <span className="text-xs text-ink-quaternary">By use case</span>
      </div>

      {/* 2x2 grid */}
      <div className="grid grid-cols-2 divide-x divide-y divide-line">
        {solutions.map((s) => (
          <Link
            key={s.route}
            to={s.route}
            onClick={onClose}
            className="group flex flex-col gap-2 px-5 py-4 hover:bg-surface-alt transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-primary/70 group-hover:text-primary transition-colors">{s.icon}</span>
              <span className="font-display text-sm font-semibold text-ink group-hover:text-primary-dark transition-colors">
                {s.eyebrow}
              </span>
              <span className="ml-auto font-mono text-[9px] text-ink-quaternary border border-line px-1.5 py-0.5" style={{ borderRadius: '2px' }}>
                {s.product}
              </span>
            </div>
            <p className="text-xs text-ink-tertiary leading-relaxed">{s.description}</p>
          </Link>
        ))}
      </div>

      {/* Footer row */}
      <div className="px-6 py-3 border-t border-line-subtle flex items-center justify-between bg-surface-alt/50">
        <Link
          to="/solutions"
          onClick={onClose}
          className="text-xs text-ink-secondary hover:text-ink transition-colors"
        >
          View all solutions →
        </Link>
        <Link
          to="/how-it-works"
          onClick={onClose}
          className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
        >
          How it works →
        </Link>
      </div>
    </div>
  )
}
