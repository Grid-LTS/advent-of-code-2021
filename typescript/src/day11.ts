import { load, check } from "./utils";

const fileName = "11-octupus_grid.txt";

const inputStr: string = load(fileName, "input");
const testInputStr: string = load(fileName, "test");

function kernel(grid: number[][], i: number, j: number, delta: number) {
  if (grid[i][j] === 0) {
    return;
  }
  const lowx: number = i > 0 ? i - 1 : 0;
  const highx: number = i < grid.length - 1 ? i + 1 : grid.length - 1;
  const lowy: number = j > 0 ? j - 1 : 0;
  const highy: number = j < grid[0].length - 1 ? j + 1 : grid[0].length - 1;
  grid[i][j] += delta;
  if (grid[i][j] >= 10) {
    grid[i][j] = 0;
    for (let x = lowx; x <= highx; x++) {
      for (let y = lowy; y <= highy; y++) {
        if (x === i && y === j) {
          continue;
        }
        kernel(grid, x, y, 1);
      }
    }
  }
}

function step(grid: number[][]): number {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j]++;
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      kernel(grid, i, j, 0);
    }
  }
  let flashes: number = 0;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        flashes += 1;
      }
    }
  }
  return flashes;
}

function part1(input: string) {
  const grid = input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => Array.from(line).map((num) => parseInt(num, 10)));
  let flashes = 0;
  for (let k = 0; k < 100; k++) {
    flashes += step(grid);
    console.log(grid.map((line) => line.join("")).join("\n"));
    console.log("---------------------");
  }
  return flashes;
}

function step2(grid: number[][]): boolean {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j]++;
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      kernel(grid, i, j, 0);
    }
  }
  let flashes: number = 0;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        flashes += 1;
      }
    }
  }
  return flashes === grid.length * grid[0].length;
}

function part2(input: string): number {
  const grid = input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => Array.from(line).map((num) => parseInt(num, 10)));
  let k = 0;
  while (true) {
    k++;
    if (step2(grid)) {
      break;
    }
  }
  return k;
}

check(part1(testInputStr), 1656);
console.log(part1(inputStr));
check(part2(testInputStr), 195);
console.log(part2(inputStr));
