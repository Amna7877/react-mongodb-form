const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// User route
app.use("/api/users", require("./routes/userRoutes"));

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected!");
    app.listen(5000, () => {
      console.log("✅ Server running on http://localhost:5000");
    });
  })
  .catch(err => {
    console.log("❌ MongoDB connection error:", err.message);
  });