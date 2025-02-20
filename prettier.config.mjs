/** @type {import("prettier").Config} */
export default {
	plugins: [
		"prettier-plugin-css-order",
		"prettier-plugin-astro",
		"@trivago/prettier-plugin-sort-imports",
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: "*.svg",
			options: {
				parser: "html",
			},
		},
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	trailingComma: "es5",
	tabWidth: 4,
	endOfLine: "auto",
	semi: false,
	useTabs: true,
	singleQuote: false,
	bracketSpacing: true,
	importOrder: [
		"^\\w",
		"^@/modules/(.*)$",
		"^@/layouts/(.*)$",
		"^@/components/(.*)$",
		"^@/styles/(.*)$",
		"^@/assets/(.*)$",
		"^@/lib/(.*)$",
		"./.*?w+$",
		".*[s]?[ca]ss$",
		".*.(png|jpe?g|gif|webp|avif)$",
		"^./.*$",
	],
}
