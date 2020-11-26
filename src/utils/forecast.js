const request = require('request');
const { ow } = require('./keys');

const forecast = (lat, lon, callback) => {
  const url = `${ow.base}${ow.lat}${lat}&${ow.lon}${lon}${ow.key}`;
  console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service', undefined);
    } else if (body.message) {
      callback('Unable to find location: ' + body.message, undefined);
    } else {
      //console.log(body);
      callback(undefined, {
        temperature: (body.main.temp - 273.15).toFixed(2),
        location: body.name,
      });
    }
  });
};
module.exports = forecast;
