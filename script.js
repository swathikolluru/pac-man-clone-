const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const CELL = 30;

const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let score = 0;

const player = {
  x: CELL,
  y: CELL,
  dx: 0,
  dy: 0,
  speed: 2
};

const ghost = {
  x: 18 * CELL,
  y: 1 * CELL,
  dx: 0,
  dy: 0,
  speed: 1.5
};

function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
      if (map[y][x] === 2) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x * CELL + 15, y * CELL + 15, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(player.x + 15, player.y + 15, 12, 0, Math.PI * 2);
  ctx.fill();
}

function drawGhost() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(ghost.x + 15, ghost.y + 15, 12, 0, Math.PI * 2);
  ctx.fill();
}

function canMove(x, y) {
  let gridX = Math.floor(x / CELL);
  let gridY = Math.floor(y / CELL);
  return map[gridY][gridX] !== 1;
}

function updatePlayer() {
  let nx = player.x + player.dx;
  let ny = player.y + player.dy;

  if (canMove(nx, ny)) {
    player.x = nx;
    player.y = ny;
  }

  let gx = Math.floor(player.x / CELL);
  let gy = Math.floor(player.y / CELL);

  if (map[gy][gx] === 2) {
    map[gy][gx] = 0;
    score++;
    scoreEl.textContent = score;
  }
}

function updateGhost() {
  let dx = player.x - ghost.x;
  let dy = player.y - ghost.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    ghost.dx = dx > 0 ? ghost.speed : -ghost.speed;
    ghost.dy = 0;
  } else {
    ghost.dy = dy > 0 ? ghost.speed : -ghost.speed;
    ghost.dx = 0;
  }

  let nx = ghost.x + ghost.dx;
  let ny = ghost.y + ghost.dy;

  if (canMove(nx, ny)) {
    ghost.x = nx;
    ghost.y = ny;
  }
}

function checkCollision() {
  let dist = Math.hypot(player.x - ghost.x, player.y - ghost.y);
  if (dist < 20) {
    alert("GAME OVER");
    location.reload();
  }
}

function checkWin() {
  for (let row of map) {
    if (row.includes(2)) return;
  }
  alert("YOU WIN");
  location.reload();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMap();
  updatePlayer();
  updateGhost();
  checkCollision();
  checkWin();

  drawPlayer();
  drawGhost();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.dx = -player.speed;
    player.dy = 0;
  }
  if (e.key === "ArrowRight") {
    player.dx = player.speed;
    player.dy = 0;
  }
  if (e.key === "ArrowUp") {
    player.dy = -player.speed;
    player.dx = 0;
  }
  if (e.key === "ArrowDown") {
    player.dy = player.speed;
    player.dx = 0;
  }
});

gameLoop();
