const input = await Deno.readTextFileSync("input.txt");
const lines = input.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);

type Coordinate = { x: number, y: number };
type Direction = "N" | "E" | "S" | "W";

let facing : Direction = "N";
let guardPosition : Coordinate = { x: 52, y: 43 };

const OUT = 130;
const obstacleCoords : Coordinate[] = [];
const distinctPositions : Coordinate[] = [guardPosition];

for (let y = 0; y < OUT; y++) {
  for (let x = 0; x < OUT; x++) {
    if (lines[y][x] === "#") {
      obstacleCoords.push({ x: x, y: y });
    }
  }
}

function isFrontClear() : boolean {
  let x = guardPosition.x;
  let y = guardPosition.y;

  switch (facing) {
    case "N":
      y -= 1;
      break;
    case "E":
      x += 1;
      break;
    case "S":
      y += 1;
      break;
    case "W":
      x -= 1;
      break;
  }
  const nextPosition = { x: x, y: y };
  return obstacleCoords.every((coord) => coord.x !== nextPosition.x || coord.y !== nextPosition.y);
}
function alreadyVisited(position : Coordinate) : boolean {
  return distinctPositions.some((coord) => coord.x === position.x && coord.y === position.y);
}
function move(isFrontClear : boolean, ) : void {
  let x = guardPosition.x;
  let y = guardPosition.y;
  if (isFrontClear) {
    switch (facing) {
      case "N":
        y -= 1;
        break;
      case "E":
        x += 1;
        break;
      case "S":
        y += 1;
        break;
      case "W":
        x -= 1;
        break;
    } 
  } else {
      switch (facing) {
        case "N":
          facing = "E";
          break;
        case "E":
          facing = "S";
          break;
        case "S":
          facing = "W";
          break;
        case "W":
          facing = "N";
          break;
      }
  }
  if (!alreadyVisited({ x: x, y: y })) {
    distinctPositions.push({ x: x, y: y });
  }
  guardPosition = { x: x, y: y };
  }

function isOnBoundary() : boolean {
  const leftSide = guardPosition.x === 0 && facing === "W";
  const rightSide = guardPosition.x === OUT - 1 && facing === "E";
  const topSide = guardPosition.y === 0 && facing === "N";
  const bottomSide = guardPosition.y === OUT - 1 && facing === "S";
  return leftSide || rightSide || topSide || bottomSide;
}

while (!isOnBoundary()) {
  move(isFrontClear());
}

console.log(distinctPositions.length);