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

///////////////////////////////////////////////////

// NOTE 7. Hoisting and TDZ in Practice

///////////////////////////////////////////////////

// NOTE 8. The this Keyword

///////////////////////////////////////////////////

// NOTE 9. The this Keyword in Practice

///////////////////////////////////////////////////

// NOTE 10. Regular Functions vs. Arrow Functions

///////////////////////////////////////////////////

// NOTE 11. Primitives vs. Objects (Primitive vs. Reference Types)

///////////////////////////////////////////////////

// NOTE 12. Primitives vs. Objects in Practice

///////////////////////////////////////////////////
