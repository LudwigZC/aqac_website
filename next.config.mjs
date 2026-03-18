/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;