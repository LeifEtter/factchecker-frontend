/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "d1mtefwdakcrcg.cloudfront.net" },
      {
        protocol: "https",
        hostname: "factchecker-images.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
