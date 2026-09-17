import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Orbit handles your data: client information, exports and what happens when you cancel.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="September 2026">
      <p>
        Orbit stores only what the product needs to work: your account
        details, your client records and the follow-up queue built from
        them. We do not sell data, run ads, or read your client messages.
      </p>
      <p>
        Client data belongs to you. Everything in a workspace can be
        exported as CSV at any time, during the trial, while subscribed,
        and for 30 days after cancellation.
      </p>
      <p>
        Analytics on this site are limited to aggregate page metrics. There
        are no advertising trackers and no cross-site identifiers.
      </p>
      <p>
        Questions about privacy? Reach us through the{" "}
        <Link href="/#get-started" className="link">request form</Link>.
      </p>
    </LegalPage>
  );
}
