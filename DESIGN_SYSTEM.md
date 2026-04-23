# DeployTitan Design System

A comprehensive reference for building the DeployTitan frontend application. Extracted from the landing page implementation.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Design Philosophy](#design-philosophy)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Border Radius](#border-radius)
7. [Shadows](#shadows)
8. [Borders & Dividers](#borders--dividers)
9. [Component Patterns](#component-patterns)
10. [Interactive States](#interactive-states)
11. [Animation System](#animation-system)
12. [Background Treatments](#background-treatments)
13. [Iconography](#iconography)
14. [Status & Signal System](#status--signal-system)
15. [Data Visualization](#data-visualization)
16. [Modal & Overlay Patterns](#modal--overlay-patterns)
17. [Responsive Strategy](#responsive-strategy)
18. [CSS Architecture](#css-architecture)

---

## Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| Framework        | React 19                    |
| Build Tool       | Vite 8                      |
| Language         | TypeScript                  |
| CSS Framework    | Tailwind CSS v4 (CSS-first) |
| Animation        | Anime.js 4                  |
| Fonts            | Google Fonts (CDN)          |

Tailwind v4 uses the `@theme` directive inside CSS instead of `tailwind.config.js`. The entire theme is defined in a single `index.css` file.

---

## Design Philosophy

The DeployTitan design language is built on five principles:

1. **Warm Minimalism** -- Off-white backgrounds with warm ink tones. No pure black (`#000`) or pure white (`#fff`) for text/backgrounds. Everything has a slight warm cast.

2. **Engineering Precision** -- Sharp corners (max `2px` radius), monospace labels, grid backgrounds, crosshair markers, corner bracket accents. The visual language references technical blueprints and engineering schematics.

3. **Gold as the Singular Brand Accent** -- `#c9a84c` is the only brand color. It is used for hover states, shimmer effects, scan lines, badges, corner accents, and progress indicators. The entire personality of the brand comes from this single gold tone.

4. **Signal Color Discipline** -- Green, amber, red, and blue are reserved exclusively for deployment status semantics (success, warning, danger, deploy/info). They are never used decoratively.

5. **Layered Opacity** -- Colors are applied at varying opacity levels to create depth: backgrounds at `0.02-0.08`, borders at `0.15-0.30`, text at full or moderate opacity. This creates a "tinted glass" effect throughout the UI.

---

## Color System

### Tailwind Theme Tokens

Define these in your `@theme` block:

```css
@theme {
  /* Surfaces */
  --color-surface:     #fafaf9;    /* Primary background (warm off-white) */
  --color-surface-alt: #f5f4f1;    /* Secondary/alt background */

  /* Ink (text hierarchy) */
  --color-ink:            #080503; /* Primary text (warm near-black) */
  --color-ink-secondary:  #5e534a; /* Secondary text */
  --color-ink-tertiary:   #8a8078; /* Tertiary text / descriptions */
  --color-ink-quaternary: #b5aea6; /* Quaternary text / timestamps */

  /* Lines (borders & dividers) */
  --color-line:        #e5e2dc;    /* Primary borders */
  --color-line-subtle: #eeece8;    /* Subtle/inner borders */

  /* Signal Colors (deployment status only) */
  --color-signal-success: #22c55e; /* Healthy / resolved / green */
  --color-signal-warning: #f59e0b; /* Warning / amber */
  --color-signal-danger:  #ef4444; /* Error / anomaly / red */
  --color-signal-deploy:  #3b82f6; /* Deploying / info / blue */

  /* Brand Accent -- Gold */
  --color-gold:       #c9a84c;              /* Primary gold */
  --color-gold-light: #e8d48b;              /* Light gold */
  --color-gold-dark:  #a68a3e;              /* Dark gold */
  --color-gold-muted: rgba(201,168,76,0.15); /* Muted gold background */
}
```

### Extended Palette (inline/programmatic use)

```
Purple/Config:  #8b5cf6   -- Used for config/integration type indicators
```

### Ink Hierarchy

The four-level ink system controls text hierarchy across the entire app:

| Level       | Token              | Hex       | Usage                              |
| ----------- | ------------------ | --------- | ---------------------------------- |
| Primary     | `text-ink`         | `#080503` | Headings, titles, primary content  |
| Secondary   | `text-ink-secondary`| `#5e534a`| Body text, descriptions            |
| Tertiary    | `text-ink-tertiary` | `#8a8078`| Captions, timestamps, subtle text  |
| Quaternary  | `text-ink-quaternary`| `#b5aea6`| Metadata, micro-labels, file info |

### Gold Opacity Ladder

Gold is used at specific opacity levels depending on context:

| Opacity   | Usage                                      | Example Class              |
| --------- | ------------------------------------------ | -------------------------- |
| `0.02-0.04` | Blueprint grid lines, scan line overlay   | Inline SVG/CSS             |
| `0.06-0.08` | Card hover shadow ring, border accents    | `rgba(201,168,76,0.08)`   |
| `0.15`    | Muted background fill                      | `bg-gold-muted`           |
| `0.20`    | Gradient line via point                    | `via-gold/20`             |
| `0.25-0.30`| Hover borders, corner accents             | `border-gold/30`          |
| `0.40`    | Section label dash, bullet dots            | `bg-gold/40`              |
| `0.50`    | Card ID numbers, architecture icons        | `text-gold/50`            |
| `0.60`    | Modal section labels                       | `text-gold/60`            |
| `1.00`    | Icon hover, active states, stat numbers    | `text-gold`               |

---

## Typography

### Font Stack

```css
@theme {
  --font-sans:    "Instrument Sans", system-ui, sans-serif;  /* Body text */
  --font-display: "Inter", system-ui, sans-serif;            /* Headings */
  --font-mono:    "JetBrains Mono", monospace;               /* Code, labels, data */
}
```

### Type Scale

| Role              | Classes                                                               | Usage                                  |
| ----------------- | --------------------------------------------------------------------- | -------------------------------------- |
| **Page heading**  | `font-display font-medium text-[clamp(2rem,3.8vw,4rem)] leading-[1.08] tracking-[-0.022em]` | Hero h1 only |
| **Section heading** | `font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08]` | All section h2s |
| **Card heading**  | `font-display font-medium text-lg tracking-[-0.01em]`                | Card titles, panel headers             |
| **Subheading**    | `font-display font-medium text-base tracking-[-0.01em]`              | Smaller card titles                    |
| **Body large**    | `text-lg text-ink-secondary leading-relaxed`                          | Section subtitles                      |
| **Body**          | `text-base text-ink-secondary leading-relaxed`                        | Descriptions, paragraphs               |
| **Body small**    | `text-sm text-ink-secondary leading-relaxed`                          | Card descriptions                      |
| **Label**         | `text-sm font-mono text-ink-secondary`                                | Section labels                         |
| **Caption**       | `text-xs text-ink-tertiary font-mono`                                 | Detail text, timestamps                |
| **Micro label**   | `text-[10px] font-mono uppercase tracking-[0.1em]`                   | Category labels, sub-labels            |
| **Micro value**   | `text-[10px] font-mono font-medium`                                   | Metric values, step times              |
| **Badge text**    | `text-[9px] font-mono uppercase tracking-wider`                       | Type badges (TRIGGER, DETECT)          |
| **Data text**     | `text-[8px] font-mono`                                                | SVG labels, visualization data         |
| **Stat number**   | `font-display font-medium text-5xl lg:text-6xl tracking-[-0.03em] leading-none` | KPI numbers |

### Typography Rules

1. **`font-display` (Inter)** is used only for headings (h1, h2, h3) and large stat numbers
2. **`font-sans` (Instrument Sans)** is the default body font
3. **`font-mono` (JetBrains Mono)** is used for all data, labels, timestamps, badges, code, and visualization text
4. **Tracking** is always negative for headings (`-0.022em` to `-0.01em`) and positive for uppercase labels (`0.06em` to `0.1em`)
5. **Weight** is predominantly `font-medium` (500). `font-semibold` is used sparingly for card titles in some sections. No `font-bold` or `font-black`.
6. **Secondary text in headings** uses `<span className="text-ink-secondary">` to de-emphasize the second part of a heading

---

## Spacing & Layout

### Page Container

Every section uses this container pattern:

```html
<section class="py-24 lg:py-32 border-t border-line relative">
  <!-- Optional background treatment -->
  <div class="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

  <!-- Content container -->
  <div class="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
    <!-- Section content -->
  </div>
</section>
```

### Spacing Scale

| Token         | Value    | Usage                                       |
| ------------- | -------- | ------------------------------------------- |
| `py-24 lg:py-32` | 96/128px | Section vertical padding                |
| `px-6 lg:px-12`  | 24/48px  | Container horizontal padding            |
| `mb-16 lg:mb-20` | 64/80px  | Header to content gap                   |
| `mb-6`        | 24px     | Section label bottom margin                 |
| `mb-5`        | 20px     | Heading bottom margin                       |
| `mb-4`        | 16px     | Title to description gap                    |
| `mb-3`        | 12px     | Between adjacent elements                   |
| `mb-2`        | 8px      | Between tightly coupled elements            |
| `gap-6`       | 24px     | Major grid/flex gaps                        |
| `gap-4`       | 16px     | Card grid gaps, standard flex gaps          |
| `gap-3`       | 12px     | Smaller element groups                      |
| `gap-2`       | 8px      | Tight element groups                        |
| `gap-1.5`     | 6px      | Very tight groups (service grids, tabs)     |
| `gap-px`      | 1px      | Grid-line-style card layouts                |
| `p-6`         | 24px     | Standard card padding                       |
| `p-8 lg:p-10` | 32/40px  | Large card padding                          |
| `p-4`         | 16px     | Compact card padding                        |
| `px-4 py-2.5` | --       | Step card headers                           |
| `px-2.5 py-1.5` | --     | Chip/tag padding                            |
| `px-3 py-1.5` | --       | Small button padding                        |
| `px-8 py-4`   | --       | Primary CTA button padding                  |
| `px-6 py-2.5` | --       | Secondary CTA button padding (nav)          |

### Max Widths

| Token          | Value   | Usage                      |
| -------------- | ------- | -------------------------- |
| `max-w-page`   | 1400px  | Page container             |
| `max-w-3xl`    | 768px   | Heading text               |
| `max-w-2xl`    | 672px   | Subheading text            |
| `max-w-xl`     | 576px   | Hero copy block            |
| `max-w-md`     | 448px   | Body paragraphs            |
| `max-w-sm`     | 384px   | Form fields                |
| `max-w-xs`     | 320px   | Gold accent line           |

### Grid Patterns

```
/* Card grid (most common) */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

/* Two-column split */
grid grid-cols-1 lg:grid-cols-2 gap-6

/* Asymmetric panels */
grid lg:grid-cols-5 gap-6        /* left: col-span-2, right: col-span-3 */
grid lg:grid-cols-[1fr_340px]    /* main content + sidebar */
grid lg:grid-cols-[1fr_300px]    /* modal variant */

/* Grid-line layout (1px gap acting as grid lines) */
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line/60 border border-line
```

---

## Border Radius

The design system uses a deliberately sharp aesthetic. **Never use Tailwind's `rounded-*` classes.**

All border-radius is applied via inline styles:

| Value    | Usage                                             |
| -------- | ------------------------------------------------- |
| `2px`    | Cards, containers, buttons, modals, inputs        |
| `1px`    | Badges, pills, progress bar tracks, small buttons |
| `0.5px`  | Indicator dots, status dots, tiny markers         |
| `50%`    | Loading spinner only (sole exception)             |

```tsx
// Standard card
<div style={{ borderRadius: '2px' }} className="border border-line bg-white p-6">

// Badge/pill
<span style={{ borderRadius: '1px' }} className="px-1.5 py-0.5 text-[10px]">

// Status dot
<span style={{ borderRadius: '0.5px' }} className="w-1.5 h-1.5 bg-signal-success">
```

For SVG elements, use `rx="0.5"` or `rx="1"`.

---

## Shadows

Shadows are minimal and purposeful. Only three shadow patterns exist:

| Pattern           | Value                                                                                    | Usage                    |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| **Card hover**    | `hover:shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(201,168,76,0.08)]`           | Card hover state         |
| **CTA hover**     | `hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]`             | Button hover state       |
| **Elevated panel**| `shadow-[0_4px_20px_rgba(0,0,0,0.06)]`                                                  | Floating panels          |
| **Status glow**   | `boxShadow: '0 0 6px ${color}40'`                                                       | Status indicator dots    |

The gold ring (`0_0_0_1px_rgba(201,168,76,...)`) is the signature hover feedback pattern.

---

## Borders & Dividers

### Border Patterns

```
border border-line           /* Standard card/section border */
border border-line/50        /* Subtle inner borders */
border border-line-subtle    /* Even more subtle (inner sections) */
border-t border-line         /* Section separator */
border-b border-line         /* Section/header dividers */
border-2 border-ink          /* Strong emphasis (featured panels) */
border-2 border-dashed border-signal-danger/30  /* Warning/gap indicator */
```

### Decorative Lines

```html
<!-- Gold gradient line (section bottom accent) -->
<div class="gold-line mt-12 max-w-xs mx-auto" />

<!-- Gold gradient separator (nav/footer) -->
<div class="w-16 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

<!-- Gold section label dash -->
<span class="w-8 h-px bg-gold/40" />
```

---

## Component Patterns

### Section Label

The standard label at the top of every section:

```html
<!-- Left-aligned (most sections) -->
<span class="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6" data-reveal>
  <span class="w-8 h-px bg-gold/40"></span>
  Label Text
</span>

<!-- Centered (outcomes, stack gap) -->
<span class="flex justify-center">
  <span class="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
    <span class="w-8 h-px bg-gold/40"></span>
    Label Text
    <span class="w-8 h-px bg-gold/40"></span>
  </span>
</span>
```

### Standard Card

```html
<div
  class="border border-line bg-white p-6 group cursor-pointer
         transition-all duration-300
         hover:border-gold/30
         hover:shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(201,168,76,0.08)]
         overflow-hidden spotlight-card"
  style={{ borderRadius: '2px' }}
>
  <!-- Gold corner accents (top-left) -->
  <div class="absolute top-0 left-0 w-3 h-3
              border-t border-l border-gold/0
              group-hover:border-gold/30
              transition-all duration-300" />
  <!-- Gold corner accents (bottom-right) -->
  <div class="absolute bottom-0 right-0 w-3 h-3
              border-b border-r border-gold/0
              group-hover:border-gold/30
              transition-all duration-300" />

  <!-- Card content -->
</div>
```

### Sharp Card (alternate)

```css
.sharp-card {
  border-radius: 2px;
  border: 1px solid var(--color-line);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.sharp-card:hover {
  border-color: rgba(201,168,76,0.3);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(201,168,76,0.06);
}
```

### Icon Container

```html
<!-- Small (nav/card) -->
<div class="w-4 h-4 bg-ink flex items-center justify-center"
     style={{ borderRadius: '1px' }}>
  <svg class="w-2.5 h-2.5 text-surface" />
</div>

<!-- Medium (card icons) -->
<div class="w-10 h-10 flex items-center justify-center border border-line
            group-hover:border-gold/20 group-hover:bg-gold-muted/50
            group-hover:text-gold transition-all duration-300"
     style={{ borderRadius: '2px' }}>
  <svg width="22" height="22" />
</div>

<!-- Large (outcome cards) -->
<div class="w-12 h-12 flex items-center justify-center border border-line
            group-hover:text-gold group-hover:border-gold/20
            group-hover:bg-gold-muted/50 transition-all duration-300"
     style={{ borderRadius: '2px' }}>
  <svg width="24" height="24" />
</div>
```

### Primary CTA Button

```html
<button
  class="inline-flex items-center gap-2.5 bg-ink text-surface
         px-8 py-4 text-base font-medium
         hover:bg-ink/85 transition-all active:scale-[0.97] group"
  style={{ borderRadius: '2px' }}
>
  Button Text
  <svg class="transition-transform group-hover:translate-x-0.5"
       width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>
```

### Secondary CTA Button

```html
<button
  class="inline-flex items-center px-8 py-4 text-base font-medium
         border border-ink/15 hover:border-gold/40
         hover:bg-gold-muted transition-all"
  style={{ borderRadius: '2px' }}
>
  Button Text
</button>
```

### Form Input

```html
<input
  class="w-full px-5 py-4 border border-line bg-white text-sm text-ink
         placeholder:text-ink-quaternary
         focus:outline-none focus:border-gold/40 transition-colors"
  style={{ borderRadius: '2px' }}
/>
```

### Badge / Pill

```html
<!-- Status badge (generic) -->
<span
  class="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider"
  style={{ borderRadius: '1px', backgroundColor: '...', color: '...', border: '...' }}
>
  STATUS
</span>

<!-- Type badge (workflow steps) -->
<span
  class="text-[9px] font-mono px-1.5 py-0.5 tracking-wider uppercase"
  style={{ borderRadius: '1px', backgroundColor: '...', color: '...' }}
>
  TRIGGER
</span>
```

### Chip / Tag

```html
<div
  class="flex items-center gap-2 px-2.5 py-1.5 border border-line-subtle
         text-[10px] font-mono text-ink-secondary
         hover:border-gold/20 hover:bg-gold-muted transition-all"
  style={{ borderRadius: '2px' }}
>
  <span class="w-1.5 h-1.5" style={{ borderRadius: '0.5px', backgroundColor: '#3b82f6' }} />
  Chip Label
</div>
```

### Progress Bar

```html
<div class="h-2 bg-surface-alt border border-line overflow-hidden"
     style={{ borderRadius: '1px' }}>
  <div class="h-full transition-all duration-1000"
       style={{ width: '75%', backgroundColor: '#c9a84c', borderRadius: '1px' }} />
</div>
```

### Grid-Line Card Layout

For card grids where the gaps act as visible grid lines:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px
            bg-line/60 border border-line overflow-hidden"
     style={{ borderRadius: '2px' }}>
  <div class="bg-surface p-8 lg:p-10 group transition-all duration-300
              hover:bg-surface-alt">
    <!-- Card content -->
  </div>
  <!-- More cards -->
</div>
```

---

## Interactive States

### Hover Patterns

| Element           | Pattern                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| **Card**          | `hover:border-gold/30` + gold shadow ring + corner accents reveal          |
| **Button (primary)** | `hover:bg-ink/85` + `active:scale-[0.97]`                              |
| **Button (secondary)** | `hover:border-gold/40 hover:bg-gold-muted`                           |
| **Nav link**      | `hover:text-ink` + gold underline via `.nav-link-underline`                |
| **Text link**     | `hover:text-gold transition-colors`                                        |
| **Icon**          | `group-hover:text-gold group-hover:border-gold/20 group-hover:bg-gold-muted/50` |
| **Platform tag**  | `opacity-50 hover:opacity-100 transition-opacity`                          |
| **Feature row**   | `.feature-title` translates `4px` right on hover                           |
| **Capability row**| Border turns gold, background turns white, subtle gold ring shadow         |
| **Spotlight card**| Cursor-following `300px` radial gold gradient glow (CSS custom properties) |

### The Spotlight Effect

Cards with class `spotlight-card` get a mouse-tracking gold glow:

```css
.spotlight-card::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle at center,
    rgba(201,168,76,0.08) 0%,
    rgba(201,168,76,0.03) 30%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: translate(-50%, -50%);
  top: var(--spotlight-y, 50%);
  left: var(--spotlight-x, 50%);
}
.spotlight-card:hover::before {
  opacity: 1;
}
```

The `useSpotlight()` hook updates `--spotlight-x` and `--spotlight-y` via `mousemove`.

### Gold Corner Accents

Appear on hover for premium cards. Always in pairs (top-left + bottom-right):

```html
<!-- Top-left corner -->
<div class="absolute top-0 left-0 w-3 h-3
            border-t border-l border-gold/0
            group-hover:border-gold/30
            transition-all duration-300" />
<!-- Bottom-right corner -->
<div class="absolute bottom-0 right-0 w-3 h-3
            border-b border-r border-gold/0
            group-hover:border-gold/30
            transition-all duration-300" />
```

For four-corner treatment (CTA card):
```html
<!-- Add top-right and bottom-left -->
<div class="absolute top-0 right-0 w-3 h-3 border-t border-r"
     style={{ borderColor: 'var(--color-gold)', opacity: 0.3 }} />
<div class="absolute bottom-0 left-0 w-3 h-3 border-b border-l"
     style={{ borderColor: 'var(--color-gold)', opacity: 0.3 }} />
```

### Active/Focus States

```
active:scale-[0.97]           /* All CTA buttons */
focus:outline-none focus:border-gold/40  /* Form inputs */
disabled:opacity-60            /* Disabled buttons */
disabled:opacity-50            /* Disabled inputs */
```

---

## Animation System

### 1. Scroll Reveal (Primary entrance animation)

Uses `anime.js` + `IntersectionObserver`. Add `data-reveal` to any element:

```tsx
// Hook
export function useScrollReveal() {
  // Observes elements with [data-reveal]
  // Animates: opacity 0→1, translateY 20→0
  // Duration: 800ms, ease: outExpo
  // Threshold: 0.08, rootMargin: '0px 0px -60px 0px'
  // Stagger: data-reveal-delay="N" (N * 80ms delay)
  // Cleans up inline styles after animation for clean hover states
}
```

Usage:
```tsx
const ref = useScrollReveal()
return (
  <section ref={ref}>
    <h2 data-reveal>Heading</h2>
    <p data-reveal data-reveal-delay="1">Subtitle</p>
    <div data-reveal data-reveal-delay="2">Content</div>
  </section>
)
```

### 2. Stagger Reveal (Group entrance)

```tsx
export function useStaggerReveal(selector: string, staggerDelay = 100) {
  // Animates all matching children simultaneously with stagger
  // opacity 0→1, translateY 16→0
  // Duration: 600ms, ease: outExpo
  // Threshold: 0.2
}
```

### 3. CSS Keyframe Animations

| Name              | Effect                          | Duration | Usage                          |
| ----------------- | ------------------------------- | -------- | ------------------------------ |
| `fadeUp`          | translateY(20px) + opacity      | 800ms    | Scroll reveal fallback         |
| `ping-anim`       | Scale to 2x + fade out         | --       | Click ripple, status pulse     |
| `pulse-anim`      | Opacity 1→0.5→1                | --       | Breathing dots, status indicators |
| `bounce-anim`     | translateY 0→6px→0             | --       | Scroll indicator               |
| `ai-scan`         | Vertical sweep translateY      | --       | AI scan line                   |
| `ai-pulse-ring`   | Scale 0.8→1.4 + fade           | --       | AI detection rings             |
| `neural-pulse`    | Opacity 0.08→0.25              | --       | Neural network background      |
| `data-flow`       | stroke-dashoffset animation     | --       | SVG data flow lines            |
| `glow-breathe`    | Opacity 0.3→0.7                | --       | Ambient glow elements          |
| `gold-shimmer`    | Background-position sweep       | 4s       | Gold shimmer text effect       |
| `scan-line`       | translateX(-100% → 100%)        | 8-10s    | Horizontal scan overlay        |
| `slideInLog`      | translateY(8px) + opacity       | 300ms    | Log entry appearance           |
| `dd-int-pulse`    | Box-shadow pulse                | 2s       | Integration card emphasis      |
| `cap-edge-draw`   | SVG stroke-dashoffset           | 600ms    | Edge line drawing              |
| `cap-node-pop`    | Scale 0.5→1 + opacity          | 300ms    | Node appearance                |
| `cap-scan-expand` | Circle radius expansion + fade  | 800ms    | Scan ring expansion            |
| `cap-bar-bounce`  | scaleY 0.4→1                   | 600ms    | Analysis bar bounce            |
| `cap-rollback-spin`| rotate(360deg)                 | 3s       | Rollback ring rotation         |

### 4. Transition Standards

```
transition-all duration-300    /* Standard (cards, icons, borders) */
transition-all duration-500    /* Slower (nav, phase changes) */
transition-colors duration-300 /* Color-only changes */
transition-transform           /* Icon movements */
transition-opacity duration-400 /* Overlay fades */
```

Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` (outExpo-like, used for carousel slides and modal entrance)

### 5. State-Driven Animations

Complex visualizations use async state machines with `sleep()`:

```tsx
// Pattern for multi-phase animation loops
useEffect(() => {
  let cancelled = false
  const run = async () => {
    while (!cancelled) {
      setPhase('phase1')
      await sleep(1500)
      if (cancelled) break
      setPhase('phase2')
      await sleep(2000)
      if (cancelled) break
      // ... more phases
    }
  }
  run()
  return () => { cancelled = true }
}, [])
```

### 6. Animated Counters

```tsx
// Pattern for counting up numbers
useEffect(() => {
  const start = performance.now()
  const duration = 2000
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    setValue(Math.round(target * eased))
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}, [target])
```

---

## Background Treatments

### Noise Overlay

Applied globally via `body::after`. Adds subtle texture to the entire page:

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence noise */
}
```

### Hero Grid

Subtle ink-colored grid for the hero section:

```css
.hero-grid {
  background-image:
    linear-gradient(rgba(8,5,3,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(8,5,3,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### Blueprint Grid

Gold-tinted engineering grid for content sections:

```css
.blueprint-grid {
  background-image:
    linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px),
    linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px);
  background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
}
```

Used as: `<div class="absolute inset-0 blueprint-grid opacity-20|30 pointer-events-none" />`

### Corner Accent (CSS class)

Blueprint-style bracket marks on containers:

```css
.corner-accent::before { /* top-left */ }
.corner-accent::after  { /* bottom-right */ }
/* 12px x 12px, 1.5px gold borders, opacity 0.3 */
```

### Crosshair Marker

Monospace "+" marker for technical detail:

```css
.crosshair::before {
  content: '+';
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-gold);
  opacity: 0.25;
}
```

---

## Iconography

### Convention

All icons are **hand-crafted inline SVGs** following Lucide conventions. No external icon library.

### Standard Attributes

```tsx
// Standard icon (cards, navigation)
<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round">

// Small icon (badges, buttons)
<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="2.5"
     strokeLinecap="round" strokeLinejoin="round">

// Large icon (section feature cards)
<svg width="36" height="36" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="1.5"
     strokeLinecap="round" strokeLinejoin="round">
```

### Size Scale

| Size          | `width`/`height` | `strokeWidth` | Usage                      |
| ------------- | ----------------- | ------------- | -------------------------- |
| **xs**        | `14`              | `2.5`         | Buttons, badges, checkmarks |
| **sm**        | `16`              | `2`           | Close buttons, inline icons |
| **md**        | `20`              | `2`           | Card icons, navigation     |
| **lg**        | `22`              | `1.5`         | Feature card icons         |
| **xl**        | `24`              | `1.5`         | Outcome card icons         |
| **2xl**       | `36`              | `1.5`         | Problem section icons      |

### Decorative Sub-paths

Some icons have secondary decorative strokes at reduced opacity:

```tsx
<path d="..." strokeOpacity="0.3" />  /* Subtle background strokes */
<path d="..." strokeOpacity="0.35" />
```

---

## Status & Signal System

### Color Mapping

| State        | Color     | Hex       | Tailwind Token       |
| ------------ | --------- | --------- | -------------------- |
| Success      | Green     | `#22c55e` | `signal-success`     |
| Warning      | Amber     | `#f59e0b` | `signal-warning`     |
| Danger       | Red       | `#ef4444` | `signal-danger`      |
| Deploy/Info  | Blue      | `#3b82f6` | `signal-deploy`      |
| AI/Analysis  | Gold      | `#c9a84c` | `gold`               |
| Config       | Purple    | `#8b5cf6` | (inline only)        |

### Status Badge Classes

```tsx
// Status badge patterns (bg + text + border)
const statusBadges = {
  monitoring: 'bg-surface-alt text-ink-tertiary border-line',
  detected:   'bg-signal-danger/10 text-signal-danger border-signal-danger/30',
  analyzing:  'bg-gold-muted text-ink border-gold/30',
  healing:    'bg-gold-muted text-ink border-gold/30',
  protected:  'bg-signal-success/10 text-signal-success border-signal-success/30',
}
```

### Log Entry Types

```tsx
const logBadges = {
  info:    'bg-surface-alt text-ink-tertiary',
  warning: 'bg-signal-warning/10 text-signal-warning',
  error:   'bg-signal-danger/10 text-signal-danger',
  success: 'bg-signal-success/10 text-signal-success',
}
```

### Status Dot Indicator

```html
<!-- Standard (1.5x1.5) -->
<span class="w-1.5 h-1.5"
      style={{ borderRadius: '0.5px', backgroundColor: '#22c55e' }} />

<!-- With glow -->
<span class="w-1.5 h-1.5 transition-all duration-300"
      style={{
        borderRadius: '1px',
        backgroundColor: '#22c55e',
        boxShadow: '0 0 6px rgba(34,197,94,0.25)'
      }} />

<!-- With pulse animation -->
<span class="w-1.5 h-1.5"
      style={{
        borderRadius: '0.5px',
        backgroundColor: '#ef4444',
        animation: 'pulse-anim 1.5s infinite'
      }} />
```

### Live Indicator

```html
<div class="flex items-center gap-1.5">
  <span class="w-1.5 h-1.5"
        style={{ borderRadius: '0.5px', backgroundColor: '...', animation: 'pulse-anim 2s infinite' }} />
  <span class="text-[10px] font-mono text-ink-tertiary">LIVE</span>
</div>
```

### Urgency Ping (CTA)

```html
<span class="relative flex h-2 w-2">
  <span class="absolute inset-0 bg-gold opacity-50"
        style={{ borderRadius: '1px', animation: 'ping-anim 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
  <span class="relative inline-flex h-2 w-2 bg-gold"
        style={{ borderRadius: '1px' }} />
</span>
```

---

## Data Visualization

### SVG Service Map

Nodes in a grid layout with status-colored circles and connecting edges:

```tsx
// Node structure
<circle r="13" fill={statusFill} stroke={statusStroke} strokeWidth="1.5" />
<circle r="18" fill="none" stroke={statusStroke} strokeWidth="0.5" opacity="0.3" /> // outer ring
<circle r="1.5" cy="-3.5" fill={dotColor} /> // status dot

// Edge structure
<line stroke={color} strokeWidth="1" strokeDasharray={isDanger ? "3,3" : "none"} />
```

### Progress/Comparison Bars

```html
<div class="flex items-center gap-3">
  <span class="w-[100px] text-[10px] font-mono text-ink-quaternary uppercase tracking-[0.06em]">
    Before
  </span>
  <div class="flex-1 h-2 bg-surface-alt border border-line overflow-hidden"
       style={{ borderRadius: '1px' }}>
    <div class="h-full" style={{ width: '80%', backgroundColor: '#ef4444', borderRadius: '1px' }} />
  </div>
  <span class="w-[160px] text-[10px] font-mono text-ink-tertiary">
    32 min avg
  </span>
</div>
```

### AI Visualizer Bars

```tsx
// 8 audio-visualizer style bars
{[...Array(8)].map((_, i) => (
  <div key={i} class="w-0.5 bg-current"
       style={{
         height: `${Math.random() * 5 + 3}px`,
         borderRadius: '0.5px',
         animation: `pulse-anim 0.8s ease infinite ${i * 0.1}s`
       }} />
))}
```

---

## Modal & Overlay Patterns

### Modal Structure

```css
/* Backdrop */
.cap-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 5, 3, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.cap-modal-backdrop.open { opacity: 1; }

/* Panel */
.cap-modal-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: 2px;
  max-width: 880px; /* or 1000px for wider modals */
  width: 100%;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  transform: translateY(12px) scale(0.98);
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}
.cap-modal-backdrop.open .cap-modal-panel {
  transform: translateY(0) scale(1);
  opacity: 1;
}
```

### Modal Open/Close Pattern

```tsx
const [open, setOpen] = useState(false)

// Open: mount then animate
useEffect(() => {
  requestAnimationFrame(() => setOpen(true))
}, [])

// Close: animate then unmount
const handleClose = () => {
  setOpen(false)
  setTimeout(onClose, 250)
}

// Body scroll lock
useEffect(() => {
  document.body.classList.add('modal-open')
  return () => document.body.classList.remove('modal-open')
}, [])

// ESC key and click-outside
useEffect(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
  window.addEventListener('keydown', onKey)
  return () => window.removeEventListener('keydown', onKey)
}, [])
```

---

## Responsive Strategy

### Breakpoints

| Breakpoint | Usage                                              |
| ---------- | -------------------------------------------------- |
| `sm:`      | CTA row direction, card grid columns               |
| `md:`      | Nav desktop/mobile toggle, grid cols               |
| `lg:`      | Major layout shifts (side-by-side → stacked)       |

### Key Responsive Patterns

```
/* Nav */
hidden md:flex          /* Desktop nav links */
md:hidden               /* Mobile hamburger */

/* Hero */
w-full lg:w-[50%]       /* Left copy column */
hidden lg:flex          /* Right visualization panel */
lg:hidden               /* Mobile carousel */

/* Sections */
py-24 lg:py-32          /* Section padding */
px-6 lg:px-12           /* Container padding */
text-4xl lg:text-6xl    /* Heading sizes */
p-8 lg:p-10             /* Card padding */
mb-16 lg:mb-20          /* Header spacing */

/* Grids */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   /* Card grids */
grid-cols-1 lg:grid-cols-2                    /* Split layouts */

/* Content */
flex-col sm:flex-row     /* CTA button row */
flex-col lg:flex-row     /* Header with side description */
hidden sm:inline         /* Secondary details */
```

### Mobile-Specific Patterns

- Navigation becomes a full-screen overlay at `z-40` with large (`text-4xl`) centered links
- Hero visualization carousel appears below the copy instead of side-by-side
- Multi-column grids collapse to single column
- Feature detail text (`hidden sm:inline`) is hidden on smallest screens
- Timeline navigation switches to a compact scrubber on mobile

---

## CSS Architecture

### File Structure

```
src/
  index.css        -- All theme tokens, keyframes, utility classes, and component styles
  utils.ts         -- Animation hooks (useScrollReveal, useStaggerReveal, useSpotlight)
  components/*.tsx  -- Component-specific styles via Tailwind classes + inline styles
```

### Tailwind v4 Configuration

No `tailwind.config.js`. Everything is in CSS:

```css
@import "tailwindcss";

@theme {
  /* All custom tokens defined here */
}

/* Keyframes */
@keyframes ... { }

/* Global styles */
body { ... }

/* Utility classes */
.hero-grid { ... }
.blueprint-grid { ... }
.corner-accent { ... }
.gold-line { ... }
.gold-shimmer { ... }
.nav-link-underline { ... }
.sharp-card { ... }
.spotlight-card { ... }
.cap-modal-backdrop { ... }
.cap-modal-panel { ... }
/* etc. */
```

### Utility Functions

```tsx
// Simple className joiner (no clsx dependency)
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// Async sleep for animation state machines
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

### Key Conventions

1. **Inline `borderRadius` everywhere** -- never use Tailwind `rounded-*` classes
2. **Inline `style` for dynamic values** -- colors, backgrounds, transforms driven by state
3. **Tailwind classes for static layout** -- spacing, typography, flex/grid, responsive
4. **CSS classes for reusable interactive patterns** -- `.sharp-card`, `.spotlight-card`, `.cap-modal-*`
5. **`data-reveal` attributes for scroll animations** -- decoupled from component logic
6. **`group` / `group-hover:` pattern** -- used extensively for card hover state propagation
7. **No CSS-in-JS** -- all styles are either Tailwind utility classes, CSS custom classes, or inline styles
8. **Constants for repeated color values** -- `const GOLD = '#c9a84c'` and `const GOLD_RGBA = 'rgba(201,168,76'` in each component file

---

## Quick Reference: Common Patterns

```tsx
// Section wrapper
<section className="py-24 lg:py-32 border-t border-line relative">
  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">

// Section label
<span className="inline-flex items-center gap-3 text-sm font-mono text-ink-secondary mb-6">
  <span className="w-8 h-px bg-gold/40" /> Label

// Section heading
<h2 className="font-display font-medium text-4xl lg:text-6xl tracking-[-0.022em] leading-[1.08] mb-5">
  Heading <span className="text-ink-secondary">secondary</span>

// Card
<div className="border border-line bg-white p-6 group transition-all duration-300
                hover:border-gold/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(201,168,76,0.08)]"
     style={{ borderRadius: '2px' }}>

// Gold line section divider
<div className="gold-line mt-12 max-w-xs mx-auto" />

// Status dot
<span className="w-1.5 h-1.5" style={{ borderRadius: '0.5px', backgroundColor: '#22c55e' }} />

// Mono label
<span className="text-[10px] font-mono uppercase tracking-[0.1em] text-ink-quaternary">
```
