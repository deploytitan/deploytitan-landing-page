import { Link } from 'react-router-dom'

const products = [
  {
    route: '/products/titan-rollout',
    eyebrow: 'Titan Rollout',
    tagline: 'Progressive deployments with automatic rollback.',
    bullets: ['Cohort & canary rollouts', 'Versioned releases', 'Automatic regression rollback'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    route: '/products/titan-shield',
    eyebrow: 'Titan Shield',
    tagline: 'Multi-cloud failover and disaster recovery.',
    bullets: ['AWS / GCP / Azure failover', 'Zero-latency in-memory routing', 'Disaster recovery built-in'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    route: '/products/titan-sentinel',
    eyebrow: 'Titan Sentinel',
    tagline: 'Risk scoring and observability before and during deploys.',
    bullets: ['Shift-left PR risk scoring', 'Blast-radius analysis', 'SLO-bound guardrails'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
]

interface Props {
  onClose: () => void
}

export function ProductsDropdown({ onClose }: Props) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface border border-line shadow-[0_8px_32px_rgba(8,5,3,0.08)] z-50"
      style={{ borderRadius: '2px', minWidth: '700px' }}
    >
      {/* Top bar */}
      <div className="px-6 pt-5 pb-3 border-b border-line-subtle flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">Products</span>
        <span className="text-xs text-ink-quaternary">The DeployTitan platform</span>
      </div>

      {/* Three pillars */}
      <div className="grid grid-cols-3 divide-x divide-line">
        {products.map((p) => (
          <Link
            key={p.route}
            to={p.route}
            onClick={onClose}
            className="group flex flex-col gap-3 px-5 py-5 hover:bg-surface-alt transition-colors"
          >
            {/* Icon + name row */}
            <div className="flex items-center gap-2.5">
              <span className="text-primary/70 group-hover:text-primary transition-colors">{p.icon}</span>
              <span className="font-display text-sm font-semibold text-ink group-hover:text-primary-dark transition-colors">
                {p.eyebrow}
              </span>
            </div>
            <span className="text-xs text-ink-tertiary leading-relaxed">{p.tagline}</span>
            <ul className="flex flex-col gap-1.5 mt-auto pt-2 border-t border-line-subtle">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-xs text-ink-secondary">
                  <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
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
          Browse by use case →
        </Link>
        <Link
          to="/pricing"
          onClick={onClose}
          className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
        >
          View pricing →
        </Link>
      </div>
    </div>
  )
}
