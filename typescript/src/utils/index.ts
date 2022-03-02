import * as fs from "fs";
import * as path from "path";

function load(filename: string, dirname: string) {
  const toplevelPath: string = path.dirname(
    path.dirname(path.dirname(__dirname))
  );
  return fs.readFileSync(path.join(toplevelPath, dirname, filename), "utf8");
}

function check(actual: any, expected: any): void {
  if (actual !== expected) {
    throw new Error(`actual: ${actual}, expected: ${expected}`);
  }
}

export { load, check };
