/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejwrxkgefiuhiyacpihz.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
