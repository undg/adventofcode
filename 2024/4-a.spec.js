import { vi, describe, it, expect } from "vitest"
import {fs, vol} from 'memfs'

import { sol, getData } from "4-a.js"
import { beforeEach } from "vitest"


vi.mock('node:fs')
vi.mock('node:fs/promises')

beforeEach(()=>{
	vol.reset()
})

const simpleInput = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`

it(`should return correct path`, () => {
	const path = '/in-memory-file-path.txt'
	fs.writeFileSync(path, simpleInput)

	const text = getData(path)

	expect(text).toBe(simpleInput)
})

