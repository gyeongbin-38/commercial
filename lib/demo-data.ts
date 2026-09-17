/*
 * Fictional demo data for the Orbit marketing site.
 * All people, companies, figures and events are invented for the demo.
 * Nothing here represents a real customer claim.
 */

export type Stage = "lead" | "talks" | "proposal" | "active";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "lead", label: "New lead" },
  { id: "talks", label: "In talks" },
  { id: "proposal", label: "Proposal sent" },
  { id: "active", label: "Active" },
];

export interface Client {
  id: string;
  contact: string;
  company: string;
  stage: Stage;
  nextTask: string;
  nextDue: string;
  lastTouch: string;
  channel: "Email" | "Call" | "Meeting" | "Form";
  value: string;
  initials: string;
}

export const CLIENTS: Client[] = [
  {
    id: "castellanos",
    contact: "Naomi Castellanos",
    company: "Castellanos Events",
    stage: "lead",
    nextTask: "Reply to venue-inquiry intake",
    nextDue: "Today, 4:30 PM",
    lastTouch: "Inbound form, 2h ago",
    channel: "Form",
    value: "$6,200",
    initials: "NC",
  },
  {
    id: "raghavan",
    contact: "Priya Raghavan",
    company: "Raghavan Advisory",
    stage: "lead",
    nextTask: "Send intro call link",
    nextDue: "Tomorrow, 9:00 AM",
    lastTouch: "Referral email, yesterday",
    channel: "Email",
    value: "$3,800",
    initials: "PR",
  },
  {
    id: "weber",
    contact: "Jonas Weber",
    company: "Weber Fotografie",
    stage: "lead",
    nextTask: "Qualify print-series scope",
    nextDue: "Thu, 11:00 AM",
    lastTouch: "Website form, Mon",
    channel: "Form",
    value: "$2,400",
    initials: "JW",
  },
  {
    id: "lindqvist",
    contact: "Petra Lindqvist",
    company: "Lindqvist Interiors",
    stage: "talks",
    nextTask: "Call about kitchen renovation quote",
    nextDue: "Today, 11:30 AM",
    lastTouch: "Call, yesterday",
    channel: "Call",
    value: "$14,500",
    initials: "PL",
  },
  {
    id: "marchetti",
    contact: "Diego Marchetti",
    company: "Marchetti Legal",
    stage: "talks",
    nextTask: "Share retainer options",
    nextDue: "Fri, 10:00 AM",
    lastTouch: "Meeting, Tue",
    channel: "Meeting",
    value: "$7,900",
    initials: "DM",
  },
  {
    id: "oyelaran",
    contact: "Marcus Oyelaran",
    company: "Oyelaran Media",
    stage: "proposal",
    nextTask: "Send revised proposal v2",
    nextDue: "Today, 9:00 AM",
    lastTouch: "Proposal viewed 40m ago",
    channel: "Email",
    value: "$9,600",
    initials: "MO",
  },
  {
    id: "ishida",
    contact: "Hana Ishida",
    company: "Ishida Translation",
    stage: "proposal",
    nextTask: "Follow up on sent proposal",
    nextDue: "Thu, 2:00 PM",
    lastTouch: "Proposal sent, Mon",
    channel: "Email",
    value: "$5,100",
    initials: "HI",
  },
  {
    id: "bauer",
    contact: "Ingrid Bauer",
    company: "Bauer & Kollegen",
    stage: "active",
    nextTask: "Deliver phase-2 board pack",
    nextDue: "Mon, 9:00 AM",
    lastTouch: "Invoice paid, yesterday",
    channel: "Email",
    value: "$18,200",
    initials: "IB",
  },
  {
    id: "ferreira",
    contact: "Tomás Ferreira",
    company: "Ferreira Arquitectos",
    stage: "active",
    nextTask: "Kickoff workshop prep",
    nextDue: "Thu, 1:00 PM",
    lastTouch: "Booking confirmed, Tue",
    channel: "Meeting",
    value: "$22,000",
    initials: "TF",
  },
  {
    id: "halloway",
    contact: "Wren Halloway",
    company: "Halloway Digital",
    stage: "active",
    nextTask: "Chase invoice #1042",
    nextDue: "Today, 3:00 PM",
    lastTouch: "Invoice overdue 3d",
    channel: "Email",
    value: "$8,750",
    initials: "WH",
  },
];

/* Hero dashboard mock */

export interface FollowUp {
  id: string;
  client: string;
  task: string;
  due: string;
  kind: "email" | "call" | "meeting" | "invoice";
  overdue?: boolean;
  week?: boolean;
}

export const FOLLOWUPS_TODAY: FollowUp[] = [
  {
    id: "f1",
    client: "Oyelaran Media",
    task: "Send revised proposal v2",
    due: "9:00 AM",
    kind: "email",
  },
  {
    id: "f2",
    client: "Lindqvist Interiors",
    task: "Call about kitchen quote",
    due: "11:30 AM",
    kind: "call",
  },
  {
    id: "f3",
    client: "Ferreira Arquitectos",
    task: "Kickoff workshop prep",
    due: "1:00 PM",
    kind: "meeting",
  },
  {
    id: "f4",
    client: "Halloway Digital",
    task: "Chase invoice #1042",
    due: "3:00 PM",
    kind: "invoice",
    overdue: true,
  },
  {
    id: "f5",
    client: "Castellanos Events",
    task: "Reply to intake form",
    due: "4:30 PM",
    kind: "email",
  },
];

export const FOLLOWUPS_WEEK: FollowUp[] = [
  {
    id: "w1",
    client: "Raghavan Advisory",
    task: "Send intro call link",
    due: "Wed 9:00 AM",
    kind: "email",
    week: true,
  },
  {
    id: "w2",
    client: "Ishida Translation",
    task: "Follow up on proposal",
    due: "Thu 2:00 PM",
    kind: "email",
    week: true,
  },
  {
    id: "w3",
    client: "Marchetti Legal",
    task: "Share retainer options",
    due: "Fri 10:00 AM",
    kind: "meeting",
    week: true,
  },
  {
    id: "w4",
    client: "Weber Fotografie",
    task: "Qualify print-series scope",
    due: "Thu 11:00 AM",
    kind: "call",
    week: true,
  },
  {
    id: "w5",
    client: "Bauer & Kollegen",
    task: "Deliver phase-2 board pack",
    due: "Mon 9:00 AM",
    kind: "meeting",
    week: true,
  },
];

export const PIPELINE_COUNTS: { stage: string; count: number; total: number }[] =
  [
    { stage: "New lead", count: 3, total: 14 },
    { stage: "In talks", count: 2, total: 14 },
    { stage: "Proposal sent", count: 2, total: 14 },
    { stage: "Active", count: 7, total: 14 },
  ];

/* Feature mocks */

export const TIMELINE_EVENTS = [
  {
    icon: "mail",
    text: "Proposal v2 viewed by Marcus Oyelaran",
    meta: "Oyelaran Media · 40m ago",
  },
  {
    icon: "calendar",
    text: "Kickoff workshop confirmed",
    meta: "Ferreira Arquitectos · Thu 1:00 PM",
  },
  {
    icon: "dollar",
    text: "Invoice #1041 paid",
    meta: "Bauer & Kollegen · $6,400 · yesterday",
  },
  {
    icon: "note",
    text: "Note added: prefers morning calls",
    meta: "Ishida Translation · yesterday",
  },
  {
    icon: "inbox",
    text: "New lead from website form",
    meta: "Castellanos Events · 2h ago",
  },
] as const;

export const AUTOMATIONS = [
  {
    id: "a1",
    when: "Proposal is accepted",
    then: "create a check-in task 3 days later",
    on: true,
  },
  {
    id: "a2",
    when: "New lead arrives",
    then: "schedule an intro-call task for tomorrow",
    on: true,
  },
  {
    id: "a3",
    when: "Invoice is 7 days overdue",
    then: "draft a polite nudge",
    on: false,
  },
  {
    id: "a4",
    when: "Booking ends",
    then: "ask for a testimonial next morning",
    on: true,
  },
] as const;

export const WEEK_BARS = [
  { day: "M", value: 5 },
  { day: "T", value: 8 },
  { day: "W", value: 6 },
  { day: "T", value: 9 },
  { day: "F", value: 4 },
  { day: "S", value: 1 },
  { day: "S", value: 2 },
] as const;

export const PERSONAS = [
  {
    icon: "pen",
    title: "Freelancers",
    line: "Every lead and follow-up in one queue, not five apps.",
  },
  {
    icon: "layers",
    title: "Design studios",
    line: "Proposals, bookings and project state on one timeline.",
  },
  {
    icon: "briefcase",
    title: "Consultants",
    line: "Know who needs attention before the day starts.",
  },
  {
    icon: "users",
    title: "Small agencies",
    line: "Share client context without a weekly status meeting.",
  },
  {
    icon: "compass",
    title: "Solo advisors",
    line: "CRM discipline without enterprise CRM weight.",
  },
] as const;

export const FAQS = [
  {
    q: "Is Orbit a CRM?",
    a: "Not in the enterprise sense. Orbit covers the daily loop of a small service business: leads, follow-ups, bookings and active work. There is no deal-desk module, no territory management and no 40-field contact form. If a spreadsheet plus your inbox almost works, Orbit is the step up.",
  },
  {
    q: "Can I import clients from a spreadsheet?",
    a: "Yes. Orbit imports CSV files and maps columns like name, email, company and stage during a short guided step. Most workspaces finish the import in under ten minutes.",
  },
  {
    q: "Does Orbit replace my calendar?",
    a: "No. Orbit syncs with the calendar you already use. Bookings and follow-up due times appear on your client timelines, and events you create in Orbit are pushed back to your calendar.",
  },
  {
    q: "Can several people share one workspace?",
    a: "Yes. The Studio plan includes 3 seats and Team includes 10. Everyone sees the same pipeline, the same follow-up queue and the same client timeline, so hand-offs stop living in chat threads.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep read-only access for 30 days and can export everything as CSV at any point, including during the trial. No export fees, no retention games.",
  },
  {
    q: "Is there a free trial?",
    a: "Fourteen days, every feature on the Studio plan, no card required. When the trial ends you pick a plan or export your data and walk away.",
  },
] as const;
