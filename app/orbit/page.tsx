import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Audience } from "@/components/marketing/audience";
import { Problem } from "@/components/marketing/problem";
import { FeatureQueue } from "@/components/marketing/feature-queue";
import { FeatureTimeline } from "@/components/marketing/feature-timeline";
import { FeaturePair } from "@/components/marketing/feature-pair";
import { PipelineDemo } from "@/components/marketing/pipeline-demo";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";
import { LeadForm } from "@/components/marketing/lead-form";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";
import { FAQS } from "@/lib/demo-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Orbit",
    url: `${siteUrl}/orbit`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Manage leads, follow-ups, bookings and client work from one simple workspace.",
    offers: [
      { "@type": "Offer", name: "Solo", price: "12", priceCurrency: "USD" },
      { "@type": "Offer", name: "Studio", price: "29", priceCurrency: "USD" },
      { "@type": "Offer", name: "Team", price: "59", priceCurrency: "USD" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function OrbitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="flex-1">
        {/* Tile rhythm per DESIGN.md §7 */}
        <Hero />
        <Audience />
        <Problem />
        <FeatureQueue />
        <FeatureTimeline />
        <FeaturePair />
        <PipelineDemo />
        <HowItWorks />
        <Pricing />
        <Faq />
        <LeadForm />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
