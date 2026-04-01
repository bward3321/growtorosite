import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ai-lead-generation", destination: "/#stations", permanent: true },
      { source: "/ai-agents", destination: "/#stations", permanent: true },
      { source: "/ai-voice", destination: "/#stations", permanent: true },
      { source: "/customers", destination: "/#missions", permanent: true },
      { source: "/case-study-abm-international", destination: "/#missions", permanent: true },
      { source: "/privacy", destination: "/", permanent: true },
      { source: "/home-v2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
