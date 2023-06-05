
const Station = require('../model/indiagoAPis');
const Weather = require('../model/weatherAPi');

const getAllStations = async (req, res) => {
  console.log("yes i am all station");
  try {
    // Fetch station data from the database
    const stations = await Station.find();

    // Fetch weather data from the database
    const weather = await Weather.findOne().sort({ savedTime: -1 });

    // Check if weather data exists
    if (!weather) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    // Construct the response object,
    const response = {
      at: weather.savedTime,
      stations,
      weather,
    };

    res.json(response);
  } catch (error) {
    console.error('Error retrieving stations:', error);
    res.status(500).json({ error: 'Failed to retrieve stations' });
  }
};
//not working yet
const getStationByIdAndTime = async (req, res) => {
  const { kioskId } = req.params;
  const { at } = req.query;

  try {
    // Convert the provided time string to a Date object
    const time = new Date(at);

    // Query the database for the station with the specified ID and savedTime greater than or equal to the provided time
    const station = await Station.findOne({ 'properties.kioskId': kioskId, savedTime: { $gte: time } }).sort({ savedTime: 1 });

    // Fetch the weather data from the database for the specified time
    const weather = await Weather.findOne({ savedTime: { $gte: time } }).sort({ savedTime: 1 });

    // Check if the station and weather data exist
    if (!station || !weather) {
      return res.status(404).json({ error: 'No suitable data available' });
    }

    // Construct the response object
    const response = {
      at: time.toISOString(),
      station,
      weather,
    };

    res.json(response);
  } catch (error) {
    console.error('Error retrieving station:', error);
    res.status(500).json({ error: 'Failed to retrieve station' });
  }
};



module.exports = { getAllStations, getStationByIdAndTime};
