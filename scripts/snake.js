const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = 20;
let snake = [{x: 160, y: 160}];
let dx = size, dy = 0;
let food = randomFood();
let score = 0;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) dx = 0, dy = -size;
  if (e.key === "ArrowDown" && dy === 0) dx = 0, dy = size;
  if (e.key === "ArrowLeft" && dx === 0) dx = -size, dy = 0;
  if (e.key === "ArrowRight" && dx === 0) dx = size, dy = 0;
});

function randomFood() {
  return {
    x: Math.floor(Math.random()*20)*size,
    y: Math.floor(Math.random()*20)*size
  };
}

function draw() {
  ctx.clearRect(0,0,400,400);
  ctx.fillStyle = "green";
  snake.forEach(p => ctx.fillRect(p.x, p.y, size, size));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, size, size);

  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
    score++;
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 || snake.slice(1).some(p => p.x === head.x && p.y === head.y)) {
    alert("Game Over");
    location.reload();
  }

  setTimeout(draw, 100);
}

draw();
