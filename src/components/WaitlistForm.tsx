'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FORM_ENDPOINT } from '@/lib/env'
import { identifyUser, trackEvent } from '@/lib/analytics'
import { Button } from './shared/Button'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type WaitlistFormProps = {
  source?: string
  successMessage?: string
  className?: string
}

export function WaitlistForm({
  source = 'waitlist-page',
  successMessage = "We'll be in touch when early access opens.",
  className,
}: WaitlistFormProps) {
  const pathname = usePathname()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [painLevel, setPainLevel] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [currentProcess, setCurrentProcess] = useState('')
  const [notes, setNotes] = useState('')
  const [showOptional, setShowOptional] = useState(false)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!FORM_ENDPOINT) return

    setState('loading')

    try {
      const referrer = typeof document !== 'undefined' ? document.referrer : ''
      const pageUrl = typeof window !== 'undefined' ? window.location.href : pathname
      const currentSearchParams =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams()
      const payload = {
        name,
        email,
        company,
        role,
        team_size: teamSize,
        pain_level: painLevel,
        budget_range: budgetRange,
        current_process: currentProcess,
        notes,
        sheet: 'waitlist',
        source,
        page_path: pathname,
        page_url: pageUrl,
        referrer,
        utm_source: currentSearchParams.get('utm_source') ?? '',
        utm_medium: currentSearchParams.get('utm_medium') ?? '',
        utm_campaign: currentSearchParams.get('utm_campaign') ?? '',
        utm_term: currentSearchParams.get('utm_term') ?? '',
        utm_content: currentSearchParams.get('utm_content') ?? '',
      }
      identifyUser(email, {
        name,
        email,
        company,
        role,
        team_size: teamSize,
        pain_level: painLevel,
        budget_range: budgetRange,
        latest_waitlist_source: source,
      })
      trackEvent('waitlist_joined', payload)
      window.gtag?.('event', 'sign_up', {
        method: 'waitlist_form',
        source,
        page_path: pathname,
        pain_level: painLevel,
        budget_range: budgetRange,
      })

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('waitlist-submit-failed')
      }

      setState('success')
    } catch {
      setState('error')
    }
  }

  if (!FORM_ENDPOINT) {
    return (
      <div className="border-line bg-surface-alt/50 rounded-[2px] border px-4 py-4">
        <p className="text-ink text-sm font-medium">Waitlist intake is not wired up yet.</p>
        <p className="text-ink-secondary mt-2 text-sm leading-relaxed">
          Email{' '}
          <a
            className="text-primary-accessible hover:underline"
            href="mailto:hello@deploytitan.com"
          >
            hello@deploytitan.com
          </a>{' '}
          and we&apos;ll add you manually.
        </p>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="success-reveal border-line bg-surface-alt/60 rounded-[2px] border px-5 py-5">
        <p className="text-ink font-medium">You&apos;re on the list.</p>
        <p className="text-ink-secondary mt-2 text-sm leading-7">{successMessage}</p>
      </div>
    )
  }

  return (
    <form
      action={FORM_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
      className={className ?? 'flex w-full flex-col gap-4'}
    >
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        value=""
        onChange={() => {}}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`waitlist-name-${source}`}
            className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
          >
            Name
          </label>
          <input
            id={`waitlist-name-${source}`}
            name="name"
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-line bg-surface text-ink placeholder:text-ink-quaternary focus:border-primary/40 min-w-0 flex-1 border px-3 py-2 text-sm transition-colors focus:outline-none sm:py-2.5"
            style={{ borderRadius: '2px' }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`waitlist-email-${source}`}
            className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
          >
            Work email
          </label>
          <input
            id={`waitlist-email-${source}`}
            name="email"
            type="email"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-line bg-surface text-ink placeholder:text-ink-quaternary focus:border-primary/40 min-w-0 flex-1 border px-3 py-2 text-sm transition-colors focus:outline-none sm:py-2.5"
            style={{ borderRadius: '2px' }}
          />
        </div>
      </div>

      <div className="">
        <button
          type="button"
          aria-expanded={showOptional}
          onClick={() => setShowOptional((value) => !value)}
          className="group flex w-full items-center justify-between gap-4 text-left"
        >
          <span>
            <span className="text-ink block text-sm font-medium">I want to join ASAP</span>
            <span className="text-ink-secondary block text-sm leading-6">
              Answer a few more questions.
            </span>
          </span>
          <span
            className="border-line text-primary-accessible group-hover:border-primary/40 group-hover:text-primary flex h-6 w-6 shrink-0 items-center justify-center border transition-colors"
            style={{ borderRadius: '2px' }}
          >
            <span className="text-lg leading-none">{showOptional ? '-' : '+'}</span>
          </span>
        </button>
      </div>

      {showOptional && (
        <div className="border-line border-t pt-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`waitlist-company-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Company
              </label>
              <input
                id={`waitlist-company-${source}`}
                name="company"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border-line bg-surface text-ink placeholder:text-ink-quaternary focus:border-primary/40 min-w-0 flex-1 border px-3 py-2.5 text-sm transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`waitlist-role-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Role
              </label>
              <input
                id={`waitlist-role-${source}`}
                name="role"
                type="text"
                placeholder="CTO, Platform Engineer, SRE"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border-line bg-surface text-ink placeholder:text-ink-quaternary focus:border-primary/40 min-w-0 flex-1 border px-3 py-2.5 text-sm transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`waitlist-team-size-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Team size
              </label>
              <select
                id={`waitlist-team-size-${source}`}
                name="team_size"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="border-line bg-surface text-ink focus:border-primary/40 min-w-0 flex-1 border px-3 py-2.5 text-sm transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              >
                <option value="">Select team size</option>
                <option value="1-5">1-5 engineers</option>
                <option value="6-20">6-20 engineers</option>
                <option value="21-50">21-50 engineers</option>
                <option value="51-200">51-200 engineers</option>
                <option value="200+">200+ engineers</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`waitlist-pain-level-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Current pain level
              </label>
              <select
                id={`waitlist-pain-level-${source}`}
                name="pain_level"
                value={painLevel}
                onChange={(e) => setPainLevel(e.target.value)}
                className="border-line bg-surface text-ink focus:border-primary/40 min-w-0 flex-1 border px-3 py-2.5 text-sm transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              >
                <option value="">Select pain level</option>
                <option value="1-low">1 - Low</option>
                <option value="2-annoying">2 - Annoying</option>
                <option value="3-frequent">3 - Frequent problem</option>
                <option value="4-critical">4 - Critical issue</option>
                <option value="5-urgent">5 - Urgent / expensive</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                htmlFor={`waitlist-budget-range-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Expected budget
              </label>
              <select
                id={`waitlist-budget-range-${source}`}
                name="budget_range"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="border-line bg-surface text-ink focus:border-primary/40 min-w-0 flex-1 border px-3 py-2.5 text-sm transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              >
                <option value="">Select expected budget</option>
                <option value="<100">$0-$100/mo</option>
                <option value="100-500">$100-$500/mo</option>
                <option value="500-2000">$500-$2,000/mo</option>
                <option value="2000-10000">$2,000-$10,000/mo</option>
                <option value="10000+">$10,000+/mo</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                htmlFor={`waitlist-process-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                What is painful today
              </label>
              <textarea
                id={`waitlist-process-${source}`}
                name="current_process"
                placeholder="What slows release day down?"
                value={currentProcess}
                onChange={(e) => setCurrentProcess(e.target.value)}
                rows={4}
                className="border-line bg-surface text-ink placeholder:text-ink-quaternary focus:border-primary/40 min-h-[96px] w-full border px-3 py-2.5 text-sm leading-6 transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                htmlFor={`waitlist-notes-${source}`}
                className="text-ink-secondary font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Anything else we should know
              </label>
              <textarea
                id={`waitlist-notes-${source}`}
                name="notes"
                placeholder="Stack, deployment frequency, buying timeline, or any constraints."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="border-line bg-surface text-ink placeholder:text-ink-quaternary focus:border-primary/40 min-h-[82px] w-full border px-3 py-2.5 text-sm leading-6 transition-colors focus:outline-none"
                style={{ borderRadius: '2px' }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="border-line flex flex-col gap-3 border-t pt-3 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={state === 'loading'}
          className="shrink-0 rounded-[8px] disabled:opacity-50"
        >
          {state === 'loading' ? 'Submitting...' : 'Request early access'}
        </Button>
      </div>
      {state === 'error' && (
        <p className="text-signal-danger-text dark:text-signal-danger text-sm leading-6">
          Something went wrong. Try again, or email hello@deploytitan.com and we&apos;ll add you
          manually.
        </p>
      )}
    </form>
  )
}
