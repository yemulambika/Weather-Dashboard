import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Help from "./components/Help";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Weather from "./components/Weather";
import Wind from "./components/weatherfiles/Wind";
import Cloud from "./components/weatherfiles/Cloud";
import Temp from "./components/weatherfiles/Temp";
import Pressure from "./components/weatherfiles/Pressure";
import Humidity from "./components/weatherfiles/Humidity";
import ForgotPassword from "./components/ForgotPassword"; // New ForgotPassword page
import Errorpage from "./components/Errorpage";
import CloudCoverage from "./components/AboutFlies/CloudCoverage";
import Pressure2 from "./components/AboutFlies/Pressure2";
import Temperature from "./components/AboutFlies/Temperature";
import WindAbout from "./components/AboutFlies/WindAbout";
import HumidityAbout from "./components/AboutFlies/HumidityAbout";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // After successful login, set this to true
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Logout function
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/signup" />;
  };

  return (
    <BrowserRouter>
      {/* Navbar should only show after login */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Login page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Home route */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />

        {/* Signup page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Forgot Password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Other protected pages */}
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/" />}
        />
        <Route
          path="/help"
          element={isAuthenticated ? <Help /> : <Navigate to="/" />}
        />
        <Route
          path="/weather"
          element={isAuthenticated ? <Weather /> : <Navigate to="/" />}
        />
        <Route
          path="/humidity"
          element={isAuthenticated ? <Humidity /> : <Navigate to="/" />}
        />
        <Route
          path="/temp"
          element={isAuthenticated ? <Temp /> : <Navigate to="/" />}
        />
        <Route
          path="/wind"
          element={isAuthenticated ? <Wind /> : <Navigate to="/" />}
        />
        <Route
          path="/cloud"
          element={isAuthenticated ? <Cloud /> : <Navigate to="/" />}
        />
        <Route
          path="/pressure"
          element={isAuthenticated ? <Pressure /> : <Navigate to="/" />}
        />

        {/* New AboutFlies pages */}
        <Route path="/HumidityAbout" element={<HumidityAbout />} />
        <Route path="/CloudCoverage" element={<CloudCoverage />} />
        <Route path="/Pressure2" element={<Pressure2 />} />
        <Route path="/WindAbout" element={<WindAbout />} />
        <Route path="/Temperature" element={<Temperature />} />

        {/* Catch-all route for non-matching paths */}
        <Route path="*" element={<Errorpage />} />

        {/* Protected Home page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer Section - Will appear on all pages */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Your Weather App. All Rights Reserved.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
