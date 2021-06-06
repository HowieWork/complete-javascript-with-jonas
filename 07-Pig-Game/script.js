'use strict';

// Select elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score = [0, 0];
let activePlayer = 0;
let currentScore = 0;

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generate a random number
  const randomDiceNum = Math.trunc(Math.random() * 6) + 1;

  // 2. Show matching dice image
  dice.src = `dice-${randomDiceNum}.png`;
  dice.classList.remove('hidden');

  // 3. Dice number === 1 ?
  if (randomDiceNum === 1) {
    // YES -> Switch player
    // (1) Update active player: CURRENT = 0; remove PLAYER--ACTIVE class
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    // (2) Store active player's score into SCORE array
    score[activePlayer] = currentScore;
    // (3) Reset currentScore
    currentScore = 0;
    // (4) Update activePlayer; add PLAYER--ACTIVE class
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  } else {
    // NO -> Add to current score
    currentScore += randomDiceNum;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }
});

// btnHold.addEventListener('click', function(){

// })
