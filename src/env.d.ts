import type { ComponentProps as AstroComponentProps } from 'astro/types'

import type { LocaleContent, Locales as Locales_ } from './libs/i18n'

/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare global {
	type Locales = Locales_
	type ComponentProps<T> = AstroComponentProps<T>
	type StringOrLocal<T> = {
		[k in keyof T]: T[k] extends string
			? string | LocaleContent
			: StringOrLocal<T[k]>
	}
	type LocalComponentProps<T> = StringOrLocal<AstroComponentProps<T>>
	type Params = { lang: Locales }
}
