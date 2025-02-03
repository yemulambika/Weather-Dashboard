import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      fetchWeatherData(query);
    }
  }, [query]);

  const fetchWeatherData = async (location) => {
    console.log("Fetching weather data for:", location);
    try {
      const response = await axios.get("http://localhost:5000/weather", {
        params: { location },
      });
      console.log("Weather data received:", response.data);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <div>
      <div className="container mt-4">
        {query && <h1>Weather Information for {query}</h1>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weatherData ? (
          <div>
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Pressure: {weatherData.pressure} hPa</p>
            <p>Cloud Coverage: {weatherData.cloudCoverage}%</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          </div>
        ) : (
          query && <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Search;
