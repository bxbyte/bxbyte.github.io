import { persistentAtom } from "@nanostores/persistent"

/** Current theme, true for light theme, false for dark */
export const $theme = persistentAtom("theme", false, {
	encode: JSON.stringify,
	decode: JSON.parse,
})

// Toggle theme between dark and light
export function toggleTheme() {
	$theme.set(!$theme.get())
}

/**
 * Toggle the class `light` on the `<html/>` element
 * to refresh the theme variable associed.
 *
 * @param theme true for light, false for dark
 */
function setTheme(theme: boolean) {
	document.documentElement.classList.toggle("light", theme)
}

$theme.subscribe(setTheme) // Set theme on store update
document.addEventListener("astro:after-swap", () => setTheme($theme.value)) // Fix with astro router
