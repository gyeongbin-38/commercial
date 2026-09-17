"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Card thumbnail: static screenshot at rest; on hover the recorded
   scroll-through fades in and plays. Tap/click goes to the live site. */
export function WorkThumb({
  name,
  href,
  lang,
  screenshot,
  video,
}: {
  name: string;
  href: string;
  lang: string;
  screenshot: string;
  video: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  const start = () => {
    if (reduce) return;
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };
  const stop = () => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <a
      href={href}
      className="relative block"
      target="_blank"
      rel="noopener"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <img
        src={screenshot}
        alt={`${name}: live site hero`}
        className="wk-thumb"
        loading="lazy"
      />
      {video ? (
        <video
          ref={videoRef}
          className="wk-thumb-video"
          style={{ opacity: playing ? 1 : 0 }}
          muted
          loop
          playsInline
          preload="none"
          src={video}
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}
      <span className="absolute right-4 top-4 rounded-[var(--wk-r-sm)] border border-black/15 bg-white/85 px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-black/70">
        {lang}
      </span>
    </a>
  );
}
