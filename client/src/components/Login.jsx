import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faKey,
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import EventImg from "../images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import SuccessImg from "../images/undraw_Success_factors_re_ce93.png";
import "../App.css";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeButton, setActiveButton] = useState("organizer");
  const navigate = useNavigate();

  const openSignUp = () => {
    navigate("/signup");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!email || !password || !activeButton) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        category: activeButton,
      });
      toast.success(res.data.message);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userCategory", res.data.user.category);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    const category = localStorage.getItem("userCategory");
    const email = localStorage.getItem("userEmail");

    if (category && email) {
      toast.info(`You're already logged in as ${category}`);
    }
  }, []);

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="login-box">
        <h3 className="login-title">Sign In as</h3>

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
          <FontAwesomeIcon icon={faAt} className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

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

        <div className="options-row">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        <button className="btn-primary" onClick={handleLogin}>
          Sign In
        </button>

        <div className="btn-group">
          <button className="btn-active">Sign In</button>
          <button className="btn-inactive" onClick={openSignUp}>
            Sign Up
          </button>
        </div>

        <div className="back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </div>
      </div>

      <div className="login-image">
        <h1>Welcome to</h1>
        <img src={EventImg} alt="Evento EMS" className="top-image" />
        <img src={SuccessImg} alt="Success Factors" className="bottom-image" />
      </div>
    </div>
  );
}
