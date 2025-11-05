import express from "express";
import multer from "multer";
import path from "path";
import {
  createEvent,
  getAllEvents,
  getEventById,
  likeEvent,
  orderSummary,
  createPaymentSummary,
  deleteEvent,
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

// ✅ Routes
eventRouter.post("/createEvent", upload.single("flyer"), createEvent);
eventRouter.get("/getAllEvents", getAllEvents);
eventRouter.get("/getEvent/:id", getEventById);
eventRouter.put("/likeEvent/:id", likeEvent);
eventRouter.get("/orderSummary/:id", orderSummary);
eventRouter.get("/paymentSummary/:id", createPaymentSummary);
eventRouter.delete("/deleteEvent/:id", deleteEvent);

export default eventRouter;
