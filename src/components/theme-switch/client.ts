import { persistentAtom } from '@nanostores/persistent'

export const isDarkTheme = persistentAtom('theme', false, {
	encode: JSON.stringify,
	decode: JSON.parse,
})

function setDarkTheme(state: boolean) {
	document.body.classList.toggle('dark', state)
}

isDarkTheme.subscribe(setDarkTheme)
document.addEventListener('astro:after-swap', () =>
	setDarkTheme(isDarkTheme.value),
)

class SwitchTheme extends HTMLButtonElement {
	constructor() {
		super()
		this.addEventListener('click', () => {
			isDarkTheme.set(!isDarkTheme.get())
		})
	}
}
customElements.define('switch-theme', SwitchTheme, { extends: 'button' })
