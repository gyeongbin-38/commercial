export function FsHero() {
  return (
    <section id="top" className="overflow-hidden bg-white">
      <div className="fs-container grid items-center gap-14 pb-16 pt-12 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:pb-24 min-[900px]:pt-16">
        <div className="fs-fade-in">
          <p className="fs-eyebrow">An entrepreneurial ecosystem</p>
          <h1 className="fs-display mt-5">
            Where ideas
            <br />
            become companies.
          </h1>
          <p className="fs-lead mt-6 max-w-[28rem]">
            Programs, mentors and capital access for people building
            businesses in our region.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#apply" className="fs-btn fs-btn-accent">
              Start your application
            </a>
            <a href="#programs" className="fs-btn fs-btn-ghost">
              Explore programs
            </a>
          </div>
        </div>

        <div
          className="fs-fade-in relative"
          style={{ animationDelay: "140ms" }}
        >
          <div className="overflow-hidden rounded-[var(--fs-r-lg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/id/48/960/1120"
              alt="A founder's laptop on the shared workbench at Fieldstone Hall"
              width={960}
              height={1120}
              className="aspect-[6/7] w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="fs-card absolute -bottom-6 -left-4 px-6 py-5 min-[640px]:-left-10">
            <p className="fs-stat-num text-[2rem] min-[640px]:text-[2.4rem]">
              $36M
            </p>
            <p className="mt-1 text-[0.8125rem] font-medium text-[var(--fs-muted)]">
              raised by member companies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
