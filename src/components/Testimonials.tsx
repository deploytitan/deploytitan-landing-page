import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { Card } from './shared/Card'

const testimonials = [
  {
    quote:
      "We cut our mean time to recovery from 40 minutes to under 90 seconds. DeployTitan just handles it automatically — I don't even get paged anymore.",
    author: 'Staff SRE',
    company: 'Series B fintech',
    handle: '@sre_lead',
  },
  {
    quote:
      'The cohort rollout feature alone was worth it. We used to cross our fingers on every deploy. Now we roll to 5%, check SLOs, and promote automatically.',
    author: 'VP Engineering',
    company: 'B2B SaaS',
    handle: '@vp_eng',
  },
  {
    quote:
      "Titan Sentinel commenting blast-radius analysis on PRs changed how our team thinks about risk. It's shifted the conversation left in a real way.",
    author: 'Platform Eng Lead',
    company: 'Infrastructure consultancy',
    handle: '@plateng',
  },
  {
    quote:
      "Our multi-cloud failover used to be a 2-hour runbook. Now it's automatic. Titan Shield rerouted traffic during the us-east-1 incident before anyone on the team noticed.",
    author: 'Principal Engineer',
    company: 'E-commerce platform',
    handle: '@pe_infra',
  },
  {
    quote:
      'The `dt deploy` CLI is deceptively simple. Behind it is a full rollout engine with automatic rollback. We onboarded our entire pipeline in an afternoon.',
    author: 'DevOps Engineer',
    company: 'Growth-stage startup',
    handle: '@devops_dan',
  },
  {
    quote:
      'Every company shipping software should have a deployment control plane. We just happened to find DeployTitan before we had our first major outage. Lucky.',
    author: 'CTO',
    company: 'Developer tooling startup',
    handle: '@cto_tools',
  },
]

export function Testimonials() {
  const ref = useScrollReveal()

  return (
    <section className="py-16 lg:py-20 border-t border-line bg-surface-alt/40" ref={ref}>
      <Container>
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Social proof
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] text-ink">
            Teams shipping with confidence.
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4" data-reveal>
          {testimonials.map((t, i) => (
            <Card
              key={i}
              variant="spotlight"
              padding="sm"
              className="break-inside-avoid flex flex-col gap-4"
            >
              {/* Quote */}
              <p className="text-sm text-ink-secondary leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-line-subtle">
                <div className="w-7 h-7 rounded-full bg-ink/10 border border-line flex items-center justify-center shrink-0">
                  <span className="font-mono text-[9px] text-ink-tertiary">
                    {t.author.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs font-medium text-ink truncate">{t.author}</span>
                  <span className="text-[11px] text-ink-tertiary truncate">{t.company}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-quaternary italic">
          Quotes are illustrative while we collect real customer stories.
        </p>
      </Container>
    </section>
  )
}
