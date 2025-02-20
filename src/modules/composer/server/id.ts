const idAlphabet =
	"0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN_-"

export const $elementIds: { id: number } = ((global as any)["$elementIds"] ||= {
	id: 0,
})

export function newId(): string {
	let idNumber = $elementIds.id++,
		id = [] as number[]

	if (idNumber >= idAlphabet.length) {
		idNumber = 0
		let j = 0
		id[j] = id[j] + 1 || 0
		while (id[j] >= idAlphabet.length) {
			id[j++] = 0
			id[j] = id[j] + 1 || 0
		}
	}

	return id.map((k) => idAlphabet[k]).join("")
}
