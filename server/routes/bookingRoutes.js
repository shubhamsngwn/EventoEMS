import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { bookEvent, getUserBookings } from "../controllers/bookingController.js";

const router = express.Router();

// ✅ Book an event
router.post("/book", isAuthenticated, bookEvent);

// ✅ Fetch user's booked events  (for calendar)
router.get("/my-bookings", isAuthenticated, getUserBookings);

export default router;
