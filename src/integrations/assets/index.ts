import type { AstroIntegration } from 'astro'
import { createHash } from 'crypto'
import { writeFile } from 'fs/promises'
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
	cacheKey: string,
): Promise<(T & { href: string })[]> {
	if (cacheKey && cacheKey in assetStore.cachedIdsByKeys) {
		return assetStore.cachedIdsByKeys[cacheKey]
	} else
		return (assetStore.cachedIdsByKeys[cacheKey] = await Promise.all(
			(await computePaths()).map(async (props) => {
				const id =
						createHash('sha256')
							.update(props.value)
							.update(cacheKey)
							.digest('hex')
							.slice(0, 6) +
						'.' +
						extension,
					href = assetStore.assetPrefix + id

				if (import.meta.env.DEV) assetStore.assets[id] = props.value
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
