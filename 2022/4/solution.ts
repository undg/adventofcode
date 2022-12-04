const min = await Deno.readTextFile('./min.txt')
const input = await Deno.readTextFile('./input.txt')

interface Range {
    from: number
    to: number
}

interface Pair {
    elves: Range[]
    contained: boolean
}

const solution = (text: string) => {
    const input = text.trim().split('\n')
    const pairs = input.map(pair)

    const partOne = pairs.reduce((a, c) => (c.contained ? a + 1 : a), 0)
    const partTwo = undefined
    return {
        text,
        pairs,
        partOne,
        partTwo,
    }
}

function ranges(txt: string): Range[] {
    const ranges = txt.split(',').map((range) => range.split('-'))
    return [
        { from: +ranges[0][0], to: +ranges[0][1] },
        { from: +ranges[1][0], to: +ranges[1][1] },
    ]
}

function isContained(r: Range[]) {
    return (
        (r[0].from <= r[1].from && r[0].to >= r[1].to) ||
        (r[0].from >= r[1].from && r[0].to <= r[1].to)
    )
}

function pair(txt: string): Pair {
    const elves = ranges(txt)
    const contained = isContained(elves)
    return { elves, contained }
}

// solution to paste
const { partOne, partTwo } = solution(input)
console.log('Part One : ', partOne, '\nPart Two: ', partTwo)

// Fuck reading console log
import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts'

const test = solution(min)
Deno.test('test', () => {
    assertEquals(test.partOne, 2)
})
Deno.test('test1, helper', () => {
    assertEquals(ranges('2-4,6-8'), [
        { from: 2, to: 4 },
        { from: 6, to: 8 },
    ])
})
Deno.test('test1, helper', () => {
    assertEquals(isContained(ranges('2-4,6-8')), false)
    assertEquals(isContained(ranges('3-9,5-8')), true)
    assertEquals(isContained(ranges('5-8,3-9')), true)
})
