const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

const staticFilesPath = path.join(__dirname, '../public');
const viewFilesPath = path.join(__dirname, '../templates/views');
const partialFilesPath = path.join(__dirname, '../templates/partials');

app.use(express.static(staticFilesPath));
app.set('view engine', 'hbs');
app.set('views', viewFilesPath);

hbs.registerPartials(partialFilesPath);

app.get('', (req, res) => {
  res.render('index', {
    title: "Home",
    pageDescription: "Welcome to weather home page. Search for weather details.",
    name: "Pradhumn Sharma"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    pageDescription: "Welcome to about page. This page tells about our journey.",
    name: "Pradhumn Sharma"
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    pageDescription: "Welcome to help page. This page will guide you through out the application. Select from menu at top.",
    name: "Pradhumn Sharma"
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'There is some issue with query. Please check if address is provided'
    });
  }
  geocode(req.query.address, (error, data) => {
    if(error){
      return res.send({
        error: error
      });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error: error
        });
      }
      res.send({
        data: forecastData
      }) 
    });
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: "404 Not Found",
    pageDescription: "Oops! This is not application page. Go to ",
    name: "Pradhumn Sharma",
    wrongPage: true
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
})