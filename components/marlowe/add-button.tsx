"use client";

import { Check, Plus } from "lucide-react";

export function MarAddButton({
  label,
  dark = false,
  added,
  onToggle,
}: {
  label: string;
  dark?: boolean;
  added: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={added}
      className={`mar-btn min-h-10 px-5 ${
        dark ? "mar-btn-dark" : "mar-btn-volt"
      }`}
    >
      {added ? (
        <>
          <Check size={14} aria-hidden="true" /> Added
        </>
      ) : (
        <>
          <Plus size={14} aria-hidden="true" /> {label}
        </>
      )}
    </button>
  );
}
