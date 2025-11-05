import React from "react";
import "../App.css";
import EventImg from "../images/logo.png";

export default function EventTemplate() {

  return (
    <>
      <div className="event-parent">
        <div className="event-img">
          <img src={EventImg} alt="" />
        </div>
        <div className="event-name">
          {event.event_name}
        </div>
        <div className="event-details">
          <span>{event.event_details.event_day}  </span>
          <span>{event.event_details.event_date}  </span>
          <span>{event.event_details.event_time}</span>
        </div>
        <div className="about-event">
          {event.about_event}
        </div>
        <div className="event-organised-by">
          Organised By: {event.organised_by}
        </div>
        <div className="event-book">
          <button>Book Ticket →</button>
        </div>
      </div>
    </>
  );
}
