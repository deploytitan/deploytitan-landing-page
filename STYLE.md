# Style Guide

This document defines styling conventions for the DeployTitan landing page. **Do not bypass primitives.** Do not inline class strings that primitives already provide.

---

## Brand tokens (defined in `src/index.css @theme`)

| Token                    | Value (light)   | Usage                                                                                   |
| ------------------------ | --------------- | --------------------------------------------------------------------------------------- |
| `--color-ink`            | `#080503`       | Primary text                                                                            |
| `--color-ink-secondary`  | `#5e534a`       | Secondary text, subtitles                                                               |
| `--color-ink-tertiary`   | `#8a8078`       | Tertiary text                                                                           |
| `--color-ink-quaternary` | `#b5aea6`       | Eyebrow labels                                                                          |
| `--color-surface`        | `#fafaf9`       | Page/card background                                                                    |
| `--color-surface-alt`    | `#f5f4f1`       | Muted card background                                                                   |
| `--color-line`           | `#e5e2dc`       | Border color                                                                            |
| `--color-primary`        | `#c9a84c`       | Gold accent (CTA, eyebrow primary, focus rings)                                         |
| `--radius-sharp`         | `2px`           | **All** border-radius — use `rounded-[var(--radius-sharp)]` or let primitives handle it |
| `--font-sans`            | Instrument Sans | Body text                                                                               |
| `--font-display`         | Inter           | Display headings                                                                        |
| `--font-mono`            | JetBrains Mono  | Code, eyebrow labels                                                                    |

Dark-mode overrides live in `.dark {}` in `index.css`. All tokens above are dark-mode aware.

---

## Anti-patterns — never do these

```tsx
// ❌ Inline radius
style={{ borderRadius: '2px' }}
// ✅ Use rounded-[var(--radius-sharp)] or let the primitive handle it

// ❌ Inline primary button
<button className="bg-ink text-surface px-6 py-3 text-sm font-medium hover:opacity-90 ...">
// ✅ Use <Button variant="primary">

// ❌ Inline eyebrow
<p className="font-mono text-[10px] text-ink-quaternary uppercase tracking-widest">
// ✅ Use <Eyebrow> or <SectionHeader eyebrow="...">

// ❌ Inline section + container
<section className="py-20 border-b border-line">
  <div className="max-w-6xl mx-auto px-6">
// ✅ Use <Section><Container>

// ❌ Inline sharp-card
<div className="sharp-card border border-line p-6">
// ✅ Use <Card>

// ❌ Inline page hero
<section className="blueprint-grid pt-28 pb-20 border-b border-line">
  <div className="max-w-4xl mx-auto px-6 text-center">
// ✅ Use <PageHero variant="centered">

// ❌ Inline feature card
<div className="sharp-card border border-line p-5">
  <div className="w-9 h-9 border border-line flex items-center justify-center mb-4">
    {icon}
  </div>
  <h3 className="font-semibold text-ink mb-2">{title}</h3>
  <p className="text-sm text-ink-secondary">{body}</p>
</div>
// ✅ Use <FeatureCard icon={...} title="..." body="...">
```

---

## Primitives reference

### Layout

- **`<Section>`** — section wrapper with padding, border, tone variants
- **`<Container>`** — max-width + horizontal padding wrapper
- **`<PageHero variant="centered|left">`** — blueprint-grid page header
- **`<Card>`** — sharp-card with interactive/spotlight/corner variants

### Typography

- **`<Eyebrow>`** — mono uppercase label
- **`<SectionHeader>`** — eyebrow + h2 + optional subtitle; use instead of raw markup

### Interactive

- **`<Button variant="primary|secondary|ghost|link">`** — all CTA buttons
- **`<StatusPill>`** — replaces `RoadmapBadge`; tone-aware pill
- **`<SegmentedControl>`** — toggles (theme, billing, filters)
- **`<Tabs>`** — Radix-backed accessible tabs
- **`<Accordion>`** — Radix-backed accessible accordion (replaces FaqItem + AccordionGroup)
- **`<Modal>`** — Radix-backed dialog with brand transitions
- **`<Tooltip>`** — Radix-backed tooltip
- **`<Table>`** — branded table wrapper

### Forms

- **`<FormField>`** — label + control + helper/error
- **`<Input>`**, **`<Select>`**, **`<Textarea>`** — brand-styled form controls

### Composite content

- **`<FeatureCard>`** — icon + title + body card (stacked or horizontal)
- **`<FeatureGrid>`** — 2/3/4-col grid wrapper
- **`<StatTile>`** / **`<StatGrid>`** — big-number metric display
- **`<BulletList>`** — check/dot/arrow bullet lists
- **`<BeforeAfter>`** — before/after comparison card
- **`<CrossLinks>`** — "Also in DeployTitan" cross-product links
- **`<PrincipleList>`** — numbered principles/steps list
- **`<PlaceholderPage>`** — "coming soon" page template
- **`<PoweredByBadges>`** — "Powered by Titan X, Y" badge row

### Page templates

- **`<ProductPageLayout>`** — standard product page shell (hero → content → quickstart → cross-links → MidCTA)
- **`<SolutionPageLayout>`** — standard solution page shell
- **`<PersonaPageLayout>`** — standard persona (for X) page shell

---

## Radix usage notes

Radix provides **behavior only** (keyboard navigation, focus management, ARIA). All visual styling is applied by us via className. Never pass Radix's built-in `asChild` or styling props expecting visual output — always style the composed element.

```tsx
// Example: Modal
<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content>
    {/* Radix handles focus trap, escape key, aria-modal */}
    {/* Our CSS (cap-modal-backdrop, cap-modal-panel) handles visuals */}
  </Modal.Content>
</Modal>
```
