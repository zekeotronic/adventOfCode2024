type Lines = string[] | string[][];
let lines : Lines;
function findDistance(left : number, right : number) : number {
    let distance = 0;
    left > right ? distance = left - right : distance = right - left;
    return distance;
}
const input = await Deno.readTextFile("one-input.txt");
lines = input.split("\n").map((line) => line.trim()).map((line) => line.split('   '));
const leftList = lines.map((line) => +line[0]).sort((a, b) => a - b);
const rightList = lines.map((line) => +line[1]).sort((a, b) => a - b);
const distances = [];
for (let i = 0; i < leftList.length; i++) {
    distances.push(findDistance(leftList[i], rightList[i]));
}
const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

console.log(totalDistance)

