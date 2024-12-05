const input = await Deno.readTextFile("three-input.txt");

function mul(x : number, y : number) : number {
  return x * y;
}

function getMulDigits(input : string) : number[] {
  const digits = input
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map((n) => parseInt(n, 10));
  return digits;
}

function getMulSum(input : string) : number {
  const regex = /mul\(\d+\,\d+\)/g;
  const matches = input.matchAll(regex);
  const matchStrings = Array.from(matches.map((match) => match[0]));
  const numPairs = matchStrings.map((match) => {
  return getMulDigits(match);
  })
    const products = numPairs.map(([a, b]) => mul(a, b));
    return products.reduce((acc, curr) => acc + curr, 0);
}


function getEnabledMulSum(input : string) {
  const mulRegex = /mul\(\d+\,\d+\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;
  const doMatches = Array.from(input.matchAll(doRegex));
  const dontMatches = Array.from(input.matchAll(dontRegex));
  const mulMatches = Array.from(input.matchAll(mulRegex));
  const allMatches = [...doMatches, ...dontMatches, ...mulMatches];
  allMatches.sort((a, b) => a.index - b.index);
  const matchMap = allMatches.map((match) => {
    return {value: match[0], index: match.index};
  });
  let enabled = true;
  const enabledMuls : string[] = [];
  matchMap.forEach((match) => {
    if (match.value === "do()") {
      enabled = true;
    } 
    if (match.value === "don't()") {
      enabled = false;
    }
    if (enabled) {
      if (match.value.includes("mul")) {
        enabledMuls.push(match.value);
      }
    }
  });
  const numPairs = enabledMuls.map((match) => {
    return getMulDigits(match);
    });
  const products = numPairs.map(([a, b]) => mul(a, b));
  return products.reduce((acc, curr) => acc + curr, 0);
}

//Part 1
const result = getMulSum(input);
console.log(result);

//Part 2
const enabled = getEnabledMulSum(input);
console.log(enabled);
