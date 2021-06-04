'use strict';

const showModalBtns = document.querySelectorAll('.show-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

showModalBtns.forEach(showBtn => {
  showBtn.addEventListener('click', showModal);
});

// Close modal by clicking close button
closeModalBtn.addEventListener('click', closeModal);

// Close modal by clicking overlay area
overlay.addEventListener('click', closeModal);

// Close modal by pressing ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
