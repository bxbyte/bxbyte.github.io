import { assetStore } from '.'

type PathInfo = { params: { id: string } }

export function GET({ params: { id } }: PathInfo) {
	return new Response(assetStore.assets[id])
}

export function getStaticPaths(): PathInfo[] {
	return Object.keys(assetStore.assets).map((id) => ({ params: { id } }))
}
