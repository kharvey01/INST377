var user;
var computer;

//Gets user choice, places in global variable, then adds to page
function userChoice(){
  user = document.getElementById("hand").value;
  if(user == "rock"){
    document.getElementById('user').innerHTML = "ROCK";
  }else if(user == "paper"){
    document.getElementById('user').innerHTML = "PAPER";
  } else {
    document.getElementById('user').innerHTML = "SCISSORS";
  }
}

//Randomly generates computers choice 
function computerHand(){
  let compHands = ["rock", "paper","scissors","spock"];
  const randomChoice = Math.floor(Math.random() * 4);
  if(randomChoice == 0) {
    return "rock";
  } else if(randomChoice == 1) {
    return "paper";
  } else if(randomChoice == 2) {
    return "scissors";
  } else {
    return "spock";
  }
}

//Gets computer choice, places in global variable, then adds to page
function computerChoice(){
  computer = computerHand();
  if(computer == "rock"){
    document.getElementById('computer').innerHTML = "ROCK";
  } else if(computer == "paper"){
    document.getElementById('computer').innerHTML = "PAPER";
  } else if(computer == "scissors") {
    document.getElementById('computer').innerHTML = "SCISSORS";
  } else {
    document.getElementById('computer').innerHTML = "SPOCK";
  }
}

//Determines who wins the game, alerts outcome, then changes page color
function gameResult(){
  if(user == computer) {
    alert("It's a TIE!");
    document.body.style.backgroundColor = "blue"
  } else if (computer == "spock") {
    alert("Computer won, you lost!");
    document.body.style.backgroundColor = "red"
  } else if ((user == "rock") && (computer == 'paper')) {
    alert("Computer won, you lost!");
    document.body.style.backgroundColor = "red"
  } else if ((user == "rock") && (computer == 'scissors')) {
    alert("YOU WON!!!!");
    document.body.style.backgroundColor = "green"
  } else if ((user == "paper") && (computer == 'scissors')) {
    alert("Computer won, you lost!");
    document.body.style.backgroundColor = "red"
  } else if ((user == "paper") && (computer == 'rock')) {
    alert("YOU WON!!!!");
    document.body.style.backgroundColor = "green"
  } else if ((user == "scissors") && (computer == 'rock')) {
    alert("Computer won, you lost!");
    document.body.style.backgroundColor = "red"
  } else if((user == "scissors") && (computer == 'paper')) {
    alert("YOU WON!!!!");
    document.body.style.backgroundColor = "green"
  }
}



