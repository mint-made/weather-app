const API = require('./utils/keys');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if (process.argv[2]) {
  geocode(process.argv[2], (error, { lat, lon }) => {
    if (error) {
      return console.log(error);
    }
    forecast(lat, lon, (error, { temperature, location }) => {
      if (error) {
        return console.log(error);
      }
      console.log(
        `It is currently ${temperature} degrees in ${location} / (${lat}, ${lon})`
      );
    });
  });
} else {
  console.log('Please add a location argument to find current weather');
}
