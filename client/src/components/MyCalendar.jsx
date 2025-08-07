import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../App.css";

export default function MyApp() {
  const [date, setDate] = useState(new Date()); // selected date
  const [currentDate, setCurrentDate] = useState(new Date()); // today's date

  useEffect(() => {
    // Update current date every minute (in case date changes at midnight)
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="calendar-wrapper">
      <Calendar onChange={setDate} value={date} className="custom-calendar" />
      <p className="selected-date">
        Current Date: {currentDate.toDateString()}
      </p>
    </div>
  );
}
