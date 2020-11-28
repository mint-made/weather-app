const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mint Made',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mint Made',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpMessage: 'Find answers to all of your problems here',
    name: 'Mint Made',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter a location to search',
    });
  }
  // Geocode and weather API requests
  geocode(req.query.address, (error, { lat, lon } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(lat, lon, (error, { temperature, location }) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        addressQuery: req.query.address,
        temperature,
        location,
        lat,
        lon,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found.',
    name: 'Mint Made',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Mint Made',
  });
});

app.listen(port, () => {
  console.log('Sever started at: ' + port);
});
