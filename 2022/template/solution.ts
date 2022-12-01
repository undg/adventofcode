const min = await Deno.readTextFile("./min.txt");
const input = await Deno.readTextFile("./input.txt");

const solution = (text: string) => {
  const partOne = undefined;
  const partTwo = undefined;
  return {
    text,
    partOne,
    partTwo,
  };
};

// solution to paste
const { partOne, partTwo } = solution(input);
console.log("Part One : ", partOne, "\nPart Two: ", partTwo);

// Fuck reading console log
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const test = solution(min);
Deno.test("sum top 3", () => {
  assertEquals(test.text, "");
});
