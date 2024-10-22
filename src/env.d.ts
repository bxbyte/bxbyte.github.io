import type { ComponentProps as AstroComponentProps } from 'astro/types'

import type { LocalContent, Locals } from './libs/i18n'

/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare global {
	type ComponentProps<T> = AstroComponentProps<T>
	type StringOrLocal<T> = {
		[k in keyof T]: T[k] extends string
			? string | LocalContent
			: StringOrLocal<T[k]>
	}
	type LocalComponentProps<T> = StringOrLocal<AstroComponentProps<T>>
	type Params = { lang: Locals }
}
