/**
 * siteGraph.meta.ts
 *
 * Manual metadata layer merged on top of vite-plugin-link-graph's auto-generated nodes.
 * Add any node here to:
 *   - Override the group (colour category)
 *   - Set a display weight (affects node size in the graph)
 *   - Add a short description shown in the hover tooltip
 *   - Add cross-sell / related edges that the crawler can't auto-detect
 */

export type NodeGroup =
  | 'home'
  | 'product'
  | 'solution'
  | 'persona'
  | 'resource'
  | 'company'
  | 'trust'
  | 'legal'
  | 'developer'

export interface NodeMeta {
  id: string
  label?: string        // Override label from generated
  group: NodeGroup
  weight?: number       // 1–5; controls node radius (default 2)
  description?: string  // Tooltip copy
  emoji?: string        // Tiny icon rendered on node
}

export interface ExtraLink {
  source: string
  target: string
  kind: 'cross-sell' | 'related' | 'cta'
}

// ─── Node metadata ────────────────────────────────────────────────────────────

export const nodeMeta: NodeMeta[] = [
  // Home
  { id: '/', group: 'home', weight: 5, label: 'Home', description: 'DeployTitan landing page', emoji: '🏠' },

  // Products
  { id: '/products/titan-rollout',   group: 'product', weight: 5, label: 'Titan Rollouts',   description: 'Release coordination and rollback for distributed engineering teams' },
  { id: '/products/titan-foresight', group: 'product', weight: 3, label: 'Titan Foresight (Preview)', description: 'Rollouts Intelligence — pre-merge risk scoring & dependency analysis (preview)' },
  { id: '/products/titan-phoenix',   group: 'product', weight: 2, label: 'Titan Phoenix (Roadmap)',   description: 'SLO-triggered scoped rollback (roadmap)' },
  { id: '/products/titan-shield',    group: 'product', weight: 2, label: 'Titan Shield (Roadmap)',    description: 'Multi-cloud resilience (roadmap)' },
  { id: '/products/titan-ledger',    group: 'product', weight: 3, label: 'Titan Ledger',    description: 'DORA metrics & deploy telemetry — no agents' },
  { id: '/products/titan-insight',   group: 'product', weight: 2, label: 'Titan Insight (Roadmap)',   description: 'Deploy-to-metric correlation & outcome intelligence (roadmap)' },
  { id: '/products/titan-sandbox',   group: 'product', weight: 2, label: 'Titan Sandbox (Roadmap)',   description: 'Production-shaped environments per branch (roadmap)' },

  // Solutions
  { id: '/solutions',                          group: 'solution', weight: 3, label: 'Solutions Overview' },
  { id: '/solutions/release-coordination',     group: 'solution', weight: 4, label: 'Release Coordination',  description: 'Orchestrate multi-service releases end to end' },
  { id: '/solutions/rollback-coordination',    group: 'solution', weight: 3, label: 'Rollback Coordination', description: 'Safe, sequenced rollback across services' },
  { id: '/solutions/release-intelligence',     group: 'solution', weight: 3, label: 'Release Intelligence',  description: 'Visibility into every release in flight' },
  { id: '/solutions/platform-engineering',     group: 'solution', weight: 3, label: 'Platform Engineering',  description: 'Policy-as-code golden path' },

  // Personas
  { id: '/for/sre',    group: 'persona', weight: 2, label: 'For SREs' },
  { id: '/for/devops', group: 'persona', weight: 2, label: 'For DevOps' },
  { id: '/for/cto',    group: 'persona', weight: 2, label: 'For CTOs' },

  // Developer surface
  { id: '/docs',         group: 'developer', weight: 4, label: 'Documentation',    description: 'Quickstart, guides & API reference' },
  { id: '/integrations', group: 'developer', weight: 3, label: 'Integrations',     description: 'Kubernetes, GitHub Actions, Datadog & more' },
  { id: '/cli',          group: 'developer', weight: 3, label: 'CLI Reference',    description: 'The `dt` command-line tool' },
  { id: '/api-reference', group: 'developer', weight: 3, label: 'API Reference',    description: 'REST API & webhooks' },
  { id: '/roadmap',      group: 'developer', weight: 3, label: 'Roadmap',          description: 'Now / Next / Later — public roadmap' },
  { id: '/changelog',    group: 'developer', weight: 2, label: 'Changelog',        description: "What's new in each release" },
  { id: '/how-it-works', group: 'developer', weight: 2, label: 'How It Works' },

  // Resources
  { id: '/blog',          group: 'resource', weight: 2, label: 'Blog' },
  { id: '/customers',     group: 'resource', weight: 3, label: 'Customers',        description: 'Case studies & testimonials' },
  { id: '/early-access',  group: 'resource', weight: 3, label: 'Early Access',     description: 'Join the waitlist' },
  { id: '/pricing',       group: 'resource', weight: 3, label: 'Pricing' },
  { id: '/status',        group: 'resource', weight: 2, label: 'System Status' },

  // Company
  { id: '/about',    group: 'company', weight: 3, label: 'About' },
  { id: '/journey',  group: 'company', weight: 2, label: 'Our Journey' },
  { id: '/careers',  group: 'company', weight: 2, label: 'Careers' },
  { id: '/contact',  group: 'company', weight: 2, label: 'Contact' },
  { id: '/partners', group: 'company', weight: 2, label: 'Partners' },
  { id: '/press',    group: 'company', weight: 2, label: 'Press' },
  { id: '/brand',    group: 'company', weight: 1, label: 'Brand Assets' },

  // Trust & Compliance
  { id: '/security', group: 'trust', weight: 3, label: 'Security',  description: 'SOC 2, encryption, responsible disclosure' },

  // Legal
  { id: '/terms',   group: 'legal', weight: 1, label: 'Terms of Service' },
  { id: '/privacy', group: 'legal', weight: 1, label: 'Privacy Policy' },

  // Sitemap
  { id: '/sitemap', group: 'resource', weight: 2, label: 'Site Graph', description: 'Interactive site map' },
]

// ─── Group labels ─────────────────────────────────────────────────────────────

export const GROUP_LABELS: Record<NodeGroup, string> = {
  home:      'Home',
  product:   'Products',
  solution:  'Solutions',
  persona:   'For Teams',
  resource:  'Resources',
  company:   'Company',
  trust:     'Trust & Security',
  legal:     'Legal',
  developer: 'Developer',
}

// ─── Group colours (used by SiteGraph component) ─────────────────────────────

export const GROUP_COLORS: Record<NodeGroup, { light: string; dark: string }> = {
  home:      { light: '#c9a84c', dark: '#d4b454' },
  product:   { light: '#3b82f6', dark: '#60a5fa' },
  solution:  { light: '#22c55e', dark: '#4ade80' },
  persona:   { light: '#a855f7', dark: '#c084fc' },
  resource:  { light: '#06b6d4', dark: '#22d3ee' },
  company:   { light: '#78716c', dark: '#a8a09a' },
  trust:     { light: '#f59e0b', dark: '#fbbf24' },
  legal:     { light: '#9ca3af', dark: '#6b7280' },
  developer: { light: '#f97316', dark: '#fb923c' },
}

// ─── Extra manually-curated cross-sell links ─────────────────────────────────

export const extraLinks: ExtraLink[] = [
  // Product ↔ Solution cross-links
  { source: '/products/titan-rollout',   target: '/solutions/release-coordination',  kind: 'cross-sell' },
  { source: '/products/titan-rollout',   target: '/solutions/rollback-coordination', kind: 'cross-sell' },
  { source: '/products/titan-foresight', target: '/solutions/release-intelligence',  kind: 'cross-sell' },
  { source: '/solutions/platform-engineering', target: '/products/titan-rollout',    kind: 'related' },

  // Persona ↔ Product
  { source: '/for/sre',    target: '/products/titan-rollout',   kind: 'related' },
  { source: '/for/devops', target: '/products/titan-rollout',   kind: 'related' },
  { source: '/for/cto',    target: '/pricing',                  kind: 'related' },
  { source: '/for/cto',    target: '/security',                 kind: 'related' },

  // Developer ↔ Product
  { source: '/integrations', target: '/products/titan-rollout',  kind: 'related' },
  { source: '/cli',          target: '/docs',                    kind: 'related' },
  { source: '/api-reference', target: '/docs',                   kind: 'related' },
  { source: '/roadmap',      target: '/products/titan-foresight', kind: 'related' },
  { source: '/roadmap',      target: '/products/titan-phoenix',  kind: 'related' },
  { source: '/roadmap',      target: '/products/titan-insight',  kind: 'related' },
  { source: '/roadmap',      target: '/products/titan-sandbox',  kind: 'related' },
  { source: '/changelog',    target: '/blog',                    kind: 'related' },

  // Company
  { source: '/about',    target: '/journey',  kind: 'related' },
  { source: '/about',    target: '/careers',  kind: 'cta' },
  { source: '/careers',  target: '/contact',  kind: 'cta' },
  { source: '/press',    target: '/brand',    kind: 'related' },
  { source: '/partners', target: '/security', kind: 'related' },

  // Home → key CTAs
  { source: '/', target: '/early-access', kind: 'cta' },
  { source: '/', target: '/pricing',      kind: 'cta' },
  { source: '/', target: '/docs',         kind: 'cta' },
  { source: '/', target: '/customers',    kind: 'cta' },
]
