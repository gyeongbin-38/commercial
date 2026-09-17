import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Orbit protects client data: encryption, access controls and disclosure contact.",
};

export default function SecurityPage() {
  return (
    <LegalPage title="Security" updated="September 2026">
      <p>
        All traffic runs over TLS. Client records are encrypted at rest and
        workspace data is scoped per account, so one workspace can never
        see another.
      </p>
      <p>
        Access inside a workspace follows roles: owners manage billing and
        seats, members work the queue. Every seat uses individual sign-in.
        there are no shared passwords.
      </p>
      <p>
        Backups run daily and exports are always available, so your data is
        never held hostage, by us or by an outage.
      </p>
      <p>
        Found a vulnerability? Please disclose it responsibly via the{" "}
        <Link href="/#get-started" className="link">contact form</Link> before
        publishing.
      </p>
    </LegalPage>
  );
}
