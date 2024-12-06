const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").map((line) => line.trim()).map((line) => line.split('   '));
const leftList = lines.map((line) => +line[0]).sort((a, b) => a - b);
const rightList = lines.map((line) => +line[1]).sort((a, b) => a - b);

//Part 1

function findDistance(left : number, right : number) : number {
    let distance = 0;
    left > right ? distance = left - right : distance = right - left;
    return distance;
}


function findTotalDistance(leftList : number[], rightList: number[]) : number {
    const distances = [];
    for (let i = 0; i < leftList.length; i++) {
        distances.push(findDistance(leftList[i], rightList[i]));
    }
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);
    return totalDistance;
}

const totalDistance = findTotalDistance(leftList, rightList);

console.log(totalDistance);

// Part 2

function findInstances(id: number, list: number[]) : number {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === id) {
            count++;
        }
    }
    return count;
}

function findSimilarityScore(leftList : number[], rightList: number[]) : number {
    type SimMap = Map<number, number>;
    const simMap : SimMap = new Map();
    for (let i = 0; i < leftList.length; i++) {
        const instances = findInstances(leftList[i], rightList);
        if (!simMap.has(leftList[i])) {
            simMap.set(leftList[i], leftList[i] * instances);
        } else {
            simMap.set(leftList[i], simMap.get(leftList[i]) + leftList[i] * instances);
        }
    }
    const similarityScore = Array.from(simMap.values()).reduce((acc, curr) => acc + curr, 0);
    return similarityScore;
}

const similarityScore = findSimilarityScore(leftList, rightList);

console.log(similarityScore);









