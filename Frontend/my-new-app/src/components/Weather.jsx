import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import "./Weather.css";

const WeatherGraph = () => {
  const [weatherData, setWeatherData] = useState({});
  const [searchCoordinates, setSearchCoordinates] = useState("19.0760, 72.8777"); // Default coordinates
  const [error, setError] = useState("");

  const fetchWeatherData = async (coordinates) => {
    try {
      const response = await axios.get("http://localhost:5000/weather-log", {
        params: { coordinates },
      });
      const data = response.data;
  
      if (!data || data.length === 0) {
        setError("No data available for the provided coordinates.");
        return;
      }
  
      const locationKey = `${data[0].latitude},${data[0].longitude}`;
      setWeatherData((prevData) => {
        const existingData = prevData[locationKey] || {
          labels: [],
          temperatures: [],
          windSpeeds: [],
          humidities: [],
          pressures: [],
          cloudCoverages: [],
          placeName: data[0].placeName,
        };
  
        // Check if the timestamp already exists
        if (existingData.labels.includes(data[0].timestamp)) {
          return prevData; // No updates if timestamp already exists
        }
  
        return {
          ...prevData,
          [locationKey]: {
            ...existingData,
            labels: [...existingData.labels, data[0].timestamp],
            temperatures: [...existingData.temperatures, data[0].temperature],
            windSpeeds: [...existingData.windSpeeds, data[0].windSpeed],
            humidities: [...existingData.humidities, data[0].humidity],
            pressures: [...existingData.pressures, data[0].pressure],
            cloudCoverages: [...existingData.cloudCoverages, data[0].clouds],
          },
        };
      });
  
      setError("");
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      setError("Failed to fetch weather data. Please check the coordinates.");
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    const sanitizedCoordinates = searchCoordinates.replace(/[^\d.,-]/g, ""); // Remove invalid characters
    if (!sanitizedCoordinates.includes(",")) {
      setError("Please enter valid coordinates in the format: latitude,longitude.");
      return;
    }

    setWeatherData({});
    fetchWeatherData(sanitizedCoordinates.trim());
  };

  const createChart = (id, title, datasets, labels, yLabel) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const existingChart = Chart.getChart(id);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "line",
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
            x: { title: { display: true, text: "Time" } },
            y: { title: { display: true, text: yLabel }, beginAtZero: true },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (Object.keys(weatherData).length > 0) {
      const labels = Object.values(weatherData)[0]?.labels || [];

      const datasetsForGraph = (key) => {
        return Object.keys(weatherData).map((location) => ({
          label: `Location (${location})`,
          data: weatherData[location][key],
          borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
          tension: 0.4,
          fill: false,
        }));
      };

      createChart("temperature-graph", "Temperature in Locations", datasetsForGraph("temperatures"), labels, "Temperature (°C)");
      createChart("wind-speed-graph", "Wind Speed in Locations", datasetsForGraph("windSpeeds"), labels, "Wind Speed (m/s)");
      createChart("humidity-graph", "Humidity in Locations", datasetsForGraph("humidities"), labels, "Humidity (%)");
      createChart("pressure-graph", "Pressure in Locations", datasetsForGraph("pressures"), labels, "Pressure (hPa)");
      createChart("cloud-coverage-graph", "Cloud Coverage in Locations", datasetsForGraph("cloudCoverages"), labels, "Cloud Coverage (%)");
    }
  }, [weatherData]);

  useEffect(() => {
    let interval;
    if (searchCoordinates) {
      interval = setInterval(() => {
        fetchWeatherData(searchCoordinates.trim());
      }, 30000); // Fetch data every 30 seconds
    }
    return () => clearInterval(interval);
  }, [searchCoordinates]);

  useEffect(() => {
    fetchWeatherData(searchCoordinates.trim());
  }, []);

  const renderTable = (key, label) => (
    <div className="table-container" >
      <h3>{label} Data</h3>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Coordinates</th>
            <th>Place</th>
            <th>Time</th>
            <th>{label}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(weatherData).map((location) => {
            const data = weatherData[location];
            return data.labels.slice(-10).map((time, i) => (
              <tr key={`${location}-${i}`}>
                <td>{location}</td>
                <td>{data.placeName}</td>
                <td>{time}</td>
                <td>{data[key][i]}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
  

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Weather Data for Locations</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter coordinates (e.g., 23.55,68.66)"
          value={searchCoordinates}
          onChange={(e) => setSearchCoordinates(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Search
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="graph-table-container">
        <div className="graph-container">
          <h3>Temperature in Locations</h3>
          <canvas id="temperature-graph"></canvas>
        </div>
        {renderTable("temperatures", "Temperature (°C)")}
      </div>
      <div className="graph-table-container">
        <div className="graph-container">
          <h3>Wind Speed in Locations</h3>
          <canvas id="wind-speed-graph"></canvas>
        </div>
        {renderTable("windSpeeds", "Wind Speed (m/s)")}
      </div>
      <div className="graph-table-container">
        <div className="graph-container">
          <h3>Humidity in Locations</h3>
          <canvas id="humidity-graph"></canvas>
        </div>
        {renderTable("humidities", "Humidity (%)")}
      </div>
      <div className="graph-table-container">
        <div className="graph-container">
          <h3>Pressure in Locations</h3>
          <canvas id="pressure-graph"></canvas>
        </div>
        {renderTable("pressures", "Pressure (hPa)")}
      </div>
      <div className="graph-table-container">
        <div className="graph-container">
          <h3>Cloud Coverage in Locations</h3>
          <canvas id="cloud-coverage-graph"></canvas>
        </div>
        {renderTable("cloudCoverages", "Cloud Coverage (%)")}
      </div>
    </div>
  );
};

export default WeatherGraph;
