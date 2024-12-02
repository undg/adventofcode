import fs from "node:fs"

function getData() {
		const lg = []
		const rg = []

		const data = fs
			.readFileSync("1.txt", "UTF8")
			.split("\n")
			.map((el) => el.replace("  ", "").split(" "))
			.filter((el) => el)

		for (const [lhs, rhs] of data) {
			if (rhs === undefined || lhs === "") {
				continue
			}
			lg.push(lhs)
			rg.push(rhs)
		}

	return {lg, rg}
}

function solution1() {
	try {
		const {lg, rg} = getData()

		const lgSorted = lg.sort()
		const rgSorted = rg.sort()

		let distance = 0

		for (const i in lgSorted) {
			const lhs = lgSorted[i]
			const rhs = rgSorted[i]
			distance += Math.abs(lhs - rhs)
		}

		return distance
	} catch (err) {
		console.log(err)
	}
}

console.log(solution1())

function solution2() {
	try {
		const {lg, rg} = getData()

		let similarity = 0

		for (const i in lg) {
			const lhs = lg[i]
			const multi = rg.filter(rhs=>rhs === lhs)?.length ?? 0
			similarity += (lhs * multi)
		}

		return similarity
	} catch (err) {
		console.log(err)
	}
}

console.log(solution2())
