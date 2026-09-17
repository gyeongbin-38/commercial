import { MoaNavbar } from "@/components/moapoint/navbar";
import { MoaHero } from "@/components/moapoint/hero";
import { MoaStats } from "@/components/moapoint/stats";
import { MoaEarn } from "@/components/moapoint/earn";
import { MoaPartners } from "@/components/moapoint/partners";
import { MoaUsePoints } from "@/components/moapoint/use-points";
import { MoaSteps } from "@/components/moapoint/steps";
import { MoaFaq } from "@/components/moapoint/faq";
import { MoaFinalCta } from "@/components/moapoint/final-cta";
import { MoaFooter } from "@/components/moapoint/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "모아포인트 MOA POINT",
  description:
    "하나로 모으는 통합 멤버십. 모아 제휴 브랜드와 전국 12만 매장에서 적립하고 1포인트부터 사용하세요.",
  parentOrganization: {
    "@type": "Organization",
    name: "모아멤버스 주식회사",
  },
};

export default function MoaPointPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MoaNavbar />
      <main>
        <MoaHero />
        <MoaStats />
        <MoaEarn />
        <MoaPartners />
        <MoaUsePoints />
        <MoaSteps />
        <MoaFaq />
        <MoaFinalCta />
      </main>
      <MoaFooter />
    </>
  );
}
