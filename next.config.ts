import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	images: {
		remotePatterns: [new URL("https://hhk2tpu9.a29.studio/**")],
	},
};

export default nextConfig;
