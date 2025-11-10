import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "./Navbar";

export default function Wallet() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/booking/my-bookings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setTickets(res.data.bookings);
        }
      } catch (err) {
        console.log("Wallet Error:", err);
      }
    };

    fetchWalletData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="wallet-page">
        <h1 className="wallet-title">My Tickets</h1>

        {tickets.length === 0 ? (
          <p className="no-tickets">You have no booked tickets.</p>
        ) : (
          tickets.map((ticket) => {
            if (!ticket.eventId) return null;

            return (
              <div key={ticket._id} className="ticket-card">
                <div className="qr-box">
                  <QRCodeSVG
                    value={`ticket-${ticket._id}-${ticket.eventId.title}`}
                    size={130}
                  />
                  <p className="qr-label">Scan for ticket verification</p>
                </div>

                <div className="ticket-details">
                  <h2>{ticket.eventId.title}</h2>
                  <p>{ticket.eventId.description}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(ticket.eventId.eventDate).toDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {ticket.eventId.location}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{ticket.eventId.ticketPrice}
                  </p>
                  <p>
                    <strong>Seats:</strong> {ticket.seatsBooked}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
