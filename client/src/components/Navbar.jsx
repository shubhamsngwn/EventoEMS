import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faWallet,
  faQuestionCircle,
  faCalendarAlt,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";   // ✅ Toast added
import EventImg from "../images/logo.png";
import "../App.css";
import Avatar from "./UserAvatar";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");
  const category = localStorage.getItem("userCategory");
  const email = localStorage.getItem("userEmail");

  // Protected click wrapper
  const requireLogin = (callback) => {
    if (!token) {
      toast.error("First sign in to use this feature");
      return;
    }
    callback();
  };

  const openLoginPage = () => navigate("/login");

  const openCreateEvent = () =>
    requireLogin(() => navigate("/createevent"));

  const handleMainPage = () => navigate("/");

  const openCalendar = () => navigate("/calendar");

  const openWallet = () =>
    requireLogin(() => navigate("/wallet"));

  const openCenter = () =>
    requireLogin(() => toast.info("Center opened (demo)"));

  return (
    <>
      <div className="main">
        <div className="img">
          <img src={EventImg} alt="#" onClick={handleMainPage} />
        </div>

        <div className="search-bar-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        {/* ✅ Create Event only visible for organizer */}
        {category !== "attendee" && (
          <div
            className="create-event flex flex-col items-center text-blue-600 font-semibold cursor-pointer hover:text-blue-700 ml-6 w-20 text-center"
            onClick={openCreateEvent}
          >
            <FontAwesomeIcon icon={faPlus} className="mb-1 text-xl" />
            <p className="text-sm">Create Event</p>
          </div>
        )}

        <div className="icon-menu">

          {/* ✅ Wallet Protected */}
          <div className="icon-item" onClick={openWallet}>
            <FontAwesomeIcon icon={faWallet} className="menu-icon" />
            <span>Wallet</span>
          </div>

          {/* ✅ Center Protected */}
          <div className="icon-item" onClick={openCenter}>
            <FontAwesomeIcon icon={faQuestionCircle} className="menu-icon" />
            <span>Center</span>
          </div>

          {/* ✅ Calendar always free */}
          <div className="icon-item" onClick={openCalendar}>
            <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
            <span>Calendar</span>
          </div>
        </div>

        <div className="notification-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>

        {category && email ? (
          <Avatar />
        ) : (
          <div className="sign-in">
            <button onClick={openLoginPage}>Sign in</button>
          </div>
        )}
      </div>
    </>
  );
}
