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

export function sol() {
	return ""
}

/**
 * @param txt {string}
 * @returns {number}
 */
export function findInLine(txt) {
	const found = denoise(txt).split(XMAS)
	return found.length - 1
}

/**
 * @param line {string}
 * @returns {string}
 */
export function reverse(line) {
	return line.split('').reverse().join('')
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
	lines.forEach((l,lineIdx)=> {
		const line = l.split('')
		line.forEach((char, charIdx)=>{
			if(!cols[charIdx]) {
				cols[charIdx] = []
			}
			cols[charIdx][lineIdx] = char
		})
	})
	return cols.map(line => line.join(''))
}

/**
 * @param lines {string[]}
 * @returns {number}
 */
export function findInColumns(lines) {
	const cols = cols2Lines(lines)
	let cnt = 0
	for(let col of cols) {
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
	for(let col of cols) {
		cnt += findInLineReverse(col)
	}
	return cnt
}

