import { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "../App.css";

function toDateKey(d) {
  const nd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const y = nd.getFullYear();
  const m = String(nd.getMonth() + 1).padStart(2, "0");
  const da = String(nd.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

function toDateKeyFromISO(iso) {
  return toDateKey(new Date(iso));
}

export default function MyApp() {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedMap, setBookedMap] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const t = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/booking/my-bookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          const map = {};

          res.data.bookings.forEach(b => {
            if (!b.eventId) return;
            const key = toDateKeyFromISO(b.eventId.eventDate);

            if (!map[key]) map[key] = [];
            map[key].push(b.eventId.title);
          });

          setBookedMap(map);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token]);

  const bookedSet = useMemo(() => new Set(Object.keys(bookedMap)), [bookedMap]);

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={setDate}
        value={date}
        className="custom-calendar"
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const key = toDateKey(date);
          return bookedSet.has(key) ? "has-event" : "";
        }}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;
          const key = toDateKey(date);
          const titles = bookedMap[key];

          if (!titles) return null;

          return (
            <div
              className="event-dot"
              title={titles.join(", ")}
            />
          );
        }}
      />

      <p className="selected-date">
        Current Date: {currentDate.toDateString()}
      </p>
    </div>
  );
}
