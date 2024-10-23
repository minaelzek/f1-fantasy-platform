/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  basePath: '/f1-fantasy-platform',
  assetPrefix: '/f1-fantasy-platform/',
};

module.exports = nextConfig;
