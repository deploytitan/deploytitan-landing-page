# DeployTitan — TODO

Generated: 2026-05-06

Status key: [ ] pending · [x] complete · [~] in progress

---

## Workstream A — Hero copy

- [ ] **A1** `src/components/Hero.tsx:358–374` — H1: "Ship more. / Break less. / Know why." (preserve underline span on 3rd line)
- [ ] **A2** `src/components/Hero.tsx:377–384` — Subhead: "Releases shouldn't be the scariest part of your week. Stop guessing which release broke production."
- [ ] **A3** `src/components/Hero.tsx:387–394` — Tagline: "Catch risk early. Ship without fear. Learn from every release."
- [ ] **A4** `src/app/page.tsx:5` — Title: "DeployTitan — Ship more. Break less. Know why."

---

## Workstream D — Product list cleanup

- [ ] **D1a** `src/components/Footer.tsx:73` — Remove broken Titan Sentinel link
- [ ] **D1b** `src/components/Footer.tsx:74` — Remove broken Titan Pulse link
- [ ] **D1c** `src/components/nav/SolutionsDropdown.tsx:35` — product: 'Titan Sentinel' → 'Titan Foresight'
- [ ] **D1d** `src/page-components/Roadmap.tsx:48` — tag Titan Sentinel → Titan Foresight
- [ ] **D1e** `src/page-components/Roadmap.tsx:64` — tag Titan Pulse → Titan Ledger
- [ ] **D2** `src/components/Footer.tsx` — Complete product list (7 products, · Soon suffix for Insight/Sandbox)
- [ ] **D3** `src/components/platform/PlatformOverview.tsx` — Restructure to 7 products, new headline, 3 new visuals, badge support
- [ ] **D3b** `src/page-components/Home.tsx:15` — Fix stale comment
- [ ] **D4a** `src/components/nav/SolutionsDropdown.tsx` — Add Recovery lane (instant-rollback)
- [ ] **D4b** Create `src/app/solutions/instant-rollback/page.tsx`
- [ ] **D4c** Create `src/page-components/solutions/InstantRollback.tsx` (full content, drafted from TitanPhoenix.tsx)
- [ ] **D4d** `src/app/sitemap.ts` — Add /solutions/instant-rollback
- [ ] **D4e** `src/data/siteGraph.meta.ts` — Add node for /solutions/instant-rollback
- [ ] **D5** `src/components/nav/ProductsDropdown.tsx:137–139` — Replace inline pill with `<RoadmapBadge variant="roadmap" />`
- [ ] **D6** `src/components/nav/MobileNav.tsx:116–123` — Replace inline "Preview" pill with `<RoadmapBadge variant="roadmap" />`

---

## Q7 — Env var rename

- [ ] **Q7a** Grep VITE_ references in src/
- [ ] **Q7b** `src/lib/env.ts` — rename VITE_* → NEXT_PUBLIC_*
- [ ] **Q7c** `.env.example` — rename VITE_* keys
- [ ] **Q7d** (manual) Update local .env + Vercel dashboard

---

## Workstream B — Sanity CMS

- [ ] **B0** `next.config.ts` — remove output: 'export', update images config, verify pnpm build
- [ ] **B1** `package.json` — install Sanity deps (next-sanity, @sanity/client, @sanity/image-url, @sanity/vision, @portabletext/react, @sanity/code-input, sanity, styled-components)
- [ ] **B2** `.env.example` — add Sanity vars (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET)
- [ ] **B3** Create `sanity.config.ts` (root)
- [ ] **B3b** Create `sanity.cli.ts` (root)
- [ ] **B4a** Create `src/sanity/schemas/post.ts`
- [ ] **B4b** Create `src/sanity/schemas/author.ts`
- [ ] **B4c** Create `src/sanity/schemas/category.ts`
- [ ] **B4d** Create `src/sanity/schemas/index.ts`
- [ ] **B7a** Create `src/app/studio/[[...tool]]/page.tsx`
- [ ] **B7b** Create `src/app/studio/layout.tsx`
- [ ] **B5a** Create `src/sanity/lib/client.ts`
- [ ] **B5b** Create `src/sanity/lib/image.ts`
- [ ] **B5c** Create `src/sanity/lib/queries.ts`
- [ ] **B5d** Create `src/sanity/lib/live.ts`
- [ ] **B6a** Create `src/app/api/draft-mode/enable/route.ts`
- [ ] **B6b** Create `src/app/api/draft-mode/disable/route.ts`
- [ ] **B6c** Create `src/app/api/revalidate/route.ts`
- [ ] **B8a** Replace `src/page-components/Blog.tsx` stub
- [ ] **B8b** Create `src/app/blog/[slug]/page.tsx`
- [ ] **B8c** Create `src/components/blog/PostCard.tsx`
- [ ] **B8d** Create `src/components/blog/PortableTextRenderer.tsx`
- [ ] **B8e** Create `src/components/blog/AuthorBadge.tsx`
- [ ] **B8f** Create `src/components/blog/VisualEditing.tsx`
- [ ] **B9a** `src/components/nav/Nav.tsx` — add Blog top-nav link
- [ ] **B9b** `src/components/nav/MobileNav.tsx` — add Blog mobile entry
- [ ] **B10** `src/app/sitemap.ts` — async conversion + blog post URLs
- [ ] **B12** (manual) Sanity dashboard: create revalidation webhook

---

## Workstream C — Graph script extension

- [ ] **C1** `scripts/build-link-graph.ts` — dynamic-route source registry, /blog/:slug → Sanity
- [ ] **C2** `src/data/siteGraph.meta.ts` — add defaultGroupForRoute() helper
- [ ] **C3** `src/components/graph/SiteGraph.tsx` — verify/fix meta-less node tolerance

---

## Verify

- [ ] `pnpm build` succeeds
- [ ] `pnpm start` — check /blog, /blog/[slug], /studio, /sitemap.xml, /solutions/instant-rollback
- [ ] Force-graph renders without errors; blog post nodes appear after a post is published
