import {
  CalendarDays,
  CircleDollarSign,
  Inbox,
  Mail,
  Phone,
  StickyNote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Shared chrome for the Orbit product mocks (the "app-ui" component in
 * DESIGN.md). One shadow, hairline borders, parchment sidebar, caption/
 * body interior type. Status hues are functional only.
 */

export function AppWindow({
  title = "Orbit",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`app-window ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-hairline bg-pearl px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-chip" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-chip" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-chip" aria-hidden="true" />
        <span className="text-caption mx-auto text-ink-48">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function Sidebar({
  items,
  active,
  className = "",
}: {
  items: { label: string; icon: LucideIcon; badge?: number }[];
  active: string;
  className?: string;
}) {
  return (
    <aside
      className={`hidden w-44 shrink-0 border-r border-hairline bg-parchment p-3 sm:block ${className}`}
    >
      <p className="text-fine px-2 pb-2 font-semibold text-ink-48 uppercase tracking-wide">
        Studio
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li
            key={item.label}
            className={`flex items-center gap-2 rounded-sm px-2 py-1.5 text-caption ${
              item.label === active
                ? "bg-canvas font-semibold text-ink shadow-none ring-1 ring-hairline"
                : "text-ink-80"
            }`}
          >
            <item.icon size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge != null && (
              <span className="tnum rounded-full bg-action px-1.5 text-[10px] leading-4 font-semibold text-on-dark">
                {item.badge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function Avatar({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pearl text-[11px] font-semibold text-ink ring-1 ring-hairline ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

const KIND_ICONS: Record<string, LucideIcon> = {
  email: Mail,
  call: Phone,
  meeting: CalendarDays,
  invoice: CircleDollarSign,
  note: StickyNote,
  inbox: Inbox,
  mail: Mail,
  calendar: CalendarDays,
  dollar: CircleDollarSign,
};

export function KindIcon({
  kind,
  size = 14,
  className = "",
}: {
  kind: string;
  size?: number;
  className?: string;
}) {
  const Icon = KIND_ICONS[kind] ?? StickyNote;
  return (
    <Icon size={size} strokeWidth={1.75} aria-hidden="true" className={className} />
  );
}

export function StatusChip({
  tone,
  children,
}: {
  tone: "neutral" | "warn" | "ok";
  children: React.ReactNode;
}) {
  const styles =
    tone === "warn"
      ? "border-transparent bg-[#fdf0e4] text-state-warn"
      : tone === "ok"
        ? "border-transparent bg-[#e7f6ef] text-state-ok"
        : "";
  return <span className={`chip ${styles}`}>{children}</span>;
}
