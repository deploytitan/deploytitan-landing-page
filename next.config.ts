import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Allow Sanity CDN images and our own domain
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'deploytitan.com' },
    ],
  },
  // Redirects are still handled in vercel.json at the edge for instant propagation.
}

export default nextConfig
