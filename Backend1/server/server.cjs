require("dotenv").config();
const fs = require("fs");
const xlsx = require("xlsx");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const os = require("os");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const dbURI = process.env.DATABASE;
if (!dbURI) {
  console.error("Error: DATABASE is not defined in environment variables.");
  process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Constants
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error("Error: API_KEY is not defined in environment variables.");
  process.exit(1);
}

const UNIT = "metric";
const COORDINATES = [
  { latitude: 18.5204, longitude: 73.8567 },
  { latitude: 23.4771, longitude: 68.905637 },
  { latitude: 23.486138, longitude: 68.846089 },
  { latitude: 23.560601, longitude: 68.654017 },
];

const DOWNLOADS_DIR = path.join(os.homedir(), "Downloads");
let weatherFilePath = generateFileName();
let lastFileCreationTime = new Date(0);

// Helper Functions
function generateFileName() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  return path.join(DOWNLOADS_DIR, `weather_data_${dateStr}.xlsx`);
}

const axiosInstance = axios.create({
  proxy: {
    host: "10.102.0.151", // Replace with your proxy host
    port: 8080,
    // // Replace with your proxy port
    auth: {
      username: "ambika.intern", // Replace with your proxy username
      password: "Nks@#1999aqz", // Replace with your proxy password
    },
  },
});
async function fetchLocationWeatherData({ latitude, longitude }) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: { lat: latitude, lon: longitude, appid: API_KEY, units: UNIT },
      },
    );
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
    // console.error(`Error fetching weather data for (${latitude}, ${longitude}):, error.response?.data || error.message`);
    return null;
  }
}

async function fetchWeatherData() {
  const weatherData = await Promise.all(
    COORDINATES.map(fetchLocationWeatherData),
  );
  const validData = weatherData.filter((data) => data !== null);

  if (validData.length === 0) {
    console.error("No valid weather data fetched.");
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
        console.warn(
          "Existing workbook is empty or invalid. Creating a new workbook.",
        );
        wb = xlsx.utils.book_new();
      }
    } catch (err) {
      console.error("Error reading workbook. Creating a new one:", err.message);
      wb = xlsx.utils.book_new();
    }
  } else {
    wb = xlsx.utils.book_new();
  }

  if (!wb.Sheets["Weather Data"]) {
    const headers = [
      [
        "Latitude",
        "Longitude",
        "Place Name",
        "Timestamp",
        "Temperature (°C)",
        "Wind Speed (m/s)",
        "Wind Direction (°)",
        "Pressure (hPa)",
        "Humidity (%)",
        "Cloud Cover (%)",
      ],
    ];
    const ws = xlsx.utils.aoa_to_sheet(headers);
    xlsx.utils.book_append_sheet(wb, ws, "Weather Data");
  }

  const ws = wb.Sheets["Weather Data"];
  const logEntries = validData.map(
    ({
      latitude,
      longitude,
      placeName,
      timestamp,
      temperature,
      windSpeed,
      windDirection,
      pressure,
      humidity,
      clouds,
    }) => [
      latitude,
      longitude,
      placeName,
      timestamp,
      temperature,
      windSpeed,
      windDirection,
      pressure,
      humidity,
      clouds,
    ],
  );

  xlsx.utils.sheet_add_aoa(ws, logEntries, { origin: -1 });
  wb.Sheets["Weather Data"] = ws;

  xlsx.writeFile(wb, weatherFilePath);
  console.log("Weather data appended to Excel file:", weatherFilePath);
}

// Routes
app.get("/weather-log", async (req, res) => {
  const { coordinates } = req.query;
  if (!coordinates)
    return res.status(400).json({ error: "Coordinates are required." });

  const [latitude, longitude] = coordinates.split(",").map(Number);
  if (isNaN(latitude) || isNaN(longitude)) {
    return res
      .status(400)
      .json({ error: "Invalid coordinates format. Use latitude,longitude." });
  }

  try {
    const data = await fetchLocationWeatherData({ latitude, longitude });
    if (!data)
      return res.status(500).json({ error: "Failed to fetch weather data." });

    res.json([data]);
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    work: String,
    password: String,
    cpassword: String,
  }),
);

app.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  if (password !== cpassword) {
    return res.status(422).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      work,
      password: hashedPassword, // Only hash password, not cpassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({
        message: "Please provide email, new password, and confirm password",
      });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password successfully updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  fetchWeatherData();
  setInterval(fetchWeatherData, 2 * 60 * 1000);
});
