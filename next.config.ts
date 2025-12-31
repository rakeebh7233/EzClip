import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: '*', protocol: 'https', port: '', pathname: '/**' },
    ]
  }
};

export default nextConfig;
