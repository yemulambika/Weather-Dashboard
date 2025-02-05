import React from "react";
import "../App.css"; // Assuming you have styles defined in App.css

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="weather-card" style={{ width: "500px", height: "280px" }}>
      <h3>{weatherData.location || "Unknown Location"}</h3>
      <div className="weather-details">
        <p>
          <strong>Latitude:</strong> {weatherData.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {weatherData.longitude}
        </p>
        <p>
          <strong>Temperature:</strong> {weatherData.temperature} °C
        </p>
        <p>
          <strong>Pressure:</strong> {weatherData.pressure} hPa
        </p>
        <p>
          <strong>Humidity:</strong> {weatherData.humidity} %
        </p>
        <p>
          <strong>Cloud Coverage:</strong> {weatherData.cloudCoverage} %
        </p>
        <p>
          <strong>Wind Speed:</strong> {weatherData.windSpeed} m/s
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
