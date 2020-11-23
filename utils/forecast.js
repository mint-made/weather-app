const request = require('request');
const API = require('./keys');

const forecast = (lat, lon, callback) => {
  const url = `${API.ow.base}${API.ow.lat}${lat}&${API.ow.lon}${lon}${API.ow.key}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the weather service', undefined);
    } else if (response.body.message) {
      callback('Unable to find location: ' + response.body.message, undefined);
    } else {
      callback(undefined, {
        temperature: (response.body.main.temp - 273.15).toFixed(2),
      });
    }
  });
};
module.exports = forecast;
