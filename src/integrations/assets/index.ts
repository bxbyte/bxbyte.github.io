import type { AstroIntegration } from 'astro'
import { createHash } from 'crypto'
import { writeFile } from 'fs/promises'
import hash from 'object-hash'
import { join } from 'path'

import relativeEntrypoint from './[id]?url'

interface AssetStore {
	assetPrefix: string
	cachedIdsByKeys: Record<string, any>
	assets: Record<string, any>
}

export const assetStore: AssetStore = ((global as any)['assetStore'] ||= {})

assetStore.cachedIdsByKeys ||= {}
assetStore.assets ||= {}

export async function setDynamicPaths<T>(
	computePaths: () => Promise<
		({
			value: any
		} & T)[]
	>,
	extension: string,
	cacheKey: any,
): Promise<(T & { href: string })[]> {
	const hashKey = hash(cacheKey)
	if (hashKey && hashKey in assetStore.cachedIdsByKeys) {
		return assetStore.cachedIdsByKeys[hashKey]
	} else
		return (assetStore.cachedIdsByKeys[hashKey] = await Promise.all(
			(await computePaths()).map(async (props) => {
				const id =
						createHash('sha256')
							.update(props.value)
							.update(hashKey)
							.digest('hex')
							.slice(0, 6) +
						'.' +
						extension,
					href = assetStore.assetPrefix + id

				// If we're in dev mode, just push assets into the virtual route
				if (import.meta.env.DEV) assetStore.assets[id] = props.value
				// Otherwise write real image's files
				else await writeFile(join(process.cwd(), 'dist', href), props.value)
				return {
					href,
					...props,
				}
			}),
		))
}

export default (assetPrefix: string) => {
	assetStore.assetPrefix = assetPrefix
	return {
		name: 'html2pdf',
		hooks: {
			async 'astro:config:setup'({ injectRoute }) {
				import.meta.env.DEV &&
					injectRoute({
						pattern: assetStore.assetPrefix + '[id]',
						entrypoint: join(process.cwd(), relativeEntrypoint),
					})
			},
		},
	} as AstroIntegration
}
