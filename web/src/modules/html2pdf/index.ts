import type { AstroIntegration } from "astro"

import iconSVG from "./devtool/assets/icon.svg?raw"

import server from "./devtool/server"
import Renderer from "./server/renderer"

export default async (
	setupParam: Omit<
		Parameters<(typeof Renderer)["setup"]>[0],
		"logger" | "config"
	>
) => {
	return {
		name: "html2pdf",
		hooks: {
			"astro:config:setup": async ({
				addDevToolbarApp,
				logger,
				config,
			}) => {
				if (!import.meta.env.PROD) {
					logger = logger.fork("PDF")
					logger.debug("Loading renderer")
					await Renderer.setup({
						logger,
						config,
						...setupParam,
					})

					logger.debug("Loading toolbar...")
					addDevToolbarApp({
						id: "PDF",
						name: "HTML to PDF",
						icon: iconSVG,
						entrypoint: new URL(
							"./devtool/toolbar.ts",
							import.meta.url
						),
					})
				}
			},
			"astro:server:setup": server,
		},
	} as AstroIntegration
}
