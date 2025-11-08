import Event from "../Models/event.js";
import User from "../Models/user.js";
import Booking from "../Models/booking.js";
import { sendMail } from "../utils/sendMail.js";

// ✅ BOOK EVENT
export const bookEvent = async (req, res) => {
  try {
    const { eventId, seats } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const totalAmount = event.ticketPrice * seats;

    const newBooking = new Booking({
      userId,
      eventId,
      seatsBooked: seats,
      totalAmount,
    });

    await newBooking.save();

    // ✅ EMAIL CONTENT
    const htmlMessage = `
      <h2>🎟️ Ticket Booking Successful</h2>
      <p>Hi <b>${user.name}</b>, your tickets are successfully booked.</p>

      <h3>Event Details:</h3>
      <p><b>Event:</b> ${event.title}</p>
      <p><b>Description:</b> ${event.description}</p>
      <p><b>Location:</b> ${event.location}</p>
      <p><b>Date:</b> ${new Date(event.eventDate).toLocaleDateString()}</p>

      <h3>Booking Summary:</h3>
      <p><b>Tickets:</b> ${seats}</p>
      <p><b>Price per ticket:</b> ₹${event.ticketPrice}</p>
      <p><b>Total Amount:</b> ₹${totalAmount}</p>

      <br/>
      <p>Thanks for booking with <b>Evento EMS</b> ❤️</p>
    `;

    await sendMail(
      user.email,
      "🎉 Ticket Booking Confirmation",
      "Your booking is confirmed!",
      htmlMessage
    );

    res.status(200).json({
      success: true,
      message: "Booking successful",
      booking: newBooking,
    });

  } catch (error) {
    console.log("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};


// ✅ GET USER BOOKINGS (CALENDAR)
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.id }).populate("eventId");

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.log("Get Bookings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};
