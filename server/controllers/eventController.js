// import mongoose from "mongoose";

// const EventSchema = new mongoose.Schema({
//   owner: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   organizedBy: {
//     type: String,
//     required: true,
//   },
//   eventDate: {
//     type: Date,
//     required: true,
//   },
//   eventTime: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   Participants: {
//     type: Number,
//     required: true,
//   },
//   Count: {
//     type: Number,
//     required: true,
//   },
//   Income: {
//     type: Number,
//   },
//   ticketPrice: {
//     type: Number,
//   },
//   Quantity: {//no of seats
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   likes: {
//     type: Number,
//   },
//   Comment: {
//     type: [String],
//   },
// }, {timestamps: true});

// const Event = mongoose.model("Event", EventSchema);
// export default Event;
import Event from "../Models/event.js";

//  api 1:- create event
export const createEvent = async (req, res) => {
  try {
    const {
      owner,
      title,
      description,
      organizedBy,
      eventDate,
      eventTime,
      location,
      Participants,
      Count,
      Income,
      ticketPrice,
      Quantity,
      image,
      likes,
      Comment,
    } = req.body;

    const newEvent = new Event({
      owner,
      title,
      description,
      organizedBy,
      eventDate,
      eventTime,
      location,
      Participants,
      Count,
      Income,
      ticketPrice,
      Quantity,
      image,
      likes,
      Comment,
    });

    await newEvent.save();
    res
      .status(201)
      .json({
        message: "Event created successfully",
        event: newEvent,
        success: true,
      });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// api 2 :- get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events, success: true });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


// api 3 :- get event by id
export const getEventById = async (req, res) => {
    const {id} = req.params;
    try{
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({ message: "Event not found", success: false });
        }
        res.status(200).json({ event, success: true });
    }catch{
        res.status(404).json({ message: "Event not found", success: false });
    }
};

// api 4 :- like an event
export const likeEvent = async (req, res) => {
    const {id} = req.params;
    try{
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({ message: "Event not found", success: false });
        }
        event.likes = event.likes ? event.likes + 1 : 1;
        await event.save();
        res.status(200).json({ event, success: true });
    }catch{
        res.status(404).json({ message: "Event not found", success: false });
    }
};


// api 5 :- order summary of create event
export const orderSummary = async (req, res) => {
    const {id} = req.params;
    try{
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({ message: "Event not found", success: false });
        }
        res.status(200).json({ event, success: true });
    }catch{
        res.status(404).json({ message: "Event not found", success: false });
    }
};

// api 6 :- get the payment summary
export const createPaymentSummary = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false });
        }
        // Calculate payment summary
        const paymentSummary = {
            totalIncome: event.Income,
            totalTickets: event.Quantity,
            ticketPrice: event.ticketPrice,
        };
        res.status(200).json({ paymentSummary, success: true });
    } catch {
        res.status(404).json({ message: "Event not found", success: false });
    }
};
