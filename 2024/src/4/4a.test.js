import { vol } from "memfs"
import { describe, expect, it, vi } from "vitest"

import { beforeEach } from "vitest"
import { denoise, getData, line } from "./4a"

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

describe(`sol1`, () => {
	it(`should return same simpleInput`, () => {
		const path = "/tmp/mock-file.txt"
		vol.fromJSON({ [path]: simpleInput }, "/tmp")
		expect(getData(path)).toBe(simpleInput)
	})

	describe(`line()`, () => {
		it(`should found 0 XMAS`, () => {
			expect(line("xxx")).toEqual(0)
		})
		it(`should found 1 XMAS`, () => {
			expect(line("XMAS")).toEqual(1)
		})
		it(`should found 2 XMAS that are not ordered and with noise`, () => {
			expect(line("....X.MAS.XMAS..")).toEqual(2)
		})
		it(`should found 2 XMAS because 3rd one is nested`, () => {
			expect(line("....XMAS.XMA.XMAS.SS..")).toEqual(2)
		})
	})

	describe(`denoise()`, () => {
		it(`should remove all characters`, () => {
			expect(denoise('na_xma5')).toEqual('')
		})
		it(`should keep one XMAS`, () => {
			expect(denoise('XMAS')).toEqual('XMAS')
		})
		it(`should keep one XMAS and remove extra chars`, () => {
			expect(denoise('-X__MA__S_')).toEqual('XMAS')
		})
		it(`should keep one XMAS and remove extra char that is one of 'XMAS'`, () => {
			expect(denoise('XMXAS')).toEqual('XMAS')
		})

		it(`should keep two XMAS`, () => {
			expect(denoise('XMASXMAS')).toEqual('XMASXMAS')
		})
		it(`should keep two XMAS and remove extra chars`, () => {
			expect(denoise('-XM--ASXM--AS---')).toEqual('XMASXMAS')
		})
		it(`should keep three XMAS and remove extra chars`, () => {
			expect(denoise('-XM-MASXMX-AS-XMAAXAS--')).toEqual('XMASXMASXMAS')
		})
		it(`should remove extra S`, () => {
			expect(denoise('XMASS')).toEqual('XMAS')
		})
	})
})
