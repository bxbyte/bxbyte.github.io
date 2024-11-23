export class URLID<T extends string> extends String {
	id: T

	constructor(id: T) {
		super(`url(#${id})`)
		this.id = id
	}
}

export type URLIDCollection<T extends { readonly [k in keyof T]: T[k] }> = {
	readonly [k in keyof T]: URLID<T[k]> & `url(#${T[k]})`
}

export function urlIdCollection<T extends { readonly [k in keyof T]: T[k] }>(
	ids: T,
	prefix = '',
): URLIDCollection<T> {
	return Object.fromEntries(
		Object.entries(ids).map(([k, v]) => [k, new URLID([prefix, v].join('-'))]),
	) as URLIDCollection<T>
}
