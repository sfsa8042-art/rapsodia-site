import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Явный корень Turbopack: глушит предупреждение о лишних lockfile
  // выше по дереву при локальной сборке; на Vercel не влияет.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
