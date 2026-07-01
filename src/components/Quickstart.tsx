'use client'

import { useEffect, useRef, useState } from 'react'
import { CodeBlock } from './shared/CodeBlock'
import { useScrollReveal } from '../utils'
import { Container } from './shared/Container'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../hooks/useTheme'
import { WAITLIST_URL } from '@/lib/env'
import { Button } from './shared/Button'

const RELEASE_SNIPPET = `# 1. Authenticate
dt login

# 2. Create a release object from your PRs
dt release create \\
  --name "spring-checkout" \\
  --prs "org/checkout-api#412,org/pricing-migration#89,org/web-storefront#203"

# 3. Visualize dependency graph and readiness
dt release status spring-checkout

# 4. Sequence and promote when dependencies clear
dt release promote spring-checkout --env production`

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
      '$ dt release status spring-checkout',
      '',
      '  Release: spring-checkout',
      '  Services: 4   PRs: 6   Blockers: 1',
      '',
      '  checkout-api       ── Ready    (waiting on pricing-migration)',
      '  pricing-migration  ── Blocked  (schema review required)',
      '  web-storefront     ── Staging  (QA passed)',
      '  fulfillment-worker ── Approved (rollback playbook linked)',
      '',
      '  ⚠  1 blocking dependency must clear before promotion.',
      '  ✓  Rollback owners assigned for all 4 services.',
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
    let paused = false

    const tick = () => {
      if (paused || lineIdx >= lines.length) return
      const line = lines[lineIdx]
      if (charIdx < line.length) {
        el.textContent += line[charIdx]
        charIdx++
        raf = requestAnimationFrame(() => setTimeout(tick, 14))
      } else {
        el.textContent += '\n'
        lineIdx++
        charIdx = 0
        raf = requestAnimationFrame(() => setTimeout(tick, lineIdx === 0 ? 300 : 60))
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paused = false
          if (lineIdx < lines.length) tick()
        } else {
          paused = true
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)

    const delay = setTimeout(tick, 600)
    return () => {
      clearTimeout(delay)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [reducedMotion])

  return (
    <div
      className="border border-line overflow-hidden"
      style={{ borderRadius: '2px', backgroundColor: bgColor }}
    >
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
          deploytitan: dt release status
        </span>
      </div>
      <div className="px-4 py-4">
        <figure aria-label="Terminal output showing DeployTitan release status">
          <pre
            ref={ref}
            className="font-mono text-[12px] leading-[1.8] whitespace-pre min-h-[220px]"
            style={{ color: textColor }}
          />
        </figure>
      </div>
    </div>
  )
}

export function Quickstart() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 border-t border-line" ref={ref}>
      <Container width="6xl" padding="default">
        <div className="mb-14 max-w-xl" data-reveal>
          <p className="text-xs font-mono tracking-widest uppercase text-primary-accessible mb-3">
            Get started
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-ink leading-tight mb-4">
            From messy release to
            <br />
            coordinated workflow.
          </h2>
          <p className="text-ink-secondary text-base leading-relaxed">
            Connect your repos, link your PRs into a release object, and get shared
            visibility across your entire release before anything ships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" data-reveal>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-mono text-ink-tertiary uppercase tracking-wider mb-3">
                Steps 1 to 4: coordinate a release
              </p>
              <CodeBlock code={RELEASE_SNIPPET} lang="bash" filename="terminal" />
            </div>
            <div
              className="border border-primary/20 bg-primary/[0.04] p-5"
              style={{ borderRadius: '2px' }}
            >
              <p className="font-mono text-[10px] tracking-[0.16em] text-primary-accessible uppercase mb-3">
                What you get immediately
              </p>
              <ul className="space-y-2.5">
                {[
                  'Shared release record visible to all teams involved',
                  'Blocking dependencies flagged before they cause incidents',
                  'Rollback owners and playbooks attached before rollout begins',
                  'Slack notifications when a release is blocked or ready to promote',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 block h-1.5 w-1.5 shrink-0 bg-primary" style={{ borderRadius: '1px' }} />
                    <span className="text-sm leading-7 text-ink-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Button
                as="a"
                href={WAITLIST_URL}
                variant="primary"
                size="md"
              >
                Join waitlist
              </Button>
            </div>
          </div>

          <TerminalOutput />
        </div>
      </Container>
    </section>
  )
}
