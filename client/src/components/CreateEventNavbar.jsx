import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventImg from "../images/logo.png";
import "../App.css";
import Avatar from "react-avatar";

export default function CreateEventNavbar() {
  const navigate = useNavigate();

  const category = localStorage.getItem("userCategory");
  const email = localStorage.getItem("userEmail");

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const openLoginPage = () => {
    navigate("/signup");
  };

  const handleMainPage = () => {
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/dashboard");   // apne dashboard route ke hisaab se change kar lena
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Close dropdown by clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className="create-event-nav-main">

        {/* Logo */}
        <div className="create-event-nav-img">
          <img src={EventImg} alt="logo" onClick={handleMainPage} />
        </div>

        {/* Right Side */}
        <div className="create-event-signin" ref={dropdownRef}>

          {category && email ? (
            <>
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  name={email}
                  size="42"
                  round
                  color="#4b7bec"
                  fgColor="#fff"
                  style={{ marginRight: "15px" }}
                />
              </div>

              {openDropdown && (
                <div className="profile-dropdown">
                  <p onClick={goToDashboard}>Personal Dashboard</p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </>
          ) : (
            <div className="create-event-sign-in-btn">
              <button onClick={openLoginPage}>Sign in</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
