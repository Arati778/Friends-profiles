import React, { useState } from "react";
import "./LoginStyle.css";
import logo1 from "./Profile/image-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/user3`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const users = await response.json();

      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("userId", users.id);
        navigate("/profile");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
  };

  return (
    <div className="cover">
      <img src={logo1} alt="" className="logoimage" />
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
            <a
              href="#"
              onClick={handleForgotPassword}
              className="forgot-password"
            >
              Forgot Password?
            </a>
          </div>
          <button className="lndn" type="submit ">
            <i className="fa-brands fa-linkedin"></i> Sign In with LinkedIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
