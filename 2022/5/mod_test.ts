import {
    assertEquals,
    assertExists,
} from 'https://deno.land/std@0.167.0/testing/asserts.ts'
import {
    allMoves,
    createMoves,
    getMoves,
    move,
    parseMove,
    parseStack,
    solution,
    topFromStacks,
} from './mod.ts'

const min = await Deno.readTextFile('./min.txt')
const input = await Deno.readTextFile('./input.txt')

// solution to paste
const { partOne, partTwo } = solution(input)
console.log('Part One : ', partOne, '\nPart Two: ', partTwo)
console.log()

const test = solution(min)
console.log(min)

Deno.test('in->out', () => {
    assertEquals(test.text, min)
})

Deno.test({
    name: 'should exist',
    only: false,
    ignore: false,
    fn() {
        assertExists(parseStack(test.text))
    },
})

Deno.test({
    name: 'convert top file to list',
    only: false,
    ignore: false,
    fn() {
        assertEquals(parseStack(test.text), [
            ['N', 'Z'],
            ['D', 'C', 'M'],
            ['P'],
        ])
    },
})

Deno.test({
    name: 'parse move',
    only: false,
    ignore: false,
    fn() {
        assertEquals(parseMove('move 1 from 2 to 1'), {
            count: 1,
            from: 2,
            to: 1,
        })
    },
})

Deno.test({
    name: 'get all moves',
    only: false,
    ignore: false,
    fn() {
        assertEquals(getMoves(test.text), [
            'move 1 from 2 to 1',
            'move 3 from 1 to 3',
            'move 2 from 2 to 1',
            'move 1 from 1 to 2',
        ])
    },
})

Deno.test({
    name: 'creeate moves',
    only: false,
    ignore: false,
    fn() {
        assertEquals(createMoves(getMoves(test.text)), [
            { count: 1, from: 2, to: 1 },
            { count: 3, from: 1, to: 3 },
            { count: 2, from: 2, to: 1 },
            { count: 1, from: 1, to: 2 },
        ])
    },
})

Deno.test({
    name: 'move stack',
    only: false,
    ignore: false,
    fn() {
        assertEquals(
            move([['N', 'Z'], ['D', 'C', 'M'], ['P']], 'move 1 from 2 to 1'),
            [['D', 'N', 'Z'], ['C', 'M'], ['P']]
        )
        assertEquals(
            move([['N', 'Z'], ['D', 'C', 'M'], ['P']], 'move 2 from 1 to 3'),
            [[], ['D', 'C', 'M'], ['N', 'Z', 'P']]
        )
        assertEquals(
            move([['P', 'N', 'Z'], ['D', 'C', 'M'], []], 'move 3 from 1 to 3'),
            [[], ['D', 'C', 'M'], ['P', 'N', 'Z']]
        )
        assertEquals(
            move([[], ['D', 'C', 'M'], ['P', 'N', 'Z']], 'move 2 from 2 to 1'),
            [['D', 'C'], ['M'], ['P', 'N', 'Z']]
        )
    },
})

Deno.test({
    name: 'all moves',
    only: false,
    ignore: false,
    fn() {
        assertEquals(
            allMoves([['N', 'Z'], ['D', 'C', 'M'], ['P']], test.text),
            [['M'], ['C'], ['D', 'N', 'Z', 'P']]
        )
    },
})

Deno.test({
    name: 'PartOne solution',
    only: false,
    ignore: false,
    fn() {
        assertEquals(topFromStacks([['N', 'Z'], ['D', 'C', 'M'], ['P']]), 'NDP')
    },
})
