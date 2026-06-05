# Product

## Register

brand

## Users

Two simultaneous audiences who both land on the same site:

**Self-serve engineers** (staff/principal engineers, platform engineers, SREs): They arrive mid-evaluation, often from a GitHub link or word-of-mouth. They want proof the tool is serious, fast access to a trial, and enough technical depth to trust it before they sign up. They're skeptical of marketing language; credibility comes from specificity.

**Leadership (engineering managers, VPs, CTOs)**: They arrive after an engineer has flagged the tool, or they're doing their own due diligence. They need a clear capability story, proof of fit, and a low-friction path to trying the product. They're evaluating risk and time-to-value, not feature lists.

The site must speak fluently to both without alienating either. Engineers spot pandering; leaders spot amateur positioning.

## Product Purpose

DeployTitan is sprint release coordination software. It replaces the war room — the dozen GitHub tabs, the Jenkins job nobody watched, the Slack thread that became the approval chain. One place for all sprint PRs: add them, trigger CI, get alerted on failure, approve from Slack, and verify post-deploy health. No dashboard babysitting required.

The product is being built in three phases. The landing page and all copy must reflect **Phase 1 only**. Phases 2 and 3 are roadmap items; they must not appear as current capabilities.

### Phase 1 — Sprint PR Dashboard (current, in active development)

The revenue wedge. Solves the coordination gap that GitHub, CI/CD systems, and Slack threads leave open.

**What it solves (Phase 1 shipped features):**
- **PR dashboard:** all sprint PRs across every repo in one view, with live CI status
- **Fire and forget:** automatic CI/CD or Jenkins trigger — no manual job-watching
- **Slack alerts:** immediate notification with context when any job fails
- **Slack approvals:** release sign-off directly from Slack — no browser required
- **Post-deploy health check:** Grafana metrics check with summary posted automatically to the channel

**Feature steps as shown on the homepage:**
1. **Track** — All sprint PRs in one view / live CI status · across every repo
2. **Trigger** — CI and Jenkins run automatically / no manual job-watching required
3. **Alert** — Job fails? Slack ping, immediately / with context — no tab-checking
4. **Approve** — 1-click approval requests to stakeholders / they receive a Slack message · approve without leaving Slack
5. **Impact** — AI release impact report in 15 minutes / before vs after metrics · stable or degraded

**Supported integrations (current):** GitHub, GitHub Actions, Jenkins, Grafana, Slack. GitLab and Jira are not currently supported; do not mention them in copy.

**Differentiators (as shown on the homepage):**
- No stack switching — plugs into GitHub, Jenkins, and Grafana you already run; nothing to rip out
- Your team stays in Slack — alerts, approvals, and reports land in your channel; nobody opens a new dashboard
- Lightweight by design — connect in minutes, then forget we exist; we want you building your product, not learning ours
- Claude Code MCP server *(Coming soon)* — trigger releases, check PR status, and approve from your Claude Code terminal; no UI required

**Positioning:** ICP are startups and scaleups (not enterprises). A non-technical founder should understand the product within 2 minutes of landing. No jargon. Copy speaks to the pain of someone babysitting deploys.

**Success metric:** Teams stop watching CI tabs. One place for all sprint PRs replaces the war room.

**Primary conversion goal:** "Create account" signup. Self-serve trial is the funnel. Demo calls are secondary. CTA label is "Create account" everywhere — not "Start free trial".

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

### Pricing copy principles

- Flat monthly rate — no per-deploy billing, no surprise charges at sprint end
- Plans scale with team size, not deployment count
- CTA in pricing section: "See pricing" (links to `/pricing`)

### What must not appear in pricing

Phase 2 capabilities must not appear as available features: blast radius analysis, migration risk detection, dependency impact scoring, rollback advisories, risk scoring.

Phase 3 capabilities must not appear as available features: canary rollout, automated progressive rollout, SLO-gated promotion, cohort routing, automated rollback engine, health-based rollback, DR orchestration, traffic routing.

If Titan Foresight or Titan Sandbox appear as add-ons, they must be labeled "Roadmap" or "Coming soon" with no active purchase path. Do not list a price for them.

### Always included (every plan)

Release visibility and timeline history, dependency graphing and blocked release state, Slack release updates, no per-deployment or event-based metering.

## Homepage Structure

The homepage has three sections: **Hero → PlatformOverview (4 sections) → CTA**. No other sections. No secondary CTAs besides the hero and the final CTA section.

### Hero

**Headline:** "Ship the sprint. / Not the war room."
- "Ship the sprint." in primary ink
- "Not the war room." in secondary ink

**Subheadline:** "Add your sprint PRs, click on start, and walk away. DeployTitan watches every job, alerts you when something needs attention, and lets your team approve without opening a browser."

**CTA:** Single "Create account" button — `rounded-[8px]`, large size, primary variant.

**Integration strip (below CTA):** GitHub · GitHub Actions · Jenkins · Grafana · Slack (monospace, uppercase, separated by ·)

**Demo panel (right column):** Animated sprint PR dashboard — 6 PRs cycling through queued → running → deployed states, followed by a Slack notification panel sliding in, Slack approval, then deployment sequence, then release success note. The panel loops every ~20 seconds. Respects `prefers-reduced-motion`.

### PlatformOverview — Section 1: The problem

**Eyebrow:** "The problem"
**Headline:** "Every sprint ends the same way."
**Subhead:** "Multiple engineers stuck babysitting CI, logs, and metrics — while the product waits."

**Pain bullets (visceral, specific, named situations):**
1. Sprint ends Friday. Eight PRs across four repos. One engineer has a dozen GitHub tabs open watching CI.
2. Jenkins failed on service 3. Did service 4 deploy anyway? Nobody's sure until production breaks.
3. Release needs a sign-off. That means opening a browser, finding the PR, and hoping the reviewer approved it in time.
4. Post-sprint retro, slide one: "release chaos." Again. Same as last sprint.

### PlatformOverview — Section 2: What DeployTitan does

**Eyebrow:** "What DeployTitan does"
**Headline:** "Add PRs. We watch. You ship."
**Subhead:** "Connect GitHub, Jenkins, and Grafana. Add your sprint PRs. Walk away."

**Feature rows:** 5-step sequence (Track / Trigger / Alert / Approve / Impact) — see feature steps above.

**Footer strip:** "No war room · No babysitting · No infra changes"

### PlatformOverview — Section 3: Why DeployTitan

**Eyebrow:** "Why DeployTitan"
**Headline:** "Your stack. Your Slack. Zero friction."
**Subhead:** "Other tools ask you to adopt their platform, their CI, their workflows. DeployTitan plugs into what you already run. Your team never opens a new dashboard — everything comes to them."

**Differentiator cards:** 4 items (No stack switching / Your team stays in Slack / Lightweight by design / Claude Code MCP server — Coming soon)

### PlatformOverview — Section 4: Built for + inline CTA

**Eyebrow:** "Built for"
**Headline:** "Teams who ship more than they babysit."
**Subhead:** "If someone on your team regularly stays late to watch a deploy, this is for you."
**CTA:** "Create account" button — `rounded-[8px]`

**Team fit bullets (4 items):**
1. Your sprint touches more than two repos and someone has to watch CI, track metrics, and verify stability before and after every release
2. Release day means someone's on standby — monitoring dashboards, logs, and Jenkins — waiting for something to go wrong
3. Approvals are slow because context switching is painful — opening GitHub mid-task kills flow
4. Post-mortems keep listing "release coordination" as a recurring problem

### CTA Section (final)

Two-column card with `borderRadius: '12px'` outer container.

**Left column:**
- Eyebrow: "Free to start"
- Headline: "Try it on your next sprint."
- Body: "Create an account, connect GitHub and Slack, add your sprint PRs. You'll know if it's for you in one release."
- CTA: "Create account" — `rounded-[8px]`, primary, full-width
- Trust signals: "Works with tools you already have: GitHub, GitHub Actions, Jenkins, Grafana, Slack" + "No infrastructure changes: Connect in minutes, not days"

**Right column:**
- Eyebrow: "Pricing"
- Headline: "Priced for teams, not deployments."
- Body: "Flat monthly rate. No per-deploy billing. No surprise charges at sprint end. Plans scale with your team size."
- CTA: "See pricing" — `rounded-[8px]`, outline variant

## Site Content Strategy

### Phase 1 pages (current capabilities, full content)

These pages must describe only Phase 1 capabilities:

- `/` — Homepage. Sprint release coordination value proposition only.
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

## Copy Principles

Copy must be Cursor-style: short headlines that state the consequence, not the mechanism. One sentence that grounds the pain. One sentence that states what DeployTitan does about it. Nothing more until the reader asks for more.

**Pain must be visceral.** Name the real situation: the dozen GitHub tabs open, the Jenkins job nobody watched, the Slack approval nobody gave in time. Abstract pain copy ("release coordination is hard") is not allowed. Copy must describe the specific moment of friction.

**Enforced rules:**
- No Phase 2/3 jargon on homepage: no "blast radius," "progressive delivery," "cohort rollouts," "risk scoring"
- Single CTA everywhere: "Create account" — no "See how it works", no secondary CTAs on the hero
- ICP: startups and scaleups. Non-technical founder should understand in 2 minutes
- Footer: product column has only Titan Rollouts + Pricing — "Rollouts Intelligence" and "Enterprise Recovery Suite" are removed
- Integration list: GitHub · GitHub Actions · Jenkins · Grafana · Slack only — no GitLab, no Jira

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
5. **Trial is the funnel.** Every CTA points to account creation. The page exists to make someone sign up, not book a call.
6. **Cursor-style brevity.** Headline states the consequence. One sentence of context. The demo shows the rest. No paragraph that restates the headline.

## Accessibility & Inclusion

WCAG 2.1 AAA where feasible. Reduced-motion support is essential: all animations must respect `prefers-reduced-motion`. Sufficient color contrast for both light and dark modes. Keyboard navigation must be fully functional.
