"use strict"

import fs from "node:fs"

/** @param file {string} */
export function getData(file) {
	const data = fs.readFileSync(file)
	return data.toString()
}

const XMAS = "XMAS"

/**
 * @param line {string}
 * @returns {string}
 */
export function denoise(line) {
	let out = ""
	let buf = ""

	for (let char of line) {
		for (let cXmas of XMAS) {
			if (cXmas !== char) {
				continue
			}

			if (buf === XMAS) {
				buf = "" // reset buffer

				if (char === "X") {
					buf += char
					out += char
				}
				continue
			}

			if (buf.includes(cXmas)) {
				continue
			}

			out += char
			buf += char
		}
	}
	return out
}

/**
 * @param line {string}
 * @returns {number}
 */
export function findInLine(line) {
	const found = denoise(line).split(XMAS)
	return found.length - 1
}

/**
 * @param line {string}
 * @returns {string}
 */
export function reverse(line) {
	return line.split("").reverse().join("")
}

/**
 * @param line {string}
 * @returns {number}
 */
export function findInLineReverse(line) {
	const found = reverse(denoise(line)).split(XMAS)

	return found.length - 1
}

/**
 * @param lines {string[]}
 * @returns {string[]}
 */
export function cols2Lines(lines) {
	const cols = []

	lines.forEach((l, lineIdx) => {
		const line = l.split("")

		line.forEach((char, charIdx) => {
			if (!cols[charIdx]) {
				cols[charIdx] = []
			}

			cols[charIdx][lineIdx] = char
		})
	})

	return cols.map((line) => line.join(""))
}

/**
 * @param lines {string[]}
 * @returns {number}
 */
export function findInColumns(lines) {
	const cols = cols2Lines(lines)
	let cnt = 0

	for (let col of cols) {
		cnt += findInLine(col)
	}

	return cnt
}

/**
 * @param lines {string[]}
 * @returns {number}
 */
export function findInColumnsReverse(lines) {
	const cols = cols2Lines(lines)
	let cnt = 0

	for (let col of cols) {
		cnt += findInLineReverse(col)
	}

	return cnt
}

//   a b c
//   1 2 3
//   x y z
/**
 * @param lines {string[]}
 * @returns {string[]}
 */
export function left2right(lines) {
	const diag = []

	lines.forEach((l, row) => {
		const line = l.split("")

		line.forEach((char, col) => {
			const diagRowIdx = lines.length - 1 - row  + col
			const diagColIdx = col

			if (!diag[diagRowIdx]) {
				diag[diagRowIdx] = []
			}

			diag[diagRowIdx][diagColIdx] = char
		})
	})

	return diag.map((line) => line.join(""))
}

/**
 * @param lines {string[]}
 * @returns {string[]}
 */
export function right2left(lines) {
	return left2right(cols2Lines(lines))
}

export function main() {
	const lines = getData('4.txt').split('\n').filter(el=>!!el)
	const columns = cols2Lines(lines)
	const diagLeft = left2right(lines)
	const diagRight = right2left(lines)

	let cnt = 0

	for(let line of lines) {
		cnt += findInLine(line)
		cnt += findInLineReverse(line)
	}

	for(let line of columns) {
		cnt += findInLine(line)
		cnt += findInLineReverse(line)
	}

	for(let line of diagLeft) {
		cnt += findInLine(line)
		cnt += findInLineReverse(line)
	}

	for(let line of diagRight) {
		cnt += findInLine(line)
		cnt += findInLineReverse(line)
	}

	return cnt
}

console.time("execution time")
console.log(main())
console.timeEnd("execution time")
