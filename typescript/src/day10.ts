import * as fs from "fs";
import * as path from "path";
import exp = require("constants");

const toplevelPath: string = path.dirname(path.dirname(__dirname));
const fileName = "10-corrupted_lines.txt";
const input: string = fs.readFileSync(
  path.join(toplevelPath, "input", fileName),
  "utf8"
);

const testInput: string = fs.readFileSync(
  path.join(toplevelPath, "test", fileName),
  "utf8"
);

type Corruption = {
  index?: number;
  char?: string;
  stack: string[];
};
const lines: string[] = input.split("\n");
const testLines: string[] = testInput.split("\n");

function determineValue(ch: string): number {
  switch (ch) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
    default:
      return 0;
  }
}

function autoCompleteScore(ch: string): number {
  switch (ch) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
    default:
      return 0;
  }
}

const bracketPairs = new Map<string, string>([
  [">", "<"],
  ["]", "["],
  [")", "("],
  ["}", "{"],
  ["<", ">"],
  ["[", "]"],
  ["(", ")"],
  ["{", "}"],
]);

function inverse(ch: string): string {
  return bracketPairs.get(ch) || "";
}

function findIncorrect(line: string): Corruption {
  const stack: string[] = [];
  const corrupt: Corruption = { index: undefined, char: undefined, stack: [] };
  Array.from(line).every((ch, index) => {
    if (["{", "(", "<", "["].includes(ch)) {
      stack.push(ch);
      return true;
    }
    if (!["}", ")", ">", "]"].includes(ch)) {
      return true;
    }
    const readCh = stack.pop();
    if (readCh === undefined) {
      // incomplete
      return true;
    }
    if (readCh !== inverse(ch)) {
      corrupt.index = index;
      corrupt.char = ch;
      return false;
    }
    return true;
  });
  corrupt.stack = stack;
  return corrupt;
}

function part1(linesIn: string[]): number {
  let sum = 0;
  linesIn
    .filter((it) => it.length > 0)
    .forEach((line) => {
      const corruption = findIncorrect(line);
      if (corruption.index !== undefined && corruption.char !== undefined) {
        sum += determineValue(corruption.char);
      }
    });
  return sum;
}

function part2(linesIn: string[]): number {
  const scores = linesIn
    .filter((it) => it.length > 0)
    .map((line) => {
      const corruption = findIncorrect(line);
      let sum = 0;
      if (corruption.index === undefined && corruption.char === undefined) {
        Array.from({ length: corruption.stack.length }, () => {
          const last = corruption.stack.pop() || "";
          sum = 5 * sum;
          sum += autoCompleteScore(inverse(last));
        });
      }
      return sum;
    })
    .filter((score) => score > 0)
    .sort((n1, n2) => n1 - n2);
  return scores[Math.floor(scores.length / 2)];
}

function check(actual: any, expected: any): void {
  if (actual !== expected) {
    throw new Error(`actual: ${actual}, expected: ${expected}`);
  }
}

check(part1(testLines), 26397);
check(part2(testLines), 288957);

console.log(part1(lines));
console.log(part2(lines));
