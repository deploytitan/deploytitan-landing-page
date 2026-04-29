import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useScrollReveal } from '../utils'
import { Problem } from '../components/Problem'
import { Reframe } from '../components/Reframe'
import { BeforeAfter } from '../components/BeforeAfter'
import { EmotionalClose } from '../components/EmotionalClose'
import { MidCTA } from '../components/MidCTA'

const APP_URL = import.meta.env.VITE_APP_URL as string || 'https://app.deploytitan.com'

export default function Journey() {
  useDocumentMeta(
    'Why We Built DeployTitan — Our Journey',
    'The story behind DeployTitan — the 3 AM incidents, the lost deploys, and why we decided to build the deployment control plane we always wanted.'
  )
  useScrollReveal()

  return (
    <>
      {/* Narrative hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <div className="max-w-3xl mx-auto px-6" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">Our journey</p>
          <h1 className="text-4xl lg:text-5xl font-semibold text-surface leading-tight mb-6">
            We built DeployTitan<br className="hidden md:block" /> because we lived the problem.
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6">
            We were the on-call engineers getting paged at 3 AM. We were the team leads watching a deploy eat 20% of production traffic before anyone noticed. We were the platform engineers writing 400-line Bash rollback scripts that nobody tested until they were needed in a panic.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            This page is the honest story of why we started, what we got wrong, and how we think about deployment risk today.
          </p>
        </div>
      </section>

      {/* Problem */}
      <Problem />

      {/* Reframe */}
      <Reframe />

      {/* Before / After */}
      <BeforeAfter />

      {/* Emotional close */}
      <EmotionalClose />

      {/* CTA */}
      <MidCTA
        heading="Ready to ship like you've been doing this for years?"
        subheading="Start a 14-day free trial. No credit card. No setup calls. Just better deploys."
        primaryLabel="Start free trial"
        primaryHref={`${APP_URL}/signup`}
        secondaryLabel="Read the docs"
        secondaryHref="/docs"
      />
    </>
  )
}
