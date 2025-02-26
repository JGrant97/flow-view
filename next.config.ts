import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@mdxeditor/editor'],
  reactStrictMode: true,
};

export default nextConfig;
