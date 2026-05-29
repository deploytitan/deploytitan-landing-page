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
