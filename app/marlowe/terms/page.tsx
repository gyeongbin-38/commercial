import type { Metadata } from "next";
import { MarLegalPage } from "@/components/marlowe/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function MarloweTermsPage() {
  return (
    <MarLegalPage title="Terms of Service" updated="January 1, 2026">
      <p>
        These terms govern use of the Marlowe website and purchases from the
        Marlowe store, operated by the fictional Marlowe Racing Ltd.
      </p>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          1. Orders
        </h2>
        <p>
          Product listings show the final price. An order is confirmed when
          we email a shipping confirmation. Drop items may be limited and
          can sell out between cart and checkout.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          2. Returns
        </h2>
        <p>
          Unworn items can be returned within 30 days of delivery. Sale and
          limited-drop items are final sale unless faulty.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          3. Content
        </h2>
        <p>
          Race results, imagery and video titles on this site are fictional
          and illustrative. Nothing here refers to a real championship,
          driver or event.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1rem] font-extrabold uppercase tracking-[0.08em] text-[var(--mar-text)]">
          4. Liability
        </h2>
        <p>
          The site is provided as is. To the extent permitted by law, we are
          not liable for indirect losses arising from use of the site.
        </p>
      </div>
      <p className="rounded-[var(--mar-r-sm)] bg-[var(--mar-card-flat)] px-4 py-3 text-[0.8125rem] font-bold">
        This is a design demo document for a fictional brand. It has no
        legal effect.
      </p>
    </MarLegalPage>
  );
}
