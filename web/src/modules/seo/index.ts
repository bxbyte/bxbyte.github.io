import sitemap from "@astrojs/sitemap"

import type { AstroIntegration } from "astro"
import robotsTxt from "astro-robots-txt"

/**
 * Define seo related content
 */
export default {
	name: "seo",
	hooks: {
		async "astro:config:setup"({ updateConfig }) {
			updateConfig({
				integrations: [robotsTxt(), sitemap()],
			})
		},
	},
} as AstroIntegration
