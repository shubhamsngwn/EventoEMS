import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",    // ✅ FIXED
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",   // ✅ FIXED
      required: true,
    },
    seatsBooked: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
