'use strict';
// INDEX
// 1. What is Object-Oriented Programming?
// 2. OOP in JavaScript
// 3. Constructor Functions and the new Operator
// 4. Prototypes
// 5. Prototypal Inheritance and The Prototype Chain
// 6. Prototypal Inheritance on Built-In Objects
// Coding Challenge #1
// 7. ES6 Classes
// 8. Setters and Getters
// 9. Static Methods
// 10. Object.create
// Coding Challenge #2
// 11. Inheritance Between "Classes": Constructor Functions
// Coding Challenge #3
// 12. Inheritance Between "Classes": ES6 Classes
// 13. Inheritance Between "Classes": Object.create
// 14. Another Class Example
// 15. Encapsulation: Protected Properties and Methods
// 16. Encapsulation: Private Class Field and Methods
// 17. Chaining Methods
// 18. ES6 Classes Summary
// Coding Challenge #4
///////////////////////////////////////////////////
// NOTE 1. What is Object-Oriented Programming?
// 1.1 OOP is a programming paradigm based on the concept of objects
// 1.2 Four principles
// (1) Abstraction: ignoring or hiding details that DON'T MATTER
// (2) Encapsulation: keeping properties and methods PRIVATE inside the class
// (3) Inheritance: making all properties and methods of a certain class AVAILABLE TO A CHILD CLASS
// (4) Polymorphism: a child class can OVERWRITE a method it inherited from a parent class
///////////////////////////////////////////////////

// NOTE 2. OOP in JavaScript
// 2.1 Prototype <--(prototypal inheritance / delegation)-- Object
// Prototypal inheritance: the prototype contains methods (behavior) that are ACCESSIBLE TO ALL OBJECTS LINKED TO THAT PROTOTYPE
// (another expression) Object DELEGATES behaviors to the linked prototype object
// IMPORTANT prototypal inheritance is DIFFERENT from classical inheritence
// 2.2 THREE ways of implementing prototypal inheritance in JS
// (1) Constructor functions
// (2) ES6 Classes
// (3) Object.create()
///////////////////////////////////////////////////

// NOTE 3. Constructor Functions and the new Operator
// 3.1 What happened when you use NEW keyword operator to call a function?
// (1) New {} is created
// (2) function is called, this = {}
// (3) {} linked to prototype
// (4) function automatically return {}
// * function Expression and Declaration BOTH work; Arrow f. NOT work
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // IMPORTANT NEVER create methods inside a constructor function (cause BAD performance)
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
// console.log(jonas, matilda, jack);

// 3.2 INSTANCE
// console.log(jonas instanceof Person); // Check whether instance or not
///////////////////////////////////////////////////

// NOTE 4. Prototypes
// 4.1 Every function has a PROTOTYPE property; Methods created inside that property will be ACCESSIBLE to all objects created by the (constructor) function
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// jonas.calcAge();

// IMPORTANT Person.prototype is the prototype of all objects created by Person (understand .prototype as .prototypeOfLinkedObjects)
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(jonas.__proto__ === Person.prototype);
// * __proto__ exists because --(refer)--> 3.1(3) {} linked to prototype

// 4.2 Objects' OWN properties
Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);
// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

// 4.3 Prototype Chain
// jonas --(.__proto__)--> Person.prototype --(.__proto__)--> Object.prototype --(.__proto__)--> null
// FIXME IMPORTANT* Applies to function constructors and ES6 classes NOT Object.create()
///////////////////////////////////////////////////

// NOTE 5. Prototypal Inheritance and The Prototype Chain
// 5.1
// console.log(jonas.__proto__);
// IMPORTANT Object.prototype (top of the prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);
// *inspect function using .dir
// console.dir(Person.prototype.constructor);

// 5.2 Array
const arr = [2, 2, 3, 4, 5, 6, 6, 6, 9, 9]; // new Array(2,3,4) === [2,3,4]
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// Add a new method to Array.prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
// 5.3
///////////////////////////////////////////////////

// 6. Prototypal Inheritance on Built-In Objects
///////////////////////////////////////////////////

// Coding Challenge #1
///////////////////////////////////////////////////

// 7. ES6 Classes
// 8. Setters and Getters
// 9. Static Methods
// 10. Object.create
// Coding Challenge #2
///////////////////////////////////////////////////

// 11. Inheritance Between "Classes": Constructor Functions
// Coding Challenge #3
///////////////////////////////////////////////////

// 12. Inheritance Between "Classes": ES6 Classes
// 13. Inheritance Between "Classes": Object.create
// 14. Another Class Example
// 15. Encapsulation: Protected Properties and Methods
// 16. Encapsulation: Private Class Field and Methods
// 17. Chaining Methods
// 18. ES6 Classes Summary
// Coding Challenge #4
///////////////////////////////////////////////////
