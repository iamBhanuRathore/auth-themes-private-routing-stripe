/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["avatars.githubusercontent.com"],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"]
    }
};

module.exports = nextConfig;
