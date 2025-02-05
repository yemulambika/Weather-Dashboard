import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signIn from "../images/signIn.jpg";
// import "../App.css";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";

const Login = ({ onLogin }) => {
  // onLogin passed from parent (App.jsx)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sample hardcoded users for frontend validation
  const users = [
    {
      email: "user@example.com",
      password: "password123", // Replace with your test credentials
    },
    {
      email: "admin@example.com",
      password: "admin123",
    },
  ];

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        onLogin(); // Trigger the parent’s login handler
        window.alert("Login Successful");
        navigate("/home"); // Redirect to home after login
      } else {
        window.alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      window.alert("Server Error");
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password page
    navigate("/forgot-password");
  };

  const handleCreateAccount = () => {
    // Redirect to the create account page
    navigate("/signup");
  };

  return (
    <section className="login">
      <div className="login-container">
        <div className="login-content">
          <div className="login-image">
            <figure>
              <img src={signIn} alt="login" />
            </figure>
          </div>
          {/* Login Form */}
          <div className="login-form">
            <h2 className="form-title">Sign In</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-account"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: "30px" }}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: "30px" }}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group form-button">
                <button
                  type="submit"
                  className="form-submit"
                  onClick={loginUser}
                >
                  Login
                </button>
              </div>
            </form>

            {/* Links for Forgot Password and Create Account */}
            <div className="form-footer">
              <a className="link-btn" onClick={handleForgotPassword}>
                Forgot Password?
              </a>
              <a className="link-btn" onClick={handleCreateAccount}>
                Create an Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
