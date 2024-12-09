type Position = {x: number, y: number};
type PositionMap = Record<string, Position[]>;

const [TOP_LEFT_BOUND, BOTTOM_RIGHT_BOUND] = [0, 49];

const sample = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

const input = await Deno.readTextFileSync("input.txt");
const lines = input.split("\n").map((line) => line.trim());
// const lines = sample.split("\n").map((line) => line.trim());

const uniqueCharacters : Set<string> = new Set();

for (const line of lines) {
  for (const char of line) {
    if (char !== '.') {
      uniqueCharacters.add(char);
    }
  }
}

const positions: PositionMap = {};

for (const char of uniqueCharacters) {
  positions[char] = [];
}

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  for (let x = 0; x < line.length; x++) {
    const char = line[x];
    if (char !== '.') {
      positions[char].push({x, y});
    }
  }
}

function withinBounds(pos : number) : boolean {
  return pos >= TOP_LEFT_BOUND && pos <= BOTTOM_RIGHT_BOUND;
}

function calculateDistance(a: Position, b: Position): Position {
  return {x: Math.abs(a.x - b.x), y: Math.abs(a.y - b.y)};
}


function getAntinodePositions(a: Position, b: Position): Position[] {
  const firstToLeft = a.x <  b.x;
  const distance = calculateDistance(a, b);
  const possiblePositions : Position[] = [];
  let positionOne : Position;
  let positionTwo : Position;
  const upPositions : Position[] = [];
  const downPositions : Position[] = [];
  upPositions.push(a);
  downPositions.push(b);
  if (firstToLeft) {
    let currentUp : Position = {x: a.x - distance.x, y: a.y - distance.y};
    let currentDown : Position = {x: b.x + distance.x, y: b.y + distance.y};
    upPositions.push(currentUp);
    downPositions.push(currentDown);
    for (let i = currentUp.y; i >= TOP_LEFT_BOUND; i-- ) {
      currentUp = {x: currentUp.x - distance.x, y: currentUp.y - distance.y};
      upPositions.push(currentUp);
    }
    for (let i = currentDown.y; i <= BOTTOM_RIGHT_BOUND; i++) {
      currentDown = {x: currentDown.x + distance.x, y: currentDown.y + distance.y};
      downPositions.push(currentDown);
    }
    // positionOne = {x: a.x - distance.x, y: a.y - distance.y};
    // positionTwo = {x: b.x + distance.x, y: b.y + distance.y};
  } else {
    let currentUp : Position = {x: a.x + distance.x, y: a.y - distance.y};
    let currentDown : Position = {x: b.x - distance.x, y: b.y + distance.y};
    upPositions.push(currentUp);
    downPositions.push(currentDown);
    for (let i = currentUp.y; i >= TOP_LEFT_BOUND; i-- ) {
      currentUp = {x: currentUp.x + distance.x, y: currentUp.y - distance.y};
      upPositions.push(currentUp);
    }
    for (let i = currentDown.y; i <= BOTTOM_RIGHT_BOUND; i++) {
      currentDown = {x: currentDown.x - distance.x, y: currentDown.y + distance.y};
      downPositions.push(currentDown);
    }
    upPositions.push(currentUp);
    downPositions.push(currentDown);
  }
  possiblePositions.push(...upPositions);
  possiblePositions.push(...downPositions);
  const validPositions = possiblePositions.filter((pos) => withinBounds(pos.x) && withinBounds(pos.y));
  return validPositions
}




const keys = Object.keys(positions);
const distances : Position[] =  []
keys.forEach((key) => {
  const position = [...positions[key]];
  while (position.length >= 2) {
    const a : Position = position.shift();
    for (const b of position) {
      const antinodePositions = getAntinodePositions(a, b);
      distances.push(...antinodePositions);
    }
  }
});

const uniqueDistances : Position[] = [];
for (const distance of distances) {
  if (!uniqueDistances.some((pos) => pos.x === distance.x && pos.y === distance.y)) {
    uniqueDistances.push(distance);
  }
}

console.log(uniqueDistances);
console.log(uniqueDistances.length);