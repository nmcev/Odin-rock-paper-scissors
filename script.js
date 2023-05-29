let player;
let computer;

let playerScore = 0;
let computerScore = 0;

let textRounds = document.querySelector('.playing-times');
let numRoundsInput = document.querySelector('#numRoundsInput');
let numRounds = 5;


numRoundsInput.addEventListener('change', () => {
  numRounds = parseInt(numRoundsInput.value);
});

let playerResult_div = document.getElementById('player_resultD');
let compResult_div = document.getElementById('comp_resultD');
const gameOverScreen = document.getElementById('game-over-screen');
const playAgainButton = document.getElementById('play-again-button');
const rockBtn = document.querySelector('.btn-1')
rockBtn.addEventListener('click', () => {
  playSound("audio/theRock.mp3");
})
let result_div = document.getElementById('result');

// New variable to track if tie sound has been played
let tieSoundPlayed = false;

const btn = document.querySelectorAll('.btn');
btn.forEach(button => button.addEventListener('click', () => {

  if (playerScore === numRounds || computerScore === numRounds) {
    return;
  }
  player = button.dataset.pickValue;
  computer = computerChoice();

  let result = playRound(player, computer);
  displayResults(player, computer, result);
  updateScoreboard();
  calcWinner();
  tieSound();

  numRoundsInput.classList.add('remove-input');
  numRoundsInput.disabled = true;
  textRounds.classList.add('remove-text')
  textRounds.disabled = true;
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
  if (playerScore == numRounds) {
    result_div.textContent = "Congratulations🎉! You have won the game";
    disableButtons();
    playSound("audio/winning.mp3");
    gameOverScreen.style.display = 'block';

  } else if (computerScore == numRounds) {
    result_div.textContent = "Game over🚨! The computer has won";
    disableButtons();
    playSound("audio/losing.mp3")
    gameOverScreen.style.display = 'block';
  }
}

const disableButtons = () => {
  btn.forEach(button => button.disabled = true);
  btn.forEach(button => button.classList.add("hidden"));
}

playAgainButton.addEventListener("click", () => {
  resetGame();
  playSound("audio/duck.mp3")
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
  // Reset tie sound flag
  tieSoundPlayed = false;

  numRoundsInput.value = '5';
  numRoundsInput.classList.remove('remove-input');
  numRoundsInput.disabled = false;
  textRounds.classList.remove('remove-text');
  textRounds.disabled = false;

  numRounds = parseInt(numRoundsInput.value);

}

const playSound = (audioName) => {
  let audio = new Audio(audioName)
  audio.play();
}

const tieSound = () => {
  if (playerScore > 0 && computerScore > 0 &&
    playerScore === computerScore &&
    !tieSoundPlayed
  ) {
    playSound("audio/susSound.mp3");
    tieSoundPlayed = true;
  }
}
