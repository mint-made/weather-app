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

module.exports = API;
