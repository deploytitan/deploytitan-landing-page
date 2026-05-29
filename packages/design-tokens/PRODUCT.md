# Product

## Register

brand

## Users

Two simultaneous audiences who both land on the same site:

**Self-serve engineers** (staff/principal engineers, platform engineers, SREs): They arrive mid-evaluation, often from a GitHub link or word-of-mouth. They want proof the tool is serious, fast access to a trial, and enough technical depth to trust it before they sign up. They're skeptical of marketing language; credibility comes from specificity.

**Leadership (engineering managers, VPs, CTOs)**: They arrive after an engineer has flagged the tool, or they're doing their own due diligence. They need a clear capability story, proof of fit, and a low-friction path to trying the product. They're evaluating risk and time-to-value, not feature lists.

The site must speak fluently to both without alienating either. Engineers spot pandering; leaders spot amateur positioning.

## Product Purpose

DeployTitan is release coordination software for engineering teams whose releases span more than one service. Think "Linear for deployments" — a structured, shared workspace where multi-service releases are planned, sequenced, and tracked instead of coordinated through Slack threads and spreadsheets.

The product is being built in three phases. The landing page and all copy should reflect **Phase 1 only**. Phases 2 and 3 are roadmap items; they must not appear as current capabilities.

### Phase 1 — Release Coordination (current, in active development)

The revenue wedge. Solves the coordination gap that GitHub, CI/CD systems, and observability tools leave open.

**What it solves:**
- Multi-service release dependency ordering (which service deploys first, which waits)
- Freeze window management (production windows that close on checklist completion, not hope)
- Approval workflows (approvals attached to the release, not scattered across tools)
- Release sequencing (merges happen in dependency order, not random PR merges)
- Rollout visibility (every service owner, platform team, and team lead sees the same release record)
- Rollback coordination (rollback owners assigned before the window opens)

**Positioning:** "Linear for deployments" or "GitHub Actions for release orchestration." This framing lands with both engineers and leaders: it implies structure, visibility, and team coordination over chaos.

**Success metric:** Teams stop coordinating releases in Slack threads. One release record replaces the spreadsheet, the Zoom call, and the post-mortem.

**Primary conversion goal:** Free account signup / product trial. Self-serve trial is the funnel. Demo calls are secondary.

### Phase 2 — Intelligent Release Insights (roadmap, not yet built)

Adds deployment-aware risk intelligence on top of the Phase 1 coordination layer:
- Blast radius analysis (what downstream services could break)
- Migration risk detection
- Dependency impact scoring
- Rollback advisories powered by Git metadata, OpenTelemetry traces, and deployment history

This becomes the differentiated product: "What could break before you ship?" Do not reference these capabilities as current features.

### Phase 3 — Autonomous Rollouts (future, expensive moat)

Progressive delivery, smart rollback, automated traffic routing, cohort infrastructure, edge routing, and a runtime policy engine. This is the long-term technical moat. Do not reference on the homepage at all.

## Pricing Strategy

### Phase 1 feature tiers

**Starter ($49/mo):** Teams proving the release coordination workflow. Includes release objects linking PRs across repositories, automatic dependency graph inference, basic deployment execution and manual rollback coordination, deployment history and timeline, GitHub integration, basic Kubernetes and Lambda support. Limits: 1 org, 3 projects, 10 services, 10 members.

**Growth ($499/mo):** Scaling teams where multi-service coordination, freeze windows, and rollback planning are slowing velocity. Adds coordinated multi-service releases with DAG visualization, freeze window management and production window scheduling, approval workflows with deadline tracking and audit trail, rollback coordination (owners, playbooks, and revert sequencing attached to the release object before anything ships), expanded integrations (Datadog, Grafana, OpenTelemetry, Slack).

**Scale ($2,499/mo):** Platform and infrastructure teams coordinating releases across multiple teams and environments. Adds release policy engine for governance across teams and promotion gates, multi-workspace governance, advanced RBAC, compliance reporting with immutable audit history, SSO/SAML.

**Enterprise:** Regulated orgs requiring self-hosted deployment, custom SLAs, private networking, white-label options, and multi-org governance.

### What must not appear in pricing

Phase 2 capabilities must not appear as available features: blast radius analysis, migration risk detection, dependency impact scoring, rollback advisories, risk scoring.

Phase 3 capabilities must not appear as available features: canary rollout, automated progressive rollout, SLO-gated promotion, cohort routing, automated rollback engine, health-based rollback, DR orchestration, traffic routing.

If Titan Foresight or Titan Sandbox appear as add-ons, they must be labeled "Roadmap" or "Coming soon" with no active purchase path. Do not list a price for them.

### Always included (every plan)

Release visibility and timeline history, dependency graphing and blocked release state, Slack release updates, no per-deployment or event-based metering.

## Site Content Strategy

### Phase 1 pages (current capabilities, full content)

These pages must describe only Phase 1 capabilities:

- `/` — Homepage. Release coordination value proposition only.
- `/products/titan-rollout` — Phase 1 product: release coordination, dependency ordering, freeze windows, approvals, rollout visibility, rollback coordination.
- `/solutions/release-coordination` — Multi-repo release objects, dependency sequencing, merge ordering.
- `/solutions/instant-rollback` — Rollback coordination: owners, playbooks, revert sequencing attached to the release before the window opens. This is planned coordination, not automated rollback execution (that is Phase 3).
- `/solutions/platform-engineering` — Shared release record for platform teams, service owners, and leadership.
- `/pricing` — Phase 1 tiers and Phase 1-only features.
- `/how-it-works` — Phase 1 workflow.

### Phase 2 pages (roadmap treatment required)

These pages describe Phase 2 capabilities. Must either redirect to homepage or show a prominent roadmap/waitlist state. Must not present any feature as currently available:

- `/products/titan-foresight` — Phase 2. Has `badge="preview"` which is acceptable, but the Quickstart section presents actionable CLI commands and GitHub Actions for a non-existent product. Operational setup instructions must be replaced with waitlist framing.
- `/solutions/risk-intelligence` — Phase 2. No badge, no gating. Presents blast-radius analysis, PR risk scoring, and guardrails as a shipped product. Must add a coming-soon banner or redirect.

### Phase 3 pages (roadmap treatment or redirect)

- `/products/titan-phoenix` — Phase 3. Already has `badge="roadmap"`. Acceptable as-is.
- `/solutions/progressive-delivery` — Phase 3. No badge anywhere. Presents canary deployments, SLO-gated traffic stepping, and auto-rollback as available today. Must redirect or replace with waitlist.

### Audience pages requiring Phase 1 rewrites

- `/for/sre` — References "Titan Shield" (non-existent product) and Phase 2/3 blast-radius / automated rollback. Must be rewritten around Phase 1 SRE value: rollback coordination planning, release record visibility, dependency-aware revert sequencing assigned before promotion.
- `/for/devops` — Entire value proposition is Phase 3 canary CLI and auto-rollback. Must be rewritten around Phase 1: release coordination, dependency ordering, structured merge sequencing.
- `/for/cto` — ROI metrics cite Phase 2/3 capabilities. Must be updated to Phase 1 metrics: fewer release incidents from structured coordination, velocity increase from removing Slack-thread coordination overhead.

### Navigation consistency rule

The nav dropdowns (`ProductsDropdown`, `SolutionsDropdown`) already correctly separate "Available now" from "Coming soon." No Phase 2/3 route may appear in the "Available now" zone.

## Brand Personality

**Precise. Confident. Calm.**

The tone is that of the best engineer in the room: speaks with authority, doesn't over-explain, earns trust through specificity rather than enthusiasm. Never exclamatory. Never corporate-bland. The voice is direct, competent, and measured.

Copy should be Cursor-style: short headlines that state the consequence, not the mechanism. One sentence that grounds the pain. One sentence that states what DeployTitan does about it. Nothing more until the reader asks for more.

## Anti-references

- **Generic SaaS cream + purple**: Notion/Linear/Loom aesthetic. Soft pastels, friendly rounded corners, "everyone-welcome" copy. DeployTitan is not a productivity tool; it's infrastructure. The design should feel engineered, not approachable.
- **Dark neon DevOps**: Terminal-green on black, aggressive gradients, the "we're hackers" aesthetic of 2018-era ops tooling. DeployTitan is enterprise-capable, not scrappy.
- **Enterprise boring**: Navy blue dashboards, bullet-list feature pages, stock photo heroes. Authoritative does not mean boring.
- **Phase 2/3 feature creep**: Traffic routing, blast radius, progressive delivery, cohort rollouts, runtime policies. None of these exist yet. Mentioning them on the homepage destroys the Phase 1 positioning clarity.

## Design Principles

1. **Specificity earns trust.** Concrete capability descriptions outperform category-speak. "Rollback owners assigned before the window opens" beats "ship with confidence."
2. **The interface demonstrates the product.** The hero animation is the product. Don't describe what it shows; let it show.
3. **Dual-track legibility.** Every section should yield value to an engineer scanning for depth AND a leader scanning for fit. Neither should be patronized.
4. **Calm authority over excitement.** No hype, no urgency tactics. DeployTitan earns attention through competence.
5. **Trial is the funnel.** Every CTA points to account creation or trial. The page exists to make someone sign up, not book a call.
6. **Cursor-style brevity.** Headline states the consequence. One sentence of context. The demo shows the rest. No paragraph that restates the headline.

## Accessibility & Inclusion

WCAG 2.1 AAA where feasible. Reduced-motion support is essential: all animations must respect `prefers-reduced-motion`. Sufficient color contrast for both light and dark modes. Keyboard navigation must be fully functional.
