let player;
let computer;

let yourPick = document.getElementById('status');
let compPick = document.getElementById('computer');
let result_div = document.getElementById('result');

let five = document.getElementById('five-round');


const btn = document.querySelectorAll('.btn');
btn.forEach(button => button.addEventListener('click',() =>{
  player = button.classList[2].toUpperCase();
  computer = computerChoice()
  let result = playRound(player, computer)
  displayResults(player, computer,result)
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
  
  function playRound(player, computer) 
  {
    return player === computer? "IT'S TIE 😵"

    : player === "ROCK" && computer === "PAPER" ||
      player === "PAPER" && computer === "SCISSORS" ||
      player === "SCISSORS" && computer === "ROCK"
      ? 
      `The computer is the winner  by picking a ${computer} .`
      
      : `You are the Winner 🏆 by picking ${player} and the Computer Picked ${computer}.`;
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