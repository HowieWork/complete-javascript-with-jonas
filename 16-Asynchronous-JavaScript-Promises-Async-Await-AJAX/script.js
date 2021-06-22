'use strict';

// NOTE Index
// 1. Async JavaScript, AJAX and APIs
// 2. Our First AJAX Call: XMLHttpRequest
// 3. How the Web Works: Requests and Responses
// 4. Welcome to Callback Hell
// 5. Promises and the Fetch API
// 6. Consume Promises
// 7. Chaining Promises

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
  countriesContainer.style.opacity = 1;
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
const getCountryAndNeighbour = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

getCountryAndNeighbour('usa');
/////////////////////////////////////////////////////////
