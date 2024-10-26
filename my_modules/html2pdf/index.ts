import iconSVG from './devtool/assets/icon.svg?raw'

import type { AstroIntegration } from 'astro'

import server from './devtool/server'
import toolbarURL from './devtool/toolbar?url'
import Renderer from './server/renderer'

export default async (
	setupParam: Omit<
		Parameters<(typeof Renderer)['setup']>[0],
		'logger' | 'config'
	>,
) => {
	return {
		name: 'PDF',
		hooks: {
			'astro:config:setup': async ({ addDevToolbarApp, logger, config }) => {
				logger = logger.fork('PDF')
				logger.debug('Loading renderer')
				await Renderer.setup({
					logger,
					config,
					...setupParam,
				})

				if (import.meta.env.DEV) {
					logger.debug('Loading toolbar...')
					addDevToolbarApp({
						id: 'PDF',
						name: 'HTML to PDF',
						icon: iconSVG,
						entrypoint: toolbarURL,
					})
				}
			},
			'astro:server:setup': server,
		},
	} as AstroIntegration
}
