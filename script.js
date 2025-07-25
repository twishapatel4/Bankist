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
const updateUI = function (currentAcc) {
  displayMovements(currentAcc);
  calcDisplayBalance(currentAcc);
  calcDisplaySummary(currentAcc);
};
let currentAcc;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAcc);

  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${
      currentAcc.owner.split(' ')[0]
    }`;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    updateUI(currentAcc);
  }
});

const displayMovements = function (currentAcc, sort = false) {
  console.log(currentAcc); // should be an object
  console.log(currentAcc.movements);

  const movs = sort
    ? currentAcc.movements.slice().sort((a, b) => a - b)
    : currentAcc.movements;

  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
});

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);
console.log(accounts);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);
const calcDisplayBalance = function (currentAcc) {
  currentAcc.balance = currentAcc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${currentAcc.balance}`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}`;
};

// const max = movements.reduce(function (acc, mov) {
//   if (acc > mov) return acc;
//   else return mov;
// });
// console.log(max);
//////////////////TRANSFER
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amt = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    currentAcc => currentAcc.username === inputTransferTo.value
  );

  if (
    amt > 0 &&
    receiver &&
    currentAcc.balance >= amt &&
    receiver?.username !== currentAcc.username
  ) {
    currentAcc.movements.push(-amt);
    receiver.movements.push(amt);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  updateUI(currentAcc);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAcc.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amt = Number(inputLoanAmount.value);
  if (amt > 0 && currentAcc.movements.some(mov => mov >= amt * 0.1)) {
    currentAcc.movements.push(amt);
    updateUI(currentAcc);
    inputLoanAmount.value = '';
  }
});

const accMoments = accounts.map(acc => acc.movements);
console.log(accMoments);
const allMovements = accMoments.flat(1);
console.log(allMovements);
/////////////////////////////////////////////////////
const eurToUSD = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} :: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'GBP', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key} :: ${value}`);
// });

//

// for (const moment of movements) {
//   if (moment > 0) {
//     console.log(`You deposited: ${moment}`);
//   } else {
//     console.log(`You withdrew: ${moment}`);
//   }
// }

// movements.forEach(function (moment) {
//   if (moment > 0) {
//     console.log(`You deposited: ${moment}`);
//   } else {
//     console.log(`You withdrew: ${moment}`);
//   }
// });

// movements.forEach(function (movement, index, movements) {
//   if (movement > 0) {
//     console.log(`Moment ${index}: You deposited: ${movement}`);
//   } else {
//     console.log(`Moment ${index}: You withdrew: ${movement}`);
//   }
// });
/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd'];
// console.log(arr.slice(2));
// //slice does not changges the fundamental array whereas the splice method will make changes in the original array
// console.log(arr.splice(3)); //splice will delete them
// console.log(arr);
// const ar2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(ar2);
// console.log(ar2.reverse());
// console.log(ar2);

// const letter = arr.concat(ar2);
// console.log(letter);
// console.log(letter.join('--'));

const x = new Array(7);
//will create an emoty array of length 7
// can only call fill method on it
x.fill(1);
x.fill(1, 3);
x.fill(1, 3, 5);
const y = Array.from({ length: 7 }, () => 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);

labelBalance.addEventListener('click', function () {
  const movsArray = Array.from(
    document.querySelectorAll('.movements--value'),
    el => Number(el.textContent.replace('€', ''))
  );
  // console.log(...movsArray);
});
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice[2];
//   const exceptions = ['a', 'the', 'an', 'but', 'or', 'on', 'is', 'this'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join('');
//   return capitalize(titleCase);
// };
// console.log(...convertTitleCase(`the Hello this is a title`));
