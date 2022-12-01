/*
--- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

// const text = await Deno.readTextFile("./min.txt");
const text = await Deno.readTextFile('./input.txt')

const elves: string[] = text.split("\n\n");
const elvesMeals: number[][] = elves.map((elf) =>
  elf
    .split("\n")
    .filter((callories) => !!callories)
    .map((str) => +str)
);

const elvesCalloriesSum: number[] = elvesMeals.map((elf) =>
  elf.reduce<number>((agg, curr) => agg + curr, 0)
);

const mostCallories: number = elvesCalloriesSum.reduce(
  (acc, curr) => (acc < curr ? curr : acc),
  0
);

console.log(
  "\ntext: ", text,
  "\nelves: ", elves,
  "\nelvesMeals: ", elvesMeals,
  "\nelvesCalloriesSum: ", elvesCalloriesSum,
  "\nmostCallories: ", mostCallories
);
