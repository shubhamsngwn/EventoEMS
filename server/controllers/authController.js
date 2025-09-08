import bcrypt from "bcrypt";
import User from "../Models/user.js";
import jwt from "jsonwebtoken";

// api 1 :- creating new user into database
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirm_password, category } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      category,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Signup successful", user: newUser, success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed", error });
  }
};

// api 2 :- creating user login
export const login = async (req, res) => {
  const { email, password, category } = req.body;

  if (!email || !password || !category) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const user = await User.findOne({ email, category });

    if (!user) {
      return res.status(404).json({
        message: "User not found or category mismatch",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, category: user.category },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        category: user.category,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// api 3 :- getting user details
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// api 4 :- logout the user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// api 5 :- update your profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    console.log("User ID:", userId);

    const { name, category } = req.body;

    // Check if a file is uploaded
    let profilePicture = null;
    if (req.file) {
      profilePicture = req.file.filename; // stored filename by multer
    }

    // Construct update object
    const updateData = { name, category };
    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res
      .status(200)
      .json({
        message: "Profile updated successfully",
        user: updatedUser,
        success: true,
      });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
