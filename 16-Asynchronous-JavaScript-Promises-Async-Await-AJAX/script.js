'use strict';

// NOTE Index
// 1. Async JavaScript, AJAX and APIs
// 2. Our First AJAX Call: XMLHttpRequest
// 3. How the Web Works: Requests and Responses
// 4. Welcome to Callback Hell
// 5. Promises and the Fetch API
// 6. Consume Promises
// 7. Chaining Promises
// 8. Handling Rejected Promises
// 9. Throwing Errors Manually
// Coding challenge #1
// 10. Asynchronous Behind the Scenes: The Event Loop
// 11. The Event Loop in Practice
// 12. Building a Simple Promise
// 13. Promisifying the Geolocation API
// Coding challenge #2
// 14. Consuming Promises with Async/Await
// 15. Error Handling With try ... catch
// 16. Returning Values from Async Functions
// 17. Running Promises in Parallel
// 18. Other Promise Combinators: race, allSettled and any
// Coding challenge #3

/////////////////////////////////////////////////////////
// NOTE 1. Async JavaScript, AJAX and APIs
// 1.1 Synchronous
// (1) Most codes are synchronous;
// (2) Execute line by line;
// (3) Each line waits for previous line to finish;
// (4) Long-running operation blocks code execution *e.g. alert('...')

// 1.2 Asynchronous *Coordinating behavior of a program over a period of time
// (1) Asynchronous code is executed after a tast that runs in the 'background' finishes;
// (2) Asynchronous code is non-blocking;
// (3) Execution doesn't wait for an asynchronous task to finish its work
// (4) Callback functions alone do NOT make code asynchronous!
// e.g. setTimeout(function, interval)

// 1.3 Examples of Async. code: Asynchronous image LOADING with event and callback
// * other examples: Geolocation API or **AJAX calls**
/*
const img = document.querySelector('.dog');
img.src = 'dog.jpg'; // --> IMPORTANT Set images' src attribute is Aynchronous 
img.addEventListener('load',function) // --> addEventListener does NOT automatically make code asynchronous
*/

// IMPORTANT 1.4 What are AJAX calls?
// (1) AJAX, Asynchronous JavaScript And XML, allows us to communicate with remote web servers in an ASYNCHRONOUS way. With AJAX calls, we can REQUEST DATA from web servers dynamically.

// (2) XML data format -- (popularity) --> JSON data format

// 1.5 What is an API?
// (1) API, Application Programming Interface, piece of software that can be used by another piece of software, in order to allow applications to talk to each other.
// (2) There are be many types of APIs in web development: DOM API; Geolocation API; Own Class API; 'Online' API
// (3) 'Online' API: Application running on a server, that receives requests for data, and sends data back as response;
// (4) We can build our OWN web APIs (requires back-end development, e.g. with node.js) or use 3rd-party APIs.
/////////////////////////////////////////////////////////

// NOTE 2. Our First AJAX Call: XMLHttpRequest
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// 2.1 IMPORTANT Old-school way of making AJAX call
// *API: RESTful countries
// *API ENDPOINTS: another name of URL
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  // The load event is fired when an XMLHttpRequest transaction completes successfully.
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Unary plus (+) precedes its operand and evaluates to its operand but attempts to convert it into a number, if it isn't already.
    const html = `
      <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
*/
// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');
/////////////////////////////////////////////////////////

// NOTE 3. How the Web Works: Requests and Responses *Review video and course diagram
// 3.1 Request-response model or Client-server architecture
//                       ------ REQEUST (GET/POST/etc.) ------>
// CLIENT (e.g. browser)                                         WEB SERVER (usually a web API)
//                       <------------- RESPONSE --------------
// https://restcountries.eu/rest/v2/alpha/PT
//    Protocol -- Domain name -- Resource
// (HTTP or HTTPS)
/////////////////////////////////////////////////////////

// NOTE 4. Welcome to Callback Hell

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1; // --> Moved to finally method in the end of promise chain
};
/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};
*/
// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
/////////////////////////////////////////////////////////

// NOTE 5. Promises and the Fetch API
// 5.1 IMPORTANT Modern way of making AJAX call - Fetch API
/*
// (2.1 recap) Old-school way of making AJAX call
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
request.send();
*/

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);

// 5.2 What are Promises? *ES6 feature
// (1) Promise: An object that is used as a placeholder for the future result of an asynchronous operation
// Promise: A container for an asynchronously delivered value
// Promise: A container for a future value
// (2) Pros:
// a. We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results;
// b. Instead of nesting callbacks, we can CHAIN PROMISES for a sequence of asynchronous operations: ESCAPING CALLBACK HELL

// 5.3 The Promise Lifecycle
// PENDING --(async task)--> SETTLED (FULFILLED / REJECTED)
// Build Promise(*e.g. Fetch API returns promise) --> Consume Promise (*when we already have a promise. e.g. promise returned from Fetch API)
/////////////////////////////////////////////////////////

// NOTE 6. Consume Promises
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
*/
// Refactory code above
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
    });
};
// getCountryData('portugal');
/////////////////////////////////////////////////////////

// NOTE 7. Chaining Promises
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1; // --> Moved to finally method in the end of promise chain
};

/*
const getCountryAndNeighbour = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      response => {
        console.log(response);
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
        return response.json();
      }
      // ,err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(
      response => response.json()
      // ,err => alert(err)
    )
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      console.error(`${err} 💥 💥 💥 `);
      renderError(`Something went wrong  💥 💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

// REFACTOR getCountryAndNeighbour function above
const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryAndNeighbour = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');
      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      console.error(`${err} 💥 💥 💥 `);
      renderError(`Something went wrong  💥 💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryAndNeighbour('usa');
  // getCountryAndNeighbour('australia');
  // getCountryAndNeighbour('usafdjlsjalfds');
});
/////////////////////////////////////////////////////////

// NOTE 8. Handling Rejected Promises
// 8.1 TWO ways of handling rejections
// (1) Pass a second callback function to THEN method (*see updated code in 7. chaining promises) *THEN <-- when promise is settled (fulfilled / rejected)
// (2) Handle error in the end of promise chain using CATCH method *CATCH <-- when promise is rejected

// * FINALLY method: callback function will ALWAYS be called whatever happened to promises
/////////////////////////////////////////////////////////

// NOTE 9. Throwing Errors Manually
// (*see updated code in 7. chaining promises)
// throw new Error(...)

/////////////////////////////////////////////////////////

// Coding challenge #1
/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Couldn't found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       //'You are in Berlin, Germany'
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Couldn't found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(error => {
//       // Handle error
//       console.error(`Something went wrong ${error.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
/////////////////////////////////////////////////////////

// NOTE 10. Asynchronous Behind the Scenes: The Event Loop
// Review video and PDF
/////////////////////////////////////////////////////////

// NOTE 11 The Event Loop in Practice
// Timer in Js is not reliable when you work with Promises.

// console.log('Test starts');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test ends');

/////////////////////////////////////////////////////////

// NOTE 12. Building a Simple Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery starts.');
//   setTimeout(() => {
//     if (Math.random() > 0.5) {
//       resolve('Win!');
//     } else {
//       reject(new Error('Lose!'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

/////////////////////////////////////////////////////////

// NOTE 13. Promisifying the Geolocation API
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
*/
/////////////////////////////////////////////////////////

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imgContainer = document.querySelector('.images');

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found.'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     console.log('Image 1 loaded.');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('Image 2 loaded.');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     console.log('Image 3 loaded.');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/////////////////////////////////////////////////////////

// NOTE 14. Consuming Promises with Async/Await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}.`;
  } catch (error) {
    // Handle error
    renderError(`${error.message}`);

    // Reject promise returned from async function
    throw error;
  }
};

// whereAmI();
/////////////////////////////////////////////////////////

// NOTE 15. Error Handling With try ... catch
// See 14. updated code
/////////////////////////////////////////////////////////

// NOTE 16. Returning Values from Async Functions
// See 14. updated code
// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => {
//     console.log('3: Will get location');
//   });

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     // Handle Error
//     console.log(`2: ${error.message}`);
//   }
//   console.log('3: Will get location');
// })();
/////////////////////////////////////////////////////////

// NOTE 17. Running Promises in Parallel
// Promise Combinator: Promise.all
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (error) {
    // Handle Error
    console.log(error);
  }
};
// get3Countries('portugal', 'canada', 'tanzania');
/////////////////////////////////////////////////////////

// NOTE 18. Other Promise Combinators: race, allSettled and any
// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// // Promise.race real-world usage
// const timeout = function (sec) {
//   // throw away variable _ *NO resolve
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(0.1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// Promise.allSettled *ES2020
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Promise.any *ES2021
// Return the first fullfiled promise; rejected promise will be ignored
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
/////////////////////////////////////////////////////////

// Coding challenge #3
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found.'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     console.log('Image 1 loaded.');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('Image 2 loaded.');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     console.log('Image 3 loaded.');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Part 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded.');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded.');
    await wait(2);
    img.style.display = 'none';

    // Load image 3
    img = await createImage('img/img-3.jpg');
    console.log('Image 2 loaded.');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    // Handle Error
    console.error(err);
  }
};

// loadNPause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
