import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
 
const WeatherGraph = () => {
  const [weatherData, setWeatherData] = useState([]);
  const chartRef = useRef(null);
 
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/weather-log');
      const data = response.data;
 
      // Skip headers and parse city-specific data
      const labels = [];
      const temperatureData = {};
      const windSpeedData = {};
 
      data.slice(1).forEach((row) => {
        const [dateTime, city, temp, wind] = row;
        if (dateTime && city && temp && wind) {
          labels.push(dateTime);
 
          // Initialize city-specific data if not present
          if (!temperatureData[city]) {
            temperatureData[city] = [];
            windSpeedData[city] = [];
          }
 
          // Append city-specific values
          temperatureData[city].push(temp);
          windSpeedData[city].push(wind);
        }
      });
 
      setWeatherData({ labels: [...new Set(labels)], temperatureData, windSpeedData });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
 
  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 2 * 60 * 1000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, []);
 
  useEffect(() => {
    if (weatherData.labels && weatherData.labels.length > 0) {
      // Destroy previous chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }
 
      const ctx = document.getElementById('weatherChart').getContext('2d');
      const datasets = Object.keys(weatherData.temperatureData).map((city) => ({
        label: `${city} - Temperature (°C)`,
        data: weatherData.temperatureData[city],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      }));
 
      datasets.push(
        ...Object.keys(weatherData.windSpeedData).map((city) => ({
          label: `${city} - Wind Speed (m/s)`,
          data: weatherData.windSpeedData[city],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          fill: true,
        }))
      );
 
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: weatherData.labels,
          datasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: 'Real-Time Weather Data by City' },
          },
          scales: {
            x: {
              title: { display: true, text: 'Date & Time' },
              ticks: { maxRotation: 45, minRotation: 45 },
            },
            y: {
              title: { display: true, text: 'Value' },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [weatherData]);
 
  return (
    <div>
      <h1>Real-Time Weather Graph</h1>
      <canvas id="weatherChart" width="800" height="400"></canvas>
    </div>
  );
};
 
export default WeatherGraph;