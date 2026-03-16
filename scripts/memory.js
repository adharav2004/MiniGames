const board = document.getElementById("memory-board");

const movesDisplay = document.getElementById("moves");
const highScoreDisplay = document.getElementById("highscore");
const timerDisplay = document.getElementById("timer");
const winMessage = document.getElementById("winMessage");

const emojis = ["🍎","🍌","🍇","🍉","🍓","🍍"];

let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;

const MAX_TIME = 30;  // countdown from 30 seconds
let timer = MAX_TIME;
let timerInterval;
let timerStarted = false;  // track if timer started

let highScore = localStorage.getItem("memoryHighScore") || 0;
highScoreDisplay.textContent = highScore;

function startTimer() {
  timerDisplay.textContent = timer;

  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      endGameDueToTimeout();
    }
  }, 1000);
}

function endGameDueToTimeout() {
  const allCards = document.querySelectorAll('.memory-card');
  allCards.forEach(card => card.disabled = true);

  winMessage.innerHTML = "⏰ Time's up! Try again.";
}

function startGame() {
  cards = [...emojis, ...emojis];
  cards.sort(() => Math.random() - 0.5);

  board.innerHTML = "";
  flipped = [];
  matched = 0;
  moves = 0;
  timer = MAX_TIME;
  timerStarted = false;

  clearInterval(timerInterval);

  movesDisplay.textContent = moves;
  timerDisplay.textContent = timer;
  winMessage.textContent = "";

  cards.forEach(emoji => {
    const card = document.createElement("button");
    card.className = "memory-card btn btn-dark";
    card.textContent = "❓";
    card.dataset.value = emoji;

    card.addEventListener("click", () => flipCard(card));

    board.appendChild(card);
  });
}

function flipCard(card) {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  if (card.disabled || flipped.length === 2) return;

  card.textContent = card.dataset.value;
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    setTimeout(checkMatch, 600);
  }
}

function checkMatch() {
  let [card1, card2] = flipped;

  if (card1.dataset.value === card2.dataset.value) {
    card1.disabled = true;
    card2.disabled = true;

    card1.classList.add("btn-success");
    card2.classList.add("btn-success");

    matched++;

    if (matched === emojis.length) {
      clearInterval(timerInterval);
      winMessage.innerHTML = "🎉 You Won!";

      if (highScore == 0 || moves < highScore) {
        localStorage.setItem("memoryHighScore", moves);
        highScoreDisplay.textContent = moves;
      }
    }
  } else {
    card1.textContent = "❓";
    card2.textContent = "❓";
  }

  flipped = [];
}

function restartGame() {
  startGame();
}

startGame();