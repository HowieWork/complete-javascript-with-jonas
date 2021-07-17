'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
///////////////////////////////////////
// NOTE 1. Selecting, Creating/Inserting, Deleting elements
// 1.1 Selecting elements
// (1) querySelector
const sections = document.querySelectorAll('.section');
// (2) document.getElement(s)
// document.getElementById
// const btns = document.getElementsByTagName('button');
const btns = document.getElementsByClassName('btn');
// console.log(btns);

// 1.2 Creating and inserting elements
// (1) prepend; append *insert element as CHILD
const message = document.createElement('div');
const header = document.querySelector('.header');
message.innerHTML =
  "<p>I enjoy <strong>cooking</strong></p> <btn class='btn btn--close-cookie'>Close</btn>";
message.classList.add('cookie-message');
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// (2) before; after *insert element as SIBLING
// header.before(message);
// header.after(message);
// header.insertAdjacentElement('afterbegin', message);

// 1.3 Deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // message.parentElement.removeChild(message); // old way
  message.remove(); // remove method is new
});

///////////////////////////////////////
// NOTE 2. Styles, Attributes and Classes
// 2.1 Styles
const btnCloseCookie = message.querySelector('.btn');
btnCloseCookie.style.color = 'black';
message.style.backgroundColor = 'black';
message.style.width = '100vw';
// console.log(message.style);
// IMPORTANT getComputedStyle
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 10 + 'px';
console.log(getComputedStyle(message).height);
// IMPORTANT setProperty
// console.log(document.documentElement === document.querySelector(':root'));// -> true
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// message.style.setProperty('background-color', 'white');

// 2.2 Attributes
// (1) Get attr
const logo = document.querySelector('.nav__logo');
console.log(logo.src); // -> absolute URL
console.log(logo.getAttribute('src')); // -> relative URL
console.log(logo.alt);
console.log(logo.className);

// Non-standard attr
// console.log(logo.designer); // -> undefined
console.log(logo.getAttribute('designer'));

// (2) Set attr
logo.setAttribute('alt', 'Bankist logo here');

// (3) ABSOLUTE vs. RELATIVE url
const links = document.querySelectorAll('.nav__link');
console.log(links[0]);
console.log(links[0].href);
console.log(links[0].getAttribute('href'));

// (4) IMPORTANT Data attr.
console.log(logo.dataset.versionNumber);

// 2.3 Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');
logo.classList.replace('c', 'd');

// IMPORTANT DON'T use below:
// logo.className = 'jonas'
