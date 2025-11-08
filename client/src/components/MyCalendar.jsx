import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "../App.css";

export default function MyApp() {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ Fetch user bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const formatted = res.data.bookings.map((b) => ({
          date: new Date(b.eventId.eventDate).toDateString(),
          title: b.eventId.title,
        }));

        setBookedDates(formatted);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, []);

  // ✅ Live update current date
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Find event for a specific date
  const getEventForDate = (date) => {
    return bookedDates.find((d) => d.date === date.toDateString());
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={setDate}
        value={date}
        className="custom-calendar"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const event = getEventForDate(date);

            if (event) {
              return (
                <div className="event-wrapper">
                  <div className="event-dot"></div>
                  <div className="event-tooltip">{event.title}</div>
                </div>
              );
            }
          }
          return null;
        }}
      />

      <p className="selected-date">Current Date: {currentDate.toDateString()}</p>
    </div>
  );
}
