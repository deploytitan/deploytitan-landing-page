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

import { generatedNodes } from './siteGraph.generated'

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

const manualNodeMeta: NodeMeta[] = [
  // Home
  { id: '/', group: 'home', weight: 5, label: 'Home', description: 'DeployTitan landing page', emoji: '🏠' },

  // Products
  { id: '/products/titan-rollout',   group: 'product', weight: 5, label: 'Titan Rollouts',   description: 'Release coordination and rollback for distributed engineering teams' },
  { id: '/products/titan-foresight', group: 'product', weight: 3, label: 'Titan Foresight (Preview)', description: 'Rollouts Intelligence — pre-merge risk scoring & dependency analysis (preview)' },
  { id: '/products/titan-phoenix',   group: 'product', weight: 2, label: 'Titan Phoenix (Roadmap)',   description: 'SLO-triggered scoped rollback (roadmap)' },

  // Solutions
  { id: '/solutions',                          group: 'solution', weight: 3, label: 'Solutions Overview' },
  { id: '/solutions/release-coordination',     group: 'solution', weight: 4, label: 'Release Coordination',  description: 'Orchestrate multi-service releases end to end' },
  { id: '/solutions/instant-rollback',         group: 'solution', weight: 3, label: 'Instant Rollback',       description: 'Safe, sequenced rollback across services' },
  { id: '/solutions/risk-intelligence',        group: 'solution', weight: 3, label: 'Risk Intelligence',      description: 'Visibility into every release in flight' },
  { id: '/solutions/platform-engineering',     group: 'solution', weight: 3, label: 'Platform Engineering',  description: 'Policy-as-code golden path' },
  { id: '/solutions/progressive-delivery',     group: 'solution', weight: 3, label: 'Progressive Delivery',  description: 'Ship changes gradually with tighter release control' },

  // Personas
  { id: '/for/sre',    group: 'persona', weight: 2, label: 'For SREs' },
  { id: '/for/devops', group: 'persona', weight: 2, label: 'For DevOps' },
  { id: '/for/cto',    group: 'persona', weight: 2, label: 'For CTOs' },

  // Developer surface
  { id: '/docs',         group: 'developer', weight: 4, label: 'Documentation',    description: 'Quickstart, guides & API reference' },
  { id: '/cli',          group: 'developer', weight: 3, label: 'CLI Reference',    description: 'The `dt` command-line tool' },
  { id: '/api-reference', group: 'developer', weight: 3, label: 'API Reference',    description: 'REST API & webhooks' },
  { id: '/how-it-works', group: 'developer', weight: 2, label: 'How It Works' },

  // Resources
  { id: '/blog',          group: 'resource', weight: 2, label: 'Blog' },
  { id: '/pricing',       group: 'resource', weight: 3, label: 'Pricing' },
  { id: '/status',        group: 'resource', weight: 2, label: 'System Status' },

  // Company
  { id: '/about',    group: 'company', weight: 3, label: 'About' },
  { id: '/journey',  group: 'company', weight: 2, label: 'Our Journey' },
  { id: '/contact',  group: 'company', weight: 2, label: 'Contact' },

  // Trust & Compliance
  { id: '/security', group: 'trust', weight: 3, label: 'Security',  description: 'SOC 2, encryption, responsible disclosure' },

  // Legal
  { id: '/terms',   group: 'legal', weight: 1, label: 'Terms of Service' },
  { id: '/privacy', group: 'legal', weight: 1, label: 'Privacy Policy' },

  // Sitemap
  { id: '/sitemap', group: 'resource', weight: 2, label: 'Site Graph', description: 'Interactive site map' },
]

function inferNodeGroup(id: string): NodeGroup {
  if (id === '/') return 'home'
  if (id.startsWith('/products/')) return 'product'
  if (id === '/solutions' || id.startsWith('/solutions/')) return 'solution'
  if (id.startsWith('/for/')) return 'persona'
  if (id === '/security') return 'trust'
  if (id === '/terms' || id === '/privacy') return 'legal'
  if (id === '/docs' || id === '/api-reference' || id === '/cli') return 'developer'
  if (id === '/about' || id === '/journey' || id === '/contact') return 'company'
  return 'resource'
}

const actualRouteIds = new Set(generatedNodes.map((node) => node.id))
const manualNodeMetaById = new Map(manualNodeMeta.map((node) => [node.id, node]))

export const nodeMeta: NodeMeta[] = [
  ...manualNodeMeta.filter((node) => actualRouteIds.has(node.id)),
  ...generatedNodes
    .filter((node) => !manualNodeMetaById.has(node.id))
    .map((node) => ({
      id: node.id,
      label: node.label,
      group: inferNodeGroup(node.id),
      weight: 2,
    })),
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
  { source: '/products/titan-rollout',   target: '/solutions/instant-rollback',      kind: 'cross-sell' },
  { source: '/products/titan-foresight', target: '/solutions/risk-intelligence',     kind: 'cross-sell' },
  { source: '/solutions/platform-engineering', target: '/products/titan-rollout',    kind: 'related' },

  // Persona ↔ Product
  { source: '/for/sre',    target: '/products/titan-rollout',   kind: 'related' },
  { source: '/for/devops', target: '/products/titan-rollout',   kind: 'related' },
  { source: '/for/cto',    target: '/pricing',                  kind: 'related' },
  { source: '/for/cto',    target: '/security',                 kind: 'related' },

  // Developer ↔ Product
  { source: '/cli',          target: '/docs',                    kind: 'related' },
  { source: '/api-reference', target: '/docs',                   kind: 'related' },

  // Company
  { source: '/about',    target: '/journey',  kind: 'related' },
  { source: '/about',    target: '/contact',  kind: 'cta' },

  // Home → key CTAs
  { source: '/', target: '/pricing',      kind: 'cta' },
  { source: '/', target: '/docs',         kind: 'cta' },
  { source: '/', target: '/products/titan-rollout', kind: 'cta' },
]
