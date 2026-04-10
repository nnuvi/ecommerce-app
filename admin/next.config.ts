import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",          // usually empty
        pathname: "/**",   // allow all paths from this domain
      },
    ],
  },
};

export default nextConfig;
