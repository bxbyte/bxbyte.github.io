import type { AstroIntegration } from 'astro'
import { existsSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { normalizePath } from 'vite'

const name = 'composer',
	loaderSuffix = '?path'

/**
 * Define composer related config.
 */
export default function () {
	/**
	 * Used to pass the import context from the resolve hook to the load hook
	 */
	const urlById = new Map<string, string>()
	return {
		name,
		/**
		 * Add a custom loader "*?path" to import url path to server only ressources
		 */
		hooks: {
			async 'astro:config:setup'({ updateConfig }) {
				updateConfig({
					vite: {
						plugins: [
							{
								name,
								enforce: 'pre',
								load(id) {
									if (!id.endsWith(loaderSuffix)) return
									return `export default new URL("${urlById.get(
										normalizePath(id),
									)}");`
								},
								resolveId(id, importer: string) {
									if (id.endsWith(loaderSuffix)) {
										const normalizedId = normalizePath(id),
											absolutePath = resolve(
												dirname(importer),
												normalizedId.slice(
													0,
													normalizedId.length - loaderSuffix.length,
												),
											)
										if (existsSync(absolutePath)) {
											urlById.set(
												normalizedId,
												join('file://', encodeURI(absolutePath)),
											)
											return normalizedId
										}
									}
									return null
								},
							},
						],
					},
				})
			},

			async 'astro:config:done'({ injectTypes }) {
				injectTypes({
					filename: 'types.d.ts',
					content: `
					declare module '*${loaderSuffix}' {
						const path: string;
						export default path;
					}`.replace(/\s+/g, ' '),
				})
			},
		},
	} as AstroIntegration
}
