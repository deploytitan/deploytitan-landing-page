import type { ReactNode } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollReveal, cn } from '../utils'

/* ========== Constants ========== */

const GOLD = '#c9a84c'
const GOLD_RGBA = 'rgba(201,168,76'

/* ========== Integration icons (inline SVGs) ========== */

function SlackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="13" y="2" width="3" height="8" rx="1.5" /><rect x="8" y="14" width="3" height="8" rx="1.5" />
      <rect x="2" y="8" width="8" height="3" rx="1.5" /><rect x="14" y="13" width="8" height="3" rx="1.5" />
    </svg>
  )
}

function JiraIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
    </svg>
  )
}

function PagerDutyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function DatadogIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function K8sIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" />
      <path d="M12 22V12" /><path d="M2 7l10 5" /><path d="M22 7l-10 5" />
    </svg>
  )
}

function ShieldIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}

/* ========== Types ========== */

interface TimelineStep {
  time: string
  title: string
  description: string
  type: 'trigger' | 'detect' | 'analyze' | 'integrate' | 'action' | 'resolve'
  integrations?: { name: string; icon: ReactNode; action: string }[]
  /** Mini metrics shown alongside this step */
  metrics?: { label: string; value: string; trend: 'up' | 'down' | 'stable'; color: string }[]
}

interface ScenarioDetail {
  id: string
  title: string
  subtitle: string
  category: string
  categoryColor: string
  /** Affected service mini-graph nodes */
  affectedGraph: { id: string; label: string; status: 'healthy' | 'affected' | 'cascade' | 'recovered' }[]
  timeline: TimelineStep[]
  /** Summary outcome */
  outcome: { mttr: string; impactReduction: string; servicesProtected: number }
}

/* ========== Scenario Data ========== */

const scenarioDetails: ScenarioDetail[] = [
  {
    id: 'schema-break',
    title: 'Schema Breaking Change',
    subtitle: 'Payment API v2.1.0 introduces breaking DB schema that cascades to order and notification services',
    category: 'Code Deploy',
    categoryColor: '#3b82f6',
    affectedGraph: [
      { id: 'gateway', label: 'Gateway', status: 'healthy' },
      { id: 'payment', label: 'Payment API', status: 'affected' },
      { id: 'orders', label: 'Orders', status: 'cascade' },
      { id: 'notify', label: 'Notifications', status: 'cascade' },
      { id: 'analytics', label: 'Analytics', status: 'cascade' },
      { id: 'auth', label: 'Auth', status: 'healthy' },
    ],
    timeline: [
      {
        time: 'T+0s',
        title: 'PR merged & deployment triggered',
        description: 'PR #1842 merges payment-api v2.1.0 with a DB schema migration that removes legacy_id column used by 3 downstream services.',
        type: 'trigger',
        integrations: [
          { name: 'GitHub', icon: <GithubIcon size={14} />, action: 'PR #1842 merged' },
        ],
      },
      {
        time: 'T+12s',
        title: 'Pre-deploy dependency scan',
        description: 'DeployTitan scans the dependency graph before rollout begins. Detects that order-service, notification-svc, and analytics all reference PaymentResponse.legacy_id.',
        type: 'detect',
        metrics: [
          { label: 'Dependencies checked', value: '47', trend: 'stable', color: '#3b82f6' },
          { label: 'Breaking changes', value: '1', trend: 'up', color: '#ef4444' },
        ],
      },
      {
        time: 'T+14s',
        title: 'AI root-cause analysis',
        description: 'AI traces the impact: legacy_id removal breaks PaymentResponse deserialization in 3 services. Blast radius: 67% of transaction flow. Severity: Critical.',
        type: 'analyze',
        metrics: [
          { label: 'Blast radius', value: '67%', trend: 'up', color: '#ef4444' },
          { label: 'Severity', value: 'CRITICAL', trend: 'up', color: '#ef4444' },
        ],
      },
      {
        time: 'T+15s',
        title: 'Alert routing & ticket creation',
        description: 'Slack alert sent to #deploy-incidents. PagerDuty incident created for on-call. Linear ticket auto-created with full dependency trace attached.',
        type: 'integrate',
        integrations: [
          { name: 'Slack', icon: <SlackIcon size={14} />, action: '#deploy-incidents alerted' },
          { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'Incident P1 created' },
          { name: 'Linear', icon: <JiraIcon size={14} />, action: 'LIN-4822 auto-created' },
        ],
      },
      {
        time: 'T+16s',
        title: 'Deployment blocked pre-production',
        description: 'Rollout halted before any production traffic is affected. payment-api remains on v2.0.5. Zero customer impact.',
        type: 'action',
        integrations: [
          { name: 'Kubernetes', icon: <K8sIcon size={14} />, action: 'Deployment paused' },
        ],
      },
      {
        time: 'T+18s',
        title: 'System stable — incident resolved',
        description: 'All services confirmed healthy. Breaking change blocked pre-production. Dev team notified with required migration steps for downstream services.',
        type: 'resolve',
        metrics: [
          { label: 'Customer impact', value: '0%', trend: 'down', color: '#22c55e' },
          { label: 'Resolution', value: '18s', trend: 'down', color: '#22c55e' },
        ],
      },
    ],
    outcome: { mttr: '18 seconds', impactReduction: '100%', servicesProtected: 3 },
  },
  {
    id: 'secret-rotation',
    title: 'Secret Rotation Failure',
    subtitle: 'Vault rotates STRIPE_API_KEY and DB_PASSWORD — new secrets fail validation across payment and auth',
    category: 'Secrets',
    categoryColor: GOLD,
    affectedGraph: [
      { id: 'vault', label: 'Vault', status: 'affected' },
      { id: 'payment', label: 'Payment API', status: 'cascade' },
      { id: 'auth', label: 'Auth', status: 'cascade' },
      { id: 'stripe', label: 'Stripe Int.', status: 'cascade' },
      { id: 'orders', label: 'Orders', status: 'healthy' },
      { id: 'audit', label: 'Audit Log', status: 'healthy' },
    ],
    timeline: [
      {
        time: 'T+0s',
        title: 'Automated secret rotation triggered',
        description: 'Vault-svc rotates STRIPE_API_KEY and DB_PASSWORD on schedule. New secrets propagate to payment-api, auth-service, and stripe-int. No code changes involved.',
        type: 'trigger',
        integrations: [
          { name: 'HashiCorp Vault', icon: <LockIcon size={14} />, action: 'Secrets rotated' },
        ],
      },
      {
        time: 'T+45s',
        title: 'Anomaly detection — no deploy correlation',
        description: 'Payment-api 401 errors spike +2400%. Auth-service JWT validation failing. DeployTitan detects anomaly but finds no recent code deploys — triggers secret-rotation investigation.',
        type: 'detect',
        metrics: [
          { label: 'Error rate', value: '+2400%', trend: 'up', color: '#ef4444' },
          { label: 'Recent deploys', value: '0', trend: 'stable', color: '#3b82f6' },
        ],
      },
      {
        time: 'T+48s',
        title: 'AI traces root cause to secret rotation',
        description: 'AI correlates the error spike with vault-svc secret rotation event 45s ago. Identifies exact secrets (STRIPE_API_KEY, DB_PASSWORD) and affected services.',
        type: 'analyze',
        metrics: [
          { label: 'Root cause', value: 'SECRET MISMATCH', trend: 'up', color: GOLD },
          { label: 'Affected svcs', value: '3', trend: 'up', color: '#ef4444' },
        ],
      },
      {
        time: 'T+50s',
        title: 'Alert + approval request sent',
        description: 'Slack alert with full context sent to #security-ops. Linear ticket created: "Approve secret rollback for vault-svc". PagerDuty pages security on-call.',
        type: 'integrate',
        integrations: [
          { name: 'Slack', icon: <SlackIcon size={14} />, action: '#security-ops alerted' },
          { name: 'Linear', icon: <JiraIcon size={14} />, action: 'LIN-4521 approval requested' },
          { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'Security on-call paged' },
        ],
      },
      {
        time: 'T+62s',
        title: 'Encrypted backup → customer container',
        description: 'Approval received. Encrypted secret backup sent to customer\'s self-hosted DeployTitan container. Customer\'s container decrypts with their own crypto key and applies previous secrets. Crypto key never leaves customer infrastructure.',
        type: 'action',
        integrations: [
          { name: 'DeployTitan Container', icon: <ShieldIcon size={14} />, action: 'Encrypted backup received' },
          { name: 'Customer KMS', icon: <LockIcon size={14} />, action: 'Decrypted locally' },
        ],
      },
      {
        time: 'T+68s',
        title: 'Secrets restored — zero-trust recovery complete',
        description: 'Previous secrets restored across all affected services. End-to-end encrypted recovery — crypto key never left customer infrastructure. New secrets backed up for future rotation.',
        type: 'resolve',
        metrics: [
          { label: 'Recovery time', value: '68s', trend: 'down', color: '#22c55e' },
          { label: 'Key exposure', value: 'NONE', trend: 'stable', color: '#22c55e' },
        ],
      },
    ],
    outcome: { mttr: '68 seconds', impactReduction: '96%', servicesProtected: 3 },
  },
  {
    id: 'env-mismatch',
    title: 'Environment Variable Drift',
    subtitle: 'Config service propagates staging DATABASE_URL to production order and catalog services',
    category: 'Config',
    categoryColor: '#8b5cf6',
    affectedGraph: [
      { id: 'config', label: 'Config Svc', status: 'affected' },
      { id: 'orders', label: 'Orders', status: 'cascade' },
      { id: 'catalog', label: 'Catalog', status: 'cascade' },
      { id: 'inventory', label: 'Inventory', status: 'cascade' },
      { id: 'cache', label: 'Cache', status: 'healthy' },
      { id: 'analytics', label: 'Analytics', status: 'healthy' },
    ],
    timeline: [
      {
        time: 'T+0s',
        title: 'Config push with env variables',
        description: 'Config-svc pushes updated DATABASE_URL, REDIS_HOST, and FEATURE_FLAGS to order-service, catalog-svc, and inventory-svc.',
        type: 'trigger',
        integrations: [
          { name: 'Consul / etcd', icon: <K8sIcon size={14} />, action: 'Config propagated' },
        ],
      },
      {
        time: 'T+8s',
        title: 'Connection failures detected',
        description: 'Order-service DB connection timeout. Catalog-svc reports "FATAL: password authentication failed for user postgres". Config drift detector flags env mismatch.',
        type: 'detect',
        metrics: [
          { label: 'DB connections', value: 'FAILED', trend: 'up', color: '#ef4444' },
          { label: 'Config drift', value: '3 vars', trend: 'up', color: '#ef4444' },
        ],
      },
      {
        time: 'T+10s',
        title: 'AI diffs staging vs production config',
        description: 'AI performs config diff and discovers DATABASE_URL contains staging credentials. REDIS_HOST points to staging cluster. Cross-environment contamination confirmed.',
        type: 'analyze',
        metrics: [
          { label: 'Mismatched vars', value: '2', trend: 'up', color: '#ef4444' },
          { label: 'Environment', value: 'STAGING→PROD', trend: 'up', color: '#f59e0b' },
        ],
      },
      {
        time: 'T+12s',
        title: 'Incident alerts dispatched',
        description: 'Slack alert with config diff attached. Datadog dashboard auto-tagged with incident. JIRA ticket created with config snapshot comparison.',
        type: 'integrate',
        integrations: [
          { name: 'Slack', icon: <SlackIcon size={14} />, action: '#config-incidents alerted' },
          { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'Dashboard tagged' },
          { name: 'JIRA', icon: <JiraIcon size={14} />, action: 'CFG-892 created' },
        ],
      },
      {
        time: 'T+14s',
        title: 'Config snapshot rollback',
        description: 'Rolling back config-svc to previous snapshot. Restoring production DATABASE_URL and REDIS_HOST across 3 services. Config validation rule added.',
        type: 'action',
        integrations: [
          { name: 'Kubernetes', icon: <K8sIcon size={14} />, action: 'ConfigMap restored' },
        ],
      },
      {
        time: 'T+20s',
        title: 'All connections re-established',
        description: 'DB connections restored. All services healthy. Config validation guard added to prevent cross-environment variable leaks in future.',
        type: 'resolve',
        metrics: [
          { label: 'Downtime', value: '20s', trend: 'down', color: '#22c55e' },
          { label: 'Data loss', value: 'NONE', trend: 'stable', color: '#22c55e' },
        ],
      },
    ],
    outcome: { mttr: '20 seconds', impactReduction: '99%', servicesProtected: 3 },
  },
  {
    id: 'cert-expiry',
    title: 'Certificate Expiry Cascade',
    subtitle: 'TLS cert renewal deploys invalid certificate with missing intermediate CA, breaking all mTLS',
    category: 'Security',
    categoryColor: '#ef4444',
    affectedGraph: [
      { id: 'certmgr', label: 'Cert Manager', status: 'affected' },
      { id: 'gateway', label: 'Gateway', status: 'cascade' },
      { id: 'auth', label: 'Auth', status: 'cascade' },
      { id: 'payment', label: 'Payment', status: 'cascade' },
      { id: 'orders', label: 'Orders', status: 'healthy' },
      { id: 'shipping', label: 'Shipping', status: 'healthy' },
    ],
    timeline: [
      {
        time: 'T+0s',
        title: 'Automated cert renewal',
        description: 'Cert-manager automatically renews wildcard *.deploytitan.io certificate. New cert is issued but intermediate CA bundle is missing from the chain.',
        type: 'trigger',
        integrations: [
          { name: "Let's Encrypt", icon: <ShieldIcon size={14} />, action: 'Cert issued' },
          { name: 'cert-manager', icon: <K8sIcon size={14} />, action: 'Renewal triggered' },
        ],
      },
      {
        time: 'T+5s',
        title: 'mTLS handshake failures detected',
        description: 'mTLS handshake failures across 3 services. Certificate chain validation error: intermediate CA missing. 100% inter-service call failure.',
        type: 'detect',
        metrics: [
          { label: 'mTLS failures', value: '100%', trend: 'up', color: '#ef4444' },
          { label: 'Services affected', value: '3', trend: 'up', color: '#ef4444' },
        ],
      },
      {
        time: 'T+7s',
        title: 'AI identifies missing CA bundle',
        description: 'AI analyzes TLS error logs and cert chain. Identifies that cert-manager issued certificate without intermediate CA bundle. Root cause: ACME issuer config change.',
        type: 'analyze',
      },
      {
        time: 'T+8s',
        title: 'Security team alerted',
        description: 'Critical Slack alert to #security-ops. PagerDuty incident with full cert chain analysis. Datadog TLS error dashboard auto-updated.',
        type: 'integrate',
        integrations: [
          { name: 'Slack', icon: <SlackIcon size={14} />, action: '#security-ops CRITICAL' },
          { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'P0 incident created' },
          { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'TLS dashboard flagged' },
        ],
      },
      {
        time: 'T+10s',
        title: 'Previous cert bundle restored',
        description: 'Restoring previous certificate bundle with valid intermediate CA chain. Services re-establishing mTLS connections in dependency order.',
        type: 'action',
        integrations: [
          { name: 'Kubernetes', icon: <K8sIcon size={14} />, action: 'Secrets updated' },
          { name: 'cert-manager', icon: <ShieldIcon size={14} />, action: 'Cert rollback' },
        ],
      },
      {
        time: 'T+15s',
        title: 'mTLS fully restored',
        description: 'All inter-service mTLS connections re-established. cert-manager config flagged for CA bundle inclusion. Preventive alert added.',
        type: 'resolve',
        metrics: [
          { label: 'Recovery', value: '15s', trend: 'down', color: '#22c55e' },
          { label: 'Cert chain', value: 'VALID', trend: 'stable', color: '#22c55e' },
        ],
      },
    ],
    outcome: { mttr: '15 seconds', impactReduction: '100%', servicesProtected: 3 },
  },
  {
    id: 'feature-flag',
    title: 'Feature Flag Misconfiguration',
    subtitle: 'NEW_CHECKOUT_FLOW flag enabled at 100% before payment-api v2.1.0 is deployed',
    category: 'Config',
    categoryColor: '#8b5cf6',
    affectedGraph: [
      { id: 'config', label: 'Config Svc', status: 'affected' },
      { id: 'payment', label: 'Payment API', status: 'cascade' },
      { id: 'orders', label: 'Orders', status: 'cascade' },
      { id: 'checkout', label: 'Checkout UI', status: 'cascade' },
      { id: 'stripe', label: 'Stripe Int.', status: 'healthy' },
      { id: 'analytics', label: 'Analytics', status: 'healthy' },
    ],
    timeline: [
      {
        time: 'T+0s',
        title: 'Feature flag updated to 100%',
        description: 'NEW_CHECKOUT_FLOW flag changed from 5% canary to 100%. Flag propagates to payment-api, order-service, and checkout-ui via config-svc.',
        type: 'trigger',
        integrations: [
          { name: 'LaunchDarkly', icon: <K8sIcon size={14} />, action: 'Flag updated' },
        ],
      },
      {
        time: 'T+30s',
        title: 'Payment errors spike — revenue impact',
        description: 'Payment-api 500 errors +800%. checkout-ui rendering incomplete payment form. Revenue impact detected: $42K/min affected.',
        type: 'detect',
        metrics: [
          { label: 'Error rate', value: '+800%', trend: 'up', color: '#ef4444' },
          { label: 'Revenue impact', value: '$42K/min', trend: 'up', color: '#ef4444' },
        ],
      },
      {
        time: 'T+33s',
        title: 'AI traces flag dependency conflict',
        description: 'AI discovers NEW_CHECKOUT_FLOW requires payment-api v2.1.0 (not yet deployed). Flag was enabled prematurely. Dependency guard was missing.',
        type: 'analyze',
        metrics: [
          { label: 'Required version', value: 'v2.1.0', trend: 'stable', color: '#f59e0b' },
          { label: 'Current version', value: 'v2.0.5', trend: 'stable', color: '#ef4444' },
        ],
      },
      {
        time: 'T+35s',
        title: 'Revenue team + eng alerted',
        description: 'Slack alert to #revenue-alerts and #deploy-incidents. PagerDuty incident with revenue impact analysis. Datadog payment funnel dashboard updated.',
        type: 'integrate',
        integrations: [
          { name: 'Slack', icon: <SlackIcon size={14} />, action: '#revenue-alerts notified' },
          { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'Revenue P1 created' },
          { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'Payment funnel flagged' },
        ],
      },
      {
        time: 'T+37s',
        title: 'Flag rolled back to 5% canary',
        description: 'Rolling back feature flag to 5% canary. Payment-api error rate normalizing. Dependency guard added: flag now requires payment-api >= v2.1.0.',
        type: 'action',
        integrations: [
          { name: 'LaunchDarkly', icon: <K8sIcon size={14} />, action: 'Flag reverted to 5%' },
        ],
      },
      {
        time: 'T+42s',
        title: 'Revenue flow restored',
        description: 'Payment flow back to normal. Revenue impact contained to 42s window (~$29K vs projected $1.8M/hr). Dependency guard prevents future premature flag activation.',
        type: 'resolve',
        metrics: [
          { label: 'Total impact', value: '~$29K', trend: 'down', color: '#22c55e' },
          { label: 'Prevented loss', value: '$1.8M/hr', trend: 'down', color: '#22c55e' },
        ],
      },
    ],
    outcome: { mttr: '42 seconds', impactReduction: '97%', servicesProtected: 3 },
  },
]

/* ========== Mini Impact Graph ========== */

function ImpactGraph({ nodes, activeStep }: { nodes: ScenarioDetail['affectedGraph']; activeStep: number }) {
  // Position nodes in 2 rows of 3
  const positions = [
    { x: 60, y: 35 }, { x: 150, y: 35 }, { x: 240, y: 35 },
    { x: 60, y: 100 }, { x: 150, y: 100 }, { x: 240, y: 100 },
  ]
  // Edges between nodes (top row connects to bottom row)
  const edges = [
    { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 1, to: 3 },
    { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 4 }, { from: 2, to: 5 },
  ]

  // Determine node status based on timeline step
  const getStepStatus = (node: typeof nodes[0]) => {
    if (activeStep <= 0) return 'healthy'
    if (activeStep === 1 && node.status === 'affected') return 'affected'
    if (activeStep >= 2 && activeStep < 5 && (node.status === 'affected' || node.status === 'cascade')) return node.status
    if (activeStep >= 5) return 'recovered'
    return node.status === 'healthy' ? 'healthy' : node.status
  }

  const statusStyles = (status: string) => {
    switch (status) {
      case 'affected': return { fill: 'rgba(239,68,68,0.12)', stroke: '#ef4444', dot: '#ef4444' }
      case 'cascade': return { fill: 'rgba(239,68,68,0.06)', stroke: 'rgba(239,68,68,0.5)', dot: 'rgba(239,68,68,0.6)' }
      case 'recovered': return { fill: 'rgba(34,197,94,0.1)', stroke: '#22c55e', dot: '#22c55e' }
      default: return { fill: 'rgba(255,255,255,0.9)', stroke: `${GOLD_RGBA},0.25)`, dot: '#22c55e' }
    }
  }

  return (
    <svg viewBox="0 0 300 140" className="w-full">
      {/* Grid pattern */}
      <defs>
        <pattern id="dd-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0V30H0" fill="none" stroke={`${GOLD_RGBA},0.05)`} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="140" fill="url(#dd-grid)" />

      {/* Edges */}
      {edges.map((e, i) => {
        const f = positions[e.from]
        const t = positions[e.to]
        if (!f || !t) return null
        const fromNode = nodes[e.from]
        const toNode = nodes[e.to]
        if (!fromNode || !toNode) return null
        const fStatus = getStepStatus(fromNode)
        const tStatus = getStepStatus(toNode)
        const isActive = fStatus !== 'healthy' || tStatus !== 'healthy'
        const isDanger = isActive && (fStatus === 'affected' || fStatus === 'cascade' || tStatus === 'affected' || tStatus === 'cascade')
        const isRecovered = fStatus === 'recovered' && tStatus === 'recovered'
        return (
          <line
            key={i}
            x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke={isRecovered ? 'rgba(34,197,94,0.2)' : isDanger ? 'rgba(239,68,68,0.2)' : `${GOLD_RGBA},0.1)`}
            strokeWidth="1"
            strokeDasharray={isDanger ? '4 3' : 'none'}
            style={{ transition: 'all 0.5s' }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const pos = positions[i]
        if (!pos) return null
        const status = getStepStatus(node)
        const s = statusStyles(status)
        return (
          <g key={node.id} style={{ transition: 'all 0.5s' }}>
            {/* Outer ring */}
            {status !== 'healthy' && (
              <circle
                cx={pos.x} cy={pos.y} r="18"
                fill="none"
                stroke={s.stroke}
                strokeWidth="0.5"
                strokeDasharray="3 3"
                opacity="0.4"
                style={{ transition: 'all 0.5s' }}
              />
            )}
            {/* Main circle */}
            <circle
              cx={pos.x} cy={pos.y} r="13"
              fill={s.fill}
              stroke={s.stroke}
              strokeWidth="1"
              style={{ transition: 'all 0.5s' }}
            />
            {/* Status dot */}
            <circle cx={pos.x + 9} cy={pos.y - 9} r="3" fill={s.dot} opacity="0.8" style={{ transition: 'all 0.5s' }}>
              {(status === 'affected' || status === 'cascade') && (
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
              )}
            </circle>
            {/* Label */}
            <text
              x={pos.x} y={pos.y + 3}
              textAnchor="middle"
              fontSize="8"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              fill={status === 'recovered' ? '#22c55e' : status !== 'healthy' ? '#ef4444' : 'var(--color-ink-secondary)'}
              style={{ transition: 'fill 0.5s' }}
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ========== Timeline Step Component ========== */

function TimelineStepCard({ step, isActive, isComplete }: {
  step: TimelineStep
  isActive: boolean
  isComplete: boolean
}) {
  const typeColors: Record<TimelineStep['type'], { bg: string; border: string; dot: string; label: string }> = {
    trigger: { bg: 'rgba(59,130,246,0.05)', border: 'rgba(59,130,246,0.2)', dot: '#3b82f6', label: 'TRIGGER' },
    detect: { bg: 'rgba(239,68,68,0.05)', border: 'rgba(239,68,68,0.2)', dot: '#ef4444', label: 'DETECT' },
    analyze: { bg: `${GOLD_RGBA},0.05)`, border: `${GOLD_RGBA},0.2)`, dot: GOLD, label: 'AI ANALYSIS' },
    integrate: { bg: 'rgba(139,92,246,0.05)', border: 'rgba(139,92,246,0.2)', dot: '#8b5cf6', label: 'INTEGRATE' },
    action: { bg: `${GOLD_RGBA},0.05)`, border: `${GOLD_RGBA},0.25)`, dot: GOLD, label: 'ACTION' },
    resolve: { bg: 'rgba(34,197,94,0.05)', border: 'rgba(34,197,94,0.2)', dot: '#22c55e', label: 'RESOLVED' },
  }

  const tc = typeColors[step.type]

  return (
    <div
      className={cn(
        'relative pl-8 pb-8 transition-all duration-500',
        isActive ? 'opacity-100' : isComplete ? 'opacity-60' : 'opacity-25',
      )}
    >
      {/* Timeline line */}
      <div
        className="absolute left-[11px] top-6 bottom-0 w-px transition-all duration-500"
        style={{
          background: isComplete || isActive
            ? `linear-gradient(to bottom, ${tc.dot}, ${GOLD_RGBA},0.15))`
            : 'var(--color-line-subtle)',
        }}
      />

      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 w-[23px] h-[23px] flex items-center justify-center border-2 transition-all duration-500 z-10"
        style={{
          borderRadius: '2px',
          borderColor: isActive ? tc.dot : isComplete ? `${tc.dot}60` : 'var(--color-line)',
          background: isActive ? tc.bg : 'var(--color-surface)',
          boxShadow: isActive ? `0 0 12px ${tc.dot}20` : 'none',
        }}
      >
        <div
          className="w-2 h-2 transition-all duration-500"
          style={{
            borderRadius: '1px',
            background: isActive || isComplete ? tc.dot : 'var(--color-line)',
          }}
        >
          {isActive && (
            <div
              className="w-full h-full"
              style={{ borderRadius: '1px', animation: 'pulse-anim 1.5s infinite', background: tc.dot }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="border transition-all duration-500 overflow-hidden"
        style={{
          borderRadius: '2px',
          borderColor: isActive ? tc.border : 'var(--color-line-subtle)',
          background: isActive ? tc.bg : 'transparent',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: isActive ? tc.border : 'var(--color-line-subtle)' }}>
          <span className="text-[10px] font-mono font-medium" style={{ color: tc.dot }}>{step.time}</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 tracking-wider" style={{
            borderRadius: '1px',
            background: `${tc.dot}15`,
            color: tc.dot,
          }}>
            {tc.label}
          </span>
          <span className="text-sm font-medium text-ink ml-1">{step.title}</span>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          <p className="text-xs text-ink-secondary leading-relaxed mb-3">{step.description}</p>

          {/* Integrations */}
          {step.integrations && step.integrations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {step.integrations.map((int, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-2 px-2.5 py-1.5 border text-ink-secondary transition-all duration-300',
                    isActive ? 'dd-integration-pulse' : '',
                  )}
                  style={{
                    borderRadius: '2px',
                    borderColor: isActive ? `${GOLD_RGBA},0.25)` : 'var(--color-line-subtle)',
                    background: isActive ? 'rgba(255,255,255,0.7)' : 'transparent',
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  <span style={{ color: isActive ? GOLD : 'var(--color-ink-tertiary)' }}>{int.icon}</span>
                  <span className="text-[10px] font-mono">
                    <span className="font-medium text-ink">{int.name}</span>
                    <span className="text-ink-tertiary ml-1.5">· {int.action}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Metrics */}
          {step.metrics && step.metrics.length > 0 && (
            <div className="flex gap-3">
              {step.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 border border-line-subtle" style={{ borderRadius: '2px' }}>
                  <span className="text-[10px] font-mono text-ink-tertiary">{m.label}</span>
                  <span className="text-xs font-mono font-medium" style={{ color: m.color }}>{m.value}</span>
                  {m.trend === 'up' && <span className="text-[9px]" style={{ color: m.color }}>↑</span>}
                  {m.trend === 'down' && <span className="text-[9px]" style={{ color: m.color }}>↓</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ========== Main Component ========== */

export function ScenarioDeepDive() {
  const ref = useScrollReveal()
  const [activeScenario, setActiveScenario] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scenario = scenarioDetails[activeScenario]

  // Auto-advance steps
  useEffect(() => {
    if (!isAutoPlaying) return

    const advanceStep = () => {
      setActiveStep(prev => {
        const maxStep = scenario.timeline.length - 1
        if (prev >= maxStep) {
          // Move to next scenario
          setActiveScenario(si => {
            const next = (si + 1) % scenarioDetails.length
            return next
          })
          return 0
        }
        return prev + 1
      })
    }

    timerRef.current = setTimeout(advanceStep, activeStep === 0 ? 2500 : 3000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeStep, activeScenario, isAutoPlaying, scenario.timeline.length])

  // Reset step when scenario changes
  useEffect(() => {
    setActiveStep(0)
  }, [activeScenario])

  const goToScenario = useCallback((index: number) => {
    setIsAutoPlaying(false)
    setActiveScenario(index)
    setActiveStep(0)
  }, [])

  const prevScenario = useCallback(() => {
    setIsAutoPlaying(false)
    setActiveScenario(i => (i - 1 + scenarioDetails.length) % scenarioDetails.length)
  }, [])

  const nextScenario = useCallback(() => {
    setIsAutoPlaying(false)
    setActiveScenario(i => (i + 1) % scenarioDetails.length)
  }, [])

  const goToStep = useCallback((index: number) => {
    setIsAutoPlaying(false)
    setActiveStep(index)
  }, [])

  const resumeAutoplay = useCallback(() => {
    setIsAutoPlaying(true)
  }, [])

  return (
    <section className="py-24 lg:py-32 border-t border-line bg-surface-alt/50 relative" ref={ref}>
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
          <span className="w-8 h-px bg-gold/40" />
          Deep Dive
        </span>

        <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08] mb-5 max-w-3xl">
          See exactly how we{' '}
          <span className="text-ink-secondary">fix every scenario.</span>
        </h2>

        <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-12 lg:mb-16">
          Step-by-step incident response with AI analysis, third-party integrations, and zero-trust recovery — fully automated.
        </p>

        {/* Scenario tabs */}
        <div data-reveal data-reveal-delay="3" className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {/* Arrow nav */}
            <button
              onClick={prevScenario}
              className="w-9 h-9 flex items-center justify-center border border-line hover:border-gold/30 hover:bg-gold-muted transition-all text-ink-tertiary hover:text-gold"
              style={{ borderRadius: '2px' }}
              aria-label="Previous scenario"
            >
              <ArrowLeftIcon />
            </button>

            {/* Scenario tabs — scrollable on mobile */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-1.5 min-w-max">
                {scenarioDetails.map((s, i) => {
                  const isActive = i === activeScenario
                  return (
                    <button
                      key={s.id}
                      onClick={() => goToScenario(i)}
                      className={cn(
                        'px-3.5 py-2 text-xs font-mono border transition-all duration-300 whitespace-nowrap',
                        isActive
                          ? 'border-gold/30 bg-white shadow-sm text-ink font-medium'
                          : 'border-line-subtle bg-transparent text-ink-tertiary hover:text-ink hover:border-line',
                      )}
                      style={{ borderRadius: '2px' }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 transition-colors"
                          style={{
                            borderRadius: '1px',
                            background: isActive ? s.categoryColor : 'var(--color-line)',
                          }}
                        />
                        {s.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              onClick={nextScenario}
              className="w-9 h-9 flex items-center justify-center border border-line hover:border-gold/30 hover:bg-gold-muted transition-all text-ink-tertiary hover:text-gold"
              style={{ borderRadius: '2px' }}
              aria-label="Next scenario"
            >
              <ArrowRightIcon />
            </button>
          </div>

          {/* Auto-play toggle + scenario counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-[9px] font-mono px-2 py-0.5 tracking-wider border"
                style={{
                  borderRadius: '1px',
                  borderColor: `${scenario.categoryColor}30`,
                  color: scenario.categoryColor,
                  background: `${scenario.categoryColor}08`,
                }}
              >
                {scenario.category}
              </span>
              <span className="text-[10px] font-mono text-ink-tertiary">
                {activeScenario + 1} / {scenarioDetails.length}
              </span>
              <div className="flex gap-0.5 ml-2">
                {scenarioDetails.map((_, i) => (
                  <div key={i} className="w-1 h-1" style={{
                    backgroundColor: i === activeScenario ? GOLD : 'rgba(8,5,3,0.08)',
                    borderRadius: '0.5px',
                    transition: 'background-color 0.3s',
                  }} />
                ))}
              </div>
            </div>
            <button
              onClick={isAutoPlaying ? () => setIsAutoPlaying(false) : resumeAutoplay}
              className="flex items-center gap-1.5 text-[10px] font-mono text-ink-tertiary hover:text-ink transition-colors"
            >
              <div
                className="w-1.5 h-1.5"
                style={{
                  borderRadius: '1px',
                  background: isAutoPlaying ? GOLD : 'var(--color-line)',
                  animation: isAutoPlaying ? 'pulse-anim 1.5s infinite' : 'none',
                }}
              />
              {isAutoPlaying ? 'AUTO-PLAYING' : 'PAUSED'}
            </button>
          </div>
        </div>

        {/* Scenario content */}
        <div data-reveal data-reveal-delay="4" className="border border-line bg-white" style={{ borderRadius: '2px' }}>
          {/* Corner accents */}
          <div className="absolute -mt-px -ml-px w-3 h-3 border-t border-l" style={{ borderColor: `${GOLD_RGBA},0.3)` }} />

          {/* Scenario header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface-alt/30">
            <div>
              <h3 className="text-lg font-display font-medium text-ink">{scenario.title}</h3>
              <p className="text-sm text-ink-secondary mt-0.5">{scenario.subtitle}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0 ml-4">
              {/* Step progress */}
              <div className="hidden md:flex items-center gap-1">
                {scenario.timeline.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    className="group relative"
                  >
                    <div
                      className="w-6 h-1.5 transition-all duration-300 cursor-pointer"
                      style={{
                        borderRadius: '1px',
                        background: i === activeStep
                          ? GOLD
                          : i < activeStep
                            ? `${GOLD_RGBA},0.3)`
                            : 'var(--color-line-subtle)',
                      }}
                    />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-ink-tertiary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Step {i + 1}
                    </span>
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono" style={{ color: GOLD }}>
                STEP {activeStep + 1}/{scenario.timeline.length}
              </span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-[1fr_340px]">
            {/* Left: Timeline */}
            <div className="p-6 border-r border-line">
              <div className="space-y-0">
                {scenario.timeline.map((step, i) => (
                  <div key={i} onClick={() => goToStep(i)} className="cursor-pointer">
                    <TimelineStepCard
                      step={step}
                      isActive={i === activeStep}
                      isComplete={i < activeStep}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Impact graph + Outcome + Integrations summary */}
            <div className="p-6 bg-surface-alt/20">
              <div className="sticky top-32 space-y-6">
                {/* Impact graph */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-wider text-ink-tertiary">IMPACT GRAPH</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5" style={{ borderRadius: '1px', background: GOLD, opacity: 0.5 }} />
                      <span className="text-[9px] font-mono" style={{ color: `${GOLD_RGBA},0.5)` }}>LIVE</span>
                    </div>
                  </div>
                  <div className="border border-line bg-white overflow-hidden" style={{ borderRadius: '2px' }}>
                    <ImpactGraph nodes={scenario.affectedGraph} activeStep={activeStep} />
                  </div>
                  {/* Graph legend */}
                  <div className="flex items-center gap-3 mt-2">
                    {[
                      { label: 'Healthy', color: '#22c55e' },
                      { label: 'Affected', color: '#ef4444' },
                      { label: 'Cascade', color: 'rgba(239,68,68,0.5)' },
                      { label: 'Recovered', color: '#22c55e' },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5" style={{ borderRadius: '1px', background: l.color }} />
                        <span className="text-[9px] font-mono text-ink-tertiary">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome metrics */}
                <div className="border border-line bg-white p-4" style={{ borderRadius: '2px' }}>
                  <span className="text-[10px] font-mono tracking-wider text-ink-tertiary mb-3 block">OUTCOME</span>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-ink-secondary">Mean Time to Resolve</span>
                      <span className="text-sm font-mono font-medium" style={{ color: GOLD }}>{scenario.outcome.mttr}</span>
                    </div>
                    <div className="h-px bg-line-subtle" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-ink-secondary">Impact Reduction</span>
                      <span className="text-sm font-mono font-medium text-signal-success">{scenario.outcome.impactReduction}</span>
                    </div>
                    <div className="h-px bg-line-subtle" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-ink-secondary">Services Protected</span>
                      <span className="text-sm font-mono font-medium" style={{ color: GOLD }}>{scenario.outcome.servicesProtected}</span>
                    </div>
                  </div>
                </div>

                {/* Integrations used in this scenario */}
                <div className="border border-line bg-white p-4" style={{ borderRadius: '2px' }}>
                  <span className="text-[10px] font-mono tracking-wider text-ink-tertiary mb-3 block">INTEGRATIONS USED</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(() => {
                      const allIntegrations = new Map<string, ReactNode>()
                      scenario.timeline.forEach(step => {
                        step.integrations?.forEach(int => {
                          if (!allIntegrations.has(int.name)) {
                            allIntegrations.set(int.name, int.icon)
                          }
                        })
                      })
                      return Array.from(allIntegrations.entries()).map(([name, icon]) => (
                        <div
                          key={name}
                          className="flex items-center gap-1.5 px-2 py-1 border border-line-subtle text-ink-secondary hover:border-gold/20 hover:bg-gold-muted transition-all"
                          style={{ borderRadius: '2px' }}
                        >
                          <span style={{ color: 'var(--color-ink-tertiary)' }}>{icon}</span>
                          <span className="text-[10px] font-mono">{name}</span>
                        </div>
                      ))
                    })()}
                  </div>
                </div>

                {/* Timeline scrubber (mobile alternative) */}
                <div className="md:hidden">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToStep(Math.max(0, activeStep - 1))}
                      className="w-8 h-8 flex items-center justify-center border border-line hover:border-gold/30 transition-all text-ink-tertiary"
                      style={{ borderRadius: '2px' }}
                      disabled={activeStep === 0}
                    >
                      <ArrowLeftIcon />
                    </button>
                    <div className="flex-1 h-1.5 bg-line-subtle overflow-hidden" style={{ borderRadius: '1px' }}>
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${((activeStep + 1) / scenario.timeline.length) * 100}%`,
                          background: `linear-gradient(90deg, #3b82f6, ${GOLD}, #22c55e)`,
                          borderRadius: '1px',
                        }}
                      />
                    </div>
                    <button
                      onClick={() => goToStep(Math.min(scenario.timeline.length - 1, activeStep + 1))}
                      className="w-8 h-8 flex items-center justify-center border border-line hover:border-gold/30 transition-all text-ink-tertiary"
                      style={{ borderRadius: '2px' }}
                      disabled={activeStep === scenario.timeline.length - 1}
                    >
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
