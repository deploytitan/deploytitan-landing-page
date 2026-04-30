# DeployTitan — Implementation Plan
## Dark Mode + Site Graph + Missing Pages

> Generated: 2026-04-30  
> Scope: All three workstreams — dark mode toggle, Obsidian-style site graph, developer-surface + company pages

---

## Decisions (locked)

- **Dark mode strategy**: CSS variable swap (`.dark` selector overrides `@theme` tokens). Tailwind v4 `@custom-variant dark`. Persisted to `localStorage` key `dt-theme`. Defaults to system preference.
- **FOUC prevention**: inline blocking `<script>` in `index.html` `<head>` reads `localStorage` and `matchMedia`, sets `class="dark"` before paint.
- **Site graph library**: `react-force-graph-2d` (canvas-based, closest to Obsidian aesthetic)
- **Backlink data**: build-time Vite plugin crawls `src/pages/**/*.tsx` for `<Link to>` + `href` + `App.tsx` route table; emits `src/data/siteGraph.generated.ts`. Manual metadata in `src/data/siteGraph.meta.ts`.
- **New pages priority**: Developer Surface (docs, integrations, CLI, API, roadmap) > Company (about, careers, contact, press, partners)
- **Dark CodeBlock**: shiki theme switches between `github-dark` and `github-light` via `useTheme()`

---

## Phase 1 — Dark Mode

### Files to create
- [ ] `src/contexts/ThemeContext.tsx` — provider, `theme: 'light'|'dark'|'system'`, localStorage persist
- [ ] `src/hooks/useTheme.ts` — consumer hook
- [ ] `src/components/shared/ThemeToggle.tsx` — 3-segment Sun/Monitor/Moon, sharp 2px, gold active

### Files to modify
- [ ] `index.html` — inline blocking script, prevents FOUC
- [ ] `src/main.tsx` — wrap `<App>` in `<ThemeProvider>`
- [ ] `src/index.css` — add `@custom-variant dark`, `.dark { --color-* }` overrides for all tokens + dark variants of blueprint-grid, gold-shimmer, spotlight-card, noise overlay, sharp-card
- [ ] `src/components/nav/Nav.tsx` — mount `<ThemeToggle />` desktop
- [ ] `src/components/nav/MobileNav.tsx` — mount `<ThemeToggle />` in mobile drawer
- [ ] `src/components/shared/CodeBlock.tsx` — switch shiki theme by `useTheme()`

### Dark token palette
| Token | Light | Dark |
|---|---|---|
| `--color-surface` | `#fafaf9` | `#0d0c0a` |
| `--color-surface-elevated` | `#f5f4f1` | `#161512` |
| `--color-surface-sunken` | `#eeecea` | `#0a0908` |
| `--color-ink` | `#080503` | `#f5f4f1` |
| `--color-ink-secondary` | `#4a453e` | `#a8a39a` |
| `--color-ink-tertiary` | `#7a7369` | `#6b6560` |
| `--color-ink-quaternary` | `#a8a39a` | `#4a453e` |
| `--color-line` | `#e5e2dc` | `#2a2825` |
| `--color-line-subtle` | `#f0ede8` | `#1a1815` |
| `--color-primary` | `#c9a84c` | `#d4b454` |
| `--color-primary-light` | `#e8d48a` | `#e8d48a` |
| `--color-primary-dark` | `#a68a3e` | `#c9a84c` |

---

## Phase 2 — Site Graph

### Files to create
- [ ] `vite-plugin-link-graph.ts` — scans pages for `<Link to="…">`, `href="/…"`, `to={…}` (static strings); walks App.tsx route table; emits `src/data/siteGraph.generated.ts`
- [ ] `src/data/siteGraph.meta.ts` — manual metadata (group, weight, description, icon) merged with generated nodes
- [ ] `src/components/graph/SiteGraph.tsx` — ForceGraph2D wrapper, themed, hover-highlight-neighbors, click-navigate, search, group filter
- [ ] `src/components/graph/LocalGraph.tsx` — small per-page 1-hop widget
- [ ] `src/pages/Sitemap.tsx` — `/sitemap` route, graph + `?view=tree` fallback
- [ ] `scripts/generate-sitemap-xml.ts` — buildEnd hook → `dist/sitemap.xml` + `robots.txt`

### Files to modify
- [ ] `vite.config.ts` — register link-graph plugin + sitemap-xml hook
- [ ] `src/App.tsx` — add `/sitemap` route
- [ ] Footer — add "Site graph" link

### Node groups & colors (both modes)
| Group | Light color | Dark color |
|---|---|---|
| `home` | gold `#c9a84c` | `#d4b454` |
| `product` | blue `#3b82f6` | `#60a5fa` |
| `solution` | green `#22c55e` | `#4ade80` |
| `persona` | purple `#a855f7` | `#c084fc` |
| `resource` | cyan `#06b6d4` | `#22d3ee` |
| `company` | warm-gray `#78716c` | `#a8a09a` |
| `trust` | amber `#f59e0b` | `#fbbf24` |
| `legal` | neutral `#9ca3af` | `#6b7280` |

---

## Phase 3 — Developer Surface Pages

- [ ] `/docs` — shell with hero, quick-link cards (Quickstart, CLI, API, Concepts, Guides), search placeholder, "Open full docs →" via `VITE_DOCS_URL`
- [ ] `/integrations` — index with `src/data/integrations.ts` (20+ integrations), filterable by category (CI/CD, Observability, Cloud, Notifications, IaC, Security)
- [ ] `/integrations/:slug` — detail template: overview, setup steps, CodeBlock snippet, related products, `useDocumentMeta`
- [ ] `/cli` — install matrix (`<InstallTabs />`), top-12 commands with `<CodeBlock />`, link to full reference
- [ ] `/api` — REST + CLI reference landing, OpenAPI link, auth guide snippet, `VITE_API_DOCS_URL`
- [ ] `/roadmap` — 3-column kanban (Now / Next / Later), `.sharp-card` items, "Suggest a feature" → GitHub Discussions CTA

---

## Phase 4 — Company Pages

- [ ] `/about` — mission, founding story (link → `/journey`), 4 values, team grid (placeholder), investors strip, press contact
- [ ] `/careers` — open roles list (`src/data/jobs.ts`, 6 placeholder roles), benefits grid, "Don't see your role?" CTA
- [ ] `/contact` — 3-column routing (Sales / Support / Press), simple mailto form, `VITE_CONTACT_ENDPOINT`
- [ ] `/press` — press releases list, media contact, brand kit CTA
- [ ] `/brand` — logo downloads (SVG/PNG), color swatches, typography, usage guidelines
- [ ] `/partners` — partner program overview, cloud/tooling partner logos (AWS, GCP, Azure, Datadog, GitHub, GitLab)

---

## Phase 5 — Wire-up

- [ ] `ResourcesDropdown` in Nav — add Roadmap, CLI Reference, Integrations links
- [ ] Footer — all new page links in correct columns
- [ ] `App.tsx` — all new routes registered (including dynamic `/integrations/:slug`)
- [ ] `LocalGraph` widget on product + solution pages (sidebar or below content)
- [ ] `sitemap.xml` Vite buildEnd hook wired up
- [ ] `useDocumentMeta` applied to all new pages
- [ ] `<MidCTA />` close on every new full page

---

## Phase 6 — Final QA

- [ ] Dark mode visual pass on every new page
- [ ] Force graph renders with crawled backlinks in both light + dark
- [ ] All routes have correct `useDocumentMeta` title + description
- [ ] No hard-coded `bg-white` / `text-black` / hex literals in new pages
- [ ] Mobile nav dark-mode toggle works
- [ ] `sitemap.xml` validates
- [ ] `npm run build` completes without type errors
