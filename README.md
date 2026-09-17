# Orbit — commercial landing page

A complete marketing site for **Orbit**, a fictional client-operations
workspace for freelancers, studios, consultants and small agencies.
Built as a portfolio-grade product site: every company, person and
figure shown is illustrative demo data.

> Orbit gathers your leads, follow-ups, bookings and active work into
> one calm workspace, so the next right thing is always on top.

## Design process

The visual system is documented in [`DESIGN.md`](DESIGN.md), the source
of truth for the whole build. It adapts a supplied Apple-style design
analysis (photography/product-first layout, one accent color, hairline
dividers, pill CTAs, SF Pro-style typography) into an original Orbit
identity rather than copying it:

- **One interactive accent.** Action Blue (`#0066cc`) is reserved for
  CTAs and live controls; informational color is muted.
- **Full-bleed light/dark tiles.** Canvas, parchment and three dark
  tile tones alternate down the page; no decorative gradients.
- **Product UI as the hero.** The dashboard mock, feature windows and
  pipeline board use shared chrome (`components/product/app-ui.tsx`)
  and carry the page's only signature shadow.
- **Type.** Inter stands in for SF Pro with tight tracking and an
  SF-style display scale (56/40/34/28/21/17).
- **Restraint.** Borders and hairlines instead of chrome shadows;
  `prefers-reduced-motion` collapses all reveals and layout animation.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (`@theme` tokens mirror DESIGN.md)
- `motion` for reveals, layout animations, accordion, toggles
- `zod` + a Server Action for the lead form
- `lucide-react` icons
- `playwright-core` for QA scripts (uses installed Edge/Chrome)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npx tsc --noEmit # typecheck
```

## Page structure and UX architecture

The landing page is a 13-tile rhythm that alternates argument and
proof: a claim, then the product UI that backs it up.

| Section | Component | Role |
|---|---|---|
| Navbar | `navbar.tsx` | Sticky, mobile overlay menu, sign-in dialog |
| Hero | `hero.tsx` | Positioning + live follow-up queue mock |
| Audience | `audience.tsx` | Who Orbit is for |
| Problem | `problem.tsx` | Fragmented-client-detail friction (dark tile) |
| Follow-up queue | `feature-queue.tsx` | Feature: today queue |
| Client timeline | `feature-timeline.tsx` | Feature: per-client history (dark) |
| Automations + workload | `feature-pair.tsx` | Feature pair with live switches |
| Pipeline demo | `pipeline-demo.tsx` | **Interactive flagship** (below) |
| How it works | `how-it-works.tsx` | Three-step onboarding |
| Pricing | `pricing.tsx` | Monthly/yearly toggle, three plans |
| FAQ | `faq.tsx` | Accordion |
| Lead form | `lead-form.tsx` | Server Action + zod validation |
| Final CTA + footer | `final-cta.tsx`, `footer.tsx` | Close + full sitemap |

Demo data is centralized in `lib/demo-data.ts` so every mock tells the
same story.

## Interactions

- **Pipeline board** (`#demo`) — the flagship. Move client cards
  forward/back between stages with spring layout animation, live
  per-stage counts, a move counter and a reset. Horizontally scrollable
  with snap points on small screens.
- **Pricing** — Monthly/Yearly toggle with animated prices and
  `aria-pressed` state.
- **FAQ** — accordion with `aria-expanded`/`aria-controls`.
- **Sign-in dialog** — `role="dialog"`, `aria-modal`, focus trap,
  initial focus, Esc/backdrop close, focus return; submitting shows an
  honest "concept product" notice instead of faking auth.
- **Automations** — working on/off switches inside the feature mock.
- **Mobile nav** — full-screen overlay menu, Esc to close, closes on
  link click, locks body scroll.

## Lead form

`components/marketing/lead-form.tsx` posts to the Server Action in
`app/actions.ts`:

- zod schema in `lib/validation/contact.ts` validates name, email,
  company, team size (radio pills) and an optional message.
- Field-level errors render with `role="alert"` and `aria-describedby`.
- An invisible honeypot field (`website`) silently accepts bot posts.
- Success state echoes the submitted email and discloses that the demo
  stores nothing. A matching `POST /api/contact` route exists for the
  fetch-style path; both validate identically and persist nothing.

## SEO and accessibility

- Full metadata in `app/layout.tsx`: title template, description,
  Open Graph, Twitter card, robots, `metadataBase`.
- Generated `robots.txt`, `sitemap.xml`, favicon (`icon.svg`) and a
  dynamic OG image (`opengraph-image.tsx`).
- JSON-LD on `/` for `SoftwareApplication` + `FAQPage`.
- Semantic landmarks, labeled controls, keyboard-operable dialog,
  accordion and toggles, visible focus rings, `prefers-reduced-motion`
  support throughout.

## Responsive behavior

- `nav:` breakpoint at 834px switches desktop nav to the hamburger
  overlay.
- Feature grids collapse from two columns to one; the pipeline board
  becomes a snap-scrolling strip of 270px columns.
- Type scales down through fluid display classes; CTAs go full-width.

## Screenshots

Captured by `scripts/shot.mjs` into `shots/` at four viewports
(1440, 1280, 834, 390): `*-fold.png` (above the fold) and `*-full.png`
(full page after scrolling so reveals fire).

## QA helpers

```bash
node scripts/shot.mjs http://localhost:3001 shots   # 4-viewport screenshots
node scripts/interact.mjs http://localhost:3001     # 19 interaction checks
```

`interact.mjs` exercises the nav scroll, sign-in dialog (focus, submit,
Esc), pipeline forward/back/reset, pricing toggle, FAQ accordion, lead
form errors + success, and the mobile menu — then asserts a clean
console.

## Verified

- `npx tsc --noEmit` — clean
- `npx eslint .` — clean
- `npm run build` — clean (all routes prerender; `/api/contact` dynamic)
- Browser QA — zero console errors at 4 viewports; 19/19 interaction
  checks pass

## Portfolio demo sequence (60s)

| Time | Show |
|---|---|
| 0–5s | Hero + product UI mock |
| 5–15s | Problem + feature tiles |
| 15–25s | Pipeline demo: move a card, reset |
| 25–35s | Pricing monthly/yearly switch |
| 35–45s | Mobile viewport + overlay menu |
| 45–55s | Lead form: errors, then success |
| 55–60s | Terminal: lint, build, interaction suite |
