import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import os from 'os';
import xlsx from 'xlsx';
import express from 'express';
import cors from 'cors';
 
const app = express();
const API_KEY = '6ddd06c16b84bc453db3878b319f4312'; // Replace with your OpenWeatherMap API key
const CITIES = ['Pune', 'Mumbai', 'Delhi', 'Rajasthan'];
const UNIT = 'metric';
 
// Get the absolute path to the Downloads folder
const downloadsPath = path.join(os.homedir(), 'Downloads');
 
// Generate file name based on the current date
function generateFileName() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  return path.join(downloadsPath, `weather-data-${dateStr}.xlsx`);
}
 
// File path to store weather data
let weatherFilePath = generateFileName();
 
// Fetch weather data for all cities and write to Excel file
async function fetchWeatherData() {
  try {
    let wb;
 
    // Check if the file exists
    if (fs.existsSync(weatherFilePath)) {
      wb = xlsx.readFile(weatherFilePath);
    } else {
      wb = xlsx.utils.book_new();
      const ws = xlsx.utils.aoa_to_sheet([['Timestamp', 'City', 'Temperature (°C)', 'Wind Speed (m/s)']]);
      xlsx.utils.book_append_sheet(wb, ws, 'Weather Data');
    }
 
    const ws = wb.Sheets['Weather Data'];
 
    // Get the current last row index
    let range = ws['!ref'] ? xlsx.utils.decode_range(ws['!ref']) : { e: { r: 0 } };
    let rowIndex = range.e.r + 1; // Start from the next row after existing data
 
    for (const city of CITIES) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${UNIT}`;
      const response = await fetch(url);
 
      if (!response.ok) {
        console.error(`Failed to fetch data for ${city}: ${response.statusText}`);
        continue;
      }
 
      const data = await response.json();
      const weatherInfo = {
        timestamp: new Date().toLocaleString(),
        city,
        temperature: data.main.temp, // Temperature in Celsius
        windSpeed: data.wind.speed, // Wind speed in m/s
      };
 
      console.log(`Fetched Weather Data for ${city}:`, weatherInfo);
 
      // Append the new data
      const logEntry = [
        weatherInfo.timestamp,
        weatherInfo.city,
        weatherInfo.temperature,
        weatherInfo.windSpeed,
      ];
      xlsx.utils.sheet_add_aoa(ws, [logEntry], { origin: `A${rowIndex + 1}` });
      rowIndex++; // Increment the row index for the next city
    }
 
    // Write updated data to the file
    xlsx.writeFile(wb, weatherFilePath);
    console.log('Weather data appended to Excel file:', weatherFilePath);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
 
// Middleware
app.use(cors());
 
// Serve weather data file
// Serve weather data file
app.get('/weather-log', (req, res) => {
  if (fs.existsSync(weatherFilePath)) {
    res.setHeader('Content-Type', 'application/json');
    const workbook = xlsx.readFile(weatherFilePath);
    const worksheet = workbook.Sheets['Weather Data'];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // Include header row
    res.json(jsonData); // Return data in tabular format
  } else {
    res.status(404).send('Weather data file not found.');
  }
});
 
 
// Start fetching data every 2 minutes
setInterval(fetchWeatherData, 2 * 60 * 1000);
fetchWeatherData();
 
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));