import mdx from "@astrojs/mdx"
import { transformerNotationDiff } from "@shikijs/transformers"

import compress from "astro-compress"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

import { env } from "./astro.env"
import pkg from "./package.json"
import composer from "./src/modules/composer"
import compute from "./src/modules/compute"
import html2pdf from "./src/modules/html2pdf"
import i18n, { remarki18n } from "./src/modules/i18n"
import seo from "./src/modules/seo"
import theme from "./src/modules/theme"

export default defineConfig({
	env,
	site: process.env.REPOSITERY_PAGE,
	experimental: { contentIntellisense: true },
	output: "static",
	scopedStyleStrategy: "class",
	build: { assets: "_", concurrency: 2 },
	image: {
		domains: ["astro.build"],
	},
	vite: {
		optimizeDeps: {
			noDiscovery: true,
			include: undefined,
		},
		build: {
			assetsInlineLimit: 128,
			assetsDir: "_",
		},
	},
	markdown: {
		shikiConfig: {
			transformers: [transformerNotationDiff() as any],
		},
	},
	integrations: [
		i18n,
		theme,
		seo,
		composer(),
		compute("_/"),
		icon(),
		mdx({
			remarkPlugins: [remarkMath],
			rehypePlugins: [
				[
					rehypeKatex,
					{
						output: "mathml",
					},
				],
			],
		}),
		await html2pdf(pkg.config),
		compress({ Image: false }),
	].filter(Boolean),
})
