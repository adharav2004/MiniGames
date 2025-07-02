const grid = document.getElementById("moleGrid");
const scoreDisplay = document.getElementById("score");
let score = 0;
let molePos = -1;

function buildGrid() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("button");
    hole.className = "mole-hole";
    hole.dataset.index = i;
    hole.addEventListener("click", whack);
    grid.appendChild(hole);
  }
}

function showMole() {
  const holes = document.querySelectorAll(".mole-hole");
  holes.forEach(h => h.textContent = "");
  molePos = Math.floor(Math.random() * 9);
  holes[molePos].textContent = "🐹";
}

function whack(e) {
  if (parseInt(e.target.dataset.index) === molePos) {
    score++;
    scoreDisplay.textContent = score;
    molePos = -1;
    e.target.textContent = "";
  }
}

buildGrid();
setInterval(showMole, 800);
