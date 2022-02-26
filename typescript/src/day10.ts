import * as fs from 'fs';
import * as path from 'path';

const toplevelPath : string = path.dirname(path.dirname(__dirname));
const input : string = fs.readFileSync(path.join(toplevelPath, 'input', '10-corrupted_lines.txt'),'utf8');

const lines : string[] =  input.split("\n");
console.log(lines.length);
