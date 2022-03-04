import { load, check } from "./utils";

const fileName = "12-caves.txt";

const inputStr: string = load(fileName, "input");
const testInputStr: string = load(fileName, "test");

class Cave {
  adj: Cave[];
  id: string;

  constructor(id: string) {
    this.adj = [];
    this.id = id;
  }

  addMutual(cave: Cave) {
    this.adj.push(cave);
    cave.add(this);
  }

  add(cave: Cave) {
    this.adj.push(cave);
  }
}
function mapCaves(input: string) {
  const caves: Cave[] = [];
  input.split("\n").forEach((line) => {
    const pair: string[] = line.split("-");
    let cave1: Cave | undefined = find(caves, pair[0]);
    let cave2: Cave | undefined = find(caves, pair[1]);
    if (cave1 === undefined) {
      cave1 = new Cave(pair[0]);
      caves.push(cave1);
    }
    if (cave2 === undefined) {
      cave2 = new Cave(pair[1]);
      caves.push(cave2);
    }
    cave1.addMutual(cave2);
  });
  return caves;
}

function constructPath1(start: Cave, path: string[], finalPaths: string[][]) {
  start.adj.forEach((nextCave) => {
    const newPath: string[] = [...path];
    newPath.push(start.id);
    if (nextCave.id === "end") {
      newPath.push(nextCave.id);
      finalPaths.push(newPath);
      return;
    }
    const isLowerC: boolean = nextCave.id.toLowerCase() === nextCave.id;
    if (isLowerC && path.includes(nextCave.id)) {
      return;
    }
    constructPath1(nextCave, newPath, finalPaths);
  });
}

function constructPath2(
  start: Cave,
  path: string[],
  finalPaths: string[][],
  isTwice: boolean
) {
  start.adj.forEach((nextCave) => {
    const newPath: string[] = [...path];
    newPath.push(start.id);
    if (nextCave.id === "end") {
      newPath.push(nextCave.id);
      finalPaths.push(newPath);
      return;
    }
    const isLowerC: boolean = nextCave.id.toLowerCase() === nextCave.id;
    if (
      isLowerC &&
      path.includes(nextCave.id) &&
      nextCave.id !== "start" &&
      !isTwice
    ) {
      constructPath2(nextCave, newPath, finalPaths, true);
      return;
    }
    if (isLowerC && path.includes(nextCave.id)) {
      return;
    }
    constructPath2(nextCave, newPath, finalPaths, isTwice);
  });
}

function find(caves: Cave[], id: string): Cave | undefined {
  return caves.find((cave) => cave.id === id);
}

function part1(input: string): number {
  const caves = mapCaves(input);
  const start: Cave = find(caves, "start") as Cave;
  const finalPaths: string[][] = [];
  constructPath1(start, [], finalPaths);
  return finalPaths.length;
}

function part2(input: string): number {
  const caves = mapCaves(input);
  const start: Cave = find(caves, "start") as Cave;
  const finalPaths: string[][] = [];
  constructPath2(start, [], finalPaths, false);
  return finalPaths.length;
}

check(part1(testInputStr), 19);
console.log(part1(inputStr));
check(part2(testInputStr), 103);
console.log(part2(inputStr));
