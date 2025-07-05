let max = 100;
let min = 1;
let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrhigh = document.querySelector('.low-or-high');
const startOver = document.querySelector('#resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('❌ Please enter a valid number');
  } else if (guess < min || guess > max) {
    alert(`⚠️ Please enter a number between ${min} and ${max}`);
  } else {
    prevGuess.push(guess);
    displayGuess(guess);

    if (guess === randomNumber) {
      displayMessage('🎉 You guessed it right!');
      endGame();
    } else if (numGuess === 10) {
      displayMessage(`❌ Game Over! The number was ${randomNumber}`);
      endGame();
    } else {
      displayMessage(guess < randomNumber ? '📉 Number is too low' : '📈 Number is too high');
    }

    numGuess++;
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  remaining.innerHTML = `${10 - numGuess + 1}`;
}

function displayMessage(message) {
  lowOrhigh.textContent = message;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', true);
  submit.setAttribute('disabled', true);
  p.classList.add('button');
  p.innerHTML = `<button id="newGame">🔄 Start New Game</button>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = '10';
    lowOrhigh.textContent = '';
    userInput.removeAttribute('disabled');
    submit.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}