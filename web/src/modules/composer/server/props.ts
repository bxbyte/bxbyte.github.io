export function p<T extends Object>(props: T) {
	const wrapper = {
		with<K extends keyof T>(
			attr: K,
			...values: (T[K] | undefined | null | false | 0)[]
		) {
			const mask =
				typeof props[attr] == "string" ? props[attr].split(" ") : []
			values = [
				props[attr],
				...values.filter((v) => !mask.includes(v as string)),
			].filter(Boolean)
			if (values.length) props[attr] = values.join(" ") as any
			return this as typeof wrapper
		},
		end: () => props,
	}
	return wrapper
}
