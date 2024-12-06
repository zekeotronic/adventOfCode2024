type Rule = [number, number];

const input = await Deno.readTextFileSync("five-input.txt");

const lines = input.split("\n").map((line) => line.trim());

const rules = lines.filter((line) => line.includes("|"));
const rulesNums = rules.map((rule) => rule.split('|').map(r => parseInt(r.trim())));

const updates = lines.filter((line) => !line.includes("|"));

updates.shift();

const updatesNums = updates.map((update) => update.split(',').map(u => parseInt(u.trim())));

function validateUpdate(update : number[]) {
  const validRules = rulesNums.filter(rule => {
    return update.includes(rule[0]) && update.includes(rule[1]);
  });
  const rulesTotal = validRules.length;
  let passed = 0;

  validRules.forEach(rule => {
    const [a,b] = rule;
    if (update.indexOf(a) < update.indexOf(b)) {
      passed++;
    }
  });
  return rulesTotal === passed;
  
}
const validUpdates = []
const invalidUpdates = []

updatesNums.forEach(update => {
  if (validateUpdate(update)) {
    validUpdates.push(update);
  } else {
    invalidUpdates.push(update);
  }
})

let sum = 0;
validUpdates.forEach(update => {
  sum += update[Math.floor(update.length / 2)];
});
console.log(sum);

function reorderUpdate(update: number[], rules: number[][]): number[] {
    const graph: Record<number, number[]> = {};
    const inDegree: Record<number, number> = {};
    const pages = new Set(update);

    // Initialize graph and in-degree
    for (const page of pages) {
        graph[page] = [];
        inDegree[page] = 0;
    }

    for (const [x, y] of rules) {
        if (pages.has(x) && pages.has(y)) {
            graph[x].push(y);
            inDegree[y] += 1;
        }
    }

    const queue: number[] = [];
    const ordered: number[] = [];
    for (const page of pages) {
        if (inDegree[page] === 0) {
            queue.push(page);
        }
    }

    while (queue.length > 0) {
        const current = queue.shift()!;
        ordered.push(current);
        for (const neighbor of graph[current]) {
            inDegree[neighbor] -= 1;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return ordered;
}

const reorderedUpdates = invalidUpdates.map((update) => reorderUpdate(update, rulesNums));

let sum2 = 0;
reorderedUpdates.forEach(update => {
  sum2 += update[Math.floor(update.length / 2)];
});
console.log(sum2);