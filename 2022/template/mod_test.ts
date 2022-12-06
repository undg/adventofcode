import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solution } from "./mod.ts";

const min = await Deno.readTextFile("./min.txt");
const input = await Deno.readTextFile("./input.txt");

// solution to paste
const { partOne, partTwo } = solution(input);
console.log("Part One : ", partOne, "\nPart Two: ", partTwo);
console.log()


const test = solution(min);
console.log(min)
Deno.test("in->out", () => {
  assertEquals(test.text, min);
});
