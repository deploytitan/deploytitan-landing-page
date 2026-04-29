import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEMO_URL = import.meta.env.VITE_DEMO_URL as string || 'https://demo.deploytitan.com'
const APP_URL = import.meta.env.VITE_APP_URL as string || 'https://app.deploytitan.com'

const productLinks = [
  { label: 'Titan Rollout', sub: 'Progressive deployments & rollback', route: '/products/titan-rollout' },
  { label: 'Titan Shield', sub: 'Multi-cloud failover & resilience', route: '/products/titan-shield' },
  { label: 'Titan Sentinel', sub: 'Risk scoring & observability', route: '/products/titan-sentinel' },
]

const resourceLinks = [
  { label: 'Documentation', route: '/docs', external: false },
  { label: 'Blog', route: '/blog', external: false },
  { label: 'Customers', route: '/customers', external: false },
  { label: 'Changelog', route: '/changelog', external: false },
  { label: 'Live Demo', route: DEMO_URL, external: true },
]

interface Props {
  onClose: () => void
}

function AccordionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-ink"
      >
        {label}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-ink-tertiary transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  )
}

export function MobileNav({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-surface z-40 flex flex-col overflow-y-auto" style={{ paddingTop: '80px' }}>
      {/* Products group */}
      <AccordionGroup label="Products">
        {productLinks.map((l) => (
          <Link
            key={l.route}
            to={l.route}
            onClick={onClose}
            className="flex flex-col gap-0.5 px-8 py-3 hover:bg-surface-alt transition-colors"
          >
            <span className="text-sm font-medium text-ink">{l.label}</span>
            <span className="text-xs text-ink-tertiary">{l.sub}</span>
          </Link>
        ))}
        <Link
          to="/solutions"
          onClick={onClose}
          className="block px-8 py-3 text-sm text-primary font-medium hover:bg-surface-alt transition-colors"
        >
          Browse by use case →
        </Link>
      </AccordionGroup>

      {/* Resources group */}
      <AccordionGroup label="Resources">
        {resourceLinks.map((l) =>
          l.external ? (
            <a
              key={l.label}
              href={l.route}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block px-8 py-3 text-sm text-ink-secondary hover:text-ink hover:bg-surface-alt transition-colors"
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={l.route}
              to={l.route}
              onClick={onClose}
              className="block px-8 py-3 text-sm text-ink-secondary hover:text-ink hover:bg-surface-alt transition-colors"
            >
              {l.label}
            </Link>
          )
        )}
      </AccordionGroup>

      {/* Flat links */}
      {[
        { label: 'Solutions', route: '/solutions' },
        { label: 'Pricing', route: '/pricing' },
        { label: 'Customers', route: '/customers' },
      ].map((l) => (
        <Link
          key={l.route}
          to={l.route}
          onClick={onClose}
          className="block px-6 py-4 text-base font-medium text-ink border-b border-line hover:bg-surface-alt transition-colors"
        >
          {l.label}
        </Link>
      ))}

      {/* Auth buttons */}
      <div className="mt-auto px-6 py-8 flex flex-col gap-3 border-t border-line">
        <a
          href={`${APP_URL}/signin`}
          onClick={onClose}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-line text-ink-secondary text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
          style={{ borderRadius: '2px' }}
        >
          Sign in
        </a>
        <a
          href={`${APP_URL}/signup`}
          onClick={onClose}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-ink text-surface text-sm font-medium hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] transition-all active:scale-[0.97]"
          style={{ borderRadius: '2px' }}
        >
          Get started
        </a>
      </div>
    </div>
  )
}
