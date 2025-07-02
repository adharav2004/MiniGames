const board = document.getElementById("memory-board");
const emojis = ["🍎","🍌","🍇","🍉","🍓","🍍"];
let cards = [...emojis, ...emojis];
let flipped = [];
let matched = 0;

cards.sort(() => Math.random() - 0.5);

cards.forEach(emoji => {
  const card = document.createElement("button");
  card.textContent = "❓";
  card.dataset.value = emoji;
  card.addEventListener("click", () => {
    if (card.disabled || flipped.length === 2) return;
    card.textContent = emoji;
    flipped.push(card);
    if (flipped.length === 2) {
      setTimeout(() => {
        if (flipped[0].dataset.value === flipped[1].dataset.value) {
          flipped[0].disabled = flipped[1].disabled = true;
          matched++;
          if (matched === emojis.length) alert("You Win!");
        } else {
          flipped[0].textContent = flipped[1].textContent = "❓";
        }
        flipped = [];
      }, 500);
    }
  });
  board.appendChild(card);
});
