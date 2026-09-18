import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Multiple root layouts ((home), orbit, plugview, moapoint, ...): a
    // global 404 page must be provided at the routing level instead of
    // inside a root layout.
    globalNotFound: true,
  },
  async redirects() {
    return [
      // The portfolio hub moved from /work to /
      { source: "/work", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
