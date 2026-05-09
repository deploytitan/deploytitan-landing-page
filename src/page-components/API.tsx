import Link from 'next/link'
import { CodeBlock } from '../components/shared/CodeBlock'
import { Section } from '../components/shared/Section'
import { Container } from '../components/shared/Container'
import { Card } from '../components/shared/Card'

const endpoints = [
  {
    method: 'POST',
    path: '/v1/deployments',
    description: 'Trigger a new deployment for a service',
    tag: 'Deployments',
  },
  {
    method: 'GET',
    path: '/v1/deployments/:id',
    description: 'Get deployment status and health metrics',
    tag: 'Deployments',
  },
  {
    method: 'POST',
    path: '/v1/deployments/:id/rollback',
    description: 'Instant rollback to the previous stable release',
    tag: 'Deployments',
  },
  {
    method: 'GET',
    path: '/v1/services',
    description: 'List all services in your workspace',
    tag: 'Services',
  },
  {
    method: 'GET',
    path: '/v1/services/:slug/health',
    description: 'Real-time SLO and error-budget health snapshot',
    tag: 'Services',
  },
  {
    method: 'GET',
    path: '/v1/events',
    description: 'Stream deployment events (SSE)',
    tag: 'Events',
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    description: 'Register a webhook endpoint for deployment events',
    tag: 'Webhooks',
  },
]

const methodColors: Record<string, string> = {
  GET: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30',
  POST: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
  DELETE: 'text-red-600 bg-red-50 dark:bg-red-950/30',
  PATCH: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
}

const authCode = `curl -X POST https://api.deploytitan.com/v1/deployments \\
  -H "Authorization: Bearer dt_live_YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "api-gateway",
    "environment": "production",
    "strategy": "canary",
    "image": "ghcr.io/acme/api-gateway:v2.1.0"
  }'`

const responseCode = `{
  "id": "dep_01J7XZ9R3T6QMVN8KCWF4PYDE",
  "service": "api-gateway",
  "environment": "production",
  "strategy": "canary",
  "status": "in_progress",
  "created_at": "2026-04-30T10:22:11Z",
  "steps": [
    { "name": "preflight", "status": "success" },
    { "name": "canary_10pct", "status": "in_progress" },
    { "name": "canary_50pct", "status": "pending" },
    { "name": "full_rollout", "status": "pending" }
  ]
}`

const webhookCode = `// Payload delivered to your endpoint on deployment events
{
  "event": "deployment.completed",
  "deployment_id": "dep_01J7XZ9R3T6QMVN8KCWF4PYDE",
  "service": "api-gateway",
  "environment": "production",
  "status": "success",
  "duration_ms": 142500,
  "timestamp": "2026-04-30T10:24:33Z"
}`

export default function API() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <Section border="bottom" padding="none" className="blueprint-grid">
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-ink-quaternary uppercase tracking-widest">
              API Reference
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink leading-[1.1]">
              Build on DeployTitan.
            </h1>
            <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-lg">
              A REST API with consistent JSON payloads, bearer token auth, and Server-Sent Events
              for real-time deployment streaming. Build internal tooling, custom dashboards, or
              integrate with any orchestration system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#endpoints"
                className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-3 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
                style={{ borderRadius: '2px' }}
              >
                Browse endpoints
                <svg
                  width="12"
                  height="12"
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
              <Link
                href="/cli"
                className="inline-flex items-center gap-2 border border-line text-ink-secondary hover:text-ink hover:border-primary/30 px-5 py-3 text-sm font-medium transition-all"
                style={{ borderRadius: '2px' }}
              >
                CLI Reference
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Auth */}
      <Container as="section" className="py-14">
        <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
          Authentication
        </span>
        <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
          Bearer token auth
        </h2>
        <p className="mt-2 text-sm text-ink-secondary max-w-lg">
          All API requests require an{' '}
          <code className="font-mono text-xs text-primary bg-primary-muted px-1 py-0.5 rounded-sm">
            Authorization: Bearer
          </code>{' '}
          header. Generate tokens from your workspace settings. Tokens are scoped — you can restrict
          them to read-only, deploy-only, or admin.
        </p>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div>
            <p className="font-mono text-xs text-ink-quaternary uppercase tracking-widest mb-3">
              Request
            </p>
            <CodeBlock code={authCode} lang="bash" filename="POST /v1/deployments" />
          </div>
          <div>
            <p className="font-mono text-xs text-ink-quaternary uppercase tracking-widest mb-3">
              Response
            </p>
            <CodeBlock code={responseCode} lang="json" filename="200 OK" />
          </div>
        </div>
      </Container>

      {/* Endpoints */}
      <Section id="endpoints" border="top" tone="muted" padding="none">
        <Container className="py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Endpoints
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
            REST endpoints
          </h2>
          <div className="mt-8 flex flex-col divide-y divide-line">
            {endpoints.map((e) => (
              <div key={e.path} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 font-mono text-[11px] font-bold shrink-0 rounded-sm ${methodColors[e.method] ?? ''}`}
                >
                  {e.method}
                </span>
                <code className="font-mono text-sm text-ink shrink-0">{e.path}</code>
                <span className="text-sm text-ink-secondary">{e.description}</span>
                <span className="ml-auto font-mono text-[10px] text-ink-quaternary uppercase tracking-widest shrink-0">
                  {e.tag}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Webhooks */}
      <Section border="top" padding="none">
        <Container className="py-14">
          <span className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
            Webhooks
          </span>
          <h2 className="mt-3 text-2xl font-display font-medium text-ink tracking-tight">
            Real-time events
          </h2>
          <p className="mt-2 text-sm text-ink-secondary max-w-lg">
            Register a webhook URL and DeployTitan will POST signed JSON payloads to your endpoint
            on every deployment lifecycle event — started, completed, failed, or rolled back.
          </p>
          <div className="mt-6 max-w-2xl">
            <CodeBlock code={webhookCode} lang="json" filename="Webhook payload" />
          </div>
        </Container>
      </Section>

      {/* Rate limits / base URL info */}
      <Section border="top" tone="muted" padding="none">
        <Container className="py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: 'Base URL', value: 'https://api.deploytitan.com', mono: true },
              { label: 'Rate limit', value: '2 000 req / min', mono: false },
              { label: 'API version', value: 'v1 (stable)', mono: false },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
                  {stat.label}
                </p>
                <p
                  className={`mt-2 text-base text-ink font-medium ${stat.mono ? 'font-mono text-sm' : ''}`}
                >
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      
    </div>
  )
}
