import type { NextConfig } from "next"
import withPWA from "next-pwa"

const isDev = process.env.NODE_ENV === "development"

const nextConfig: NextConfig = {
  output: "export", // ✅ REQUIRED for static export

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ]
  },
}

export default withPWA({
  dest: "public",
  register: true,
  disable: isDev,
})(nextConfig)
