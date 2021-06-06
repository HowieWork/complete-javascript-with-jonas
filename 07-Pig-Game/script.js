'use strict';

// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number
    const randomDiceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. Show matching dice image
    dice.src = `dice-${randomDiceNum}.png`;
    dice.classList.remove('hidden');

    // 3. Dice number === 1 ?
    if (randomDiceNum === 1) {
      // YES -> Switch player
      // (1) Before switch, update active player: CURRENT = 0
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // (2) Reset currentScore
      currentScore = 0;
      // (3) Switch: update activePlayer
      activePlayer = activePlayer === 0 ? 1 : 0;
      // (4) Toggle PLAYER--ACTIVE class
      switchPlayer();
    } else {
      // NO -> Add to current score
      currentScore += randomDiceNum;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Store active player's score into SCORE array
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Score >= 100 ?
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      // Switch active player
      activePlayer = activePlayer === 0 ? 1 : 0;
      // Toggle player--active class
      switchPlayer();
    }
  }
});
