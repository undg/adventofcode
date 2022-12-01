/*
--- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

const min = await Deno.readTextFile("./min.txt");
const input = await Deno.readTextFile("./input.txt");

const solution = (text: string) => {
  const elves: string[] = text.split("\n\n");
  const elvesMeals: number[][] = elves.map((elf) =>
    elf
      .split("\n")
      .filter((callories) => !!callories)
      .map((str) => +str)
  );

  const sumReducer = (agg: number, curr: number) => agg + curr
  const elvesCalloriesSum: number[] = elvesMeals.map((elf) =>
    elf.reduce<number>(sumReducer, 0)
  );

  const sorted: number[] = elvesCalloriesSum.sort((a,b) => a>b ? 1 : -1)
  const mostCallories = sorted.at(-1)

  const top3: number[] = sorted.slice(-3, sorted.length)

  const top3Sum: number = top3.reduce(sumReducer, 0)
  return {
    text,
    elves,
    elvesMeals,
    elvesCalloriesSum,
    mostCallories, // part 1
    sorted,
    top3,
    top3Sum, // part 2
  };
};

// Fuck reading console log
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

Deno.test("sum top 3", () => {
  const test = solution(min);
  assertEquals(test.top3Sum, 45000);
  console.log(solution(input).top3Sum)
});

Deno.test("top3", () => {
  const test = solution(min);
  assertEquals(test.top3, [10000, 11000, 24000]);
});

Deno.test("sorted", () => {
  const test = solution(min);
  assertEquals(test.sorted, [4000, 6000, 10000, 11000, 24000]);
});

Deno.test("most callories (part 1)", () => {
  const test = solution(min);
  assertEquals(test.mostCallories, 24000);
});
