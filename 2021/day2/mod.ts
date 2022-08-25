import { inputData } from "./input.ts";
interface Inputs {
  direction: string;
  value: number;
}
function parseInput(input: string): Inputs[] {
  const newLines = input.split(/\r?\n/);
  return newLines
    .map((s) => s.split(" "))
    .map((s) => ({ direction: s[0], value: +s[1] }));
}

interface Position {
  horizontal: number;
  depth: number;
}
function getPosition(inputs: Inputs[]): Position {
  let horizontal = 0;
  let depth = 0;

  for (const input of inputs) {
    if (input.direction === "forward") {
      horizontal = horizontal + input.value;
    }
    if (input.direction === "up") {
      depth = depth - input.value;
    }
    if (input.direction === "down") {
      depth = depth + input.value;
    }
  }
  return { horizontal, depth };
}

const inputs = parseInput(inputData);
console.log(`inputs:\n`, inputs);
const position = getPosition(inputs);
console.log(`position:\n`, position);

console.log(`⭐\n`, position.horizontal * position.depth)
