import express from "express";
import multer from "multer";
import path from "path";
import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
  likeEvent,
  orderSummary,
  createPaymentSummary,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

const eventRouter = express.Router();

// ✅ Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ CREATE EVENT (Organizer only)
eventRouter.post(
  "/createEvent",
  upload.single("flyer"),
  isAuthenticated,
  createEvent
);

// ✅ GET ALL EVENTS
eventRouter.get("/getAllEvents", getAllEvents);

// ✅ GET EVENT BY ID
eventRouter.get("/getEvent/:id", getEventById);

// ✅ LIKE EVENT
eventRouter.put("/likeEvent/:id", likeEvent);

// ✅ ORDER SUMMARY
eventRouter.get("/orderSummary/:id", orderSummary);

// ✅ PAYMENT SUMMARY
eventRouter.get("/paymentSummary/:id", createPaymentSummary);

// ✅ UPDATE EVENT (Organizer only)
eventRouter.put(
  "/updateEvent/:id",
  upload.single("flyer"),
  isAuthenticated,
  updateEvent
);

// ✅ DELETE EVENT (Organizer only)
eventRouter.delete("/deleteEvent/:id", isAuthenticated, deleteEvent);

export default eventRouter;
