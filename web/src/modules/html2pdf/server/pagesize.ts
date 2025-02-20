export const PPI = 96 // Base all units pixel conversions except pixel itself

export const POINT_PER_UNIT = {
	mm: PPI / 25.4,
	in: PPI,
	pt: 1,
	px: 3 / 4,
}

export interface RawPageSize {
	width: number
	height: number
	unit: keyof typeof POINT_PER_UNIT
}

export type PageSize = keyof typeof DEFAULT_PAGE_SIZES | RawPageSize

// From https://ghostscript.com/docs/9.54.0/Use.htm#Known_paper_sizes
export const DEFAULT_PAGE_SIZES = {
	"11x17": { width: 792, height: 1224, unit: "pt" },
	ledger: { width: 1224, height: 792, unit: "pt" },
	legal: { width: 612, height: 1008, unit: "pt" },
	letter: { width: 612, height: 792, unit: "pt" },
	archE: { width: 2592, height: 3456, unit: "pt" },
	archD: { width: 1728, height: 2592, unit: "pt" },
	archC: { width: 1296, height: 1728, unit: "pt" },
	archB: { width: 864, height: 1296, unit: "pt" },
	archA: { width: 648, height: 864, unit: "pt" },
	a0: { width: 2384, height: 3370, unit: "pt" },
	a1: { width: 1684, height: 2384, unit: "pt" },
	a2: { width: 1191, height: 1684, unit: "pt" },
	a3: { width: 842, height: 1191, unit: "pt" },
	a4: { width: 595, height: 842, unit: "pt" },
	a4small: { width: 595, height: 842, unit: "pt" },
	a5: { width: 420, height: 595, unit: "pt" },
	a6: { width: 297, height: 420, unit: "pt" },
	a7: { width: 210, height: 297, unit: "pt" },
	a8: { width: 148, height: 210, unit: "pt" },
	a9: { width: 105, height: 148, unit: "pt" },
	a10: { width: 73, height: 105, unit: "pt" },
	isob0: { width: 2835, height: 4008, unit: "pt" },
	isob1: { width: 2004, height: 2835, unit: "pt" },
	isob2: { width: 1417, height: 2004, unit: "pt" },
	isob3: { width: 1001, height: 1417, unit: "pt" },
	isob4: { width: 709, height: 1001, unit: "pt" },
	isob5: { width: 499, height: 709, unit: "pt" },
	isob6: { width: 354, height: 499, unit: "pt" },
	c0: { width: 2599, height: 3677, unit: "pt" },
	c1: { width: 1837, height: 2599, unit: "pt" },
	c2: { width: 1298, height: 1837, unit: "pt" },
	c3: { width: 918, height: 1298, unit: "pt" },
	c4: { width: 649, height: 918, unit: "pt" },
	c5: { width: 459, height: 649, unit: "pt" },
	c6: { width: 323, height: 459, unit: "pt" },
	jisb0: { width: 1030, height: 1456, unit: "mm" },
	jisb1: { width: 728, height: 1030, unit: "mm" },
	jisb2: { width: 515, height: 728, unit: "mm" },
	jisb: { width: 364, height: 515, unit: "mm" },
	jisb4: { width: 257, height: 364, unit: "mm" },
	jisb5: { width: 182, height: 257, unit: "mm" },
	jisb6: { width: 128, height: 182, unit: "mm" },
	flsa: { width: 612, height: 936, unit: "pt" },
	flse: { width: 612, height: 936, unit: "pt" },
	halfletter: { width: 396, height: 612, unit: "pt" },
	hagaki: { width: 283, height: 420, unit: "pt" },
} as const satisfies Record<string, RawPageSize>
