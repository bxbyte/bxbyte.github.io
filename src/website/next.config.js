const { String } = require('sass').types,
	{ resolve, dirname } = require('path'),
	{ readFileSync } = require('fs')

const withMDX = require('@next/mdx')()

const configLoaders = [withMDX]

/** @type {import("next").NextConfig} */
var configuration = {
	output: 'export',
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	/**
	 * @type {import("sass").Options}
	 */
	sassOptions: {
		functions: {
			'svg($filepath)': function (args) {
				let filepath = args.dartValue.toString()
				filepath = filepath.slice(1, filepath.length - 1)
				let svg = readFileSync(resolve(dirname(this.options.file), filepath))
				return new String(
					`url("data:image/svg+xml;base64,${svg.toString('base64')}")`,
				)
			},
		},
	},
}

configLoaders.forEach((loader) => (configuration = loader(configuration)))

module.exports = configuration
