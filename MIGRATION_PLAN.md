# DeployTitan — Migration & Restructure Plan

## Overview

Two-phase initiative:

1. **Phase A–B:** Migrate the existing Vite/React SPA to Next.js 15 App Router (SSG, `output: 'export'`). **Infra-only — zero content changes.**
2. **Phase C:** Apply the locked DeployTitan product restructure (new 5+2 architecture) directly inside the Next codebase.

---

## Product Restructure (Phase C target)

### Final Product Suite

| Product | Owns | Verb | Status |
|---|---|---|---|
| **Titan Foresight** *(was Sentinel)* | A change being judged before it ships | Detect | live |
| **Titan Rollout** | A version moving forward to users | Deliver | live |
| **Titan Shield** | Traffic moving between regions/clouds | Defend | live |
| **Titan Phoenix** *(NEW)* | A bad release being undone, surgically | Recover | live |
| **Titan Ledger** *(was Pulse)* | Deploy events being counted as history | Measure | live |
| **Titan Insight** | Outcomes being explained (deploy → KPI) | Decide | Coming Soon |
| **Titan Sandbox** | A branch being made into a real environment | Reproduce | Coming Soon |

### Mental Model
- **Rollout** acts on a **version** (forward motion 0%→100%)
- **Shield** acts on a **region/cloud** (where traffic lives)
- **Foresight** acts on a **change** (pre-merge judgment)
- **Phoenix** acts on a **failure** (surgical undo of a bad release)
- **Ledger** acts on **history** (events counted over time)
- **Insight** acts on **outcomes** (did the release actually help?)
- **Sandbox** acts on a **branch** (makes it real)

### Hero Copy (locked)
> Ship the version. Hold the line. Undo the bad ones. Learn from every release.

### Lifecycle Narrative
**Detect → Deliver → Defend → Recover → Measure → Decide**

### Per-Product Specs

#### Titan Foresight (was Sentinel)
- **Tagline:** Score every change before it ships.
- **Description:** Foresight reads each PR against your live dependency graph and produces one explained risk score. Risky changes get tighter rollout policies, automatically.
- **Focus:** "Foresight owns what we know before we ship."
- **Capabilities:** PR risk score · blast-radius graph · ownership-aware risk attribution · risk-based merge & rollout policy · inline PR & Slack surfaces
- **Forbidden words in copy:** live, real-time, p95/p99, error rate (post-deploy), DORA, dashboard

#### Titan Rollout
- **Tagline:** Move traffic to a new version, safely.
- **Description:** Shift users onto a new version one cohort at a time. Pause the moment your SLOs say to. Every version stays addressable.
- **Focus:** "Rollout owns the journey of a version from 0% to 100%."
- **Capabilities:** Cohort-based traffic shifting · SLO-gated promotion · versioned release registry · instant version pin/unpin · scheduled & timezone-aware rollouts
- **CRITICAL CHANGE:** Remove "Automatic rollback" — moves to Phoenix. Rollout keeps "automatic pause" only.
- **Forbidden words:** rollback, region, multi-cloud, failover, observability (general), dashboard, DORA

#### Titan Shield
- **Tagline:** Your users stay up when a region doesn't.
- **Description:** Continuous health probes across every region. Sub-second cross-region traffic relocation. DR drills on a schedule.
- **Focus:** "Shield owns where in the world your traffic lives."
- **Capabilities:** Continuous regional health probing · sub-second cross-region relocation · declarative failover policy as code (HCL) · scheduled DR drills · multi-cloud routing fabric
- **CRITICAL CHANGE:** Stop rendering the `<Resilience />` "Rollback in seconds" component. Replace with Shield-native "Move traffic in seconds, across regions."
- **Forbidden words:** rollback, previous version, canary, cohort, risk score

#### Titan Phoenix (NEW — full live product page)
- **Tagline:** Undo a bad release in seconds — only where it broke.
- **Description:** When a release breaks, Phoenix doesn't roll back the whole service. It reverts the exact slice that's failing — bad cohort, bad region, bad flag — triggered by your SLOs in seconds.
- **Focus:** "Phoenix is the only product in the suite that undoes a release."
- **Capabilities:**
  1. SLO-triggered automatic rollback
  2. Scoped rollback (cohort / region / flag) — the wedge vs Argo
  3. Feature-flag-aware rollback
  4. Rollback simulation / dry-run
  5. Post-rollback incident packet (feeds Insight)
- **Wedge framing:** "Argo rolls back the deployment. Phoenix rolls back the failure."
- **Forbidden words:** forward, promote, cohort expansion, regional health

#### Titan Ledger (was Pulse)
- **Tagline:** Every deploy, measured automatically.
- **Description:** Ledger turns the events your deploys already produce into history you can act on. DORA, trends, and team scorecards — no agents, no tagging.
- **Focus:** "Ledger owns the truth about how you deploy."
- **Capabilities:** Zero-instrumentation event bus · DORA out of the box · historical trends · team & service scorecards · native exporters (Datadog/Prometheus/Grafana/OTel)
- **CRITICAL CHANGE:** Dedupe the duplicated section block in the source (lines ~204–395 vs ~397–589). Strip "real-time" and "smart alerting" copy.
- **Forbidden words:** real-time, in-flight rollout, current canary, failover, risk score

#### Titan Insight (Coming Soon — full teaser page)
- **Tagline:** Did this release actually improve anything?
- **Description:** Insight correlates every deploy to the metrics that matter — latency, conversion, revenue, error budget — and tells you which releases moved the needle and which just shipped.
- **Focus:** "Insight owns the answer to 'so what?'"
- **Why separate from Ledger:** Ledger counts deploys (factual, neutral). Insight judges them (causal, opinionated).
- **Why separate from Phoenix:** Phoenix acts in seconds. Insight concludes in days.

#### Titan Sandbox (Coming Soon — full teaser page, equal weight to Insight)
- **Tagline:** A production-shaped environment for every branch.
- **Description:** Sandbox spins up an isolated, prod-shaped environment per branch or PR — wired to real data shapes, torn down when you're done.
- **Focus:** "Sandbox owns the developer's inner loop."
- **Why separate from Rollout:** Rollout uses environments that exist. Sandbox creates them.

### Overlap Enforcement Checklist
After every copy change, verify no product uses another product's words:

- Rollout copy contains: *rollback, region, multi-cloud, failover, observability (general), dashboard, DORA* → rewrite/delete
- Shield copy contains: *rollback, previous version, canary, cohort, risk score* → rewrite/delete
- Foresight copy contains: *live, real-time, p95/p99, error rate (post-deploy), DORA, dashboard* → rewrite/delete
- Phoenix copy contains: *forward, promote, regional health* → rewrite/delete
- Ledger copy contains: *real-time, in-flight rollout, current canary, failover, risk score* → rewrite/delete
- Insight copy contains: *event count, MTTR (without outcome context)* → rewrite/delete

### Naming Changes
| Old | New | Old route | New route |
|---|---|---|---|
| Titan Sentinel | Titan Foresight | /products/titan-sentinel | /products/titan-foresight |
| Titan Pulse | Titan Ledger | /products/titan-pulse | /products/titan-ledger |
| — | Titan Phoenix | — | /products/titan-phoenix (NEW) |
| — | Titan Insight | — | /products/titan-insight (Coming Soon) |
| — | Titan Sandbox | — | /products/titan-sandbox (Coming Soon) |

Old slugs redirect via 308 in `vercel.json`.

---

## Phase A — Next.js Migration (infra-only)

### Target Stack
- Next.js 15 + App Router
- React 19 (already on 19)
- TypeScript ^5.6 (pin from current suspicious `~6.0.2`)
- Tailwind v4 via `@tailwindcss/postcss` (swap from `@tailwindcss/vite`)
- `output: 'export'` (SSG — every route pre-rendered at build time)
- `trailingSlash: true`
- Hosted on Vercel (static serving)
- Redirects via `vercel.json` (not `next.config.ts` redirects, which don't run with static export)

### What Does NOT Change in Phase A
- Zero copy changes
- Zero design changes
- Zero product renames
- Zero new pages
- All existing pages look and function identically to the current Vite site

### Key Decisions (locked)
- **Router:** App Router (`/app` directory)
- **Rendering:** `output: 'export'` (SSG)
- **Hosting:** Vercel
- **URL style:** `trailingSlash: true`
- **Link-graph plugin:** ported as `scripts/build-link-graph.ts`, run as `prebuild`
- **Heavy client libs** (`react-force-graph-2d`, `animejs`, `shiki`, `d3-force`): `dynamic(..., { ssr: false })`
- **Migration scope:** infra only

### Config Changes
**Add:**
- `next.config.ts`
- `postcss.config.mjs`
- `vercel.json` (empty redirects in Phase A)
- `scripts/build-link-graph.ts`

**Remove:**
- `vite.config.ts`
- `vite-plugin-link-graph.ts`
- `index.html`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `src/pages/` (contents ported to `app/`)
- `src/App.tsx`
- `src/main.tsx`

**Modify:**
- `package.json` — new scripts (`dev: next dev`, `build: next build`), swap deps
- `tsconfig.json` — Next plugin, path aliases
- ESLint config — use `next/core-web-vitals`
- `src/index.css` — renamed/moved to `app/globals.css`

### Dep Changes
**Remove:** `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `react-router-dom`
**Add:** `next@15`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`, `tsx` (prebuild script runner)

### Server vs. Client Component Rules
- Pages: **Server Components** by default
- Add `'use client'` to: ThemeContext + all consumers, all Radix UI components, Hero, Nav dropdowns, MobileNav, ThemeToggle, CodeBlock (Shiki), graph components, animation components, anything using `useEffect`/`useState`/browser APIs

### Metadata Strategy
- Delete `src/hooks/useDocumentMeta.ts`
- Every `page.tsx` exports `export const metadata: Metadata` (current verbatim title/description — no changes in Phase A)
- Default metadata in `app/layout.tsx` from current `index.html`
- Theme flash-prevention `<script>` injected via `dangerouslySetInnerHTML` in `app/layout.tsx`

### Route Map (App.tsx → app/ directory)
```
/                              → app/page.tsx
/solutions                     → app/solutions/page.tsx
/solutions/progressive-delivery→ app/solutions/progressive-delivery/page.tsx
/solutions/multi-cloud-resilience→app/solutions/multi-cloud-resilience/page.tsx
/solutions/risk-intelligence   → app/solutions/risk-intelligence/page.tsx
/solutions/platform-engineering→ app/solutions/platform-engineering/page.tsx
/pricing                       → app/pricing/page.tsx
/customers                     → app/customers/page.tsx
/blog                          → app/blog/page.tsx
/changelog                     → app/changelog/page.tsx
/docs                          → app/docs/page.tsx
/about                         → app/about/page.tsx
/journey                       → app/journey/page.tsx
/how-it-works                  → app/how-it-works/page.tsx
/security                      → app/security/page.tsx
/early-access                  → app/early-access/page.tsx
/for/sre                       → app/for/sre/page.tsx
/for/devops                    → app/for/devops/page.tsx
/for/cto                       → app/for/cto/page.tsx
/products/titan-rollout        → app/products/titan-rollout/page.tsx
/products/titan-shield         → app/products/titan-shield/page.tsx
/products/titan-sentinel       → app/products/titan-sentinel/page.tsx
/products/titan-pulse          → app/products/titan-pulse/page.tsx
/terms                         → app/terms/page.tsx
/privacy                       → app/privacy/page.tsx
/status                        → app/status/page.tsx
/cli                           → app/cli/page.tsx
/api                           → app/api-reference/page.tsx  (note: /api is reserved by Next)
/roadmap                       → app/roadmap/page.tsx
/careers                       → app/careers/page.tsx
/contact                       → app/contact/page.tsx
/press                         → app/press/page.tsx
/brand                         → app/brand/page.tsx
/partners                      → app/partners/page.tsx
/sitemap                       → app/sitemap-page/page.tsx  (note: /sitemap reserved by Next)
/integrations                  → app/integrations/page.tsx
/integrations/:slug            → app/integrations/[slug]/page.tsx + generateStaticParams()
* (404)                        → app/not-found.tsx
```

**Note:** `/api` is a reserved Next.js path (for API routes). Route becomes `/api-reference`. Add redirect in `vercel.json`. Similarly `/sitemap` conflicts with Next's `sitemap.ts` convention — route becomes `/sitemap-page`.

### Commit Sequence (Phase A)
1. **Bootstrap** — add Next + Tailwind PostCSS + tsconfig + ESLint; remove Vite deps
2. **Layout & globals** — `app/layout.tsx`, `app/globals.css`, theme script, gtag, ThemeProvider, Nav/Footer shell
3. **Static pages** — port simple content pages batch by batch
4. **Interactive pages** — Home, product pages, solution pages, `/for/*`
5. **Dynamic route** — `/integrations/[slug]` with `generateStaticParams()`
6. **Link rewrite sweep** — all `react-router-dom` usages → `next/link` / `next/navigation`; remove `react-router-dom`
7. **Plugin port** — `scripts/build-link-graph.ts`, wire into `prebuild`
8. **Cleanup** — delete `src/pages/`, `src/App.tsx`, `src/main.tsx`, `index.html`, vite files
9. **Verification** — `next build` clean, SEO smoke check, visual diff

### Phase A Verification Gates
- [ ] `next build` succeeds; produces `out/` with one HTML file per route
- [ ] `curl <url>/products/titan-rollout/` returns HTML with product `<title>` in body (SSR smoke test)
- [ ] Lighthouse SEO ≥ current production
- [ ] Every nav/footer link navigates without 404
- [ ] Theme toggle works without FOUC
- [ ] Force graph, code highlighting, animations render correctly client-side
- [ ] Client JS bundle within 10% of current Vite build

---

## Phase B — Cutover

1. Deploy `next-migration` branch to Vercel preview
2. Side-by-side QA against live Vite site
3. Merge `next-migration` → `main` (squash)
4. Promote to Vercel production domain
5. Tag `legacy/vite` from pre-merge SHA
6. Submit `sitemap.xml` to Search Console

---

## Phase C — DeployTitan Restructure (inside Next app)

### New Routes
```
app/products/titan-foresight/page.tsx    (was titan-sentinel)
app/products/titan-ledger/page.tsx       (was titan-pulse)
app/products/titan-phoenix/page.tsx      (NEW — full live product)
app/products/titan-insight/page.tsx      (NEW — Coming Soon teaser)
app/products/titan-sandbox/page.tsx      (NEW — Coming Soon teaser)
```

### vercel.json Redirects (Phase C)
```json
{
  "redirects": [
    { "source": "/products/titan-sentinel", "destination": "/products/titan-foresight", "permanent": true },
    { "source": "/products/titan-sentinel/", "destination": "/products/titan-foresight/", "permanent": true },
    { "source": "/products/titan-pulse", "destination": "/products/titan-ledger", "permanent": true },
    { "source": "/products/titan-pulse/", "destination": "/products/titan-ledger/", "permanent": true }
  ]
}
```

### Phase C Commit Sequence
1. **Renames** — Sentinel→Foresight, Pulse→Ledger (file/symbol/route); add redirects to `vercel.json`; update `ProductsDropdown`, `Roadmap`, all cross-links
2. **Phoenix scaffold** — full product page (hero, capabilities, "Argo vs Phoenix" wedge, quickstart, CTA); add to nav
3. **Hero + homepage** — new hero copy; rewrite `PlatformOverview` to 5-product lifecycle order; add Coming Soon row; system diagram
4. **Per-product copy rewrites** — apply specs above; overlap checklist; remove `<Resilience />` misuse from Shield; dedupe Ledger sections
5. **Coming Soon pages** — Titan Insight + Titan Sandbox full teaser pages with waitlist CTAs
6. **Cleanup** — meta tags, OG tags, sitemap (`app/sitemap.ts`), any straggling old product names

### Phase C Verification Gates
- [ ] All 7 product routes load
- [ ] Old slugs (titan-sentinel, titan-pulse) redirect to new ones
- [ ] Every product page passes the copy overlap enforcement checklist
- [ ] Homepage reads: Hero → Foresight → Rollout → Shield → Phoenix → Ledger → Coming Soon
- [ ] Nav dropdown shows 7 entries (5 live + 2 Coming Soon badged)
- [ ] `next build` clean

---

## Risk Register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Radix UI hydration mismatches | Medium | Strict `'use client'` discipline; test on staging |
| `react-force-graph-2d` SSG break | Medium | `ssr: false` dynamic import + placeholder |
| TypeScript `~6.0.2` anomaly | Low | Pin to `^5.6` in Phase A1 |
| `output: 'export'` blocks future SSR (CMS blog, dynamic OG, forms) | Medium | One-line config removal when needed; documented |
| `/api` and `/sitemap` route conflicts with Next.js conventions | Low | Rename to `/api-reference` and `/sitemap-page`; add redirects |
| Dual-codebase window during Phase A | Medium | Keep Phase A short; Vite gets zero new features during window |

---

## Todo Checklist

### Phase A — Migration
- [ ] A1: Bootstrap Next.js 15 + deps + config files
- [ ] A2: Create app/layout.tsx + globals.css + theme script + gtag
- [ ] A3: Port static content pages (Terms, Privacy, About, Blog, Changelog, Docs, Journey, HowItWorks, Security, EarlyAccess, Pricing, Customers, Careers, Contact, Press, Brand, Partners, Status, CLI, API, Roadmap, Sitemap, NotFound)
- [ ] A4: Port interactive pages (Home, product pages × 4, solution pages × 4, /for/* × 3)
- [ ] A5: Port dynamic route /integrations/[slug] with generateStaticParams
- [ ] A6: Link rewrite sweep (react-router-dom → next/link + next/navigation everywhere)
- [ ] A7: Port vite-plugin-link-graph → scripts/build-link-graph.ts; wire as prebuild
- [ ] A8: Cleanup (delete src/pages, App.tsx, main.tsx, index.html, vite.config.ts, vite-plugin-link-graph.ts, tsconfig.app.json, tsconfig.node.json)
- [ ] A9: Verification (next build, SEO smoke test, visual diff)

### Phase B — Cutover
- [ ] B1: Deploy to Vercel preview + QA
- [ ] B2: Merge next-migration → main (squash)
- [ ] B3: Promote to production
- [ ] B4: Tag legacy/vite

### Phase C — Restructure
- [ ] C1: Rename Sentinel→Foresight, Pulse→Ledger (files + routes + vercel.json redirects)
- [ ] C2: Create Titan Phoenix page (full live product)
- [ ] C3: Rewrite Hero + PlatformOverview (5-product lifecycle)
- [ ] C4: Per-product copy rewrites (all 5 live products; enforce overlap checklist)
- [ ] C5: Create Titan Insight + Titan Sandbox teaser pages
- [ ] C6: Add app/sitemap.ts
- [ ] C7: Final cleanup + meta tags + nav (7-entry dropdown)
