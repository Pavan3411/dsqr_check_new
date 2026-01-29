/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dsqr.b-cdn.net",
        pathname: "/**", // allow all Bunny CDN paths
      },
        {
        protocol: "https",
        hostname: "dsqrstudio.b-cdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
