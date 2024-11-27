import { persistentAtom } from '@nanostores/persistent'

export const isLightTheme = persistentAtom('theme', false, {
	encode: JSON.stringify,
	decode: JSON.parse,
})

function setDarkTheme(state: boolean) {
	document.body.classList.toggle('light', state)
}

isLightTheme.subscribe(setDarkTheme)
document.addEventListener('astro:after-swap', () =>
	setDarkTheme(isLightTheme.value),
)

class SwitchTheme extends HTMLButtonElement {
	constructor() {
		super()
		this.addEventListener('click', () => {
			isLightTheme.set(!isLightTheme.get())
		})
	}
}
customElements.define('switch-theme', SwitchTheme, { extends: 'button' })
