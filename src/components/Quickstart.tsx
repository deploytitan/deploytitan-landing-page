'use client'

import { useEffect, useRef, useState } from 'react'
import { InstallTabs } from './shared/InstallTabs'
import { CodeBlock, InlineCode } from './shared/CodeBlock'
import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../hooks/useTheme'

const DEPLOY_SNIPPET = `# 1. Authenticate
dt login

# 2. Link your repo
dt init --project my-api

# 3. Release with a progressive rollout
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
  const reducedMotion = useReducedMotion()
  const { resolved } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const theme = mounted ? resolved : 'light'
  const bgColor = theme === 'dark' ? 'var(--color-dark-surface, #0d0c0a)' : 'var(--color-surface-alt, #f5f4f1)'
  const headerBg = theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.02]'
  const labelColor = theme === 'dark' ? 'rgba(245,244,241,0.3)' : 'rgba(26,21,18,0.3)'
  const iconBg = theme === 'dark' ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.12)'
  const iconBorder = theme === 'dark' ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.25)'
  const iconStroke = 'rgba(201,168,76,0.8)'
  const textColor = theme === 'dark' ? 'var(--color-signal-success)' : 'var(--color-ink-secondary, #3d3530)'

  useEffect(() => {
    const lines = [
      '$ dt deploy --strategy canary',
      '  ✓ Risk score: 12 / 100  (low)',
      '  ✓ Blast radius: 1 service affected',
      '  → Shifting 5% traffic to v2.4.1…',
      '  → 10% — p99: 38 ms  errors: 0.00%',
      '  → 25% — p99: 41 ms  errors: 0.01%',
      '  → 50% — p99: 40 ms  errors: 0.00%',
      '  → 100%: rollout complete in 12m 04s',
      '  ✓ Deployment successful',
    ]
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      el.textContent = lines.join('\n')
      return
    }

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
  }, [reducedMotion])

  return (
    <div
      className="border border-line overflow-hidden"
      style={{ borderRadius: '2px', backgroundColor: bgColor }}
    >
      {/* Header bar — same structure as CodeBlock */}
      <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${headerBg}`}>
        <div
          className="flex h-4 w-4 items-center justify-center"
          style={{ backgroundColor: iconBg, borderRadius: '1px', border: `1px solid ${iconBorder}` }}
        >
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
            <path d="M1 3l3 2-3 2" stroke={iconStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 8h4" stroke={iconStroke} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-mono text-[11px]" style={{ color: labelColor }}>
          deploytitan: dt deploy
        </span>
      </div>
      {/* Animated output */}
      <div className="px-4 py-4">
        <pre
          ref={ref}
          className="font-mono text-[12px] leading-[1.8] whitespace-pre min-h-[220px]"
          style={{ color: textColor }}
        />
      </div>
    </div>
  )
}

export function Quickstart() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 border-t border-line" ref={ref}>
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
            <InlineCode>dt</InlineCode>{' '}
            CLI, authenticate, and ship your first canary deployment before lunch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" data-reveal>
          {/* Left — install tabs */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Step 1: Install
              </p>
              <InstallTabs />
            </div>
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Step 2–4: Deploy
              </p>
              <CodeBlock code={DEPLOY_SNIPPET} lang="bash" filename="terminal" />
            </div>
          </div>

          {/* Right — animated terminal */}
          <TerminalOutput />
        </div>
      </Container>
    </section>
  )
}
