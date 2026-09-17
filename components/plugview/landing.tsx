"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1d1d21]/95 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10"
      >
        <Link href="#top" className="flex items-center gap-3" aria-label="Plugview home">
          <LogoMark small />
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
            className="border-t border-white/10 bg-[#1d1d21] px-5 pb-6 pt-4 lg:hidden"
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
    <InteractivePreview>
      <div className="pv-preview-window overflow-hidden rounded-[16px] border border-white/12 bg-[#111318] text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="flex h-11 items-center border-b border-white/10 bg-[#0d0f14] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-[7px] border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] font-mono text-white/35">
          <span className="text-[#145fe4]">https://</span>plugview.dev/preview
        </div>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {children}
      </div>
    </InteractivePreview>
  );
}

function HeroPreview() {
  return (
    <InteractivePreview>
      <div className="overflow-hidden rounded-[16px] border border-white/12 bg-[#111318] text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="relative aspect-[972/535] overflow-hidden bg-[#111318]">
          <Image
            src="/plugview/plugview-screen.png"
            alt="Plugview component studio screen"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="pv-scan-line pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[#4b8df4]/55" />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#111318] px-5 py-3.5 sm:px-6">
          <span className="pv-mono text-[9px] uppercase tracking-[0.16em] text-[#a9c8ff]">Plugview / Component Studio</span>
          <span className="flex items-center gap-2 text-[9px] font-mono text-white/42">
            <span className="pv-live-dot h-1.5 w-1.5 rounded-full bg-[#145fe4]" /> Actual screen preview
          </span>
        </div>
      </div>
    </InteractivePreview>
  );
}

function PricingPreview() {
  return (
    <PreviewChrome>
      <div className="min-h-[390px] bg-[#181b22] p-6 sm:p-10">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <div className="h-3 w-24 rounded bg-white/16" />
              <div className="mt-3 h-5 w-48 rounded bg-white/75" />
            </div>
            <span className="pv-mono text-[9px] text-[#70a7ff]">responsive</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Starter", "Pro", "Team"].map((item, index) => (
              <div
                key={item}
                className={`rounded-[10px] border p-4 ${index === 1 ? "border-[#145fe4] bg-[#145fe4]/12" : "border-white/10 bg-[#20242c]"}`}
              >
                <div className="h-2.5 w-14 rounded bg-white/55" />
                <div className="mt-3 text-[11px] font-medium text-white/72">{item}</div>
                <div className="mt-4 h-5 w-16 rounded bg-white/80" />
                <div className="mt-5 space-y-2">
                  <div className="h-2 w-full rounded bg-white/12" />
                  <div className="h-2 w-4/5 rounded bg-white/12" />
                  <div className="h-2 w-3/5 rounded bg-white/12" />
                </div>
                <div className={`mt-6 h-7 rounded-[5px] ${index === 1 ? "bg-[#145fe4]" : "bg-white/10"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewChrome>
  );
}

function FormPreview() {
  return (
    <PreviewChrome>
      <div className="flex min-h-[390px] items-center justify-center bg-[#181b22] p-6 sm:p-10">
        <div className="w-full max-w-[340px] rounded-[11px] border border-white/10 bg-[#20242c] p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-2">
            <LogoMark small />
            <div>
              <div className="h-2.5 w-20 rounded bg-white/65" />
              <div className="mt-2 h-2 w-12 rounded bg-white/16" />
            </div>
          </div>
          <div className="h-4 w-28 rounded bg-white/70" />
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 text-[10px] text-white/45">Email</div>
              <div className="h-10 rounded-[6px] border border-white/12 bg-white/[0.02]" />
            </div>
            <div>
              <div className="mb-2 text-[10px] text-white/45">Password</div>
              <div className="h-10 rounded-[6px] border border-white/12 bg-white/[0.02]" />
            </div>
          </div>
          <div className="mt-5 h-10 rounded-[6px] bg-[#145fe4]" />
          <div className="mt-5 h-2 w-32 rounded bg-white/12" />
        </div>
      </div>
    </PreviewChrome>
  );
}

function ComponentPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "pricing") return <PricingPreview />;
  if (kind === "form") return <FormPreview />;
  return <HeroPreview />;
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

function CodeBlock() {
  const [copied, setCopied] = useState(false);
  const code = `import { HeroSection } from "@plugview/ui";\n\nexport default function Page() {\n  return <HeroSection variant="dark" />;\n}`;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden rounded-[12px] border border-white/12 bg-[#111318] shadow-[0_22px_60px_rgba(0,0,0,0.26)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/46">
          <Code2 size={14} strokeWidth={1.7} />
          <span className="pv-mono">HeroSection.tsx</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="flex min-h-10 items-center gap-2 rounded-[7px] border border-white/12 px-3 text-xs text-white/60 transition hover:border-white/30 hover:text-white active:scale-[0.98]"
        >
          {copied ? <Check size={13} strokeWidth={1.8} /> : <Copy size={13} strokeWidth={1.8} />}
          {copied ? "Copied" : "Copy code"}
        </button>
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
        <h3 className="mt-5 text-xl font-medium text-white">You&apos;re on the list.</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">We&apos;ll send the next update to {email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[12px] border border-white/12 bg-white/[0.035] p-6 sm:p-8">
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
  const reduce = useReducedMotion();

  return (
    <div id="top" className="min-h-[100dvh] overflow-x-clip bg-[#1d1d21] text-white">
      <Nav />

      <main>
        <section className="relative border-b border-white/10">
          <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1440px] items-center gap-12 px-5 pb-14 pt-14 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-10 lg:pt-16 xl:gap-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: EASE }}
              className="max-w-[540px]"
            >
              <p className="pv-eyebrow">PLUGVIEW / UI ASSET MARKET</p>
              <h1 className="mt-7 max-w-[580px] text-[clamp(3.2rem,6vw,5.7rem)] font-light leading-[1.02] tracking-[-0.065em] text-white">
                See it live.
                <br />
                <span className="text-[#4b8df4]">Ship it now.</span>
              </h1>
              <p className="mt-7 max-w-[30rem] text-base leading-7 tracking-[-0.02em] text-white/57 sm:text-lg">
                Preview polished React UI live, then copy it straight into your product.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href="#market" className="pv-button pv-button-primary">
                  Explore assets <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
                <Link href="#make" className="pv-button pv-button-ghost">
                  Open Make Builder
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 38 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.16, ease: EASE }}
              className="min-w-0 lg:translate-y-5"
            >
              <HeroPreview />
            </motion.div>
          </div>
        </section>

        <section aria-label="Plugview capabilities" className="border-b border-white/10 bg-[#20242c]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
            {[
              { value: "141+", label: "Curated assets" },
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
              <Reveal className="relative min-h-[390px] overflow-hidden rounded-[16px] border border-white/12 bg-[#111318] sm:min-h-[520px]" delay={0.04}>
                <Image
                  src="/plugview/component-studio.png"
                  alt="Modular UI blocks arranged in a dark studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-[#1d1d21]/12" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 border-t border-white/12 bg-[#1d1d21]/85 p-5 backdrop-blur-md sm:p-7">
                  <div>
                    <p className="pv-mono text-[10px] uppercase tracking-[0.18em] text-[#a9c8ff]">Component studio</p>
                    <p className="mt-2 text-sm text-white/72">Compose one screen, then carry the system into the next.</p>
                  </div>
                  <Sparkles size={20} strokeWidth={1.4} className="shrink-0 text-[#4b8df4]" aria-hidden="true" />
                </div>
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
              <h2 className="max-w-[850px] text-4xl font-light leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">
                The interface starts
                <br />
                at the moment you choose.
              </h2>
              <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Choose an asset type">
                {previewTabs.map((tab) => (
                  <button
                    key={tab.kind}
                    type="button"
                    role="tab"
                    aria-selected={previewKind === tab.kind}
                    onClick={() => setPreviewKind(tab.kind)}
                    className={`relative isolate min-h-11 overflow-hidden rounded-full border px-4 text-sm transition duration-200 active:scale-[0.98] ${previewKind === tab.kind ? "border-[#145fe4] text-white" : "border-white/14 bg-transparent text-white/52 hover:border-white/30 hover:text-white"}`}
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
            <Reveal delay={0.08} className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewKind}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <ComponentPreview kind={previewKind} />
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </section>

        <section id="make" className="scroll-mt-[72px] border-b border-white/10">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <Reveal>
              <p className="pv-eyebrow">MAKE BUILDER</p>
              <h2 className="mt-6 max-w-[540px] text-4xl font-light leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">
                Turn a good choice
                <br />
                into the next build.
              </h2>
              <p className="mt-6 max-w-[30rem] text-base leading-7 text-white/52">
                Pick an asset, tune it to your brand in Make, and take the code into your project.
              </p>
              <Link href="#how" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#70a7ff] transition hover:text-white">
                See how it works <ArrowRight size={15} strokeWidth={1.7} />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <CodeBlock />
            </Reveal>
          </div>
        </section>

        <section id="how" className="scroll-mt-[72px] border-b border-white/10 bg-[#20242c]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-10">
            <Reveal>
              <h2 className="max-w-[460px] text-4xl font-light leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">
                Three choices
                <br />
                to start the screen.
              </h2>
            </Reveal>
            <div className="border-t border-white/10">
              {[
                { icon: <Search size={18} strokeWidth={1.5} />, title: "Find", text: "Search for the UI you need by purpose and screen." },
                { icon: <Eye size={18} strokeWidth={1.5} />, title: "Preview", text: "Check every state and response in the live preview." },
                { icon: <Code2 size={18} strokeWidth={1.5} />, title: "Ship", text: "Copy the code into the product you are building now." },
              ].map((item, index) => (
                <Reveal key={item.title} delay={0.06 * index} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/10 py-6 sm:grid-cols-[56px_1fr] sm:gap-6 sm:py-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 text-[#70a7ff] sm:h-12 sm:w-12">{item.icon}</span>
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
              <h2 className="max-w-[510px] text-4xl font-light leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">Frequently asked questions</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <FaqItem question="Who is Plugview for?" answer="It is an asset market for designers, developers, and small teams building products with React and Tailwind." />
              <FaqItem question="Can I preview an asset before I buy it?" answer="Yes. Every asset is presented as a live preview, so you can check its scale and key states before choosing." />
              <FaqItem question="How do I bring the code into my project?" answer="Copy the code you need from the asset detail view or Make Builder, then connect it to your current project." />
            </Reveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-[72px] bg-[#20242c]">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10">
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
            <LogoMark small />
            <div>
              <p className="text-sm font-medium text-white">Plugview</p>
              <p className="mt-1 text-xs text-white/36">Curated React UI asset market</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/42">
            <Link href="#market" className="transition hover:text-white">Asset Market</Link>
            <Link href="#make" className="transition hover:text-white">Make</Link>
            <Link href="#contact" className="transition hover:text-white">Contact</Link>
            <span>© 2026 Plugview</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
