import type { Metadata } from "next";
import { FsLegalPage } from "@/components/fieldstone/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function FieldstonePrivacyPage() {
  return (
    <FsLegalPage title="Privacy Policy" updated="January 1, 2026">
      <p>
        Fieldstone Ventures (&quot;we&quot;) processes personal
        information to run founder programs, mentor matching and
        capital-readiness advising. This page summarizes what we collect
        and why.
      </p>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">
          What we collect
        </h2>
        <p>
          Application details (name, contact information, company
          description), program participation records and mentor-session
          notes. Technical logs are generated automatically when you use
          the site.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">
          How we use it
        </h2>
        <p>
          To evaluate applications, operate cohorts, match mentors and
          report aggregate outcomes to our funding partners. We do not
          sell personal information.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">Retention</h2>
        <p>
          Application data is kept for the life of the program and three
          years afterward, unless law requires longer. Alumni records
          stay active while you remain in the Founder Community.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold">Your rights</h2>
        <p>
          You may request a copy, correction or deletion of your
          information at any time by contacting the programs team.
        </p>
      </div>
      <p className="rounded-[var(--fs-r-md)] bg-[var(--fs-tint)] px-4 py-3 text-[0.8125rem]">
        Fieldstone Ventures is a fictional brand. This page is a
        design-demo document and carries no legal force.
      </p>
    </FsLegalPage>
  );
}
