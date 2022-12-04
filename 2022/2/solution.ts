const min = await Deno.readTextFile("./min.txt");
const input = await Deno.readTextFile("./input.txt");

const solution = (text: string) => {

  const shapeMy = {
    X: 1,
    Y: 2,
    Z: 3,
  } as const;
  type ShapeMe = keyof typeof shapeMy;

  const shapeYou = {
    A: 1,
    B: 2,
    C: 3,
  } as const;
  type ShapeYou = keyof typeof shapeYou;

  type Shape = "rock" | "paper" | "scissor";

  const result = {
    loose: 0,
    win: 3,
    draw: 6,
  } as const;

  type ShapeMeOrYou = keyof typeof shapeMy | keyof typeof shapeYou;

  function translate(key: ShapeMeOrYou) {
    const shape: Record<ShapeMeOrYou, Shape> = {
      A: "rock",
      X: "rock",
      B: "paper",
      Y: "paper",
      C: "scissor",
      Z: "scissor",
    };
    return shape[key];
  }

  const rounds: string[][] = text
    .split("\n")
    .filter((round) => !!round)
    .map(round=>round.split(' '))

  const partOne = undefined;
  const partTwo = undefined;
  return {
    text,
    rounds,
    result,
    translate,
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
// Deno.test("scored rounds", () => {
//   assertEquals(test.scores, [8, 1, 6]);
// });

Deno.test("scored rounds", () => {
  assertEquals(test.translate("A"), "rock");
  assertEquals(test.translate("X"), "rock");
  assertEquals(test.translate("B"), "paper");
  assertEquals(test.translate("Y"), "paper");
  assertEquals(test.translate("C"), "scissor");
  assertEquals(test.translate("Z"), "scissor");
});

Deno.test("3 rounds", () => {
  assertEquals(test.rounds, [
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]);
});

// tests from spec
// Deno.test(
//   " In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won). ",
//   () => {
//     assertEquals(test.partOne, 8);
//   }
// );
//
// Deno.test(
//   " In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0). ",
//   () => {
//     assertEquals(test.partOne, 1);
//   }
// );
//
// Deno.test(
//   "test The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6. ",
//   () => {
//     assertEquals(test.partOne, 6);
//   }
// );
//
// Deno.test(
//   " In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6). ",
//   () => {
//     assertEquals(test.partOne, 15);
//   }
// );
