'use client'

import { useEffect, useState } from 'react'
import { CREATE_ACCOUNT_URL } from '@/lib/env'
import { useScrollReveal } from '../utils'
import { Button } from './shared/Button'

// ─── Types ────────────────────────────────────────────────────────────────────

type PRStatus = 'queued' | 'running' | 'deployed'

interface PRDef {
  id: string
  service: string
  prTitle: string
  trigger: 'ci' | 'jenkins'
}

// ─── Static data ──────────────────────────────────────────────────────────────

const PRS: PRDef[] = [
  { id: 'auth', service: 'auth-service', prTitle: 'fix: session timeout', trigger: 'ci' },
  { id: 'api', service: 'api-gateway', prTitle: 'feat: rate limits', trigger: 'ci' },
  { id: 'web', service: 'web-app', prTitle: 'chore: bump deps', trigger: 'ci' },
  { id: 'payments', service: 'payments-svc', prTitle: 'fix: checkout', trigger: 'jenkins' },
  { id: 'analytics', service: 'analytics', prTitle: 'feat: event tracking', trigger: 'ci' },
  { id: 'notifs', service: 'notifications', prTitle: 'fix: email template', trigger: 'ci' },
]

const RELEASE_NAME = 'sprint-22'
const CYCLE_MS = 24000

// ─── Timing ───────────────────────────────────────────────────────────────────
//
// 500ms   → start typing (85ms/char × 9 chars = 765ms total)
// 1765ms  → PRs appear staggered (220ms apart)
// 3365ms  → "ready" state — button becomes active
// 4865ms  → button click animation
// 5365ms  → Slack panel slides in
// 7165ms  → Slack approved
// 7865ms  → deployments begin
// 15165ms → last PR deployed
// 15665ms → release note appears
// 19665ms → reset and loop

const TYPING_START = 500
const CHAR_MS = 85
const TYPING_END = TYPING_START + RELEASE_NAME.length * CHAR_MS // 1265
const PR_BASE = TYPING_END + 500 // 1765
const PR_STAGGER = 220
const READY_AT = PR_BASE + 5 * PR_STAGGER + 500 // 3365
const CLICK_AT = READY_AT + 1500 // 4865
const SLACK_AT = CLICK_AT + 500 // 5365
const APPROVE_AT = SLACK_AT + 1800 // 7165
const DEPLOY_AT = APPROVE_AT + 700 // 7865

const DEPLOY_SEQ = [
  { id: 'auth', runAt: 200, doneAt: 1600 },
  { id: 'api', runAt: 1700, doneAt: 3000 },
  { id: 'web', runAt: 3100, doneAt: 4100 },
  { id: 'payments', runAt: 4200, doneAt: 5700 },
  { id: 'analytics', runAt: 4300, doneAt: 5800 },
  { id: 'notifs', runAt: 5900, doneAt: 7300 },
]

const ALL_DONE_AT = DEPLOY_AT + 7300 + 500 // 15665
const RESET_AT = ALL_DONE_AT + 4000 // 19665

// ─── Initial state ────────────────────────────────────────────────────────────

const INIT_STATUSES: Record<string, PRStatus> = Object.fromEntries(
  PRS.map((p) => [p.id, 'queued' as PRStatus]),
)

// ─── CSS ──────────────────────────────────────────────────────────────────────

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <span
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: 8,
        height: 8,
        borderRadius: '50%',
        border: '1px solid var(--color-signal-warning)',
        borderTopColor: 'transparent',
        animation: 'spinRing 0.9s linear infinite',
      }}
    />
  )
}

// ─── PR row ───────────────────────────────────────────────────────────────────

const PR_CFG: Record<PRStatus, { label: string; text: string; dot: string; bg: string }> = {
  queued: {
    label: 'Queued',
    text: 'var(--color-ink-tertiary)',
    dot: 'var(--color-ink-quaternary)',
    bg: 'transparent',
  },
  running: {
    label: 'Running',
    text: 'var(--color-signal-warning-text)',
    dot: 'var(--color-signal-warning)',
    bg: 'rgba(234,179,8,0.025)',
  },
  deployed: {
    label: 'Live',
    text: 'var(--color-signal-success-text)',
    dot: 'var(--color-signal-success)',
    bg: 'transparent',
  },
}

function PRRow({ pr, status, visible }: { pr: PRDef; status: PRStatus; visible: boolean }) {
  const c = PR_CFG[status]
  return (
    <div
      className="border-line border-b last:border-b-0"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 12,
        padding: '9px 16px',
        backgroundColor: c.bg,
        transition: 'background-color 0.4s',
        opacity: visible ? 1 : 0,
        animation: visible ? 'rowSlideIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: 9,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-quaternary)',
            marginBottom: 2,
          }}
        >
          {pr.service}
        </p>
        <p
          style={{
            fontSize: 11,
            lineHeight: 1.3,
            color: 'var(--color-ink-secondary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {pr.prTitle}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 8,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-quaternary)',
          }}
        >
          {pr.trigger === 'jenkins' ? 'Jenkins' : 'CI'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {status === 'running' ? (
            <Spinner />
          ) : (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: c.dot,
                flexShrink: 0,
                transition: 'background-color 0.4s',
              }}
            />
          )}
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 8,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: c.text,
              transition: 'color 0.4s',
            }}
          >
            {c.label}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Slack panel ──────────────────────────────────────────────────────────────

function SlackPanel({
  visible,
  approved,
  releaseNote,
}: {
  visible: boolean
  approved: boolean
  releaseNote: boolean
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-line)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Channel strip */}
      <div
        className="bg-surface-alt/50"
        style={{
          borderBottom: '1px solid var(--color-line)',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            color: 'var(--color-ink-quaternary)',
            fontWeight: 600,
          }}
        >
          #
        </span>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: 'var(--color-ink-tertiary)',
            letterSpacing: '0.06em',
          }}
        >
          releases
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'monospace',
            fontSize: 8,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-quaternary)',
          }}
        >
          Slack
        </span>
      </div>

      {/* Approval request - always rendered; panel slide-in is the entrance animation */}
      <div
          style={{
            padding: '10px 14px 12px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          {/* Bot avatar */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              flexShrink: 0,
              backgroundColor: 'rgb(var(--color-primary-rgb) / 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 8.5,
                fontWeight: 700,
                color: 'var(--color-primary-accessible)',
              }}
            >
              DT
            </span>
          </div>

          {/* Message body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                }}
              >
                DeployTitan
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 7,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-quaternary)',
                  border: '1px solid var(--color-line)',
                  padding: '1px 4px',
                  borderRadius: 2,
                }}
              >
                APP
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'var(--color-ink-quaternary)',
                }}
              >
                just now
              </span>
            </div>

            {/* Attachment block */}
            <div
              style={{
                borderLeft: `2px solid ${approved ? 'var(--color-signal-success)' : 'var(--color-primary)'}`,
                paddingLeft: 10,
                transition: 'border-color 0.5s',
              }}
            >
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  lineHeight: 1.4,
                  marginBottom: 3,
                }}
              >
                sprint-22 is ready for your approval
              </p>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  color: 'var(--color-ink-tertiary)',
                  marginBottom: 8,
                }}
              >
                6 PRs queued · auth · api · web · payments · analytics · notifs
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 6 }}>
                {approved ? (
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 8.5,
                      padding: '3px 9px',
                      borderRadius: 3,
                      border: '1px solid var(--color-signal-success)',
                      backgroundColor: 'rgb(var(--color-signal-success-rgb) / 0.1)',
                      color: 'var(--color-signal-success-text)',
                    }}
                  >
                    ✓ Approved
                  </span>
                ) : (
                  <>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 8.5,
                        padding: '3px 9px',
                        borderRadius: 3,
                        border: '1px solid rgb(var(--color-primary-rgb) / 0.35)',
                        backgroundColor: 'rgb(var(--color-primary-rgb) / 0.1)',
                        color: 'var(--color-primary-accessible)',
                        cursor: 'default',
                      }}
                    >
                      ✓ Approve release
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 8.5,
                        padding: '3px 9px',
                        borderRadius: 3,
                        border: '1px solid var(--color-line)',
                        color: 'var(--color-ink-tertiary)',
                        cursor: 'default',
                      }}
                    >
                      Hold
                    </span>
                  </>
                )}
              </div>

              {approved && (
                <p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 8,
                    color: 'var(--color-ink-quaternary)',
                    marginTop: 5,
                  }}
                >
                  Approved via Slack · deployments triggered
                </p>
              )}
            </div>
          </div>
        </div>

      {/* Release note */}
      {releaseNote && (
        <div
          style={{
            padding: '10px 14px 12px',
            borderTop: '1px solid var(--color-line)',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            animation: 'msgFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              flexShrink: 0,
              backgroundColor: 'rgb(var(--color-signal-success-rgb) / 0.13)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--color-signal-success)' }}>✓</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                }}
              >
                DeployTitan
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 7,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-quaternary)',
                  border: '1px solid var(--color-line)',
                  padding: '1px 4px',
                  borderRadius: 2,
                }}
              >
                APP
              </span>
            </div>
            <div
              style={{
                borderLeft: '2px solid var(--color-signal-success)',
                paddingLeft: 10,
              }}
            >
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  marginBottom: 3,
                  color: 'var(--color-signal-success-text)',
                }}
              >
                sprint-22 shipped successfully
              </p>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  color: 'var(--color-ink-tertiary)',
                  marginBottom: 3,
                }}
              >
                6/6 services live · all health checks passing
              </p>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'var(--color-ink-quaternary)',
                }}
              >
                auth · api · web · payments · analytics · notifs
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const ref = useScrollReveal()

  const [typedChars, setTypedChars] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [showSlack, setShowSlack] = useState(false)
  const [slackApproved, setSlackApproved] = useState(false)
  const [prStates, setPRStates] = useState<Record<string, PRStatus>>({ ...INIT_STATUSES })
  const [showReleaseNote, setShowReleaseNote] = useState(false)

  const hasRunning = Object.values(prStates).some((s) => s === 'running')
  const allDeployed = PRS.every((p) => prStates[p.id] === 'deployed')

  const headerStatus = allDeployed
    ? 'deployed'
    : hasRunning
      ? 'deploying'
      : slackApproved
        ? 'approved'
        : showSlack
          ? 'awaiting'
          : isReady
            ? 'ready'
            : 'pending'

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setTypedChars(RELEASE_NAME.length)
      setVisibleCount(PRS.length)
      setIsReady(true)
      setShowSlack(true)
      setSlackApproved(true)
      setPRStates(Object.fromEntries(PRS.map((p) => [p.id, 'deployed' as PRStatus])))
      setShowReleaseNote(true)
      return
    }

    const el = ref.current
    if (!el) return

    const timers: ReturnType<typeof setTimeout>[] = []
    const clearTimers = () => { timers.forEach(clearTimeout); timers.length = 0 }
    const push = (fn: () => void, delay: number) => { timers.push(setTimeout(fn, delay)) }

    const reset = () => {
      setTypedChars(0)
      setVisibleCount(0)
      setIsReady(false)
      setIsClicking(false)
      setShowSlack(false)
      setSlackApproved(false)
      setPRStates({ ...INIT_STATUSES })
      setShowReleaseNote(false)
    }

    const run = () => {
      clearTimers()
      reset()

      for (let i = 1; i <= RELEASE_NAME.length; i++) {
        push(() => setTypedChars(i), TYPING_START + i * CHAR_MS)
      }
      for (let i = 0; i < PRS.length; i++) {
        push(() => setVisibleCount(i + 1), PR_BASE + i * PR_STAGGER)
      }
      push(() => setIsReady(true), READY_AT)
      push(() => setIsClicking(true), CLICK_AT)
      push(() => setIsClicking(false), CLICK_AT + 350)
      push(() => setShowSlack(true), SLACK_AT)
      push(() => setSlackApproved(true), APPROVE_AT)
      for (const { id, runAt, doneAt } of DEPLOY_SEQ) {
        push(() => setPRStates((prev) => ({ ...prev, [id]: 'running' })), DEPLOY_AT + runAt)
        push(() => setPRStates((prev) => ({ ...prev, [id]: 'deployed' })), DEPLOY_AT + doneAt)
      }
      push(() => setShowReleaseNote(true), ALL_DONE_AT)
      push(run, RESET_AT)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
        } else {
          clearTimers()
          reset()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [])

  const displayName = RELEASE_NAME.slice(0, typedChars)
  const showCursor = typedChars < RELEASE_NAME.length

  return (
    <section
      ref={ref}
      className="border-line relative overflow-hidden border-b pt-28 pb-20 lg:pt-34 lg:pb-28"
    >
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--color-primary-rgb) / 0.08) 0%, rgb(var(--color-primary-rgb) / 0.02) 42%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1560px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(520px,0.98fr)] lg:items-start lg:gap-12">
          {/* Left: copy */}
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
              The sprint should
              <br />
              <span className="text-ink-secondary">end before dinner.</span>
            </h1>
            <p
              data-reveal
              data-reveal-delay="2"
              className="text-ink-secondary mt-7 max-w-[48ch] text-[1.0625rem] leading-[1.65] lg:text-lg"
            >
              Add your sprint PRs, click start, and walk away. DeployTitan watches every job,
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

          {/* Right: demo panel */}
          <div data-reveal data-reveal-delay="3">
            <div
              className="border-line bg-surface relative overflow-hidden border"
              style={{ borderRadius: '2px' }}
            >
              {/* Panel header */}
              <div className="border-line bg-surface-alt/70 flex items-center justify-between border-b px-5 py-3">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                    {/* Release name with typing cursor */}
                    <p
                      className="text-ink font-mono text-[11px]"
                      style={{ display: 'flex', alignItems: 'center', minHeight: 16 }}
                    >
                      {displayName || (
                        <span style={{ color: 'var(--color-ink-quaternary)' }}>new-release</span>
                      )}
                      {showCursor && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 1.5,
                            height: 12,
                            backgroundColor: 'var(--color-ink)',
                            marginLeft: displayName ? 1 : 0,
                            verticalAlign: 'middle',
                            animation: 'cursorBlink 0.7s step-end infinite',
                          }}
                        />
                      )}
                    </p>
                  </div>
                </div>

                {/* Status badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {headerStatus === 'deploying' && (
                    <>
                      <Spinner />
                      <span className="text-signal-warning-text dark:text-signal-warning font-mono text-[10px] tracking-[0.08em] uppercase">
                        Deploying
                      </span>
                    </>
                  )}
                  {headerStatus === 'deployed' && (
                    <>
                      <span
                        className="bg-signal-success h-1.5 w-1.5"
                        style={{ borderRadius: '50%' }}
                      />
                      <span className="text-signal-success-text dark:text-signal-success font-mono text-[10px] tracking-[0.08em] uppercase">
                        Deployed
                      </span>
                    </>
                  )}
                  {headerStatus === 'awaiting' && (
                    <>
                      <span
                        className="bg-primary h-1.5 w-1.5"
                        style={{ borderRadius: '50%' }}
                      />
                      <span className="text-primary-accessible font-mono text-[10px] tracking-[0.08em] uppercase">
                        Awaiting approval
                      </span>
                    </>
                  )}
                  {headerStatus === 'approved' && (
                    <>
                      <span
                        className="bg-signal-success h-1.5 w-1.5"
                        style={{ borderRadius: '50%' }}
                      />
                      <span className="text-signal-success-text dark:text-signal-success font-mono text-[10px] tracking-[0.08em] uppercase">
                        Approved
                      </span>
                    </>
                  )}
                  {(headerStatus === 'pending' || headerStatus === 'ready') && (
                    <span className="text-ink-tertiary font-mono text-[10px] tracking-[0.08em] uppercase">
                      {headerStatus === 'ready' ? 'Ready' : 'Pending'}
                    </span>
                  )}
                </div>
              </div>

              {/* Column headers */}
              <div
                className="border-line bg-surface-alt/40 grid border-b px-4 py-2"
                style={{ gridTemplateColumns: '1fr auto' }}
              >
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.14em] uppercase">
                  Service · PR
                </p>
                <p className="text-ink-tertiary font-mono text-[9px] tracking-[0.14em] uppercase">
                  Status
                </p>
              </div>

              {/* PR rows */}
              <div>
                {PRS.map((pr, i) => (
                  <PRRow
                    key={pr.id}
                    pr={pr}
                    status={prStates[pr.id] ?? 'queued'}
                    visible={i < visibleCount}
                  />
                ))}
              </div>

              {/* Footer with action button */}
              <div
                className="border-line bg-surface-alt/40 border-t"
                style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p className="text-ink-quaternary font-mono text-[9px] tracking-[0.1em] uppercase">
                  {visibleCount} PR{visibleCount !== 1 ? 's' : ''} · 4 services
                </p>

                {/* Action button */}
                <button
                  disabled
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 9,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 4,
                    border:
                      isReady && !showSlack
                        ? '1px solid rgb(var(--color-primary-rgb) / 0.5)'
                        : '1px solid var(--color-line)',
                    backgroundColor:
                      isReady && !showSlack ? 'rgb(var(--color-primary-rgb) / 0.12)' : 'transparent',
                    color:
                      isReady && !showSlack
                        ? 'var(--color-primary-accessible)'
                        : 'var(--color-ink-quaternary)',
                    cursor: 'default',
                    opacity: visibleCount >= PRS.length ? 1 : 0,
                    transition: 'opacity 0.3s, background-color 0.3s, border-color 0.3s, color 0.3s',
                    animation: isClicking ? 'btnPress 0.35s cubic-bezier(0.22,1,0.36,1)' : 'none',
                  }}
                >
                  {showSlack ? '✓ Sent to Slack' : 'Looks good →'}
                </button>
              </div>

              {/* Slack section */}
              <SlackPanel
                visible={showSlack}
                approved={slackApproved}
                releaseNote={showReleaseNote}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
