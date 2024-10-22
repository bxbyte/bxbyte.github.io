import { METADATA_ID } from '../print/Metadata.astro'
import type Renderer from '../server/renderer'

import { defineToolbarApp } from 'astro/toolbar'
import type { UUID } from 'crypto'

import { MSG } from './msg'

export default defineToolbarApp({
	init(_, app, server) {
		const pageUUIDs: Set<UUID> = new Set()

		app.onToggled(({ state }) => {
			if (state) {
				// Retrieve metadata from html element
				const metadataEl = document.getElementById(METADATA_ID)
				if (!metadataEl) throw Error('Missing metadata element')
				const metadata = JSON.parse(metadataEl.innerHTML) || {}

				// Rendering attached to a special uuid to avoid opening results on all page
				const uuid = window.crypto.randomUUID()
				pageUUIDs.add(uuid)

				server.send(MSG.EXEC, {
					uuid,
					url: window.location.href,
					...metadata,
				} as Parameters<(typeof Renderer)['render']>[0])

				// Reset toggle
				app.toggleState({ state: false })
			}
		})

		server.on(MSG.RESULT, (param: { uuid: UUID; pdfPath: string }) => {
			if (pageUUIDs.has(param.uuid)) {
				window.open(param.pdfPath, '_blank')?.focus()
				pageUUIDs.delete(param.uuid)
			}
		})

		server.on(MSG.ERROR, (param: { uuid: UUID; error: Error }) => {
			if (pageUUIDs.has(param.uuid)) {
				console.log(param.error)
				pageUUIDs.delete(param.uuid)
			}
		})
	},
})
