import type { AstroIntegration } from 'astro'
import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

import { $compute } from './compute'

export default (assets?: string) => {
	return {
		name: 'compute',
		hooks: {
			async 'astro:config:setup'({ createCodegenDir, config }) {
				const assetsDir = assets || config.build.assets
				let absoluteAssetsDir: string
				$compute.getArtefactAbsolutePath = (filename) =>
					join(absoluteAssetsDir, filename)

				if (import.meta.env.PROD) {
					absoluteAssetsDir = join(process.cwd(), 'dist', assetsDir)
					$compute.getArtefactRelativePath = (filename) =>
						join(assetsDir, filename)
				} else {
					absoluteAssetsDir = fileURLToPath(createCodegenDir())
					$compute.getArtefactRelativePath = $compute.getArtefactAbsolutePath
				}

				if (!existsSync) await mkdir(absoluteAssetsDir, { recursive: true })
			},
		},
	} as AstroIntegration
}
