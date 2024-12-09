const input = await Deno.readTextFileSync("input.txt");
const lines = input.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);

// type Coordinate = { x: number, y: number };
// type Direction = "N" | "E" | "S" | "W";

// let facing : Direction = "N";
// let guardPosition : Coordinate = { x: 52, y: 43 };

// const OUT = 130;
// const obstacleCoords : Coordinate[] = [];
// const distinctPositions : Coordinate[] = [guardPosition];

// for (let y = 0; y < OUT; y++) {
//   for (let x = 0; x < OUT; x++) {
//     if (lines[y][x] === "#") {
//       obstacleCoords.push({ x: x, y: y });
//     }
//   }
// }

// function isFrontClear() : boolean {
//   let x = guardPosition.x;
//   let y = guardPosition.y;
//   switch (facing) {
//     case "N":
//       y -= 1;
//       break;
//     case "E":
//       x += 1;
//       break;
//     case "S":
//       y += 1;
//       break;
//     case "W":
//       x -= 1;
//       break;
//   }
//   const nextPosition = { x: x, y: y };
//   return obstacleCoords.every((coord) => coord.x !== nextPosition.x || coord.y !== nextPosition.y);
// }
// function alreadyVisited(position : Coordinate) : boolean {
//   return distinctPositions.some((coord) => coord.x === position.x && coord.y === position.y);
// }
// function move(isFrontClear : boolean, ) : void {
//   let x = guardPosition.x;
//   let y = guardPosition.y;
//   if (isFrontClear) {
//     switch (facing) {
//       case "N":
//         y -= 1;
//         break;
//       case "E":
//         x += 1;
//         break;
//       case "S":
//         y += 1;
//         break;
//       case "W":
//         x -= 1;
//         break;
//     } 
//   } else {
//       switch (facing) {
//         case "N":
//           facing = "E";
//           break;
//         case "E":
//           facing = "S";
//           break;
//         case "S":
//           facing = "W";
//           break;
//         case "W":
//           facing = "N";
//           break;
//       }
//   }
//   if (!alreadyVisited({ x: x, y: y })) {
//     distinctPositions.push({ x: x, y: y });
//   }
//   guardPosition = { x: x, y: y };
// }

// function isOnBoundary() : boolean {
//   const leftSide = guardPosition.x === 0 && facing === "W";
//   const rightSide = guardPosition.x === OUT - 1 && facing === "E";
//   const topSide = guardPosition.y === 0 && facing === "N";
//   const bottomSide = guardPosition.y === OUT - 1 && facing === "S";
//   return leftSide || rightSide || topSide || bottomSide;
// }

// while (!isOnBoundary()) {
//   move(isFrontClear());
// }

// console.log(distinctPositions.length);


let gridSize = 0;
let guard;
const obstacles = {};
let possibleObstacles = 0;

for (const line of lines) {
  const l = line.toString();

  for (let j = 0; j < l.length; j++) {
    const vec = { x: j, y: gridSize };

    if (l[j] === '^') {
      guard = { ...vec, dir: '^', path: [] };
    }

    if (l[j] === '#') {
      if (obstacles[vec.x]) obstacles[vec.x].push(vec.y);
      else obstacles[vec.x] = [vec.y];
    }
  }

  gridSize++;
}

function isOutOfBounds({ x, y }) {
  return x < 0 || x >= gridSize || y < 0 || y >= gridSize;
}

function containsObstacle({ x, y }, o) {
  return o[x] && o[x].includes(y);
}

function getNext(g) {
  if (g.dir === '^') return { ...g, y: g.y - 1 };
  if (g.dir === '>') return { ...g, x: g.x + 1 };
  if (g.dir === 'v') return { ...g, y: g.y + 1 };
  if (g.dir === '<') return { ...g, x: g.x - 1 };
}

function detectLoop(g) {
  return g.path.length > 2 * Math.pow(gridSize, 2);
}

function turn(g) {
  if (g.dir === '^') g.dir = '>';
  else if (g.dir === '>') g.dir = 'v';
  else if (g.dir === 'v') g.dir = '<';
  else if (g.dir === '<') g.dir = '^';
}

function recordPath(g) {
  g.path.push({ x: g.x, y: g.y });
}

function move(g, o) {
  recordPath(g);

  const next = getNext(g);

  if (isOutOfBounds(next)) {
    return false;
  }

  if (detectLoop(g)) {
    throw new Error('Loop detected!');
  }

  if (containsObstacle(next, o)) {
    turn(g);
  } else {
    g.x = next.x;
    g.y = next.y;
  }

  return true;
}

function placeObstacle({ x, y }, o) {
  if (x === guard.x && y === guard.y) return;
  if (containsObstacle({ x, y }, o)) return;

  if (o[x]) o[x].push(y);
  else o[x] = [y];

  return true;
}

for (let x = 0; x < gridSize; x++) {
  for (let y = 0; y < gridSize; y++) {
    const g = JSON.parse(JSON.stringify(guard));
    const o = JSON.parse(JSON.stringify(obstacles));

    placeObstacle({ x, y }, o);

    try {
      while (move(g, o)) {
        /**/
      }
    } catch {
      possibleObstacles++;
    }
  }
}

console.log('Obstacle position possibilities:', possibleObstacles);