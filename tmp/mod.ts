function f(arr: number[]) {
  const sum = 2020;
  for (const i of arr)
    for (const j of arr)
      for (const k of arr)
        if (i + j + k === sum) return i * j * k;
}
console.log("answer: ", f([1721, 979, 366, 299, 675, 1456]));
// answer:  514579
// answer:  241861950
