import Renderer from "../server/renderer"

import type { AstroIntegration } from "astro"

import { MSG } from "./msg"

export default (({ toolbar, logger }) => {
	logger = logger.fork("PDF:server")
	toolbar.on(
		MSG.EXEC,
		(
			param: Parameters<(typeof Renderer)["render"]>[0] & {
				uuid: string
			}
		) => {
			const { uuid, url } = param
			logger.info(`Rendering ${url} [${uuid}]`)
			Renderer.render(param)
				.then((pdfPath) => {
					toolbar.send(MSG.RESULT, { uuid, pdfPath })
					logger.info(
						`Rendered ${url} [${uuid}] to ${new URL(url).origin}${pdfPath}`
					)
				})
				.catch((error) => {
					toolbar.send(MSG.ERROR, { uuid, error })
					logger.error(`Error rendering ${url}: ${error}`)
				})
		}
	)
}) as AstroIntegration["hooks"]["astro:server:setup"]
