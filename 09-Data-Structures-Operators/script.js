'use strict';
// NOTE Index

// 1.Destructuring Arrays
// 2.Destructuring Objects
// 3.The Spread Operator (...)
// 4.Rest Pattern and Parameters
// 5.Short Circuiting (&& and ||)
// 6.The Nullish Coalescing Operator (??)
// Coding Challenge #1
// 7.Looping Arrays: The for-of Loop
// 8.Enhanced Object Literals
// 9.Optional Chaining (.?)
// 10.Looping Objects: Object Keys, Values, and Entries
// Coding Challenge #2

// 11.Sets
// 12.Maps:Fundamentals
// 13.Maps:Iteration
// 14.Summary:Which Data Structure to Use?
// Coding Challenge #3

// 15.Working with Strings-Part 1
// 16.Working with Strings-Part 2
// 17.Working with Strings-Part 3
// Coding Challenge #4

///////////////////////////////////////////////////
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
///////////////////////////////////////////////////

//NOTE 1.Destructuring Arrays
// 1.1 Basic
const arr = [2, 3, 4];
const [a, b, c] = arr;
// console.log(a, b, c);

// 1.2 Skip the second item
let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// 1.3 Switching variables *NO temporary variable needed
[secondary, main] = [main, secondary];
// console.log(main, secondary);
const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// 1.4 Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
// console.log(i, j, k);

// 1.5 Default values
const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
///////////////////////////////////////////////////

//NOTE 2.Destructuring Objects
// 2.1 Basic *Rename
const { name: restaurantName, openingHours, categories: tags } = restaurant;
// console.log(restaurantName, openingHours, tags);

// 2.2 Default value
const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// 2.3 Mutating variables
let x = 111;
let y = 999;
const obj = { x: 23, y: 7, z: 14 };

// IMPORTANT Wrapped with ()
({ x, y } = obj);
// console.log(x, y);

// 2.4 Nested Objects
const {
  fri: { open, close },
} = openingHours;
// console.log(open, close);

// 2.5 IMPORTANT Trick: Destructuring the argument immediately in a function
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via Del',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via Del',
//   starterIndex: 2,
// });
///////////////////////////////////////////////////

//NOTE 3.The Spread Operator (...)
// 3.1 Basics
const arr2 = [7, 8, 9];
const newArr = [1, 2, ...arr2];
// console.log(...newArr);
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// 3.2 Copy array *Shallow copy
const mainMenuCopy = [...restaurant.mainMenu];

// 3.3 Join 2 arrays
const wholeMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// IMPORTANT 3.4 Iterables: arrays, strings, maps, sets. NOT objects
// (1) Usage of spread operator: Multiple values separated by commas are only expected when we **pass arguments into functions** or we **need a new array**.
// console.log(`${...'howie'}`); // NOT working!

// (2) Real-world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make paredsta! Ingredient 3?"),
// ];

// restaurant.orderPasta(...ingredients);

// (3) Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

///////////////////////////////////////////////////

//NOTE 4.Rest Pattern and Parameters

// 4.1 Destructuring
// SPREAD, because on RIGHT side of =
const arr3 = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
// IMPORTANT Rest element must be LAST element; and ONLY one Rest element
const [m, n, ...others] = [1, 2, 3, 4, 5];
// console.log(m, n, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
// console.log(pizza, risotto, otherFood);

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// 4.2 Functions
const add = function (...nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  return sum;
};
add(2, 3);
add(5, 3, 7, 2);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

///////////////////////////////////////////////////

//NOTE 5.Short Circuiting (&& and ||)
// 5.1 || : Use ANY data type, return ANY data type, short-circuiting
// console.log(undefined || null); // null

// 5.2 Real-world example
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);
const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// 5.3 &&
// console.log(0 && 2); // --> 0
// console.log(1 && 2); // --> 2
// console.log('Hello' && 23 && null && 'jonas'); // --> null

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

///////////////////////////////////////////////////

//NOTE 6.The Nullish Coalescing Operator (??)
restaurant.numGuests = 0; // How to fix this?
const guests3 = restaurant.numGuests || 10;
// console.log(guests3);

// IMPORTANT ?? works with Nullish value instead of Falsy value
// Nullish value: null and indefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect);
///////////////////////////////////////////////////

// Coding Challenge #1
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/*
// 1.
const [players1, players2] = game.players;
// 2.
const [gk, ...fieldPlayers] = players1;
// 3.
const allPlayers = [...players1, ...players2];
// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// 5.
const {
  odds: { team1, draw, team2 },
} = game;
// 6.
function printGoals(...players) {
  console.log(players);
  console.log(`${players.length} goals were scored.`);
}
// printGoals('h', 'm', 'd');
// 7.
team1 < team2 && console.log('Team 1 is more likely to win!');
team1 > team2 && console.log('Team 2 is more likely to win!');
*/

///////////////////////////////////////////////////

//NOTE 7.Looping Arrays: The for-of Loop
///////////////////////////////////////////////////

//NOTE 8.Enhanced Object Literals
///////////////////////////////////////////////////

//NOTE 9.Optional Chaining (.?)
///////////////////////////////////////////////////

//NOTE 10.Looping Objects: Object Keys, Values, and Entries
///////////////////////////////////////////////////

// Coding Challenge #2
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
///////////////////////////////////////////////////

//NOTE 11.Sets
///////////////////////////////////////////////////

//NOTE 12.Maps:Fundamentals
///////////////////////////////////////////////////

//NOTE 13.Maps:Iteration
///////////////////////////////////////////////////

//NOTE 14.Summary:Which Data Structure to Use?
///////////////////////////////////////////////////

// Coding Challenge #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/
///////////////////////////////////////////////////

//NOTE 15.Working with Strings-Part 1
///////////////////////////////////////////////////

//NOTE 16.Working with Strings-Part 2
///////////////////////////////////////////////////

//NOTE 17.Working with Strings-Part 3
///////////////////////////////////////////////////

// Coding Challenge #4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
