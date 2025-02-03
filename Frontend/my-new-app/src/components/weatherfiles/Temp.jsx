import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import "../Weather.css";

const Temp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  const coordinatesList = [
    "18.5204,73.8567",
    "23.4771,68.905637",
    "23.486138,68.846089",
    "23.560601,68.654017",
  ];

  const fetchWeatherData = async (coordinates) => {
    try {
      const response = await axios.get("http://localhost:5000/weather-log", {
        params: { coordinates },
      });
      const data = response.data;

      if (!data || data.length === 0) {
        setError(`No data available for coordinates: ${coordinates}`);
        return;
      }

      const locationKey = `${data[0].latitude},${data[0].longitude}`;
      setWeatherData((prevData) => {
        const existingData = prevData[locationKey] || {
          labels: [],
          temperatures: [],
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
          },
        };
      });

      setError("");
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      setError("Failed to fetch weather data. Please check the coordinates.");
    }
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
    }
  }, [weatherData]);

  useEffect(() => {
    const fetchAllData = () => {
      coordinatesList.forEach((coordinates) => {
        fetchWeatherData(coordinates);
      });
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 30000); // Fetch data every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const renderTable = (key, label) => (
    <div className="table-container">
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
      <h1>Temprature Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="graph-table-container">
        <div className="graph-container">
          <h3>Temperature in Locations</h3>
          <canvas id="temperature-graph"></canvas>
        </div>
        {renderTable("temperatures", "Temperature (°C)")}
      </div>
      
    </div>
  );
};

export default Temp;
