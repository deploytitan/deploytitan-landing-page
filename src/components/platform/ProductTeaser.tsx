import Link from 'next/link'
import { type ReactNode } from 'react'

interface ProductTeaserProps {
  eyebrow: string
  name: string
  tagline: string
  description: string
  bullets: string[]
  route: string
  visual: ReactNode
  flip?: boolean // flip layout: visual on left, copy on right
}

export function ProductTeaser({ eyebrow, name, tagline, description, bullets, route, visual, flip = false }: ProductTeaserProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${flip ? 'lg:[direction:rtl]' : ''}`}>
      {/* Copy */}
      <div className="flex flex-col gap-6 lg:[direction:ltr]">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{eyebrow}</span>
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink leading-tight">{name}</h3>
          <p className="text-base text-ink-secondary font-medium mt-1">{tagline}</p>
        </div>

        <p className="text-sm text-ink-secondary leading-relaxed">{description}</p>

        <ul className="flex flex-col gap-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-ink-secondary">
              <span className="mt-1.5 w-1.5 h-1.5 bg-primary/60 shrink-0" style={{ borderRadius: '1px' }} />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 pt-2">
          <Link
            href={route}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary-dark transition-colors group"
          >
            See details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-ink-secondary transition-colors"
          >
            Read the docs
          </Link>
        </div>
      </div>

      {/* Visual */}
      <div className="lg:[direction:ltr] relative">
        <div
          className="rounded-sm border border-line bg-surface-alt/50 overflow-hidden"
          style={{ minHeight: '340px' }}
        >
          {visual}
        </div>
        {/* Corner accents */}
        <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-primary/30" />
        <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-primary/30" />
      </div>
    </div>
  )
}
