import type { Metadata } from "next";
import { MarLegalPage } from "@/components/marlowe/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function MarlowePrivacyPage() {
  return (
    <MarLegalPage title="Privacy Policy" updated="January 1, 2026">
      <p>
        Marlowe Racing Ltd. (&quot;we&quot;) processes personal data to run
        the Marlowe store, the 71 Club newsletter and this website.
      </p>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          1. What we collect
        </h2>
        <p>
          Email address for the newsletter; name, address and payment
          details for orders; device and usage data collected automatically
          when you browse the site.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          2. How we use it
        </h2>
        <p>
          To fulfil orders, send the emails you signed up for, prevent fraud,
          answer support requests and improve the site. We do not sell
          personal data.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          3. Retention
        </h2>
        <p>
          Order records are kept for the period required by tax and commerce
          law. Newsletter data is kept until you unsubscribe.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          4. Your rights
        </h2>
        <p>
          You can access, correct or delete your data, and withdraw consent
          for emails at any time via the unsubscribe link or by contacting
          support.
        </p>
      </div>
      <p className="rounded-[var(--mar-r-sm)] bg-[var(--mar-card-flat)] px-4 py-3 text-[0.8125rem] font-bold">
        This is a design demo document for a fictional brand. It has no
        legal effect.
      </p>
    </MarLegalPage>
  );
}
