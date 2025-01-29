import pkg from './package.json'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { transformerNotationDiff } from '@shikijs/transformers'

import type { AstroUserConfig } from 'astro'
import compress from 'astro-compress'
import compressor from 'astro-compressor'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, envField } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { SassString } from 'sass-embedded'

import assets from './src/integrations/assets'
import html2pdf from './src/integrations/html2pdf'
import { localesConfig } from './src/libs/i18n/config'

const pseudoConfig = {
	experimental: { contentIntellisense: true },
	output: 'static',
	scopedStyleStrategy: 'class',
	build: { assets: '_', concurrency: 2 },
	image: {
		domains: ['astro.build'],
	},
	i18n: localesConfig,
	vite: {
		optimizeDeps: {
			noDiscovery: true,
			include: undefined,
		},
		build: {
			assetsInlineLimit: 128,
			assetsDir: '_',
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: "@use '@/styles/theme/theme.scss';",
					functions: {
						'svg($svg)': function ([svg]: [SassString]) {
							return new SassString(
								`data:image/svg+xml;base64,${Buffer.from(
									svg.asList
										.map((v) => v.toString().replace(/^\s*["']|["']\s*$/gm, ''))
										.join(''),
								).toString('base64')}`,
							)
						},
					},
				},
			},
		},
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'dark-plus',
			},
			defaultColor: false,
			transformers: [transformerNotationDiff() as any],
		},
	},
	integrations: [
		// rename({ rename: {} }),
		icon(),
		mdx({
			remarkPlugins: [remarkMath],
			rehypePlugins: [
				[
					rehypeKatex,
					{
						output: 'mathml',
					},
				],
			],
		}),
		await html2pdf(pkg.config),
		assets('/_/'),
		robotsTxt(),
		sitemap(),
		compress(),
		compressor({ gzip: true, brotli: true }),
	],
	env: {
		schema: {
			FORMSPREE_ID: envField.string({
				context: 'client',
				access: 'public',
				default: 'mdoqjapd',
			}),
			REPOSITERY: envField.string({
				context: 'client',
				access: 'public',
				default: 'bxbyte/bxbyte.github.io',
			}),
			REPOSITERY_PAGE: envField.string({
				context: 'client',
				access: 'public',
				default: 'bxbyte/bxbyte.github.io',
			}),
			REPOSITERY_URL: envField.string({
				context: 'client',
				access: 'public',
				default: 'https://github.com/bxbyte/bxbyte.github.io',
			}),
			REPOSITERY_OWNER: envField.string({
				context: 'server',
				access: 'public',
				default: 'bxbyte',
			}),
			SERVER_URL: envField.string({
				context: 'server',
				access: 'public',
				default: 'https://lucas-maillet.com',
			}),
		},
	},
} as const satisfies AstroUserConfig

// https://astro.build/config
export default defineConfig(pseudoConfig)
