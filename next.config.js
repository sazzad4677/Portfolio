/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [],
        unoptimized: false,
    },
    poweredByHeader: false,
};

module.exports = nextConfig;
