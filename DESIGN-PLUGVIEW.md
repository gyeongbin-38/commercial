# Plugview landing design rules

## Design read

- Page: commercial landing page for a React UI asset marketplace
- Audience: product builders, designers, and small engineering teams
- Language: premium dark-tech, Korean-first, product-led
- Dials: `DESIGN_VARIANCE 7` / `MOTION_INTENSITY 6` / `VISUAL_DENSITY 4`

## Codified reference rules

1. The page uses a near-black `#1d1d21` canvas with one interactive accent, cobalt `#145fe4`.
   Test: does any interactive element introduce a second brand accent?
2. Navigation stays under 80px and remains one line at desktop widths.
   Test: does the desktop navigation wrap or exceed 80px in height?
3. Hero composition is an asymmetric split: copy on the left, live component preview on the right.
   Test: does the hero still show a real preview beside the value proposition on desktop?
4. Hero copy uses at most one eyebrow, a two-line headline, one short paragraph, and two actions.
   Test: does the hero contain a version stamp, trust strip, or a third CTA?
5. Product UI is rendered as real component previews, not flat screenshot-shaped divs.
   Test: can the preview surface be interacted with or read as actual component output?
6. Cards use a single 12px to 16px radius family, while actions use full pills.
   Test: is any content card using a different corner language without a functional reason?
7. Elevation comes from hairlines and one tinted product shadow, never from generic shadows on every block.
   Test: are there drop shadows on buttons, list rows, or decorative panels?
8. Section headings are stacked above their supporting copy. There is no floating top-right explainer.
   Test: can every section header be read in one vertical flow?
9. Motion communicates hierarchy or feedback: hero rise, viewport reveal, preview tab state, and copy confirmation.
   Test: can each animation be explained as hierarchy, state transition, or feedback in one sentence?
10. The page is dark end to end. Mobile multi-column sections collapse to one column below 768px.
    Test: does any section switch to a light theme or keep a cramped two-column layout on mobile?
