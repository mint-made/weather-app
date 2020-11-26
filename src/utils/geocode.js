const request = require('request');
const { mb } = require('./keys');

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `${mb.base}${mb.geo}${encodedAddress}.json?${mb.key}${mb.limit}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the geocoding service', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another Search.', undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
