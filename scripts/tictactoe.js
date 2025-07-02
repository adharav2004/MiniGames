let currentPlayer = "X";
let buttons = document.querySelectorAll("#board button");
let statusText = document.getElementById("status");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "") {
      btn.textContent = currentPlayer;
      btn.disabled = true;
      if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        buttons.forEach(b => b.disabled = true);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  });
});

function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(c => 
    buttons[c[0]].textContent === currentPlayer &&
    buttons[c[1]].textContent === currentPlayer &&
    buttons[c[2]].textContent === currentPlayer
  );
}
