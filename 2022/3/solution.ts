const min = await Deno.readTextFile('./min.txt')
const input = await Deno.readTextFile('./input.txt')

const solution = (text: string) => {
    const txt = text.trim().split('\n')
    const rucksacks = txt.map(createCompartment)
    const groups = createGroup(txt)
    const partOne = rucksacks.reduce((agg, curr) => agg + curr.priority, 0)
    const partTwo = groups.reduce((agg, curr) => agg + curr.priority, 0)

    return {
        text,
        rucksacks,
        groups,
        partOne,
        partTwo,
    }
}

interface Group {
    group: string[]
    common: string
    priority: number
}

function createGroup(rucksacks: string[]): Group[] {
    const set = new Set<Group>()

    const chunkSize = 3
    for (let i = 0; i < rucksacks.length; i += chunkSize) {
        const group = rucksacks.slice(i, i + chunkSize)

        const first = group[0]
        const second = group[1]
        const third = group[2]

        let common = ''
        for (const l1 of Array.from(first)) {
            if (second.includes(l1)) {
                if (third.includes(l1)) {
                    common = l1
                    break
                }
            }
        }

        set.add({
            group,
            common,
            priority: letter2Priority(common),
        })
    }
    return Array.from(set)
}

interface Rucksack {
    compartments: [string, string]
    common: string
    priority: number
}

function createCompartment(rucksack: string): Rucksack {
    const first = rucksack.substring(0, rucksack.length / 2)
    const second = rucksack.substring(rucksack.length / 2)

    let common = ''
    for (const letter of Array.from(first)) {
        if (second.includes(letter)) {
            common = letter
            break
        }
    }

    return {
        compartments: [first, second],
        common,
        priority: letter2Priority(common),
    }
}

function letter2Priority(letter: string): number {
    const code = letter.charCodeAt(0)
    const upperCase = code <= 91
    return upperCase ? code - 38 : code - 96
}

// solution to paste
const { partOne, partTwo } = solution(input)
console.log('Part One : ', partOne, '\nPart Two: ', partTwo)

// Fuck reading console log
import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts'

const test = solution(min)
Deno.test('test1', () => {
    assertEquals(test.rucksacks[0].compartments, [
        'vJrwpWtwJgWr',
        'hcsFMMfFFhFp',
    ])
    assertEquals(test.rucksacks[1].compartments, [
        'jqHRNqRjqzjGDLGL',
        'rsFMfFZSrLrFZsSL',
    ])
    assertEquals(test.rucksacks[2].compartments, ['PmmdzqPrV', 'vPwwTWBwg'])
})

Deno.test('test2', () => {
    assertEquals(test.rucksacks[0].common, 'p') // p
    assertEquals(test.rucksacks[1].common, 'L') // L
    assertEquals(test.rucksacks[2].common, 'P') // P
    assertEquals(test.rucksacks[3].common, 'v') // v
    assertEquals(test.rucksacks[4].common, 't') // t
    assertEquals(test.rucksacks[5].common, 's') // s
})

Deno.test('test helper letter2Priority', () => {
    assertEquals(letter2Priority('a'), 1)
    assertEquals(letter2Priority('z'), 26)
    assertEquals(letter2Priority('A'), 27)
    assertEquals(letter2Priority('Z'), 52)
})

Deno.test('test3', () => {
    assertEquals(test.rucksacks[0].priority, 16) // p
    assertEquals(test.rucksacks[1].priority, 38) // L
    assertEquals(test.rucksacks[2].priority, 42) // P
    assertEquals(test.rucksacks[3].priority, 22) // v
    assertEquals(test.rucksacks[4].priority, 20) // t
    assertEquals(test.rucksacks[5].priority, 19) // s
})
Deno.test('test4, sum of priorities', () => {
    assertEquals(test.partOne, 157)
})

// PART TWO
//////////////////////////////
Deno.test('test5', () => {
    assertEquals(test.groups[0].group, [
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
    ])
    assertEquals(test.groups[1].group, [
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
    ])
})

Deno.test('test4, sum of priorities', () => {
    assertEquals(test.partTwo, 70)
})
