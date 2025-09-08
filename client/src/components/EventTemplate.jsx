import React from "react";
import "../App.css";
import EventImg from "../images/logo.png";

export default function EventTemplate() {
  const event = {
    event_name: "Standup Comedy",
    event_details: {
      event_time: "6:00",
      event_day: "Thursday",
      event_date: "23rd October",
    },
    about_event:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium provident praesentium obcaecati molestias esse dolor optio sapiente eum tenetur hic. Incidunt explicabo tempora quae a natus possimus impedit non sequi!",
    organised_by: "Students-Society",
  };

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
