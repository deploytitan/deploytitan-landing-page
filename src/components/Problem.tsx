import { useScrollReveal } from '../utils'

export function Problem() {
  const ref = useScrollReveal()

  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          <line x1="4" y1="4" x2="20" y2="20" strokeOpacity="0.3"/>
        </svg>
      ),
      title: 'API Contract Breaks',
      desc: 'Upstream services change response formats without downstream consumers knowing.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
          <path d="M3 12A9 3 0 0 0 21 12"/>
        </svg>
      ),
      title: 'Schema Mismatches',
      desc: 'Database migrations deploy out of order with application code that depends on them.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          <circle cx="12" cy="16" r="1"/>
        </svg>
      ),
      title: 'Secret Rotation Failures',
      desc: 'Rotated secrets propagate unevenly — some services get new keys while others still use old ones.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 7 13.5 12.5 5 7"/>
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M12 17v-2"/><circle cx="12" cy="14" r="0.5" fill="currentColor"/>
        </svg>
      ),
      title: 'Event Payload Changes',
      desc: 'Event producers update schemas while consumers still expect the old format.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Environment Variable Drift',
      desc: 'Environment config changes silently break services that depend on specific values across stages.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 7h14M5 12h14M5 17h14"/>
          <rect x="2" y="3" width="20" height="18" rx="1"/>
          <path d="M9 12l2-2 2 2" strokeOpacity="0.4"/>
          <path d="M2 2l20 20" strokeOpacity="0.35"/>
        </svg>
      ),
      title: 'Worker Incompatibility',
      desc: 'Background workers and consumers fall out of sync with the services that feed them.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
          <path d="M10 4.5l4 7" strokeOpacity="0.35"/>
        </svg>
      ),
      title: 'Artifact Corruption',
      desc: 'Deployment artifacts are silently corrupted in transit — wrong image tags, truncated builds, bad checksums.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          <circle cx="5" cy="19" r="2" strokeOpacity="0.35"/>
          <circle cx="19" cy="5" r="2" strokeOpacity="0.35"/>
          <path d="M6.5 17.5L11 13" strokeOpacity="0.25"/>
          <path d="M13 11l4.5-4.5" strokeOpacity="0.25"/>
        </svg>
      ),
      title: 'Cascading Failures',
      desc: 'One bad deploy triggers a chain reaction across APIs, databases, queues, and workers.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
          <path d="M12 8v2"/><circle cx="12" cy="12" r="0.5" fill="currentColor"/>
        </svg>
      ),
      title: 'Feature Flag Conflicts',
      desc: 'Feature flags enable code paths that depend on services or schemas that haven\'t been deployed yet.',
    },
  ]

  return (
    <section id="problem" className="py-24 lg:py-32 border-t border-line relative" ref={ref}>
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Section label with gold dash */}
        <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
          <span className="w-8 h-px bg-gold/40" />
          The problem
        </span>

        <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08] mb-5 max-w-3xl">
          Deployments are the #1 cause of{' '}
          <span className="text-ink-secondary">production outages.</span>
        </h2>

        <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-16 lg:mb-20">
          Even with CI/CD, feature flags, and observability, teams still experience cascading failures from hidden dependencies between services.
        </p>

        {/* Grid of problem cards — sharp edges, gold hover accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line/60 border border-line" style={{ borderRadius: '2px' }}>
          {cards.map((card, i) => (
            <div
              key={card.title}
              data-reveal
              data-reveal-delay={String(i > 0 ? i : 0)}
              className="bg-surface p-8 lg:p-10 group transition-all duration-300 hover:bg-surface-alt relative"
            >
              {/* Gold corner marker on hover */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/0 group-hover:border-gold/30 transition-all duration-300" />

              <div className="w-9 h-9 mb-5 text-ink/50 group-hover:text-gold-dark transition-colors duration-300">{card.icon}</div>
              <h3 className="text-sm font-semibold mb-2 tracking-[-0.01em]">{card.title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Gold accent line at bottom */}
        <div className="gold-line mt-12 max-w-xs mx-auto" />
      </div>
    </section>
  )
}
