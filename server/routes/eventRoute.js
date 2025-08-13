import express from "express";
import { createEvent, createPaymentSummary, getAllEvents, getEventById, likeEvent, orderSummary } from "../controllers/eventController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const eventRouter = express.Router();

eventRouter.post("/createEvent", isAuthenticated, createEvent);
eventRouter.get("/getAllEvents", isAuthenticated, getAllEvents);
eventRouter.get("/getEvent/:id", isAuthenticated, getEventById);
eventRouter.post("/likeEvent/:id", isAuthenticated, likeEvent); // checked successfully

eventRouter.get("/orderSummary/:id", isAuthenticated, orderSummary);
eventRouter.get("/getEventById/:id", isAuthenticated, createPaymentSummary);

export default eventRouter;