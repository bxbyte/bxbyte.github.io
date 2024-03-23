/**
 * Add class names to components props if they're valid.
 *
 * @param classNames Potentially added class names
 */
export function classNames(
	props: { className?: string } = {},
	...classNames: (string | boolean | undefined)[]
): typeof props {
	classNames.push(props.className)
	classNames = classNames.filter((v) => v)
	if (classNames.length) {
		props.className = classNames.join(' ')
	}
	return props
}

/**
 * Search coordinate of a substring.
 *
 * @param str String where to search
 * @param searchString Searched substring
 * @returns Position formated as linePos:ColumnPos
 */
export function getPosOf(str: string, searchString: string): string {
	const i = str.indexOf(searchString),
		line = str.substring(0, i).split('\n')
	return `${line.length}:${line[line.length - 1].length}`
}
