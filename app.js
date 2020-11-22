const request = require('request');

// API details
const API = {
  key: '&appid=a407e727f4ec6ff841f3469f46a5cd28',
  base: 'api.openweathermap.org/data/2.5/weather?',
  cityName: 'q=',
  lat: 'lat=',
  lng: 'lon=',
};
console.log(`${API.base}${API.lat}51.4&${API.lng}-2.5${API.key}`);
