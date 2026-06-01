/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [],
        unoptimized: false,
        qualities: [75, 85],
    },
    poweredByHeader: false,
    allowedDevOrigins: ['eggs-poison-figures-pro.trycloudflare.com'],
};

module.exports = nextConfig;
