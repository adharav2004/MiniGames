const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const size = 20;
const grid = 20;

let snake;
let dx;
let dy;
let food;
let score;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let level;
let gameInterval;
let gameRunning = false;

document.getElementById("highScore").innerText = highScore;

function initGame(){
    snake = [{x:160,y:160}];
    dx = size;
    dy = 0;
    food = randomFood();
    score = 0;
    level = 1;

    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    document.getElementById("status").innerText = "Ready";
}

document.addEventListener("keydown", e => {

if(!gameRunning) return;

if (e.key === "ArrowUp" && dy === 0){
    dx = 0;
    dy = -size;
}

if (e.key === "ArrowDown" && dy === 0){
    dx = 0;
    dy = size;
}

if (e.key === "ArrowLeft" && dx === 0){
    dx = -size;
    dy = 0;
}

if (e.key === "ArrowRight" && dx === 0){
    dx = size;
    dy = 0;
}

});

function randomFood(){
    return{
        x: Math.floor(Math.random()*grid)*size,
        y: Math.floor(Math.random()*grid)*size
    };
}

function startGame(){

if(gameRunning) return;

gameRunning = true;
document.getElementById("status").innerText = "Running";

let speed = document.getElementById("speedSelect").value;

gameInterval = setInterval(draw, speed);

}

function pauseGame(){

if(!gameRunning) return;

gameRunning = false;
clearInterval(gameInterval);

document.getElementById("status").innerText = "Paused";

}

function restartGame(){

clearInterval(gameInterval);
initGame();
startGame();

}

function draw(){

ctx.clearRect(0,0,400,400);

ctx.fillStyle = "lime";

snake.forEach(part=>{
ctx.fillRect(part.x, part.y, size, size);
});

ctx.fillStyle = "red";
ctx.fillRect(food.x, food.y, size, size);

const head = {
x: snake[0].x + dx,
y: snake[0].y + dy
};

if(head.x === food.x && head.y === food.y){

food = randomFood();
score += 10;

document.getElementById("score").innerText = score;

if(score > highScore){
highScore = score;
localStorage.setItem("snakeHighScore", highScore);
document.getElementById("highScore").innerText = highScore;
}

level = Math.floor(score/50)+1;
document.getElementById("level").innerText = level;

}else{

snake.pop();

}

snake.unshift(head);

if(
head.x < 0 ||
head.x >= 400 ||
head.y < 0 ||
head.y >= 400 ||
snake.slice(1).some(p => p.x === head.x && p.y === head.y)
){

gameOver();

}

}

function gameOver(){

clearInterval(gameInterval);
gameRunning = false;

document.getElementById("status").innerText = "Game Over";

setTimeout(()=>{
alert("Game Over! Your score: " + score);
},100);

}

initGame();