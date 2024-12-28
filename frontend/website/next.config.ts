import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async redirects() {
		return [
			{
				source: "/", // The source path (root)
				destination: "/dashboard", // The target path
				permanent: true, // Set to `true` for a permanent redirect (301), or `false` for a temporary redirect (302)
			},
		];
	},
};

export default nextConfig;
