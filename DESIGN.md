# DESIGN.md — Orbit Design System

Visual source of truth for the Orbit marketing site.
Derived from a measured analysis of Apple's marketing surfaces
(`Apple-design-analysis`, alpha), adapted into an original B2B SaaS
identity. The reference contributes the *language* — edge-to-edge tiles,
one accent, tight SF-style typography, pill CTAs, near-zero chrome.
Orbit's identity comes through in the product UI, the mark, and the copy.

If implementation and this file disagree, fix the implementation or
update this file deliberately. Do not let styles drift per section.

---

## 1. Design read

- **Page kind:** commercial B2B SaaS landing (single page + 3 stub pages)
- **Audience:** freelancers, small agencies, consultants, studios
- **Language:** museum-gallery product presentation — calm, credible,
  product-led. The UI mock is the artifact; chrome recedes.
- **Dials:** `DESIGN_VARIANCE 7` / `MOTION_INTENSITY 5` / `VISUAL_DENSITY 3`

Core principle: **the product speaks, the chrome whispers.** Every section
is a full-bleed tile. The surface change *is* the divider — no borders
between sections, no decorative shadows, no gradients.

## 2. Color

One interactive accent. Everything else is neutral surface or ink.

| Token | Hex | Role |
|---|---|---|
| `action` | `#0066cc` | The only "click me" color — links, pill CTAs, focus |
| `action-focus` | `#0071e3` | Focus ring, selected states |
| `action-dark` | `#2997ff` | Links and accents **on dark tiles only** |
| `ink` | `#1d1d1f` | All text on light surfaces |
| `ink-80` | `#333333` | Softer ink — footer text, secondary fill |
| `ink-48` | `#6e6e73` | Disabled text, legal fine print |
| `on-dark` | `#ffffff` | Text on dark tiles |
| `muted-dark` | `#cccccc` | Secondary copy on dark tiles |
| `canvas` | `#ffffff` | Default tile surface |
| `parchment` | `#f5f5f7` | Alternating light tile, footer, sub-navs |
| `pearl` | `#fafafc` | Ghost-button fill, card-in-card surfaces |
| `tile-1` | `#272729` | Primary dark tile |
| `tile-2` | `#2a2a2c` | Dark tile adjacent to tile-1 (micro-step lighter) |
| `tile-3` | `#252527` | Dark tile at stack bottom (micro-step darker) |
| `void` | `#000000` | Global nav bar only |
| `divider` | `#f0f0f0` | Soft ring on ghost buttons |
| `hairline` | `#e0e0e0` | 1px borders on cards, inputs, app-ui chrome |
| `chip` | `#d2d2d7` | Translucent circular controls over imagery |

**Functional status hues (product UI only, never decorative accents):**
inside the app mocks, `amber-600`-range marks *overdue* and
`emerald-600`-range marks *paid/done*. They convey state, not brand.
Marketing surfaces never use them.

**Rules**
- Every interactive element is `action` (or `action-dark` on dark tiles).
  No second brand color exists.
- `void` (#000) appears only in the global nav.
- No decorative gradients anywhere.
- `action-dark` (#2997ff) never appears on light surfaces.

## 3. Typography

Font stack: `var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
SF Pro is Apple-proprietary; Inter (variable, via `next/font`) is the
documented substitute. Display sizes carry an extra `-0.01em` tracking
nudge vs. SF metrics to reproduce the tight cadence.

| Token | Size | Weight | Line | Tracking | Use |
|---|---|---|---|---|---|
| `text-display-xl` | fluid 40→72px | 600 | 1.05 | −0.02em | Hero headline only |
| `text-display` | 56px | 600 | 1.07 | −0.015em | Reserved display |
| `text-display-lg` | 40px | 600 | 1.10 | −0.01em | Tile headlines |
| `text-display-md` | 34px | 600 | 1.47 | −0.015em | Section heads |
| `text-lead` | 28px | 400 | 1.14 | +0.007em | Tile subcopy |
| `text-lead-airy` | 24px | 300 | 1.5 | 0 | Rare airy reads |
| `text-tagline` | 21px | 600 | 1.19 | +0.011em | Sub-tile taglines |
| `text-body-strong` | 17px | 600 | 1.24 | −0.015em | Inline emphasis |
| `text-body` | 17px | 400 | 1.47 | −0.011em | Default paragraph (base) |
| `text-dense` | 17px | 400 | 2.41 | 0 | Footer link stacks |
| `text-caption` | 14px | 400 | 1.43 | −0.01em | Secondary captions, app UI |
| `text-caption-strong` | 14px | 600 | 1.29 | −0.01em | Emphasized captions |
| `text-button-lg` | 18px | 300 | 1.0 | 0 | Large hero CTA only |
| `text-utility` | 14px | 400 | 1.29 | −0.01em | Utility/nav buttons |
| `text-fine` | 12px | 400 | 1.35 | −0.01em | Legal, fine print |
| `text-nav` | 12px | 400 | 1.0 | −0.01em | Global nav links |

Rules:
- Body copy is **17px**, not 16px. Reading pace is part of the brand.
- Weight ladder is 300 / 400 / 600. No 500, no 700 except taglines.
- Negative tracking only at ≥17px. Never at caption sizes.
- Tabular numerals (`font-variant-numeric: tabular-nums`) inside product
  UI numbers, prices, dates.

## 4. Spacing, grid, radii, elevation

- Base unit 8px. Tokens: `4 / 8 / 12 / 17 / 24 / 32 / 48 / 80(section)`.
- Tile vertical padding: **80px** desktop → 56px tablet → 44px phone.
- Text sections max-width **980px**; product grids **1440px**; product
  mocks ~1080–1200px centered inside full-bleed tiles.
- Radius grammar — pick by role, never mix ad hoc:
  `xs 5` inline chips · `sm 8` utility buttons, app-ui elements ·
  `md 11` pearl capsules · `lg 18` cards & the app window ·
  `pill` all action CTAs, inputs, segmented controls ·
  `full` circular icon buttons, avatars.
- **Exactly one drop shadow:** `rgba(0,0,0,0.22) 3px 5px 30px`,
  reserved for product renders/mocks resting on a tile. Never on cards,
  buttons, or text. Elevation elsewhere = surface change or hairline.
- Hairlines: `1px solid hairline` on cards, inputs, app chrome. Sub-nav /
  sticky bars: `parchment` at ~80% + `backdrop-filter: blur(20px)`.

## 5. Components (contract)

- **global-nav** — `void` bar, 44px, `text-nav` links, edge-to-edge.
  Right cluster: `Sign in` (utility text), `Request access` (blue pill,
  small).
  ≤834px: wordmark + hamburger; overlay menu slides under the bar.
- **btn-primary** — `action` bg, white 17px text, pill, `11px 22px`.
  Press: `scale(.95)`. Focus: `2px action-focus` outline, offset 2px.
- **btn-lg** — hero-only CTA size: `text-button-lg` (18px/300),
  `15px 28px`. Applied as a `.btn` modifier; never below the fold.
- **orbit-field** — the signature visual, hero only. The mark's
  geometry scaled into a field spanning the whole hero tile: three
  hairline elliptical rings tilted −24°, centered on the composition,
  with `chip` satellite dots + one `action`-blue leader drifting along
  them (SMIL, 44–68s orbits). Static under `prefers-reduced-motion`,
  `aria-hidden`, never interactive.
- **concept-label** — `pearl` pill, `hairline` border, `fine` ink-48
  text: "Concept product · Self-directed design demo". Sits directly
  under the hero CTAs: the fictional-product disclosure belongs at the
  point of claim, not only in legal.
- **btn-ghost** — transparent, `1px action` border, `action` text, pill.
  On dark tiles: `action-dark` border+text variant.
- **btn-dark-utility** — `ink` bg, white 14px, `sm` radius, `8px 15px`.
- **btn-pearl** — `pearl` bg, `ink-80` 14px text, `md` radius, `8px 14px`.
- **tile** — full-bleed, `rounded-none`, 80px vertical rhythm. Centered
  stack: `display-lg` headline → `lead` line → 2 pills → product render.
- **card** — `canvas` bg, `hairline` border, `lg` radius, 24px padding.
- **app-ui** (the Orbit mocks) — `canvas` window, `lg` radius, `hairline`
  border, `shadow-product`. Interior chrome: `parchment` sidebar,
  `hairline` separators, `caption`/`body` text, pill status chips,
  initials avatars (`pearl` bg, `ink` text).
- **input** — `canvas`, `hairline` border, `pill` or `sm` radius per
  context, 17px text, `action-focus` focus ring. Labels above inputs.
- **accordion** — `hairline` row separators, `body-strong` questions,
  `action` chevron, animated height.
- **footer** — `parchment`, `ink-80`, `dense` link stacks, `caption-strong`
  column heads, `fine` legal row.

## 6. Motion (`MOTION_INTENSITY 5`)

- Language: quiet fades + short rises. `ease [0.16,1,0.3,1]`, ~0.5–0.7s.
- Hero: headline/copy/CTAs staggered rise on load; mock rises once.
- Sections: `whileInView` fade-up (once, 0.3 amount) on headers/mocks.
- Pipeline demo: `layout` animations when cards change column.
- Accordion/toggles: height or spring transitions.
- Orbit field: satellites drift at 44–68s per revolution — ambient,
  barely-perceived; frozen under reduced-motion.
- Press states: `scale(.95)` on every button — system micro-interaction.
- **Honor `prefers-reduced-motion`**: all reveals, layout anims, smooth
  scroll collapse to instant/static.

## 7. Tile rhythm (page pulse)

`hero(canvas) → audience(parchment) → problem(tile-1) →
feature-queue(canvas) → feature-timeline(tile-1) →
feature-pair(canvas + tile-2) → interactive demo(canvas) →
how(parchment) → pricing(canvas) → faq(parchment) →
form(canvas) → final-cta(tile-3) → footer(parchment)`

Adjacent light tiles alternate `canvas`/`parchment`; dark tiles never
repeat the same hex back-to-back.

## 8. Do / Don't

**Do:** one accent · centered product tiles · 17px body · pill = action ·
hairlines over shadows · `scale(.95)` press · `action-dark` on dark only ·
product shadow only on the app window.

**Don't:** gradients · second accent · shadows on chrome · weight 500 ·
rounded full-bleed tiles · `action-dark` on light · body < 1.4 line-height ·
mixed radius grammar · CTAs that promise real signup, trials or billing
(the product is a concept — verbs stay honest: Explore, Request access).

## 9. Responsive contract

| Breakpoint | Change |
|---|---|
| ≥1440px | Content locks at 1440px, margins absorb |
| 1024–1439 | Mocks ~96% width, feature splits hold |
| 834–1023 (`nav:`) | Nav hamburger; 2-col grids hold |
| 640–833 | Feature splits stack (copy → mock); board scrolls x |
| 419–639 | `display`/`display-lg`→32px, `display-md`→28px, `lead`→22px (CSS var step-down); tiles pad 44px; 1-col everything |

- `min-h-[100dvh]` never `h-screen`. Scroll margin on anchored sections.
- Tap targets ≥44px. Pipeline board = horizontal scroll-snap on mobile.
