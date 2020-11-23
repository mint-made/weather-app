const request = require('request');
const API = require('./utils/keys');
const geocode = require('./utils/geocode');

// MapBox API Request
// const mbSample = `${API.mb.base}${API.mb.geo}Bristol.json?${API.mb.key}${API.mb.limit}`;
// console.log(mbSample)

// request({ url: mbSample, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to the Geocoding service');
//   } else if (!response.body.features || response.body.features.length === 0) {
//     console.log('Unable to find this location');
//   } else {
//     coord.lat = response.body.features[0].center[1];
//     coord.lon = response.body.features[0].center[0];
//     console.log(`Your location is: (${coord.lat}, ${coord.lon})`);
//   }
// });

geocode('London', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`${data.location} is found at: (${data.lat}, ${data.lon})`);
  }
});

// OpenWeather API Request
const owSample = `${API.ow.base}${API.ow.lat}51.4585&${API.ow.lon}-2.58333${API.ow.key}`;
// console.log(owSample);
request({ url: owSample, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to the weather service');
  } else if (response.body.message) {
    console.log('Unable to find location: ' + response.body.message);
  } else {
    const temperature = kelvinToCelsius(response.body.main.temp);
    const forecast = `It is currently ${temperature} degrees out`;
    console.log(forecast);
  }
});

// Utility
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
