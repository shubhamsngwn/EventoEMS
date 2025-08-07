import React from "react";
import Navbar from "./Navbar";
import EventImg from "../images/logo.png";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function CreateEvent() {
  const [eventDate, setEventDate] = React.useState(null);
  const [eventTime, setEventTime] = React.useState(null);

  return (
    <>
      <Navbar />
      <div className="create-heading">
        <h1>Post an Event</h1>
      </div>
      <div className="crt-main">
        <div className="crt-col1">
          <div className="create-elements">
            {/* Title */}
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />

            {/* Organized By */}
            <TextField
              id="outlined-basic"
              label="Organised By"
              variant="outlined"
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />

            {/* Event Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date"
                value={eventDate}
                onChange={(newValue) => setEventDate(newValue)}
                minDate={dayjs()}
                sx={{ width: "18.75rem", mb: 2 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />

            {/* Event Time */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Event Time"
                value={eventTime}
                onChange={(newValue) => setEventTime(newValue)}
                sx={{ width: "18.75rem", mb: 2 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />

            {/* Location */}
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />

            {/* Ticket Price */}
            <TextField
              id="outlined-basic"
              label="Ticket Price"
              variant="outlined"
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />

            {/* Total Seats */}
            <TextField
              id="outlined-basic"
              label="Total Seats"
              variant="outlined"
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />

            {/* Image Upload */}
            <TextField
              id="outlined-basic"
              label="Image"
              variant="outlined"
              type="file"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "18.75rem", mb: 2 }}
            />
            <br />
          </div>
          <div className="submit-btn">
            <button>Submit</button>
          </div>
        </div>
        <div className="crt-col2">
          <img src={EventImg} alt="#" />
        </div>
      </div>
    </>
  );
}
