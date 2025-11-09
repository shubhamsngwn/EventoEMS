// import bcrypt from "bcrypt";
// import User from "../Models/user.js";
// import jwt from "jsonwebtoken";
// import { sendMail } from "../utils/sendMail.js";

// // api 1 :- creating new user into database
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, confirm_password, category } = req.body;

//     if (password !== confirm_password) {
//       return res.status(400).json({
//         message: "Passwords do not match",
//         success: false,
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User already exists",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       category,
//     });

//     await newUser.save();
//     res
//       .status(201)
//       .json({ message: "Signup successful", user: newUser, success: true });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Signup failed", error });
//   }
// };

// // api 2 :- login user
// export const login = async (req, res) => {
//   const { email, password, category } = req.body;

//   if (!email || !password || !category) {
//     return res
//       .status(400)
//       .json({ message: "All fields are required", success: false });
//   }

//   try {
//     const user = await User.findOne({ email, category });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found or category mismatch",
//         success: false,
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ message: "Invalid credentials", success: false });
//     }

//     // ✅ ✅ ✅ EMAIL SEND HERE AFTER SUCCESSFUL LOGIN
//     await sendMail(
//       user.email,
//       "Login Detected - Event Management System",
//       `Hello ${user.name}, your account was just logged in on EventoEMS.\n\nIf this wasn't you, please reset your password immediately.`
//     );

//     // ✅ JWT Token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email, category: user.category },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//         category: user.category,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // api 3 :- getting user details
// export const getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.id).select("-password");
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.status(200).json({ user, success: true });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// // api 4 :- logout
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token");
//     res.status(200).json({ message: "Logout successful", success: true });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

// // api 5 :- update profile
// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     console.log("User ID:", userId);

//     const { name, category } = req.body;

//     let profilePicture = null;
//     if (req.file) {
//       profilePicture = req.file.filename;
//     }

//     const updateData = { name, category };
//     if (profilePicture) {
//       updateData.profilePicture = profilePicture;
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

import bcrypt from "bcrypt";
import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";

// ✅ Strong Password Rule
// At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ SIGNUP CONTROLLER
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirm_password, category } = req.body;

    // ✅ strong password validation
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    // ✅ confirm password check
    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    // ✅ check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      category,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed", error });
  }
};

// ✅ LOGIN CONTROLLER
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

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // ✅ send email notification after login
    await sendMail(
      user.email,
      "Login Detected - Event Management System",
      `Hello ${user.name}, your account was just logged in on EventoEMS.\n\nIf this wasn't you, please reset your password immediately.`
    );

    // ✅ JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        category: user.category,
      },
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
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET USER DETAILS
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

// ✅ LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// ✅ UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, category } = req.body;

    let profilePicture = null;
    if (req.file) {
      profilePicture = req.file.filename;
    }

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

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
