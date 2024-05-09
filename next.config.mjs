/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_API_URL: process.env.API_URL,
		NEXT_PUBLIC_WEBSOCKET_URL: process.env.WEBSOCKET_URL,
	},

	webpack: config => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "graphql-tag/loader",
				},
			],
		})

		return config
	},
}

export default nextConfig
