import eslintPluginAstro from 'eslint-plugin-astro'

export default [
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			'prefer-const': 'error',
		},
		overrides: [
			{
				files: ['*.astro'],
				processor: 'astro/client-side-ts',
			},
		],
	},
]
