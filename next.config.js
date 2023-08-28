/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "factchecker-images.s3.eu-central-1.amazonaws.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
