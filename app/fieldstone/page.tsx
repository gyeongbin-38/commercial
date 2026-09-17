import { FsNavbar } from "@/components/fieldstone/navbar";
import { FsHero } from "@/components/fieldstone/hero";
import { FsStats } from "@/components/fieldstone/stats";
import { FsPrograms } from "@/components/fieldstone/programs";
import { FsPath } from "@/components/fieldstone/path";
import { FsStories } from "@/components/fieldstone/stories";
import { FsFaq } from "@/components/fieldstone/faq";
import { FsFinalCta } from "@/components/fieldstone/final-cta";
import { FsFooter } from "@/components/fieldstone/footer";
import { FS_FAQS } from "@/lib/fieldstone-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fieldstone Ventures",
    url: `${siteUrl}/fieldstone`,
    description:
      "A fictional entrepreneurial ecosystem that builds founders and drives economic growth. From first idea to first round and beyond.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FS_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function FieldstonePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FsNavbar />
      <main>
        <FsHero />
        <FsStats />
        <FsPrograms />
        <FsPath />
        <FsStories />
        <FsFaq />
        <FsFinalCta />
      </main>
      <FsFooter />
    </>
  );
}
