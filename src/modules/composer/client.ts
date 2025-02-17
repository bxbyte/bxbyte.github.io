export function define(
	tagName: `${string}-${string}`,
	options?: ElementDefinitionOptions,
) {
	return function (element: CustomElementConstructor) {
		customElements.define(tagName, element, options)
	}
}
