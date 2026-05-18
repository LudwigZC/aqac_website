/** @type {import('next').NextConfig} */

const repo = "aqac_website";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
