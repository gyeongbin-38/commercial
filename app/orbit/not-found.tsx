import Link from "next/link";
import { OrbitWordmark } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-center bg-canvas px-5 text-center">
      <OrbitWordmark />
      <h1 className="text-display-md mt-8 text-ink">
        This page drifted out of orbit.
      </h1>
      <p className="text-body mt-3 max-w-[420px] text-ink-80">
        The page you&apos;re looking for doesn&apos;t exist, but your
        clients are still waiting back home.
      </p>
      <Link href="/orbit" className="btn btn-primary mt-8">
        Back to Orbit
      </Link>
    </div>
  );
}
