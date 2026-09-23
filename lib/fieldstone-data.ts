/*
 * Demo data for the Fieldstone Ventures landing page.
 * Fieldstone Ventures is a fictional brand; all program names,
 * founders, companies and figures are invented for this design demo.
 */

export const STATS = [
  { value: "196", suffix: "+", label: "Founders supported" },
  { value: "72", suffix: "", label: "Companies launched" },
  { value: "$36", suffix: "M", label: "Follow-on capital raised" },
  { value: "940", suffix: "+", label: "Regional jobs created" },
] as const;

export const PROGRAMS = [
  {
    name: "Idea Studio",
    length: "4 weeks",
    format: "Evenings, hybrid",
    body: "Pressure-test a raw idea before you quit the day job. Weekly critiques, customer-interview reps and a go or no-go decision at the end.",
    href: "#apply",
  },
  {
    name: "Capital Pathways",
    length: "Ongoing",
    format: "One-on-one",
    body: "Prep for loans, grants and equity rounds with an advisor who has sat on the other side of the table. Pitch deck to term sheet.",
    href: "#apply",
  },
  {
    name: "Founder Community",
    length: "Year-round",
    format: "Members only",
    body: "Alumni, mentors and monthly working sessions that stay open long after a program ends. The room you keep coming back to.",
    href: "#apply",
  },
] as const;

export const PATH_PHASES = [
  {
    num: "01",
    name: "Validate",
    body: "Weekly critiques and structured customer interviews turn a hunch into a tested problem worth solving.",
    program: "Idea Studio",
    outcome: "A go or no-go decision",
  },
  {
    num: "02",
    name: "Build",
    body: "Operator mentors work alongside you to ship a first product inside the cohort, not after it.",
    program: "Launch Accelerator",
    outcome: "A shipped v1",
  },
  {
    num: "03",
    name: "Launch",
    body: "Pilot with regional partners, land your first paying customers and prove the model in the open.",
    program: "Launch Accelerator",
    outcome: "First paying customers",
  },
  {
    num: "04",
    name: "Raise",
    body: "Pitch practice, data-room prep and warm introductions to the investors in our network.",
    program: "Capital Pathways",
    outcome: "A ready data room",
  },
] as const;

export const STORIES = [
  {
    quote:
      "I walked in with a spreadsheet of maybes. Twelve weeks later I had paying customers and a term sheet on the table.",
    name: "Maya Okafor",
    role: "Founder, Fieldline Logistics",
    program: "Launch Accelerator '25",
    img: "https://picsum.photos/id/1027/240/240",
  },
  {
    quote:
      "The mentors argued with my plan, which is exactly what I needed. Nobody here lets you stay comfortable.",
    name: "Daniel Reyes",
    role: "Cofounder, Brightframe",
    program: "Idea Studio '24",
    img: "https://picsum.photos/id/1005/240/240",
  },
  {
    quote:
      "Capital Pathways turned a scary raise into a checklist. We closed our pre-seed round in five months.",
    name: "Priya Raman",
    role: "Founder, Alder Health",
    program: "Capital Pathways '25",
    img: "https://picsum.photos/id/91/240/240",
  },
] as const;

export const FS_FAQS = [
  {
    q: "Who can apply to Fieldstone programs?",
    a: "Anyone building or planning a company in our region. Idea Studio runs open enrollment each quarter; the Launch Accelerator selects up to 12 teams per cohort through a short application and interview.",
  },
  {
    q: "Do the programs cost anything?",
    a: "Idea Studio and Capital Pathways are free for accepted founders. The Launch Accelerator takes a small warrant, disclosed in full before you sign. No program charges tuition.",
  },
  {
    q: "Do I need to be working on my company full-time?",
    a: "No. Idea Studio is designed for evenings so you can test the idea first. The accelerator expects real commitment during the 12 weeks, but many founders keep part-time work.",
  },
  {
    q: "Is this only for tech startups?",
    a: "No. Roughly half of each cohort is main-street or services businesses. If you intend to hire locally and grow revenue, the programs apply to you.",
  },
  {
    q: "How is Fieldstone funded?",
    a: "Through a mix of regional partners, corporate sponsors and economic-development grants. That funding is what keeps founder-facing programs free.",
  },
  {
    q: "What happens after a program ends?",
    a: "You join the Founder Community: alumni sessions, mentor office hours and investor updates. Capital Pathways advising stays open to alumni indefinitely.",
  },
] as const;
