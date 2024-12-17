import fs from "node:fs"

/** @param file {string} */
export function getData(file) {
	const data = fs.readFileSync(file)
	return data.toString()
}

const XMAS = "XMAS"

/**
 * @param txt {string}
 * @returns {number}
 */
export function line(txt) {
	const found = denoise(txt).split(XMAS)
	return found.length - 1
}

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
