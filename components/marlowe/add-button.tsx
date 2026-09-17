"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";

export function MarAddButton({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={() => {
        setAdded(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1600);
      }}
      aria-live="polite"
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
