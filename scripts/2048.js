
const gridSize = 4;
let board = [];
let score = 0;

function initBoard() {
  board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  score = parseInt(localStorage.getItem("2048Score")) || 0;
  let savedBoard = JSON.parse(localStorage.getItem("2048Board"));
  if (savedBoard) {
    board = savedBoard;
  } else {
    addRandomTile();
    addRandomTile();
  }
  renderBoard();
  document.addEventListener("keydown", handleKey);
}

function addRandomTile() {
  const empty = [];
  board.forEach((row, r) =>
    row.forEach((val, c) => {
      if (val === 0) empty.push([r, c]);
    })
  );
  if (empty.length === 0) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() > 0.1 ? 2 : 4;
}

function renderBoard() {
  const container = document.getElementById("game2048");
  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
  container.style.gap = "10px";

  board.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = cell === 0 ? "" : cell;
      tile.style.background = getTileColor(cell);
      container.appendChild(tile);
    });
  });

  localStorage.setItem("2048Board", JSON.stringify(board));
  localStorage.setItem("2048Score", score);
}

function getTileColor(val) {
  const colors = {
    0: "#333",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e"
  };
  return colors[val] || "#3c3a32";
}

function slide(row) {
  let arr = row.filter(val => val);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
    }
  }
  return arr.filter(val => val).concat(Array(gridSize - arr.filter(val => val).length).fill(0));
}

function rotateBoard(times) {
  for (let t = 0; t < times; t++) {
    board = board[0].map((_, i) => board.map(row => row[i]).reverse());
  }
}

function move(direction) {
  let moved = false;
  let original = JSON.stringify(board);

  if (direction === "left") {
    board = board.map(row => slide(row));
  } else if (direction === "right") {
    board = board.map(row => slide(row.reverse()).reverse());
  } else if (direction === "up") {
    rotateBoard(1);
    board = board.map(row => slide(row));
    rotateBoard(3);
  } else if (direction === "down") {
    rotateBoard(1);
    board = board.map(row => slide(row.reverse()).reverse());
    rotateBoard(3);
  }

  if (JSON.stringify(board) !== original) {
    addRandomTile();
    renderBoard();
  }

  if (isGameOver()) {
    setTimeout(() => alert("Game Over!"), 100);
  }
}

function handleKey(e) {
  switch (e.key) {
    case "ArrowLeft": move("left"); break;
    case "ArrowRight": move("right"); break;
    case "ArrowUp": move("up"); break;
    case "ArrowDown": move("down"); break;
  }
}

function isGameOver() {
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (board[r][c] === 0) return false;
      if (c < gridSize - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < gridSize - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
}

window.onload = initBoard;
