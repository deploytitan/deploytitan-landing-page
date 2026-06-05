'use client'

import { useEffect, useState } from 'react'
import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Button } from './shared/Button'
import { Container } from './shared/Container'

// ─── Types ────────────────────────────────────────────────────────────────────

type PRStatus = 'pending' | 'running' | 'deployed' | 'failed'

interface PRDef {
  id: string
  service: string
  prTitle: string
  trigger: 'ci' | 'jenkins'
}

// ─── Static PR data ───────────────────────────────────────────────────────────

const PRS: PRDef[] = [
  { id: 'auth', service: 'auth-service', prTitle: 'fix: session timeout', trigger: 'ci' },
  { id: 'api', service: 'api-gateway', prTitle: 'feat: rate limits', trigger: 'ci' },
  { id: 'web', service: 'web-app', prTitle: 'chore: bump deps', trigger: 'ci' },
  {
    id: 'payments',
    service: 'payments-svc',
    prTitle: 'fix: checkout edge case',
    trigger: 'jenkins',
  },
  { id: 'analytics', service: 'analytics', prTitle: 'feat: event tracking', trigger: 'ci' },
  { id: 'notifs', service: 'notifications', prTitle: 'fix: email template', trigger: 'ci' },
]

// ─── Animation script ─────────────────────────────────────────────────────────

type ScriptEvent = { t: number; id: string; status: PRStatus }

const SCRIPT: ScriptEvent[] = [
  // Deployments start after stakeholder approves from Slack (~t=4600)
  // Gap of 2800ms between Slack appearing (t=1800) and first PR running (t=4600)
  // gives viewers time to read the approval request before things start moving
  { t: 4600, id: 'auth', status: 'running' },
  { t: 6100, id: 'auth', status: 'deployed' },
  { t: 6400, id: 'api', status: 'running' },
  { t: 7700, id: 'api', status: 'deployed' },
  { t: 8000, id: 'web', status: 'running' },
  { t: 9000, id: 'web', status: 'deployed' },
  { t: 9300, id: 'payments', status: 'running' },
  { t: 9600, id: 'analytics', status: 'running' },
  { t: 11100, id: 'payments', status: 'deployed' },
  { t: 11900, id: 'analytics', status: 'deployed' },
  { t: 12300, id: 'notifs', status: 'running' },
  { t: 14000, id: 'notifs', status: 'deployed' },
]

const CYCLE_DURATION = 20000

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  PRStatus,
  {
    label: string
    textClass: string
    bgClass: string
  }
> = {
  pending: {
    label: 'Pending',
    textClass: 'text-ink-tertiary',
    bgClass: '',
  },
  running: {
    label: 'Running',
    textClass: 'text-signal-warning-text dark:text-signal-warning',
    bgClass: 'bg-signal-warning/[0.025]',
  },
  deployed: {
    label: 'Deployed',
    textClass: 'text-signal-success-text dark:text-signal-success',
    bgClass: '',
  },
  failed: {
    label: 'Failed',
    textClass: 'text-signal-danger-text dark:text-signal-danger',
    bgClass: 'bg-signal-danger/[0.03]',
  },
}

// ─── Inline CSS ───────────────────────────────────────────────────────────────

const EXTRA_CSS = `
  @keyframes dotBlink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.25; transform: scale(1.8); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes rowReveal {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }
`

// ─── Spinning indicator ───────────────────────────────────────────────────────

function DeployingSpinner() {
  return (
    <span
      className="border-signal-warning inline-block h-2 w-2 border border-t-transparent"
      style={{
        borderRadius: '50%',
        animation: 'spinRing 0.9s linear infinite',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    />
  )
}

// ─── Single PR row ────────────────────────────────────────────────────────────

function PRRow({ pr, status, index }: { pr: PRDef; status: PRStatus; index: number }) {
  const cfg = STATUS_CONFIG[status]
  const isFirst = index === 0

  return (
    <div
      className={`border-line grid items-center gap-3 border-b px-4 py-3 transition-colors duration-500 last:border-b-0 ${cfg.bgClass}`}
      style={{
        gridTemplateColumns: '1fr auto',
        opacity: status !== 'pending' || isFirst ? 1 : 0.55,
      }}
    >
      {/* Service + PR title */}
      <div className="min-w-0">
        <p className="text-ink-tertiary truncate font-mono text-[9px] tracking-[0.1em] uppercase">
          {pr.service}
        </p>
        <p className="text-ink-secondary mt-0.5 truncate text-[11px] leading-tight">{pr.prTitle}</p>
      </div>

      {/* Trigger label + status */}
      <div className="flex shrink-0 items-center gap-2.5">
        <span className="text-ink-quaternary font-mono text-[8px] tracking-[0.08em]">
          {pr.trigger === 'jenkins' ? 'Jenkins' : 'CI'}
        </span>
        <div className={`flex items-center gap-1.5`}>
          {status === 'running' && <DeployingSpinner />}
          {status === 'deployed' && (
            <span className="bg-signal-success h-1.5 w-1.5" style={{ borderRadius: '50%' }} />
          )}
          {status === 'failed' && (
            <span
              className="bg-signal-danger h-1.5 w-1.5"
              style={{ borderRadius: '50%', animation: 'dotBlink 1.8s ease-in-out infinite' }}
            />
          )}
          {status === 'pending' && (
            <span className="bg-ink-quaternary/30 h-1.5 w-1.5" style={{ borderRadius: '50%' }} />
          )}
          <span className={`font-mono text-[8.5px] tracking-[0.08em] uppercase ${cfg.textClass}`}>
            {cfg.label}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Slack notification ───────────────────────────────────────────────────────

function SlackNotification({ visible, approved }: { visible: boolean; approved: boolean }) {
  return (
    <div
      className="border-primary/20 bg-primary/[0.025] border p-3.5"
      style={{
        borderRadius: '12px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition:
          'opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-hidden={!visible}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 w-0.5 shrink-0 self-stretch transition-colors duration-500 ${approved ? 'bg-signal-success' : 'bg-primary'}`}
          style={{ borderRadius: '2px', minHeight: '56px' }}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <span
              className="bg-primary/15 text-primary-accessible px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em]"
              style={{ borderRadius: '4px' }}
            >
              DeployTitan
            </span>
            <span className="text-ink-quaternary font-mono text-[8px]">just now</span>
          </div>
          <p className="text-ink font-mono text-[10.5px] leading-snug font-medium">
            {approved
              ? 'Sprint 22 approved — deploying now'
              : 'Sprint 22 is ready for your approval'}
          </p>
          <p className="text-ink-tertiary mt-0.5 font-mono text-[9px] transition-all duration-500">
            {approved
              ? '6 PRs deploying · triggered by Slack approval'
              : '6 PRs queued · 3 services · 1-click to deploy'}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            {approved ? (
              <span
                className="cursor-default border px-2 py-1 font-mono text-[9px]"
                style={{
                  borderRadius: '4px',
                  borderColor: 'var(--color-signal-success)',
                  backgroundColor: 'rgba(34,197,94,0.08)',
                  color: 'var(--color-signal-success-text, #16a34a)',
                }}
              >
                ✓ Approved
              </span>
            ) : (
              <>
                <span
                  className="border-primary/30 bg-primary/10 text-primary-accessible cursor-default border px-2 py-1 font-mono text-[9px]"
                  style={{ borderRadius: '4px' }}
                >
                  ✓ Approve release
                </span>
                <span
                  className="border-line bg-surface text-ink-tertiary cursor-default border px-2 py-1 font-mono text-[9px]"
                  style={{ borderRadius: '4px' }}
                >
                  View details →
                </span>
              </>
            )}
          </div>
          <p className="text-ink-quaternary mt-2 font-mono text-[8px]">
            {approved
              ? 'Impact report posts in ~15 min'
              : 'Stakeholders notified · approve without leaving Slack'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const INITIAL_STATES: Record<string, PRStatus> = Object.fromEntries(
  PRS.map((pr) => [pr.id, 'pending' as PRStatus]),
)

export function Hero() {
  const ref = useScrollReveal()

  const [prStates, setPRStates] = useState<Record<string, PRStatus>>(INITIAL_STATES)
  const [showSlack, setShowSlack] = useState(false)

  // Derive overall panel status
  const hasFailed = Object.values(prStates).some((s) => s === 'failed')
  const hasRunning = Object.values(prStates).some((s) => s === 'running')
  const allDeployed = PRS.every((p) => prStates[p.id] === 'deployed')
  const awaitingApproval = showSlack && !hasRunning && !allDeployed
  const headerStatus = hasFailed
    ? 'failed'
    : allDeployed
      ? 'deployed'
      : hasRunning
        ? 'deploying'
        : awaitingApproval
          ? 'awaiting'
          : 'pending'

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // Show approval request first, all PRs deployed
      setShowSlack(true)
      setPRStates(Object.fromEntries(PRS.map((pr) => [pr.id, 'deployed' as PRStatus])))
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    const reset = () => {
      setPRStates({ ...INITIAL_STATES })
      setShowSlack(false)
    }

    const runCycle = () => {
      reset()

      for (const event of SCRIPT) {
        const t = setTimeout(() => {
          setPRStates((prev) => ({ ...prev, [event.id]: event.status }))
        }, event.t)
        timers.push(t)
      }

      // Show Slack approval request before deployments start
      const slackT = setTimeout(() => setShowSlack(true), 1800)
      timers.push(slackT)

      const loopT = setTimeout(runCycle, CYCLE_DURATION)
      timers.push(loopT)
    }

    const init = setTimeout(runCycle, 600)
    timers.push(init)

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      ref={ref}
      className="border-line relative overflow-hidden border-b pt-28 pb-20 lg:pt-34 lg:pb-28"
    >
      <style dangerouslySetInnerHTML={{ __html: EXTRA_CSS }} />

      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(180deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 42%, rgba(201,168,76,0) 100%)',
        }}
        aria-hidden="true"
      />

      <Container width="page" padding="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,0.88fr)_minmax(540px,1.12fr)]">
          {/* Left column */}
          <div className="flex flex-col items-start text-left lg:min-h-[580px] lg:justify-center lg:pr-4">
            <p
              data-reveal
              className="text-ink-tertiary mb-5 font-mono text-[11px] tracking-[0.24em] uppercase"
            >
              Sprint releases
            </p>
            <h1
              data-reveal
              data-reveal-delay="1"
              className="font-display text-ink max-w-[13ch] text-[clamp(3.25rem,14vw,5.2rem)] leading-[0.93] font-medium tracking-[-0.055em] lg:text-[clamp(4.2rem,6.7vw,6.65rem)]"
            >
              Ship the sprint.
              <br />
              <span className="text-ink-secondary">Not the war room.</span>
            </h1>
            <p
              data-reveal
              data-reveal-delay="2"
              className="text-ink-secondary mt-7 max-w-[48ch] text-[1.0625rem] leading-[1.65] lg:text-lg"
            >
              Add your sprint PRs, click on start, and walk away. DeployTitan watches every job,
              alerts you when something needs attention, and lets your team approve without opening
              a browser.
            </p>
            <div
              data-reveal
              data-reveal-delay="3"
              className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <Button
                as="a"
                href={CREATE_ACCOUNT_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="rounded-[8px]"
              >
                Create account
              </Button>
            </div>
            <p
              data-reveal
              data-reveal-delay="4"
              className="border-line text-ink-tertiary mt-7 w-full border-t pt-4 font-mono text-[10px] leading-5 tracking-[0.08em]"
            >
              GitHub · GitHub Actions · Jenkins · Grafana · Slack
            </p>
          </div>

          {/* Right column — PR list panel */}
          <div data-reveal data-reveal-delay="3">
            <div
              className="border-line bg-surface relative overflow-hidden border"
              style={{ borderRadius: '2px' }}
            >
              {/* Panel header */}
              <div className="border-line bg-surface-alt/70 flex items-center justify-between border-b px-5 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className="bg-primary/20 flex h-5 w-5 items-center justify-center"
                    style={{ borderRadius: '1px' }}
                  >
                    <span className="bg-primary block h-2 w-2" style={{ borderRadius: '1px' }} />
                  </span>
                  <div>
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.16em] uppercase">
                      Titan Rollouts
                    </p>
                    <p className="text-ink font-mono text-[11px]">sprint-22 / prod-window</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {headerStatus === 'failed' && (
                    <>
                      <span
                        className="bg-signal-danger h-1.5 w-1.5"
                        style={{
                          borderRadius: '50%',
                          animation: 'dotBlink 1.8s ease-in-out infinite',
                        }}
                      />
                      <p className="text-signal-danger-text dark:text-signal-danger font-mono text-[10px] tracking-[0.08em] uppercase">
                        Failed
                      </p>
                    </>
                  )}
                  {headerStatus === 'deploying' && (
                    <>
                      <DeployingSpinner />
                      <p className="text-signal-warning-text dark:text-signal-warning font-mono text-[10px] tracking-[0.08em] uppercase">
                        Deploying
                      </p>
                    </>
                  )}
                  {headerStatus === 'awaiting' && (
                    <>
                      <span className="bg-primary h-1.5 w-1.5" style={{ borderRadius: '50%' }} />
                      <p className="text-primary-accessible font-mono text-[10px] tracking-[0.08em] uppercase">
                        Awaiting approval
                      </p>
                    </>
                  )}
                  {headerStatus === 'deployed' && (
                    <>
                      <span
                        className="bg-signal-success h-1.5 w-1.5"
                        style={{ borderRadius: '50%' }}
                      />
                      <p className="text-signal-success-text dark:text-signal-success font-mono text-[10px] tracking-[0.08em] uppercase">
                        Deployed
                      </p>
                    </>
                  )}
                  {headerStatus === 'pending' && (
                    <p className="text-ink-tertiary font-mono text-[10px] tracking-[0.08em] uppercase">
                      Pending
                    </p>
                  )}
                </div>
              </div>

              {/* Column headers */}
              <div
                className="border-line bg-surface-alt/40 grid border-b px-4 py-2"
                style={{ gridTemplateColumns: '1fr auto' }}
              >
                <p className="text-ink-quaternary font-mono text-[9px] tracking-[0.14em] uppercase">
                  Service · PR
                </p>
                <p className="text-ink-quaternary font-mono text-[9px] tracking-[0.14em] uppercase">
                  Status
                </p>
              </div>

              {/* PR rows */}
              <div>
                {PRS.map((pr, i) => (
                  <PRRow key={pr.id} pr={pr} status={prStates[pr.id] ?? 'pending'} index={i} />
                ))}
              </div>

              {/* Slack notification */}
              <div
                className="p-4 transition-all duration-500"
                style={{
                  maxHeight: showSlack ? '160px' : '0px',
                  overflow: 'hidden',
                  padding: showSlack ? '16px' : '0px',
                }}
              >
                <SlackNotification visible={showSlack} approved={hasRunning || allDeployed} />
              </div>

              {/* Footer strip */}
              <div className="border-line bg-surface-alt/40 flex items-center justify-between border-t px-4 py-2.5">
                <p className="text-ink-quaternary font-mono text-[9px] tracking-[0.1em] uppercase">
                  6 PRs · 3 services
                </p>
                <p className="text-primary-accessible font-mono text-[9px] tracking-[0.1em] uppercase">
                  {allDeployed
                    ? '6 deployed'
                    : hasRunning
                      ? 'Running...'
                      : hasFailed
                        ? '1 failed'
                        : 'Queued'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
