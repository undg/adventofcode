import fs from 'node:fs'

/** @param file {string} */
export function getData(file) {
	const data = fs.readFileSync(file)
	return data.toString()
}

const xmas = ['X','M','A','S']

/**
 * @param txt {string}
 * @returns {number}
 */
export function line(txt) {
	return 0
}

/**
 * @param txt {string}
 * @returns {string}
 */
export function stripLine(txt) {
	const stripped = txt
	return stripped
}

export function sol() {
	return ''
}
