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

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEventData({
      ...eventData,
      [name]: files ? files[0] : value, // store actual file, not file name
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // append all event data to formData
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (eventDate)
        formData.append("eventDate", eventDate.format("YYYY-MM-DD"));
      if (eventTime) formData.append("eventTime", eventTime.format("HH:mm"));

      // ✅ Corrected API endpoint
      const res = await fetch("http://localhost:5000/api/event/createEvent", {
        method: "POST",
        body: formData,
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
      <div className="create-event-parent">
        <div className="create-heading">
          <h1>Basic Information:</h1>
        </div>
        <div className="crt-main">
          <div className="crt-col1">
            <form onSubmit={handleSubmit}>
              <TextField
                name="title"
                label="Title"
                variant="outlined"
                onChange={handleChange}
                sx={{
                  width: "20.75rem",
                  mb: 2,
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
                    width: "15.75rem",
                    mb: 2,
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
                  width: "20.75rem",
                  mb: 2,
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
                    width: "15.75rem",
                    mb: 2,
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
                  mb: 3.5,
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
                  mb: 3.5,
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
                  mb: 3.5,
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
                  mb: 3.5,
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
                label="Contact Info"
                onChange={handleChange}
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "blue" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" },
                  },
                }}
                required
              />

              <h2>Ticket Details:</h2>

              <TextField
                name="totalSeats"
                label="Total Seats"
                onChange={handleChange}
                sx={{
                  width: "100%",
                  mb: 3.5,
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
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "blue" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "blue" },
                  },
                }}
                required
              />

              <h2>Promotion Details</h2>

              <TextField
                name="flyer"
                label="Main Event Flyer"
                variant="outlined"
                type="file"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  mb: 3.5,
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
                onChange={handleChange}
                sx={{
                  width: "100%",
                  mb: 3.5,
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
      </div>
    </>
  );
}
