import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Static export for traditional hosting
  output: 'export',

  // Trailing slashes for static hosting compatibility
  trailingSlash: true,

  images: {
    // For static export, we need to use unoptimized images
    // or configure a custom loader (Contentful already serves optimized images)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
