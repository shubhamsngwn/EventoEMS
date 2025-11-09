// import Event from "../Models/event.js";
// // API 1: Create Event
// export const createEvent = async (req, res) => {
//   try {
//     const {
//       title,
//       organisedBy,
//       eventDescription,
//       location,
//       ticketPrice,
//       totalSeats,
//     } = req.body;

//     const eventDate = req.body.eventDate;
//     const eventTime = req.body.eventTime;

//     // ✅ File (flyer) handle
//     const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

//     const newEvent = new Event({
//       owner: "admin", // replace with logged-in user's id if available
//       title: title,
//       description: eventDescription,
//       organizedBy: organisedBy,
//       eventDate: eventDate,
//       eventTime: eventTime,
//       location: location,
//       Participants: 0,
//       Count: 0,
//       Income: 0,
//       ticketPrice: ticketPrice,
//       Quantity: totalSeats,
//       image: imagePath,
//       likes: 0,
//       Comment: [],
//     });

//     await newEvent.save();

//     res.status(201).json({
//       success: true,
//       message: "Event created successfully",
//       event: newEvent,
//     });
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create event",
//       error: error.message,
//     });
//   }
// };

// // =========================
// // API 2: Get all events
// // =========================
// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ createdAt: -1 });
//     res.status(200).json({ events, success: true });
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// // =========================
// // API 3: Get event by ID
// // =========================
// export const getEventById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const event = await Event.findById(id);
//     if (!event) {
//       return res
//         .status(404)
//         .json({ message: "Event not found", success: false });
//     }
//     res.status(200).json({ event, success: true });
//   } catch (error) {
//     res.status(404).json({ message: "Event not found", success: false });
//   }
// };

// // =========================
// // API 4: Like Event
// // =========================
// export const likeEvent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const event = await Event.findById(id);
//     if (!event) {
//       return res
//         .status(404)
//         .json({ message: "Event not found", success: false });
//     }
//     event.likes = event.likes ? event.likes + 1 : 1;
//     await event.save();
//     res.status(200).json({ event, success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Error liking event", success: false });
//   }
// };

// // =========================
// // API 5: Order Summary
// // =========================
// export const orderSummary = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const event = await Event.findById(id);
//     if (!event) {
//       return res
//         .status(404)
//         .json({ message: "Event not found", success: false });
//     }
//     res.status(200).json({ event, success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// // =========================
// // API 6: Payment Summary
// // =========================
// export const createPaymentSummary = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const event = await Event.findById(id);
//     if (!event) {
//       return res
//         .status(404)
//         .json({ message: "Event not found", success: false });
//     }

//     const paymentSummary = {
//       totalIncome: event.income,
//       totalTickets: event.quantity,
//       ticketPrice: event.ticketPrice,
//     };

//     res.status(200).json({ paymentSummary, success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// // =========================
// // API 7: Delete Event
// // =========================
// export const deleteEvent = async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const deletedEvent = await Event.findByIdAndDelete(eventId);

//     if (!deletedEvent) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Event not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Event deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error while deleting event",
//     });
//   }
// };

import Event from "../Models/event.js";

// ✅ CREATE EVENT
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

    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newEvent = new Event({
      owner: req.id || "admin",
      title,
      description: eventDescription,
      organizedBy: organisedBy,
      eventDate,
      eventTime,
      location,
      Participants: 0,
      Count: 0,
      Income: 0,
      ticketPrice,
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

// ✅ GET ALL EVENTS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ GET EVENT BY ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(404).json({ success: false, message: "Event not found" });
  }
};

// ✅ LIKE EVENT
export const likeEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    event.likes = (event.likes || 0) + 1;
    await event.save();

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error liking event" });
  }
};

// ✅ ORDER SUMMARY
export const orderSummary = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ PAYMENT SUMMARY
export const createPaymentSummary = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    const paymentSummary = {
      totalIncome: event.Income,
      totalTickets: event.Quantity,
      ticketPrice: event.ticketPrice,
    };

    res.status(200).json({ success: true, paymentSummary });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const updateData = req.body;

    // ✅ If new flyer uploaded
    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

// ✅ DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting event",
    });
  }
};
