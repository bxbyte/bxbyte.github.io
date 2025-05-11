import type { AstroConfig, AstroIntegrationLogger } from "astro"
import { createHash } from "crypto"
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "fs"
import { tmpdir } from "os"
import { basename, join } from "path"
import puppeteer, { Browser, Page, type SupportedBrowser } from "puppeteer-core"

import { GhostScript } from "./ghostscript"

const MAX_RENDER_TIMEOUT = 5 * 60 * 1000 // 5min max of rendering time

declare global {
	interface Window {
		// Promise for render
		render: Promise<void> // For Paged.js rendering process
		resolveRender: () => void
		images: Promise<void> // For images loading process
	}
}

function getHash(value: string) {
	return createHash("sha256").update(value).digest("hex").slice(0, 6)
}

export default class Renderer {
	static browser: Browser
	static gsPath: string
	static logger: AstroIntegrationLogger
	static config: AstroConfig

	static async setup({
		browserType,
		browserPath,
		gsPath,
		logger,
		config,
	}: {
		browserType: string
		browserPath: string
		gsPath: string
		logger: AstroIntegrationLogger
		config: AstroConfig
	}): Promise<void> {
		this.logger = logger.fork("PDF:renderer")
		this.gsPath = gsPath
		this.config = config

		this.logger.debug("Launching puppeter browser")
		this.browser = await puppeteer.launch({
			browser: browserType as SupportedBrowser,
			executablePath: browserPath,
			headless: true,
			protocolTimeout: MAX_RENDER_TIMEOUT,
		})
	}

	static async loadPage(url: URL): Promise<Page> {
		const page = await this.browser.newPage()
		await page.emulateMediaType("print")

		// Preloading
		await page.evaluateOnNewDocument(() => {
			// Picture loading
			document.addEventListener("astro:color-swap", () => {
				window.images = (async () => {
					await Promise.all(
						Array.from(document.querySelectorAll("img")).map(
							(img) => {
								if (img.complete) return
								return new Promise((resolve, reject) => {
									img.addEventListener("load", resolve)
									img.addEventListener("error", reject)
								})
							}
						)
					)
				})()
			})
		})

		this.logger.debug("Loading page...")
		await page.goto(url.href, { waitUntil: "networkidle2" })

		// Loading
		this.logger.debug("Loading ressources...")
		await page.evaluate(async () => {
			return await Promise.all([
				window.images, // Wait images loading
				window.render, // Wait Paged.js rendering
			])
		})
		return page
	}

	static async render(
		param: {
			url: URL | string
			filename?: string
		} & Parameters<typeof GhostScript.prototype.setSize>[0] &
			Parameters<typeof GhostScript.prototype.setMetadata>[0]
	): Promise<string> {
		param.url = new URL(param.url)
		param.url.searchParams.delete("page")

		const tempDir = mkdtempSync(join(tmpdir(), "renderer")),
			filepath = `${basename(param.filename || param.url.pathname)}.pdf`,
			hashDir = getHash(param.url.href),
			renderServerDir = join(
				this.config.publicDir.href,
				this.config.build.assets,
				hashDir
			)

		this.logger.debug("Converting to pdf...")

		const webpage = await this.loadPage(param.url)
		webpage.setDefaultTimeout(MAX_RENDER_TIMEOUT) // Fix timeout error for heavy rendering
		const numberOfPages = await webpage.evaluate(
			() => document.querySelectorAll(".pagedjs_page").length
		)
		await webpage.close()

		// Render each page apparts
		const intermediatedPages = (
			await Promise.all(
				Array.from({
					length: numberOfPages,
				}).map(async (_, i) => {
					const pageUrl = new URL(param.url),
						path = join(tempDir, `page_${i}.pdf`)
					pageUrl.searchParams.set("page", i.toString())

					const page = await this.loadPage(pageUrl)

					page.setDefaultTimeout(MAX_RENDER_TIMEOUT) // Fix timeout error for heavy rendering

					await page.evaluate(
						`document
							.querySelectorAll('.pagedjs_page:not(:nth-child(${i + 1}))')
							.forEach(page => page.style.display = 'none')
						document
							.querySelector('.pagedjs_page:nth-child(${i + 1})')
							.style.display = 'inherit'
						`
					)

					await page.pdf({
						path,
						printBackground: true,
						preferCSSPageSize: true,
						waitForFonts: true,
						tagged: true,
					})

					await page.close()

					return { i, path }
				})
			)
		)
			.sort(({ i: a }, { i: b }) => a - b)
			.map(({ path }) => path)

		this.logger.debug("Making sure render dir exist")
		if (!existsSync(renderServerDir))
			mkdirSync(renderServerDir, { recursive: true })

		this.logger.debug("Executing ghostscript...")
		new GhostScript(
			this.gsPath,
			join(renderServerDir, filepath),
			...intermediatedPages
		)
			.setMetadata(param)
			.setSize(param)
			.exec()

		this.logger.debug("Clearing temporary files")
		rmSync(tempDir, { recursive: true })
		return join("/" + this.config.build.assets, hashDir, filepath)
	}
}
