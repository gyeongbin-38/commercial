import { WorkNavbar } from "@/components/work/navbar";
import { WorkScrollProgress } from "@/components/work/scroll-progress";
import { WorkSmoothScroll } from "@/components/work/smooth-scroll";
import { WorkHero } from "@/components/work/hero";
import { WorkMarquee } from "@/components/work/marquee";
import { WorkProjects } from "@/components/work/projects";
import { WorkTryIt } from "@/components/work/try-it";
import { WorkBento } from "@/components/work/bento";
import { WorkProcess } from "@/components/work/process";
import { WorkAbout } from "@/components/work/about";
import { WorkPackages } from "@/components/work/packages";
import { WorkFaq } from "@/components/work/faq";
import { WorkFooter } from "@/components/work/footer";
import { WORK_DELIVERABLES } from "@/lib/work-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gyeongbin Bak, Landing page studio",
  description:
    "One-person studio for conversion-focused landing pages: design and Next.js development in a single hand.",
  sameAs: ["https://github.com/gyeongbin-38/"],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkScrollProgress />
      <WorkSmoothScroll />
      <WorkNavbar />
      <main>
        <WorkHero />
        <WorkMarquee />
        <WorkProjects />
        <WorkTryIt />
        <WorkBento />
        <WorkAbout />
        <WorkPackages />
        <WorkMarquee
          items={WORK_DELIVERABLES}
          reverse
          label="Deliverables"
          className="border-t-0"
        />
        <WorkProcess />
        <WorkFaq />
      </main>
      <WorkFooter />
    </>
  );
}
