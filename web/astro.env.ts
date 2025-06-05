import { envField } from "astro/config"

export const env = {
	schema: {
		FORMSPREE_ID: envField.string({
			context: "client",
			access: "public",
		}),
		REPOSITERY: envField.string({
			context: "client",
			access: "public",
		}),
		REPOSITERY_PAGE: envField.string({
			context: "client",
			access: "public",
		}),
		REPOSITERY_OWNER: envField.string({
			context: "server",
			access: "public",
		}),
	},
}
