const input = await Deno.readTextFileSync("input.txt");
const matrix = input.split("\n").map((x) => x.trim());


function xmasForward(row : number, col: number) : boolean {
  const MAX_START_INDEX = 136;
  if (col > MAX_START_INDEX) {
      return false;
  }
  let target = '';
  for (let i = 0; i < 4; i++) {
      target += matrix[row][col + i];
  }
  return target === "XMAS";
}
function xmasBackward(row : number, col: number) : boolean {
  const MAX_START_INDEX = 3;
  if (col < MAX_START_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row][col - count]
      count++;
  }
  return target === "XMAS";
}
function xmasUp(row : number, col: number) : boolean {
  const MIN_START_INDEX = 3;
  if (row < MIN_START_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row - count][col];
      count++;
  }
  return target === "XMAS";
}
function xmasDown(row : number, col: number) : boolean {
  const MAX_START_INDEX = 136;
  if (row > MAX_START_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row + count][col];
      count++;
  }
  return target === "XMAS";
}
function xmasUpRight(row : number, col: number) : boolean {
  const MAX_COL_INDEX = 136;
  const MIN_ROW_INDEX = 3;
  if (row < MIN_ROW_INDEX || col > MAX_COL_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row - count][col + count];
      count++;
  }
  return target === "XMAS";
}
function xmasUpLeft(row : number, col: number) : boolean {
  const MIN_COL_INDEX = 3;
  const MIN_ROW_INDEX = 3;
  if (row < MIN_ROW_INDEX || col < MIN_COL_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row - count][col - count];
      count++;
  }
  return target === "XMAS";
}
function xmasDownRight(row : number, col: number) : boolean {
  const MAX_COL_INDEX = 136;
  const MAX_ROW_INDEX = 136;
  if (row > MAX_ROW_INDEX || col > MAX_COL_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row + count][col + count];
      count++;
  }
  return target === "XMAS";
}
function xmasDownLeft(row : number, col: number) : boolean {
  const MIN_COL_INDEX = 3;
  const MAX_ROW_INDEX = 136;
  if (row > MAX_ROW_INDEX || col < MIN_COL_INDEX) {
      return false;
  }
  let target = '';
  let count = 0;
  while (count < 4) {
      target += matrix[row + count][col - count];
      count++;
  }
  return target === "XMAS";
}

function getTotalXmasCount() : number {
  let count = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col] === "X") {
            if (xmasForward(row, col)) {
                count++;
            }
            if (xmasBackward(row, col)) {
                count++;
            }
            if (xmasUp(row, col)) {
                count++;
            }
            if (xmasDown(row, col)) {
                count++;
            }
            if (xmasUpRight(row, col)) {
                count++;
            }
            if (xmasUpLeft(row, col)) {
                count++;
            }
            if (xmasDownRight(row, col)) {
                count++;
            }
            if (xmasDownLeft(row, col)) {
                count++;
            }
        }
    }
  }
  return count;
}

// Part 1
const count = getTotalXmasCount();
console.log(count);

// Part 2

function isSamOrMas(char1 : string, char2 : string, char3 : string) : boolean {
  const target = `${char1}${char2}${char3}`;
  return target === "SAM" || target === "MAS";
}

function isXmasMatrix(row : number, col: number) : boolean {
  const MAX_INDEX = 137;
  let result = false;
  if (row > MAX_INDEX || col > MAX_INDEX) {
      return result;
  }
  const testMatrix : string[][] = [
    [matrix[row][col], matrix[row][col+1], matrix[row][col+2]],
    [matrix[row+1][col], matrix[row+1][col+1], matrix[row+1][col+2]],
    [matrix[row+2][col], matrix[row+2][col+1], matrix[row+2][col+2]]
  ];
  const topLeft = testMatrix[0][0];
  const topRight = testMatrix[0][2];
  const bottomLeft = testMatrix[2][0];
  const bottomRight = testMatrix[2][2];
  const middle = testMatrix[1][1];
  if (isSamOrMas(topLeft,middle,bottomRight) && isSamOrMas(topRight,middle,bottomLeft)) {
      result = true;
  }
  return result;
}

function getTotalXmasMatrixCount() : number {
  let count = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
            if (isXmasMatrix(row, col)) {
                count++;
            }
    }
  }
  return count;
}

const matrixCount = getTotalXmasMatrixCount();
console.log(matrixCount);