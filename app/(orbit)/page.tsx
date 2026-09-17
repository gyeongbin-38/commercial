import { PlugviewLanding } from "@/components/plugview/landing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Plugview",
  url: siteUrl,
  description:
    "A live React UI asset market for choosing, customizing, and shipping polished interface blocks.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PlugviewLanding />
    </>
  );
}
