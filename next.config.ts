import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Multiple root layouts ((orbit), moapoint, fieldstone): a global
    // 404 page must be provided at the routing level instead of inside
    // a root layout.
    globalNotFound: true,
  },
};

export default nextConfig;
