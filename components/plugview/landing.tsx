"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { AssetTicker, HeroPreviewStage, LiquidMark, PvMagnetic } from "./effects";
import {
  ArrowRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Eye,
  Layers3,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type PreviewKind = "hero" | "pricing" | "form";
type SubmitState = "idle" | "loading" | "success" | "error";

const EASE = [0.16, 1, 0.3, 1] as const;

const navItems = [
  { label: "Asset Market", href: "#market" },
  { label: "Make", href: "#make" },
  { label: "How it works", href: "#how" },
];

const previewTabs: { kind: PreviewKind; label: string }[] = [
  { kind: "hero", label: "Hero Section" },
  { kind: "pricing", label: "Pricing Cards" },
  { kind: "form", label: "Login Form" },
];

const HeroScene = dynamic(
  () => import("./scene3d").then((mod) => mod.HeroScene),
  { ssr: false }
);

const LiquidCore = dynamic(
  () => import("./scene3d").then((mod) => mod.LiquidCore),
  { ssr: false }
);

const ComponentField = dynamic(
  () => import("./scene3d").then((mod) => mod.ComponentField),
  { ssr: false }
);

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-[7px] bg-[#145fe4] font-black text-white shadow-[0_8px_24px_rgba(20,95,228,0.24)] ${small ? "h-8 w-8 text-sm" : "h-10 w-10 text-base"}`}
    >
      P
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.58, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pv-glass-bar sticky top-0 z-50 border-b border-white/10">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10"
      >
        <Link href="#top" className="flex items-center gap-3" aria-label="Plugview home">
          <LiquidMark size={32} />
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-bold tracking-[-0.03em] text-white">Plugview</span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.08em] text-white/45">UI ASSET MARKET</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="#market" className="pv-button pv-button-small pv-button-primary hidden sm:inline-flex">
            Explore assets
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/12 text-white transition hover:border-white/30 hover:bg-white/5 lg:hidden"
          >
            {open ? <X size={18} strokeWidth={1.7} /> : <Menu size={18} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="border-t border-white/10 bg-[#1d1d21]/95 px-5 pb-6 pt-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-4 text-lg font-medium text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#market"
                onClick={() => setOpen(false)}
                className="pv-button pv-button-primary mt-5 w-full"
              >
                Explore assets
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function InteractivePreview({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [2.4, -2.4]), { stiffness: 180, damping: 24, mass: 0.7 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-3.2, 3.2]), { stiffness: 180, damping: 24, mass: 0.7 });
  const spotlightX = useTransform(pointerX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(pointerY, [0, 1], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotlightX} ${spotlightY}, rgba(75, 141, 244, 0.16), transparent 68%)`;

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType === "touch" || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    pointerX.set(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)));
    pointerY.set(Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)));
  }

  function resetPointer() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.div
      ref={frameRef}
      onPointerMove={movePointer}
      onPointerLeave={resetPointer}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className="relative [transform-style:preserve-3d]"
    >
      {children}
      {!reduce && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[16px]" style={{ background: spotlight }} />}
    </motion.div>
  );
}

function PreviewChrome({ children }: { children: ReactNode }) {
  return (
      <div className="pv-preview-window overflow-hidden rounded-[16px] border border-white/12 bg-[#111318] text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="flex h-11 items-center border-b border-white/10 bg-[#0d0f14] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-[7px] border border-white/12 bg-white/[0.05] px-3 py-1 text-[10px] font-mono text-white/35 backdrop-blur-md">
          <span className="text-[#145fe4]">https://</span>plugview.dev/preview
        </div>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {children}
      </div>
  );
}

function AtlasCard({
  index,
  title,
  children,
  className = "",
  delay = 0,
  depth = 0,
}: {
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  depth?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={
        depth > 0
          ? { z: depth, boxShadow: "0 24px 50px rgba(0,0,0,0.38)" }
          : undefined
      }
      className={`rounded-[10px] border border-white/10 bg-[#232327] p-3.5 sm:p-4 ${className}`}
    >
      <div className="flex items-baseline justify-between">
        <span className="pv-mono text-[8px] uppercase tracking-[0.2em] text-[#8f8a7c]">
          {index}
        </span>
        <span className="pv-mono text-[8px] uppercase tracking-[0.16em] text-white/38">
          {title}
        </span>
      </div>
      {children}
    </motion.section>
  );
}

function CalendarCard() {
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  const offset = 1;
  const eventDays = new Set([5, 22, 30]);
  return (
    <AtlasCard index="A-01" title="Calendar" className="flex flex-col sm:row-span-2" delay={0.5} depth={34}>
      <div className="mt-3 flex items-center justify-between">
        <span className="pv-mono text-[9px] tracking-[0.12em] text-white/72">
          SEP 2026
        </span>
        <span className="flex gap-1">
          <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-white/12 text-[8px] leading-none text-white/40">
            ‹
          </span>
          <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-white/12 text-[8px] leading-none text-white/40">
            ›
          </span>
        </span>
      </div>
      <div className="mb-3 mt-3 grid grid-cols-7 gap-[3px] text-center">
        {weekdays.map((d, i) => (
          <span key={i} className="pv-mono text-[7.5px] uppercase text-white/28">
            {d}
          </span>
        ))}
        {Array.from({ length: offset + 30 }, (_, i) => {
          const day = i - offset + 1;
          const inMonth = day >= 1;
          const isToday = day === 17;
          const hasEvent = inMonth && eventDays.has(day);
          return (
            <span
              key={i}
              className={`flex h-7 items-center justify-center rounded-[4px] pv-mono text-[8px] sm:h-8 ${
                isToday
                  ? "bg-[#b8d94a] font-semibold text-[#1d1d21]"
                  : hasEvent
                    ? "bg-white/8 text-white/72"
                    : inMonth
                      ? "text-white/38"
                      : ""
              }`}
            >
              {inMonth ? day : ""}
            </span>
          );
        })}
      </div>
      <div className="mt-auto flex items-center gap-2 border-t border-white/8 pt-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8d94a]" />
        <span className="pv-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
          3 events this week
        </span>
      </div>
    </AtlasCard>
  );
}

function QueueCard() {
  const items = [
    { name: "Proposal follow-up", tag: "TODAY", lime: true },
    { name: "Invoice #1042", tag: "DUE" },
    { name: "Intake form", tag: "FRI" },
    { name: "Kickoff prep", tag: "+2D" },
  ];
  return (
    <AtlasCard index="A-02" title="Follow-up queue" delay={0.62} depth={20}>
      <div className="mt-3 flex items-center justify-between">
        <span className="pv-mono text-[9px] tracking-[0.12em] text-white/72">
          QUEUE
        </span>
        <span className="pv-mono text-[8px] text-white/35">4 OPEN</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-2.5 rounded-[6px] border border-white/8 bg-white/[0.03] px-2.5 py-2"
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.lime ? "bg-[#b8d94a]" : "bg-white/25"}`}
            />
            <span className="truncate text-[11px] text-white/68">
              {item.name}
            </span>
            <span
              className={`ml-auto shrink-0 rounded-[3px] border px-1.5 py-0.5 pv-mono text-[7.5px] tracking-[0.08em] ${
                item.lime
                  ? "border-[#b8d94a]/50 text-[#b8d94a]"
                  : "border-white/12 text-white/40"
              }`}
            >
              {item.tag}
            </span>
          </li>
        ))}
      </ul>
    </AtlasCard>
  );
}

function StatusCard() {
  const bars = [34, 48, 40, 62, 55, 78, 92];
  return (
    <AtlasCard index="A-03" title="Status" delay={0.74} depth={48}>
      <div className="mt-3 flex items-start justify-between">
        <div>
          <span className="pv-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
            On-time
          </span>
          <p className="mt-1.5 text-[26px] font-light leading-none text-white">
            92<span className="text-white/38">%</span>
          </p>
        </div>
        <span className="pv-mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[#b8d94a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b8d94a]" />
          Synced
        </span>
      </div>
      <div className="mt-3.5 flex h-11 items-end gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={`w-full rounded-[2px] ${i === bars.length - 1 ? "bg-[#b8d94a]" : "bg-white/14"}`}
          />
        ))}
      </div>
    </AtlasCard>
  );
}

function UiAtlas() {
  return (
    <div
      role="img"
      aria-label="Plugview asset sheet preview: calendar, follow-up queue and status cards"
      className="pv-atlas rounded-[16px] border border-[#ddd9cb] bg-[#efede6] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] [transform-style:preserve-3d] sm:p-3"
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between px-1 pb-2.5 pt-0.5 sm:px-1.5">
          <span className="pv-mono text-[8px] uppercase tracking-[0.2em] text-[#8f8a7c]">
            PV·Atlas / 03 modules
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            <span className="h-2 w-2 rounded-[2px] border border-[#b9b4a3]" />
            <span className="h-2 w-2 rounded-[2px] border border-[#b9b4a3]" />
            <span className="h-2 w-2 rounded-[2px] border border-[#b9b4a3]" />
          </span>
          <span className="pv-mono text-[8px] uppercase tracking-[0.14em] text-[#a39e8f]">
            Sheet 01
          </span>
        </div>
        <div className="grid gap-2.5 [transform-style:preserve-3d] sm:grid-cols-[1.08fr_1fr]">
          <CalendarCard />
          <QueueCard />
          <StatusCard />
        </div>
        <div className="flex items-center justify-between px-1 pb-0.5 pt-2.5 sm:px-1.5">
          <span className="pv-mono text-[8px] uppercase tracking-[0.2em] text-[#8f8a7c]">
            Asset sheet · React UI
          </span>
          <span className="pv-mono text-[8px] uppercase tracking-[0.14em] text-[#a39e8f]">
            Charcoal / Paper / Lime
          </span>
        </div>
      </div>
    </div>
  );
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="pv-mono mb-2 text-[9px] uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
      <div className="flex gap-1.5" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`min-h-9 rounded-[6px] border px-3.5 text-xs font-medium transition-colors ${
              value === o.value
                ? "border-[#145fe4] bg-[#145fe4]/15 text-white"
                : "border-white/14 text-white/55 hover:border-white/30 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const PV_TIERS = [
  { name: "Starter", monthly: 12, annual: 9, featured: false },
  { name: "Pro", monthly: 29, annual: 23, featured: true },
  { name: "Team", monthly: 59, annual: 47, featured: false },
] as const;

function PricingPreview({
  billing,
  onBilling,
}: {
  billing: "monthly" | "annual";
  onBilling: (b: "monthly" | "annual") => void;
}) {
  return (
    <PreviewChrome>
      <div className="min-h-[390px] bg-[#181b22] p-6 sm:p-9">
        <div className="mx-auto max-w-[560px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="pv-mono text-[9px] uppercase tracking-[0.16em] text-[#70a7ff]">
                Pricing
              </p>
              <p className="mt-1.5 text-lg font-medium tracking-[-0.02em] text-white">
                Pick a tier
              </p>
            </div>
            <div
              className="flex rounded-full border border-white/14 p-0.5"
              role="group"
              aria-label="Billing period"
            >
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  aria-pressed={billing === b}
                  onClick={() => onBilling(b)}
                  className={`min-h-8 rounded-full px-3.5 text-[11px] font-medium capitalize transition-colors ${
                    billing === b
                      ? "bg-[#145fe4] text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {PV_TIERS.map((t) => (
              <div
                key={t.name}
                className={`rounded-[10px] border p-4 ${
                  t.featured
                    ? "border-[#145fe4] bg-[#145fe4]/12"
                    : "border-white/10 bg-[#20242c]"
                }`}
              >
                <p className="text-[12px] font-medium text-white/72">
                  {t.name}
                </p>
                <p className="mt-3 text-[24px] font-light leading-none text-white">
                  <span className="align-top text-[13px] text-white/50">$</span>
                  <span className="tabular-nums">
                    {billing === "monthly" ? t.monthly : t.annual}
                  </span>
                  <span className="ml-1 text-[10px] text-white/40">/mo</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-[10px] text-white/50">
                  {t.name === "Starter" && <li>5 assets / month</li>}
                  {t.name === "Starter" && <li>Core components</li>}
                  {t.name === "Pro" && <li>Unlimited assets</li>}
                  {t.name === "Pro" && <li>Make Builder access</li>}
                  {t.name === "Team" && <li>Shared workspace</li>}
                  {t.name === "Team" && <li>Priority releases</li>}
                </ul>
                <div
                  className={`mt-5 flex h-7 items-center justify-center rounded-[5px] text-[10px] font-semibold ${
                    t.featured
                      ? "bg-[#145fe4] text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {t.featured ? "Most picked" : "Choose"}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[9px] text-white/30">
            Demo component — billing switch updates local state only.
          </p>
        </div>
      </div>
    </PreviewChrome>
  );
}

function LoginPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "At least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    window.setTimeout(() => setState("done"), 650);
  }

  const inputCls = (bad: boolean) =>
    `h-10 w-full rounded-[6px] border bg-white/[0.02] px-3 text-[12px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#145fe4] ${
      bad ? "border-[#ff6b6b]/70" : "border-white/12"
    }`;

  return (
    <PreviewChrome>
      <div className="flex min-h-[390px] items-center justify-center bg-[#181b22] p-6 sm:p-9">
        <div className="w-full max-w-[340px] rounded-[11px] border border-white/10 bg-[#20242c] p-6 sm:p-7">
          {state === "done" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#145fe4] text-white">
                <Check size={17} strokeWidth={2} />
              </span>
              <p className="mt-4 text-sm font-medium text-white">
                Signed in — demo only.
              </p>
              <p className="mt-1.5 text-[11px] leading-5 text-white/45">
                Nothing was sent or stored. The password never leaves this
                field.
              </p>
              <button
                type="button"
                onClick={() => {
                  setState("idle");
                  setEmail("");
                  setPassword("");
                  setErrors({});
                }}
                className="mt-5 min-h-9 rounded-[6px] border border-white/16 px-4 text-xs font-medium text-white/70 transition-colors hover:border-white/35 hover:text-white"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-2">
                <LogoMark small />
                <p className="text-[13px] font-semibold text-white">
                  Sign in to Plugview
                </p>
              </div>
              <form onSubmit={submit} noValidate>
                <div>
                  <label
                    htmlFor="pv-login-email"
                    className="mb-1.5 block text-[10px] font-medium text-white/55"
                  >
                    Email
                  </label>
                  <input
                    id="pv-login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "pv-login-email-err" : undefined}
                    placeholder="you@company.com"
                    className={inputCls(!!errors.email)}
                  />
                  {errors.email && (
                    <p id="pv-login-email-err" className="mt-1.5 text-[10px] text-[#ff9b9b]">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="pv-login-pw"
                    className="mb-1.5 block text-[10px] font-medium text-white/55"
                  >
                    Password
                  </label>
                  <input
                    id="pv-login-pw"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((p) => ({ ...p, password: undefined }));
                    }}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "pv-login-pw-err" : undefined}
                    placeholder="6+ characters"
                    className={inputCls(!!errors.password)}
                  />
                  {errors.password && (
                    <p id="pv-login-pw-err" className="mt-1.5 text-[10px] text-[#ff9b9b]">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="mt-5 h-10 w-full rounded-[6px] bg-[#145fe4] text-[12px] font-semibold text-white transition-colors hover:bg-[#2b70ed] disabled:opacity-60"
                >
                  {state === "loading" ? "Signing in..." : "Sign in"}
                </button>
              </form>
              <p className="mt-4 text-center text-[9px] text-white/30">
                Local demo — no account, no network.
              </p>
            </>
          )}
        </div>
      </div>
    </PreviewChrome>
  );
}

function HeroSectionPreview({
  theme,
  align,
}: {
  theme: "dark" | "light";
  align: "left" | "center";
}) {
  const dark = theme === "dark";
  return (
    <PreviewChrome>
      <div
        className={`flex min-h-[390px] items-center p-6 transition-colors duration-300 sm:p-10 ${
          dark ? "bg-[#181b22]" : "bg-[#f4f4f2]"
        }`}
      >
        <div
          className={`mx-auto grid w-full max-w-[720px] items-center gap-8 sm:grid-cols-[1.1fr_1fr] sm:gap-10 ${
            align === "center" ? "text-center sm:grid-cols-1" : ""
          }`}
        >
          <div className={align === "center" ? "mx-auto max-w-[420px]" : ""}>
            <span
              className={`inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                dark ? "bg-[#145fe4]/20 text-[#70a7ff]" : "bg-[#145fe4]/10 text-[#145fe4]"
              }`}
            >
              New · Asset drop 12
            </span>
            <p
              className={`mt-4 text-[26px] font-light leading-[1.12] tracking-[-0.04em] sm:text-[32px] ${
                dark ? "text-white" : "text-[#17181c]"
              }`}
            >
              Ship the next screen before lunch.
            </p>
            <p
              className={`mt-3 text-[12px] leading-6 ${
                dark ? "text-white/55" : "text-[#17181c]/60"
              }`}
            >
              Production-ready hero section. Swap the copy, keep the rhythm.
            </p>
            <div
              className={`mt-6 flex gap-2.5 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              <span className="flex h-9 items-center rounded-full bg-[#145fe4] px-5 text-[11px] font-semibold text-white">
                Get the assets
              </span>
              <span
                className={`flex h-9 items-center rounded-full border px-5 text-[11px] font-semibold ${
                  dark ? "border-white/16 text-white/70" : "border-black/15 text-[#17181c]/70"
                }`}
              >
                How it works
              </span>
            </div>
          </div>
          {align === "left" && (
            <div
              className={`hidden rounded-[10px] border p-4 sm:block ${
                dark ? "border-white/10 bg-[#20242c]" : "border-black/10 bg-white"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/16" : "bg-black/15"}`} />
                <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/16" : "bg-black/15"}`} />
                <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/16" : "bg-black/15"}`} />
              </div>
              <div className="mt-4 space-y-2.5">
                <div className={`h-8 rounded-[5px] ${dark ? "bg-white/8" : "bg-black/8"}`} />
                <div className={`h-8 rounded-[5px] ${dark ? "bg-white/8" : "bg-black/8"}`} />
                <div className={`h-8 rounded-[5px] border ${dark ? "border-[#145fe4]/50 bg-[#145fe4]/15" : "border-[#145fe4]/40 bg-[#145fe4]/10"}`} />
                <div className={`h-8 rounded-[5px] ${dark ? "bg-white/8" : "bg-black/8"}`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewChrome>
  );
}

function ComponentPreview({
  kind,
  heroTheme,
  heroAlign,
  billing,
  onBilling,
}: {
  kind: PreviewKind;
  heroTheme: "dark" | "light";
  heroAlign: "left" | "center";
  billing: "monthly" | "annual";
  onBilling: (b: "monthly" | "annual") => void;
}) {
  if (kind === "pricing")
    return <PricingPreview billing={billing} onBilling={onBilling} />;
  if (kind === "form") return <LoginPreview />;
  return <HeroSectionPreview theme={heroTheme} align={heroAlign} />;
}

/*
 * Cover-flow deck: all three previews live on a shallow 3D stage. The active
 * card sits front and flat; the other two recede left/right, dimmed, and a
 * click (or the tab pills) rotates the deck. Reduced motion keeps the same
 * layout with instant transitions.
 */
function PreviewDeck({
  active,
  onSelect,
  heroTheme,
  heroAlign,
  billing,
  onBilling,
}: {
  active: PreviewKind;
  onSelect: (kind: PreviewKind) => void;
  heroTheme: "dark" | "light";
  heroAlign: "left" | "center";
  billing: "monthly" | "annual";
  onBilling: (b: "monthly" | "annual") => void;
}) {
  const order: PreviewKind[] = ["hero", "pricing", "form"];
  const activeIndex = order.indexOf(active);
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto h-[470px] max-w-[1240px] [perspective:2000px] sm:h-[540px]">
      <div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ transform: "rotateX(3deg)" }}
      >
        {order.map((kind, i) => {
          const offset = i - activeIndex;
          const isActive = offset === 0;
          return (
            <motion.div
              key={kind}
              initial={false}
              animate={{
                x: `${offset * 54}%`,
                z: -Math.abs(offset) * 230,
                rotateY: offset * -26,
                scale: 1 - Math.abs(offset) * 0.13,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 110, damping: 19, mass: 0.9 }
              }
              style={{
                zIndex: 10 - Math.abs(offset),
                transformStyle: "preserve-3d",
              }}
              className={`absolute inset-x-0 top-0 mx-auto w-[min(96%,1040px)] ${
                isActive ? "" : "cursor-pointer"
              }`}
              aria-hidden={!isActive}
              inert={!isActive}
              onClick={() => {
                if (!isActive) onSelect(kind);
              }}
            >
              <ComponentPreview
                kind={kind}
                heroTheme={heroTheme}
                heroAlign={heroAlign}
                billing={billing}
                onBilling={onBilling}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group flex gap-4 py-6 sm:gap-6 sm:py-8">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/12 bg-white/[0.035] text-[#70a7ff] transition duration-300 group-hover:scale-105 group-hover:border-[#145fe4]/70 group-hover:bg-[#145fe4]/10">
        {icon}
      </span>
      <div>
        <h3 className="text-[17px] font-medium tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#a9c8ff]">{title}</h3>
        <p className="mt-2 max-w-[34ch] text-sm leading-6 text-white/52">{text}</p>
      </div>
    </div>
  );
}

function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(code);
      ok = true;
    } catch {
      // clipboard API can be unavailable (permissions, insecure context)
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden rounded-[12px] border border-white/12 bg-[#111318] shadow-[0_22px_60px_rgba(0,0,0,0.26)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/46">
          <Code2 size={14} strokeWidth={1.7} />
          <span className="pv-mono">{filename}</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="flex min-h-10 items-center gap-2 rounded-[7px] border border-white/12 px-3 text-xs text-white/60 transition hover:border-white/30 hover:text-white active:scale-[0.98]"
        >
          {copied ? <Check size={13} strokeWidth={1.8} /> : <Copy size={13} strokeWidth={1.8} />}
          {copied ? "Copied" : "Copy code"}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? "Code copied to clipboard" : ""}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 text-[12px] leading-7 text-white/72 sm:p-7 sm:text-[13px]"><code>{code}</code></pre>
    </motion.div>
  );
}

function InterestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? "").trim();

    if (!submittedEmail || !submittedEmail.includes("@")) {
      setStatus("error");
      return;
    }

    setEmail(submittedEmail);
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 700);
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[224px] flex-col justify-center rounded-[12px] border border-[#145fe4]/55 bg-[#145fe4]/10 p-6 sm:p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#145fe4] text-white">
          <Check size={18} strokeWidth={2} />
        </span>
        <h3 className="mt-5 text-xl font-medium text-white">That&apos;s the success state.</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">Demo form — {email} wasn&apos;t sent or stored anywhere.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="pv-glass rounded-[12px] p-6 sm:p-8">
      <div>
        <label htmlFor="interest-email" className="text-sm font-medium text-white">Email address</label>
        <p className="mt-2 text-xs leading-5 text-white/45">Get new assets and release notes before everyone else.</p>
        <input
          id="interest-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "interest-email-error" : undefined}
          className="mt-3 h-12 w-full rounded-[7px] border border-white/16 bg-[#111318] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#145fe4] focus:ring-2 focus:ring-[#145fe4]/35"
        />
        {status === "error" && (
          <p id="interest-email-error" role="alert" className="mt-2 text-xs text-[#a9c8ff]">Please check your email address.</p>
        )}
      </div>
      <button type="submit" disabled={status === "loading"} className="pv-button pv-button-primary mt-4 w-full disabled:cursor-wait disabled:opacity-60">
        {status === "loading" ? "Sending..." : "Get early access"}
      </button>
      <p className="pv-mono mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-white/30">
        Local demo — nothing is sent or stored
      </p>
    </form>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-white/10 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:hidden">
        {question}
        <ChevronDown size={18} strokeWidth={1.7} className="shrink-0 text-white/45 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <p className="max-w-[62ch] pr-8 pt-4 text-sm leading-6 text-white/52">{answer}</p>
    </details>
  );
}

export function PlugviewLanding() {
  const [previewKind, setPreviewKind] = useState<PreviewKind>("hero");
  const [heroTheme, setHeroTheme] = useState<"dark" | "light">("dark");
  const [heroAlign, setHeroAlign] = useState<"left" | "center">("left");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const tablistRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const atlasY = useTransform(heroProgress, [0, 1], [0, -48]);
  const atlasRotate = useTransform(heroProgress, [0, 1], [0, -1.6]);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.82", "end 0.5"],
  });

  return (
    <div id="top" className="min-h-[100dvh] overflow-x-clip bg-[#1d1d21] text-white">
      <Nav />

      <main>
        <section ref={heroRef} className="relative overflow-hidden border-b border-white/10">
          <HeroScene />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
            style={{
              background:
                "linear-gradient(100deg, rgba(29,29,33,0.88) 0%, rgba(29,29,33,0.52) 30%, rgba(29,29,33,0.14) 55%, rgba(29,29,33,0.34) 100%)",
            }}
          />
          <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1440px] items-center gap-12 px-5 pb-14 pt-14 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-10 lg:pt-16 xl:gap-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: EASE }}
              className="max-w-[540px]"
            >
              <div className="pv-glass-chip">
                <LiquidMark size={30} />
                <p className="pv-eyebrow">PLUGVIEW / UI ASSET MARKET</p>
              </div>
              <h1 className="mt-7 max-w-[620px] text-[clamp(3.4rem,6.4vw,6.3rem)] font-light leading-[1.02] tracking-[-0.065em] text-white">
                See it live.
                <br />
                <span className="pv-liquid-text">Ship it now.</span>
              </h1>
              <p className="mt-7 max-w-[30rem] text-base leading-7 tracking-[-0.02em] text-white/57 sm:text-lg">
                Preview polished React UI live, then copy it straight into your product.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <PvMagnetic>
                  <Link href="#market" className="pv-button pv-button-primary">
                    Explore assets <ArrowRight size={16} strokeWidth={1.8} />
                  </Link>
                </PvMagnetic>
                <Link href="#make" className="pv-button pv-button-ghost">
                  Open Make Builder
                </Link>
              </div>
              <p className="pv-mono mt-7 text-[10px] uppercase tracking-[0.16em] text-white/38">
                Self-directed product build by Gyeongbin Bak
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 38 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.16, ease: EASE }}
              className="min-w-0 lg:-ml-10 lg:translate-y-5"
            >
              <motion.div
                style={reduce ? undefined : { y: atlasY, rotate: atlasRotate }}
              >
                <HeroPreviewStage>
                  <UiAtlas />
                </HeroPreviewStage>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section aria-label="Plugview capabilities" className="border-b border-white/10 bg-[#20242c]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
            {[
              { value: "Curated", label: "UI assets" },
              { value: "LIVE", label: "Live previews" },
              { value: "1-click", label: "One-click code" },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 py-6 sm:block sm:px-8 sm:py-8 first:sm:pl-0 last:sm:pr-0">
                <span className="text-2xl font-light tracking-[-0.05em] text-white sm:block sm:text-3xl">{item.value}</span>
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-white/38 sm:mt-2 sm:block">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <AssetTicker />

        <section id="market" className="scroll-mt-[72px] border-b border-white/10">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
            <Reveal>
              <h2 className="max-w-[820px] text-4xl font-light leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">
                Components should be seen
                <br />
                before they are coded.
              </h2>
              <p className="mt-6 max-w-[39rem] text-base leading-7 text-white/52">
                Open a result, change the state, and judge it in the real interface. Plugview shortens the path from idea to selection.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-5 lg:grid-cols-[1.22fr_0.78fr]">
              <Reveal delay={0.04}>
                <InteractivePreview>
                  <div className="relative min-h-[390px] overflow-hidden rounded-[16px] border border-white/12 bg-[#111318] sm:min-h-[520px]">
                    <ComponentField />
                    <p className="sr-only">Modular UI blocks rendered as floating glass sheets.</p>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 border-t border-white/12 bg-[#1d1d21]/85 p-5 backdrop-blur-md sm:p-7">
                      <div>
                        <p className="pv-mono text-[10px] uppercase tracking-[0.18em] text-[#a9c8ff]">Component studio</p>
                        <p className="mt-2 text-sm text-white/72">Compose one screen, then carry the system into the next.</p>
                      </div>
                      <Sparkles size={20} strokeWidth={1.4} className="shrink-0 text-[#4b8df4]" aria-hidden="true" />
                    </div>
                  </div>
                </InteractivePreview>
              </Reveal>
              <Reveal className="divide-y divide-white/10 border-y border-white/10" delay={0.12}>
                <FeatureRow icon={<Eye size={18} strokeWidth={1.5} />} title="Preview it live" text="Judge the finish through real interaction, not a static image." />
                <FeatureRow icon={<Layers3 size={18} strokeWidth={1.5} />} title="Choose only what you need" text="Find the block you need instead of browsing an entire page." />
                <FeatureRow icon={<Braces size={18} strokeWidth={1.5} />} title="Ship the original code" text="Copy once and keep the component&apos;s structure inside your project." />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#20242c]">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
            <Reveal>
              <h2 className="max-w-[850px] text-3xl font-light leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl">
                The interface starts
                <br />
                at the moment you choose.
              </h2>
              <div
                ref={tablistRef}
                className="mt-10 flex flex-wrap gap-2"
                role="tablist"
                aria-label="Choose an asset type"
                onKeyDown={(e) => {
                  const order = previewTabs.map((t) => t.kind);
                  const i = order.indexOf(previewKind);
                  let next = -1;
                  if (e.key === "ArrowRight") next = (i + 1) % order.length;
                  else if (e.key === "ArrowLeft")
                    next = (i - 1 + order.length) % order.length;
                  else if (e.key === "Home") next = 0;
                  else if (e.key === "End") next = order.length - 1;
                  if (next < 0) return;
                  e.preventDefault();
                  setPreviewKind(order[next]);
                  tablistRef.current
                    ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                    [next]?.focus();
                }}
              >
                {previewTabs.map((tab) => (
                  <button
                    key={tab.kind}
                    type="button"
                    role="tab"
                    id={`pv-tab-${tab.kind}`}
                    aria-selected={previewKind === tab.kind}
                    aria-controls="pv-stage"
                    tabIndex={previewKind === tab.kind ? 0 : -1}
                    onClick={() => setPreviewKind(tab.kind)}
                    className={`relative isolate min-h-11 overflow-hidden rounded-full border px-4 text-sm transition duration-200 active:scale-[0.98] ${previewKind === tab.kind ? "border-[#145fe4] text-white" : "border-white/14 bg-white/[0.04] text-white/52 backdrop-blur-md hover:border-white/30 hover:text-white"}`}
                  >
                    {previewKind === tab.kind && (
                      <motion.span
                        layoutId="preview-tab-indicator"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-[#145fe4]"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative">{tab.label}</span>
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <div
                role="tabpanel"
                id="pv-stage"
                aria-labelledby={`pv-tab-${previewKind}`}
              >
                <PreviewDeck
                  active={previewKind}
                  onSelect={setPreviewKind}
                  heroTheme={heroTheme}
                  heroAlign={heroAlign}
                  billing={billing}
                  onBilling={setBilling}
                />
              </div>
            </Reveal>

            {/* Make bench — tune the selected asset, take the code */}
            <div
              id="make"
              className="mt-14 grid scroll-mt-[72px] gap-5 lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="pv-glass rounded-[12px] p-6 sm:p-7">
                <p className="pv-eyebrow">MAKE — TUNE THE PICK</p>
                <div className="mt-5 flex flex-col gap-5">
                  {previewKind === "hero" && (
                    <>
                      <SegmentedControl
                        label="Theme"
                        options={[
                          { value: "dark", label: "Dark" },
                          { value: "light", label: "Light" },
                        ]}
                        value={heroTheme}
                        onChange={setHeroTheme}
                      />
                      <SegmentedControl
                        label="Alignment"
                        options={[
                          { value: "left", label: "Left" },
                          { value: "center", label: "Center" },
                        ]}
                        value={heroAlign}
                        onChange={setHeroAlign}
                      />
                    </>
                  )}
                  {previewKind === "pricing" && (
                    <SegmentedControl
                      label="Billing"
                      options={[
                        { value: "monthly", label: "Monthly" },
                        { value: "annual", label: "Annual" },
                      ]}
                      value={billing}
                      onChange={setBilling}
                    />
                  )}
                  {previewKind === "form" && (
                    <p className="text-xs leading-5 text-white/45">
                      No options needed — labels, focus rings and inline
                      validation are wired in. Try submitting it empty in
                      the preview above.
                    </p>
                  )}
                  <p className="pv-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                    Local demo — nothing is sent or stored
                  </p>
                </div>
              </div>
              <CodeBlock
                filename={
                  previewKind === "pricing"
                    ? "PricingCards.tsx"
                    : previewKind === "form"
                      ? "LoginForm.tsx"
                      : "HeroSection.tsx"
                }
                code={
                  previewKind === "pricing"
                    ? `import { PricingCards } from "@plugview/ui";\n\nexport default function Page() {\n  return <PricingCards billing="${billing}" />;\n}`
                    : previewKind === "form"
                      ? `import { LoginForm } from "@plugview/ui";\n\nexport default function Page() {\n  return <LoginForm onSubmit={signIn} />;\n}`
                      : `import { HeroSection } from "@plugview/ui";\n\nexport default function Page() {\n  return (\n    <HeroSection theme="${heroTheme}" align="${heroAlign}" />\n  );\n}`
                }
              />
            </div>
          </div>
        </section>



        <section id="how" className="scroll-mt-[72px] border-b border-white/10 bg-[#20242c]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-10">
            <Reveal>
              <h2 className="max-w-[460px] text-3xl font-light leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl">
                Three choices
                <br />
                to start the screen.
              </h2>
            </Reveal>
            <div ref={stepsRef} className="relative border-t border-white/10">
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-[22px] top-8 w-px bg-white/10 sm:left-[24px]"
              />
              {!reduce && (
                <motion.div
                  aria-hidden="true"
                  style={{ scaleY: stepsProgress }}
                  className="absolute bottom-8 left-[22px] top-8 w-px origin-top bg-[#2b70ed] sm:left-[24px]"
                />
              )}
              {[
                { icon: <Search size={18} strokeWidth={1.5} />, title: "Find", text: "Search for the UI you need by purpose and screen." },
                { icon: <Eye size={18} strokeWidth={1.5} />, title: "Preview", text: "Check every state and response in the live preview." },
                { icon: <Code2 size={18} strokeWidth={1.5} />, title: "Ship", text: "Copy the code into the product you are building now." },
              ].map((item, index) => (
                <Reveal key={item.title} delay={0.06 * index} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/10 py-6 sm:grid-cols-[56px_1fr] sm:gap-6 sm:py-8">
                  <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-[#20242c] text-[#70a7ff] sm:h-12 sm:w-12">{item.icon}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium tracking-[-0.03em] text-white">{item.title}</h3>
                      <span className="pv-mono text-[10px] text-white/25">0{index + 1}</span>
                    </div>
                    <p className="mt-2 max-w-[34rem] text-sm leading-6 text-white/52">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
            <Reveal>
              <h2 className="max-w-[510px] text-3xl font-light leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl">Frequently asked questions</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <FaqItem question="Who is Plugview for?" answer="It is an asset market for designers, developers, and small teams building products with React and Tailwind." />
              <FaqItem question="Can I preview an asset before I buy it?" answer="Yes. Every asset is presented as a live preview, so you can check its scale and key states before choosing." />
              <FaqItem question="How do I bring the code into my project?" answer="Copy the code you need from the asset detail view or Make Builder, then connect it to your current project." />
            </Reveal>
          </div>
        </section>

        <section id="contact" className="relative scroll-mt-[72px] overflow-hidden bg-[#20242c]">
          <div
            aria-hidden="true"
            className="pv-blob-mask pointer-events-none absolute inset-y-0 right-[-6%] hidden w-[58%] lg:block"
          >
            <LiquidCore />
          </div>
          <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10">
            <Reveal>
              <p className="pv-eyebrow">START WITH THE NEXT SCREEN</p>
              <h2 className="mt-6 max-w-[680px] text-4xl font-light leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">
                Start the next screen
                <br />
                with less friction.
              </h2>
              <p className="mt-6 max-w-[36rem] text-base leading-7 text-white/52">Get the latest Plugview assets and release notes in your inbox.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <InterestForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#1d1d21]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-9 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <LiquidMark size={32} />
            <div>
              <p className="text-sm font-medium text-white">Plugview</p>
              <p className="mt-1 text-xs text-white/36">Curated React UI asset market</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/42">
            <Link href="#market" className="transition hover:text-white">Asset Market</Link>
            <Link href="#make" className="transition hover:text-white">Make</Link>
            <Link href="#contact" className="transition hover:text-white">Contact</Link>
            <span>© 2025 Plugview</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
