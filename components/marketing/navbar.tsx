"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { OrbitWordmark } from "@/components/ui/logo";
import { SignInDialog } from "./signin-dialog";

const NAV_LINKS = [
  { label: "Product", href: "/orbit#product" },
  { label: "Solutions", href: "/orbit#solutions" },
  { label: "Pricing", href: "/orbit#pricing" },
  { label: "Resources", href: "/orbit#faq" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav
          aria-label="Global"
          className="flex h-11 items-center bg-void px-5 text-nav text-on-dark"
        >
          <Link
            href="/orbit#top"
            className="flex items-center gap-2"
            aria-label="Orbit home"
          >
            <OrbitWordmark onDark />
          </Link>

          {/* Desktop links */}
          <div className="mx-auto hidden items-center gap-8 nav:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-dark transition-colors hover:text-on-dark"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4 nav:ml-0">
            <button
              type="button"
              onClick={() => setSignInOpen(true)}
              className="hidden text-muted-dark transition-colors hover:text-on-dark nav:inline"
            >
              Sign in
            </button>
            <Link
              href="/orbit#get-started"
              className="btn hidden h-8 px-4 text-[13px] btn-primary nav:inline-flex"
            >
              Request access
            </Link>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-sm text-on-dark nav:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.75} />
              ) : (
                <Menu size={20} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile overlay menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 top-11 z-40 flex flex-col bg-void px-6 pt-10 nav:hidden"
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-7">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-lead-airy inline-block text-[26px] text-on-dark"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setSignInOpen(true);
                  }}
                  className="text-left text-body text-muted-dark"
                >
                  Sign in
                </button>
                <Link
                  href="/orbit#get-started"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Request access
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SignInDialog open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
