# DeployTitan Landing Page — Restructure TODOs

Tracking the depot.dev-style restructure. Phases mirror the implementation plan.
Check items off as completed. Add notes inline as needed.

---

## Decisions (locked)

- **Routing**: react-router-dom v7 (client-side SPA, Vite)
- **Products**: 3 pillars — Intelligent Delivery, Cross-Cloud Resilience, Risk Intelligence
- **Auth**: external URLs via `VITE_APP_URL` env var (`/signin`, `/signup`)
- **Pricing**: placeholder Starter / Team / Enterprise + "Contact sales"
- **Per-page meta**: in-house `useDocumentMeta` hook (no dep)
- **Demoted homepage sections**: Problem, Reframe, BeforeAfter, EmotionalClose → `/journey` page
- **MidCTA**: extracted to `src/components/MidCTA.tsx` (reusable, props-driven)
- **CLI binary**: `dt`
- **Install domain**: `deploytitan.com` (e.g. `get.deploytitan.com`, `@deploytitan/cli`)
- **Quickstart / install sections**: shared `<CodeBlock />` + `<InstallTabs />` with shiki highlighting
- **Design system**: unchanged — colors, typography, animations (anime.js), sharp 2px borders, gold accent

---

## Phase 1 — Routing shell

- [x] Install react-router-dom v7
- [x] Add `VITE_APP_URL` to `.env.example` (default `https://app.deploytitan.com`)
- [x] Wrap `<App />` in `<BrowserRouter>` in `main.tsx`
- [x] Create `src/layouts/SiteLayout.tsx` (Nav + `<Outlet />` + Footer)
- [x] Convert `App.tsx` to `<Routes>` definition
- [x] Move existing homepage to `src/pages/Home.tsx` (unchanged)
- [x] Stub pages: Pricing, Customers, Blog, Changelog, Docs, About, Journey, NotFound
- [x] Stub product pages: IntelligentDelivery, CrossCloudResilience, RiskIntelligence

---

## Phase 2 — Nav rewrite

- [x] Extract shared `<Button>` component (`primary` / `ghost` / `link` variants) → `src/components/shared/Button.tsx`
- [x] `components/nav/Nav.tsx` — top bar layout with Sign In + Get started
- [x] `components/nav/ProductsDropdown.tsx` — 3-pillar mega-menu (anime.js fade+slide)
- [x] `components/nav/ResourcesDropdown.tsx` — mega-menu (Docs, Blog, Customers, Changelog, Live demo)
- [x] `components/nav/MobileNav.tsx` — collapsible accordion (Products group, Resources group, flat links)
- [x] Wire Sign In → `${VITE_APP_URL}/signin`, Get started → `${VITE_APP_URL}/signup`
- [x] A11y: ESC closes dropdowns, click-outside, keyboard navigation, focus trap on mobile

---

## Phase 3 — Footer expansion

- [x] Three-column layout: Product / Support / Company
- [x] Product column: Pricing, Customers, Security (placeholder), Changelog, Live demo, Install (`/#quickstart`)
- [x] Support column: Documentation, Help, System status (placeholder)
- [x] Company column: About, Our journey, Blog, Careers (placeholder), Contact, Brand assets (placeholder)
- [x] Bottom row: copyright + Terms / Privacy + social icons (GitHub, X, LinkedIn — placeholders)

---

## Phase 4 — Extract MidCTA

- [x] Move inline `MidCTA` from `App.tsx` into `src/components/MidCTA.tsx`
- [x] Add props: `heading?`, `subheading?`, `primaryCta`, `secondaryCta?`
- [x] Replace existing usage in homepage

---

## Phase 5 — useDocumentMeta hook

- [x] Create `src/hooks/useDocumentMeta.ts` (sets `document.title` + `<meta name="description">`, restores defaults on unmount)
- [x] Apply to `pages/Home.tsx`

---

## Phase 6 — Homepage restructure

- [x] Shorten `<Hero />` — update CTAs to "Start free trial" (→ `${VITE_APP_URL}/signup`) + "Talk to an engineer" (mailto/Cal)
- [x] Optional `<AnnouncementBar />` (dismissible strip above nav) → `src/components/AnnouncementBar.tsx`
- [x] Build `<LogoCloud />` — customer logos placeholder strip → `src/components/shared/LogoCloud.tsx`
- [x] Build `<SectionHeader />` → `src/components/shared/SectionHeader.tsx`
- [x] Build `<PlatformOverview />` + `<ProductTeaser />` (3 teasers, alternating sides) → `src/components/platform/`
- [x] Build Integrations strip (folds in `IntegrationSimplicity` content) → `src/components/Integrations.tsx`
- [x] Build `<Testimonials />` placeholder wall → `src/components/Testimonials.tsx`
- [x] Keep `<Outcomes />` in place
- [x] Remove Problem, Reframe, BeforeAfter, EmotionalClose, MidCTA from homepage (moved to /journey)
- [x] Close homepage with `<CTA />`
- [x] Add small "Why we built this →" link near hero pointing to `/journey`

---

## Phase 6.5 — Install / Quickstart components

- [x] Install `shiki` (ESM, restricted langs: bash, yaml, powershell, dockerfile, tsx, hcl, diff)
- [x] Build custom shiki theme matching design system tokens (gold keywords, signal colors for diff)
- [x] Build `<CodeBlock />` with lazy-loaded shiki, monospace fallback, copy button, filename header, diff support → `src/components/shared/CodeBlock.tsx`
- [x] Build `<InstallTabs />` (anime.js fade between tabs) → `src/components/shared/InstallTabs.tsx`
- [x] Add `Quickstart` section to homepage (between PlatformOverview and Outcomes) → `src/components/Quickstart.tsx`
  - Tabs: macOS (brew `deploytitan/tap/dt`), Linux (`curl -fsSL https://get.deploytitan.com | sh`), Windows (Scoop), npm (`@deploytitan/cli`), Docker (`deploytitan/cli:latest`)
  - Right side: animated deployment terminal (`dt deploy --strategy=cohort` → canary → promote)

---

## Phase 7 — Product pages

- [x] `/products/intelligent-delivery`
  - Components: `Hero`/`TrafficSplitVisual`, `Solution`, `BeforeAfter`
  - Quickstart: diff `kubectl apply` → `dt deploy --strategy=cohort --slo=...` + YAML `dt.yaml` policy tab
  - Feature blocks: Progressive rollouts, Intelligent rollback, Versioned deployments
  - Cross-links to Cross-Cloud Resilience, Risk Intelligence
  - `useDocumentMeta`
- [x] `/products/cross-cloud-resilience`
  - Components: `Resilience`, `Performance`
  - Quickstart: YAML multi-cloud targets + CLI tab `dt failover test --simulate=region-down`
  - Feature blocks: Multi-cloud failover, Disaster recovery, Zero-latency routing
  - Cross-links to Intelligent Delivery, Risk Intelligence
  - `useDocumentMeta`
- [x] `/products/risk-intelligence`
  - Components: `ShiftLeft` + placeholder Visibility / Guardrails sub-sections
  - Quickstart: GitHub Actions YAML (`deploytitan/risk-score@v1`) + CLI tab `dt risk score --pr=1234`
  - Feature blocks: Shift-left risk scoring, Blast-radius analysis, (Coming) Live observability, (Coming) SLO guardrails
  - Cross-links to Intelligent Delivery, Cross-Cloud Resilience
  - `useDocumentMeta`
- [x] Each product page: dual CTA ("Start free trial", "Read the docs"), `<MidCTA />` close, "How it fits the platform" cross-link strip

---

## Phase 8 — Pricing page

- [x] 3-tier `.sharp-card` grid: Starter / Team / Enterprise
- [x] Feature comparison matrix
- [x] FAQ accordion
- [x] Small install snippet (`curl … | sh`) near Starter tier
- [x] `<MidCTA />` close ("Start free trial" + "Talk to an engineer")
- [x] `useDocumentMeta`

---

## Phase 9 — /journey page

- [x] Minimal hero: eyebrow "Our journey" + H1 "Why we built DeployTitan"
- [x] Compose: `<Problem />` → `<Reframe />` → `<BeforeAfter />` → `<EmotionalClose />` → `<CTA />`
- [x] Link from footer Company column ("Our journey")
- [x] Link from homepage hero ("Why we built this →")
- [x] `useDocumentMeta`

---

## Phase 10 — Placeholder pages + polish

- [ ] `/customers` — logo grid + 2–3 case study card placeholders
- [ ] `/blog` — placeholder index + email capture
- [ ] `/changelog` — placeholder + "Coming soon" + email capture
- [ ] `/docs` — placeholder (or external redirect via `VITE_DOCS_URL`)
- [ ] `/about` — placeholder
- [ ] `NotFound` (404) page
- [ ] Apply `useDocumentMeta` to every route
- [ ] A11y pass: keyboard nav on dropdowns and tabs, ESC focus management, screen-reader labels
- [ ] Optional `<AnnouncementBar />` toggle via env var `VITE_ANNOUNCEMENT`
- [ ] Verify shiki bundle size; consider dynamic import chunking if >200KB

---

## Phase 11 — Risk Intelligence flesh-out (later)

- [ ] Build new Visibility sub-section + animated visual (live system health card)
- [ ] Build new Guardrails sub-section + animated visual (error-rate/p95/p99 threshold editor)
- [ ] Replace "Coming soon" placeholders on `/products/risk-intelligence`

---

## Open / nice-to-have

- [ ] Replace inline `gtag` snippet with a tiny analytics util (`src/utils/analytics.ts`)
- [ ] Real customer logos and case studies
- [ ] Real testimonial quotes
- [ ] Dark-mode pass (currently light-only)
- [ ] Consider migration to Next.js 15 (App Router) for SSR/SEO once content stabilises
- [ ] `VITE_DOCS_URL` env var for external docs redirect
- [ ] Sitemap + canonical meta tags
- [ ] Integration with a CMS for Blog and Changelog content
