'use client'

import { Container } from './Container'
import { RoadmapBadge } from './RoadmapBadge'

interface Cta {
  label: string
  href: string
  /**
   * 'primary'   = amber fill (default)
   * 'secondary' = border/ghost
   * 'book'      = bg-ink dark CTA, used for demo/walkthrough links
   */
  variant?: 'primary' | 'secondary' | 'book'
  target?: '_blank'
  rel?: string
}

interface ProductPageHeroProps {
  eyebrow: string
  /** 'preview' or 'roadmap' renders a RoadmapBadge next to the eyebrow. Omit for live products. */
  badge?: 'preview' | 'roadmap'
  heading: React.ReactNode
  description: React.ReactNode
  ctas: [Cta] | [Cta, Cta]
}

export function ProductPageHero({ eyebrow, badge, heading, description, ctas }: ProductPageHeroProps) {
  return (
    <section className="blueprint-grid border-b border-line pt-28 pb-20">
      <Container width="4xl" padding="default">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4" data-reveal data-reveal-delay="1">
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible">
            {eyebrow}
          </p>
          {badge && <RoadmapBadge variant={badge} />}
        </div>

        {/* Heading */}
        <h1
          className="font-display text-5xl lg:text-6xl font-semibold text-ink tracking-[-0.028em] leading-[1.05] mb-6"
          data-reveal
          data-reveal-delay="2"
        >
          {heading}
        </h1>

        {/* Description */}
        <p
          className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8"
          data-reveal
          data-reveal-delay="3"
        >
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4" data-reveal data-reveal-delay="4">
          {ctas.map((cta) => {
            if (cta.variant === 'book') {
              return (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.target}
                  rel={cta.rel}
                  className="bg-ink text-surface inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97]"
                  style={{ borderRadius: '2px' }}
                >
                  {cta.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              )
            }
            if (cta.variant === 'secondary') {
              return (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.target}
                  rel={cta.rel}
                  className="inline-flex items-center gap-2 border border-line text-ink-secondary text-sm px-5 py-2.5 hover:border-primary/40 hover:text-ink transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  {cta.label}
                </a>
              )
            }
            // primary (default)
            return (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                className="inline-flex items-center gap-2 bg-primary text-ink dark:text-surface text-sm font-semibold px-5 py-2.5 hover:bg-primary-light transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {cta.label}
              </a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
