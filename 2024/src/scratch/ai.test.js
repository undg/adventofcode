import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"

import { crawl, createMatrix, fillMatrix, getLetter, getMax } from "./ai"
import { expect, it } from "vitest"
import { afterAll } from "vitest"
import { beforeAll } from "vitest"
import { afterEach } from "vitest"

import fs from "node:fs"
import { join } from "node:path"

/*
0█00█10█21▀11▀22▀12▀23▀2
*/

const url =
	"https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub"

const html = fs.readFileSync(
	join(__dirname, "../__mocks__/fixtures/gd.html"),
	"utf-8",
)

const arrFromHtml = [
	["0", "█", "0"],
	["0", "█", "1"],
	["0", "█", "2"],
	["1", "▀", "1"],
	["1", "▀", "2"],
	["2", "▀", "1"],
	["2", "▀", "2"],
	["3", "▀", "2"],
]

const arrFromHtml2 = [
	["1", "█", "0"],
	["1", "█", "1"],
	["1", "█", "2"],
	["1", "█", "3"],
	["2", "▀", "3"],
]

const server = setupServer(
	http.get(url, () => {
		return HttpResponse.text(html)
	}),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it(`should return matrix with lenght 8`, async () => {
	const test = await crawl(url)
	expect(test).toHaveLength(8)
})

it(`should get data from url as 2d array`, async () => {
	const test = await crawl(url)

	expect(test).toEqual(arrFromHtml)
})

it(`getMax() should have property x and y`, () => {
	const max = getMax(arrFromHtml)

	expect(max).toHaveProperty("x")
	expect(max).toHaveProperty("y")
})

it(`getMax() should get max value of x and y`, () => {
	const { x, y } = getMax(arrFromHtml)
	expect(y).toEqual(2) // row
	expect(x).toEqual(3) // col
})

it(`should createMatrix() with 3 columns and 2 rows`, () => {
	const rows = createMatrix(getMax(arrFromHtml))
	expect(rows).toBeDefined()
	expect(rows).toHaveLength(3)
	for (const row of rows) {
		const cols = row
		expect(cols).toHaveLength(4)
	}
})

it(`should createMatrix() prefilled with spaces`, () => {
	const rows = createMatrix(getMax(arrFromHtml))
	for (const row of rows) {
		for (const col of row) {
			expect(col).toEqual(" ")
		}
	}
})

it(`should have function fillMatrix`, () => {
	const matrix = fillMatrix(createMatrix(getMax(arrFromHtml)), arrFromHtml)
	expect(matrix).toBeDefined()
})

it(`should fill all character with space or with char from table`, () => {
	const matrix = fillMatrix(createMatrix(getMax(arrFromHtml)), arrFromHtml)
	const matrix2 = fillMatrix(createMatrix(getMax(arrFromHtml2)), arrFromHtml2)
	expect(matrix[0][0]).toEqual("█")
	expect(matrix2[0][0]).toEqual(' ')
	expect(matrix).toEqual([
		["█", "▀", "▀", "▀"],
		["█", "▀", "▀", " "],
		["█", " ", " ", " "],
	])
})

it(`should show letter`, async () => {
	const letter = await getLetter(url)
	expect(letter).toBeDefined()
	expect(letter).toEqual(`█▀▀▀
█▀▀ 
█   `)
})

