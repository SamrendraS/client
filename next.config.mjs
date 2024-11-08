/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/devcon',
        destination: 'https://bit.ly/4flfFVg',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
