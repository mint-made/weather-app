const request = require('request');

// API details for MapBox and OpenWeather
const API = {
  ow: {
    key: '&appid=a407e727f4ec6ff841f3469f46a5cd28',
    base: 'http://api.openweathermap.org/data/2.5/weather?',
    cityName: 'q=',
    lat: 'lat=',
    lon: 'lon=',
  },
  mb: {
    key:
      'access_token=pk.eyJ1IjoibWludC1tYWRlIiwiYSI6ImNraHRteHBwNTE0a2QycGt6ZHFtanpjdzIifQ.ZEm8gJzjR1Fo76XHOANsfw',
    base: 'https://api.mapbox.com/',
    geo: 'geocoding/v5/mapbox.places/',
    limit: '&limit=1',
  },
};

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

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `${API.mb.base}${API.mb.geo}${encodedAddress}.json?${API.mb.key}${API.mb.limit}`;

  request({ url: mbSample, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the Geocoding service', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find this location', undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        lon: response.body.features[0].center[0],
      });
    }
  });
};

geocode('Bristol', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Your location is: (${data.lat}, ${data.lon})`);
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
