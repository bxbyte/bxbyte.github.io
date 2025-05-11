import { writeFile } from "fs/promises"
import hashObject from "object-hash"

/**
 * Artefact possible data type
 */
type ArtefactData = Buffer | string

/**
 * Compute store, with shared infos relative to computed & cached data
 */
export const $compute: {
	getArtefactAbsolutePath: (filename: string) => string
	getArtefactRelativePath: (filename: string) => string
	computed: Record<string, any>
} = ((global as any)["$compute"] ||= {
	computed: {},
})

export const filenameFormat = ({
	hash,
	filetype,
	id,
}: Record<string, string>) => `${hash}-${id}.${filetype}`

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
		add: (
			data: ArtefactData | Promise<ArtefactData>,
			filetype: string,
			id?: string
		) => string
	) => T
): Promise<T> {
	const hash = hashObject(key)
	let computed = $compute.computed[hash]

	// If not already computed & cached
	if (!computed) {
		let lastId = 0
		const promised: (() => Promise<void>)[] = []
		computed = $compute.computed[hash] = await computer(
			(data, filetype, id = `${lastId++}`) => {
				const filename = filenameFormat({ hash, filetype, id })

				// Write artefact
				promised.push(async () =>
					writeFile(
						$compute.getArtefactAbsolutePath(filename),
						(await data) as any
					)
				)

				// Return path to artefact
				return $compute.getArtefactRelativePath(filename)
			}
		)
		await Promise.all(promised.map((c) => c())) // Wait for all concurrent promise
	}

	return computed
}
