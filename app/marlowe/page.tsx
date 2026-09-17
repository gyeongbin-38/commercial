import { MarLapProgress } from "@/components/marlowe/lap-progress";
import { MarNavbar } from "@/components/marlowe/navbar";
import { MarHero } from "@/components/marlowe/hero";
import { MarMarquee } from "@/components/marlowe/marquee";
import { MarResults } from "@/components/marlowe/results";
import { MarStats } from "@/components/marlowe/stats";
import { MarDrop } from "@/components/marlowe/drop";
import { MarMedia } from "@/components/marlowe/media";
import { MarQuote } from "@/components/marlowe/quote";
import { MarNewsletter } from "@/components/marlowe/newsletter";
import { MarFooter } from "@/components/marlowe/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "Marlowe Racing",
  url: `${siteUrl}/marlowe`,
  description:
    "A fictional Grand Prix racing brand. Demo page for design purposes.",
  member: {
    "@type": "Person",
    name: "Jett Marlowe",
    jobTitle: "Driver",
    description: "Fictional driver of the #71 car.",
  },
};

export default function MarlowePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <MarLapProgress />
      <div className="mar-grain" aria-hidden="true" />
      <MarNavbar />
      <main>
        <MarHero />
        <MarMarquee />
        <MarResults />
        <MarStats />
        <MarDrop />
        <MarMedia />
        <MarQuote />
        <MarNewsletter />
      </main>
      <MarFooter />
    </>
  );
}
