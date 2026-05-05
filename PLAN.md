# DeployTitan Landing Page — Implementation Plan

Generated: 2026-05-06

---

## Overview

Four workstreams, executed in order:

| Workstream | Summary |
|---|---|
| **A** | Hero copy update (4 edits) |
| **D** | Product list cleanup — fix legacy names, complete surfaces, add coming-soon tags |
| **B** | Sanity CMS for blog (embedded Studio, visual editing, ISR) |
| **C** | Graph script extension (Sanity-aware, dynamic-route registry) |

---

## Workstream A — Hero copy

### A1. `src/components/Hero.tsx:358–374` — H1
- **From:** `Ship the version.` / `Hold the line.` / `Undo the bad ones.`
- **To:** `Ship more.` / `Break less.` / `Know why.`
- Preserve JSX structure: existing 3-line stacked layout, highlighted underline span on **third line** (`Know why.`)

### A2. `src/components/Hero.tsx:377–384` — Subhead `<p>`
- **From:** `Five products. One release lifecycle. From pre-merge risk scoring to post-release outcome measurement — every step of the way from code to production.`
- **To:** `Releases shouldn't be the scariest part of your week. Stop guessing which release broke production.`

### A3. `src/components/Hero.tsx:387–394` — Tagline `<p>` (primary color)
- **From:** `Learn from every release.`
- **To:** `Catch risk early. Ship without fear. Learn from every release.`

### A4. `src/app/page.tsx:5` — Page `<title>` metadata
- **From:** `DeployTitan — Ship the version. Hold the line.`
- **To:** `DeployTitan — Ship more. Break less. Know why.`

---

## Workstream D — Product list cleanup

### D1. Fix broken legacy product references

| File | Lines | Change |
|---|---|---|
| `src/components/Footer.tsx` | 73 | Remove `{ label: 'Titan Sentinel', to: '/products/titan-sentinel' }` (broken link) |
| `src/components/Footer.tsx` | 74 | Remove `{ label: 'Titan Pulse', to: '/products/titan-pulse' }` (broken link) |
| `src/components/nav/SolutionsDropdown.tsx` | 35 | `product: 'Titan Sentinel'` → `product: 'Titan Foresight'` |
| `src/page-components/Roadmap.tsx` | 48 | Replace `Titan Sentinel` tag → `Titan Foresight` |
| `src/page-components/Roadmap.tsx` | 64 | Replace `Titan Pulse` tag → `Titan Ledger` |

### D2. Footer — complete product list with `· Soon` suffix

- Extend Footer product link shape to `{ label, to, status?: 'roadmap' }`
- Render `· Soon` inline suffix when `status === 'roadmap'`
- Remove broken Sentinel + Pulse entries
- Final product column order:
  1. Titan Foresight
  2. Titan Rollout
  3. Titan Shield
  4. Titan Phoenix
  5. Titan Ledger
  6. Titan Insight · Soon
  7. Titan Sandbox · Soon

### D3. PlatformOverview — restructure to 7 products

**File:** `src/components/platform/PlatformOverview.tsx`

- **Headline (line 237):** `Detect. Deliver. Defend. Recover. Measure.` → `Seven products. One release lifecycle.`
- **Subhead (line 240):** Update `Five products…` → `Seven products…`
- Add 3 new product entries after Ledger:
  - **Titan Phoenix** (Recover slot) — equal visual weight, no badge
  - **Titan Insight** — equal visual weight, `<RoadmapBadge variant="roadmap" />`
  - **Titan Sandbox** — equal visual weight, `<RoadmapBadge variant="roadmap" />`
- Build 3 new inline mini visuals: `PhoenixVisual`, `InsightVisual`, `SandboxVisual`
- Add optional `badge?` field to entry shape; render `<RoadmapBadge>` in card when present
- **Stale comment fix:** `src/page-components/Home.tsx:15` — update "3 product teasers (Titan Rollout / Shield / Sentinel)" comment

### D4. SolutionsDropdown — add Recovery lane

**New route:** `/solutions/instant-rollback`

Files to create:
- `src/app/solutions/instant-rollback/page.tsx` — thin wrapper with metadata
- `src/page-components/solutions/InstantRollback.tsx` — full page mirroring Progressive Delivery structure, content drafted from TitanPhoenix.tsx

Files to modify:
- `src/components/nav/SolutionsDropdown.tsx` — add 5th entry: eyebrow "Instant Rollback", product "Titan Phoenix", route `/solutions/instant-rollback`
- `src/app/sitemap.ts` — add `/solutions/instant-rollback` entry
- `src/data/siteGraph.meta.ts` — add node entry for new solution page

### D5–D7. Badge consolidation

- `src/components/nav/ProductsDropdown.tsx:137–139` — replace inline "Roadmap" pill with `<RoadmapBadge variant="roadmap" />`
- `src/components/nav/MobileNav.tsx:116–123` — replace inline "Preview" pill with `<RoadmapBadge variant="roadmap" />` (fixes wording inconsistency: was "Preview", aligns to "Coming soon")

---

## Workstream B — Sanity CMS (blog only)

### Context

- Studio: embedded at `/studio` in this Next.js app
- Hosting: Vercel (SSR/ISR, not static export)
- Visual editing: Sanity Presentation tool + draft mode
- Publish strategy: ISR via `/api/revalidate` webhook (5-sec publish-to-live)
- Body typography: custom Portable Text components using site tokens (no `@tailwindcss/typography`)
- Author model: Sanity document (no public profile page)

### B0. Architecture change

`next.config.ts`:
- Remove `output: 'export'`
- Remove `images.unoptimized: true`
- Add `images.remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }]`
- Keep `trailingSlash: true`

### B1. Dependencies to add

```
next-sanity
@sanity/client
@sanity/image-url
@sanity/vision
@portabletext/react
@sanity/code-input
sanity
styled-components
```

### B2. Env vars

Final `.env.example`:
```
NEXT_PUBLIC_DEMO_URL=https://demo.deploytitan.com
NEXT_PUBLIC_APP_URL=https://app.deploytitan.com
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

Also rename `VITE_*` → `NEXT_PUBLIC_*` in `src/lib/env.ts` and any direct usages (see Q7).

### B3. Studio config files (root)

- `sanity.config.ts` — `basePath: '/studio'`, plugins: `structureTool`, `presentationTool`, `codeInput`, `visionTool`
- `sanity.cli.ts` — CLI config

### B4. Schemas (`src/sanity/schemas/`)

| Schema | Key fields |
|---|---|
| `post.ts` | title, slug, excerpt (max 160), coverImage (image + alt + hotspot), author (ref), categories (ref array), publishedAt, body (Portable Text), seo (metaTitle/metaDesc/ogImage), featured (bool) |
| `author.ts` | name, slug (internal), role, avatar, bio |
| `category.ts` | title, slug, description |
| `index.ts` | schema array export |

Portable Text body blocks:
- Built-in: h2/h3/h4, bold, italic, links, blockquotes, lists
- `code` block (via `@sanity/code-input`) with language + filename
- Inline images (alt + caption + full-bleed flag)
- Callout block (type: info/warning/success + body)

### B5. Sanity client (`src/sanity/lib/`)

| File | Purpose |
|---|---|
| `client.ts` | Public read-only client + draft-aware client (uses `SANITY_API_READ_TOKEN`, `perspective: 'previewDrafts'`) |
| `image.ts` | `urlFor(source)` builder |
| `queries.ts` | `ALL_POSTS_QUERY`, `POST_BY_SLUG_QUERY`, `ALL_POST_SLUGS_QUERY`, `FEATURED_POSTS_QUERY`, `POSTS_BY_CATEGORY_QUERY` |
| `live.ts` | `defineLive` for live preview |

### B6. Visual editing + API routes

- `src/app/api/draft-mode/enable/route.ts` — enables draft mode, validates preview secret, redirects
- `src/app/api/draft-mode/disable/route.ts` — disables draft mode
- `src/app/api/revalidate/route.ts` — webhook receiver, validates Sanity signature, calls `revalidatePath('/blog')` + `revalidatePath('/blog/[slug]', 'page')`

### B7. Studio mount

- `src/app/studio/[[...tool]]/page.tsx` — `<NextStudio config={config} />`
- `src/app/studio/layout.tsx` — minimal layout bypassing site Nav/Footer

### B8. Blog pages + components

| File | Action |
|---|---|
| `src/page-components/Blog.tsx` | Replace stub → async server component, post grid, category filters, `<VisualEditing>` |
| `src/app/blog/[slug]/page.tsx` | New — `generateStaticParams`, `generateMetadata`, async server component |
| `src/components/blog/PostCard.tsx` | New — card UI using site tokens |
| `src/components/blog/PortableTextRenderer.tsx` | New — custom components map: headings → `font-display`, code → `<CodeBlock>` (8-lang coercion), images → `next/image` + `urlFor()`, callouts |
| `src/components/blog/AuthorBadge.tsx` | New — avatar + name + role chip |
| `src/components/blog/VisualEditing.tsx` | New — conditional `<VisualEditing />` from `next-sanity` |

### B9. Nav additions (Blog — top nav, D6=a)

- `src/components/nav/Nav.tsx` — add `<Link href="/blog">Blog</Link>` after Customers (after line 229), mirroring Pricing/Customers pattern
- `src/components/nav/MobileNav.tsx` — parallel mobile entry

### B10. Sitemap extension

`src/app/sitemap.ts` — convert to async, fetch `ALL_POST_SLUGS_QUERY` with `_updatedAt`, append per-post entries with `trailingSlash: true` URLs.

### B12. Webhook setup (manual — your dashboard clicks)

1. Sanity dashboard → create webhook
   - URL: `https://deploytitan.com/api/revalidate`
   - Trigger: `post` document on publish/unpublish/delete
   - Secret: value of `SANITY_REVALIDATE_SECRET` env var
2. No Vercel deploy hook needed (ISR handles per-post revalidation)

---

## Workstream C — Graph script extension

### C1. `scripts/build-link-graph.ts`

Replace hard `continue` at line 84 with pluggable dynamic-route source registry:

```ts
const dynamicRouteSources: Record<string, () => Promise<{ slug: string; label?: string }[]>> = {
  '/blog/:slug': async () => {
    // fetch from Sanity: all published post slugs + titles
  },
  // future: '/careers/:slug', '/docs/:slug', '/api-reference/:slug'
}
```

- For each dynamic route in `app/`, look up registry. If found, expand to N nodes. If not, skip with warning.
- Emits: `{ id: '/blog/<slug>', label: <post.title>, file: <original page.tsx> }`
- Edge regex passes already match concrete hrefs — cross-links to posts auto-discovered once nodes exist.

### C2. `src/data/siteGraph.meta.ts`

Add `defaultGroupForRoute(route: string): NodeGroup` helper:
- `/blog/*` → `'resource'`
- `/careers/*` → `'company'`
- `/docs/*` → `'developer'`
- `/api-reference/*` → `'developer'`
- default → `'resource'`

### C3. `src/components/graph/SiteGraph.tsx`

Verify node-meta merge logic gracefully tolerates nodes without explicit `nodeMeta` entries. Make minimal surgical adjustment if needed.

---

## Q7 — Env var rename

- Grep `VITE_` references across `src/`
- Rename in `src/lib/env.ts`: `VITE_DEMO_URL` → `NEXT_PUBLIC_DEMO_URL`, `VITE_APP_URL` → `NEXT_PUBLIC_APP_URL`
- Rename in `.env.example`
- **Manual action (you):** rename both vars in local `.env` and Vercel dashboard

---

## Files summary

### Created (~21)
- `PLAN.md` (this file)
- `TODO.md`
- `sanity.config.ts`, `sanity.cli.ts` (root)
- `src/sanity/schemas/{post,author,category,index}.ts`
- `src/sanity/lib/{client,image,queries,live}.ts`
- `src/app/api/draft-mode/{enable,disable}/route.ts`
- `src/app/api/revalidate/route.ts`
- `src/app/studio/[[...tool]]/page.tsx`, `src/app/studio/layout.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/solutions/instant-rollback/page.tsx`
- `src/page-components/solutions/InstantRollback.tsx`
- `src/components/blog/{PostCard,PortableTextRenderer,AuthorBadge,VisualEditing}.tsx`

### Modified (~16)
- `src/components/Hero.tsx`
- `src/app/page.tsx`
- `src/components/Footer.tsx`
- `src/components/nav/SolutionsDropdown.tsx`
- `src/components/nav/ProductsDropdown.tsx`
- `src/components/nav/Nav.tsx`
- `src/components/nav/MobileNav.tsx`
- `src/components/platform/PlatformOverview.tsx`
- `src/page-components/Home.tsx`
- `src/page-components/Roadmap.tsx`
- `src/page-components/Blog.tsx`
- `src/app/sitemap.ts`
- `src/data/siteGraph.meta.ts`
- `scripts/build-link-graph.ts`
- `src/lib/env.ts`
- `next.config.ts`, `package.json`, `.env.example`
- Possibly `src/components/graph/SiteGraph.tsx` (only if needed)

### Untouched
- All non-blog content (jobs, integrations, all marketing components, product detail pages, persona pages, solution pages, hardcoded copy)
- `vercel.json`
- All other routes

---

## Manual actions required (outside code)

1. **Sanity project** — create a new project at sanity.io, provide PROJECT_ID + DATASET before B1–B2 executes
2. **Local `.env`** — add new `NEXT_PUBLIC_*` vars + rename `VITE_*` → `NEXT_PUBLIC_*`
3. **Vercel dashboard** — rename env vars `VITE_DEMO_URL`/`VITE_APP_URL` → `NEXT_PUBLIC_*`; add new Sanity vars
4. **Sanity webhook** — after deploy: create webhook pointing to `https://deploytitan.com/api/revalidate`
5. **Content** — review/refine auto-drafted `InstantRollback.tsx` copy after execution
