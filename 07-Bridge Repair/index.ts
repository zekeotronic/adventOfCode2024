const input = await Deno.readTextFileSync("input.txt");
const lines = input.split("\n").map((line) => line.trim());

// const lines = sample.split("\n").map((line) => line.trim());

// type Bridge = {
//   target: number;
//   digits: number[];
// }

// const sample = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`

// const lines = sample.split("\n").map((line) => line.trim());

// function parseLine(line: string) : Bridge {
//   const [a, b] = line.split(": ").map((x) => x.trim());
//   return {target: parseInt(a), digits: b.split(" ").map((x) => parseInt(x))};
// }

// function possibleArrangements(spots: number) : number {
//   return Math.pow(3, spots-1);
// }

// function generatePatterns(spots: number) : string[][] {
//   const result: string[][] = [];
//   function backtrack(current: string[], depth: number): void {
//     if (depth === spots-1) {
//       result.push([...current]);
//       return;
//     }
//     current.push('*');
//     backtrack(current, depth + 1);
//     current.pop();
//     current.push('+');
//     backtrack(current, depth + 1);
//     current.pop();
//   }
//   backtrack([], 0);
//   return result;
//   }



// function generateStatements(patterns: string[][], bridge: Bridge, spots : number) : string[][] {
//   const statements : string[][] = [];
//   patterns.forEach((pattern) => {
//     const ptn : string[] = [...pattern];
//     const digits : number[] = [...bridge.digits];
//     const statement : string[] = [];
//     for (let i = 0; i < spots + spots-1; i++) {
//       if (i % 2 == 0) {
//         statement.push(`${digits.shift()}`);
//       } else {
//         statement.push(ptn.shift());
//       }
//     }
//     statements.push(statement);
//   });
//   return statements;
// }

// function parseStatement(statement: string[]) : number {
//   let result = 0;
//   const parts = statement
//   let plus = false;
//   for (let i = 0; i < parts.length; i++) {
//     if (i == 0) {
//       result += parseInt(parts[i]);
//     } else {
//       if (parts[i] === "+") {
//         plus = true;
//         continue;
//       } else if (parts[i] === "*") {
//         plus = false;
//         continue;
//       } else {
//         if (plus) {
//           result += parseInt(parts[i]);
//         } else {
//           result *= parseInt(parts[i]);
//         }
//       }
//     }
//   }
//   return result;
// }



// function isValid(bridge: Bridge, spots : number) {
//   const patterns = generatePatterns(spots);
//   const statements = generateStatements(patterns, bridge, spots);
//   // return statements.some((statement) => parseStatement(statement) === bridge.target);
//   // return statements.some((statement) => parseStatement2(statement) === bridge.target);
//   // statements.forEach((statement) => {
//   //   console.log(statement.join(" "), parseStatement2(statement));
//   // });
// }

// const sampleLines = sample.split("\n").map((line) => line.trim());
// const bridges = lines.map(parseLine);

// let validTargets : number[] = [];
// bridges.forEach((bridge) => {
//   const spots = bridge.digits.length;
//   // isValid(bridge, spots) ? validTargets.push(bridge.target) : null;
//   console.log(isValid(bridge, spots));
// });

// // let result = validTargets.reduce((acc, curr) => acc + curr, 0);

// // console.log(result);


const operators = ['+', '*', '||'];
let total = 0;

for (const line of lines) {
  const l = line.toString().split(': ');

  const testValue = parseInt(l.shift());
  const operands = l[0].split(' ').map((o) => parseInt(o));
  const permutations = new Array(
    Math.pow(operators.length, operands.length - 1)
  );

  let currentEquation = [];

  for (let i = 0; i < permutations.length; i++) {
    currentEquation.push(operands[0]);

    let num = i;
    for (let j = 1; j < operands.length; j++) {
      currentEquation.push(operators[Math.ceil(num % operators.length)]);
      num = Math.floor(num / operators.length);
      currentEquation.push(operands[j]);
    }

    permutations[i] = currentEquation;
    currentEquation = [];
  }

  for (const equation of permutations) {
    let result = equation[0];

    for (let i = 1; i < equation.length; i += 2) {
      if (equation[i] === '+') result += equation[i + 1];
      if (equation[i] === '*') result *= equation[i + 1];
      if (equation[i] === '||') {
        result = parseInt(`${result}${equation[i + 1]}`);
      }
    }

    if (result === testValue) {
      total += testValue;
      break;
    }
  }
}

console.log('Total calibration result', total);