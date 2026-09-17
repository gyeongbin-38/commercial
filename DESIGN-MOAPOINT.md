# DESIGN-MOAPOINT.md — MOA POINT (모아포인트) Design System

Visual source of truth for the `/moapoint` landing page.
모아포인트 is a **fictional** Korean integrated-membership brand
(operated by the fictional 모아멤버스 주식회사). Every partner name,
member, balance and figure on the page is invented demo data — the
footer and partner section disclose this explicitly.

The identity is **monochrome navy on cool gray**: dark ink surfaces,
white cards, no decorative color. Visual interest comes from the card
language and the product mock, not from accent colors.

## 1. Design read

- **Page kind:** consumer membership landing (app-download first)
- **Audience:** general Korean consumers; trust-first, finance-adjacent
- **Language:** card-on-gray commerce — calm, credible, mobile-shaped.
  The phone mock is the artifact; everything else is a white card.
- **Dials:** `DESIGN_VARIANCE 6` / `MOTION_INTENSITY 4` / `VISUAL_DENSITY 4`

## 2. Color

Strictly monochrome. One ink color carries every CTA and every heading.
Tokens live in `app/moapoint/moapoint.css` under the `--moa-*` prefix.

| Token | Hex | Role |
|---|---|---|
| `moa-ink` | `#222832` | Primary: text, borders, buttons |
| `moa-ink-soft` | `#2e3440` | Softer ink, legal body text |
| `moa-muted` | `#5f646c` | Secondary text, muted accents |
| `moa-navy` | `#222832` | Dark surfaces (nav CTA, final CTA, navy card) |
| `moa-navy-deep` | `#1a1f27` | Hover on `moa-navy` |
| `moa-card` | `#ffffff` | Cards, nav, chips |
| `moa-bg` | `#f0f3f5` | Page canvas |
| `moa-line` | `#dfe3e7` | Borders on ghost buttons, hairlines |
| `moa-line-soft` | `#eceff2` | Card borders, dividers inside cards |

**Rules**
- There is no accent color. "Click me" = `moa-navy` fill; everything
  else is neutral.
- Dark surfaces are always `moa-navy` — never pure black.
- `+P`/`-P` amounts stay monochrome: ink for earn, muted for spend.

## 3. Typography

Pretendard Variable (OFL), self-hosted at
`app/moapoint/fonts/PretendardVariable.woff2` via `next/font/local`
as `--font-moa`, weight range 45–920. Fallback stack: Pretendard →
system → Helvetica Neue → Arial.

| Class | Size | Weight | Use |
|---|---|---|---|
| `moa-h1` | clamp(1.9rem→2.9rem) | 700 | Hero headline |
| `moa-h2` | clamp(1.5rem→2.1rem) | 700 | Section headlines |
| `moa-lead` | 17px | 500 | Section subcopy |
| `moa-eyebrow` | 13px | 600 | Section kickers |
| body | 16px | 500 | Paragraphs |

- `P` is the currency unit — always suffixed (`12,480P`).
- Korean line-height is roomier than Latin: body 1.55+, display 1.28–1.3.

## 4. Spacing, radii, elevation

- Content max-width `70rem`, `moa-container` centers with 2rem gutter.
- Section padding: `py-16` (mobile) → `py-20`/`py-24` (≥900px).
- Radius grammar: `sm 4` · `md 10` inner tiles, list rows ·
  `lg 12` cards, panels · `xl 16` · `pill` buttons, chips, inputs.
- **Shadows:** one measured shadow `0 16px 20px rgba(0,0,0,.04)` on
  `moa-card`. The phone mock carries the only device shadow
  (`0 24px 48px -12px rgba(0,0,0,.18)`). Hairlines do the separating;
  no gradients.
- Nav collapses below `760px` (`min-[760px]` desktop breakpoint).

## 5. Surface rhythm

`hero(white) → stats(bg) → earn(bg) → partners(white) →
use(bg) → steps(white) → faq(bg) → final-cta(white w/ navy panel) →
footer(white)`

`moa-navy` appears as the final-CTA panel, the earn-section inverted
card, and the partner grid's closing tile — three dark moments total.

## 6. Components (contract)

- **navbar** — sticky frosted white bar, h-14, pill "앱 다운로드" CTA;
  below 760px a hamburger opens an inline dropdown panel.
- **phone-mock** — `components/moapoint/phone-mock.tsx`. Navy bezel,
  working 홈/결제/내역 tabs (`aria-pressed`), a functional
  포인트-결제 switch chip, deterministic barcode, 26.5rem screen.
- **moa-card** — white, `lg` radius, measured shadow, soft border.
- **moa-card-flat** — white, `lg` radius, `moa-line` border, no shadow.
- **moa-navy-panel** — navy surface for inverted moments.
- **moa-chip** — pill, `moa-line` border, 13px semibold. Partner
  wordmarks render as chips, never as images.
- **moa-btn** — pill, 15px semibold; `primary` = navy fill,
  `ghost` = outlined on light, `light` = white fill on navy.
- **faq** — `moa-card` rows with `aria-expanded`/`aria-controls`
  accordion.
- **legal-page** — shared stub for `/moapoint/privacy`,
  `/moapoint/terms` (both carry a demo-only disclaimer).

## 7. Motion (`MOTION_INTENSITY 4`)

- Hero: `moa-fade-in` rise on copy, phone delayed 120ms.
- Buttons: 300ms ease color/transform transitions.
- Phone mock: instant tab swap; switch slides the knob.
- All of it collapses under `prefers-reduced-motion`
  (`.moa-fade-in` and button transitions disabled).

## 8. Do / Don't

**Do:** keep it monochrome · white cards on `moa-bg` · pill actions ·
`P` suffix numerals · Korean copy throughout · product mock over
stock imagery · disclose that all brands/figures are fictional.

**Don't:** introduce an accent color · gradients · serif or
Latin-display type · real company or partner names · real-looking
scale claims without the demo disclaimer.

## 9. Responsive contract

| Breakpoint | Change |
|---|---|
| ≥900px | Two-column hero split; earn grid 3-col |
| 760–899px | Hamburger nav; grids 2–3 col |
| <760px | Everything single column |
| <640px | Fluid display sizes shrink |

Demo disclosure lives in the footer and partner footnote: this is a
design demo for a fictional brand, not a real service.
