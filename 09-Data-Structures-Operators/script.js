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
// (1) Multiple values separated by commas are only expected when we pass arguments into functions or we need a new array.
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

///////////////////////////////////////////////////

//NOTE 5.Short Circuiting (&& and ||)
///////////////////////////////////////////////////

//NOTE 6.The Nullish Coalescing Operator (??)
///////////////////////////////////////////////////

// Coding Challenge #1
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
///////////////////////////////////////////////////

//NOTE 15.Working with Strings-Part 1
///////////////////////////////////////////////////

//NOTE 16.Working with Strings-Part 2
///////////////////////////////////////////////////

//NOTE 17.Working with Strings-Part 3
///////////////////////////////////////////////////

// Coding Challenge #4
