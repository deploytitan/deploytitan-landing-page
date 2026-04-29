import { Link } from 'react-router-dom'

const APP_URL = import.meta.env.VITE_APP_URL as string || 'https://app.deploytitan.com'
const DEMO_URL = import.meta.env.VITE_DEMO_URL as string || 'https://demo.deploytitan.com'

interface MidCTAProps {
  heading?: string
  subheading?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  secondaryExternal?: boolean
}

export function MidCTA({
  heading = 'Ready to ship faster?',
  subheading = 'See it in action — trigger a real production deployment from your browser.',
  primaryLabel = 'Start free trial',
  primaryHref = `${APP_URL}/signup`,
  secondaryLabel = 'Try the live demo',
  secondaryHref = DEMO_URL,
  secondaryExternal = true,
}: MidCTAProps) {
  return (
    <section className="py-12 border-t border-b border-line bg-surface-alt/60 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-ink">{heading}</p>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-lg">{subheading}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-surface text-sm font-medium transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] active:scale-[0.97]"
            style={{ borderRadius: '2px' }}
          >
            {primaryLabel}
          </a>
          {secondaryLabel && (
            secondaryExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-line text-ink-secondary text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {secondaryLabel}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ) : (
              <Link
                to={secondaryHref!}
                className="inline-flex items-center gap-2 px-5 py-3 border border-line text-ink-secondary text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {secondaryLabel}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
