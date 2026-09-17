export const STUDIO = {
  name: "Gyeongbin Bak",
  shortName: "GB",
  email: "gyeongbinb38@gmail.com",
  availability: "Available, 5 founding client slots open",
};

export const WORK_PROJECTS = [
  {
    id: "plugview",
    name: "Plugview",
    href: "https://plugview-beannnn.vercel.app",
    kind: "UI asset market landing",
    description:
      "A dark, motion-led landing page for a live React UI asset market. The page lets product teams see the interface before it enters their codebase.",
    highlights: [
      "Actual screen capture used as the hero visual",
      "Live preview tabs and copy-to-clipboard flow",
      "Responsive English-first build with motion",
    ],
    tags: ["Next.js", "UI marketplace", "Dark theme", "Interactive"],
    lang: "EN",
    year: "2026",
    screenshot: "/work/plugview-screen.png",
    video: "/work/plugview.webm",
  },
  {
    id: "moapoint",
    name: "MOA POINT",
    href: "/moapoint",
    kind: "Consumer membership landing",
    description:
      "Korean consumer-fintech membership landing. Monochrome navy system, Pretendard type, white cards on a light-gray field.",
    highlights: [
      "Fully Korean copy and layout rhythm",
      "Phone mock and partner grid sections",
      "Local font loading, zero layout shift",
    ],
    tags: ["Next.js", "Fintech", "Korean", "Mobile-first"],
    lang: "KO",
    year: "2026",
    screenshot: "/work/moapoint.png",
    video: "/work/moapoint.webm",
  },
  {
    id: "fieldstone",
    name: "Fieldstone Ventures",
    href: "/fieldstone",
    kind: "Editorial founder-ecosystem landing",
    description:
      "A serif-led editorial landing for an entrepreneurial ecosystem. Cormorant Garamond display over DM Sans, evergreen accent.",
    highlights: [
      "Story-driven long-form sections",
      "Program cards and founder stats",
      "Warm editorial tone, dark decision CTAs",
    ],
    tags: ["Next.js", "Editorial", "Serif display", "English"],
    lang: "EN",
    year: "2026",
    screenshot: "/work/fieldstone.png",
    video: "/work/fieldstone.webm",
  },
  {
    id: "marlowe",
    name: "Marlowe Racing",
    href: "/marlowe",
    kind: "Motorsport driver hub",
    description:
      "A volt-on-olive motorsport poster page: condensed uppercase display type, flat blocks, checker cues, marquee band.",
    highlights: [
      "Magnetic CTA buttons and marquee",
      "Results, merch and media sections",
      "Dark-only theme, Anton display type",
    ],
    tags: ["Next.js", "Dark theme", "Motion", "English"],
    lang: "EN",
    year: "2026",
    screenshot: "/work/marlowe.png",
    video: "/work/marlowe.webm",
  },
];

export const WORK_CAPABILITIES = [
  {
    title: "Responsive at every size",
    body: "Checked at 1440 / 1280 / 834 / 390 widths. Mobile menu, snap-scrolling sections, fluid type.",
  },
  {
    title: "SEO out of the box",
    body: "Metadata, Open Graph images, sitemap, robots, and JSON-LD structured data, wired on every page.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard-operable menus, dialogs, and accordions. Focus rings, ARIA state, and reduced-motion support.",
  },
  {
    title: "Forms that actually work",
    body: "Server-validated lead forms with field-level errors and a silent honeypot for spam.",
  },
  {
    title: "Motion with restraint",
    body: "Spring layout animation, reveals, and toggles that collapse gracefully for reduced motion.",
  },
  {
    title: "Deployed, not delivered as a zip",
    body: "Production build on Vercel with your domain, or a clean handoff to your own infrastructure.",
  },
  {
    title: "Measured, not vibes",
    body: "All four demos Lighthouse-audited on real profiles, with cumulative layout shift at 0.00 across the board.",
  },
];

export const WORK_MARQUEE = [
  "Landing pages",
  "SaaS marketing sites",
  "Membership flows",
  "E-commerce concepts",
  "Responsive QA",
  "SEO + OG images",
  "Lead forms",
  "Analytics wiring",
  "Fixed price, fixed date",
  "5-10 day delivery",
];

export const WORK_PACKAGES = [
  {
    id: "launch",
    name: "Launch",
    price: "$400",
    regularPrice: "$650",
    priceNote: "fixed",
    timeline: "5 days",
    featured: false,
    summary: "You bring the copy and a design reference. I ship the page.",
    features: [
      "Up to 5 sections, one page",
      "Responsive build, mobile menu",
      "Contact / lead form",
      "Basic SEO metadata",
      "1 revision round",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$900",
    regularPrice: "$1,400",
    priceNote: "fixed",
    timeline: "7-10 days",
    featured: true,
    summary: "Design and build from scratch. The package most clients pick.",
    features: [
      "Custom design + development",
      "Up to 10 sections",
      "Animations and interactive elements",
      "Lead form + email/CRM hookup",
      "SEO + OG image + analytics-ready",
      "2 revision rounds",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    price: "$1,800+",
    regularPrice: "$2,800+",
    priceNote: "scoped",
    timeline: "per project",
    featured: false,
    summary: "Interactive demos, CMS, multi-page sites, A/B test setup.",
    features: [
      "Everything in Growth",
      "Interactive product demos",
      "CMS or data integration",
      "Multi-page or multi-language",
      "A/B testing setup",
      "Scoped with a written spec",
    ],
  },
];

export const WORK_ABOUT = {
  title: "The designer is the developer",
  bio: [
    "I'm Gyeongbin, an AI applications major in Seoul. I sketch the page and write the code, so what you approve is what ships.",
  ],
  facts: [
    { label: "Background", value: "AI Applications major" },
    { label: "Role", value: "Designer + developer" },
    { label: "Languages", value: "English / Korean" },
    { label: "Location", value: "Seoul, KST, remote worldwide" },
    { label: "Stack", value: "Next.js, TypeScript, Tailwind" },
  ],
};

export const WORK_PROCESS = [
  {
    step: "01",
    title: "Brief",
    day: "Day 0",
    body: "A 20-minute async brief: your product, audience, the one action the page exists to drive. I reply with questions and a fixed quote.",
  },
  {
    step: "02",
    title: "Design concept",
    day: "Day 1-3",
    body: "One hero-direction concept plus section plan. You approve the direction before a single full section is built.",
  },
  {
    step: "03",
    title: "Build",
    day: "Day 3-7",
    body: "Full responsive build with real copy, motion, and form logic. You get a live preview URL from day one.",
  },
  {
    step: "04",
    title: "QA + launch",
    day: "Day 7-10",
    body: "Cross-viewport QA, accessibility pass, SEO check, then deploy to your domain. Revision rounds happen here.",
  },
];

export const WORK_FAQS = [
  {
    q: "Is the work shown real client work?",
    a: "The showcased projects are self-directed concept work. Every brand is fictional and disclosed as such on each site. They're built to the same standard as client work: real responsive QA, accessibility, SEO, and interaction details. The point is to show the range of design systems I can design and build, end to end.",
  },
  {
    q: "What do you need from me to start?",
    a: "Three things: what you're selling, who it's for, and what the page should get them to do (sign up, book a call, buy). Copy can be yours or added as an add-on. I don't write conversion copy from a blank page without a brief.",
  },
  {
    q: "How does payment work?",
    a: "50% to hold your slot, 50% at launch. The price is fixed, with no hourly billing or surprise invoices. Wise, PayPal, or Korean bank transfer, whichever suits you. Nothing starts before the deposit clears.",
  },
  {
    q: "What's not included?",
    a: "Copywriting from a blank page (available as an add-on with a real brief), logo and brand identity, 3D or video production, and anything behind a login. Ongoing maintenance isn't bundled either. It's a small monthly retainer if you want me to keep the lights on.",
  },
  {
    q: "What if the design direction misses?",
    a: "You approve one hero-direction concept before any full section is built, so a wrong direction gets caught early, not at delivery. If we can't align on the concept within the included rounds, we stop there and you only pay for the work delivered so far.",
  },
  {
    q: "How do revisions work?",
    a: "Each package includes a fixed number of revision rounds. A round means a collected list of changes, not a drip-feed. Extra rounds are billed at a fixed fee agreed before work starts, so there are no surprises.",
  },
  {
    q: "What's the stack, and who owns it?",
    a: "Next.js + TypeScript + Tailwind, deployed on Vercel. It is the same stack as every project on this page. You own the code and the repo. If you prefer handoff, I deliver the repo with a README. If you prefer managed, I keep it hosted for a small monthly retainer.",
  },
  {
    q: "Where are you based? Is timezone a problem?",
    a: "Seoul, South Korea (KST), working remote worldwide. Everything runs async by default: briefs, preview links, and revision lists are in writing, so nothing depends on overlapping hours. For US and EU clients the gap usually works in your favor. Feedback left in your evening is turned around by your morning. Messages get a reply within 24 hours.",
  },
  {
    q: "How fast is fast?",
    a: "Launch ships in 5 days, Growth in 7-10. That's real calendar time assuming you reply to the concept and revision rounds within a day or two. Rush timelines are possible for a surcharge.",
  },
];
