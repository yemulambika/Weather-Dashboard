import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import "./login.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // To hold error message
  const [success, setSuccess] = useState(""); // To hold success message

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reset-password",
        {
          email,
          newPassword,
          confirmPassword,
        },
      );

      // If password reset is successful
      setSuccess(response.data.message);
      setError(""); // Clear any previous errors
      navigate("/"); // Redirect to login page
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Error resetting password.",
      );
      setSuccess(""); // Clear any success message
    }
  };

  return (
    <section className="forgot-password">
      <div className="container-forgot">
        <div className="forgot-password-content">
          <h2 className="form-title">Reset Your Password</h2>
          <form method="POST" className="reset-form" id="reset-form">
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "30px" }}
                placeholder="Enter your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">
                <i className="zmdi zmdi-lock"></i>
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ paddingLeft: "30px" }}
                placeholder="New Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">
                <i className="zmdi zmdi-lock"></i>
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{ paddingLeft: "30px" }}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group form-button">
              <input
                type="submit"
                name="reset"
                id="reset"
                className="form-submit"
                value="Reset Password"
                onClick={handlePasswordReset} // Handle the password reset
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
