'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import posthog from 'posthog-js'
import { APP_URL } from '@/lib/env'
import { CodeBlock } from '../../components/shared/CodeBlock'
import { CATEGORY_LABELS, integrations } from '../../data/integrations'
import { Section } from '../../components/shared/Section'
import { Container } from '../../components/shared/Container'
import { Card } from '../../components/shared/Card'
import { Breadcrumbs } from '../../components/shared/Breadcrumbs'

export default function IntegrationDetail() {
  const params = useParams()
  const slug = params?.slug as string | undefined
  const integration = integrations.find((i) => i.slug === slug)

  if (!integration) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display text-3xl font-medium text-ink mb-4">Integration not found</h1>
        <Link
          href="/integrations"
          className="text-sm text-primary-accessible hover:text-primary transition-colors"
        >
          ← Back to integrations
        </Link>
      </div>
    )
  }

  const related = integrations
    .filter(
      (i) =>
        i.slug !== integration.slug && i.products.some((p) => integration.products.includes(p)),
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb + hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-12 lg:py-16">
          <div className="mb-4">
            <Breadcrumbs />
          </div>

          <div className="flex items-start gap-6">
            <div
              className="w-14 h-14 flex items-center justify-center text-white text-sm font-mono font-bold shrink-0"
              style={{ backgroundColor: integration.logoColor, borderRadius: '2px' }}
            >
              {integration.logoText}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-ink">
                  {integration.name}
                </h1>
                <span
                  className="font-mono text-[10px] border border-line text-ink-tertiary px-2 py-0.5"
                  style={{ borderRadius: '2px' }}
                >
                  {CATEGORY_LABELS[integration.category]}
                </span>
              </div>
              <p className="text-base text-ink-secondary leading-relaxed max-w-xl">
                {integration.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main content */}
      <Container as="section" className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: overview + setup */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Card tone="muted">
              <h2 className="text-lg font-medium text-ink mb-3">Overview</h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {integration.longDescription}
              </p>
            </Card>

            {integration.setupSnippet && (
              <div>
                <h2 className="text-lg font-medium text-ink mb-3">Setup</h2>
                <CodeBlock
                  code={integration.setupSnippet}
                  lang={integration.setupLang ?? 'yaml'}
                  filename={
                    integration.setupLang === 'bash'
                      ? 'terminal'
                      : integration.setupLang === 'hcl'
                        ? 'main.tf'
                        : 'dt.yaml'
                  }
                />
              </div>
            )}

            <Card tone="muted">
              <h2 className="text-base font-medium text-ink mb-4">How it works</h2>
              <ol className="flex flex-col gap-4">
                {[
                  `Connect ${integration.name} to your DeployTitan workspace via the Integrations settings page.`,
                  'Configure the integration in your `dt.yaml` deployment policy file.',
                  `DeployTitan reads live signal from ${integration.name} during canary windows to make automatic promotion or rollback decisions.`,
                  'View integration health and event history in the DeployTitan dashboard.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 flex items-center justify-center font-mono text-[10px] text-primary border border-primary/30 shrink-0"
                      style={{ borderRadius: '2px' }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-ink-secondary leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          {/* Right: sidebar */}
          <div className="flex flex-col gap-5">
            {/* Products */}
            <Card tone="muted" padding="sm">
              <h3 className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest mb-3">
                Works with
              </h3>
              <div className="flex flex-col gap-2">
                {integration.products.map((p) => (
                  <span key={p} className="text-sm text-ink-secondary">
                    {p}
                  </span>
                ))}
              </div>
            </Card>

            {/* Status */}
            <Card tone="muted" padding="sm">
              <h3 className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest mb-3">
                Status
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-[2px] ${
                    integration.status === 'ga'
                      ? 'bg-signal-success'
                      : integration.status === 'beta'
                        ? 'bg-signal-warning'
                        : 'bg-ink-quaternary'
                  }`}
                />
                <span className="text-sm text-ink-secondary capitalize">
                  {integration.status.replace('-', ' ')}
                </span>
              </div>
            </Card>

            {/* CTA */}
            <Card tone="muted" padding="sm" className="flex flex-col gap-3">
              <Link
                href={`${APP_URL}/signup`}
                className="w-full inline-flex items-center justify-center bg-ink text-surface dark:text-surface px-4 py-2.5 text-sm font-medium hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] transition-all"
                style={{ borderRadius: '2px' }}
                onClick={() => posthog.capture('integration_trial_cta_clicked', { integration_name: integration.name, integration_slug: integration.slug })}
              >
                Start free trial
              </Link>
              <Link
                href="/docs"
                className="w-full inline-flex items-center justify-center border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-4 py-2.5 text-sm font-medium transition-all"
                style={{ borderRadius: '2px' }}
                onClick={() => posthog.capture('integration_docs_clicked', { integration_name: integration.name, integration_slug: integration.slug })}
              >
                View docs
              </Link>
            </Card>
          </div>
        </div>
      </Container>

      {/* Related integrations */}
      {related.length > 0 && (
        <Section border="top" tone="muted" padding="none">
          <Container className="py-12">
            <h2 className="text-lg font-medium text-ink mb-6">Related integrations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/integrations/${r.slug}`}
                  className="sharp-card p-5 bg-surface group block hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center text-white text-[9px] font-mono font-bold"
                      style={{ backgroundColor: r.logoColor, borderRadius: '2px' }}
                    >
                      {r.logoText}
                    </div>
                    <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                      {r.name}
                    </span>
                  </div>
                  <p className="text-xs text-ink-tertiary line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      
    </div>
  )
}
