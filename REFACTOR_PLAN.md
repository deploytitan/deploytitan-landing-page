# DeployTitan UI Refactor Plan

## Why

The codebase has severe styling and structural duplication:

- **139** inline `style={{ borderRadius: '2px' }}` — should be a single token
- **31** copy-pasted primary-button class strings — `Button` exists but is bypassed
- **67** inlined eyebrow label strings — `SectionHeader` exists but is under-used
- **~29** page-hero copy-pastes across product/solution/persona/info pages
- **~165** section+container `py-*/max-w-*/mx-auto` duplicates
- **~40** inline FeatureCard implementations across 9 component files
- **4** near-identical product page templates (~200 LOC each → ~30 LOC)
- **3** independent segmented-control reimplementations
- **2** ad-hoc accordion implementations
- **0** accessibility coverage on modals/tabs/accordions

## Decision: No daisyUI

daisyUI's rounded/shadowed/semantic-color defaults conflict with the sharp-2px/gold-on-ink blueprint aesthetic. Instead: expand the in-house `shared/` primitive library, backed by **Radix UI** for headless behavior (a11y + keyboard without visual opinions).

---

## Directory: `src/components/shared/` (flat)

All new primitives land here. Existing primitives to keep: `CodeBlock`, `InstallTabs`, `LogoCloud`, `ThemeToggle`, `MidCTA`, `Button` (needs enforcement), `SectionHeader` (needs enforcement + expansion).

---

## Phases & PRs

### PR-1 — Foundation

- Add `--radius-sharp: 2px` to `@theme` in `src/index.css`
- Write `STYLE.md` (anti-patterns, token names, when to use each primitive)
- Install Radix packages: `@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-accordion`, `@radix-ui/react-tooltip`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-select`

### PR-2 — Layout primitives: Section + Container + Card

- `Section.tsx` — `padding="md|lg|xl"`, `tone="default|muted"`, `border="bottom|none"`, `as`
- `Container.tsx` — `width="3xl|4xl|5xl|6xl|page"`, `padding="default|wide"`
- `Card.tsx` — variants `default|spotlight|corner|plain`, `interactive`, `reveal`, `as`
- Refactor: 42 section wrappers, 123 container divs, 72 sharp-card usages

### PR-3 — Eyebrow + SectionHeader enforcement

- `Eyebrow.tsx` — `size="10|11"`, `tone="primary|muted|tertiary"`, children
- Expand `SectionHeader.tsx` — add `eyebrowTone`, `size`, `align` props
- Refactor: 67 inlined eyebrow strings

### PR-4 — PageHero

- `PageHero.tsx` — `variant="centered|left"`, `eyebrow`, `title`, `subtitle`, `actions?`, `badge?`
- `centered`: blueprint-grid + text-center, primary-tone eyebrow (products/solutions/for)
- `left`: blueprint-grid + max-w-2xl, muted-tone eyebrow (info pages)
- Refactor: ~29 page heroes

### PR-5 — Button enforcement

- Audit 18+ inline primary-button strings
- Add missing variants if needed (`cta-large`, `secondary`)
- Ensure `as="a"` + `href` and `as={Link}` + `to` work
- Refactor all callsites

### PR-6 — Small content primitives

- `BulletList.tsx` — `variant="check|dot|arrow"`, `items`, `tone`
- `StatusPill.tsx` — replaces `RoadmapBadge`; `tone="success|primary|neutral|danger|warning"`, `dot?`
- `StatTile.tsx` — `value`, `label`, `sub?`, `size="sm|md|lg"`
- `StatGrid.tsx` — grid wrapper for `StatTile`

### PR-7 — FeatureCard + FeatureGrid

- `FeatureCard.tsx` — `icon`, `title`, `body`, `href?`, `iconStyle="inline|boxed"`, `layout="stacked|horizontal"`, `tone`
- `FeatureGrid.tsx` — `columns={2|3|4}` wrapper
- Refactor: ~9 grids, ~40 inline card instances across Solution, Resilience, ShiftLeft, IntegrationSimplicity, Outcomes, TitanPulse, PlatformEngineering, RiskIntelligence, MultiCloudResilience, Security, EarlyAccess, Contact, Docs

### PR-8 — Composite page-section components

- `CrossLinks.tsx` — `eyebrow`, `items=[{label, desc, href}]`; replaces "Also in DeployTitan" in all 4 product pages
- `PrincipleList.tsx` — `items=[{number, title, body}]`, `variant="cards|inline"`; replaces in Journey, HowItWorks, About
- `PlaceholderPage.tsx` — `eyebrow`, `title`, `body?`, `contactEmail?`; thin wrapper used by Blog, Changelog, Customers, Privacy, Terms
- `PoweredByBadges.tsx` — `products=[string]`; used in solution page breadcrumb rows

### PR-9 — BeforeAfter promotion

- Expand existing `BeforeAfter.tsx`: `before={{title, items}}`, `after={{title, items}}`, `layout="horizontal|vertical"`
- Refactor inline implementations in Solutions.tsx (PainPointRow), ForSRE.tsx (PAIN_POINTS), MultiCloudResilience.tsx (SCENARIOS)

### PR-10 — Form primitives

- `Input.tsx`, `Select.tsx`, `Textarea.tsx`, `Label.tsx`, `FormField.tsx`
- All bake in: `border border-line px-3 py-2.5 text-sm bg-surface focus:border-primary/50 focus:outline-none rounded-sharp`
- Refactor: `EarlyAccess.tsx` (4 inputs, 3 selects, 1 textarea) and `CTA.tsx` (newsletter input)

### PR-11 — SegmentedControl

- `SegmentedControl.tsx` — generic n-segment with gold active state
- Refactor: `ThemeToggle.tsx` (3-segment light/system/dark), `Pricing.tsx` (monthly/annual), `Integrations.tsx` (category filter)

### PR-12 — Tabs + Accordion (Radix)

- `Tabs.tsx` — backed by `@radix-ui/react-tabs`; restyle `InstallTabs` on top of it
- `Accordion.tsx` — backed by `@radix-ui/react-accordion`; replace `FaqItem` (Pricing) + `AccordionGroup` (MobileNav)

### PR-13 — Modal + Tooltip (Radix)

- `Modal.tsx` — backed by `@radix-ui/react-dialog`; wires up existing `cap-modal-*` CSS
- `Tooltip.tsx` — backed by `@radix-ui/react-tooltip`; ink background, mono font, gold border accent

### PR-14 — Table primitive

- `Table.tsx` — `<Table>`, `<Table.Head>`, `<Table.Row>`, `<Table.Cell>` with line/ink tokens
- Refactor Pricing comparison matrix

### PR-15 — ProductPageLayout

- `ProductPageLayout.tsx` — hero → children → quickstart (InstallTabs + 2× CodeBlock) → CrossLinks → MidCTA
- Props: `meta`, `quickstart`, `crossLinks`, `midCta`, `children`
- Refactor: TitanPulse, TitanShield, TitanSentinel, TitanRollout (~200 LOC → ~30 LOC each)

### PR-16 — SolutionPageLayout

- `SolutionPageLayout.tsx` — breadcrumb + PoweredByBadges → hero → children → MidCTA
- Refactor: ProgressiveDelivery, PlatformEngineering, RiskIntelligence, MultiCloudResilience

### PR-17 — PersonaPageLayout

- `PersonaPageLayout.tsx` — hero → pain section → wins grid → MidCTA
- Refactor: ForCTO, ForDevOps, ForSRE

### PR-18 — Token hygiene + Storybook

- Find/replace all `style={{ borderRadius: '2px' }}` → `className="rounded-[var(--radius-sharp)]"` (or let primitives handle it)
- Audit dead keyframes and unused CSS classes in `index.css`
- Set up Storybook for the `shared/` catalog
- Finalize `STYLE.md` with full primitive API + anti-pattern examples

---

## New `shared/` inventory (after all PRs)

### Layout

- `Section`, `Container`, `PageHero`, `Card`

### Typography

- `Eyebrow`, `SectionHeader`

### Interactive primitives

- `Button`, `StatusPill`, `SegmentedControl`, `Tabs`, `Accordion`, `Modal`, `Tooltip`, `Table`, `DropdownMenu`

### Form primitives

- `Input`, `Select`, `Textarea`, `Label`, `FormField`

### Composite content

- `FeatureCard`, `FeatureGrid`, `StatTile`, `StatGrid`, `BulletList`, `BeforeAfter`, `CrossLinks`, `PrincipleList`, `PlaceholderPage`, `PoweredByBadges`

### Page-template layouts

- `ProductPageLayout`, `SolutionPageLayout`, `PersonaPageLayout`

### Existing (kept)

- `CodeBlock`, `InstallTabs`, `LogoCloud`, `ThemeToggle`, `MidCTA`

---

## Expected impact (before → after)

| Metric                             | Before | After                                 |
| ---------------------------------- | ------ | ------------------------------------- |
| Inline `borderRadius: '2px'`       | 139    | 0                                     |
| Copy-pasted primary-button strings | 31     | 0                                     |
| Inlined eyebrow strings            | 67     | 0                                     |
| Page hero copy-pastes              | ~29    | 0                                     |
| Section/container duplicates       | ~165   | 0                                     |
| Inline FeatureCard instances       | ~40    | 0                                     |
| Product page LOC (each)            | ~200   | ~30                                   |
| `shared/` primitive count          | 7      | ~30                                   |
| Radix a11y coverage                | 0      | Modal/Tabs/Accordion/Tooltip/Dropdown |
| Storybook catalog                  | ✗      | ✓                                     |
