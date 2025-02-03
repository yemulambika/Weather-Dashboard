require('dotenv').config();
const fs = require('fs');
const xlsx = require('xlsx');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const os = require('os');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const dbURI = process.env.DATABASE;
if (!dbURI) {
  console.error('Error: DATABASE is not defined in environment variables.');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Constants
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('Error: API_KEY is not defined in environment variables.');
  process.exit(1);
}

const UNIT = 'metric';
const COORDINATES = [
  { latitude: 18.5204, longitude: 73.8567 },
  { latitude: 23.4771, longitude: 68.905637 },
  { latitude: 23.486138, longitude: 68.846089 },
  { latitude: 23.560601, longitude: 68.654017 },
];

// Set the Downloads directory inside the server folder
const DOWNLOADS_DIR = path.join(__dirname, 'Downloads');
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

let weatherFilePath = generateFileName();
let lastFileCreationTime = new Date(0);

// Helper Functions
function generateFileName() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  return path.join(DOWNLOADS_DIR, `weather_data_${dateStr}.xlsx`);
}

async function fetchLocationWeatherData({ latitude, longitude }) {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat: latitude, lon: longitude, appid: API_KEY, units: UNIT },
    });
    const placeName = response.data.name || "Unknown";
    return {
      latitude,
      longitude,
      placeName,
      temperature: response.data.main.temp,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      clouds: response.data.clouds.all,
      timestamp: new Date().toLocaleString(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchWeatherData() {
  const weatherData = await Promise.all(COORDINATES.map(fetchLocationWeatherData));
  const validData = weatherData.filter((data) => data !== null);

  if (validData.length === 0) {
    console.error('No valid weather data fetched.');
    return;
  }

  if (new Date().getDate() !== lastFileCreationTime.getDate()) {
    weatherFilePath = generateFileName();
    lastFileCreationTime = new Date();
  }

  let wb;
  if (fs.existsSync(weatherFilePath)) {
    try {
      wb = xlsx.readFile(weatherFilePath);
      if (!wb.SheetNames || wb.SheetNames.length === 0) {
        console.warn('Existing workbook is empty or invalid. Creating a new workbook.');
        wb = xlsx.utils.book_new();
      }
    } catch (err) {
      console.error('Error reading workbook. Creating a new one:', err.message);
      wb = xlsx.utils.book_new();
    }
  } else {
    wb = xlsx.utils.book_new();
  }

  if (!wb.Sheets['Weather Data']) {
    const headers = [
      ['Latitude', 'Longitude', 'Place Name', 'Timestamp', 'Temperature (°C)', 'Wind Speed (m/s)', 'Wind Direction (°)', 'Pressure (hPa)', 'Humidity (%)', 'Cloud Cover (%)'],
    ];
    const ws = xlsx.utils.aoa_to_sheet(headers);
    xlsx.utils.book_append_sheet(wb, ws, 'Weather Data');
  }

  const ws = wb.Sheets['Weather Data'];
  const logEntries = validData.map(({ latitude, longitude, placeName, timestamp, temperature, windSpeed, windDirection, pressure, humidity, clouds }) => [
    latitude, longitude, placeName, timestamp, temperature, windSpeed, windDirection, pressure, humidity, clouds,
  ]);

  xlsx.utils.sheet_add_aoa(ws, logEntries, { origin: -1 });
  wb.Sheets['Weather Data'] = ws;

  xlsx.writeFile(wb, weatherFilePath);
  console.log('Weather data appended to Excel file:', weatherFilePath);
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  fetchWeatherData();
  setInterval(fetchWeatherData, 2 * 60 * 1000);
});
