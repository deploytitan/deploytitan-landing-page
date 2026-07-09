---
name: DeployTitan
description: Content and products for AI-adopting engineering teams that need to move faster and ship safer.
colors:
  # Light mode surfaces
  surface: "#fafaf9"
  surface-alt: "#f5f4f1"
  # Ink hierarchy (light mode)
  ink: "#1a1512"
  ink-secondary: "#3d3530"
  ink-tertiary: "#6b6059"
  ink-quaternary: "#9e9189"
  # Lines (light mode)
  line: "#e5e2dc"
  line-subtle: "#eeece8"
  # Primary accent: precision amber
  primary: "#c9a84c"
  primary-light: "#e8d48b"
  primary-dark: "#a68a3e"
  primary-accessible: "#7a6530"
  # Gold aliases (same values; canonical token name in CSS is --color-gold-*)
  gold: "#c9a84c"
  gold-light: "#e8d48b"
  gold-dark: "#a68a3e"
  # Signal colors (light mode)
  signal-success: "#22c55e"
  signal-warning: "#f59e0b"
  signal-danger: "#ef4444"
  signal-deploy: "#3b82f6"
  # Dark mode overrides (namespaced; applied via .dark class)
  dark-surface: "#0d0c0a"
  dark-surface-alt: "#161512"
  dark-ink: "#f5f4f1"
  dark-ink-secondary: "#c8c2b8"
  dark-ink-tertiary: "#8a8078"
  dark-ink-quaternary: "#4a453e"
  dark-line: "#2a2825"
  dark-line-subtle: "#1e1c19"
  dark-primary: "#d4b454"
  dark-gold: "#d4b454"
  dark-signal-success: "#4ade80"
  dark-signal-warning: "#fbbf24"
  dark-signal-danger: "#f87171"
  dark-signal-deploy: "#60a5fa"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.018em"
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
  sharp: "2px"
  none: "0px"
  micro: "1px"
  serious: "6px"
  standard: "12px"
  invited: "18px"
  pill: "999px"
  button: "{rounded.invited}"
  card-approachable: "{rounded.standard}"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  page: "48px"
components:
  # Roundedness follows interaction warmth.
  # Serious technical controls use 6px. Customer-inviting actions use 18px or pill.
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.invited}"
    padding: "16px 32px"
  button-primary-xs:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.serious}"
    padding: "10px 20px"
  button-primary-lg:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.invited}"
    padding: "16px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.invited}"
    padding: "14px 32px"
  button-outline-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sharp}"
    padding: "0px"
  button-dismiss:
    backgroundColor: "transparent"
    textColor: "{colors.surface}"
    rounded: "{rounded.sharp}"
    padding: "0px"
  # Cards
  sharp-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sharp}"
    padding: "{spacing.lg}"
  sharp-card-muted:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.sharp}"
    padding: "{spacing.lg}"
  spotlight-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sharp}"
    padding: "{spacing.lg}"
  cta-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card-approachable}"
    padding: "{spacing.lg}"
  # Capability row
  cap-row:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.sharp}"
    padding: "{spacing.md}"
  # Status badge
  status-badge:
    backgroundColor: "{colors.signal-success}"
    textColor: "{colors.signal-success}"
    rounded: "{rounded.micro}"
    padding: "2px 6px"
---

# Design System: DeployTitan

## 1. Overview

**Creative North Star: "The Instrument Panel"**

DeployTitan's visual language is built on a single premise: aircraft-grade precision for AI-era engineering work. Every surface reads like a cockpit display, purposeful and calibrated, nothing decorative. Phase 1 is content-led, so the system must make long-form insight feel as intentional as product UI. The color system uses two registers: a bone-warm neutral field that recedes, and one operational accent (precision amber) that appears only where it earns its place. Type is set in two voices: Inter for authority at scale, Instrument Sans for legibility at reading size, and JetBrains Mono for the machine layer that runs beneath both.

The system is explicitly dark-capable. Light mode reads like a technical data sheet printed on aged cartridge paper; dark mode reads like a mission-critical terminal at 2am. Neither is an afterthought. Both are deployed via the `.dark` class toggle; every token has a matching dark override.

**Key Characteristics:**
- Serious technical surfaces use 6px, standard content panels use 12px, and customer-inviting actions use 18px or pill shapes
- Primary CTAs (`button-primary`, `button-outline`) use invited rounding to signal approachability at conversion moments
- CTA and intake surfaces use 12px or 18px depending on whether they read as content panels or direct customer actions
- Precision amber accent used at ≤10% of any surface; its rarity is the point
- Mono layer (JetBrains Mono) reserved strictly for machine-readable content: labels, statuses, version strings, event logs
- Noise texture overlay (opacity 0.02) adds material depth without decoration
- Two grid motifs: `.hero-grid` (neutral 60px squares) and `.blueprint-grid` (amber-tinted 120px major / 24px minor) signal engineered structure, not ornamentation
- Full dark mode parity: every token has an override; behavior is identical, atmosphere differs

## 2. Border Radius System

The radius system has four tiers. Knowing which tier to use and why prevents brand drift.

### Tier 1: Serious (6px)
Everything that is structural, technical, or informational uses `border-radius: 6px`. This includes:
- Dense product panels, evidence modules, feature rows, and capability panels
- Cards at rest when they represent operational content
- Input fields and compact controls
- Internal UI elements such as column headers, panel footers, and integration strips

**Rule:** If an element shows data, contains machine-readable content, or is part of the product interface vocabulary, it uses 6px.

### Tier 2: Standard (12px)
Used on content containers that should feel approachable without losing technical restraint:
- Blog cards, article modules, and marketing content panels
- Founder notes, editorial callouts, and waitlist form panels
- CTA section outer cards when they are content containers

**Rule:** 12px is the standard editorial and marketing content radius. It tells the reader: "this is a human-readable surface."

### Tier 3: Invited (18px)
Customer-inviting actions and surfaces use `rounded-[var(--radius-invited)]`:
- Hero "Join waitlist" or "Request early access" buttons
- Contact and waitlist conversion actions
- Nav bar CTA
- High-intent signup or intake surfaces when the whole surface is a customer action

**Rule:** Invited rounding makes conversion feel approachable without making technical panels soft.

### Tier 4: Micro (1px to 2px)
Micro shapes stay sharp:
- Status badges and tags
- Status dots
- Inline tags
- Decorative corner-accent marks
- Code-block window controls

**Summary table:**

| Context | Radius | Token |
|---|---|---|
| Dense technical panels, data containers | 6px | `rounded-[var(--radius-serious)]` |
| Editorial cards, article modules, content panels | 12px | `rounded-[var(--radius-standard)]` |
| Primary and outline CTA buttons | 18px | `rounded-[var(--radius-invited)]` |
| Category chips, filter chips, friendly inline actions | Pill | `rounded-[var(--radius-pill)]` |
| CTA section outer card | 12px or 18px | `rounded-[var(--radius-standard)]` or `rounded-[var(--radius-invited)]` |
| Status badges, dots, micro tags | 1px | `rounded-[1px]` |
| Nav bar CTA button (xs) | 18px | `rounded-[var(--radius-invited)]` |

## 3. Colors: The Instrument Palette

Restrained strategy: ink-tinted neutrals carry the surface; one precision amber accent appears where operational attention is required.

### Primary
- **Precision Amber** (`#c9a84c` / dark: `#d4b454`): The system's single accent color. Used for active CTAs, focus states, gold-line dividers, blueprint grid tinting, and status highlights. Never decorative. In dark mode, the amber brightens slightly to maintain perceptual weight against the deep surface. The muted form (`rgba(201,168,76,0.15)`) appears as subtle hover fills on outline buttons and card hover rings.

### Neutral
- **Bone White** (`#fafaf9`): Default page surface. Tinted toward the amber hue (not pure white); gives the system material warmth without softness.
- **Cartridge Paper** (`#f5f4f1`): Secondary surface. Used for table rows, card interiors, nav backgrounds on scroll, and elevated containers within the surface layer.
- **Deep Charcoal** (`#1a1512`): Primary text. Slightly warm-tinted away from pure black; functions as the primary button background in light mode.
- **Warm Ash** (`#3d3530`): Secondary text. Body copy, subtitles, supporting labels.
- **Muted Ore** (`#6b6059`): Tertiary text. Decorative labels, supplementary captions.
- **Pale Ore** (`#9e9189`): Quaternary text. The faintest readable voice; used for timestamps, footnotes, and metadata.
- **Fine Line** (`#e5e2dc`): Default border. Hairline divisions between sections and card boundaries.
- **Ghost Line** (`#eeece8`): Subtle border. Used where a line is structurally required but should barely register.

### Signal Colors
- **Deploy Blue** (`#3b82f6` / dark: `#60a5fa`): Active deployment state.
- **Healthy Green** (`#22c55e` / dark: `#4ade80`): Success, stable, and healthy states.
- **Warning Amber** (`#f59e0b` / dark: `#fbbf24`): Warning states (distinct from the primary amber by saturation and role).
- **Danger Red** (`#ef4444` / dark: `#f87171`): Error, rollback, and critical states.

All four signal colors lift one step in dark mode to maintain contrast against near-black surfaces.

### Named Rules
**The Amber Rarity Rule.** Precision amber is used on ≤10% of any screen in light mode. Every use must earn its place by directing attention to something operationally significant. Decorative amber is forbidden. Amber shimmer text is a one-off motif reserved for the single hero word or standalone callout; do not proliferate it.

**The No-Pure-Extremes Rule.** `#000000` and `#ffffff` never appear. Every neutral is tinted toward the amber hue (chroma 0.005–0.01 minimum). This prevents the system from reading as generic-tech monochrome.

## 4. Typography

**Display Font:** Inter (400, 500, 600, 700; with system-ui, sans-serif fallback)
**Body Font:** Instrument Sans (400, 500, 600, 700; with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (400, 500; with monospace fallback)

**Character:** Inter carries command at scale: tight tracking, compressed leading, the voice of a system that has something definitive to say. Instrument Sans handles the reading layer: warm humanist geometry, readable at body size without fatigue. JetBrains Mono is the machine voice: version strings, event log lines, status badges, CLI copy. The pairing has one axis of contrast (geometric authority vs. humanist legibility) and a third register (mono/machine) that appears only when the UI is surfacing data that came from a system, not a human.

### Hierarchy
- **Display** (500, `clamp(2rem, 3.8vw, 4rem)`, lh 1.08, tracking -0.022em): Hero headlines only. The `.hero-grid` section. Three or fewer lines. Never used below the fold for section titles.
- **Headline** (500, `clamp(1.5rem, 2.5vw, 2.5rem)`, lh 1.15, tracking -0.018em): Section-opening statements. Used once per major content block.
- **Title** (600, `1.125rem`, lh 1.3): Feature names, product names, card headings. Instrument Sans; heavier than body to create hierarchy without scale.
- **Body** (400, `1rem`, lh 1.65): Primary reading copy. Max line length 65–75ch. Instrument Sans.
- **Label** (400, `0.6875rem`, lh 1.4, tracking 0.08em): JetBrains Mono exclusively. Version strings, event log entries, status badges, CLI copy, timestamp metadata, table column headers. All-caps where the label is categorical (section labels, tag names); sentence case where the label contains variable data.

### Hero headline sizing

The hero headline uses a larger scale than the display token: `clamp(3.25rem, 14vw, 5.2rem)` on mobile/tablet, `clamp(4.2rem, 6.7vw, 6.65rem)` on desktop. This is intentional — the hero is the only place where type can be this large. Section headlines cap at `clamp(2.3rem, 4.2vw, 4rem)`.

### Named Rules
**The Mono Boundary Rule.** JetBrains Mono is used only when the content originated from a machine or system: version numbers, deployment statuses, command-line strings, log lines, timestamps. Human-authored labels, section headers, and navigation use Instrument Sans. Mixing registers violates the system's information hierarchy.

**The Tracking Inversion Rule.** Display and headline type uses negative tracking (tightened). Label mono type uses positive tracking (widened). Body is set at normal. Never apply positive tracking to large type.

## 5. Elevation

DeployTitan is flat by default. Surfaces do not float. Depth is not conveyed through ambient shadows on resting states; it is conveyed through surface color steps (surface → surface-alt), hairline borders (1px at `var(--color-line)`), and the grid/blueprint motifs that separate regions by structure rather than lift.

Shadows appear only as a response to state: hover on interactive containers, active focus rings, and modal backdrops. No element has a shadow at rest.

### Shadow Vocabulary
- **Hover reveal** (`0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(201,168,76,0.06)`): Applied to `.sharp-card:hover` and `.cap-row:hover`. The amber ring at 6% opacity is the tell; it's not a glow, it's a precision outline that surfaces on interaction.
- **Modal backdrop** (`background: rgba(8,5,3,0.5), backdrop-filter: blur(4px)`): The only blur in the system. Purposeful: it removes the page context so the modal has full attention. Not decorative glass; structural focus management.
- **Gold pulse ring** (`0 0 0 3px rgba(201,168,76,0.08)` at 50%): Used on `.dd-integration-pulse`. Subtle heartbeat to indicate an active live connection.

### Named Rules
**The Flat-at-Rest Rule.** No element has a box-shadow at rest. Shadows are state transitions, not baseline styles. If a component needs visual weight at rest, achieve it through border, background tint, or scale, not shadow.

**The Single-Blur Rule.** `backdrop-filter: blur()` is used only on `.cap-modal-backdrop`. It is not a glass card treatment; it is a focus-lock mechanism. Do not apply blur to resting cards, nav, or banners.

## 6. Components

### Buttons
Roundedness follows interaction warmth: tighter for serious technical work, warmer for customer-inviting actions.

- **Shape:** 
  - Dense technical controls: `rounded-[var(--radius-serious)]`
  - Nav bar CTA and conversion CTAs: `rounded-[var(--radius-invited)]` or pill treatment
  - Compact category/filter actions: `rounded-[var(--radius-pill)]`
- **Primary:** Deep charcoal background (`bg-ink`), bone surface text (`text-surface`). On hover: a compound ring shadow appears: `0 0 0 1px rgba(201,168,76,0.15), 0 2px 8px rgba(0,0,0,0.08)`. The gold ring at 15% opacity is the hover tell; the button does not change color.
- **Outline:** No fill, `border border-ink/15`. On hover: border shifts to `border-primary/40`, fill becomes `bg-primary-muted`. The button becomes amber-tinged without becoming solid.
- **Ghost:** No border, no fill. Text shifts from `text-ink-secondary` to `text-ink` on hover. Used for tertiary actions and nav triggers.
- **Icon:** No padding override; for icon-only or nav trigger buttons. Same hover color shift as ghost.
- **Dismiss:** `text-surface/50` at rest, shifts to `text-surface/80` on hover. Used exclusively for close/dismiss actions within dark surfaces (modals, overlays).
- **Sizes:** `xs` (nav bar, compact contexts; `px-5 py-2.5`), `sm` (secondary inline CTAs; `px-5 py-3`), `md` (default; `px-6 py-3.5`), `lg` (hero and section-level primaries; `px-8 py-4`).

### Cards / Containers
- **Serious corner style:** 6px radius (`var(--radius-serious)`) — data containers, evidence modules, technical panels.
- **Standard content style:** 12px radius (`var(--radius-standard)`) — article modules, blog cards, marketing content panels.
- **Invited surfaces:** 18px radius (`var(--radius-invited)`) — customer signup and conversion surfaces.
- **Background:** `var(--color-surface)` at rest (`tone="default"`); `var(--color-surface-alt)` for elevated or nested containers (`tone="muted"`).
- **Shadow Strategy:** None at rest. Hover applies the amber reveal compound shadow (see Elevation).
- **Border:** `1px solid var(--color-line)` at rest; on hover shifts toward `rgba(201,168,76,0.3)`.
- **Internal Padding:** `sm` (16px), `md` (20px), `lg` (24px) via `padding` prop. Default is `lg`.
- **Variants:** `default` (sharp border); `spotlight` (adds cursor-following amber radial glow via `.spotlight-card`); `corner` (adds blueprint right-angle corner marks via `.corner-accent`); `plain` (no border or background, raw container).
- **Signature pattern:** `.corner-accent` pseudo-elements draw 12×12px right-angle marks at two opposing corners using the primary color at 30% opacity. Used sparingly on feature sections to evoke blueprint technical drawings.

### Navigation
- **Light mode:** Transparent at top; transitions to `bg-surface/90 backdrop-blur-sm border-b border-line` on scroll (`data-nav-scrolled="true"`).
- **Dark mode:** Transitions to `rgba(13,12,10,0.92)` on scroll.
- **Links:** Instrument Sans, text-sm, `text-ink-secondary` by default. On hover: `text-ink`. Active state: `text-primary`.
- **Underline treatment:** `.nav-link-underline` — a 1px amber underline grows from `width: 0` to `width: 100%` on hover via `cubic-bezier(0.22, 1, 0.36, 1)`. No thick stripe; hairline only.
- **Primary CTA button:** `xs` size, primary variant, invited rounding. Always visible. Right-aligned in the nav bar.
- **Mobile:** Slide-in drawer, full-height.

### Hero Demo Panel

When a hero includes a product demo panel, it should read as a compact operational instrument. Key styling rules:
- Outer panel: `border-radius: 6px`, `border: 1px solid var(--color-line)`, `bg-surface`
- Panel header: `bg-surface-alt/70`, `border-bottom`
- PR rows: slide in with `rowSlideIn` keyframe (translateX -8px → 0, opacity 0 → 1)
- Status states: queued (muted), running (warning amber + spinner), deployed (success green)
- Slack panel: slides in from below via `max-height` animation (0 → 420px); styled to match Slack's channel/message layout in miniature
- All animations respect `prefers-reduced-motion: reduce` — reduced motion immediately shows the final "all deployed" state
- Loop cycle: ~20 seconds (reset at 19665ms)

### Code Blocks / Terminal Elements
- **Font:** JetBrains Mono.
- **Background:** `var(--color-surface-alt)` in light mode; `var(--color-surface-alt)` in dark (near-black).
- **Border:** `1px solid var(--color-line)`, 2px radius.
- **Syntax accent:** Primary amber for highlights, signal colors for status indicators.

### Status Badges / Tags
- **Shape:** 1px radius (`border-radius: 1px`). Even sharper than card corners.
- **Style:** Background is the signal color at 7–12% opacity; border is the signal color at 15–25% opacity; text is the signal color at 70–100% opacity.
- **Font:** JetBrains Mono, `text-[8px]` to `text-[10px]`, tracking `wider`, uppercase.
- **"Coming soon" badges:** amber border at 25% opacity, amber text, 4px radius — slightly softer to signal roadmap rather than live status.

### Spotlight Card
The `.spotlight-card` variant tracks the cursor: a 300×300px radial gradient (amber at 8% → 3% → transparent) follows `--spotlight-x` / `--spotlight-y` custom properties set by JS on `mousemove`. In dark mode the glow lifts to 12% → 5%. The effect is subtle: it adds life without competing with the content. It is used on high-signal feature cards where engagement matters.

### Capability Row (`.cap-row`)
List rows used in feature/product capability sections. At rest: no shadow, `border-color: var(--color-line)`. On hover: border shifts to `rgba(201,168,76,0.25)`, background to `var(--color-surface)`, compound shadow `0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(201,168,76,0.08)`. Transition: `border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease`.

### Motion Vocabulary
All keyframes respect `prefers-reduced-motion: reduce` (transitions and animations collapsed to `0.01ms`). Easing is `cubic-bezier(0.22, 1, 0.36, 1)` throughout. Named animations:
- `spinRing`: 360° rotation on the PR row spinner (`0.9s linear infinite`). Running state indicator.
- `cursorBlink`: opacity 1 → 0 → 1 (`0.7s step-end infinite`). Text cursor in hero release name input.
- `rowSlideIn`: translateX -8px → 0, opacity 0 → 1 (`0.32s`). PR rows appearing in the hero demo panel.
- `btnPress`: scale 1 → 0.93 → 1 (`0.35s`). Simulated button click on the "Looks good →" button in the demo.
- `msgFadeUp`: translateY 10px → 0, opacity 0 → 1 (`0.45s`). Slack message appearance in the hero demo.
- `slideInLog`: log entries slide up 8px and fade in (`0.3s`). Used in event log rows.
- `scan-line`: horizontal scan from `-100%` to `100%` (`translateX`). Used on instrument panel gold overlay.
- `gold-shimmer`: background-position sweep `-200% → 200%`. Used on `.gold-shimmer` hero motif only.
- `corner-draw`: scale `0.5 → 1` + opacity `0 → 1` (`0.5s`). Blueprint corner entrance.
- `mobile-nav-in`: translateY `-8px → 0` + opacity `0 → 1` (`0.25s`). Mobile nav panel entrance.
- `success-reveal`: translateY `10px → 0` + opacity (`0.5s`). CTA success state.
- `drawEdge`: SVG stroke-dashoffset release. Release graph edge animation.

The `.TrafficSplitVisual` pattern is a terminal-style panel with a header bar, mono labels, animated progress bars, real-time event log, and gold scan-line overlay. Key rules: header bar uses `bg-surface-alt/60`; all labels are JetBrains Mono; signal colors are used directly as `color` and `backgroundColor` at low opacity; the corner radius is `6px` on the outer panel, `2px` on internal elements, `1px` on micro-indicators.

## 7. Do's and Don'ts

### Do:
- **Do** use `border-radius: 6px` on dense technical panels, data containers, capability rows, and product-layer UI.
- **Do** use `border-radius: 12px` on editorial cards, article modules, founder notes, and content panels.
- **Do** use invited rounding on primary and outline CTA buttons. This is the conversion signal.
- **Do** set amber (`var(--color-primary)`) only for operationally significant UI: the primary CTA, active states, hover rings, status highlights, and blueprint motifs. Never as fill color on a card at rest.
- **Do** use JetBrains Mono strictly for machine-originated content: version strings, deployment statuses, event log lines, CLI commands, timestamps. Human-authored prose and labels use Instrument Sans.
- **Do** keep body copy to 65–75ch max line length. Dense content at wide line lengths is an SRE's enemy.
- **Do** apply `prefers-reduced-motion` media query to every animation. All keyframes must respect it.
- **Do** use the surface color step (surface → surface-alt) to create depth. Elevation is tonal, not shadowed, at rest.
- **Do** write copy in the voice of the best engineer in the room: specific, direct, no superlatives. Name the real friction: the GitHub tabs, the Jenkins job, the Slack approval chain.
- **Do** keep the amber scan-line, blueprint grid, and corner-accent motifs as sparse structural signals. One per section maximum.

### Don't:
- **Don't** use the same radius everywhere. Roundedness should communicate interaction warmth and surface seriousness.
- **Don't** use pill shapes on dense data containers, evidence modules, tables, or code surfaces.
- **Don't** keep customer-inviting actions overly sharp. Signup, waitlist, and account creation actions should feel approachable.
- **Don't** use `#000` or `#fff`. Every extreme neutral must be tinted. Pure black on pure white reads as generic; it erases the system's material character.
- **Don't** use amber as a decorative color: no amber card fills, no amber section backgrounds, no amber heading text (outside the single `.gold-shimmer` hero motif). Its rarity is the point.
- **Don't** use glassmorphism. The `.cap-modal-backdrop` uses `backdrop-filter: blur(4px)` as a focus-lock, not a glass aesthetic. No other element uses blur. This is not a glass-card system.
- **Don't** replicate the SaaS cream + purple aesthetic (Notion/Linear/Loom). No soft pastels, no friendly rounded corners everywhere, no "everyone-welcome" copy. DeployTitan is infrastructure, not a productivity tool.
- **Don't** replicate the dark neon DevOps aesthetic: terminal-green on black, aggressive gradients, glow effects. DeployTitan is enterprise-capable, not scrappy.
- **Don't** replicate enterprise boring: navy blue dashboards, bullet-list feature pages, stock photo heroes, corporate sans-serif in grey.
- **Don't** use gradient text (`background-clip: text` with a multi-color gradient) on any element except the designated `.gold-shimmer` hero motif, and use that motif once per page maximum.
- **Don't** use `border-left` or `border-right` wider than 1px as a colored stripe on cards, list items, or alerts. Use full borders, background tints, or signal colors on the status dot instead. (Exception: Slack-style message attachment blocks use a 2px `border-left` — this is intentional to match the Slack visual pattern.)
- **Don't** build identical card grids (same-sized cards, icon + heading + text, repeated). Use row-based layouts, data tables, or varied hierarchy within sections.
- **Don't** animate layout properties (height, width, padding, margin). Animate opacity and transform only. (Exception: `max-height` is used for the Slack panel slide-in in the hero — this is a deliberate affordance for the panel reveal animation.)
- **Don't** use bounce or elastic easing. All easing is `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart equivalent) or `ease-out`. Nothing overshoots.
- **Don't** write copy that abstracts the pain. "Release coordination is hard" is not copy. "Eight PRs across four repos and one engineer has a dozen GitHub tabs open" is copy.
