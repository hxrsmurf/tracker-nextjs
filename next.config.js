/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.scdn.co',
      'seeded-session-images.scdn.co',
      'mosaic.scdn.co'
    ]
  }
}

module.exports = nextConfig
