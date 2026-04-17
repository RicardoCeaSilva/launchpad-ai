import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Needed for raw body access in Stripe webhook
  experimental: {},
};

export default nextConfig;
