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
  aim: number;
}
function getPosition(inputs: Inputs[]): Position {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const input of inputs) {
    if (input.direction === "forward") {
      horizontal = horizontal + input.value;
      depth = depth + aim * input.value;
    }
    if (input.direction === "up") {
      aim = aim - input.value;
    }
    if (input.direction === "down") {
      aim = aim + input.value;
    }
  }
  return { horizontal, depth, aim };
}

const inputs = parseInput(inputData);
console.log(`inputs:\n`, inputs);
const position = getPosition(inputs);
console.log(`position:\n`, position);

console.log(`⭐\n`, position.horizontal * position.depth);
