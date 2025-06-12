import type { AstroIntegration } from "astro"
import { existsSync } from "fs"
import { mkdir } from "fs/promises"
import { join, relative } from "path"
import { fileURLToPath } from "url"

import { $compute } from "./compute"

export default (assets?: string) => {
	return {
		name: "compute",
		hooks: {
			async "astro:config:setup"({ createCodegenDir, config }) {
				let assetsDir = assets || config.build.assets
				$compute.absolutePath = join(process.cwd(), "dist", assetsDir)
				$compute.urlPath =
					"/" +
					(import.meta.env.DEV
						? relative(
								process.cwd(),
								fileURLToPath(createCodegenDir())
							)
						: assetsDir)

				if (!existsSync)
					await mkdir($compute.absolutePath, { recursive: true })
			},
		},
	} as AstroIntegration
}
