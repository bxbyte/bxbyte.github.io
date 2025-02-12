import type { AstroIntegration } from 'astro'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

import { $compute, routePattern, routePatternFormat } from './compute'

const entrypoint = './api.ts'

export default (routePrefix: string) => {
	$compute.routePrefix = routePrefix
	return {
		name: import.meta.filename,
		hooks: {
			async 'astro:config:setup'({ injectRoute }) {
				// In development mode, using the dynamic route work best
				import.meta.env.DEV &&
					injectRoute({
						pattern: routePrefix + routePattern,
						entrypoint: new URL(entrypoint, import.meta.url),
						prerender: false,
					})
			},
			// In production mode, need to write every artefact at build end
			...(import.meta.env.DEV
				? {}
				: {
						async 'astro:build:done'({ dir, logger }) {
							const artifacts = Object.entries($compute.computed).flatMap(
								([hash, { data }]) =>
									Object.entries(data).map(([id, v]) => ({
										hash,
										id,
										...v,
									})),
							)

							if (!artifacts) return

							logger = logger.fork(import.meta.filename)
							const computedDir = join(fileURLToPath(dir), routePrefix)

							logger.info(`Writing ${artifacts.length} computed artifacts...`)
							await Promise.all(
								artifacts.map(({ value, ...metadata }) =>
									writeFile(
										join(computedDir, routePatternFormat(metadata)),
										value,
									),
								),
							)
							logger.info('Done.')
						},
					}),
		},
	} as AstroIntegration
}
