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
import EventImg from "../images/logo.png";
import "../App.css";
import Main from "./Main";

export default function Navbar() {
  const navigate = useNavigate();
  const openLoginPage = () => {
    navigate("/login");
  };

  const openCreateEvent = () => {
    navigate("/createevent");
  };

  const handleMainPage = () => {
    navigate("/");
  };

  const openCalendar = () => {
    navigate("/calendar");
  };

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

        <div
          className="create-event flex flex-col items-center text-blue-600 font-semibold cursor-pointer hover:text-blue-700 ml-6 w-20 text-center"
          onClick={openCreateEvent}
        >
          <FontAwesomeIcon icon={faPlus} className="mb-1 text-xl" />
          <p className="text-sm">Create Event</p>
        </div>

        <div className="icon-menu">
          <div className="icon-item">
            <FontAwesomeIcon icon={faWallet} className="menu-icon" />
            <span>Wallet</span>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faQuestionCircle} className="menu-icon" />
            <span>Center</span>
          </div>
          <div className="icon-item" onClick={openCalendar}>
            <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
            <span>Calendar</span>
          </div>
        </div>

        <div className="notification-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className="sign-in">
          <button onClick={openLoginPage}>Sign in</button>
        </div>
      </div>
    </>
  );
}
