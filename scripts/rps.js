function play(user) {
  const choices = ["rock", "paper", "scissors"];
  const comp = choices[Math.floor(Math.random()*3)];
  const result = document.getElementById("result");

  if (user === comp) result.textContent = "It's a tie!";
  else if ((user === "rock" && comp === "scissors") || (user === "paper" && comp === "rock") || (user === "scissors" && comp === "paper")) {
    result.textContent = `You win! Computer chose ${comp}`;
  } else {
    result.textContent = `You lose! Computer chose ${comp}`;
  }
}
