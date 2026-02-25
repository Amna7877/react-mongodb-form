const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("📦 Data received:", req.body);
    
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password 
    });
    
    await newUser.save();
    
    console.log("✅ User saved with ID:", newUser._id);
    res.status(201).json({ 
      message: "Registration successful!",
      userId: newUser._id 
    });
    
  } catch (error) {
    console.error("❌ Error saving user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;