import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Static media rarely changes; let browsers and the CDN keep it a week
    const cache = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" };
    return [
      { source: "/video/:path*", headers: [cache] },
      { source: "/img/:path*", headers: [cache] },
    ];
  },
  async redirects() {
    return [
      // Old contact page now lives at /kontakta_oss
      { source: "/kontakt", destination: "/kontakta_oss", permanent: true },
      // Dash-variants that have circulated in old links and menus
      { source: "/hitta-butik", destination: "/hitta_butik", permanent: true },
      { source: "/bestall-online", destination: "/bestall_online", permanent: true },
      { source: "/kontakta-oss", destination: "/kontakta_oss", permanent: true },
      { source: "/om-oss", destination: "/om_oss", permanent: true },
    ];
  },
};

export default nextConfig;
