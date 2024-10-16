import pkg from '@next/bundle-analyzer';
const withBundleAnalyzer = pkg({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },  
  async headers() {
        return [
            {
                // matching all API routes
                source: "/dashboard/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Connection" },
                ]
            }
        ]
    }
};

export default withBundleAnalyzer(nextConfig);