'use strict';
const getRandomNum = function () {
  return Math.trunc(Math.random() * 20) + 1;
};
const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

let secretNumber = getRandomNum();
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  // IMPORTANT input value will be a STRING
  const guess = Number(document.querySelector('.guess').value);

  // When there is NO input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When the guess is CORRECT
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    // Set up highscore
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
    }

    // When the guess is WRONG
  } else if (guess !== secretNumber) {
    if (score > 0) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      score = 0;
    }
  }
});

// Reset game
document.querySelector('.again').addEventListener('click', function () {
  // Reset secretNumber
  secretNumber = getRandomNum();

  // Reset score
  score = 20;
  document.querySelector('.score').textContent = score;

  // Reset input
  document.querySelector('.guess').value = '';

  // Reset message
  displayMessage('Start guessing...');

  // Reset others
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
});
