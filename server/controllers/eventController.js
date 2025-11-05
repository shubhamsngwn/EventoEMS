import Event from "../Models/event.js";
// API 1: Create Event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      organisedBy,
      eventDescription,
      location,
      ticketPrice,
      totalSeats,
    } = req.body;

    const eventDate = req.body.eventDate;
    const eventTime = req.body.eventTime;

    // ✅ File (flyer) handle
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newEvent = new Event({
      owner: "admin", // replace with logged-in user's id if available
      title: title,
      description: eventDescription,
      organizedBy: organisedBy,
      eventDate: eventDate,
      eventTime: eventTime,
      location: location,
      Participants: 0,
      Count: 0,
      Income: 0,
      ticketPrice: ticketPrice,
      Quantity: totalSeats,
      image: imagePath,
      likes: 0,
      Comment: [],
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// =========================
// API 2: Get all events
// =========================
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ events, success: true });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// =========================
// API 3: Get event by ID
// =========================
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }
    res.status(200).json({ event, success: true });
  } catch (error) {
    res.status(404).json({ message: "Event not found", success: false });
  }
};

// =========================
// API 4: Like Event
// =========================
export const likeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }
    event.likes = event.likes ? event.likes + 1 : 1;
    await event.save();
    res.status(200).json({ event, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error liking event", success: false });
  }
};

// =========================
// API 5: Order Summary
// =========================
export const orderSummary = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }
    res.status(200).json({ event, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// =========================
// API 6: Payment Summary
// =========================
export const createPaymentSummary = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    const paymentSummary = {
      totalIncome: event.income,
      totalTickets: event.quantity,
      ticketPrice: event.ticketPrice,
    };

    res.status(200).json({ paymentSummary, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// =========================
// API 7: Delete Event
// =========================
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting event",
    });
  }
};
