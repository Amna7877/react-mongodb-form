const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("Data received:", req.body);
    
    const newUser = new User(req.body);
    await newUser.save();
    
    console.log("User saved!");
    res.status(201).json({ message: "Data saved successfully" });
    
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;