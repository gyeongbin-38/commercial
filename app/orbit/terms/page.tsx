import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The plain-language terms for using Orbit: trials, billing, cancellation and your data.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="September 2026">
      <p>
        Orbit is offered as a subscription with a 14-day free trial. Trials
        include every feature of the Studio plan and do not require a card.
        When the trial ends, you pick a plan or export your data and walk
        away.
      </p>
      <p>
        Subscriptions bill monthly or annually and can be cancelled at any
        time from the workspace settings. Cancellation keeps read-only
        access for 30 days.
      </p>
      <p>
        You own your client data. We ask only for the rights needed to run
        the service: storing it, showing it back to you and exporting it
        when you ask.
      </p>
      <p>
        Don&apos;t use Orbit for anything unlawful, to spam your leads, or
        to store data you have no right to hold. That&apos;s the deal.
      </p>
    </LegalPage>
  );
}
