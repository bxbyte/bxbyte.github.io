import markdownit from 'markdown-it'

const mdCtx = markdownit({ html: true, breaks: false })

export default function md(mdString: string): string {
	return mdCtx.render(mdString.replaceAll(/^([^\S\r\n]+)/gm, ''))
}
