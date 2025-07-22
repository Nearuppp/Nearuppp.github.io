/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages deployment
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Use basePath for GitHub Pages deployment (will be set via environment variable)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add trailing slashes to improve compatibility with static hosting
  trailingSlash: true,
  // Disable server-side features that don't work with static export
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
