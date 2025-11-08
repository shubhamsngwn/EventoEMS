import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    seatsBooked: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
