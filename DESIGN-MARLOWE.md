# DESIGN-MARLOWE.md — MARLOWE RACING Design System

Visual source of truth for the `/marlowe` landing page.
MARLOWE is a **fictional** motorsport brand: driver Jett Marlowe, the #71
car, Marlowe Racing in a fictional World GP Series. Every circuit,
result, product, price and figure is invented demo data; photography is
stock imagery. The footer discloses this explicitly.

Tokens measured from a motorsport driver-hub reference (volt accent on
dark olive, condensed display type, flat blocks, single `ease` motion).

## 1. Design read

- **Page kind:** driver-hub landing (results + merch + media)
- **Audience:** racing fans and streetwear buyers; young, energy-first
- **Language:** flat volt-on-olive motorsport poster — huge condensed
  uppercase type, flat color blocks, checker cues, no shadows.
- **Dials:** `DESIGN_VARIANCE 8` / `MOTION_INTENSITY 6` / `VISUAL_DENSITY 5`

## 2. Color

One accent, locked page-wide. Tokens in `app/marlowe/marlowe.css` under
the `--mar-*` prefix.

| Token | Hex | Role |
|---|---|---|
| `mar-bg` | `#3b3c38` | Page canvas |
| `mar-bg-deep` | `#282c20` | Deep surface, buttons on volt, checker dark |
| `mar-card` | `#43443e` | Lifted cards (merch, media) |
| `mar-card-flat` | `#34352f` | Row hover, subtle fills |
| `mar-volt` | `#d2ff00` | The single accent |
| `mar-volt-dim` | `#b9dc00` | Volt hover |
| `mar-text` | `#f4f4ed` | Primary text |
| `mar-text-dim` | `#b9bab0` | Secondary text |
| `mar-on-volt` | `#282c20` | Text on volt surfaces |
| `mar-line` / `mar-line-soft` | rgba white | Hairlines |

**Rules**
- Volt is the only accent: CTAs, P1 badge, marquee, stats band,
  newsletter panel, footer wordmark, hover states.
- No gradients, no shadows, no glows. Depth comes from flat blocks and
  the volt offset frame behind media.
- Theme is dark-only by design (motorsport poster), locked page-wide.

## 3. Type

- **Display:** Anton (`--font-mar-display`) — the free stand-in for the
  reference's commercial Brier cut. Always uppercase, `line-height .85`,
  tight tracking. Scale: hero `clamp(4.75rem,12vw,10.5rem)`, sections
  `clamp(2.75rem,6vw,5.5rem)`, footer wordmark up to `15rem`.
- **UI/body:** Archivo (`--font-mar-sans`) — extrabold micro-caps
  (`0.75rem / 800 / tracking .12-.18em`) for labels, nav, buttons;
  semibold 15px for lead copy.

## 4. Shape, spacing, motion

- Radius grammar: `2px` micro badges · `6px` chips/small controls ·
  `14px` cards/media · `39px` buttons, inputs and big panels. One system,
  no mixing.
- Spacing on an `11px` base grid (gaps `11px`, section rhythm `44px`
  multiples).
- Motion: `ease` only. Entrance `mar-rise` fade+rise, image hover scale.
  Everything collapses to static under `prefers-reduced-motion`.

### Interaction layer

Client leaves in `components/marlowe/` — all respect reduced motion and
degrade on touch:

- `MarLapProgress` — fixed 3px volt scroll bar with a "car" square at the
  leading edge; the page read as one lap.
- `MarMagnetic` — spring-based cursor pull on the primary CTA
  (strength 0.28, springs to rest).
- `MarTilt` — perspective tilt (7deg, `transformPerspective 900`) on the
  hero photo.
- `MarCountdown` — live `role="timer"` countdown to `NEXT_RACE.iso`
  (2026-09-28), renders `--` before hydration to avoid mismatch; sector
  bars (`mar-live`) pulse beside the label.
- `MarCountUp` — stats numbers ease `0 -> n` once 70% in view; SSR prints
  the final value so no-JS reads correctly.
- `MarSpotCard` — merch cards track `--mx/--my` and light a 340px radial
  volt glow + inset rim on hover.
- `MarMarquee` — Motion `useVelocity` marquee: 85px/s base drift, scroll
  velocity scales speed up to 3x and can flip direction; pauses on hover.
- `MarMedia` — rail arrows scroll one card per click.
- Kinetic hero: `mar-letter` splits the headline into per-character
  clips rising in on a 45ms stagger (`--i`).
- `mar-outline` — giant stroked `71` (webkit-text-stroke, 32% volt)
  pinned behind the hero photo.
- `mar-grain` — fixed 5% SVG-turbulence film grain, `pointer-events:
  none`, sits above the whole page as a print layer.
- `mar-checker` — the one decorative pattern: finish-line strips above
  the stats band and below the footer.

## 5. Imagery

Real photography via `images.unsplash.com` hotlinks, desaturated
server-side (`sat=-100`) so every shot reads grayscale against the volt
accents:

- Hero: `photo-1544636331` (race car nose at night)
- Drop: `photo-1531891437562` (cap), `photo-1492144534655` (garage tee),
  `photo-1542282088` (headlight jacket)
- Media rail: `photo-1449965408869`, `photo-1493238792000`,
  `photo-1492144534655`, `photo-1568605117036`
- Driver quote: `photo-1500648767791`

## 6. Page sections

1. Sticky nav (64px, single line ≥992px, hamburger below)
2. Hero — asymmetric split, kinetic Anton name + outlined 71 graphic +
   tilting grayscale race photo with volt offset frame
3. Volt marquee band (-1deg tilt, checker separators) — scroll-velocity
   driven, pauses on hover
4. 2026 season — live countdown panel + grouped results
   (Completed / Up next), single bottom-border family, hover row shift
5. Volt stats band — checker finish line + 4 display numbers that
   count up in view
6. The Drop — 4-cell bento (3 photo tiles + 1 volt tile), spotlight
   hover, Add buttons with live added-state
7. From the paddock — horizontal snap rail of video cards + arrow controls
8. Driver quote + portrait
9. 71 Club newsletter — volt panel, dark pill input, error/success states
10. Footer — giant volt wordmark, link columns, fictional-brand
    disclosure, checker finish line

Eyebrow budget: hero chip, "2026 season", "Latest drop" — 3 total.
