let currentPlayer = "X";
let buttons = document.querySelectorAll("#board button");
let statusText = document.getElementById("status");
let modeSelect = document.getElementById("modeSelect");

/* Score System */

let scoreX = 0;
let scoreO = 0;
let draws = 0;
let gameActive = true;

let highScore = localStorage.getItem("tttHighScore") || 0;
document.getElementById("highScore").textContent = highScore;

/* Click Events */

buttons.forEach((btn, index) => {

btn.addEventListener("click", () => {

if (!gameActive || btn.textContent !== "") return;

makeMove(btn, index);

});

});

/* Player Move */

function makeMove(btn, index){

btn.textContent = currentPlayer;
btn.disabled = true;

if(checkWinner()){

statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
updateScore(currentPlayer);
gameActive = false;
return;

}

if(checkDraw()){

statusText.textContent = "🤝 It's a Draw!";
draws++;
document.getElementById("draws").textContent = draws;
gameActive = false;
return;

}

switchPlayer();

/* AI Move */

if(modeSelect.value === "ai" && currentPlayer === "O"){

setTimeout(aiMove, 400);

}

}

/* Switch Player */

function switchPlayer(){

currentPlayer = currentPlayer === "X" ? "O" : "X";
statusText.textContent = `Player ${currentPlayer}'s Turn`;

}

/* AI Logic */

function aiMove(){

let emptyCells = [];

buttons.forEach((btn, index)=>{
if(btn.textContent === "") emptyCells.push(index);
});

let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];

makeMove(buttons[randomIndex], randomIndex);

}

/* Winner Check */

function checkWinner(){

const combos = [

[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]

];

for(let combo of combos){

let [a,b,c] = combo;

if(

buttons[a].textContent === currentPlayer &&
buttons[b].textContent === currentPlayer &&
buttons[c].textContent === currentPlayer

){

buttons[a].style.background = "#28a745";
buttons[b].style.background = "#28a745";
buttons[c].style.background = "#28a745";

return true;

}

}

return false;

}

/* Draw Check */

function checkDraw(){

return [...buttons].every(btn => btn.textContent !== "");

}

/* Score Update */

function updateScore(winner){

if(winner === "X"){

scoreX++;
document.getElementById("scoreX").textContent = scoreX;

}

if(winner === "O"){

scoreO++;
document.getElementById("scoreO").textContent = scoreO;

}

let maxScore = Math.max(scoreX,scoreO);

if(maxScore > highScore){

highScore = maxScore;

localStorage.setItem("tttHighScore", highScore);

document.getElementById("highScore").textContent = highScore;

}

}

/* Restart Round */

function restartGame(){

buttons.forEach(btn => {

btn.textContent = "";
btn.disabled = false;
btn.style.background = "#222";

});

currentPlayer = "X";
gameActive = true;

statusText.textContent = "Player X's Turn";

}

/* Reset Scores */

function resetScores(){

scoreX = 0;
scoreO = 0;
draws = 0;

document.getElementById("scoreX").textContent = 0;
document.getElementById("scoreO").textContent = 0;
document.getElementById("draws").textContent = 0;

localStorage.removeItem("tttHighScore");
highScore = 0;
document.getElementById("highScore").textContent = 0;

}