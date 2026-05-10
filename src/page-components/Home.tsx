import { Hero } from '../components/Hero'
import { PlatformOverview } from '../components/platform/PlatformOverview'
import { CTA } from '../components/CTA'
import { QuickstartLazy } from '../components/QuickstartLazy'

export default function Home() {
  return (
    <>
      {/* 1. Hero — shortened, new CTAs */}
      <Hero />

      {/* 2. Platform overview — 7 products (Foresight / Rollout / Shield / Phoenix / Ledger / Insight / Sandbox) */}
      <PlatformOverview />

      {/* 4. Outcome stats */}
      {/*<Outcomes />*/}

      {/* 5. Integrations strip */}
      {/*<Integrations />*/}

      {/* 6. Quickstart + install tabs */}
      <QuickstartLazy />

      {/* 7. Testimonials wall */}
      {/*<Testimonials />*/}

      {/* 7. Final CTA */}
      <CTA />
    </>
  )
}
