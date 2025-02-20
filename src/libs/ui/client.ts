export function join<T>(arr: T[], delimiter = ", ", endDelimiter = " & ") {
	return [
		...[...arr].slice(0, arr.length - 2),
		[...arr].splice(arr.length - 2, arr.length).join(endDelimiter),
	].join(delimiter)
}
