import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Orbit is a fictional client-operations product. This site is a commercial landing-page demo.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="tile flex-1 bg-canvas">
        <div className="mx-auto max-w-[680px] px-5">
          <h1 className="text-display-md font-semibold tracking-[-0.015em] text-ink md:text-display-lg">
            About Orbit
          </h1>
          <div className="mt-8 space-y-5 text-body text-ink-80">
            <p>
              Orbit is a fictional client-operations workspace for freelancers
              and small service businesses. This website is a commercial
              landing-page demo: the product, the people, the companies, the
              prices and every figure shown are illustrative.
            </p>
            <p>
              The premise is real, though. Small teams routinely manage leads,
              follow-ups, bookings and project status across a spreadsheet, an
              inbox, a chat app and a calendar, and the gaps between those
              tools are where clients quietly disappear. Orbit imagines what a
              workspace built only for that loop would feel like.
            </p>
            <p>
              The page itself is the product on display: a measured design
              system, a working pipeline demo, a validated lead form, and
              responsive, accessible markup throughout.
            </p>
            <p>
              <Link href="/#get-started" className="link">
                Try the demo request form
              </Link>{" "}
              or{" "}
              <Link href="/#demo" className="link">
                play with the pipeline
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
