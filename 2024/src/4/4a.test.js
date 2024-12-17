import { vol } from "memfs"
import { describe, expect, it, vi } from "vitest"

import { beforeEach } from "vitest"
import {
	denoise,
	getData,
	findInLine,
	reverse,
	findInLineReverse,
	cols2Lines,
    findInColumns,
    findInColumnsReverse,
} from "./4a"

vi.mock("node:fs")
vi.mock("node:fs/promises")

beforeEach(() => {
	vol.reset()
})

const simpleInput = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`

it(`should return same simpleInput`, () => {
	const path = "/tmp/mock-file.txt"
	vol.fromJSON({ [path]: simpleInput }, "/tmp")
	expect(getData(path)).toBe(simpleInput)
})

describe(`denoise()`, () => {
	it(`should remove all characters`, () => {
		expect(denoise("na_xma5")).toEqual("")
	})
	it(`should keep one XMAS`, () => {
		expect(denoise("XMAS")).toEqual("XMAS")
	})
	it(`should keep one XMAS and remove extra chars`, () => {
		expect(denoise("-X__MA__S_")).toEqual("XMAS")
	})
	it(`should keep one XMAS and remove extra char that is one of 'XMAS'`, () => {
		expect(denoise("XMXAS")).toEqual("XMAS")
	})

	it(`should keep two XMAS`, () => {
		expect(denoise("XMASXMAS")).toEqual("XMASXMAS")
	})
	it(`should keep two XMAS and remove extra chars`, () => {
		expect(denoise("-XM--ASXM--AS---")).toEqual("XMASXMAS")
	})
	it(`should keep three XMAS and remove extra chars`, () => {
		expect(denoise("-XM-MASXMX-AS-XMAAXAS--")).toEqual("XMASXMASXMAS")
	})
	it(`should remove extra S`, () => {
		expect(denoise("XMASS")).toEqual("XMAS")
	})
})

describe(`reverse()`, () => {
	it(`should reverse string`, () => {
		expect(reverse("asdf")).toEqual("fdsa")
	})
})

describe(`findInLine()`, () => {
	it(`should found 0 XMAS`, () => {
		expect(findInLine("xxx")).toEqual(0)
	})
	it(`should found 1 XMAS`, () => {
		expect(findInLine("XMAS")).toEqual(1)
	})
	it(`should found 2 XMAS that are not ordered and with noise`, () => {
		expect(findInLine("....X.MAS.XMAS..")).toEqual(2)
	})
	it(`should found 2 XMAS because 3rd one is nested`, () => {
		expect(findInLine("....XMAS.XMA.XMAS.SS..")).toEqual(2)
	})
})

describe(`findInLineReverse()`, () => {
	it(`should reverse find one XMAS in reverse`, () => {
		expect(findInLineReverse("SAMX")).toEqual(1)
	})
	it(`should reverse find two XMAS in reverse and with noise`, () => {
		expect(findInLineReverse("..SSAMXSASM-XX")).toEqual(1)
	})
})

describe(`cols2lines()`, () => {
	it(`should take first char from every line and add them to first col`, () => {
		expect(cols2Lines(["abc", "123", "xyz"])[0]).toEqual("a1x")
	})
	it(`should take char from every line and add them to columns`, () => {
		expect(cols2Lines(["abc", "123", "xyz"])).toEqual(["a1x", "b2y", "c3z"])
	})
})

describe(`findInColumns`, () => {
	it(`should find one XMAS in column`, () => {
		expect(findInColumns([".X..", ".M..", ".A..", ".S.."])).toEqual(1)
	})
	it(`should find two XMAS in column`, () => {
		expect(findInColumns([".X..X", ".M...", ".A..M", ".S..A", "....S"])).toEqual(2)
	})
})

describe(`findInColumnsReverse`, () => {
	it(`should find one XMAS in column`, () => {
		expect(findInColumnsReverse([".S..", ".A..", ".M..", ".X.."])).toEqual(1)
	})
	it(`should find two XMAS in column`, () => {
		expect(findInColumnsReverse([".S..S", ".A...", ".M..A", ".X..M", "....X"])).toEqual(2)
	})
})
