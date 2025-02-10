import type { AstroIntegration } from 'astro'
import { join } from 'path'

import relativeEntrypoint from './api?url'
import { $compute } from './compute'

export default (routePrefix: string) => {
	$compute.routePrefix = routePrefix
	return {
		name: 'compute',
		hooks: {
			async 'astro:config:setup'({ injectRoute }) {
				import.meta.env.DEV &&
					injectRoute({
						pattern: $compute.routePrefix + '[hash]-[id].[ext]',
						entrypoint: join(process.cwd(), relativeEntrypoint),
					})
			},
		},
	} as AstroIntegration
}
