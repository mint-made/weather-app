const request = require('request');
const API = require('./utils/keys');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('London', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`${data.location} is found at: (${data.lat}, ${data.lon})`);
  }
});

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

forecast(51.4585, -2.58, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`It is currently ${data.temperature} degrees out`);
  }
});
