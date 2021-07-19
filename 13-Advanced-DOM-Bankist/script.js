'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////

// Modal window
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

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // Method 1 * old way
  /*
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */
  // Method 2
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////

// Page navigation
/*
document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const id = el.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// IMPORTANT Pattern
// 1. Add event listener to common parent element
// 2. Determine which element orignates the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////

// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Clear --active classes for btn and content
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(tabContent => {
    tabContent.classList.remove('operations__content--active');
  });

  // Add --active class to btn
  clicked.classList.toggle('operations__tab--active');

  // Matching target content and add --active class
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.toggle('operations__content--active');
});

///////////////////////////////////////
/*
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
*/
///////////////////////////////////////
/*
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
*/
///////////////////////////////////////

// NOTE 3. Types of Events and Event Handlers
// Method 1 *Old way
// h1.onmouseenter = function () {
//   alert('You entered h1!');
// };

// Method 2
// Patterns: Event only happens one time
const h1 = document.querySelector('h1');
const h1Alert = function () {
  alert('You entered h1!');
  h1.removeEventListener('mouseenter', h1Alert);
};
// h1.addEventListener('mouseenter', h1Alert);

///////////////////////////////////////

// NOTE 4. DOM Traversing
/*
const highlights = h1.querySelectorAll('.highlight');
// 4.1 Going downwards: child
console.log(highlights);
console.log(h1.childNodes);
console.log(h1.children); // live HTMLCollection
h1.firstElementChild.style.color = 'white';

// 4.2 Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);
// Think of closest() as the opposite of querySelector
h1.closest('header').style.background = 'var(--gradient-secondary)';
console.log(h1.closest('h1')); // -> <h1>...</h1>
h1.closest('h1').style.background = 'var(--gradient-primary)';

// 4.3 Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
*/
///////////////////////////////////////
