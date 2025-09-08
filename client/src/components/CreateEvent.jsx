import React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import CreateEventNavbar from "./CreateEventNavbar";
import "../App.css";

export default function CreateEvent() {
  const [eventDate, setEventDate] = React.useState(null);
  const [eventTime, setEventTime] = React.useState(null);

  return (
    <>
      <CreateEventNavbar />
      <div className="create-event-parent">
        <div className="create-heading">
          <h1>Basic Information:</h1>
        </div>
        <div className="crt-main">
          <div className="crt-col1">
            <div className="create-elements1">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{
                  width: "20.75rem",
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
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
                      "& fieldset": {
                        borderColor: "blue",
                      },
                      "&:hover fieldset": {
                        borderColor: "blue",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "blue",
                      },
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  required
                />
              </LocalizationProvider>
              <br />
            </div>

            <div className="create-elements2">
              <TextField
                id="outlined-basic"
                label="Organised By"
                variant="outlined"
                sx={{
                  width: "20.75rem",
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Event Time"
                  value={eventTime}
                  onChange={(newValue) => setEventTime(newValue)}
                  sx={{
                    width: "15.75rem",
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "blue",
                      },
                      "&:hover fieldset": {
                        borderColor: "blue",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "blue",
                      },
                    },
                  }}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br />
            </div>

            <div>
              <TextField
                id="outlined-multiline-static"
                label="Event Type"
                multiline
                rows={4}
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
            </div>

            <div>
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
            </div>

            <div>
              <TextField
                id="outlined-multiline-static"
                label="Event Description"
                multiline
                rows={4}
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
            </div>

            <div>
              <TextField
                id="outlined-multiline-static"
                label="Event Goal"
                multiline
                rows={4}
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
            </div>

            <TextField
              id="outlined-basic"
              label="Contact Info"
              variant="outlined"
              sx={{
                width: "100%",
                mb: 3.5,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "blue",
                  },
                  "&:hover fieldset": {
                    borderColor: "blue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
              }}
              required
            />
            <br />

            <div className="ticket-details">
              <h2>Ticket Details:</h2>
            </div>

            <div>
              <TextField
                id="outlined-basic"
                label="Total Seats"
                variant="outlined"
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Ticket Price"
                variant="outlined"
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
            </div>

            <div className="promotion-details">
              <h2>Promotion Details</h2>
            </div>

            <div>
              <TextField
                id="outlined-basic"
                label="Main Event Flyer"
                variant="outlined"
                type="file"
                InputLabelProps={{ shrink: true }}
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Caption"
                variant="outlined"
                sx={{
                  width: "100%",
                  mb: 3.5,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
                required
              />
              <br />
            </div>

            <div className="submit-btn">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
