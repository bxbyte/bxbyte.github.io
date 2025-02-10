import { $compute } from './compute'

type Computed = { params: { hash: string; id: string } }

export function GET({ params: { hash, id } }: Computed) {
	return new Response($compute.computed[hash].data[id].value as any)
}

export function getStaticPaths(): Computed[] {
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
