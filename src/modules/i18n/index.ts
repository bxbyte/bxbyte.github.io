import type { AstroIntegration } from 'astro'

import { defaultLocale, locales } from './config'

/**
 * Define i18n related content
 */
export default {
	name: 'i18n',
	hooks: {
		async 'astro:config:setup'({ updateConfig }) {
			updateConfig({
				i18n: {
					defaultLocale,
					locales,
					routing: {
						prefixDefaultLocale: false,
						redirectToDefaultLocale: false,
						fallbackType: 'rewrite',
					},
				},
			})
		},
	},
} as AstroIntegration
