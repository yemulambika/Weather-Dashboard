import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

const WeatherGraph = () => {
  const [weatherData, setWeatherData] = useState({});

  // Fetch weather data from the server
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/weather-log');
      const data = response.data;

      const weatherMap = {};

      data.forEach((row, index) => {
        if (index === 0 || row.length < 9) return; // Skip header or invalid rows
        const [latitude, longitude, fullDateTime, temp, wind, windDir, pressure, humidity, clouds] = row;

        const locationKey = `${latitude},${longitude}`;
        if (!weatherMap[locationKey]) {
          weatherMap[locationKey] = {
            labels: [],
            temperatures: [],
            windSpeeds: [],
            humidities: [],
            pressures: [],
            cloudCoverages: [],
          };
        }

        const timeOnly = typeof fullDateTime === 'string' ? fullDateTime.split(' ')[1] : 'Unknown';
        weatherMap[locationKey].labels.push(timeOnly);
        weatherMap[locationKey].temperatures.push(parseFloat(temp));
        weatherMap[locationKey].windSpeeds.push(parseFloat(wind));
        weatherMap[locationKey].humidities.push(parseFloat(humidity));
        weatherMap[locationKey].pressures.push(parseFloat(pressure));
        weatherMap[locationKey].cloudCoverages.push(parseFloat(clouds));
      });

      setWeatherData(weatherMap);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  // Helper function to create charts
  const createChart = (id, title, datasets, labels, yLabel) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const ctx = canvas.getContext('2d');

      // Destroy any existing chart instance to avoid duplication
      const existingChart = Chart.getChart(id);
      if (existingChart) {
        existingChart.destroy();
      }

      // Create a new chart
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: true, text: title },
          },
          scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: yLabel }, beginAtZero: true },
          },
        },
      });
    }
  };

  // Generate random colors for the datasets
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 2 * 60 * 1000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Object.keys(weatherData).length > 0) {
      const labels = Object.values(weatherData)[0]?.labels || [];

      const datasetsForGraph = (key) => {
        return Object.keys(weatherData).map((location) => ({
          label: `Location (${location})`,
          data: weatherData[location][key],
          borderColor: getRandomColor(),
          backgroundColor: getRandomColor(),
          tension: 0.4,
          fill: false,
        }));
      };

      createChart('temperature-graph', 'Temperature in Locations', datasetsForGraph('temperatures'), labels, 'Temperature (°C)');
      createChart('wind-speed-graph', 'Wind Speed in Locations', datasetsForGraph('windSpeeds'), labels, 'Wind Speed (m/s)');
      createChart('humidity-graph', 'Humidity in Locations', datasetsForGraph('humidities'), labels, 'Humidity (%)');
      createChart('pressure-graph', 'Pressure in Locations', datasetsForGraph('pressures'), labels, 'Pressure (hPa)');
      createChart('clouds-graph', 'Cloud Coverage in Locations', datasetsForGraph('cloudCoverages'), labels, 'Cloud Coverage (%)');
    }
  }, [weatherData]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Weather Data for Locations</h1>

      {/* Temperature Graph */}
      <div>
        <h3>Temperature in Locations</h3>
        <canvas id="temperature-graph" width="800" height="400"></canvas>
      </div>

      {/* Wind Speed Graph */}
      <div>
        <h3>Wind Speed in Locations</h3>
        <canvas id="wind-speed-graph" width="800" height="400"></canvas>
      </div>

      {/* Humidity Graph */}
      <div>
        <h3>Humidity in Locations</h3>
        <canvas id="humidity-graph" width="800" height="400"></canvas>
      </div>

      {/* Pressure Graph */}
      <div>
        <h3>Pressure in Locations</h3>
        <canvas id="pressure-graph" width="800" height="400"></canvas>
      </div>

      {/* Cloud Coverage Graph */}
      <div>
        <h3>Cloud Coverage in Locations</h3>
        <canvas id="clouds-graph" width="800" height="400"></canvas>
      </div>
    </div>
  );
};

export default WeatherGraph;
