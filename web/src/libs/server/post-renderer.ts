import { getContainerRenderer } from "@astrojs/mdx"

import { experimental_AstroContainer } from "astro/container"
import { loadRenderers } from "astro:container"
import { render } from "astro:content"
import { type CheerioAPI, load } from "cheerio"
import type { Element } from "domhandler"

import * as html2pdfComponents from "@/modules/html2pdf/layouts"

import type Toc from "@/components/post/Toc.astro"

import astroConfig from "!/astro.config"
import type { PostHydrated } from "@/content"

function processEl(
	cheerio: CheerioAPI,
	el: Element,
	getTextEl = (el: Element) => el
): component.Props_<typeof Toc>["items"][number] {
	const textEl = getTextEl(el),
		linkText = textEl.attribs["data-toc"] || cheerio(textEl).text()
	el.attribs.id ||= linkText
		.replace(/\s+/gm, "-")
		.replace(/--+/gm, "-")
		.toLowerCase()
	return {
		text: linkText,
		href: `#${el.attribs.id}`,
	}
}

function getCaptionItems(cheerio: CheerioAPI, selector: string) {
	return [...cheerio(selector)].map((el) =>
		processEl(cheerio, el as Element, (el) => el.next as Element)
	)
}

export default async function renderPostMdx(post: PostHydrated) {
	const { Content: astroContent, remarkPluginFrontmatter: rawFrontmatter } =
			await render(post as any),
		astroRenderedContent = await (
			await experimental_AstroContainer.create({
				astroConfig,
				renderers: await loadRenderers([getContainerRenderer()]),
			})
		).renderToString(astroContent, {
			props: {
				components: {
					...html2pdfComponents,
				},
			},
		}),
		cheerio = load(astroRenderedContent)

	// Hash ids
	const idElements = [...cheerio("[id]")],
		seedHash = Math.ceil(Math.random() * idElements.length)
	idElements.map((el, i) => {
		const newId = ((seedHash + i) % idElements.length).toString(16)
		;[...cheerio(`[href*='#${el.attribs.id}']`)].map(
			(el) => (el.attribs.href = "#" + newId)
		)
		el.attribs.id = newId
	})

	// Toc
	const toc = {
		headings: [...cheerio(":is(h1,h2,h3,h4,h5,h6)")].map((el) =>
			Object.assign(processEl(cheerio, el as Element), {
				lvl: parseInt(
					(el as Element).tagName.match(/\d/) as unknown as string
				),
			})
		),
		figures: getCaptionItems(
			cheerio,
			"figure:has(figcaption) :is(img,svg)"
		),
		tables: getCaptionItems(cheerio, "figure:has(figcaption) table"),
	}

	// Handle caption
	// Based on https://route360.dev/fr/post/astro-markdown-figcaption/
	cheerio("img").replaceWith(
		(_, { attribs: { src, alt, title, width, height } }) => `
		<figure>
			<img
				src=${src}
				alt=${alt}
				loading="lazy"
				title=${title}
				width=${width}
				height=${height}
				decoding="auto"
			/>${alt ? `<figcaption>${alt}</figcaption>` : ""}
		</figure>`
	)

	return {
		toc,
		rendered: cheerio.html(),
		rawFrontmatter,
	}
}
