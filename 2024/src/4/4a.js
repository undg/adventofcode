import fs from 'node:fs'

/** @param file {string} */
export function getData(file) {
	const data = fs.readFileSync(file)
	return data.toString()
}

const xmas = ['x','m','a','s']

/**
 * @param txt {string}
 * @returns {number}
 */
export function line(txt) {
	return 0
}

export function sol() {
	return ''
}
