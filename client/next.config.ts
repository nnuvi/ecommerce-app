import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LOGGER_SERVICE: "client",
  },
  images: {
    remotePatterns: [
      // Pexels
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },

      // Clerk
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
        pathname: "/**",
      },

      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  logging: {
    browserToTerminal: true,
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
    serverFunctions: true,
    incomingRequests: true,
  },
};

export default nextConfig;
