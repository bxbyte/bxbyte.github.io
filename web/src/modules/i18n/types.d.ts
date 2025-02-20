import type { localeDefs } from "./config"

declare global {
	declare namespace i18n {
		/**
		 * Every locales
		 */
		type Locales = keyof typeof localeDefs

		/**
		 * Un-nest some type organized by locales,
		 * a.k.a transform something like `{ v: { [Locales]: T } }` to `{ v: T }`
		 */
		type UnNestedLocaleContent<T> =
			T extends Record<Locales, any>
				? T[keyof T]
				: T extends
							| { new (...args: any[]): any }
							| { [Symbol.toPrimitive]: unknown }
					? T
					: { [k in keyof T]: UnNestedLocaleContent<T[k]> }

		/**
		 * Turn some type to handle locales organization,
		 * a.k.a transform something like `{ v: T } }` to `{ v: { [Locales]: T } }`
		 */
		type NestedLocaleContent<T> =
			T extends Record<string, any>
				? {
						[k in keyof T]: NestedLocaleContent<
							T[k] | Record<Locales, T[k]>
						>
					}
				: T
	}

	type Params = { lang: i18n.Locales }
}
