import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["organizer", "attendee"],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  }
},{timestamps: true});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
