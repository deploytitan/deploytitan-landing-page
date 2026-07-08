---
name: DeployTitan
description: Sprint release coordination software for teams that ship without the war room.
colors:
  surface: "#fafaf9"
  surface-alt: "#f5f4f1"
  ink: "#1a1512"
  ink-secondary: "#3d3530"
  ink-tertiary: "#6b6059"
  ink-quaternary: "#9e9189"
  line: "#e5e2dc"
  line-subtle: "#eeece8"
  primary: "#c9a84c"
  primary-light: "#e8d48b"
  primary-dark: "#a68a3e"
  primary-accessible: "#7a6530"
  signal-success: "#22c55e"
  signal-success-text: "#166534"
  signal-warning: "#f59e0b"
  signal-warning-text: "#92400e"
  signal-danger: "#ef4444"
  signal-danger-text: "#b91c1c"
  signal-deploy: "#3b82f6"
  signal-deploy-text: "#1d4ed8"
  dark-surface: "#0d0c0a"
  dark-surface-alt: "#161512"
  dark-ink: "#f5f4f1"
  dark-ink-secondary: "#c8c2b8"
  dark-ink-tertiary: "#8a8078"
  dark-ink-quaternary: "#4a453e"
  dark-line: "#2a2825"
  dark-line-subtle: "#1e1c19"
  dark-primary: "#d4b454"
  dark-primary-light: "#e8d48b"
  dark-primary-dark: "#c9a84c"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 14vw, 5.2rem)"
    fontWeight: 500
    lineHeight: 0.93
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.2vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  micro: "1px"
  sharp: "2px"
  serious: "6px"
  standard: "12px"
  invited: "18px"
  pill: "999px"
  cta: "{rounded.invited}"
  cta-card: "{rounded.standard}"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  page: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.cta}"
    padding: "16px 32px"
  button-primary-nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.invited}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.cta}"
    padding: "16px 32px"
  product-page-hero-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.serious}"
    padding: "10px 20px"
  sharp-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.serious}"
    padding: "{spacing.lg}"
  sharp-card-muted:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.serious}"
    padding: "{spacing.lg}"
  cta-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.cta-card}"
    padding: "40px"
  status-badge:
    backgroundColor: "{colors.signal-success}"
    textColor: "{colors.signal-success-text}"
    rounded: "{rounded.micro}"
    padding: "2px 6px"
---

# Design System: DeployTitan

## 1. Overview

**Creative North Star: "The Instrument Panel"**

DeployTitan’s site should feel like release infrastructure that learned how to speak clearly. The surface is warm, spare, and exact: bone-tinted neutrals, a single precision amber accent, precise borders, and just enough motion to suggest a live system without turning the page into theater. The design is for founders, engineers, and technical leaders who want the point fast.

The homepage and product pages stay in the brand register, but the brand is still operational. The product is not a generic SaaS app and it is not a dark hacker toy. It is a calm instrument for a team that is tired of babysitting GitHub tabs, Jenkins jobs, and Slack approvals at the end of every sprint.

**Key Characteristics:**
- Bone-white and cartridge-paper surfaces carry the page, not pure white
- Precision amber is the only brand accent and must stay rare
- Inter handles display authority, Instrument Sans handles reading, JetBrains Mono marks the machine layer
- Roundedness is intentional: serious technical surfaces use 6px, standard content cards use 12px, and customer-inviting interactions use 18px or pill shapes
- Depth comes from tonal layering, hairline borders, and grid motifs, not default shadows
- Motion is purposeful, sparse, and always respects `prefers-reduced-motion`

## 2. Colors

DeployTitan uses a restrained palette: warm infrastructure neutrals, one amber accent, and a small signal set for system states.

### Primary
- **Precision Amber** (`#c9a84c`, dark: `#d4b454`): The only brand accent. Used for active emphasis, CTA fills on product-page heroes, hover rings, active nav states, and blueprint motifs.
- **Accessible Amber** (`#7a6530`): Small-text amber for labels on light surfaces when the brighter accent would miss contrast.

### Secondary
- **Deploy Blue** (`#3b82f6`, text: `#1d4ed8`): Deployment-progress status only. It is a system signal, not a brand color.

### Tertiary
- **Healthy Green** (`#22c55e`, text: `#166534`): Success and stable states.
- **Warning Amber** (`#f59e0b`, text: `#92400e`): Attention and running states.
- **Danger Red** (`#ef4444`, text: `#b91c1c`): Failure, rollback, and critical states.

### Neutral
- **Bone White** (`#fafaf9`): Default page surface. Warm-tinted and slightly paper-like.
- **Cartridge Paper** (`#f5f4f1`): Secondary surface for panels, rows, and muted cards.
- **Deep Charcoal** (`#1a1512`): Primary ink and the default filled CTA background.
- **Warm Ash** (`#3d3530`): Standard body copy and subtitles.
- **Muted Ore** (`#6b6059`): Supporting labels and lighter body contexts.
- **Pale Ore** (`#9e9189`): Metadata, timestamps, and low-priority labels.
- **Fine Line** (`#e5e2dc`): Default structural border.
- **Ghost Line** (`#eeece8`): Subtle divider where structure is needed without visual weight.

### Named Rules
**The Amber Rarity Rule.** Precision amber is used sparingly. It earns attention by staying rare, not by flooding the page.

**The No-Pure-Extremes Rule.** Never use `#000000` or `#ffffff`. All neutrals stay lightly warmed toward the brand hue.

## 3. Typography

**Display Font:** Inter (with `system-ui, sans-serif` fallback)  
**Body Font:** Instrument Sans (with `system-ui, sans-serif` fallback)  
**Label/Mono Font:** JetBrains Mono (with `monospace` fallback)

**Character:** Inter gives the page command and compression at large sizes. Instrument Sans keeps body copy readable and un-fussy. JetBrains Mono is reserved for the machine layer so operational detail reads like data, not decoration.

### Hierarchy
- **Display** (500, `clamp(3.25rem, 14vw, 5.2rem)`, lh `0.93`): Hero headlines and the most important opening statements. On large screens the homepage hero stretches to `clamp(4.2rem, 6.7vw, 6.65rem)`.
- **Headline** (500, `clamp(2.3rem, 4.2vw, 4rem)`, lh `1.02`): Major section openings. Used once per section.
- **Title** (600, `1.125rem`, lh `1.3`): Card headings, feature names, product names.
- **Body** (400, `1rem`, lh `1.65`): Main reading copy. Keep line length around 65–75ch.
- **Label** (400, `0.6875rem`, tracking `0.08em`): Mono labels, statuses, meta rows, integration strips, and machine-originated text.

### Named Rules
**The Mono Boundary Rule.** JetBrains Mono is only for system-originated or machine-like content: statuses, version-like strings, CLI fragments, and tight labels.

**The Consequence-First Rule.** Headlines state the outcome first. Supporting copy names the situation and the fix without jargon.

## 4. Elevation

DeployTitan is flat at rest. Surfaces do not float by default. Depth comes from surface shifts (`surface` to `surface-alt`), blueprint grids, hairline borders, and rare interaction shadows that appear only when the UI is being touched.

### Shadow Vocabulary
- **Hover Reveal** (`0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(201,168,76,0.06)`): Standard hover shadow for sharp cards and capability rows.
- **Dark Hover Reveal** (`0 2px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(212,180,84,0.08)`): Dark-mode hover version.
- **Primary CTA Hover** (`0 0 0 1px rgba(201,168,76,0.15), 0 2px 8px rgba(0,0,0,0.08)`): Hover treatment for filled CTAs.
- **Focus-Lock Backdrop** (`background: rgba(8,5,3,0.5); backdrop-filter: blur(4px)`): The only blur in the system, reserved for modal backdrops.

### Named Rules
**The Flat-at-Rest Rule.** No element gets ambient elevation just for existing. Shadows are state feedback.

**The Single-Blur Rule.** Blur is only for focus-lock overlays. No glass cards, no frosted panels, no decorative blur.

## 5. Components

### Buttons
- **Shape:** Serious product chrome can stay tight at `6px`; conversion CTAs use the invited radius (`18px`) or pill treatment when the action should feel welcoming.
- **Primary:** Deep-charcoal fill, bone-white text, gold ring on hover. Used for `Create account`, nav CTA, and primary section actions.
- **Outline:** Transparent fill, ink border, amber-tinted hover state. Used for pricing and secondary conversion actions.
- **Ghost / Icon / Dismiss:** Text-first controls with no filled background. Hover shifts color rather than adding decoration.
- **Special case:** `ProductPageHero` uses a smaller amber-filled primary button with serious rounding, distinct from larger invited conversion CTAs.

### Cards / Containers
- **Serious cards:** Default operational container pattern. `6px` radius, `1px` border, no shadow at rest.
- **Standard cards:** Default editorial and marketing content grouping. `12px` radius, `1px` border, no shadow at rest.
- **Muted cards:** Same geometry, but use `surface-alt` for quieter grouping.
- **Spotlight cards:** Add a cursor-following amber radial glow through `.spotlight-card`. Use only where engagement matters.
- **CTA card:** Conversion areas use standard or invited rounding so they feel approachable without becoming playful.

### Navigation
- **Style:** Transparent at the top of the page, then lightly frosted on scroll.
- **Links:** Instrument Sans, small size, ink-secondary at rest.
- **Active state:** Amber text plus a persistent 1px underline.
- **Nav CTA:** Deep-charcoal button with invited rounding so the primary customer action feels approachable.

### Hero and Page Motifs
- **`hero-grid`:** Neutral 60px grid, used where the page needs quiet structure.
- **`blueprint-grid`:** Amber-tinted 120px/24px grid, used for technical sections and product-page heroes.
- **`corner-accent`:** Technical right-angle marks in two opposing corners. Use sparsely, usually once per section.
- **`gold-line`:** Horizontal amber fade divider between major regions.

### Status and System UI
- **Status badges:** `1px` radius, mono uppercase, low-opacity signal backgrounds with higher-contrast signal text.
- **Capability rows:** Flat rows that become slightly lifted and amber-ringed on hover.
- **Hero demo panel:** A sharp, data-dense instrument panel with queue/running/live states, Slack approval moments, and reduced-motion-safe timing.

## 6. Do's and Don'ts

### Do:
- **Do** choose radius by interaction warmth: serious technical UI at `6px`, standard content at `12px`, invited customer actions at `18px` or pill.
- **Do** keep extremely tight `2px` radius only for tiny badges, status chips, and truly machine-like controls.
- **Do** keep amber rare and purposeful: active nav, CTA emphasis, hover rings, blueprint accents.
- **Do** reserve JetBrains Mono for machine-like content and tight labels.
- **Do** keep body copy plain, short, and consequence-first. A founder should understand the product within two minutes.
- **Do** respect `prefers-reduced-motion` for every animation and looping demo.
- **Do** use tonal layering and hairlines before reaching for shadow.

### Don't:
- **Don't** drift into the **generic SaaS cream + purple** aesthetic. Rounding should signal approachability by context, not rounded-everything friendliness.
- **Don't** drift into **dark neon DevOps**. No terminal-green glow, no hacker theatrics, no aggressive gradients on black.
- **Don't** drift into **enterprise boring**. No stock-photo heroes, no lifeless navy dashboards, no generic corporate-grey marketing layouts.
- **Don't** introduce **Phase 2/3 feature creep** into the visual or copy system. The current site is about sprint release coordination, not blast radius, traffic routing, or progressive delivery.
- **Don't** use gradient text except for the single dedicated shimmer motif when that motif is explicitly intended.
- **Don't** use colored side-stripe borders on cards or list items. Use full borders, background tint, or status markers instead.
- **Don't** fill the page with identical icon-heading-text cards. Vary hierarchy and structure.
- **Don't** use pure black or pure white, glassmorphism, bounce easing, or decorative blur.
