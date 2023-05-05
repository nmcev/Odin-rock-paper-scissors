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
  
  function playRound(choice, computerPlay) 
  {
    console.log("Enter your choice for the game (rock, paper, scissors): ");
    // Handle the draw case
    if (choice === computerPlay)
    {
      return "DRAW";
    }
    // Handle the case when the computer wins
    else if (
      (choice === "ROCK" && computerPlay === "PAPER") ||
      (choice === "PAPER" && computerPlay === "SCISSORS") ||
      (choice === "SCISSORS" && computerPlay === "ROCK")
            ) 
    {
      return `The computer is the winner by picking a ${computerPlay}.`;
    }
    // Handle the case when the player wins
    else  
    {
      return `You are the winner by picking ${choice} and the computer picked ${computerPlay}.`;
    }
  }
  
  let computerPlay = computerChoice();
  let playerTurn = playRound("PAPER", computerPlay);