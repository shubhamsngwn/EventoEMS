import React from "react";
import MainImg from "../images/Hero1.jpg";
import Navbar from "./Navbar";
import EventsList from "./EventsList"; // ← Add this import

export default function Main() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="main-image">
          <img src={MainImg} alt="Hero" />
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="events-section">
        <EventsList />
      </div>
    </>
  );
}
