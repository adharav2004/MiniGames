const grid = document.getElementById("moleGrid");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const timerDisplay = document.getElementById("timer");
const statusText = document.getElementById("status");

let score = 0;
let molePos = -1;
let timeLeft = 30;

let moleInterval = null;
let timerInterval = null;

let highScore = localStorage.getItem("moleHighScore") || 0;
highScoreDisplay.textContent = highScore;

/* Build Grid (12 Holes) */

function buildGrid(){

grid.innerHTML = "";

for(let i = 0; i < 12; i++){

const hole = document.createElement("button");

hole.className = "mole-hole btn btn-dark";
hole.dataset.index = i;

hole.style.height = "90px";
hole.style.fontSize = "40px";

hole.addEventListener("click", whack);

grid.appendChild(hole);

}

}

/* Show Mole */

function showMole(){

const holes = document.querySelectorAll(".mole-hole");

holes.forEach(h => h.textContent = "");

molePos = Math.floor(Math.random() * 12);

holes[molePos].textContent = "🐹";

}

/* Hit Mole */

function whack(e){

if(parseInt(e.target.dataset.index) === molePos){

score++;

scoreDisplay.textContent = score;

/* hit animation */

e.target.textContent = "💥";

setTimeout(()=>{

e.target.textContent = "";

},200);

molePos = -1;

}

}

/* Start Game */

function startGame(){

restartGame();

statusText.textContent = "Game Running!";

moleInterval = setInterval(showMole, getSpeed());

timerInterval = setInterval(updateTimer,1000);

}

/* Timer */

function updateTimer(){

timeLeft--;

timerDisplay.textContent = timeLeft;

if(timeLeft <= 0){

endGame();

}

}

/* End Game */

function endGame(){

clearInterval(moleInterval);
clearInterval(timerInterval);

statusText.textContent = "Game Over!";

if(score > highScore){

highScore = score;

localStorage.setItem("moleHighScore", highScore);

highScoreDisplay.textContent = highScore;

}

}

/* Restart */

function restartGame(){

clearInterval(moleInterval);
clearInterval(timerInterval);

score = 0;
timeLeft = 30;

scoreDisplay.textContent = score;
timerDisplay.textContent = timeLeft;

buildGrid();

}

/* Speed Levels */

function getSpeed(){

if(score < 10) return 800;
if(score < 20) return 600;
if(score < 30) return 450;

return 300;

}

/* Initialize Grid */

buildGrid();