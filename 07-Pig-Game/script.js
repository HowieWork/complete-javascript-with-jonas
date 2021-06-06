'use strict';

// Select elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');
