const input = await Deno.readTextFileSync("input.txt");
const lines = input.split("\n").map((line) => line.trim());

console.log(lines);