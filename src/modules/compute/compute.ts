import hashObject from 'object-hash'
import { join } from 'path'

/**
 * Computed artefact informations
 */
export type ArtefactMetadata = { hash: string; id: string; ext: string }

/**
 * Artefact possible data type
 */
type ArtefactData = Buffer | string

/**
 * Compute store, with shared infos relative to computed & cached data
 */
export const $compute: {
	computed: Record<
		string,
		{
			returned: any
			data: Record<string, { value: ArtefactData; ext: string }>
		}
	>
	routePrefix: string
} = ((global as any)['$compute'] ||= {
	computed: {},
})

export const routePatternFormat = ({ hash, id, ext }: ArtefactMetadata) =>
		`${hash}-${id}.${ext}`,
	routePattern = routePatternFormat({
		hash: '[hash]',
		id: '[id]',
		ext: '[ext]',
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
	computer: (
		add: (data: ArtefactData, filetype: string) => Promise<string>,
	) => T,
): Promise<T> {
	const hash = hashObject(key)
	let computed = $compute.computed[hash]

	// If not already computed & cached
	if (!computed) {
		const data = {}
		let lastId = 0
		computed = $compute.computed[hash] = {
			data,
			returned: await computer(async (value: ArtefactData, ext: string) => {
				const id = `${lastId++}`,
					url = join(
						'/',
						$compute.routePrefix,
						routePatternFormat({
							hash,
							ext,
							id,
						}),
					)
				data[id] = {
					value,
					ext,
				}
				return url
			}),
		}
	}

	return computed.returned
}
