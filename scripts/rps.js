let mode = "cpu"; // cpu or pvp
let player1Choice = null;

let playerScore = 0;
let player2Score = 0;

function setMode(selectedMode){
mode = selectedMode;
resetGame();
}

function play(choice){

const result = document.getElementById("result");

/* PLAYER VS COMPUTER */

if(mode === "cpu"){

const choices = ["rock","paper","scissors"];
const comp = choices[Math.floor(Math.random()*3)];

showChoices(choice, comp);

if(choice === comp){

result.textContent = "🤝 It's a Tie!";

}

else if(
(choice === "rock" && comp === "scissors") ||
(choice === "paper" && comp === "rock") ||
(choice === "scissors" && comp === "paper")
){

playerScore++;
result.textContent = `🎉 You Win! Computer chose ${comp}`;

}

else{

player2Score++;
result.textContent = `💻 Computer Wins! Computer chose ${comp}`;

}

updateScore();

}

/* PLAYER VS PLAYER */

if(mode === "pvp"){

if(!player1Choice){

player1Choice = choice;
result.textContent = "Player 2 choose now";

return;

}

const player2Choice = choice;

showChoices(player1Choice, player2Choice);

if(player1Choice === player2Choice){

result.textContent = "🤝 It's a Tie!";

}

else if(
(player1Choice === "rock" && player2Choice === "scissors") ||
(player1Choice === "paper" && player2Choice === "rock") ||
(player1Choice === "scissors" && player2Choice === "paper")
){

playerScore++;
result.textContent = "🎉 Player 1 Wins!";

}

else{

player2Score++;
result.textContent = "🎉 Player 2 Wins!";

}

player1Choice = null;

updateScore();

}

}

/* Update Scores */

function updateScore(){

document.getElementById("playerScore").textContent = playerScore;
document.getElementById("computerScore").textContent = player2Score;

}

/* Show Choices with Icons */

function showChoices(p1, p2){

const icons = {
rock:"✊",
paper:"📄",
scissors:"✂️"
};

document.getElementById("result").innerHTML =
`Player 1: ${icons[p1]} vs Player 2: ${icons[p2]}`;

}

/* Reset Game */

function resetGame(){

playerScore = 0;
player2Score = 0;
player1Choice = null;

document.getElementById("playerScore").textContent = 0;
document.getElementById("computerScore").textContent = 0;

document.getElementById("result").textContent = "Choose Rock, Paper or Scissors";

}