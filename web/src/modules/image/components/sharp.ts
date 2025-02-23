import type { ImageInputFormat } from "astro"
import { Canvas, CanvasRenderingContext2D, Image } from "canvas"
import { readFile } from "fs/promises"
import { join } from "path"
import type { Sharp } from "sharp"
import sharp from "sharp"

/**
 * Sharp image metadata.
 */
export interface Metadata {
	width: number
	height: number
	format: ImageInputFormat
}

/**
 * Any sharp image related component's props
 */
export interface SharpImageProps {
	src: Parameters<typeof readSharp>[0]
	computeImg?: (img: Sharp) => Parameters<typeof computeSharp>[0]
}

/**
 * Read an image as a sharp one.
 *
 * @param src anything that point to that file (look up the type I mean)
 * @returns a sharp image
 */
export async function readSharp(
	src: string | URL | ImageMetadata
): Promise<Sharp> {
	return sharp(
		await readFile(
			typeof src == "string" || src instanceof URL
				? src
				: getImagePath(src)
		)
	)
}

/**
 * Compute a sharp image, a.k.a regenerate a
 * sharp image with the transformation applied.
 *
 * @param src sharp image
 * @returns computed sharp image
 */
export async function computeSharp(
	src: Sharp | Promise<Sharp> | Canvas
): Promise<Sharp> {
	return sharp(await (await src).toBuffer())
}

/**
 * Load a sharp image from astro props.
 *
 * @param props astro props
 * @returns load function and props separated
 */
export function loadSharpProps<T>(props: SharpImageProps & T) {
	const { src, computeImg = (v) => v, ...newProps } = props
	return {
		loadSharp: async () =>
			await computeSharp(computeImg(await readSharp(src))),
		props: newProps,
	}
}

/**
 * Get an image path based on the default astro image loader.
 *
 * @param src astro-loaded image
 * @returns real image path
 */
export function getImagePath(src: ImageMetadata) {
	return import.meta.env.PROD
		? join(process.cwd(), "dist", decodeURI(src.src))
		: src.src.replace(/(^\/@fs)(.*)(?:(\?[^?]*))/, (_, __, path) => path)
}

/**
 * Type-safe function to get Sharp metadata.
 *
 * @param src sharp image
 * @returns image metadata
 */
export async function getMeta(src: Sharp) {
	return (await src.metadata()) as Metadata
}

/**
 * Sharp image computer to easely chain multiple sharp image computer.
 *
 * @param callbacks sharp computer call to chain
 * @returns computed sharp image
 */
export function withSteps(
	...callbacks: ((src: Sharp) => Sharp | Promise<Sharp>)[]
) {
	return async (src: Sharp) =>
		await callbacks.reduce(
			async (a: Sharp | Promise<Sharp>, b) =>
				await computeSharp(b(await a)),
			src
		)
}

/**
 *  Sharp image computer to process it with the 2d canvas api.
 *
 * @param callback computer called with the 2d api context
 * @returns
 */
export function withCanvas(
	callback: (ctx: CanvasRenderingContext2D, cvs: Canvas) => void
) {
	return (src: Sharp) => {
		return new Promise<Sharp>(async (res) => {
			const { width, height } = await getMeta(src)

			const cvs = new Canvas(width, height),
				ctx = cvs.getContext("2d"),
				img = new Image()

			img.onload = async () => {
				ctx.drawImage(img, 0, 0)
				callback(ctx, cvs)
				res(sharp(cvs.toBuffer()))
				// res(computeSharp(cvs))
			}

			img.src = await src.toBuffer()
		})
	}
}
