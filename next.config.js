/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "factchecker-images.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "ec2-18-153-69-44.eu-central-1.compute.amazonaws.com",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
