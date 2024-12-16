import { vol } from "memfs"
import { describe, expect, it, vi } from "vitest"

import { getData, horizontal } from "4a"
import { beforeEach } from "vitest"

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

	it(`should found 0 XMAS`, () => {
		const path = "/tmp/mock-file.txt"
		vol.fromJSON({ [path]: "XXXX" }, "/tmp")

		const test = horizontal(path)

		expect(test).to.eql(1)
	})
})
