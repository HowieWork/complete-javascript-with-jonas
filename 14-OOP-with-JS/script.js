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
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // IMPORTANT NEVER create methods inside a constructor function (cause BAD performance)
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};
*/
// const jonas = new Person('Jonas', 1991);
// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(jonas, matilda, jack);

// 3.2 INSTANCE
// console.log(jonas instanceof Person); // Check whether instance or not
///////////////////////////////////////////////////

// NOTE 4. Prototypes

// 4.1 Every function has a PROTOTYPE property; Methods created inside that property will be ACCESSIBLE to all objects created by the (constructor) function
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };
// jonas.calcAge();

// IMPORTANT Person.prototype is the prototype of all objects created by Person (understand .prototype as .prototypeOfLinkedObjects)
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(jonas.__proto__ === Person.prototype);
// * __proto__ exists because --(refer)--> 3.1(3) {} linked to prototype

// 4.2 Objects' OWN properties
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);
// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));
///////////////////////////////////////////////////

// NOTE 5. Prototypal Inheritance and The Prototype Chain
// Prototype Chain
// jonas --(.__proto__)--> Person.prototype --(.__proto__)--> Object.prototype --(.__proto__)--> null

///////////////////////////////////////////////////

// NOTE 6. Prototypal Inheritance on Built-In Objects

// 6.1
// console.log(jonas.__proto__);
// IMPORTANT Object.prototype (top of the prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);
// *inspect function using .dir
// console.dir(Person.prototype.constructor);

// 6.2 Array
const arr = [2, 2, 3, 4, 5, 6, 6, 6, 9, 9]; // new Array(2,3,4) === [2,3,4]
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// (NOT a good practice) Add a new method to Array.prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// console.log(arr.unique());

// 6.3
// h1 --> HTMLHeadingElement --> HTMLElement --> Element --> Node --> EventTarget
// const h1 = document.querySelector('h1');
// function --> Function.prototype
// console.dir(x => x + 1);
///////////////////////////////////////////////////

// Coding Challenge #1
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h.`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h.`);
};

const carBMW = new Car('BMW', 120);
const carMercedes = new Car('Mercedes', 95);
// console.log(carBMW, carMercedes);
// carBMW.accelerate();
// carMercedes.brake();
///////////////////////////////////////////////////

// NOTE 7. ES6 Classes

// 7.1 Defining classes
// IMPORTANT *In JavaScript, class is just a special kind of function
// class is just Sugar syntax in JS, which HIDES prototypal inheritance
// (1) class expression
// const PersonCl = class {}

// (2) class declaration
class PersonCl {
  // Constructor is a method of the class, as constructor function
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance method
  // Method will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      console.log(`Fullname format is not correct!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there :)');
    console.log(this);
  }
}

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
const jessica = new PersonCl('Jessica White', 1996);
// console.log(jessica.fullName);
// console.log(jessica);
// jessica.calcAge();
// jessica.greet();
// console.log(jessica.age);
// console.log(jessica.__proto__ === PersonCl.prototype);

// 7.2 IMPORTANT
// (1) Classes are NOT hoisted
// (2) Classes are first-class citizens
// (3) Classes are executed in strict mode
///////////////////////////////////////////////////

// NOTE 8. Setters and Getters

// 8.1 All objects can have Setters and Getters
const account = {
  // data properties
  owner: 'Jonas',
  movements: [200, 530, 120, 300],
  // assessor properties (Setters and Getters)
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
// console.log(account.latest);
account.latest = 50; // treat as PROPERTIES
// console.log(account.movements);

// 8.2 Setters and Getters in Class (refer to 7.1(2))
// Useful in DATA VALIDATION

///////////////////////////////////////////////////

// NOTE 9. Static Methods
// Built-in static methods example
Number.parseFloat('12');

// Create own static method on constructor function
// Person.hey = function () {
//   console.log(`Hey!`);
// };
// Person.hey();

// STATIC keyword to define static method in class (refer to PersonCl example above)
///////////////////////////////////////////////////

// NOTE 10. Object.create()
// IMPORTANT Create a new object, using an existing object as the prototype of the newly created object.
// *prototypal inheritance still applies; NO constructor function; NO .prototype property; NO new keyword
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // Has NO relation with constructor at all
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// NOT a good practice of assigning name and birthYear like below
steven.name = 'Steven';
steven.birthYear = 2002;
// steven.calcAge();

const sarah = Object.create(PersonProto);
// console.log(sarah); // {}: Object.create will return {}
sarah.init('Sarah', 1979);
// sarah.calcAge();
///////////////////////////////////////////////////

// Coding Challenge #2
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// const carFort = new CarCl('Fort', 120);
// console.log(carFort);
// console.log(carFort.speedUS);
// carFort.accelerate();
// carFort.brake();
// carFort.brake();
// carFort.speedUS = 75;
// console.log(carFort);
///////////////////////////////////////////////////

// NOTE 11. Inheritance Between "Classes": Constructor Functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// IMPORTANT Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};
const mike = new Student('Mike', 2002, 'Computer Science');
// mike.introduce();
// console.log(mike.calcAge());

// IMPORTANT
// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

// IMPORTANT Fix Student.prototype.constructor != Student because of Object.create()
// console.log(Student.prototype.constructor);
Student.prototype.constructor = Student;
// console.log(Student.prototype.constructor);

// console.log(mike.__proto__ === Student.prototype);
// console.log(Object.getPrototypeOf(Student.prototype));
///////////////////////////////////////////////////

// Coding Challenge #3
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism ????

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// IMPORTANT Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const carTesla = new EV('Tesla', 120, 23);
// console.log(carTesla);
// carTesla.brake();
// carTesla.chargeBattery(98);
// console.log(carTesla);
// carTesla.accelerate();
///////////////////////////////////////////////////

// NOTE 12. Inheritance Between "Classes": ES6 Classes
// EXTENDS SUPER
// if no extra, 'class StudentCl extends PersonCl' will be enough
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  };

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();
///////////////////////////////////////////////////

// NOTE 13. Inheritance Between "Classes": Object.create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();
///////////////////////////////////////////////////

// NOTE 14. Another Class Example

// NOTE 15. Encapsulation: Protected Properties and Methods
// IMPORTANT 15.1 TWO reasons of needing ENCAPSULATION and Data Privacy
// (1) Prevent outside code accidently manipulates data inside class
// (2) Small API (only a few public interfaces)--> we can change INTERNAL methods MORE confidently (*external code doesn't rely on these private methods)
// *JS does NOT support TRUE Encapsulation and Data Privacy

// 15.2 Add _ in front of property name (refer 14. _movement)
// such property is called PROTECTED PROPERTY *indicating such property should NOT be touched outside code

// NOTE 16. Encapsulation: Private Class Field and Methods
// 1) Public fields (public instance field / public property for instance / will be present on all instances created through class)
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the STATIC version --> TOTAL: 8 features)
// * Static fields/methods will NOT be available on instances, but ONLY available on class itself

class Account {
  // 1) Public fields (instances)
  // locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this._movements = [];

    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  // Public interface (API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // 4) Private methods (currently NOT working)
  // #approveLoan(val)
  _approveLoan(val) {
    return true;
  }
  static helper() {
    console.log('Helper');
  }
}
// const acc1 = new Account('Jonas', 'EUR', 1111);

// NOT a good idea to do be BAD below. Create methods instead as GOOD below.

// BAD *outside code SHOULDN'T manipulate data inside class
// acc1._movements.push(250);
// acc1._movements.push(-140);

// GOOD
// acc1.deposit(250);
// acc1.withdraw(140);
// acc1.requestLoan(1000);

// console.log(acc1.getMovements());
// console.log(acc1);

// Accessing Private fields/methods --> caught Error
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoad(1000));

// Accessing Static fields/methods
// Account.helper();
///////////////////////////////////////////////////

// NOTE 17. Chaining Methods
// Add RETURN
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
// console.log(acc1.getMovements());
///////////////////////////////////////////////////

// NOTE 18. ES6 Classes Summary
///////////////////////////////////////////////////

// Coding Challenge #4
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

//'Rivian' going at 120 km/h, with a charge of 23%
const carRivian = new EVCl('Rivian', 120, 23);
// console.log(carRivian);
// console.log(carRivian.#charge);
// carRivian.accelerate().brake().chargeBattery(100).accelerate();
// console.log(carRivian.speedUS);
///////////////////////////////////////////////////
