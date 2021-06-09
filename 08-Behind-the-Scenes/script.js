'use strict';
// INDEX
// 1. An High-Level Overview of JavaScript
// 2. The JavaScript Engine and Runtime
// 3. Execution Contexts and The Call Stack
// 4. Scope and The Scope Chain
// 5. Scoping in Practice
// 6. Variable Environment: Hoisting and The TDZ
// 7. Hoisting and TDZ in Practice
// 8. The this Keyword
// 9. The this Keyword in Practice
// 10. Regular Functions vs. Arrow Functions
// 11. Primitives vs. Objects (Primitive vs. Reference Types)
// 12. Primitives vs. Objects in Practice
///////////////////////////////////////////////////

// NOTE 1. An High-Level Overview of JavaScript
// 1.1 High-level
// (1) Low-level: Developer has to manage resources manually
// (2) High-level: Developer does NOT have to worry, everything happens automatically

// 1.2 Garbage-collected
// Cleaning the memory so we don't have to

// 1.3 Interpreted or just-in-time compiled
// (1) Abstraction over 0s and 1s
// (2) COMPILING = CONVERT TO MACHINE CODE (happens inside the JS engine)

// 1.4 Multi-paradigm
// (1) Paradigm: an approach and mindset of structuring code, which will direct your coding style and technique.
// (2) Three paradigms:
// a. Procudual programming
// b. Object-oriented programming (OOP)
// c. Functional programming (FP)
// (3) Imperative vs. Declarative

// 1.5 Prototype-based object-oriented

// 1.6 First-class functions
// Meaning functions in that language are treated like any other variable.

// 1.7 Dynamic (Dynamically-typed language)
// (1) No data type definitions. Types becomes known at runtime
// (2) Data type of variable is automatically changed

// 1.8 Single-threaded
// 1.9 Non-blocking event loop
// (1) Concurrency model (How the JavaScript engine handles multiple tasks happening at the same time)
// -- Why do we need this? -->
// (2) JavaScript runs on one single thread (Thread means where the code is executed in the processor/CPU), which it can only execute one task at a time
// -- What about a long-running task? -->
// (3) Sounds like it will block the single thread. But we need NON-blocking behavior
// -- How can we achieve that? -->
// (4) By using Event Loop: takes long running tasks, executes them in the 'background', and puts them back in the main thread once they are completed.
///////////////////////////////////////////////////

// NOTE 2. The JavaScript Engine and Runtime
// 2.1 JS Engine: Program that executes JavaScript code.

// 2.2 JS Engine consists of **Call Stack** (Where our code is executed) & **Heap** (Where objects are stored)

// 2.3 Compilation vs. Interpretation
// (1) COMPILATION: entire code is converted into machine code at once, and written to a binary file that can be executed by a computer.
// Source code --(step 1: compilation)--> Portable file: machine code --(step 2: execution)--> Program running

// (2) INTERPRETATION: interpreter runs through the source code and executes it line by line.
// Source code --(execution line by line *code still needs to be converted into machine code)--> Program running

// (3) JUST-IN-TIME (JIT) COMPILATION: entire code is converted into machine code at once, then executed immediately.
// Source code --(step 1: compilation)--> Machine code *NOT a portable file --(step 2: execution *happens immediately)--> Program running

///////////////////////////////////////////////////

// NOTE 3. Execution Contexts and The Call Stack
// 3.1 What is an **Execution Context/EC**?
// (1) Definition: Environment in which a piece of JavaScript is executed. Stores all the necessary information for some code to be executed.
// (2) EXECUTION:
// Creation of exactly one **Global Execution Context** (for top-level code *NOT inside a function)
// --> Execution of top-level code (inside global EC)
// --> Execution of functions and waiting for callbacks

// 3.2 What's inside EC? *Below are generated during 'creation phase',right b4 execution
// (1) Variable Environment: let, const and var; Functions; arguments object
// (2) Scope chain
// (3) THIS keyword
// *arguments object & THIS are NOT in arrow functions

// 3.3 Execution happens in **Call Stack**
// 'Place' where execution contexts get stacked on top of each other, to keep track of where we are in the execution.
///////////////////////////////////////////////////

// NOTE 4. Scope and The Scope Chain
// 4.1 Scoping: How our program’s variables are organized and accessed. “Where do variables live?” or “Where can we access a certain variable, and where not?”;

// 4.2 Lexical scoping: Scoping is controlled by placement of functions and blocks in the code;

// 4.3 Scope: Space or environment in which a certain variable is **declared** (variable environment in case of functions). There is **global scope**, **function scope**, and **block scope**;

// 4.4 Scope of a variable: Region of our code where a certain variable can be **accessed**.

// 4.5 THREE types of scope
// (1) Global scope
// (2) Function scope
// (3) Block scope (ES6): Variables are accessible only inside block. ^ this ONLY applies to LET and CONST variables. Functions are also block scoped (ONLY in strict mode)
// * let and const are **block-scoped**; var is **function-scoped**.

// 4.6 the Scope Chain
// Scope chain: Order in which functions are written in the code has NOTHING to do with order in which functions were called.
///////////////////////////////////////////////////

// NOTE 5. Scoping in Practice

///////////////////////////////////////////////////

// NOTE 6. Variable Environment: Hoisting and The TDZ
// 6.1 Hoisting: Makes some types of variables accessible/usable in the code before they are actually declared. “Variables lifted to the top of their scope”. --(BEHIND THE SCENES)-->
// Before execution, code is scanned for variable declarations, and for each variable, a new property is created in the **variable environment object**.

// 6.2 TDZ: Temporal Dead Zone (Why TDZ? )
// (1) Makes it easier to avoid and catch errors: accessing variables b4 declaration is bad practice and should be avoided;
// (2) Makes const variables actually work

// 6.3 Why Hoisting?
// (1) Using functions before actual declaration;
// (2) var hoisting is just a byproduct.
///////////////////////////////////////////////////

// NOTE 7. Hoisting and TDZ in Practice

///////////////////////////////////////////////////

// NOTE 8. The this Keyword
// 8.1 **this** keyword/variable: Special variable that is created for every execution context (every function). Takes the value of (points to) the “owner” of the function in which the this keyword is used.

// 8.2 IMPORTANT this is NOT static. It depends on how the function is called, and its value is only assigned when the function is actually called.
// (1) Method --(this)--> Object is calling this method
// (2) Simple function call --(this)--> undefined (*in strict mode. Otherwise: window (in the browser))
// (3) Arrow functions --(this)--> this of surrounding function (**lexical this**)
// (4) Event listener --(this)--> DOM element that the handler is attached to
// (5) new, call, apply, bind
// * this does NOT point to the function itself, and also NOT the its variable environment!
///////////////////////////////////////////////////

// NOTE 9. The this Keyword in Practice
/*
console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f();
*/
///////////////////////////////////////////////////

// NOTE 10. Regular Functions vs. Arrow Functions
/*
// var firstName = 'Matilda'; // Declared by var will be created as a property in global object

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge();
*/

// arguments keyword
/*
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
*/
///////////////////////////////////////////////////

// NOTE 11. Primitives vs. Objects (Primitive vs. Reference Types)
// 11.1 Primitive types
// String, Number, Boolean, Undefined, Null, Symbol, BigInt
// Call Stack: -identifier-address-value-
// Heap: -address-value-
/*
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);
*/

// 11.2 Reference types
// Object literal, Arrays, Functions ...
/*
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);
marriedJessica = {};
*/

// 11.3 Copying objects: Object.assign() shallow copying
/*
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
*/

///////////////////////////////////////////////////

// NOTE 12. Primitives vs. Objects in Practice

///////////////////////////////////////////////////
