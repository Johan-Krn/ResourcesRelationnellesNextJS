/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "localhost",
				protocol: "http" || "https",
			},
			{
				hostname: "ui-avatars.com",
				protocol: "https",
			},
			{
				hostname: "cdn.pixabay.com",
				protocol: "https",
			},
		],
	},
};

module.exports = nextConfig;
