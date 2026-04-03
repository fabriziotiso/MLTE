import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // Google Drive direct image links
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc**',
      },
      // lh3.googleusercontent.com (Google Drive CDN)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Unsplash (placeholder images during development)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true, // Google Drive URLs don't support Next.js image optimization
  },
}

export default nextConfig
