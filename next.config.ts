import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Required for static export — no runtime image optimization
    unoptimized: true,
  },
  // Note: `redirects` does not run with `output: 'export'`.
  // All redirects are handled in vercel.json at the edge.
}

export default nextConfig
