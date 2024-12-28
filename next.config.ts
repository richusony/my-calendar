import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
        port: '',
        pathname: '/jpg/07/52/67/23/360_F_752672349_aJ2NUPiRqZJSWKYKEYsluWBBlOpo0tWX.jpg',
        search: '',
      },
    ],
  },
};

export default nextConfig;
