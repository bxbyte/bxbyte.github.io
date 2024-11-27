import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'

import { POINT_PER_UNIT, type RawPageSize } from './pagesize'

const METADATA_FILENAME = 'metadata.pdfmark'

function stringOrList(value: string | string[]) {
	return typeof value == 'string' ? value : value.join(', ')
}

export class GhostScript {
	gsPath: string
	args: string[] = [
		'-sDEVICE=pdfwrite',
		'-dCompatibilityLevel=1.4',
		'-dPrinted=false',
		'-dFIXEDMEDIA',
		'-dNOPAUSE',
		'-dQUIET',
		'-dBATCH',
	]
	from: string[]
	to: string

	constructor(gsPath: string, to: string, ...from: string[]) {
		this.gsPath = gsPath
		this.from = from
		this.to = to
	}

	setSize({ size }: { size: RawPageSize; scale: number }) {
		this.args.push(
			'-dPDFFitPage',
			// `-r${scale}`,
			`-dDEVICEWIDTHPOINTS=${size.width * POINT_PER_UNIT[size.unit]}`,
			`-dDEVICEHEIGHTPOINTS=${size.height * POINT_PER_UNIT[size.unit]}`,
		)
		return this
	}

	setMetadata(param: {
		title?: string
		locale?: string
		description?: string
		authors?: string | string[]
		creator?: string | string[]
		keywords?: string | string[]
	}) {
		const metadataPath = join(dirname(this.from[0]), METADATA_FILENAME)
		writeFileSync(
			metadataPath,
			`[ ${[
				param?.title && `/Title (${param.title})`,
				param?.description && `/Subject (${param.description})`,
				param?.authors && `/Author (${stringOrList(param.authors)})`,
				param?.creator && `/Creator (${stringOrList(param.creator)})`,
				param?.keywords && `/Keywords (${stringOrList(param.keywords)})`,
				param?.locale && `/Lang (${param.locale})`,
			]
				.filter(Boolean)
				.join('\n')}
			/DOCINFO
		  pdfmark`,
		)
		this.from.push(metadataPath)
		return this
	}

	exec() {
		execSync(
			[
				this.gsPath,
				...this.args,
				`-sOutputFile='${this.to}'`,
				...this.from.map((from) => `'${from}'`),
			].join(' '),
		)
	}
}
