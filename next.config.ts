import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:54321",
    "http://localhost:3000",
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? [process.env.NEXT_PUBLIC_SITE_URL]
      : []),
  ],
};

export default nextConfig;
