'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// FIXME Delete line of code below
console.log(secretNumber);

document.querySelector('.check').addEventListener('click', function () {
  // IMPORTANT input value will be a STRING
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is NO input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';

    // When the guess is CORRECT
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    // Set up highscore
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
    }

    // When the guess is too HIGH
  } else if (guess > secretNumber) {
    if (score > 0) {
      document.querySelector('.message').textContent = '📈 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      score = 0;
    }

    // When the guess is too LOW
  } else if (guess < secretNumber) {
    if (score > 0) {
      document.querySelector('.message').textContent = '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      score = 0;
    }
  }
});

// Reset game
document.querySelector('.again').addEventListener('click', function () {
  // Reset secretNumber
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // FIXME Delete line of code below
  console.log(secretNumber);

  // Reset score
  score = 20;
  document.querySelector('.score').textContent = score;

  // Reset input
  document.querySelector('.guess').value = '';

  // Reset message
  document.querySelector('.message').textContent = 'Start guessing...';

  // Reset others
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
});
