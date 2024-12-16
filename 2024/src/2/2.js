import fs from "node:fs"

function getData() {
	const data = fs
		.readFileSync("2.txt", "UTF8")
		.split("\n")
		.map((el) => el.split(" "))
		.filter((el) => el[0] !== "")
		.map((arr) => arr.map((n) => +n))
	return data
}

function sol1() {
	let safeReports = 0
	for (const data of getData()) {
		let increasing = isIncreasing(data)
		let decresing = isDecreasing(data)
		let safe = increasing || decresing
		if (safe) safeReports++
	}
	return safeReports
}

/** @param arr {number[]} */
function isIncreasing(arr) {
	let safe = true

	for (let i = 1; i <= arr.length - 1; i++) {
		const prev = arr[i - 1]
		const curr = arr[i]
		if (!safe) break
		if (Math.abs(prev - curr) > 3) safe = false
		if (Math.abs(prev - curr) === 0) safe = false
		if (prev < curr) safe = false
	}

	return safe
}

/** @param arr {number[]} */
function isDecreasing(arr) {
	let safe = true

	for (let i = 1; i <= arr.length - 1; i++) {
		const prev = arr[i - 1]
		const curr = arr[i]
		if (!safe) break
		if (Math.abs(prev - curr) > 3) safe = false
		if (Math.abs(prev - curr) === 0) safe = false
		if (prev > curr) safe = false
	}

	return safe
}

console.log('sol1:', sol1())

function sol2() {
	let safeReports = 0

	for (const data of getData()) {
		let increasing = isIncreasing(data)
		let decresing = isDecreasing(data)
		let safe = increasing || decresing

		if (!safe) {
			for (let i in data) {
				const dumped = data.filter((_, idx) => +idx !== +i)
				if (isIncreasing(dumped) || isDecreasing(dumped)) {
					safe = true
				}
			}
		}

		if (safe) safeReports++
	}

	return safeReports
}

console.log('sol2:',sol2())
