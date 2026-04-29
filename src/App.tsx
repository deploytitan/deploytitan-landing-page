import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Reframe } from './components/Reframe'
import { Solution } from './components/Solution'
import { Resilience } from './components/Resilience'
import { Performance } from './components/Performance'
import { IntegrationSimplicity } from './components/IntegrationSimplicity'
import { ShiftLeft } from './components/ShiftLeft'
import { BeforeAfter } from './components/BeforeAfter'
import { Outcomes } from './components/Outcomes'
import { EmotionalClose } from './components/EmotionalClose'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

const DEMO_URL = import.meta.env.VITE_DEMO_URL || 'https://demo.deploytitan.com'

function MidCTA() {
  return (
    <section className="py-12 border-t border-b border-line bg-surface-alt/60 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-base text-ink-secondary leading-relaxed max-w-lg">
          See it in action — trigger a real production deployment from your browser.{' '}
          <span className="text-ink font-medium">No signup.</span>
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-surface text-sm font-medium transition-all duration-200 hover:bg-ink/90 shrink-0"
          style={{ borderRadius: '2px' }}
        >
          Try the live demo
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Reframe />
        <Solution />
        <Resilience />
        <Performance />
        <IntegrationSimplicity />
        <ShiftLeft />
        <BeforeAfter />
        <MidCTA />
        <Outcomes />
        <EmotionalClose />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
