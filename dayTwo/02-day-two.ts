const input = await Deno.readTextFile("two-input.txt");
const lines = input.split("\n").map((line) => line.trim()).map((line) => line.split('   '));
const reports = lines.map((line) => line[0].split(' '));
const numReports = reports.map((report) => {
  const nums = report.map((num) => parseInt(num));
  return nums;
});

function isASC(report : number[]) : boolean {
  let current = report[0];
  for (let i = 1; i < report.length; i++) {
    const next = report[i];
    if (next > current) {
      current = next;
    } else {
      return false;
    }
  }
  return true;
};

function isDESC(report : number[]) : boolean {
  let current = report[0];
  for (let i = 1; i < report.length; i++) {
    const next = report[i];
    if (next < current) {
      current = next;
    } else {
      return false;
    }
  }
  return true;
};

function isWithinRange(report : number[]) : boolean {
  const MIN = 1;
  const MAX = 3;
  let current = report[0];
  for (let i = 1; i < report.length; i++) {
    const next = report[i];
    const diff = Math.abs(next - current);
    if (diff >= MIN && diff <= MAX) {
      current = next;
    } else {
      return false;
    }
  }
  return true;
}

function isSafe(report: number[]) : boolean {
  const sorted = isASC(report) || isDESC(report);
  const range = isWithinRange(report);
  return sorted && range;
}

function findTotalSafe(reports: number[][]) : number {
  let safe = 0;
  reports.forEach((report) => {
    if (isSafe(report)) {
      safe += 1;
    }
  });
  return safe;
}

const totalSafeReports = findTotalSafe(numReports);

console.log(totalSafeReports);