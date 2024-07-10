/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            // Apply these headers to all routes in your application.
            source: '/:path*',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: '*' }, // Replace '*' with your specific origin if needed
              { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
              { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
            ],
          },
        ];
      },
};

export default nextConfig;
