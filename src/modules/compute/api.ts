import { $compute, type ArtefactMetadata } from './compute'

type ArtefactParams = { params: ArtefactMetadata }

export function GET({ params: { hash, id } }: ArtefactParams) {
	return new Response($compute.computed[hash].data[id].value as any)
}

export function getStaticPaths(): ArtefactParams[] {
	return Object.entries($compute.computed).flatMap(([hash, { data }]) =>
		Object.entries(data).map(([id, { ext }]) => ({
			params: {
				id,
				ext,
				hash,
			},
		})),
	)
}
