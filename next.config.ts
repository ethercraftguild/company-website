import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
    ? { output: "export" }
    : {}),
};

export default nextConfig;
