import express from "express";
import { getUserDetails, login, logout, signup, updateProfile } from "../controllers/authController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/getUser", isAuthenticated,getUserDetails);
authRouter.put("/logout", isAuthenticated, logout);
authRouter.post("/updateProfile",isAuthenticated,upload.single("profilePicture"), updateProfile);

export default authRouter;
