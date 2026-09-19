import { STUDIO, WORK_PROJECTS } from "@/lib/work-data";
import { Reveal } from "@/components/ui/reveal";
import { LocalTime } from "./localtime";
import { CopyEmail } from "./copy-email";

export function WorkFooter() {
  return (
    <footer className="wk-dark-section overflow-hidden">
      <div className="wk-container relative py-16 min-[900px]:py-24">
        {/* Static thumbnails behind the CTA, desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-0 hidden w-[420px] lg:block"
        >
          {[
            { p: WORK_PROJECTS[0], x: "left-6", y: "top-0", w: 200, r: "-5deg" },
            { p: WORK_PROJECTS[3], x: "right-0", y: "top-24", w: 170, r: "4deg" },
            { p: WORK_PROJECTS[1], x: "left-24", y: "top-52", w: 150, r: "-3deg" },
          ].map(({ p, x, y, w, r }) => (
            <div
              key={p.id}
              className={`absolute ${x} ${y} overflow-hidden rounded-[var(--wk-r-sm)] border border-white/15 opacity-40`}
              style={{ width: w, rotate: r }}
            >
              <img
                src={p.screenshot}
                alt=""
                className="block w-full object-cover object-top"
                style={{ aspectRatio: "8 / 5" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col items-start gap-8">
          <h2 className="wk-h2 max-w-[18ch] text-[var(--wk-bg)]">
            Tell me what the page needs to do.
          </h2>
          <p className="max-w-[30rem] text-[1rem] leading-relaxed text-[var(--wk-dark-muted)]">
            Send a two-line brief: product, audience, goal, and get a fixed
            quote and a start date back within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${STUDIO.email}?subject=${encodeURIComponent(
                "Landing page project"
              )}`}
              className="wk-btn wk-btn-dark"
            >
              {STUDIO.email}
            </a>
            <CopyEmail />
            <a
              href="#work"
              className="wk-btn border border-[var(--wk-dark-line)] text-[var(--wk-bg)] transition-colors hover:border-[var(--wk-bg)]"
            >
              Revisit the work
            </a>
            <a
              href="https://github.com/gyeongbin-38/"
              target="_blank"
              rel="noopener"
              className="wk-btn border border-[var(--wk-dark-line)] text-[var(--wk-bg)] transition-colors hover:border-[var(--wk-bg)]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--wk-dark-line)] pt-8 text-[0.8125rem] text-[var(--wk-dark-muted)] min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between">
          <p>
            © {new Date().getFullYear()} {STUDIO.name}. Design and code, one
            pair of hands.
          </p>
          <p>
            <LocalTime />
          </p>
          <p>
            Four concept projects plus one live product build, all
            self-directed.
          </p>
        </div>
      </div>
    </footer>
  );
}
