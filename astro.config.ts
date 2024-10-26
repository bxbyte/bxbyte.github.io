import pkg from './package.json'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import { transformerNotationDiff } from '@shikijs/transformers'

import icon from 'astro-icon'
import { type AstroUserConfig, defineConfig, envField } from 'astro/config'
import { SassString } from 'sass-embedded'

import PDF from './my_modules/html2pdf'
import { localesConfig } from './src/libs/i18n/config'

const pseudoConfig = {
	experimental: { contentIntellisense: true },
	output: 'static',
	scopedStyleStrategy: 'class',
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
			assetsInlineLimit: 512,
			assetsDir: '_',
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: "@use '@/styles/theme/theme.scss';",
					functions: {
						'svg-encode($svg)': function ([svg]: [SassString]) {
							return new SassString(
								`data:image/svg+xml;base64,${btoa(
									svg.toString().replace(/\s+/gm, ' ').replace(/"/gm, ''),
									// .replace(/^\s*["']|["']\s*$/gm, ''),
								)}`,
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
				dark: 'dark-plus',
				light: 'github-light',
			},
			defaultColor: false,
			transformers: [transformerNotationDiff() as any],
		},
	},
	integrations: [
		preact(),
		// rename({ rename: {} }),
		icon(),
		mdx(),
		await PDF(pkg.config),
	],
	env: {
		schema: {
			REPOSITERY_PAGE: envField.string({
				context: 'server',
				access: 'public',
				default: '',
			}),
			REPOSITERY_URL: envField.string({
				context: 'server',
				access: 'public',
				default: '',
			}),
			REPOSITERY_OWNER: envField.string({
				context: 'server',
				access: 'public',
				default: '',
			}),
			SERVER_URL: envField.string({
				context: 'server',
				access: 'public',
				default: '',
			}),
		},
	},
} as const satisfies AstroUserConfig

// https://astro.build/config
export default defineConfig(pseudoConfig) as Omit<
	AstroUserConfig,
	keyof typeof pseudoConfig
> &
	typeof pseudoConfig
