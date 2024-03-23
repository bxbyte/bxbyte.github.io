import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs'
import { basename, join, resolve } from 'path'
import { pathToFileURL } from 'url'

/**
 * Public folder directory
 */
const PUBLIC_DIR = './public'

/**
 * Path to public ressources directory.
 * For any change don't forget to update the .gitignore
 */
const PUBLIC_RSRC_DIR = 'rsc'

// Clear public folder
const public_dir = join(PUBLIC_DIR, PUBLIC_RSRC_DIR)
if (existsSync(public_dir)) rmSync(public_dir, { recursive: true, force: true })
mkdirSync(public_dir)

/**
 * Map every added ressources filepath to public href.
 */
export const ressourceHrefbyPath: Record<string, string> = {}

var ressourceIdxMap: Record<string, number> = {}

/**
 * Add file to public folder.
 *
 * @param filepath filepath added to public
 */
export function addResource(filepath: string) {
	const filename = basename(filepath),
		idx = ressourceIdxMap[filename] ?? 0,
		dirHref = join(PUBLIC_RSRC_DIR, idx.toString()),
		href = join(dirHref, filename),
		localDirpath = resolve(PUBLIC_DIR, dirHref)

	// Update dir index if needed
	ressourceIdxMap[filename] = idx + 1
	ressourceHrefbyPath[filepath] = `/${href.replace(/\\/g, '/')}`

	// Move file
	if (!existsSync(localDirpath)) mkdirSync(localDirpath)
	copyFileSync(resolve(filepath), resolve(join(PUBLIC_DIR, href)))
}
