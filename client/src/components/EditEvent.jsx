// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function EditEvent() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//     eventDate: "",
//     ticketPrice: "",
//     Quantity: "",
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/event/getEvent/${id}`).then((res) => {
//       if (res.data.success) {
//         setForm(res.data.event);
//       }
//     });
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/event/updateEvent/${id}`,
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data.success) {
//         alert("Event updated successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       console.log("Update error:", error);
//       alert("Failed to update event");
//     }
//   };

//   return (
//     <div className="edit-event-container">
//       <h2>Edit Event</h2>

//       <input
//         type="text"
//         placeholder="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       <textarea
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       <input
//         type="date"
//         value={form.eventDate?.slice(0, 10)}
//         onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
//       />

//       <input
//         type="text"
//         placeholder="Location"
//         value={form.location}
//         onChange={(e) => setForm({ ...form, location: e.target.value })}
//       />

//       <input
//         type="number"
//         placeholder="Ticket Price"
//         value={form.ticketPrice}
//         onChange={(e) => setForm({ ...form, ticketPrice: e.target.value })}
//       />

//       <input
//         type="number"
//         placeholder="Quantity"
//         value={form.Quantity}
//         onChange={(e) => setForm({ ...form, Quantity: e.target.value })}
//       />

//       <button onClick={handleUpdate}>Update Event</button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    ticketPrice: "",
    Quantity: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/event/getEvent/${id}`).then((res) => {
      if (res.data.success) {
        setForm(res.data.event);
      }
    });
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/event/updateEvent/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("Event updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update event");
    }
  };

  return (
    <>
      <Navbar />
      <div className="editEventWrapper">
      <div className="editEventCard">
        <h2>Edit Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          value={form.eventDate?.slice(0, 10)}
          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="number"
          placeholder="Ticket Price"
          value={form.ticketPrice}
          onChange={(e) => setForm({ ...form, ticketPrice: e.target.value })}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.Quantity}
          onChange={(e) => setForm({ ...form, Quantity: e.target.value })}
        />

        <button className="updateBtn" onClick={handleUpdate}>
          Update Event
        </button>
      </div>
    </div>
    </>
  );
}
