'use client'

import { useEffect, useRef } from 'react'
import { InstallTabs } from './shared/InstallTabs'
import { CodeBlock } from './shared/CodeBlock'
import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { Card } from './shared/Card'

const DEPLOY_SNIPPET = `# 1. Authenticate
dt login

# 2. Link your repo
dt init --project my-api

# 3. Deploy with a progressive rollout
dt deploy \\
  --strategy canary \\
  --initial-weight 5 \\
  --target-weight 100 \\
  --increment 10 \\
  --interval 2m

# Titan Foresight runs risk analysis before traffic shifts.
# Titan Shield monitors cross-region health throughout.
# dt auto-rolls back if error rate > threshold.`

// Simple terminal typing animation
function TerminalOutput() {
  const ref = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const lines = [
      '$ dt deploy --strategy canary',
      '  ✓ Risk score: 12 / 100  (low)',
      '  ✓ Blast radius: 1 service affected',
      '  → Shifting 5% traffic to v2.4.1…',
      '  → 10% — p99: 38 ms  errors: 0.00%',
      '  → 25% — p99: 41 ms  errors: 0.01%',
      '  → 50% — p99: 40 ms  errors: 0.00%',
      '  → 100% — rollout complete in 12m 04s',
      '  ✓ Deployment successful',
    ]
    const el = ref.current
    if (!el) return
    el.textContent = ''

    let lineIdx = 0
    let charIdx = 0
    let raf: number

    const tick = () => {
      if (lineIdx >= lines.length) return
      const line = lines[lineIdx]
      if (charIdx < line.length) {
        el.textContent += line[charIdx]
        charIdx++
        raf = requestAnimationFrame(() => setTimeout(tick, 18))
      } else {
        el.textContent += '\n'
        lineIdx++
        charIdx = 0
        raf = requestAnimationFrame(() => setTimeout(tick, lineIdx === 0 ? 300 : 80))
      }
    }

    const delay = setTimeout(tick, 600)
    return () => {
      clearTimeout(delay)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <pre
      ref={ref}
      className="font-mono text-[12px] leading-[1.8] text-emerald-400/90 whitespace-pre min-h-[220px]"
    />
  )
}

export function Quickstart() {
  useScrollReveal()

  return (
    <section className="py-24 border-t border-line">
      <Container width="6xl" padding="default">
        {/* Heading */}
        <div className="mb-14 max-w-xl" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
            Get started
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-ink leading-tight mb-4">
            Deploy in minutes,
            <br />
            not days.
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed">
            Install the{' '}
            <code className="font-mono text-sm text-ink/80 bg-ink/[0.05] px-1.5 py-0.5 rounded">
              dt
            </code>{' '}
            CLI, authenticate, and ship your first canary deployment before lunch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" data-reveal>
          {/* Left — install tabs */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Step 1 — Install
              </p>
              <InstallTabs />
            </div>
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Step 2–4 — Deploy
              </p>
              <CodeBlock code={DEPLOY_SNIPPET} lang="bash" filename="terminal" />
            </div>
          </div>

          {/* Right — animated terminal */}
          <Card tone="muted" className="border border-line overflow-hidden" style={{ backgroundColor: '#0d1117' }}>
            <div className="flex items-center gap-2 mb-5 border-b border-white/[0.06] pb-3">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 font-mono text-[11px] text-white/30">
                deploytitan — dt deploy
              </span>
            </div>
            <TerminalOutput />
          </Card>
        </div>
      </Container>
    </section>
  )
}
