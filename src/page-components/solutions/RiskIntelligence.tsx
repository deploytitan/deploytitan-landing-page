'use client'

import { APP_URL } from '@/lib/env'
import { useScrollReveal } from '../../utils'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'
import Link from 'next/link'

const RISK_FACTORS = [
  {
    label: 'Dependency blast radius',
    description: 'How many downstream services depend on this service?',
    weight: 'High',
  },
  {
    label: 'Deploy frequency delta',
    description: 'Is this change deploying more frequently than historical baseline?',
    weight: 'Medium',
  },
  {
    label: 'SLO error budget remaining',
    description: 'How much error budget is left? Low budget = higher risk.',
    weight: 'High',
  },
  {
    label: 'PR diff size',
    description: 'Large diffs correlate with higher incident rates.',
    weight: 'Medium',
  },
  {
    label: 'Time of day / day of week',
    description: 'Friday 4pm + large diff + low budget = maximum caution.',
    weight: 'Medium',
  },
  {
    label: 'Recent incident history',
    description: 'Services with recent incidents get elevated baseline risk.',
    weight: 'High',
  },
]

const GUARDRAILS = [
  {
    level: 'Advisory',
    color: 'text-signal-warning',
    border: 'border-signal-warning/30',
    bg: 'bg-signal-warning/5',
    description: 'Score 40–69. PR annotation warns the deployer. Deploy proceeds.',
    action: 'Notify + log',
  },
  {
    level: 'Soft block',
    color: 'text-orange-400',
    border: 'border-orange-400/30',
    bg: 'bg-orange-400/5',
    description: 'Score 70–84. Requires second approval or SRE sign-off in the PR.',
    action: 'Require approval',
  },
  {
    level: 'Hard block',
    color: 'text-signal-danger',
    border: 'border-signal-danger/30',
    bg: 'bg-signal-danger/5',
    description: 'Score 85+. Deploy is blocked until risk score drops below threshold.',
    action: 'Block deploy',
  },
]

export default function SolutionRiskIntelligence() {
  useScrollReveal()

  return (
    <>
      {/* Hero */}
      <section className="blueprint-grid pt-28 pb-20 border-b border-line">
        <Container width="4xl" padding="default" data-reveal>
          <Breadcrumbs className="mb-6" />
          <div
            className="inline-flex items-center gap-2 font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 mb-6"
            style={{ borderRadius: '2px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal-success" />
            Powered by Titan Foresight
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-5">
            Know your risk score
            <br className="hidden md:block" /> before you ship.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Most teams find out about deploy risk in the post-mortem. Titan Foresight analyses every
            PR against your live dependency graph, calculates blast radius, checks error budget, and
            surfaces a 0–100 risk score — before you merge.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-ink text-surface px-6 py-3 text-sm font-medium dark:text-surface transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Start free trial
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <Link
              href="/products/titan-foresight"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Explore Titan Foresight →
            </Link>
          </div>
        </Container>
      </section>

      {/* Risk factors */}
      <section className="py-20 border-b border-line">
        <Container width="6xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Risk model
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              Six factors. One score.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Sentinel weighs six signals against your specific service's history and dependency
              graph to produce a calibrated risk score.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RISK_FACTORS.map((f, i) => (
              <Card
                key={f.label}
                padding="sm"
                className="hover:border-primary/20 transition-all"
                data-reveal
                data-reveal-delay={String(i % 3)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-ink leading-snug">{f.label}</h3>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 ${
                      f.weight === 'High'
                        ? 'text-signal-danger/80 bg-signal-danger/8 border border-signal-danger/20'
                        : 'text-signal-warning/80 bg-signal-warning/8 border border-signal-warning/20'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {f.weight}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Guardrails */}
      <section className="py-20 border-b border-line">
        <Container width="5xl" padding="default">
          <div className="mb-12" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Guardrails
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-2">
              Automated enforcement, not just warnings.
            </h2>
            <p className="text-ink-secondary text-sm max-w-lg">
              Configure what happens at each risk threshold. From advisory notifications to hard
              blocks — you define the policy, Sentinel enforces it.
            </p>
          </div>
          <div className="flex flex-col gap-4" data-reveal>
            {GUARDRAILS.map((g) => (
              <div
                key={g.level}
                className={`sharp-card border p-6 ${g.border} ${g.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${g.color}`}
                  >
                    {g.level}
                  </span>
                  <p className="text-sm text-ink-secondary">{g.description}</p>
                </div>
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-wider border px-2 py-1 ${g.border} ${g.color}`}
                  style={{ borderRadius: '2px' }}
                >
                  {g.action}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PR annotation screenshot-style */}
      <section className="py-20 border-b border-line bg-surface-alt/30">
        <Container width="3xl" padding="default">
          <div className="mb-8" data-reveal>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              GitHub integration
            </p>
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Risk score on every PR. No workflow change required.
            </h2>
          </div>
          <Card padding="none" className="overflow-hidden" data-reveal>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-alt/60">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-ink-quaternary"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="font-mono text-[10px] text-ink-quaternary">
                titan-foresight · PR #847 comment
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
                  DT
                </div>
                <span className="text-xs font-semibold text-ink">Titan Foresight</span>
                <span className="text-xs text-ink-quaternary font-mono">just now</span>
              </div>
              <div className="border border-line rounded-sm p-4 text-xs font-mono">
                <p className="font-semibold text-ink mb-2">
                  🛡 Risk Analysis ·{' '}
                  <span className="text-signal-warning">Score: 62/100 — Advisory</span>
                </p>
                <p className="text-ink-secondary mb-2">
                  Analysed 847 lines changed across 3 files.
                </p>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">Blast radius</td>
                      <td className="text-ink">4 downstream services</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">Error budget</td>
                      <td className="text-signal-warning">38% remaining (caution)</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">SLO violations (7d)</td>
                      <td className="text-ink">2</td>
                    </tr>
                    <tr>
                      <td className="text-ink-tertiary pr-4 py-0.5">Recommendation</td>
                      <td className="text-ink">Deploy off-peak or reduce canary weight</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      
    </>
  )
}
