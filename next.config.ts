import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const SPRINGBOOT_URL = process.env.NEXT_PUBLIC_SPRINGBOOT_URL || "";
    const S3_URL = process.env.NEXT_PUBLIC_S3_URL || "";
    const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "";

    return [
      {
        source: "/api/:path*",
        destination: `${SPRINGBOOT_URL}/:path*`,
      },
      {
        source: "/s3/:path*",
        destination: `${S3_URL}/:path*`,
      },
      {
        source: "/ws/:path*",
        destination: `${WEBSOCKET_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
