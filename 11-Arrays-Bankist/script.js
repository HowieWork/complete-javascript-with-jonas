'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date"></div>
        <div class="movements__value">${mov} ???</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance} ???`;
};

const calcDisplaySummary = function (acc) {
  const movements = acc.movements;
  const interestRate = acc.interestRate;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} ???`;

  const out = Math.abs(
    movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );
  labelSumOut.textContent = `${out} ???`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} ???`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const createUsernames = function (accs) {
  accs.forEach(
    acc =>
      (acc['username'] = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );
};
createUsernames(accounts);

// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  currentAccount = accounts.find(acc => acc.username === username);

  // Clear input fields and move away focus
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();

  if (!currentAccount) {
    console.error('Account does not exist!');
    return;
  }
  if (+pin !== currentAccount.pin) {
    console.log('Pin is not correct');
    return;
  }

  // Display UI and message
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 1;

  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferTo = inputTransferTo.value;
  const transferAmount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(acc => acc.username === transferTo);

  // Clear inputs
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    !receiverAcc ||
    transferAmount <= 0 ||
    transferAmount > currentAccount.balance ||
    currentAccount.username === receiverAcc.username
  ) {
    console.error('Transfer is not successful.');
    return;
  }
  // 1. current account
  currentAccount.movements.push(-transferAmount);

  // 2. transfer to account
  receiverAcc.movements.push(+transferAmount);

  // 3. Update current account movements, balance, summary
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;

  // Clear input
  inputLoanAmount.value = '';

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    return;
  } else {
    console.log('Request too much loan.');
    return;
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = inputClosePin.value;
  const index = accounts.findIndex(acc => acc.username === username);

  // Clear inputs
  inputCloseUsername.value = inputClosePin.value = '';

  if (username !== currentAccount.username) {
    console.log('Username is wrong');
    return;
  }
  if (+pin !== currentAccount.pin) {
    console.log('Pin is wrong!');
    return;
  }

  accounts.splice(index, 1);

  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI);

  const movementsValues = movementsUI.map(node =>
    Number(node.textContent.slice(0, -1).replace(/\s/g, ''))
  );
  labelBalance.textContent = `${movementsValues.reduce(
    (cur, next) => cur + next
  )}???`;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.reverse());
/////////////////////////////////////////////////
// NOTE More ways of creating and filling arrays
const x = new Array(7); // [empty * 7]

// 1.1 Empty arrays + fill method
// x.fill(1);
// x.fill(1, 3);
// x.fill(1, 3, 5);
// console.log(x);

// 1.2 Array.from
const y = Array.from({ length: 7 }, () => 1);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);

// Challenge: generate one hundred random dice rolls
const oneHundredRandomDice = Array.from({ length: 100 }, (cur, _) => {
  cur = Math.ceil(Math.random() * 6);
  return cur;
});
// console.log(oneHundredRandomDice);

// Real-world usage of Array.from
const testNodes = document.querySelectorAll('.movements__value');
const testNodesArr = Array.from(testNodes);
const testNodesValues = testNodesArr.map(node =>
  Number(node.innerText.slice(0, -1).replace(/\s/g, ''))
);
