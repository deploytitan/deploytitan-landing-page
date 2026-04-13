import type { ReactNode } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollReveal, cn, sleep } from '../utils'

/* ========== Constants ========== */

const GOLD = '#c9a84c'
const GOLD_RGBA = 'rgba(201,168,76'

/* ========== Types & Data ========== */

type Stage = 'merge' | 'deploy' | 'detect' | 'analyze' | 'heal' | 'complete'

interface StageConfig {
  id: Stage
  label: string
}

const defaultStages: StageConfig[] = [
  { id: 'merge', label: 'Merged' },
  { id: 'deploy', label: 'Deploying' },
  { id: 'detect', label: 'Issue Found' },
  { id: 'analyze', label: 'AI Analyzing' },
  { id: 'heal', label: 'Rolling Back' },
  { id: 'complete', label: 'Stable' },
]

const stageIcons: Record<Stage, ReactNode> = {
  merge: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>,
  deploy: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  detect: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  analyze: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>,
  heal: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>,
  complete: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
}

type SvcStatus = 'idle' | 'deploying' | 'warning' | 'cascade' | 'rollback' | 'healthy'

interface ServiceState {
  name: string
  shortName: string
  status: SvcStatus
  version: string
  newVersion?: string
}

interface LogMessage {
  stage: Stage
  type: 'info' | 'warning' | 'error' | 'success'
  message: string
}

interface Scenario {
  title: string
  description: string
  category: string
  stageLabels?: Partial<Record<Stage, string>>
  services: ServiceState[]
  affectedServices: string[]
  cascadeServices: string[]
  rollbackServices: string[]
  logMessages: LogMessage[]
}

const scenarios: Scenario[] = [
  {
    title: 'Schema Breaking Change',
    description: 'Payment API v2.1.0 removes legacy_id field — DeployTitan blocks it at the PR before merge',
    category: 'Code Deploy',
    stageLabels: {
      merge: 'PR Opened',
      deploy: 'Scanning',
      detect: 'Break Found',
      analyze: 'AI Analysis',
      heal: 'PR Blocked',
      complete: 'Guarded',
    },
    services: [
      { name: 'api-gateway', shortName: 'GW', status: 'idle', version: 'v1.4.2' },
      { name: 'auth-service', shortName: 'AUTH', status: 'idle', version: 'v3.2.1' },
      { name: 'payment-api', shortName: 'PAY', status: 'idle', version: 'v2.0.5', newVersion: 'v2.1.0' },
      { name: 'order-service', shortName: 'ORD', status: 'idle', version: 'v1.8.3' },
      { name: 'notification-svc', shortName: 'NTF', status: 'idle', version: 'v1.2.0' },
      { name: 'analytics', shortName: 'ANL', status: 'idle', version: 'v2.5.1' },
    ],
    affectedServices: ['payment-api'],
    cascadeServices: ['order-service', 'notification-svc', 'analytics'],
    rollbackServices: ['payment-api'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'PR #1842 opened: payment-api schema migration v2.1.0 — removes legacy_id column' },
      { stage: 'deploy', type: 'info', message: 'DeployTitan scanning PR diff against live dependency graph...' },
      { stage: 'detect', type: 'error', message: 'BREAKING: order-service, notification-svc, analytics depend on PaymentResponse.legacy_id (removed in this PR)' },
      { stage: 'analyze', type: 'warning', message: 'AI analysis: 3 downstream consumers reference legacy_id. Blast radius: 67% of transaction flow. PR comment posted.' },
      { stage: 'heal', type: 'info', message: 'PR flagged as blocked. Deployment parked — will not proceed even if merged until dependents are updated.' },
      { stage: 'complete', type: 'success', message: 'Schema break caught pre-merge. Zero production impact. Migration guide posted to PR.' },
    ],
  },
  {
    title: 'Secret Rotation Failure',
    description: 'Vault secret rotation breaks payment-api & auth-svc — no code changes involved',
    category: 'Secrets',
    stageLabels: {
      merge: 'Rotation',
      deploy: 'Propagating',
      detect: 'Anomaly',
      analyze: 'AI Tracing',
      heal: 'Restoring',
      complete: 'Secured',
    },
    services: [
      { name: 'vault-svc', shortName: 'VLT', status: 'idle', version: 'v1.8.0' },
      { name: 'payment-api', shortName: 'PAY', status: 'idle', version: 'v2.0.5' },
      { name: 'auth-service', shortName: 'AUTH', status: 'idle', version: 'v3.2.1' },
      { name: 'stripe-int', shortName: 'STRP', status: 'idle', version: 'v1.3.0' },
      { name: 'order-service', shortName: 'ORD', status: 'idle', version: 'v1.8.3' },
      { name: 'audit-log', shortName: 'AUD', status: 'idle', version: 'v1.0.8' },
    ],
    affectedServices: ['vault-svc'],
    cascadeServices: ['payment-api', 'auth-service', 'stripe-int'],
    rollbackServices: ['vault-svc'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'Secret rotation triggered: STRIPE_API_KEY, DB_PASSWORD rotated in vault-svc' },
      { stage: 'deploy', type: 'info', message: 'New secrets propagating to payment-api, auth-service, stripe-int — no code changes detected' },
      { stage: 'detect', type: 'error', message: 'ANOMALY: payment-api 401 errors +2400%. auth-service JWT validation failing. No recent deploys.' },
      { stage: 'analyze', type: 'warning', message: 'AI traced root cause → vault-svc secret rotation 3m ago. Slack alert sent. Linear ticket LIN-4521 created: "Approve secret rollback"' },
      { stage: 'heal', type: 'info', message: 'Approval received. Encrypted backup sent to customer DeployTitan container → decrypted with customer crypto key → previous secrets restored.' },
      { stage: 'complete', type: 'success', message: 'Secrets rolled back. End-to-end encrypted — crypto key never left customer infrastructure. New secrets backed up.' },
    ],
  },
  {
    title: 'Env Variable Mismatch',
    description: 'Config push contains staging DATABASE_URL — DeployTitan blocks it before propagation',
    category: 'Config',
    stageLabels: {
      merge: 'Config Push',
      deploy: 'Validating',
      detect: 'Env Mismatch',
      analyze: 'AI Tracing',
      heal: 'Push Blocked',
      complete: 'Guarded',
    },
    services: [
      { name: 'config-svc', shortName: 'CFG', status: 'idle', version: 'v2.1.0' },
      { name: 'order-service', shortName: 'ORD', status: 'idle', version: 'v1.8.3' },
      { name: 'catalog-svc', shortName: 'CAT', status: 'idle', version: 'v4.1.2' },
      { name: 'inventory-svc', shortName: 'INV', status: 'idle', version: 'v2.3.1' },
      { name: 'cache-layer', shortName: 'CCH', status: 'idle', version: 'v1.2.0' },
      { name: 'analytics', shortName: 'ANL', status: 'idle', version: 'v2.5.1' },
    ],
    affectedServices: ['config-svc'],
    cascadeServices: ['order-service', 'catalog-svc', 'inventory-svc'],
    rollbackServices: ['config-svc'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'Config push initiated: DATABASE_URL, REDIS_HOST, FEATURE_FLAGS via config-svc' },
      { stage: 'deploy', type: 'info', message: 'DeployTitan validating config diff against environment registry before propagation...' },
      { stage: 'detect', type: 'error', message: 'BLOCKED: DATABASE_URL contains staging credentials (host: db-staging.internal). REDIS_HOST points to staging cluster.' },
      { stage: 'analyze', type: 'warning', message: 'AI analysis: Cross-environment contamination — 2 variables reference staging infrastructure. Would affect 3 production services.' },
      { stage: 'heal', type: 'info', message: 'Config push rejected. No variables propagated. Operator notified with diff showing staging vs production values.' },
      { stage: 'complete', type: 'success', message: 'Config mismatch caught pre-propagation. Zero service disruption. Environment validation guard active.' },
    ],
  },
  {
    title: 'Deployment Artifact Corruption',
    description: 'Corrupted Docker image caught by pre-deploy checksum validation — before any pods start',
    category: 'Artifacts',
    stageLabels: {
      merge: 'Image Push',
      deploy: 'Verifying',
      detect: 'Checksum Fail',
      analyze: 'AI Tracing',
      heal: 'Deploy Blocked',
      complete: 'Guarded',
    },
    services: [
      { name: 'shipping-svc', shortName: 'SHIP', status: 'idle', version: 'v1.4.5', newVersion: 'v1.5.0' },
      { name: 'order-service', shortName: 'ORD', status: 'idle', version: 'v1.8.3' },
      { name: 'notification-svc', shortName: 'NTF', status: 'idle', version: 'v1.2.0' },
      { name: 'sendgrid', shortName: 'SG', status: 'idle', version: 'v1.0.2' },
      { name: 'api-gateway', shortName: 'GW', status: 'idle', version: 'v1.4.2' },
      { name: 'audit-log', shortName: 'AUD', status: 'idle', version: 'v1.0.8' },
    ],
    affectedServices: ['shipping-svc'],
    cascadeServices: ['order-service', 'notification-svc', 'sendgrid'],
    rollbackServices: ['shipping-svc'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'Docker image pushed: shipping-svc:v1.5.0 (sha256:a3f8c2…) — 142MB, build #3847' },
      { stage: 'deploy', type: 'info', message: 'DeployTitan verifying artifact integrity before rollout — comparing image layers against build manifest...' },
      { stage: 'detect', type: 'error', message: 'BLOCKED: Image layer sha256:7b2e… checksum mismatch. Registry artifact differs from CI build output.' },
      { stage: 'analyze', type: 'warning', message: 'AI analysis: Layer corruption detected during registry upload. Build environment healthy — issue is in transit.' },
      { stage: 'heal', type: 'info', message: 'Deployment blocked pre-rollout. Zero pods started. CI pipeline triggered for rebuild with verified upload.' },
      { stage: 'complete', type: 'success', message: 'Corrupted image quarantined. shipping-svc remains on v1.4.5. Rebuild in progress with checksum verification.' },
    ],
  },
  {
    title: 'Certificate Expiry Cascade',
    description: 'TLS certificate renewal deploys invalid cert, breaking inter-service mTLS',
    category: 'Security',
    stageLabels: {
      merge: 'Cert Renewal',
      deploy: 'Propagating',
      detect: 'TLS Failure',
      analyze: 'AI Tracing',
      heal: 'Cert Rollback',
      complete: 'Secured',
    },
    services: [
      { name: 'cert-manager', shortName: 'CERT', status: 'idle', version: 'v2.0.1' },
      { name: 'api-gateway', shortName: 'GW', status: 'idle', version: 'v1.4.2' },
      { name: 'auth-service', shortName: 'AUTH', status: 'idle', version: 'v3.2.1' },
      { name: 'payment-api', shortName: 'PAY', status: 'idle', version: 'v2.0.5' },
      { name: 'order-service', shortName: 'ORD', status: 'idle', version: 'v1.8.3' },
      { name: 'shipping-svc', shortName: 'SHIP', status: 'idle', version: 'v1.4.5' },
    ],
    affectedServices: ['cert-manager'],
    cascadeServices: ['api-gateway', 'auth-service', 'payment-api'],
    rollbackServices: ['cert-manager'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'Automated cert renewal: wildcard *.deploytitan.io renewed via cert-manager' },
      { stage: 'deploy', type: 'info', message: 'New TLS certificate propagating to api-gateway, auth-service, payment-api mTLS endpoints' },
      { stage: 'detect', type: 'error', message: 'ALERT: mTLS handshake failures across 3 services. Certificate chain validation error: intermediate CA missing.' },
      { stage: 'analyze', type: 'warning', message: 'AI analysis: cert-manager issued cert without intermediate CA bundle. 100% inter-service calls failing.' },
      { stage: 'heal', type: 'info', message: 'Restoring previous certificate bundle with valid chain. Services re-establishing mTLS connections.' },
      { stage: 'complete', type: 'success', message: 'mTLS restored. All services communicating. cert-manager config flagged for CA bundle inclusion.' },
    ],
  },
  {
    title: 'Feature Flag Misconfiguration',
    description: 'Flag change requires payment-api v2.1.0 — DeployTitan blocks it before propagation',
    category: 'Config',
    stageLabels: {
      merge: 'Flag Update',
      deploy: 'Validating',
      detect: 'Dep Conflict',
      analyze: 'AI Tracing',
      heal: 'Flag Blocked',
      complete: 'Guarded',
    },
    services: [
      { name: 'config-svc', shortName: 'CFG', status: 'idle', version: 'v2.1.0' },
      { name: 'payment-api', shortName: 'PAY', status: 'idle', version: 'v2.0.5' },
      { name: 'order-service', shortName: 'ORD', status: 'idle', version: 'v1.8.3' },
      { name: 'checkout-ui', shortName: 'CHK', status: 'idle', version: 'v3.4.0' },
      { name: 'stripe-int', shortName: 'STRP', status: 'idle', version: 'v1.3.0' },
      { name: 'analytics', shortName: 'ANL', status: 'idle', version: 'v2.5.1' },
    ],
    affectedServices: ['config-svc'],
    cascadeServices: ['payment-api', 'order-service', 'checkout-ui'],
    rollbackServices: ['config-svc'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'Feature flag change requested: NEW_CHECKOUT_FLOW → 100% (was 5% canary)' },
      { stage: 'deploy', type: 'info', message: 'DeployTitan validating flag dependencies against live service versions...' },
      { stage: 'detect', type: 'error', message: 'BLOCKED: NEW_CHECKOUT_FLOW requires payment-api >= v2.1.0. Current version: v2.0.5. Flag change rejected.' },
      { stage: 'analyze', type: 'warning', message: 'AI analysis: Enabling this flag would break checkout for 100% of users. payment-api v2.1.0 is not yet deployed.' },
      { stage: 'heal', type: 'info', message: 'Flag remains at 5% canary. Operator notified: deploy payment-api v2.1.0 first, then re-enable flag.' },
      { stage: 'complete', type: 'success', message: 'Premature flag activation prevented. Zero revenue impact. Dependency guard enforced.' },
    ],
  },
  {
    title: 'Resource Contention',
    description: 'Catalog service update causes database connection pool exhaustion',
    category: 'Code Deploy',
    services: [
      { name: 'catalog-svc', shortName: 'CAT', status: 'idle', version: 'v4.1.2', newVersion: 'v4.2.0' },
      { name: 'inventory-svc', shortName: 'INV', status: 'idle', version: 'v2.3.1' },
      { name: 'pricing-engine', shortName: 'PRC', status: 'idle', version: 'v3.0.5' },
      { name: 'search-api', shortName: 'SRC', status: 'idle', version: 'v1.9.0' },
      { name: 'recommendation', shortName: 'REC', status: 'idle', version: 'v2.1.3' },
      { name: 'cache-layer', shortName: 'CCH', status: 'idle', version: 'v1.2.0' },
    ],
    affectedServices: ['catalog-svc'],
    cascadeServices: ['inventory-svc', 'search-api', 'pricing-engine'],
    rollbackServices: ['catalog-svc'],
    logMessages: [
      { stage: 'merge', type: 'info', message: 'PR #987 merged: catalog-svc performance optimization v4.2.0' },
      { stage: 'deploy', type: 'info', message: 'Canary deployment: catalog-svc v4.2.0 (10% traffic)' },
      { stage: 'detect', type: 'error', message: 'ALERT: DB connection pool at 95%. New query pattern causing connection leak.' },
      { stage: 'analyze', type: 'warning', message: 'AI analysis: Resource saturation — inventory-svc, search-api degraded. P95 latency +340%' },
      { stage: 'heal', type: 'info', message: 'Emergency rollback: catalog-svc → v4.1.2, releasing connections' },
      { stage: 'complete', type: 'success', message: 'Pool recovered. Latency normalized. Flagged for connection pooling review.' },
    ],
  },
]

/* ========== Deep Dive Types & Data ========== */

/* Integration icons (inline SVGs) */

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

function DockerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  )
}

function DatabaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  )
}

/* Deep dive types */

interface TimelineStep {
  time: string
  title: string
  description: string
  type: 'trigger' | 'detect' | 'analyze' | 'integrate' | 'action' | 'resolve'
  integrations?: { name: string; icon: ReactNode; action: string }[]
  metrics?: { label: string; value: string; trend: 'up' | 'down' | 'stable'; color: string }[]
}

interface ScenarioDeepDiveData {
  id: string
  title: string
  subtitle: string
  category: string
  categoryColor: string
  affectedGraph: { id: string; label: string; status: 'healthy' | 'affected' | 'cascade' | 'recovered' }[]
  timeline: TimelineStep[]
  outcome: { mttr: string; impactReduction: string; servicesProtected: number }
}

const deepDiveData: ScenarioDeepDiveData[] = [
  {
    id: 'schema-break',
    title: 'Schema Breaking Change',
    subtitle: 'Payment API v2.1.0 removes legacy_id field — caught at PR review before any merge or deployment',
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
        time: 'T+0s', title: 'PR #1842 opened for review',
        description: 'Developer opens PR for payment-api v2.1.0 with a DB schema migration that removes the legacy_id column. DeployTitan CI check triggers automatically.',
        type: 'trigger',
        integrations: [{ name: 'GitHub', icon: <GithubIcon size={14} />, action: 'PR #1842 opened' }],
      },
      {
        time: 'T+8s', title: 'Dependency graph scan on PR diff',
        description: 'DeployTitan analyzes the PR diff against the live dependency graph. Discovers that order-service, notification-svc, and analytics all reference PaymentResponse.legacy_id in their deserialization contracts.',
        type: 'detect',
        metrics: [{ label: 'Dependencies scanned', value: '47', trend: 'stable', color: '#3b82f6' }, { label: 'Breaking changes', value: '1', trend: 'up', color: '#ef4444' }],
      },
      {
        time: 'T+10s', title: 'AI impact analysis + PR comment',
        description: 'AI traces the blast radius: legacy_id removal breaks PaymentResponse deserialization in 3 downstream services. Posts a detailed PR comment with the affected service map, specific code references, and a suggested migration path.',
        type: 'analyze',
        metrics: [{ label: 'Blast radius', value: '67%', trend: 'up', color: '#ef4444' }, { label: 'Severity', value: 'CRITICAL', trend: 'up', color: '#ef4444' }],
      },
      {
        time: 'T+12s', title: 'PR marked as blocked + team notified',
        description: 'GitHub check status set to "failing" with clear explanation. Slack notification sent to #deploy-incidents. PR cannot be merged until dependent services add support for the new schema.',
        type: 'integrate',
        integrations: [
          { name: 'GitHub', icon: <GithubIcon size={14} />, action: 'PR check failed — merge blocked' },
          { name: 'Slack', icon: <SlackIcon size={14} />, action: '#deploy-incidents alerted' },
        ],
      },
      {
        time: 'T+14s', title: 'Deployment parked as safety net',
        description: 'Even if the PR is force-merged, DeployTitan parks the deployment — it will not roll out until order-service, notification-svc, and analytics each receive a deployment that removes the legacy_id dependency.',
        type: 'action',
        integrations: [{ name: 'DeployTitan', icon: <ShieldIcon size={14} />, action: 'Deployment parked until dependents updated' }],
      },
      {
        time: 'T+16s', title: 'Breaking change prevented — zero impact',
        description: 'Schema break caught at the PR level. No code was merged, no deployment was attempted, and no production traffic was affected. Dev team has a clear migration guide to follow.',
        type: 'resolve',
        metrics: [{ label: 'Customer impact', value: '0%', trend: 'down', color: '#22c55e' }, { label: 'Caught at', value: 'PR REVIEW', trend: 'stable', color: '#22c55e' }],
      },
    ],
    outcome: { mttr: '0s — prevented', impactReduction: '100%', servicesProtected: 3 },
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
      { time: 'T+0s', title: 'Automated secret rotation triggered', description: 'Vault-svc rotates STRIPE_API_KEY and DB_PASSWORD on schedule. New secrets propagate to payment-api, auth-service, and stripe-int. No code changes involved.', type: 'trigger', integrations: [{ name: 'HashiCorp Vault', icon: <LockIcon size={14} />, action: 'Secrets rotated' }] },
      { time: 'T+45s', title: 'Anomaly detection — no deploy correlation', description: 'Payment-api 401 errors spike +2400%. Auth-service JWT validation failing. DeployTitan detects anomaly but finds no recent code deploys — triggers secret-rotation investigation.', type: 'detect', metrics: [{ label: 'Error rate', value: '+2400%', trend: 'up', color: '#ef4444' }, { label: 'Recent deploys', value: '0', trend: 'stable', color: '#3b82f6' }] },
      { time: 'T+48s', title: 'AI traces root cause to secret rotation', description: 'AI correlates the error spike with vault-svc secret rotation event 45s ago. Identifies exact secrets (STRIPE_API_KEY, DB_PASSWORD) and affected services.', type: 'analyze', metrics: [{ label: 'Root cause', value: 'SECRET MISMATCH', trend: 'up', color: GOLD }, { label: 'Affected svcs', value: '3', trend: 'up', color: '#ef4444' }] },
      { time: 'T+50s', title: 'Alert + approval request sent', description: 'Slack alert with full context sent to #security-ops. Linear ticket created: "Approve secret rollback for vault-svc". PagerDuty pages security on-call.', type: 'integrate', integrations: [{ name: 'Slack', icon: <SlackIcon size={14} />, action: '#security-ops alerted' }, { name: 'Linear', icon: <JiraIcon size={14} />, action: 'LIN-4521 approval requested' }, { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'Security on-call paged' }] },
      { time: 'T+62s', title: 'Encrypted backup → customer container', description: 'Approval received. Encrypted secret backup sent to customer\'s self-hosted DeployTitan container. Customer\'s container decrypts with their own crypto key and applies previous secrets. Crypto key never leaves customer infrastructure.', type: 'action', integrations: [{ name: 'DeployTitan Container', icon: <ShieldIcon size={14} />, action: 'Encrypted backup received' }, { name: 'Customer KMS', icon: <LockIcon size={14} />, action: 'Decrypted locally' }] },
      { time: 'T+68s', title: 'Secrets restored — zero-trust recovery complete', description: 'Previous secrets restored across all affected services. End-to-end encrypted recovery — crypto key never left customer infrastructure. New secrets backed up for future rotation.', type: 'resolve', metrics: [{ label: 'Recovery time', value: '68s', trend: 'down', color: '#22c55e' }, { label: 'Key exposure', value: 'NONE', trend: 'stable', color: '#22c55e' }] },
    ],
    outcome: { mttr: '68 seconds', impactReduction: '96%', servicesProtected: 3 },
  },
  {
    id: 'env-mismatch',
    title: 'Environment Variable Drift',
    subtitle: 'Config push contains staging DATABASE_URL — caught and blocked before propagation to production',
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
      { time: 'T+0s', title: 'Config push initiated', description: 'Operator pushes updated DATABASE_URL, REDIS_HOST, and FEATURE_FLAGS to production via config-svc.', type: 'trigger', integrations: [{ name: 'Consul / etcd', icon: <K8sIcon size={14} />, action: 'Config push requested' }] },
      { time: 'T+2s', title: 'Pre-propagation environment validation', description: 'DeployTitan intercepts the config push and validates each variable against the environment registry. DATABASE_URL hostname resolves to db-staging.internal, not the production cluster.', type: 'detect', metrics: [{ label: 'Env validation', value: 'FAILED', trend: 'up', color: '#ef4444' }, { label: 'Staging refs', value: '2 vars', trend: 'up', color: '#ef4444' }] },
      { time: 'T+4s', title: 'AI diffs staging vs production config', description: 'AI performs config diff and confirms DATABASE_URL contains staging credentials and REDIS_HOST points to staging cluster. Cross-environment contamination would affect 3 production services.', type: 'analyze', metrics: [{ label: 'Mismatched vars', value: '2', trend: 'up', color: '#ef4444' }, { label: 'Environment', value: 'STAGING in PROD', trend: 'up', color: '#f59e0b' }] },
      { time: 'T+5s', title: 'Operator + platform team notified', description: 'Slack notification with full config diff showing staging vs production values. Config push rejection logged in audit trail.', type: 'integrate', integrations: [{ name: 'Slack', icon: <SlackIcon size={14} />, action: '#config-incidents alerted' }, { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'Audit trail logged' }] },
      { time: 'T+6s', title: 'Config push blocked', description: 'Config push rejected before any variables reach production services. Operator shown the specific variables that failed validation with correct production values suggested.', type: 'action', integrations: [{ name: 'Config Svc', icon: <K8sIcon size={14} />, action: 'Push rejected' }] },
      { time: 'T+8s', title: 'Zero disruption — config guarded', description: 'No services received incorrect configuration. Production database connections were never interrupted. Environment validation guard prevents this class of error permanently.', type: 'resolve', metrics: [{ label: 'Downtime', value: '0s', trend: 'down', color: '#22c55e' }, { label: 'Services affected', value: '0', trend: 'stable', color: '#22c55e' }] },
    ],
    outcome: { mttr: '0s — prevented', impactReduction: '100%', servicesProtected: 3 },
  },
  {
    id: 'artifact-corruption',
    title: 'Deployment Artifact Corruption',
    subtitle: 'Corrupted Docker image layer detected by pre-deploy integrity check — deployment blocked before any pods start',
    category: 'Artifacts',
    categoryColor: '#f59e0b',
    affectedGraph: [
      { id: 'shipping', label: 'Shipping', status: 'affected' },
      { id: 'orders', label: 'Orders', status: 'cascade' },
      { id: 'notify', label: 'Notifications', status: 'cascade' },
      { id: 'sendgrid', label: 'SendGrid', status: 'cascade' },
      { id: 'gateway', label: 'Gateway', status: 'healthy' },
      { id: 'audit', label: 'Audit Log', status: 'healthy' },
    ],
    timeline: [
      { time: 'T+0s', title: 'Docker image pushed to registry', description: 'CI pipeline builds shipping-svc:v1.5.0 (sha256:a3f8c2…, 142MB). Image pushed to container registry as build #3847.', type: 'trigger', integrations: [{ name: 'GitHub Actions', icon: <GithubIcon size={14} />, action: 'Build #3847 pushed' }, { name: 'Docker Registry', icon: <DockerIcon size={14} />, action: 'Image stored' }] },
      { time: 'T+5s', title: 'Pre-deploy artifact integrity check', description: 'Before any pods are created, DeployTitan pulls the image manifest and compares each layer checksum against the CI build output. Layer sha256:7b2e… does not match the build manifest.', type: 'detect', metrics: [{ label: 'Checksum', value: 'MISMATCH', trend: 'up', color: '#ef4444' }, { label: 'Corrupt layers', value: '1 of 12', trend: 'up', color: '#ef4444' }] },
      { time: 'T+7s', title: 'AI identifies registry corruption', description: 'AI compares image layers against build manifest. Layer sha256:7b2e… was corrupted during upload to registry. Build environment was healthy — issue occurred in transit.', type: 'analyze', metrics: [{ label: 'Build health', value: 'OK', trend: 'stable', color: '#22c55e' }, { label: 'Registry upload', value: 'CORRUPT', trend: 'up', color: '#ef4444' }] },
      { time: 'T+9s', title: 'Shipping team + CI pipeline alerted', description: 'Slack alert with checksum comparison. PagerDuty incident for shipping team. CI pipeline automatically triggered for rebuild with verified upload.', type: 'integrate', integrations: [{ name: 'Slack', icon: <SlackIcon size={14} />, action: '#shipping-alerts notified' }, { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'Shipping team paged' }, { name: 'GitHub Actions', icon: <GithubIcon size={14} />, action: 'Rebuild triggered' }] },
      { time: 'T+10s', title: 'Deployment blocked — zero pods started', description: 'Deployment never begins. shipping-svc remains on v1.4.5 serving 100% traffic. Corrupted image tagged as quarantined in registry. No pods were ever started with the bad image.', type: 'action', integrations: [{ name: 'DeployTitan', icon: <ShieldIcon size={14} />, action: 'Deployment blocked pre-rollout' }] },
      { time: 'T+12s', title: 'Service unaffected — image quarantined', description: 'shipping-svc healthy on v1.4.5. Order fulfillment pipeline was never disrupted. Corrupted image quarantined for forensic analysis. Verified rebuild in progress.', type: 'resolve', metrics: [{ label: 'Pods affected', value: '0', trend: 'stable', color: '#22c55e' }, { label: 'Orders disrupted', value: '0', trend: 'stable', color: '#22c55e' }] },
    ],
    outcome: { mttr: '0s — prevented', impactReduction: '100%', servicesProtected: 3 },
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
      { time: 'T+0s', title: 'Automated cert renewal', description: 'Cert-manager automatically renews wildcard *.deploytitan.io certificate. New cert is issued but intermediate CA bundle is missing from the chain.', type: 'trigger', integrations: [{ name: "Let's Encrypt", icon: <ShieldIcon size={14} />, action: 'Cert issued' }, { name: 'cert-manager', icon: <K8sIcon size={14} />, action: 'Renewal triggered' }] },
      { time: 'T+8s', title: 'mTLS handshake failures detected', description: 'mTLS handshake failures across 3 services. Certificate chain validation error: intermediate CA missing. 100% inter-service call failure.', type: 'detect', metrics: [{ label: 'mTLS failures', value: '100%', trend: 'up', color: '#ef4444' }, { label: 'Services affected', value: '3', trend: 'up', color: '#ef4444' }] },
      { time: 'T+12s', title: 'AI identifies missing CA bundle', description: 'AI analyzes TLS error logs and cert chain. Identifies that cert-manager issued certificate without intermediate CA bundle. Root cause: ACME issuer config change.', type: 'analyze' },
      { time: 'T+14s', title: 'Security team alerted', description: 'Critical Slack alert to #security-ops. PagerDuty incident with full cert chain analysis. Datadog TLS error dashboard auto-updated.', type: 'integrate', integrations: [{ name: 'Slack', icon: <SlackIcon size={14} />, action: '#security-ops CRITICAL' }, { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'P0 incident created' }, { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'TLS dashboard flagged' }] },
      { time: 'T+18s', title: 'Previous cert bundle restored', description: 'Restoring previous certificate bundle with valid intermediate CA chain. Kubernetes secrets updated, waiting for ingress controllers and service mesh proxies to pick up new certs.', type: 'action', integrations: [{ name: 'Kubernetes', icon: <K8sIcon size={14} />, action: 'Secrets updated' }, { name: 'cert-manager', icon: <ShieldIcon size={14} />, action: 'Cert rollback' }] },
      { time: 'T+45s', title: 'mTLS fully restored', description: 'All inter-service mTLS connections re-established after proxy cert reload. cert-manager config flagged for CA bundle inclusion. Preventive alert added for future renewals.', type: 'resolve', metrics: [{ label: 'Recovery', value: '45s', trend: 'down', color: '#22c55e' }, { label: 'Cert chain', value: 'VALID', trend: 'stable', color: '#22c55e' }] },
    ],
    outcome: { mttr: '45 seconds', impactReduction: '100%', servicesProtected: 3 },
  },
  {
    id: 'feature-flag',
    title: 'Feature Flag Misconfiguration',
    subtitle: 'NEW_CHECKOUT_FLOW flag change intercepted — blocked before propagation because payment-api v2.1.0 is not yet deployed',
    category: 'Config',
    categoryColor: '#8b5cf6',
    affectedGraph: [
      { id: 'config', label: 'Config Svc', status: 'affected' },
      { id: 'payment', label: 'Payment API', status: 'healthy' },
      { id: 'orders', label: 'Orders', status: 'healthy' },
      { id: 'checkout', label: 'Checkout UI', status: 'healthy' },
      { id: 'stripe', label: 'Stripe Int.', status: 'healthy' },
      { id: 'analytics', label: 'Analytics', status: 'healthy' },
    ],
    timeline: [
      { time: 'T+0s', title: 'Feature flag change requested', description: 'Operator requests NEW_CHECKOUT_FLOW flag change from 5% canary to 100%. Before propagating to any service, DeployTitan intercepts the change for dependency validation.', type: 'trigger', integrations: [{ name: 'LaunchDarkly', icon: <K8sIcon size={14} />, action: 'Flag change intercepted' }] },
      { time: 'T+2s', title: 'Pre-apply dependency validation', description: 'DeployTitan checks NEW_CHECKOUT_FLOW dependencies against live service versions. Discovers the flag requires payment-api v2.1.0 but only v2.0.5 is deployed. Flag cannot safely apply.', type: 'detect', metrics: [{ label: 'Required version', value: 'v2.1.0', trend: 'stable', color: '#f59e0b' }, { label: 'Current version', value: 'v2.0.5', trend: 'stable', color: '#ef4444' }] },
      { time: 'T+3s', title: 'AI maps flag dependency chain', description: 'AI traces the flag\'s code paths across 3 services. NEW_CHECKOUT_FLOW enables a new payment form in checkout-ui that calls payment-api endpoints only available in v2.1.0. Enabling now would cause 500 errors for all checkout traffic.', type: 'analyze', metrics: [{ label: 'Missing endpoints', value: '3', trend: 'up', color: '#ef4444' }, { label: 'Traffic at risk', value: '100%', trend: 'up', color: '#ef4444' }] },
      { time: 'T+4s', title: 'Operator + platform team notified', description: 'Slack notification with full dependency analysis showing which service versions are required. Flag change rejection logged in audit trail with specific remediation steps.', type: 'integrate', integrations: [{ name: 'Slack', icon: <SlackIcon size={14} />, action: '#deploy-incidents notified' }, { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'Audit trail logged' }] },
      { time: 'T+5s', title: 'Flag change blocked pre-propagation', description: 'Flag remains at 5% canary. No services received the updated flag value. Operator shown the required deployment order: deploy payment-api v2.1.0 first, then enable flag.', type: 'action', integrations: [{ name: 'LaunchDarkly', icon: <K8sIcon size={14} />, action: 'Flag change rejected' }] },
      { time: 'T+6s', title: 'Zero disruption — flag guarded', description: 'No revenue impact. Payment flow uninterrupted. Dependency guard now permanently links NEW_CHECKOUT_FLOW to payment-api >= v2.1.0, preventing this class of misconfiguration.', type: 'resolve', metrics: [{ label: 'Downtime', value: '0s', trend: 'down', color: '#22c55e' }, { label: 'Revenue impact', value: '$0', trend: 'stable', color: '#22c55e' }] },
    ],
    outcome: { mttr: '0s — prevented', impactReduction: '100%', servicesProtected: 3 },
  },
  {
    id: 'resource-contention',
    title: 'Resource Contention',
    subtitle: 'Catalog service v4.2.0 introduces a new query pattern that exhausts the shared database connection pool',
    category: 'Code Deploy',
    categoryColor: '#3b82f6',
    affectedGraph: [
      { id: 'catalog', label: 'Catalog', status: 'affected' },
      { id: 'inventory', label: 'Inventory', status: 'cascade' },
      { id: 'search', label: 'Search API', status: 'cascade' },
      { id: 'pricing', label: 'Pricing', status: 'cascade' },
      { id: 'recommend', label: 'Recommend', status: 'healthy' },
      { id: 'cache', label: 'Cache', status: 'healthy' },
    ],
    timeline: [
      { time: 'T+0s', title: 'Canary deploy started', description: 'catalog-svc v4.2.0 "performance optimization" PR merged and canary deployment begins at 10% traffic. New query pattern introduces connection-heavy bulk fetches.', type: 'trigger', integrations: [{ name: 'GitHub', icon: <GithubIcon size={14} />, action: 'PR #987 merged' }, { name: 'Kubernetes', icon: <K8sIcon size={14} />, action: 'Canary at 10%' }] },
      { time: 'T+90s', title: 'Connection pool saturation detected', description: 'DB connection pool hits 95% utilization. New query pattern holds connections 4x longer than previous version. Inventory-svc and search-api start timing out on shared pool.', type: 'detect', metrics: [{ label: 'Pool usage', value: '95%', trend: 'up', color: '#ef4444' }, { label: 'P95 latency', value: '+340%', trend: 'up', color: '#ef4444' }] },
      { time: 'T+93s', title: 'AI traces resource contention pattern', description: 'AI correlates pool exhaustion with catalog-svc canary. Identifies the new bulk-fetch query as root cause — each request opens 3 connections vs previous 1. At 10% traffic, already consuming 40% of pool.', type: 'analyze', metrics: [{ label: 'Conn per req', value: '3x', trend: 'up', color: '#ef4444' }, { label: 'Projected 100%', value: 'POOL FULL', trend: 'up', color: '#ef4444' }] },
      { time: 'T+95s', title: 'Platform + database team alerted', description: 'Slack alert to #platform-eng with connection pool dashboard. PagerDuty incident for DBA on-call. Datadog DB metrics auto-tagged with incident.', type: 'integrate', integrations: [{ name: 'Slack', icon: <SlackIcon size={14} />, action: '#platform-eng alerted' }, { name: 'PagerDuty', icon: <PagerDutyIcon size={14} />, action: 'DBA on-call paged' }, { name: 'Datadog', icon: <DatadogIcon size={14} />, action: 'DB dashboard tagged' }] },
      { time: 'T+97s', title: 'Emergency rollback + connection drain', description: 'catalog-svc canary drained and reverted to v4.1.2. Connection pool begins recovering as leaked connections time out. Search and inventory latency normalizing.', type: 'action', integrations: [{ name: 'Kubernetes', icon: <K8sIcon size={14} />, action: 'Canary rolled back' }, { name: 'PostgreSQL', icon: <DatabaseIcon size={14} />, action: 'Idle connections reaped' }] },
      { time: 'T+120s', title: 'Pool recovered — latency normalized', description: 'Connection pool back to 35% utilization. All dependent services healthy. PR flagged for connection pooling review — must use connection-per-transaction pattern.', type: 'resolve', metrics: [{ label: 'Pool usage', value: '35%', trend: 'down', color: '#22c55e' }, { label: 'P95 latency', value: 'NORMAL', trend: 'down', color: '#22c55e' }] },
    ],
    outcome: { mttr: '120 seconds', impactReduction: '100%', servicesProtected: 3 },
  },
]

/* ========== Deep Dive Modal Sub-components ========== */

function ImpactGraph({ nodes, activeStep }: { nodes: ScenarioDeepDiveData['affectedGraph']; activeStep: number }) {
  const positions = [
    { x: 60, y: 35 }, { x: 150, y: 35 }, { x: 240, y: 35 },
    { x: 60, y: 100 }, { x: 150, y: 100 }, { x: 240, y: 100 },
  ]
  const edgeDefs = [
    { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 1, to: 3 },
    { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 4 }, { from: 2, to: 5 },
  ]

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
      <defs>
        <pattern id="dd-grid-wf" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0V30H0" fill="none" stroke={`${GOLD_RGBA},0.05)`} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="140" fill="url(#dd-grid-wf)" />
      {edgeDefs.map((e, i) => {
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
          <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke={isRecovered ? 'rgba(34,197,94,0.2)' : isDanger ? 'rgba(239,68,68,0.2)' : `${GOLD_RGBA},0.1)`}
            strokeWidth="1" strokeDasharray={isDanger ? '4 3' : 'none'}
            style={{ transition: 'all 0.5s' }}
          />
        )
      })}
      {nodes.map((node, i) => {
        const pos = positions[i]
        if (!pos) return null
        const status = getStepStatus(node)
        const s = statusStyles(status)
        return (
          <g key={node.id} style={{ transition: 'all 0.5s' }}>
            {status !== 'healthy' && (
              <circle cx={pos.x} cy={pos.y} r="18" fill="none" stroke={s.stroke} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" style={{ transition: 'all 0.5s' }} />
            )}
            <circle cx={pos.x} cy={pos.y} r="13" fill={s.fill} stroke={s.stroke} strokeWidth="1" style={{ transition: 'all 0.5s' }} />
            <circle cx={pos.x + 9} cy={pos.y - 9} r="3" fill={s.dot} opacity="0.8" style={{ transition: 'all 0.5s' }}>
              {(status === 'affected' || status === 'cascade') && (
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
              )}
            </circle>
            <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fontWeight="500"
              fill={status === 'recovered' ? '#22c55e' : status !== 'healthy' ? '#ef4444' : 'var(--color-ink-secondary)'}
              style={{ transition: 'fill 0.5s' }}>
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function TimelineStepCard({ step, isActive, isComplete }: { step: TimelineStep; isActive: boolean; isComplete: boolean }) {
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
    <div className={cn('relative pl-8 pb-8 transition-all duration-500', isActive ? 'opacity-100' : isComplete ? 'opacity-60' : 'opacity-25')}>
      <div className="absolute left-[11px] top-6 bottom-0 w-px transition-all duration-500"
        style={{ background: isComplete || isActive ? `linear-gradient(to bottom, ${tc.dot}, ${GOLD_RGBA},0.15))` : 'var(--color-line-subtle)' }} />
      <div className="absolute left-0 top-1 w-[23px] h-[23px] flex items-center justify-center border-2 transition-all duration-500 z-10"
        style={{ borderRadius: '2px', borderColor: isActive ? tc.dot : isComplete ? `${tc.dot}60` : 'var(--color-line)', background: isActive ? tc.bg : 'var(--color-surface)', boxShadow: isActive ? `0 0 12px ${tc.dot}20` : 'none' }}>
        <div className="w-2 h-2 transition-all duration-500" style={{ borderRadius: '1px', background: isActive || isComplete ? tc.dot : 'var(--color-line)' }}>
          {isActive && <div className="w-full h-full" style={{ borderRadius: '1px', animation: 'pulse-anim 1.5s infinite', background: tc.dot }} />}
        </div>
      </div>
      <div className="border transition-all duration-500 overflow-hidden" style={{ borderRadius: '2px', borderColor: isActive ? tc.border : 'var(--color-line-subtle)', background: isActive ? tc.bg : 'transparent' }}>
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: isActive ? tc.border : 'var(--color-line-subtle)' }}>
          <span className="text-[10px] font-mono font-medium" style={{ color: tc.dot }}>{step.time}</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 tracking-wider" style={{ borderRadius: '1px', background: `${tc.dot}15`, color: tc.dot }}>{tc.label}</span>
          <span className="text-sm font-medium text-ink ml-1">{step.title}</span>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-ink-secondary leading-relaxed mb-3">{step.description}</p>
          {step.integrations && step.integrations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {step.integrations.map((int, i) => (
                <div key={i} className={cn('flex items-center gap-2 px-2.5 py-1.5 border text-ink-secondary transition-all duration-300', isActive ? 'dd-integration-pulse' : '')}
                  style={{ borderRadius: '2px', borderColor: isActive ? `${GOLD_RGBA},0.25)` : 'var(--color-line-subtle)', background: isActive ? 'rgba(255,255,255,0.7)' : 'transparent', animationDelay: `${i * 0.2}s` }}>
                  <span style={{ color: isActive ? GOLD : 'var(--color-ink-tertiary)' }}>{int.icon}</span>
                  <span className="text-[10px] font-mono">
                    <span className="font-medium text-ink">{int.name}</span>
                    <span className="text-ink-tertiary ml-1.5">· {int.action}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
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

/* ========== Deep Dive Modal ========== */

function DeepDiveModal({ data, onClose }: { data: ScenarioDeepDiveData; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    requestAnimationFrame(() => setOpen(true))
    document.body.classList.add('modal-open')
    return () => { document.body.classList.remove('modal-open') }
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setTimeout(onClose, 250)
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  // Auto-advance steps
  useEffect(() => {
    if (!isAutoPlaying) return
    const advanceStep = () => {
      setActiveStep(prev => {
        const maxStep = data.timeline.length - 1
        if (prev >= maxStep) return maxStep // Stop at end
        return prev + 1
      })
    }
    timerRef.current = setTimeout(advanceStep, activeStep === 0 ? 2500 : 3000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeStep, isAutoPlaying, data.timeline.length])

  const goToStep = useCallback((index: number) => {
    setIsAutoPlaying(false)
    setActiveStep(index)
  }, [])

  return (
    <div className={`cap-modal-backdrop ${open ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}>
      <div className="cap-modal-panel" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface-alt/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-mono px-2 py-0.5 tracking-wider border" style={{ borderRadius: '1px', borderColor: `${data.categoryColor}30`, color: data.categoryColor, background: `${data.categoryColor}08` }}>
                {data.category}
              </span>
              <span className="text-[10px] font-mono text-ink-tertiary">DEEP DIVE</span>
            </div>
            <h3 className="text-lg font-display font-medium text-ink">{data.title}</h3>
            <p className="text-sm text-ink-secondary mt-0.5">{data.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            {/* Step progress */}
            <div className="hidden md:flex items-center gap-1">
              {data.timeline.map((_, i) => (
                <button key={i} onClick={() => goToStep(i)} className="group relative cursor-pointer">
                  <div className="w-6 h-1.5 transition-all duration-300" style={{
                    borderRadius: '1px',
                    background: i === activeStep ? GOLD : i < activeStep ? `${GOLD_RGBA},0.3)` : 'var(--color-line-subtle)',
                  }} />
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono" style={{ color: GOLD }}>STEP {activeStep + 1}/{data.timeline.length}</span>
            <button onClick={handleClose}
              className="shrink-0 w-8 h-8 flex items-center justify-center text-ink-tertiary hover:text-ink border border-line hover:border-gold/30 transition-colors bg-white cursor-pointer"
              style={{ borderRadius: '2px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-[1fr_300px]">
          {/* Left: Timeline */}
          <div className="p-6 border-r border-line overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <div className="space-y-0">
              {data.timeline.map((step, i) => (
                <div key={i} onClick={() => goToStep(i)} className="cursor-pointer">
                  <TimelineStepCard step={step} isActive={i === activeStep} isComplete={i < activeStep} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Impact graph + outcome */}
          <div className="p-6 bg-surface-alt/20 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <div className="space-y-6">
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
                  <ImpactGraph nodes={data.affectedGraph} activeStep={activeStep} />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {[{ label: 'Healthy', color: '#22c55e' }, { label: 'Affected', color: '#ef4444' }, { label: 'Cascade', color: 'rgba(239,68,68,0.5)' }, { label: 'Recovered', color: '#22c55e' }].map(l => (
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
                    <span className="text-sm font-mono font-medium" style={{ color: GOLD }}>{data.outcome.mttr}</span>
                  </div>
                  <div className="h-px bg-line-subtle" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-secondary">Impact Reduction</span>
                    <span className="text-sm font-mono font-medium text-signal-success">{data.outcome.impactReduction}</span>
                  </div>
                  <div className="h-px bg-line-subtle" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-secondary">Services Protected</span>
                    <span className="text-sm font-mono font-medium" style={{ color: GOLD }}>{data.outcome.servicesProtected}</span>
                  </div>
                </div>
              </div>

              {/* Integrations used */}
              <div className="border border-line bg-white p-4" style={{ borderRadius: '2px' }}>
                <span className="text-[10px] font-mono tracking-wider text-ink-tertiary mb-3 block">INTEGRATIONS USED</span>
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    const allIntegrations = new Map<string, ReactNode>()
                    data.timeline.forEach(step => {
                      step.integrations?.forEach(int => {
                        if (!allIntegrations.has(int.name)) allIntegrations.set(int.name, int.icon)
                      })
                    })
                    return Array.from(allIntegrations.entries()).map(([name, icon]) => (
                      <div key={name} className="flex items-center gap-1.5 px-2 py-1 border border-line-subtle text-ink-secondary hover:border-gold/20 hover:bg-gold-muted transition-all"
                        style={{ borderRadius: '2px' }}>
                        <span style={{ color: 'var(--color-ink-tertiary)' }}>{icon}</span>
                        <span className="text-[10px] font-mono">{name}</span>
                      </div>
                    ))
                  })()}
                </div>
              </div>

              {/* Auto-play toggle */}
              <button onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-1.5 text-[10px] font-mono text-ink-tertiary hover:text-ink transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5" style={{ borderRadius: '1px', background: isAutoPlaying ? GOLD : 'var(--color-line)', animation: isAutoPlaying ? 'pulse-anim 1.5s infinite' : 'none' }} />
                {isAutoPlaying ? 'AUTO-PLAYING' : 'PAUSED'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========== AI Indicator ========== */

function AiAnalysisIndicator({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderRadius: '2px', borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
      <div className="relative w-4 h-4">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#c9a84c' }}>
          <circle cx="8" cy="2" r="1.5" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="2" cy="8" r="1.5" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.2s" begin="0.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="14" cy="8" r="1.5" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="8" cy="14" r="1.5" fill="currentColor" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="8" cy="8" r="2" fill="currentColor">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <line x1="8" y1="3.5" x2="8" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
          <line x1="3.5" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
          <line x1="10" y1="8" x2="12.5" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
          <line x1="8" y1="10" x2="8" y2="12.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        </svg>
      </div>
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider font-medium" style={{ color: '#c9a84c' }}>AI Analyzing</span>
        <div className="flex gap-0.5 mt-0.5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-0.5"
              style={{ height: `${3 + Math.random() * 5}px`, backgroundColor: '#c9a84c', opacity: 0.5, borderRadius: '0.5px', animation: `pulse-anim 0.8s infinite ${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ========== Mini Graph ========== */

function MiniGraph({ services: svcs }: { services: ServiceState[] }) {
  const connDefs = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 },
    { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
  ]

  function pos(i: number) {
    const x = 10 + (i % 3) * 30 + (i >= 3 ? 15 : 0)
    const y = i < 3 ? 15 : 45
    return { x, y }
  }

  return (
    <div className="relative h-32 w-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={i * 16.6} y1="0" x2={i * 16.6} y2="60" stroke="rgba(201,168,76,0.04)" strokeWidth="0.2"/>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="100" y2={i * 20} stroke="rgba(201,168,76,0.04)" strokeWidth="0.2"/>
        ))}
        {connDefs.map((c, i) => {
          const f = pos(c.from)
          const t = pos(c.to)
          const fSvc = svcs[c.from]
          const tSvc = svcs[c.to]
          const active = fSvc.status !== 'idle' || tSvc.status !== 'idle'
          const isDanger = active && (fSvc.status === 'warning' || tSvc.status === 'warning' || fSvc.status === 'cascade' || tSvc.status === 'cascade')
          return (
            <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke={isDanger ? '#ef4444' : active ? '#3b82f6' : 'rgba(8,5,3,0.06)'}
              strokeWidth={active ? '0.4' : '0.15'}
              strokeDasharray={(active && (fSvc.status === 'cascade' || tSvc.status === 'cascade')) ? '1 1' : 'none'}
              style={{ transition: 'all 0.3s' }} />
          )
        })}
        {svcs.map((svc, i) => {
          const { x, y } = pos(i)
          let fill = 'rgba(8,5,3,0.03)'
          let stroke = 'rgba(8,5,3,0.12)'
          if (svc.status === 'warning') { fill = 'rgba(239,68,68,0.12)'; stroke = '#ef4444' }
          else if (svc.status === 'cascade') { fill = 'rgba(239,68,68,0.06)'; stroke = 'rgba(239,68,68,0.35)' }
          else if (svc.status === 'deploying') { fill = 'rgba(59,130,246,0.12)'; stroke = '#3b82f6' }
          else if (svc.status === 'rollback') { fill = 'rgba(201,168,76,0.12)'; stroke = '#c9a84c' }
          else if (svc.status === 'healthy') { fill = 'rgba(34,197,94,0.12)'; stroke = '#22c55e' }
          return (
            <g key={svc.name} transform={`translate(${x}, ${y})`}>
              <circle r="7" fill="none" stroke={stroke} strokeWidth="0.15" strokeDasharray="0.6 0.4" opacity="0.4" style={{ transition: 'all 0.3s' }} />
              <circle r="5.5" fill={fill} stroke={stroke} strokeWidth="0.4" style={{ transition: 'all 0.3s' }}/>
              <text y="1" fill="rgba(8,5,3,0.5)" fontSize="2.8" fontFamily="var(--font-mono)" fontWeight="500" textAnchor="middle">{svc.shortName}</text>
              {(svc.status === 'warning' || svc.status === 'cascade') && (
                <circle r="1.5" cy="-3.5" fill="#ef4444">
                  <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
                </circle>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ========== WorkflowAnimation ========== */

export function WorkflowAnimation() {
  const ref = useScrollReveal()
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [currentStage, setCurrentStage] = useState<Stage>('merge')
  const [svcStates, setSvcStates] = useState<ServiceState[]>(scenarios[0].services)
  const [visibleLogs, setVisibleLogs] = useState(0)
  const logRef = useRef<HTMLDivElement>(null)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPausedRef = useRef(false)
  const [deepDiveIdx, setDeepDiveIdx] = useState<number | null>(null)

  const scenario = scenarios[scenarioIdx]
  const currentStageIndex = defaultStages.findIndex((s) => s.id === currentStage)

  const stageConfigs: StageConfig[] = defaultStages.map((s) => ({
    id: s.id,
    label: scenario.stageLabels?.[s.id] ?? s.label,
  }))

  const goToScenario = useCallback((idx: number) => {
    isPausedRef.current = true
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => {
      isPausedRef.current = false
    }, 20000)
    setScenarioIdx(((idx % scenarios.length) + scenarios.length) % scenarios.length)
  }, [])

  const goPrev = useCallback(() => {
    goToScenario(scenarioIdx - 1)
  }, [scenarioIdx, goToScenario])

  const goNext = useCallback(() => {
    goToScenario(scenarioIdx + 1)
  }, [scenarioIdx, goToScenario])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const sc = scenarios[scenarioIdx]
      setSvcStates(sc.services.map((s) => ({ ...s, status: 'idle' })))
      setVisibleLogs(0)
      setCurrentStage('merge')
      await sleep(1500)
      if (cancelled) return
      setVisibleLogs(1)

      setCurrentStage('deploy')
      setSvcStates((prev) =>
        prev.map((s) => (sc.affectedServices.includes(s.name) ? { ...s, status: 'deploying' } : s))
      )
      await sleep(2000)
      if (cancelled) return
      setVisibleLogs(2)

      setCurrentStage('detect')
      setSvcStates((prev) =>
        prev.map((s) => (sc.affectedServices.includes(s.name) ? { ...s, status: 'warning' } : s))
      )
      await sleep(2000)
      if (cancelled) return
      setVisibleLogs(3)

      setCurrentStage('analyze')
      setSvcStates((prev) =>
        prev.map((s) => (sc.cascadeServices.includes(s.name) ? { ...s, status: 'cascade' } : s))
      )
      await sleep(2500)
      if (cancelled) return
      setVisibleLogs(4)

      setCurrentStage('heal')
      setSvcStates((prev) =>
        prev.map((s) =>
          sc.rollbackServices.includes(s.name) ? { ...s, status: 'rollback' } :
          sc.cascadeServices.includes(s.name) ? { ...s, status: 'idle' } : s
        )
      )
      await sleep(2000)
      if (cancelled) return
      setVisibleLogs(5)

      setCurrentStage('complete')
      setSvcStates((prev) => prev.map((s) => ({ ...s, status: 'healthy' })))
      await sleep(2000)
      if (cancelled) return
      setVisibleLogs(6)

      await sleep(2000)
      if (cancelled) return
      if (!isPausedRef.current) {
        setScenarioIdx((i) => (i + 1) % scenarios.length)
      }
    }
    run()
    return () => { cancelled = true }
  }, [scenarioIdx])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [visibleLogs])

  let badgeClass = 'bg-surface-alt text-ink-tertiary border-line'
  let badgeText = 'Monitoring'
  if (currentStage === 'detect' || currentStage === 'analyze') {
    badgeClass = 'bg-signal-danger/10 text-signal-danger border-signal-danger/30'
    badgeText = 'Issue Detected'
  } else if (currentStage === 'heal') {
    badgeClass = 'text-ink border-gold/30'
    badgeText = 'Auto-Healing'
    badgeClass += ' bg-gold-muted'
  } else if (currentStage === 'complete') {
    badgeClass = 'bg-signal-success/10 text-signal-success border-signal-success/30'
    badgeText = 'Protected'
  }

  return (
    <section id="how-it-works" className="py-24 lg:py-32 border-t border-line" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <span data-reveal className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
          <span className="w-8 h-px bg-gold/30" />
          How it works
        </span>

        <h2 data-reveal data-reveal-delay="1" className="font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08] mb-5 max-w-2xl">
          Watch autonomous protection{' '}
          <span className="text-ink-secondary">in action.</span>
        </h2>

        <p data-reveal data-reveal-delay="2" className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-16 lg:mb-20">
          Real failure scenarios — from breaking schema changes to secret rotations, env variable mismatches to artifact corruption — detected and mitigated automatically.
        </p>

        {/* Scenario header */}
        <div data-reveal data-reveal-delay="3" className="flex items-center justify-between mb-8 pb-4 border-b border-line">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-mono tracking-wider" style={{ color: '#c9a84c' }}>SCENARIO {scenarioIdx + 1}/{scenarios.length}</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 tracking-wider border" style={{ borderRadius: '1px', borderColor: 'rgba(201,168,76,0.2)', color: 'rgba(201,168,76,0.6)' }}>
                {scenario.category}
              </span>
              <div className="flex gap-0.5">
                {scenarios.map((_, i) => (
                  <div key={i} className="w-1 h-1 transition-colors" style={{
                    backgroundColor: i === scenarioIdx ? '#c9a84c' : 'rgba(8,5,3,0.08)',
                    borderRadius: '0.5px',
                  }} />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-display font-medium">{scenario.title}</h3>
            <p className="text-sm text-ink-secondary mt-1">{scenario.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            {/* Deep Dive button */}
            <button
              onClick={() => setDeepDiveIdx(scenarioIdx)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono border border-gold/20 text-gold hover:bg-gold-muted hover:border-gold/40 transition-all cursor-pointer"
              style={{ borderRadius: '2px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              DEEP DIVE
            </button>
            {/* Prev/Next arrows */}
            <button
              onClick={goPrev}
              className="w-8 h-8 flex items-center justify-center border border-line bg-white text-ink-tertiary hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
              style={{ borderRadius: '2px' }}
              aria-label="Previous scenario"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={goNext}
              className="w-8 h-8 flex items-center justify-center border border-line bg-white text-ink-tertiary hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
              style={{ borderRadius: '2px' }}
              aria-label="Next scenario"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <div className={cn('px-3 py-1.5 text-xs font-medium border transition-all', badgeClass)} style={{ borderRadius: '2px' }}>
              {badgeText}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: mini graph + service list */}
          <div className="lg:col-span-2 border border-line bg-white p-6" style={{ borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(201,168,76,0.5)' }}>Dependency Graph</span>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-tertiary">
                  <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
                </svg>
                <span className="text-xs text-ink-tertiary">{svcStates.length} services</span>
              </div>
            </div>

            <MiniGraph services={svcStates} />

            <div className="mt-3">
              <AiAnalysisIndicator active={currentStage === 'analyze'} />
            </div>

            <div className="mt-4 pt-4 border-t border-line">
              <div className="grid grid-cols-2 gap-1.5">
                {svcStates.map((svc) => {
                  let bgStyle = ''
                  let dotBg = 'rgba(8,5,3,0.1)'
                  if (svc.status === 'warning') { bgStyle = 'rgba(239,68,68,0.05)'; dotBg = '#ef4444' }
                  else if (svc.status === 'cascade') { bgStyle = 'rgba(239,68,68,0.03)'; dotBg = 'rgba(239,68,68,0.4)' }
                  else if (svc.status === 'deploying') { bgStyle = 'rgba(59,130,246,0.05)'; dotBg = '#3b82f6' }
                  else if (svc.status === 'rollback') { bgStyle = 'rgba(201,168,76,0.06)'; dotBg = '#c9a84c' }
                  else if (svc.status === 'healthy') { bgStyle = 'rgba(34,197,94,0.03)'; dotBg = '#22c55e' }

                  return (
                    <div key={svc.name} className="flex items-center gap-2 px-2 py-1.5 text-xs transition-all" style={{ background: bgStyle, borderRadius: '1px' }}>
                      <div className="w-1.5 h-1.5 transition-colors" style={{
                        backgroundColor: dotBg,
                        borderRadius: '0.5px',
                        animation: (svc.status === 'warning' || svc.status === 'deploying') ? 'pulse-anim 1.5s infinite' : 'none',
                      }} />
                      <span className="font-mono text-ink-secondary truncate">{svc.name}</span>
                      <span className="text-ink-tertiary ml-auto text-[10px]">
                        {svc.status === 'deploying' && svc.newVersion ? svc.newVersion : svc.version}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Deep Dive button (mobile) */}
            <button
              onClick={() => setDeepDiveIdx(scenarioIdx)}
              className="sm:hidden mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono border border-gold/20 text-gold hover:bg-gold-muted hover:border-gold/40 transition-all cursor-pointer"
              style={{ borderRadius: '2px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              DEEP DIVE
            </button>
          </div>

          {/* Right: timeline + logs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Timeline — 2 rows on mobile, single row on lg */}
            <div className="pb-2">
              {/* Desktop: single row */}
              <div className="hidden lg:flex items-start justify-between">
                {stageConfigs.map((stage, index) => {
                  const isActive = index <= currentStageIndex
                  const isCurrent = stage.id === currentStage

                  let circleClass = 'bg-white border-line text-ink-tertiary'
                  if (isCurrent) {
                    if (stage.id === 'detect' || stage.id === 'analyze') circleClass = 'bg-signal-danger/10 border-signal-danger text-signal-danger scale-110'
                    else if (stage.id === 'heal') circleClass = 'border-gold text-gold bg-gold-muted scale-110'
                    else if (stage.id === 'complete') circleClass = 'bg-signal-success/10 border-signal-success text-signal-success scale-110'
                    else circleClass = 'bg-ink text-surface border-ink scale-110'
                  } else if (isActive) {
                    circleClass = 'bg-surface-alt border-ink/15 text-ink'
                  }

                  return (
                    <div key={stage.id} className="flex items-start flex-1 min-w-0" style={index === stageConfigs.length - 1 ? { flex: '0 0 auto' } : undefined}>
                      <div className="flex flex-col items-center shrink-0">
                        <div className={cn('w-10 h-10 flex items-center justify-center transition-all duration-300 border-2', circleClass)} style={{ borderRadius: '2px' }}>
                          {stageIcons[stage.id]}
                        </div>
                        <p className={cn('text-[10px] mt-2 font-medium transition-colors text-center whitespace-nowrap', isCurrent ? 'text-ink' : 'text-ink-tertiary')}>
                          {stage.label}
                        </p>
                      </div>
                      {index < stageConfigs.length - 1 && (
                        <div className="flex-1 flex items-center min-w-2" style={{ height: '40px' }}>
                          <div className="w-full h-px mx-1 overflow-hidden bg-line">
                            <div
                              className="h-full transition-all duration-500"
                              style={{
                                width: index < currentStageIndex ? '100%' : '0%',
                                backgroundColor: 'rgba(201,168,76,0.3)',
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Mobile: 2 rows of 3 */}
              <div className="flex flex-col gap-3 lg:hidden">
                {[0, 1].map((row) => {
                  const rowStages = stageConfigs.slice(row * 3, row * 3 + 3)
                  return (
                    <div key={row} className="flex items-start">
                      {rowStages.map((stage, ri) => {
                        const index = row * 3 + ri
                        const isActive = index <= currentStageIndex
                        const isCurrent = stage.id === currentStage

                        let circleClass = 'bg-white border-line text-ink-tertiary'
                        if (isCurrent) {
                          if (stage.id === 'detect' || stage.id === 'analyze') circleClass = 'bg-signal-danger/10 border-signal-danger text-signal-danger scale-110'
                          else if (stage.id === 'heal') circleClass = 'border-gold text-gold bg-gold-muted scale-110'
                          else if (stage.id === 'complete') circleClass = 'bg-signal-success/10 border-signal-success text-signal-success scale-110'
                          else circleClass = 'bg-ink text-surface border-ink scale-110'
                        } else if (isActive) {
                          circleClass = 'bg-surface-alt border-ink/15 text-ink'
                        }

                        const isLastInRow = ri === rowStages.length - 1

                        return (
                          <div key={stage.id} className="flex items-start flex-1 min-w-0" style={isLastInRow ? { flex: '0 0 auto' } : undefined}>
                            <div className="flex flex-col items-center shrink-0">
                              <div className={cn('w-10 h-10 flex items-center justify-center transition-all duration-300 border-2', circleClass)} style={{ borderRadius: '2px' }}>
                                {stageIcons[stage.id]}
                              </div>
                              <p className={cn('text-[10px] mt-2 font-medium transition-colors text-center whitespace-nowrap', isCurrent ? 'text-ink' : 'text-ink-tertiary')}>
                                {stage.label}
                              </p>
                            </div>
                            {!isLastInRow && (
                              <div className="flex-1 flex items-center min-w-2" style={{ height: '40px' }}>
                                <div className="w-full h-px mx-1 overflow-hidden bg-line">
                                  <div
                                    className="h-full transition-all duration-500"
                                    style={{
                                      width: index < currentStageIndex ? '100%' : '0%',
                                      backgroundColor: 'rgba(201,168,76,0.3)',
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Log output */}
            <div className="border border-line bg-ink/[0.01] overflow-hidden" style={{ borderRadius: '2px' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-surface-alt/60">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-tertiary">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(201,168,76,0.5)' }}>Guardrails Event Log</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5" style={{
                    backgroundColor:
                      currentStage === 'detect' || currentStage === 'analyze' ? '#ef4444' :
                      currentStage === 'heal' ? '#c9a84c' :
                      currentStage === 'complete' ? '#22c55e' : 'rgba(8,5,3,0.2)',
                    borderRadius: '0.5px',
                    animation: currentStage !== 'complete' ? 'pulse-anim 1.5s infinite' : 'none',
                  }} />
                  <span className="text-[10px] text-ink-tertiary font-mono">LIVE</span>
                </div>
              </div>

              <div ref={logRef} className="p-4 h-[220px] overflow-y-auto font-mono text-xs space-y-2">
                {scenario.logMessages.slice(0, visibleLogs).map((log, i) => {
                  let textColor = 'text-ink-secondary'
                  let logBadgeBg = 'bg-surface-alt text-ink-tertiary'
                  if (log.type === 'error') { textColor = 'text-signal-danger'; logBadgeBg = 'bg-signal-danger/10 text-signal-danger' }
                  else if (log.type === 'warning') { textColor = 'text-signal-warning'; logBadgeBg = 'bg-signal-warning/10 text-signal-warning' }
                  else if (log.type === 'success') { textColor = 'text-signal-success'; logBadgeBg = 'bg-signal-success/10 text-signal-success' }

                  return (
                    <div key={i} className={cn('flex items-start gap-3 log-entry', textColor)}>
                      <span className="text-ink-quaternary shrink-0 tabular-nums">
                        {new Date().toISOString().split('T')[1].split('.')[0]}
                      </span>
                      <span className={cn('shrink-0 px-1.5 py-0.5 text-[10px] font-medium uppercase', logBadgeBg)} style={{ borderRadius: '1px' }}>
                        {log.type}
                      </span>
                      <span className="leading-relaxed">{log.message}</span>
                    </div>
                  )
                })}
                {visibleLogs < scenario.logMessages.length && (
                  <div className="flex items-center gap-2 text-ink-tertiary">
                    <div className="w-1 h-1 bg-current" style={{ borderRadius: '0.5px', animation: 'pulse-anim 1.5s infinite' }} />
                    <div className="w-1 h-1 bg-current" style={{ borderRadius: '0.5px', animation: 'pulse-anim 1.5s infinite 0.1s' }} />
                    <div className="w-1 h-1 bg-current" style={{ borderRadius: '0.5px', animation: 'pulse-anim 1.5s infinite 0.2s' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Modal */}
      {deepDiveIdx !== null && deepDiveData[deepDiveIdx] && (
        <DeepDiveModal data={deepDiveData[deepDiveIdx]} onClose={() => setDeepDiveIdx(null)} />
      )}
    </section>
  )
}
