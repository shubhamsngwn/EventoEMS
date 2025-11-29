import React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import CreateEventNavbar from "./CreateEventNavbar";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = React.useState({
    title: "",
    organisedBy: "",
    eventType: "",
    location: "",
    eventDescription: "",
    eventGoal: "",
    contactInfo: "",
    totalSeats: "",
    ticketPrice: "",
    caption: "",
    flyer: "",
  });

  const [eventDate, setEventDate] = React.useState(null);
  const [eventTime, setEventTime] = React.useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEventData({
      ...eventData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Get JWT token

      if (!token) {
        alert("You must be logged in to create an event!");
        return;
      }

      const formData = new FormData();

      // Append all event fields
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (eventDate)
        formData.append("eventDate", eventDate.format("YYYY-MM-DD"));

      if (eventTime) formData.append("eventTime", eventTime.format("HH:mm"));

      // Send request with Authorization header
      const res = await fetch("http://localhost:5000/api/event/createEvent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 Token added here
        },
        body: formData, // DO NOT manually set Content-Type
      });

      const data = await res.json();

      if (data.success) {
        alert("Event created successfully!");
        navigate("/");
      } else {
        alert("Failed to create event: " + (data.message || ""));
      }
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <CreateEventNavbar />

      <div className="create-event-wrapper">
        <div className="create-event-card">
          <h1 className="form-title">Create Event</h1>

          <form onSubmit={handleSubmit} className="form-content">
            {/* SECTION: BASIC INFO */}
            <h2 className="form-section-title">Basic Information</h2>

            <TextField
              name="title"
              label="Event Title"
              variant="outlined"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date"
                value={eventDate}
                onChange={(newValue) => setEventDate(newValue)}
                minDate={dayjs()}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "blue" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" },
                  },
                }}
                required
              />
            </LocalizationProvider>

            <TextField
              name="organisedBy"
              label="Organised By"
              variant="outlined"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Event Time"
                value={eventTime}
                onChange={(newValue) => setEventTime(newValue)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "blue" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" },
                  },
                }}
                required
              />
            </LocalizationProvider>

            <TextField
              name="eventType"
              label="Event Type"
              multiline
              rows={4}
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <TextField
              name="location"
              label="Location"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <TextField
              name="eventDescription"
              label="Event Description"
              multiline
              rows={4}
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <TextField
              name="eventGoal"
              label="Event Goal"
              multiline
              rows={4}
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <TextField
              name="contactInfo"
              label="Contact Information"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            {/* SECTION: TICKET DETAILS */}
            <h2 className="form-section-title">Ticket Details</h2>

            <TextField
              name="totalSeats"
              label="Total Seats"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <TextField
              name="ticketPrice"
              label="Ticket Price"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            {/* SECTION: PROMOTION */}
            <h2 className="form-section-title">Promotion</h2>

            <TextField
              name="flyer"
              label="Event Flyer"
              type="file"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <TextField
              name="caption"
              label="Caption"
              variant="outlined"
              onChange={handleChange}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "blue" },
                  "&:hover fieldset": { borderColor: "blue" },
                  "&.Mui-focused fieldset": { borderColor: "blue" },
                },
              }}
              required
            />

            <div className="submit-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
