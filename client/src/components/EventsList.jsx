// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../App.css";

// export default function EventsList() {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [tickets, setTickets] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [eligibleEvents, setEligibleEvents] = useState({});

//   const userRole = localStorage.getItem("userCategory");
//   const token = localStorage.getItem("token");

//   // ✅ Fetch all events
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/event/getAllEvents")
//       .then((res) => {
//         if (res.data.success) setEvents(res.data.events);
//       })
//       .catch((err) => console.error("Error fetching events:", err));
//   }, []);

//   // ✅ Check eligibility for certificate
//   useEffect(() => {
//     if (!token || userRole !== "attendee") return;

//     const fetchEligibility = async () => {
//       for (let event of events) {
//         try {
//           const res = await axios.get(
//             `http://localhost:5000/api/certificate/status/${event._id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           setEligibleEvents((prev) => ({
//             ...prev,
//             [event._id]: res.data.eligible,
//           }));
//         } catch (err) {
//           console.error("Eligibility check failed", err);
//         }
//       }
//     };

//     if (events.length > 0) fetchEligibility();
//   }, [events, token, userRole]);

//   // ✅ Book Now
//   const handleBookNow = (event) => {
//     setSelectedEvent(event);
//     setTickets(1);
//     setShowModal(true);
//   };

//   // ✅ Confirm booking
//   const handleConfirmBooking = async () => {
//     try {
//       if (!token) {
//         alert("You must be logged in to book tickets!");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/booking/book",
//         {
//           eventId: selectedEvent._id,
//           seats: tickets,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         alert("✅ Booking Successful! Check your email for confirmation.");
//         setShowModal(false);
//       } else {
//         alert("Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert("Booking failed, please try again.");
//     }
//   };

//   // ✅ Delete event
//   const handleDeleteEvent = async (eventId) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         const res = await axios.delete(
//           `http://localhost:5000/api/event/deleteEvent/${eventId}`
//         );
//         if (res.data.success) {
//           alert("Event deleted successfully!");
//           setEvents(events.filter((e) => e._id !== eventId));
//         }
//       } catch (err) {
//         console.error("Error deleting event:", err);
//         alert("Failed to delete event.");
//       }
//     }
//   };

//   return (
//     <div className="events-container">
//       <h1>Upcoming Events</h1>

//       <div className="events-grid">
//         {events.map((e) => (
//           <div key={e._id} className="event-card">
//             <img
//               src={`http://localhost:5000/${e.image}`}
//               alt={e.title}
//               className="event-image"
//             />

//             <h3>{e.title}</h3>
//             <p>{e.description}</p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(e.eventDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Location:</strong> {e.location}
//             </p>
//             <p>
//               <strong>Ticket Price:</strong> ₹{e.ticketPrice}
//             </p>

//             {/* ✅ Attendee Buttons */}
//             {userRole === "attendee" ? (
//               <div className="event-buttons">
//                 <button className="book-btn" onClick={() => handleBookNow(e)}>
//                   Book Now
//                 </button>

//                 {/* ✅ Certificate Button (FINAL VERSION) */}
//                 <button
//                   className={`cert-btn ${
//                     eligibleEvents[e._id] ? "active" : "disabled"
//                   }`}
//                   disabled={!eligibleEvents[e._id]}
//                   onClick={() => {
//                     if (!eligibleEvents[e._id]) return;

//                     const token = localStorage.getItem("token");

//                     window.location.href = `http://localhost:5000/api/certificate/generate/${e._id}?token=${token}`;
//                   }}
//                 >
//                   {eligibleEvents[e._id]
//                     ? "Download Certificate"
//                     : "Certificate Not Available"}
//                 </button>
//               </div>
//             ) : null}

//             {/* ✅ Organizer Buttons */}
//             {userRole === "organizer" ? (
//               <div className="event-buttons">
//                 <button className="edit-btn">Edit Now</button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDeleteEvent(e._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         ))}
//       </div>

//       {/* ✅ Booking Modal */}
//       {showModal && selectedEvent && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>{selectedEvent.title}</h2>
//             <p>Ticket Price: ₹{selectedEvent.ticketPrice}</p>

//             <label>Number of Tickets:</label>
//             <input
//               type="number"
//               min="1"
//               max={selectedEvent.Quantity || 10}
//               value={tickets}
//               onChange={(e) => setTickets(Number(e.target.value))}
//             />

//             <p>
//               <strong>Total Amount:</strong> ₹
//               {selectedEvent.ticketPrice * tickets}
//             </p>

//             <button onClick={handleConfirmBooking}>Confirm Booking</button>
//             <button onClick={() => setShowModal(false)} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [eligibleEvents, setEligibleEvents] = useState({});

  const navigate = useNavigate();

  const userRole = localStorage.getItem("userCategory");
  const token = localStorage.getItem("token");

  // ✅ Fetch all events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event/getAllEvents")
      .then((res) => {
        if (res.data.success) setEvents(res.data.events);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // ✅ Check eligibility for certificate
  useEffect(() => {
    if (!token || userRole !== "attendee") return;

    const fetchEligibility = async () => {
      for (let event of events) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/certificate/status/${event._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setEligibleEvents((prev) => ({
            ...prev,
            [event._id]: res.data.eligible,
          }));
        } catch (err) {
          console.error("Eligibility check failed", err);
        }
      }
    };

    if (events.length > 0) fetchEligibility();
  }, [events, token, userRole]);

  // ✅ Book Now
  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setTickets(1);
    setShowModal(true);
  };

  // ✅ Confirm booking
  const handleConfirmBooking = async () => {
    try {
      if (!token) {
        alert("You must be logged in to book tickets!");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/booking/book",
        {
          eventId: selectedEvent._id,
          seats: tickets,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("✅ Booking Successful! Check your email for confirmation.");
        setShowModal(false);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed, please try again.");
    }
  };

  // ✅ Delete event
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:5000/api/event/deleteEvent/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Event deleted successfully!");
        setEvents(events.filter((e) => e._id !== eventId));
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };

  // ✅ Edit Event (Navigate to edit page)
  const handleEditEvent = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>

      <div className="events-grid">
        {events.map((e) => (
          <div key={e._id} className="event-card">
            <img
              src={`http://localhost:5000/${e.image}`}
              alt={e.title}
              className="event-image"
            />

            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(e.eventDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {e.location}
            </p>
            <p>
              <strong>Ticket Price:</strong> ₹{e.ticketPrice}
            </p>

            {/* ✅ Attendee Buttons */}
            {userRole === "attendee" ? (
              <div className="event-buttons">
                <button className="book-btn" onClick={() => handleBookNow(e)}>
                  Book Now
                </button>

                <button
                  className={`cert-btn ${
                    eligibleEvents[e._id] ? "active" : "disabled"
                  }`}
                  disabled={!eligibleEvents[e._id]}
                  onClick={() => {
                    if (!eligibleEvents[e._id]) return;
                    window.location.href = `http://localhost:5000/api/certificate/generate/${e._id}?token=${token}`;
                  }}
                >
                  {eligibleEvents[e._id]
                    ? "Download Certificate"
                    : "Certificate Not Available"}
                </button>
              </div>
            ) : null}

            {/* ✅ Organizer Buttons */}
            {userRole === "organizer" ? (
              <div className="event-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEditEvent(e._id)}
                >
                  Edit Now
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteEvent(e._id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* ✅ Booking Modal */}
      {showModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p>Ticket Price: ₹{selectedEvent.ticketPrice}</p>

            <label>Number of Tickets:</label>
            <input
              type="number"
              min="1"
              max={selectedEvent.Quantity || 10}
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
            />

            <p>
              <strong>Total Amount:</strong> ₹
              {selectedEvent.ticketPrice * tickets}
            </p>

            <button onClick={handleConfirmBooking}>Confirm Booking</button>
            <button onClick={() => setShowModal(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
