export const solution = (text: string) => {
    const partOne = undefined
    const partTwo = undefined
    return {
        text,
        partOne,
        partTwo,
    }
}

export function assemblyList(text: string) {
    const lines = text.split('\n')
    const stackIndexEnd = lines.findIndex((line) => line.match(/^ 1.*$/))
    const cols = lines
        .slice(0, stackIndexEnd)
        .map((vert) => vert.replace(/    /g, ' [ ]'))
        .map((vert) => vert.replace(/ /g, ''))
        .map((vert) => vert.replace(/\[/g, ''))
        .map((vert) => vert.replace(/\]$/, ''))
        .map((vert) => vert.replace(/\]/g, ','))
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
