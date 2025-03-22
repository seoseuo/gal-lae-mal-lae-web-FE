import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        destination: `${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/:path*`,
        source: '/api/:path*',
      },
      {
        destination: `${process.env.NEXT_PUBLIC_S3_URL}/:path*`,
        source: '/s3/:path*',
      },
      {
        destination: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/:path*`,
        source: '/ws/:path*',
      }
    ];
  },
};

export default nextConfig;
