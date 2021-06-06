'use strict';

// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const players = document.querySelectorAll('.player');
const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generate a random number
  const randomNum = Math.trunc(Math.random() * 6) + 1;

  // 2. Show matching dice image
  dice.src = `dice-${randomNum}.png`;
  dice.classList.remove('hidden');

  // 3. If dice number is 1, switch player
  if (randomNum === 1) {
    players.forEach(player => {
      if (player.classList.contains('player--active')) {
        player.classList.remove('player--active');
      } else {
        currentScore = 0;
        player.classList.add('player--active');
      }
    });
  } else {
    players.forEach(player => {
      if (player.classList.contains('player--active')) {
        currentScore += randomNum;
        player.lastElementChild.lastElementChild.textContent = currentScore;
      }
    });
  }
});
