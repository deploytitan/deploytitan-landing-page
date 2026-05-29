'use client'

import { useState } from 'react'
import Link from 'next/link'
import { integrations, CATEGORY_LABELS, type IntegrationCategory } from '../data/integrations'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'

const ALL = 'all'
type Filter = IntegrationCategory | typeof ALL

const STATUS_LABELS = {
  ga: 'GA',
  beta: 'Beta',
  'coming-soon': 'Soon',
}
const STATUS_COLORS = {
  ga: 'text-signal-success-text dark:text-signal-success border-signal-success/30',
  beta: 'text-signal-warning-text dark:text-signal-warning border-signal-warning/30',
  'coming-soon': 'text-ink-tertiary border-line',
}

export default function Integrations() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const [search, setSearch] = useState('')

  const categories = [ALL, ...Object.keys(CATEGORY_LABELS)] as Filter[]

  const visible = integrations.filter((i) => {
    if (filter !== ALL && i.category !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-widest">
              Integrations
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Plugs into your
              <br />
              entire stack
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              DeployTitan works with the tools you already use — from your CI pipeline and cloud
              provider to your observability stack and incident management platform.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filter bar */}
      <Section border="bottom" tone="muted" padding="none" className="sticky top-[80px] z-30">
        <Container className="py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                  filter === cat
                    ? 'bg-ink text-surface border-ink'
                    : 'border-line text-ink-secondary hover:text-ink hover:border-primary/30'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {cat === ALL ? 'All' : CATEGORY_LABELS[cat as IntegrationCategory]}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono bg-surface border border-line text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-primary/40 transition-colors w-40"
              style={{ borderRadius: '2px' }}
            />
          </div>
        </Container>
      </Section>

      {/* Grid */}
      <Container as="section" className="py-12">
        {visible.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-secondary font-mono text-sm">
              No integrations match your filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visible.map((integration) => (
              <Link
                key={integration.slug}
                href={`/integrations/${integration.slug}`}
                className="sharp-card spotlight-card bg-surface-alt p-5 group block hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white text-xs font-mono font-bold shrink-0"
                    style={{ backgroundColor: integration.logoColor, borderRadius: '2px' }}
                  >
                    {integration.logoText}
                  </div>
                  <span
                    className={`font-mono text-[9px] border px-1.5 py-0.5 ${STATUS_COLORS[integration.status]}`}
                    style={{ borderRadius: '2px' }}
                  >
                    {STATUS_LABELS[integration.status]}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                  {integration.name}
                </h3>
                <p className="mt-1 text-xs text-ink-tertiary leading-relaxed line-clamp-2">
                  {integration.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {integration.products.map((p) => (
                    <span
                      key={p}
                      className="font-mono text-[9px] text-ink-tertiary border border-line px-1.5 py-0.5"
                      style={{ borderRadius: '2px' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>

      {/* Missing integration */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-medium text-ink">Don't see your stack?</h3>
            <p className="mt-1 text-sm text-ink-secondary">
              We ship new integrations every sprint. Request one or build your own with the REST
              API.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://github.com/deploytitan/integrations/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-4 py-2.5 text-sm font-medium transition-all"
              style={{ borderRadius: '2px' }}
            >
              Request integration
            </a>
            <Link
              href="/api-reference"
              className="inline-flex items-center gap-2 bg-ink text-surface px-4 py-2.5 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
              style={{ borderRadius: '2px' }}
            >
              Explore the API
            </Link>
          </div>
        </Container>
      </Section>

      {/* Filter bar */}
      <section className="border-b border-line bg-surface-alt sticky top-[80px] z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                  filter === cat
                    ? 'bg-ink text-surface border-ink'
                    : 'border-line text-ink-secondary hover:text-ink hover:border-primary/30'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {cat === ALL ? 'All' : CATEGORY_LABELS[cat as IntegrationCategory]}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono bg-surface border border-line text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-primary/40 transition-colors w-40"
              style={{ borderRadius: '2px' }}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {visible.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-secondary font-mono text-sm">
              No integrations match your filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visible.map((integration) => (
              <Link
                key={integration.slug}
                href={`/integrations/${integration.slug}`}
                className="sharp-card spotlight-card bg-surface-alt p-5 group block hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white text-xs font-mono font-bold shrink-0"
                    style={{ backgroundColor: integration.logoColor, borderRadius: '2px' }}
                  >
                    {integration.logoText}
                  </div>
                  <span
                    className={`font-mono text-[9px] border px-1.5 py-0.5 ${STATUS_COLORS[integration.status]}`}
                    style={{ borderRadius: '2px' }}
                  >
                    {STATUS_LABELS[integration.status]}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                  {integration.name}
                </h3>
                <p className="mt-1 text-xs text-ink-tertiary leading-relaxed line-clamp-2">
                  {integration.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {integration.products.map((p) => (
                    <span
                      key={p}
                      className="font-mono text-[9px] text-ink-tertiary border border-line px-1.5 py-0.5"
                      style={{ borderRadius: '2px' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Missing integration */}
      <section className="border-t border-line bg-surface-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-medium text-ink">Don't see your stack?</h3>
            <p className="mt-1 text-sm text-ink-secondary">
              We ship new integrations every sprint. Request one or build your own with the REST
              API.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://github.com/deploytitan/integrations/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-4 py-2.5 text-sm font-medium transition-all"
              style={{ borderRadius: '2px' }}
            >
              Request integration
            </a>
            <Link
              href="/api-reference"
              className="inline-flex items-center gap-2 bg-ink text-surface px-4 py-2.5 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
              style={{ borderRadius: '2px' }}
            >
              Explore the API
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  )
}
