export const solution = (text: string) => {
    const partOne = topFromStacks( allMoves(parseStack(text), text) )
    const partTwo = undefined
    return {
        text,
        partOne,
        partTwo,
    }
}

export function parseStack(text: string) {
    const lines = text.split('\n')
    const stackIndexEnd = lines.findIndex((line) => line.match(/^ 1.*$/))
    const cols = lines
        .slice(0, stackIndexEnd)
        .map((vert) =>
            vert
                .replace(/ {4}/g, ' [ ]')
                .replace(/ /g, '')
                .replace(/\[/g, '')
                .replace(/\]$/, '')
                .replace(/\]/g, ',')
        )
        .map((vert) => vert.split(','))

    // flip stack 90deg
    let stacks: string[][] = [[]]
    cols.forEach((col, idxCol) => {
        col.forEach((value, idxRow) => {
            if (!stacks) stacks = [[value]]
            else if (!stacks[idxRow]) stacks[idxRow] = [value]
            stacks[idxRow][idxCol] = value
        })
    })

    // cleaning empty values
    stacks.forEach((stack, idxRow) => {
        stacks[idxRow] = stack.filter((v) => v !== '')
    })

    return stacks
}

export function parseMove(line: string) {
    const raw = line.split(/ /)
    return { count: +raw[1], from: +raw[3], to: +raw[5] }
}

export function getMoves(text: string) {
    const lines = text.split('\n')
    return lines.filter((line) => line.match(/^move/))
}

export function createMoves(moves: string[]) {
    return moves.map(parseMove)
}

export function move(stack: string[][], moveTxt: string) {
    const move = parseMove(moveTxt)
    const elToMove = stack[move.from - 1].slice(0, move.count) // save firsn n elements
    stack[move.from - 1].splice(0, move.count) // and delete them from orig
    stack[move.to - 1].splice(0, 0, ...elToMove) // and prepend them
    return stack
}

export function allMoves(stackIn: string[][], text: string) {
    const moves = getMoves(text)
    const stackOut = moves.reduce((stackPrev: string[][] | null, moveTxt) => {
        if (stackPrev === null) return move(stackIn, moveTxt)
        else return move(stackPrev, moveTxt)
    }, null)
    return stackOut as string[][]
}

export function topFromStacks(stackAll: string[][]) {
    return stackAll.reduce((acc,curr)=>acc+curr[0],'')
}
