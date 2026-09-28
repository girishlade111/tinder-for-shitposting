/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tinder-for-shitposting',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig