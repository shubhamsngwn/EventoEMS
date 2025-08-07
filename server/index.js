const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 5000;

const EmployeeModel = require("./models/Employee");

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/eventoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/**
 * SIGNUP ROUTE
 */
app.post("/signup", async (req, res) => {
  try {
    const { category, name, email, password, confirm_password } = req.body;

    if (!category || !name || !email || !password || !confirm_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new EmployeeModel({
      category,
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});

/**
 * LOGIN ROUTE
 */
app.post("/login", async (req, res) => {
  const { email, password, category } = req.body;

  if (!email || !password || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await EmployeeModel.findOne({ email, category });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or role mismatch" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        category: user.category,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
