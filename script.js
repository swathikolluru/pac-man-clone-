const grid = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,0,2,2,2,2,1],
  [1,2,1,2,1,2,1,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,0,1,1,2,2,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1],
];

const game = document.getElementById("game");
const scoreEl = document.getElementById("score");

let player = { x: 1, y: 1 };
let score = 0;

function draw() {
  game.innerHTML = "";

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (grid[y][x] === 1) cell.classList.add("wall");
      if (grid[y][x] === 2) cell.classList.add("dot");

      if (player.x === x && player.y === y) {
        cell.classList.add("player");
      }

      game.appendChild(cell);
    }
  }
}

function move(dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;

  if (grid[ny][nx] !== 1) {
    player.x = nx;
    player.y = ny;

    if (grid[ny][nx] === 2) {
      grid[ny][nx] = 0;
      score++;
      scoreEl.textContent = score;
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
});

draw();
