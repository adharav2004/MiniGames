const grid = document.getElementById("game2048");
const scoreDisplay = document.getElementById("score");
const bestDisplay = document.getElementById("bestScore");

let board = [];
let score = 0;
let bestScore = localStorage.getItem("best2048") || 0;

bestDisplay.textContent = bestScore;

/* Initialize Game */

function initGame(){

board = [
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0]
];

score = 0;
scoreDisplay.textContent = score;

addTile();
addTile();
drawBoard();

}

/* Draw Board */

function drawBoard(){

grid.innerHTML = "";

for(let r=0; r<4; r++){

for(let c=0; c<4; c++){

const tile = document.createElement("div");

tile.className = "tile";

let value = board[r][c];

tile.textContent = value === 0 ? "" : value;

tile.style.background = getTileColor(value);

grid.appendChild(tile);

}

}

}

/* Add New Tile */

function addTile(){

let empty = [];

for(let r=0; r<4; r++){
for(let c=0; c<4; c++){

if(board[r][c] === 0){
empty.push({r,c});
}

}
}

if(empty.length === 0) return;

let spot = empty[Math.floor(Math.random()*empty.length)];

board[spot.r][spot.c] = Math.random() < 0.9 ? 2 : 4;

}

/* Move Left */

function moveLeft(){

for(let r=0; r<4; r++){

let row = board[r].filter(v => v);

for(let i=0; i<row.length-1; i++){

if(row[i] === row[i+1]){

row[i] *= 2;
score += row[i];
row[i+1] = 0;

}

}

row = row.filter(v => v);

while(row.length < 4) row.push(0);

board[r] = row;

}

}

/* Rotate Board */

function rotateBoard(){

let newBoard = [];

for(let c=0; c<4; c++){

newBoard[c] = [];

for(let r=3; r>=0; r--){

newBoard[c].push(board[r][c]);

}

}

board = newBoard;

}

/* Handle Move */

function move(dir){

let rotated = 0;

if(dir === "up") rotated = 3;
if(dir === "right") rotated = 2;
if(dir === "down") rotated = 1;

for(let i=0;i<rotated;i++) rotateBoard();

moveLeft();

for(let i=0;i<(4-rotated)%4;i++) rotateBoard();

addTile();

updateScore();
drawBoard();

checkGame();

}

/* Score */

function updateScore(){

scoreDisplay.textContent = score;

if(score > bestScore){

bestScore = score;

localStorage.setItem("best2048", bestScore);

bestDisplay.textContent = bestScore;

}

}

/* Game Check */

function checkGame(){

for(let r=0;r<4;r++){
for(let c=0;c<4;c++){

if(board[r][c] === 2048){

setTimeout(()=>{
alert("🎉 You reached 2048!");
},100);

return;

}

}
}

let empty = board.flat().includes(0);

if(!empty){

setTimeout(()=>{
alert("Game Over!");
},100);

}

}

/* Colors */

function getTileColor(value){

const colors = {

0:"#333",
2:"#eee4da",
4:"#ede0c8",
8:"#f2b179",
16:"#f59563",
32:"#f67c5f",
64:"#f65e3b",
128:"#edcf72",
256:"#edcc61",
512:"#edc850",
1024:"#edc53f",
2048:"#edc22e"

};

return colors[value] || "#3c3a32";

}

/* Keyboard Controls */

document.addEventListener("keydown", e=>{

if(e.key === "ArrowLeft") move("left");
if(e.key === "ArrowRight") move("right");
if(e.key === "ArrowUp") move("up");
if(e.key === "ArrowDown") move("down");

});

/* Restart */

function restartGame(){

initGame();

}

/* Start Game */

initGame();