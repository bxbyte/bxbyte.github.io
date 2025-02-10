import type { AstroIntegration } from 'astro'
import { dirname, join } from 'path'
import { SassString } from 'sass-embedded'

const variablesUrl = join(dirname(import.meta.url), './styles/variables.scss')

/**
 * Define theme related variables (colors, shades, ...)
 */
export default {
	name: 'theme',
	hooks: {
		async 'astro:config:setup'({ updateConfig }) {
			updateConfig({
				vite: {
					css: {
						preprocessorOptions: {
							scss: {
								api: 'modern-compiler',
								additionalData:
									// Import theme variables in every scss code file/chunk
									`@use '${variablesUrl}' as theme;`,
								functions: {
									/**
									 *
									 * @param svgs the svg string
									 * @returns the uri-base64 encoded svg's string
									 */
									'svg($svg)': function ([svg]: [SassString]) {
										return new SassString(
											`data:image/svg+xml;base64,${Buffer.from(
												svg.asList
													.map((v) =>
														v.toString().replace(/^\s*["']|["']\s*$/gm, ''),
													)
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
					},
				},
			})
		},
	},
} as AstroIntegration
