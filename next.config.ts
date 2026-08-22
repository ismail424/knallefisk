import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
