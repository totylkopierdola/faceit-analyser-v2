/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow image hostname
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
