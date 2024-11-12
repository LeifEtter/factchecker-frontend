/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "d1mtefwdakcrcg.cloudfront.net" },
    ],
  },
};

module.exports = nextConfig;
