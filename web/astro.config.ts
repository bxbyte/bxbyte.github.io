import mdx from "@astrojs/mdx"
import { transformerNotationDiff } from "@shikijs/transformers"

import compress from "astro-compress"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import remarkCaptions from "remark-captions"
import remarkMath from "remark-math"
import remarkMermaid from "remark-mermaidjs"
import remarkReferenceLinks from "remark-reference-links"
import remarkToc from "remark-toc"

import { env } from "./astro.env"
import pkg from "./package.json"
import composer from "./src/modules/composer"
import compute from "./src/modules/compute"
import html2pdf from "./src/modules/html2pdf"
import i18n from "./src/modules/i18n"
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
		remarkPlugins: [
			remarkMath,
			remarkMermaid,
			remarkReferenceLinks,
			remarkCaptions,
			[remarkToc, { heading: "contents" }],
			[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
		],
		rehypePlugins: [
			[
				rehypeKatex,
				{
					output: "mathml",
				},
			],
		],
	},
	integrations: [
		i18n,
		theme,
		seo,
		composer(),
		compute("_/"),
		icon(),
		mdx({
			optimize: true,
		}),
		await html2pdf(pkg.config),
		compress({ Image: false }),
	].filter(Boolean),
})
