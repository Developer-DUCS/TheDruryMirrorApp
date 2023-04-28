/** @type {import('next').NextConfig} */

const isProd = process.env.MY_ENVIRONMENT === "production";
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	//basePath: "/mirror",
	assetPrefix: isProd ? "https://mcs.drury.edu/mirror/" : undefined,
};

module.exports = nextConfig;
