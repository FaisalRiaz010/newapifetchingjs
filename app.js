const express = require('express');
const mongoose = require('mongoose');
const { storeWeatherData } = require('./weatherservice');
require('dotenv').config();



// Import the route controllers
const indegoDataController = require('./controllers/indegoDataController');
const stationController = require('./controllers/stationController');

// Create an instance of the Express application
const app = express();

// Connect to MongoDB
mongoose
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  
    

    // Open Weather Map API key
    const apiKey = '588b51ce289a35323054cad5892a43f1';

    // Fetch and store weather data
    storeWeatherData(apiKey);

    // Define routes
    //for fetching th connection of mongodb and data from APIs of indiago is stored and fetched correctly
     app.get('/api/v1/indego-data-fetch-and-store-it-db', indegoDataController.fetchAndStoreIndegoData);
     //get the all station by timme of availability
    app.get('/api/v1/stations', stationController.getAllStations);
    //get the specific station on time 
    app.get('/api/v1/stations/:kioskId', stationController.getStationByIdAndTime);
    

  
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

module.exports = app;
