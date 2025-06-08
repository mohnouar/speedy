import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "192.168.41.26"
      }
    ]
  }
};

export default nextConfig;
