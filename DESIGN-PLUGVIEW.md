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

## Depth & motion layer (v3)

11. The hero is a WebGL stage, not a backdrop — an orbit ring of
    liquid-glass asset panels (`MeshTransmissionMaterial`) circles a
    liquid-metal cobalt core (`MeshDistortMaterial`) over a flowing
    shader gradient. A left-side vignette protects the copy zone;
    the field mounts only at ≥1024px and freezes under reduced motion.
    Test: can the headline still be read at full contrast, and does the
    page work fully with WebGL absent or disabled?
12. The hero preview is a staged 3D object: the asset sheet holds a
    rotateX/rotateY pose, its module cards float at different translateZ
    depths, and the panel bobs idly. Below lg it renders flat.
    Test: does the preview read as an object in space, not a pasted image?
13. The preview section is a cover-flow deck — three preview windows on a
    perspective stage; side cards recede, dim, and rotate into focus on
    tab or card click. Instant under reduced motion.
    Test: can every preview still be reached by keyboard via the tab pills?
14. Liquid glass is the elevation language for chrome — the nav bar,
    eyebrow chip, tab pills, and the interest form refract the page
    (`backdrop-filter` + specular hairlines). The contact section puts a
    liquid-metal core *behind* the glass form so the form frosts it.
    Test: is any card or button wearing a generic drop shadow instead of
    refraction and hairlines?
15. The logo mark is liquid: it melts idly and melts harder on hover
    (SMIL-driven displacement), used consistently in nav, hero chip and
    footer. It is the only element allowed to distort; type and UI never
    warp — except the liquid-metal scene cores, which are the mark's
    geometry scaled into the field.
    Test: does any other element bend or liquefy?
16. The asset ticker is a live-inventory marquee — mono, low-contrast,
    pauses on hover, static under reduced motion. It lists asset names,
    never logos or testimonials.
    Test: does the ticker read as inventory rather than a trust strip?
17. Scroll-linked motion only draws the Find→Preview→Ship connector line
    and drifts the hero atlas. It never moves body copy or resizes type.
    Test: does any scroll animation touch text layout?
