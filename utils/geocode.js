const request = require('request');
const API = require('./keys');

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `${API.mb.base}${API.mb.geo}${encodedAddress}.json?${API.mb.key}${API.mb.limit}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the Geocoding service', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find this location', undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        lon: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
