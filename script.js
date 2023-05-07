let player;
let computer;

let playerScore = 0;
let computerScore = 0;

let playerRsult_div = document.getElementById('player_resultD');
let compResult_div = document.getElementById('comp_resultD');

let yourPick = document.getElementById('status');
let compPick = document.getElementById('computer');
let result_div = document.getElementById('result');

const btn = document.querySelectorAll('.btn');
btn.forEach(button => button.addEventListener('click', () => {
  player = button.classList[2].toUpperCase();
  computer = computerChoice()

  let result = playRound(player, computer)
  displayResults(player, computer, result)
  updateScoreboard();
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
    result = "IT'S TIE 😵";
  } else if (
    (player === "ROCK" && computer === "PAPER") ||
    (player === "PAPER" && computer === "SCISSORS") ||
    (player === "SCISSORS" && computer === "ROCK")
  ) {
    result = `The computer is the winner  by picking a ${computer} .`;
    computerScore++;
  } else {
    result = `You are the Winner 🏆 by picking ${player} and the Computer Picked ${computer}.`;
    playerScore++;
  }
  return result;
}

const displayResults = (player, computer, result) => {
  yourPick.textContent = `You Picked ${player}.`
  compPick.textContent = `Computer Picked ${computer}.`
  result_div.textContent = result;

  // Remove existing CSS classes
  result_div.classList.remove('win', 'lose', 'tie');

  if (result === "IT'S TIE 😵") {
    result_div.classList.add('tie');
  } else if (result.startsWith('The computer is the winner')) {
    result_div.classList.add('lose');
  } else {
    result_div.classList.add('win');
  }
}

const updateScoreboard = () => {
  playerRsult_div.textContent = `Player: ${playerScore}`;
  compResult_div.textContent = `Computer: ${computerScore}`;
}