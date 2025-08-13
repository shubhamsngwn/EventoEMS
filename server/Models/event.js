import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizedBy: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  Participants: {
    type: Number,
    required: true,
  },
  Count: {
    type: Number,
    required: true,
  },
  Income: {
    type: Number,
  },
  ticketPrice: {
    type: Number,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  Comment: {
    type: [String],
  },
}, {timestamps: true});

const Event = mongoose.model("Event", EventSchema);
export default Event;
