/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external placeholder images during development
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
