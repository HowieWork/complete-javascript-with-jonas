'use strict';
/////////////////////////////////////////////////
// NOTE Index
// 1. Converting and Checking Numbers
// 2. Math and Rounding
// 3. The Remainder Operator
// 4. Working with BigInt
// 5. Creating Dates
// 6. Adding Dates to "Bankist" App
// 7. Operations with Dates
// 8. Internationalizing Dates (Intl)
// 9. Internationalizing Numbers (Intl)
// 10. Timers: setTimeout and setInterval
// 11. Implementing a Countdown Timer
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-07-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const elapseTime = date =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const calcDaysPassed = (date1, date2) =>
    Math.abs(elapseTime(date1) - elapseTime(date2)) / (1000 * 60 * 60 * 24);

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} Days Ago`;
  /*
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
  */

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, acc) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Display Date
    const displayDate = formatMovementDate(
      new Date(
        acc.movementsDates[
          acc.movements.findIndex(movement => movement === mov)
        ]
      ),
      acc.locale
    );

    // Display Movement
    const formattedMov = formatCur(mov, acc);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  /*
  // Call function every 1s
  const logOutInterval = setInterval(() => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    // Display log out time
    labelTimer.textContent = `${minute.toString().padStart(2, 0)}:${second
      .toString()
      .padStart(2, 0)}`;
    // Decrease log out time by 1
    time--;
    // When there is no time left, stop
    if (time === 0) {
      clearInterval(logOutInterval);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
  }, 1000);*/

  // Set timer
  let time = 120;

  const tick = function () {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    // Display log out time
    labelTimer.textContent = `${minute.toString().padStart(2, 0)}:${second
      .toString()
      .padStart(2, 0)}`;

    // When there is no time left, stop
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease log out time by 1
    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    /*
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minute = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
    */
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      // weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // IMPORTANT Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Generate transfer date
    const transferDate = new Date().toISOString();

    // Doing the transfer: money + date
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(transferDate);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(transferDate);

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Generate loan date
      const loanDate = new Date().toISOString();

      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(loanDate);

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES
// NOTE 1. Converting and Checking Numbers
// 1.1 in JS: all numbers are **floating point number** (64 base 2). decimal NOT integers
// (1) Binary base 2 - 0 1
// console.log(23 === 23.0); // true
// console.log(0.1 + 0.2); //0.30000000000000004

// (2) Unary plus +

// (3) Number.parse methods
// Number.parseInt(string, radix)
// IMPORTANT radix: An integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the string.
// console.log(Number.parseInt('  3.09dsaddsadas', 10)); // 3
// console.log(Number.parseFloat('  3.09dsaddsadas', 10)); // 3.09

// (4) isNaN isFinite
// check if value is NaN
// console.log(Number.isNaN(NaN)); // true

// IMPORTANT isFinite is better for checking whether a number or not
/*
console.log(Number.isFinite(23 / 0)); // false
console.log(Number.isFinite(23 / 2)); // true
console.log(Number.isFinite('23')); // false
console.log(Number.isFinite(+'23x')); // false

console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.2)); // false
*/

/////////////////////////////////////////////////
// NOTE 2. Math and Rounding
// 2.1 Math.sqrt(25) || 25 ** (1/2)

// 2.2 Math.max() * coertion NO parsing
// Math.min()

// 2.3 Math.PI

// 2.5 ROUNDING:
// Math.trunc() Math.floor() Math.ceil()
const randomInt = (min, max) => Math.trunc(Math.random() * (max - min)) + 1;
// console.log(randomInt(0, 6));

// Math.toFixed() *return a STRING
// console.log(typeof (23.934456).toFixed(2)); // string
/////////////////////////////////////////////////
// NOTE 3. The Remainder Operator: %

// labelBalance.addEventListener('click', function (e) {
//   e.preventDefault();
//   const nodesArr = [...document.querySelectorAll('.movements__row')];
//   nodesArr.forEach((node, i) => {
//     if (i % 2 === 0) node.style.backgroundColor = 'orangered';
//   });
// });
/////////////////////////////////////////////////

//NOTE 4. Working with BigInt
// Only 53 digits used for number
// Max SAFE integer
/*
console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(2 ** 53 + 1); //9007199254740992 WRONG!
*/
// BigInt : Big Integer
// console.log(357684354643135454665434n);
// console.log(BigInt(357684)); // Used for small numbers
// Operator works the same with BigInt
// console.log(Math.sqrt(16n)); // NOT working

// IMPORTANT Exceptions
/*
console.log(20n > 15); // true
console.log(20n === 20); // false: two different primitive types
console.log(typeof 20n); // bigint
console.log(20n == '20'); // true
console.log(20n === '20'); // false
const huge = 46451335431354654364n;
console.log(huge + ' is really HUGE!!!'); // still a string
*/

// Divisions
/*
console.log(10n / 3n); // 3n
console.log(10n % 3n); // 1n
*/
/////////////////////////////////////////////////

//NOTE 5. Creating Dates
// 5.1 FOUR ways of creating dates
// const now = new Date();
// console.log(now);

// Parsing
// console.log(new Date('Jul 14 2021 11:56:36'));
// console.log(new Date('December 24, 2015'));

/*
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // convert to milliseconds
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT-0500 (Eastern Standard Time)
console.log(future.getFullYear()); // IMPORTANT 2037
console.log(future.getYear()); // 137
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// FORMATTING
console.log(future.toISOString());
const elapseTime = future.getTime();
console.log(new Date(elapseTime)); // the same as future

console.log(Date.now());

future.setFullYear(2040);
console.log(future);
*/

// Date.parse
/*
const future = new Date(2037, 10, 19, 15, 23);
const futureDateString = future.toISOString();
console.log(new Date(Date.parse(futureDateString)).getFullYear());

const test1 = account1.movementsDates[0];
console.log(new Date(Date.parse(test1)).getDate());
*/

// Date.getTime() *timestamp
/////////////////////////////////////////////////

// 6. Adding Dates to "Bankist" App
// 7. Operations with Dates
// 8. Internationalizing Dates (Intl)
// 9. Internationalizing Numbers (Intl)
/////////////////////////////////////////////////

//NOTE 10. Timers: setTimeout and setInterval
// Passing arguments to callback function
// Clear setTimeout for certain condition
/*
const ingredients = ['banana', 'apple'];
const timeOut = setTimeout(
  (i, j) => console.log(`Here are ingredients: ${i}, ${j}.`),
  3000,
  ...ingredients
);
//The returned timeoutID is a positive integer value which identifies the timer created by the call to setTimeout(). This value can be passed to clearTimeout() to cancel the timeout.
console.log(timeOut); // 1
if (ingredients.includes('banana')) clearTimeout(timeOut);
console.log('Waiting...');
*/
/*
const interval = setInterval(() => {
  console.log('heelo');
}, 1000);
setTimeout(() => {
  clearInterval(interval);
}, 3000);
*/
/////////////////////////////////////////////////

// 11. Implementing a Countdown Timer
