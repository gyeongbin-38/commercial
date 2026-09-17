# DESIGN-FIELDSTONE.md — Fieldstone Ventures Design System

Visual source of truth for the `/fieldstone` landing page.

**Fieldstone Ventures is a fictional brand**: an entrepreneurial
ecosystem that builds founders and drives regional economic growth.
All program names, founders, companies and figures on the page are
invented demo data — the footer discloses this.

The token skeleton descends from a measured editorial-institutional
system (condensed-Garamond display + DM Sans body, hairlines, one soft
card shadow), re-hued for Fieldstone: **evergreen primary, deep-pine
decision color**. Buttons trade the pill for a squared 8px radius —
the same grammar, a more prospectus-like cut.

## 1. Design read

- **Page kind:** commercial landing for a venture-builder / founder
  ecosystem (programs + capital access)
- **Audience:** prospective founders first; investors and community
  partners second
- **Language:** prospectus-editorial. Serif display carries vision,
  sans body carries mechanics. Grounded, regional, capital-facing.
- **Dials:** `DESIGN_VARIANCE 6` / `MOTION_INTENSITY 4` /
  `VISUAL_DENSITY 4`

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `fs-green` | `#3a7d6a` | Primary: links, icons, ghost borders, path numerals |
| `fs-green-deep` | `#2c6152` | Text links, eyebrows, hover on `fs-green` |
| `fs-pine` | `#15332b` | Accent: the single decision-CTA color, dark panels |
| `fs-pine-deep` | `#0e2620` | Hover on `fs-pine` |
| `fs-ink` | `#222121` | All text on light surfaces |
| `fs-muted` | `#5d635f` | Secondary text |
| `fs-line` | `#d8ddd9` | Borders, hairlines, ghost buttons |
| `fs-line-soft` | `#e6eae7` | Inner card dividers |
| `fs-bg` | `#ffffff` | Page canvas, cards |
| `fs-tint` | `#eef4f1` | Alternating band surface (`fs-green` at ~8% on white) |
| `fs-card` | `#ffffff` | Card interiors |

**Rules**
- `fs-pine` is the *decision* color: only "Apply"-intent buttons,
  dark panels and the wordmark carry it. `fs-green` is *supportive*:
  links, icons, eyebrows, ghost borders, tints.
- Never put dark text on `fs-green`; always white.
- `fs-line` is decorative-separation only, never text.

## 3. Typography

Display serif: **Cormorant Garamond** (`next/font/google`,
`--font-f-serif`, weights 400–600) — a Garamond revival standing in
for proprietary condensed-Garamond display faces.
Body: **DM Sans** (`--font-f-sans`).

| Class | Size | Weight | Line | Use |
|---|---|---|---|---|
| `fs-display` | clamp(2.6→5rem) | 500 | 0.98 | Hero headline only |
| `fs-h2` | clamp(2→3.4rem) | 500 | 1.06 | Section headlines |
| `fs-h3` | 1.375rem | 500 | 1.25 | Card/program titles |
| `fs-lead` | 1.1875rem (19px) | 400 | 1.5 | Section subcopy |
| `fs-eyebrow` | 0.8125rem | 600 | — | Rare section kickers (max 1 per 3 sections) |
| body | 1.0625rem | 400 | 1.55 | Paragraphs |
| caption | 0.875rem | 500 | 1.45 | Secondary captions |

Rules:
- Body copy is 19px lead / 17px default.
- Serif is display-only; UI chrome, buttons and body stay DM Sans.
- Emphasis = weight 500–600, never a second family.

## 4. Spacing, radii, elevation

- Container: `fs-container` = `min(100% - 2.5rem, 72rem)` centered.
- Section padding: `py-16` mobile → `py-20`/`py-24` ≥900px; hero top
  padding capped (`pt-16` max).
- Radius grammar:
  `sm 2` tiny chips · `md 8` **all buttons**, inputs, icon tiles ·
  `lg 20` cards, panels, photo frames · `pill` avatar/chip only.
- **One measured shadow:** `rgba(21,51,43,.08) 0 2px 12px` on
  `fs-card` and the floating hero stat card. Hairlines elsewhere.
- No decorative gradients, no second accent hue.

## 5. Surface rhythm

`hero(white) → impact(pine, dark) → programs(white, pine featured
card) → path(tint) → stories(white) → faq(tint) → final-cta(white,
pine panel) → footer(white)`

`fs-pine` appears three times as a *surface*: the impact band, the
featured program card, the final-CTA panel. Three dark moments total.

## 6. Components (contract)

- **navbar** — sticky frosted white bar, `h-16`, serif wordmark,
  pine `md`-radius "Apply" CTA; hamburger under 768px.
- **fs-btn** — `md` radius (the Fieldstone cut: squared, not pill),
  15px/600; `fs-btn-accent` pine fill (apply intent only),
  `fs-btn-ghost` green outline on light, `fs-btn-light` white fill
  on pine, `fs-btn-outline-light` on pine.
- **fs-card** — white, `lg` radius, measured shadow, `fs-line` border.
- **fs-card-flat** — white, `lg` radius, `fs-line` border, no shadow.
- **fs-panel** — `fs-pine` surface, `lg` radius, white text.
- **fs-stat-num** — serif display numeral; `fs-stat-num-light`
  variant renders white on pine.
- **faq** — `fs-card-flat` rows, `aria-expanded`/`aria-controls`,
  rotating plus glyph.
- **legal-page** — shared stub for `/fieldstone/privacy` and
  `/fieldstone/terms` (both carry a fictional-brand disclaimer).

## 7. Motion (`MOTION_INTENSITY 4`)

- Language: short rises + fades. `ease cubic-bezier(0.23,1,0.32,1)`,
  300–560ms.
- Hero: `fs-fade-in` rise on copy, photo/stat card delayed 140ms.
- Buttons: `translateY(1px)` press; program rows nudge the arrow.
- Everything collapses under `prefers-reduced-motion`.

## 8. Imagery

Real photography via `picsum.photos/id/{id}` (fixed IDs, plain `<img>`
with explicit dimensions — no `remotePatterns` needed):

- Hero: `id/442` downtown blocks, portrait crop + floating stat card.
- Stories: `id/1005`, `id/1027`, `id/91` square portrait crops.

No div-based fake screenshots; no hand-rolled illustrations.

## 9. Do / Don't

**Do:** serif display over DM Sans body · pine = decision CTAs only ·
green = links/support · white cards on `fs-tint` bands · squared
`md`-radius actions · hairlines over shadows · disclose demo data.

**Don't:** dark text on `fs-green` · gradients · a third accent ·
`fs-line` as text color · pill buttons (that grammar belongs to
other brands in this repo) · serif in buttons or body copy · real
company or founder names.

## 10. Responsive contract

| Breakpoint | Change |
|---|---|
| ≥1280px | Content locks at 72rem; hero split holds |
| 900–1279px | Grids hold, type fluid-shrinks |
| 768–899px | Hamburger nav; 2-col grids |
| <768px | Everything single column; display sizes clamp down |

`min-h-[100dvh]` never `h-screen`. Tap targets ≥44px.
