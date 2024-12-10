import * as cheerio from "cheerio"

/** @param url {string} */
export async function crawl(url) {
	const html = await fetch(url)
	const text = await html.text()
	const $ = cheerio.load(text)

	const table = $("tbody tr:not(:first-child)")
		.toArray()
		.map((tr) =>
			$(tr)
				.children()
				.map((_, td) => $(td).text())
				.get(),
		)

	return table
}

/**
 * @param {string[][]} arr - 2d array with structure [x, char, y]
 * @example input
 * [
 *   ['0', '█', '0'],
 *   ['0', '█', '1']
 * ]
 * @returns {{ x: number, y: number }} max index of x and y
 */
export function getMax(arr) {
	/** @type {number} */
	let x = 0
	/** @type {number} */
	let y = 0

	for (const char of arr) {
		const [currX, _, currY] = char
		x = +currX > x ? +currX : x
		y = +currY > y ? +currY : y
	}

	return { x, y }
}

/**
 * @param {{ x: number, y: number }} xy max index of x and y
 * @returns {string[][]} matrix of rows and cols
 */
export function createMatrix({ x, y }) {
	const fillCols = () => " "
	const fillRows = () => Array.from({ length: x + 1 }, fillCols)
	const rows = Array.from({ length: y + 1 }, fillRows)
	return rows
}

/**
 * @param {string[][]} matrix - matrix with char's, rowsCols[][]
 * @param {string[][]} arr - 2d array with structure [x, char, y]
 */
export function fillMatrix(matrix, arr) {
	const m = structuredClone(matrix)
	arr.forEach(([col, char, row]) => {
		m[row][col] = char
	})

	return m.reverse()
}

/** @param url {string} */
export async function getLetter(url) {
	const arrFromHtml = await crawl(url)
	const matrix = fillMatrix(createMatrix(getMax(arrFromHtml)), arrFromHtml)
	return matrix.map((row) => row.join("")).join("\n")
}

;(async () => {
	const url2 =
		"https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub"
	console.log(await getLetter(url2))
})()
