import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../../configurations";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const userid = location.state.data.userid;

  // State to manage the password input field
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    setMessage(""); // Clear any previous error message when the password is changed
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    if (password.trim() === "") {
      setMessage("Enter password");
      return;
    }

    setLoading(true);
    // API URL where you want to send the patch request
    const apiUrl = baseurl + "admin/update_password/" + userid; // Replace with your API URL

    // Payload for the patch request
    const payload = {
      password: password,
    };

    // Make the patch request
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
        setPassword("");
      })
      .catch((error) => {
        setMessage("An error occurred while updating the password.");
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <div className="dsp-flx-001">
          <label htmlFor="password" className="color-main">
            Password:{" "}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>
          <button
            className="visible-data"
            onClick={handleResetPassword}
            disabled={loading}
          >
            Reset Password
          </button>
        </div>
        {message && <p className="error">{message}</p>}
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p
          className={
            message === "PASSWORD UPDATED SUCCESSFULLY" ? "success" : "error"
          }
        ></p>
      )}
    </div>
  );
}
