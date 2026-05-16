'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import { jobs, DEPARTMENT_LABELS, type Department } from '../data/jobs'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const perks = [
  {
    title: 'Competitive equity',
    description:
      'Meaningful early-stage equity. We want you to benefit from the value you help create.',
  },
  {
    title: 'Remote-first',
    description:
      'Work from wherever you do your best thinking. We overlap on Pacific time for core hours.',
  },
  {
    title: 'Home office stipend',
    description: '$1,500 to set up your workspace the way you want it.',
  },
  {
    title: 'Learning budget',
    description: '$1,000/year for books, courses, conferences — no approval required.',
  },
  {
    title: 'Health + dental + vision',
    description: 'Full coverage for you and your dependents. 100% of premiums covered.',
  },
  {
    title: 'Unlimited PTO',
    description: 'With a 15-day minimum. We mean it — time off makes everyone better.',
  },
]

const departments = ['all', ...Array.from(new Set(jobs.map((j) => j.department)))] as const

export default function Careers() {  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.department === filter)

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-widest">
              Careers
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Build the future of deployment.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              We're a small, focused team working on a genuinely hard problem. Every engineer here
              has direct impact on the tooling that ships production software for thousands of
              teams.
            </p>
          </div>
        </Container>
      </Section>

      {/* Perks */}
      <Section border="bottom" tone="muted" padding="none">
        <Container className="py-14">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
            Benefits
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
            What we offer
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((p) => (
              <Card key={p.title}>
                <h3 className="text-sm font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-xs text-ink-secondary leading-relaxed">{p.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open roles */}
      <Container as="section" className="py-14">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
              Open roles
            </span>
            <h2 className="mt-2 text-2xl font-display font-medium text-ink tracking-[-0.02em]">
              {filtered.length} open position{filtered.length !== 1 ? 's' : ''}
            </h2>
          </div>
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                  filter === d
                    ? 'bg-ink text-surface border-ink'
                    : 'bg-surface text-ink-secondary border-line hover:border-primary/30 hover:text-ink'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {d === 'all' ? 'All' : DEPARTMENT_LABELS[d as Department]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-line">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-base font-medium text-ink">{job.title}</h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">
                    {DEPARTMENT_LABELS[job.department]}
                  </span>
                  <span className="text-ink-tertiary text-xs">·</span>
                  <span className="text-xs text-ink-tertiary">{job.location}</span>
                  <span className="text-ink-tertiary text-xs">·</span>
                  <span className="text-xs text-ink-tertiary capitalize">{job.type}</span>
                </div>
                <p className="mt-2 text-sm text-ink-secondary max-w-xl">{job.description}</p>
              </div>
              <a
                href={`mailto:jobs@deploytitan.com?subject=Application: ${encodeURIComponent(job.title)}`}
                className="inline-flex items-center gap-2 shrink-0 px-4 py-2.5 border border-line text-ink-secondary text-sm font-medium hover:border-primary/30 hover:text-ink transition-colors"
                style={{ borderRadius: '2px' }}
                onClick={() => posthog.capture('job_application_clicked', { job_title: job.title, department: job.department, location: job.location, job_type: job.type })}
              >
                Apply
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-line">
          <p className="text-sm text-ink-secondary">
            Don't see a role that fits?{' '}
            <a
              href="mailto:jobs@deploytitan.com"
              className="text-primary font-medium hover:text-primary-dark transition-colors"
            >
              Send us an open application
            </a>{' '}
            — we're always interested in exceptional people.
          </p>
        </div>
      </Container>

      
    </div>
  )
}
