import { join } from 'path'

export function getImagePath(src: ImageMetadata) {
	return import.meta.env.PROD
		? join(process.cwd(), 'dist', decodeURI(src.src))
		: src.src.replace(/(^\/@fs)(.*)(?:(\?[^?]*))/, (_, __, path) => path)
}
