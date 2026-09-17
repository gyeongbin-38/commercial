import type { Metadata } from "next";
import { FsLegalPage } from "@/components/fieldstone/legal-page";

export const metadata: Metadata = {
  title: "Terms",
};

export default function FieldstoneTermsPage() {
  return (
    <FsLegalPage title="Terms of Use" updated="January 1, 2026">
      <p>
        These terms govern use of the Fieldstone Ventures website and
        participation in our founder programs.
      </p>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">Programs</h2>
        <p>
          Program descriptions on this site are summaries. Each accepted
          founder signs a program agreement that controls fees, equity
          or warrant terms and participation expectations.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">
          No investment advice
        </h2>
        <p>
          Content on this site is educational. Nothing here is an offer
          to sell securities or a solicitation to buy them, and nothing
          constitutes investment, legal or tax advice.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">
          Acceptable use
        </h2>
        <p>
          Do not misuse the site, attempt to access another
          applicant&apos;s data, or submit knowingly false application
          information.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">Changes</h2>
        <p>
          We may update these terms; material changes are announced on
          this page before they take effect.
        </p>
      </div>
      <p className="rounded-[var(--fs-r-md)] bg-[var(--fs-tint)] px-4 py-3 text-[0.8125rem]">
        Fieldstone Ventures is a fictional brand. This page is a
        design-demo document and carries no legal force.
      </p>
    </FsLegalPage>
  );
}
