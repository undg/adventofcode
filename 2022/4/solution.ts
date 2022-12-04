const min = await Deno.readTextFile('./min.txt')
const input = await Deno.readTextFile('./input.txt')

interface Range {
    from: number
    to: number
}

const solution = (text: string) => {
    const input = text.trim().split('\n')
    const pairs = input.map(ranges)

    const partOne = pairs.reduce((a, c) => (isContained(c) ? a + 1 : a), 0)
    const partTwo = pairs.reduce((a, c) => (isOverlap(c) ? a + 1 : a), 0)
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

function isOverlap(rr: Range[]) {
    const r = [...rr].sort((a,b)=>a.to-b.to)
    return isContained(r) || r[0].to >= r[1].from || r[0].from >= r[1].to
}

// solution to paste
const { partOne, partTwo } = solution(input)
console.log('Part One : ', partOne, '\nPart Two: ', partTwo)

// Fuck reading console log
import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts'

const test = solution(min)
Deno.test('test5', () => {
    assertEquals(test.partTwo, 4)
})

Deno.test('test4, helper', () => {
    assertEquals(isOverlap(ranges('7-97,3-6')), false)
    assertEquals(isOverlap(ranges('2-4,6-8')), false)
    assertEquals(isOverlap(ranges('2-6,6-8')), true)
    assertEquals(isOverlap(ranges('7-9,1-7')), true)
    assertEquals(isOverlap(ranges('7-8,1-9')), true)
    assertEquals(isOverlap(ranges('1-9,7-8')), true)
    assertEquals(isOverlap(ranges('1-2,7-8')), false)
    assertEquals(isOverlap(ranges('82-82,8-83')), true)
    assertEquals(isOverlap(ranges('6-98,6-93')), true)
    assertEquals(isOverlap(ranges('56-77,55-82')), true)
    assertEquals(isOverlap(ranges('51-68,51-61')), true)
    assertEquals(isOverlap(ranges('4-90,3-67')), true)
    assertEquals(isOverlap(ranges('29-30,29-97')), true)
    assertEquals(isOverlap(ranges('42-88,13-87')), true)
    assertEquals(isOverlap(ranges('17-95,33-96')), true)
    assertEquals(isOverlap(ranges('11-56,12-56')), true)
    assertEquals(isOverlap(ranges('16-90,89-94')), true)
    assertEquals(isOverlap(ranges('74-79,78-80')), true)
    assertEquals(isOverlap(ranges('20-82,19-87')), true)
    assertEquals(isOverlap(ranges('4-86,5-85')), true)
    assertEquals(isOverlap(ranges('37-54,37-55')), true)
    assertEquals(isOverlap(ranges('15-92,16-91')), true)
    assertEquals(isOverlap(ranges('48-93,3-92')), true)
    assertEquals(isOverlap(ranges('23-47,7-47')), true)
    assertEquals(isOverlap(ranges('75-77,2-76')), true)
    assertEquals(isOverlap(ranges('35-88,35-87')), true)
    assertEquals(isOverlap(ranges('56-64,65-89')), false)
    assertEquals(isOverlap(ranges('17-80,18-79')), true)
    assertEquals(isOverlap(ranges('28-87,27-88')), true)
    assertEquals(isOverlap(ranges('6-62,61-63')), true)
    assertEquals(isOverlap(ranges('25-85,24-25')), true)
    assertEquals(isOverlap(ranges('10-72,12-72')), true)
    assertEquals(isOverlap(ranges('54-71,44-70')), true)
    assertEquals(isOverlap(ranges('20-96,97-99')), false)
    assertEquals(isOverlap(ranges('19-46,14-47')), true)
})

Deno.test('test3', () => {
    assertEquals(test.partOne, 2)
})
Deno.test('test2, helper', () => {
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
