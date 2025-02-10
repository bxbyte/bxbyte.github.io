import { writeFile } from 'fs/promises'
import hash from 'object-hash'
import { join } from 'path'

type Data = Buffer | string

/**
 * Compute store, with shared infos relative to computed & cached data
 */
export const $compute: {
	computed: Record<
		string,
		{
			returned: any
			data: Record<string, { value: Data; ext: string }>
		}
	>
	routePrefix: string
} = ((global as any)['$compute'] ||= {
	computed: {},
})

/**
 * Compute data & store it in cache
 *
 * @param key Caching key
 * @param computer Computing function call one time per key
 * @returns
 */
export async function compute<T>(
	key: any,
	computer: (add: (data: Data, filetype: string) => Promise<string>) => T,
): Promise<T> {
	const hashKey = hash(key)
	let computed = $compute.computed[hashKey]

	// If not already computed & cached
	if (!computed) {
		const data = {}
		let lastId = 0

		computed = $compute.computed[hashKey] = {
			data,
			returned: await computer(async (value: Data, ext: string) => {
				const id = lastId++,
					path = `${$compute.routePrefix}${hashKey}-${id}.${ext}`
				// addComputed()

				// If we're in dev mode, just cache the assets into the virtual route
				if (import.meta.env.DEV) {
					data[id] = {
						value,
						ext,
					}
				} else await writeFile(join(process.cwd(), 'dist', path), value as any)
				// Otherwise write real image's files
				return path
			}),
		}
	}

	return computed.returned
}
