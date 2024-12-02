function validParentheses(parenStr: string) {
	let cnt = 0
	for (const char of parenStr) {
		if (char === "(") cnt++
		if (char === ")") cnt--
		if (cnt < 0) return false
	}

	return cnt === 0
}
/** /
console.log('true', validParentheses("(()(()()))"))
console.log('false', validParentheses("()("))
console.log('false', validParentheses(")("))
console.log('true', validParentheses("()"))
console.log('false', validParentheses("("))
/*/
/**/

function anagram(w1: string, w2: string) {
	let second = w2
	for (const char of w1) {
		if (second.includes(char)) {
			second = second.replace(char, "")
		} else {
			return false
		}
	}

	return second === ""
}

/** /
console.log('False', anagram('apple', 'pale'))
console.log('False', anagram('cat', 'act '))
console.log('False', anagram('foo', 'bar'))
console.log('False', anagram('hello', 'helo'))
console.log('False', anagram('hello', 'world'))
console.log('False', anagram('python', 'javascript'))
console.log('False', anagram('race', 'case'))
console.log('False', anagram('astronomer', 'moon starer'))
console.log('True', anagram('aab', 'aba'))
console.log('True', anagram('cinema', 'iceman'))
console.log('True', anagram('debit card', 'bad credit'))
console.log('True', anagram('deductions', 'discounted'))
console.log('True', anagram('dusty', 'study'))
console.log('True', anagram('eleven plus two', 'twelve plus one'))
console.log('True', anagram('listen', 'silent'))
/*/
/**/

function longestRepetition(text: string): [string, number] {
	if (text === "") return ["", 0]

	const stack: string[] = [] // ['aaa', 'bb', 'aaaaa']

	for (const char of text) {
		if (stack.length === 0) {
			stack.push(char)
			continue
		}

		if (stack[stack.length - 1].charAt(0) === char) {
			stack[stack.length - 1] += char
		} else {
			stack.push(char)
			continue
		}
	}

	const cntArr = stack.map((chars) => chars.length)

	let cntMax = 0
	let indexMax = 0
	for (const i in cntArr) {
		if (cntMax < cntArr[i]) {
			cntMax = cntArr[i]
			indexMax = +i
		}
	}

	return [stack[indexMax].charAt(0), cntArr[indexMax]]
}

/** /
;[
	[longestRepetition("aaaabb"), ["a", 4]],
	[longestRepetition("bbbaaabaaaa"), ["a", 4]],
	[longestRepetition("cbdeuuu900"), ["u", 3]],
	[longestRepetition("abbbbb"), ["b", 5]],
	[longestRepetition("aabb"), ["a", 2]],
	[longestRepetition("ba"), ["b", 1]],
	[longestRepetition(""), ["", 0]],
].forEach(([test, eq]) => {
	console.log(test, eq, JSON.stringify(test) == JSON.stringify(eq))
})
/*/
/**/

function parseTime(s: number): string {
	const m = Math.floor(s / 60)
	const h = Math.floor(m / 60)

	const sRest = s % 60
	const mRest = m % 60

	const pad = (s: number) => s.toString().padStart(2, "0")

	return `${pad(h)}:${pad(mRest)}:${pad(sRest)}`
}
/** /
;[
	[parseTime(60), "00:01:00"],
	[parseTime(61), "00:01:01"],
	[parseTime(59), "00:00:59"],
	[parseTime(0), "00:00:00"],
	[parseTime(3599), "00:59:59"],
	[parseTime(3600), "01:00:00"],
	[parseTime(86399), "23:59:59"],
	[parseTime(86400), "24:00:00"],
	[parseTime(90000), "25:00:00"],
	[parseTime(3661), "01:01:01"],
	[parseTime(7200), "02:00:00"],
].forEach(([test, eq]) => {
	console.log(test, eq, test === eq)
})
/*/
/**/

function sudokuValidation(board: number[][]): boolean {
	const cols: number[][] = [[], [], []]
	const rows: number[][] = [[], [], []]
	const colsI: string[][] = []
	const rowsI: string[][] = []

	const isValid = (arr: number[]): boolean =>
		[...arr].sort((a, b) => a - b).join("") === "123456789"

	for (const sqIdx in board) {
		const square = board[sqIdx]

		// have zero -> invalid
		if (square.find((cell) => cell === 0)) {
			return false
		}

		if (!isValid(square)) {
			return false
		}

		for (const cellIdx in square) {
			let rowIdx = 3 * Math.floor(+sqIdx / 3) + Math.floor(+cellIdx / 3)
			let colIdx = 3 * (+sqIdx % 3) + (+cellIdx % 3)

			if (!cols[colIdx]) cols[colIdx] = []
			cols[colIdx][rowIdx] = board[sqIdx][cellIdx]

			if (!colsI[colIdx]) colsI[colIdx] = []
			colsI[colIdx][rowIdx] = `${sqIdx},${cellIdx}[${colIdx},${rowIdx}]`

			if (!rows[rowIdx]) rows[rowIdx] = []
			rows[rowIdx][colIdx] = board[sqIdx][cellIdx]
		}
	}

	console.table(cols) // 5, 3, 4, 8, 5, 9, 9, 6, 1, 
	// console.table(rows) // 5, 6, 1, 8, 4, 7, 9, 2, 3,
	console.table(colsI)

	for (const col of cols) {
		if (!isValid(col)) return false
	}

	for (const row of rows) {
		if (!isValid(row)) return false
	}

	return false
}
/**/
;[
	[
		sudokuValidation([
			[5, 3, 4, 6, 7, 8, 9, 1, 2],
			[6, 7, 2, 1, 9, 5, 3, 4, 8],
			[1, 9, 8, 3, 4, 2, 5, 6, 7],
			[8, 5, 9, 7, 6, 1, 4, 2, 3],
			[4, 2, 6, 8, 5, 3, 7, 9, 1],
			[7, 1, 3, 9, 2, 4, 8, 5, 6],
			[9, 6, 1, 5, 3, 7, 2, 8, 4],
			[2, 8, 7, 4, 1, 9, 6, 3, 5],
			[3, 4, 5, 2, 8, 6, 1, 7, 9],
		]),
		"True",
	],
	// [
	// 	sudokuValidation([
	// 		[5, 3, 4, 6, 7, 8, 9, 1, 2],
	// 		[6, 7, 2, 1, 9, 0, 3, 4, 8],
	// 		[1, 0, 0, 3, 4, 2, 5, 6, 0],
	// 		[8, 5, 9, 7, 6, 1, 0, 2, 0],
	// 		[4, 2, 6, 8, 5, 3, 7, 9, 1],
	// 		[7, 1, 3, 9, 2, 4, 8, 5, 6],
	// 		[9, 0, 1, 5, 3, 7, 2, 1, 4],
	// 		[2, 8, 7, 4, 1, 9, 6, 3, 5],
	// 		[3, 0, 0, 4, 8, 1, 1, 7, 9],
	// 	]),
	// 	"False",
	// ],
].forEach(([test, eq]) => {
	console.log(test, eq)
})
/*/
/**/
