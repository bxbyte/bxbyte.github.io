import { existsSync } from "fs"
import { writeFile } from "fs/promises"
import hashObject from "object-hash"
import { dirname } from "path"

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
	getArtefactAbsolutePath: (filename: string) => string
	getArtefactRelativePath: (filename: string) => string
	computed: Record<string, any>
} = ((global as any)["$compute"] ||= {
	computed: {},
})

export const filenameFormat = ({ hash, id, ext }: ArtefactMetadata) =>
	`${hash}-${id}.${ext}`

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
			data: ArtefactData,
			filetype: string,
			id?: string
		) => Promise<string>
	) => T
): Promise<T> {
	const hash = hashObject(key)
	let computed = $compute.computed[hash]

	// If not already computed & cached
	if (!computed) {
		let lastId = 0
		computed = $compute.computed[hash] = await computer(
			async (value, ext, id) => {
				id ||= `${lastId++}` // In case no id was provided

				// Write artefact
				const filename = filenameFormat({ hash, ext, id })
				await writeFile(
					$compute.getArtefactAbsolutePath(filename),
					value as any
				)

				// Return path to artefact
				return $compute.getArtefactRelativePath(filename)
			}
		)
	}

	return computed
}
