import type { ComponentProps } from 'astro/types'

import type { localeDefs } from './config'

declare global {
	declare namespace component {
		/**
		 * Extract component props
		 */
		type Props_<T> = ComponentProps<T>
	}
}
