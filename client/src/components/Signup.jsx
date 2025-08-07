import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faKey,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import EventImg from "../images/logo.png";
import SignIn from "../images/signpic.png";
import axios from "axios";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [activeButton, setActiveButton] = useState("organizer");

  const openLoginPage = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        confirm_password: confirmPassword,
        category: activeButton,
      });

      toast.success(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="signup-container">
        {/* Left side form */}
        <div className="signup-box">
          <h3 className="signup-title">Sign Up as</h3>

          {/* Organizer / Attendee buttons */}
          <div className="btn-group">
            <button
              className={
                activeButton === "organizer" ? "btn-active" : "btn-inactive"
              }
              onClick={() => setActiveButton("organizer")}
            >
              Organizer
            </button>

            <button
              className={
                activeButton === "attendee" ? "btn-active" : "btn-inactive"
              }
              onClick={() => setActiveButton("attendee")}
            >
              Attendee
            </button>
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email input */}
          <div className="input-group">
            <FontAwesomeIcon icon={faAt} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input with toggler */}
          <div className="input-group">
            <FontAwesomeIcon icon={faKey} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Confirm Password input with separate toggler */}
          <div className="input-group">
            <FontAwesomeIcon icon={faKey} className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          {/* Remember me and forgot password */}
          <div className="options-row">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          {/* Sign Up button */}
          <button className="btn-primary" onClick={handleSignup}>
            Sign Up
          </button>

          {/* Sign In / Sign Up buttons */}
          <div className="btn-group">
            <button className="signup-btn-inactive" onClick={openLoginPage}>
              Sign In
            </button>
            <button className="signup-btn-active">Sign Up</button>
          </div>

          {/* Back button */}
          <div className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </div>
        </div>

        {/* Right side images */}
        <div className="login-image">
          <h1>Welcome to</h1>
          <img src={EventImg} alt="Evento EMS" className="top-image" />
          <img src={SignIn} alt="Success Factors" className="bottom-image" />
        </div>
      </div>
    </>
  );
}
