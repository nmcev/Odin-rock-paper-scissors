let player;
let computer;

let playerScore = 0;
let computerScore = 0;

let playerResult_div = document.getElementById('player_resultD');
let compResult_div = document.getElementById('comp_resultD');
const gameOverScreen = document.getElementById('game-over-screen');
const playAgainButton = document.getElementById('play-again-button');


let result_div = document.getElementById('result');

const btn = document.querySelectorAll('.btn');
btn.forEach(button => button.addEventListener('click', () => {

  if (playerScore == 5 || computerScore == 5) {
    return;
  }
  player = button.dataset.pickValue;
  computer = computerChoice();

  let result = playRound(player, computer);
  displayResults(player, computer, result);
  updateScoreboard();
  calcWinner();
}));

function computerChoice() {
  let random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function playRound(player, computer) {
  let result;
  if (player === computer) {
    result = `IT'S TIE 😵 ,You picked ${player} and computer picked ${computer}`;
  } else if (
    (player === "ROCK" && computer === "PAPER") ||
    (player === "PAPER" && computer === "SCISSORS") ||
    (player === "SCISSORS" && computer === "ROCK")
  ) {
    result = `The computer is the winner by picking ${computer}.`;
    computerScore++;
  } else {
    result = `You are the Winner 🏆 by picking ${player} and the Computer Picked ${computer}.`;
    playerScore++;
  }
  return result;
}

const displayResults = (player, computer, result) => {
  result_div.textContent = result;

  // Remove existing CSS classes
  result_div.classList.remove('win', 'lose', 'tie');

  if (result === `IT'S TIE 😵 ,You picked ${player} and computer picked ${computer}`) {
    result_div.classList.add('tie');
  } else if (result.startsWith('The computer is the winner')) {
    result_div.classList.add('lose');
  } else {
    result_div.classList.add('win');
  }
}

const updateScoreboard = () => {
  playerResult_div.textContent = `Player: ${playerScore}`;
  compResult_div.textContent = `Computer: ${computerScore}`;
}

const calcWinner = () => {
  if (playerScore == 5) {
    result_div.textContent = "Congratulations🎉! You have won the game";
    disableButtons();
    gameOverScreen.style.display = 'block';

  } else if (computerScore == 5) {
    result_div.textContent = "Game over🚨! The computer has won";
    disableButtons();
    gameOverScreen.style.display = 'block';
  }
}

const disableButtons = () => {
  btn.forEach(button => button.disabled = true);
  btn.forEach(button => button.classList.add("hidden"));
}

playAgainButton.addEventListener("click", () => {
 resetGame();
})

const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  result_div.textContent = "";
  playerResult_div.textContent = '';
  compResult_div.textContent = '';
  gameOverScreen.style.display = "none";
  btn.forEach(button => button.disabled = false);
  btn.forEach(button => button.classList.remove("hidden"));
}