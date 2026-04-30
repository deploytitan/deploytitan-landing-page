import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Hero } from '../components/Hero'
import { PlatformOverview } from '../components/platform/PlatformOverview'
import { Outcomes } from '../components/Outcomes'
import { Integrations } from '../components/Integrations'
import { Quickstart } from '../components/Quickstart'
import { Testimonials } from '../components/Testimonials'
import { CTA } from '../components/CTA'

export default function Home() {
  useDocumentMeta(
    'DeployTitan — The Deployment Control Plane',
    'Progressive deployments, multi-cloud resilience, and risk intelligence for modern engineering teams. Ship faster. Sleep better.'
  )

  return (
    <>
      {/* 1. Hero — shortened, new CTAs */}
      <Hero />

      {/* 2. Platform overview — 3 product teasers (Titan Rollout / Shield / Sentinel) */}
      <PlatformOverview />

      {/* 4. Outcome stats */}
      <Outcomes />

      {/* 5. Integrations strip */}
      <Integrations />

      {/* 6. Quickstart + install tabs */}
      <Quickstart />

      {/* 7. Testimonials wall */}
      <Testimonials />

      {/* 7. Final CTA */}
      <CTA />
    </>
  )
}
