export default {
	useTabs: true,
	semi: false,
	singleQuote: true,
	endOfLine: 'auto',
	importOrder: [
		'^\\w',
		'^!',
		'^@/layouts',
		'^@/components',
		'^@/styles',
		'^@/',
		'^\\.[^\\.]*$',
		'.*[s]?[ca]ss$',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-css-order',
		'prettier-plugin-astro',
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
		{
			files: '*.svg',
			options: {
				parser: 'html',
			},
		},
	],
}
