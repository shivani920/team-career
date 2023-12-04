const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");
const app = express();
const authRoutes = require("./routes/auth");

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect("mongodb://127.0.0.1:27017/team-career-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
// Add this line to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware for session management
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/auth", authRoutes);
// Basic User Schema
const User = mongoose.model("User", {
  username: String,
  password: String,
});

// Routes
const Batch = require("./models/Batch");
const Student = require("./models/Student");
const Result = require("./models/Result");
const Interview = require("./models/Interview");

// Routes
const interviewRoutes = require("./routes/interviews");

app.use("/interviews", interviewRoutes);

//Batch

const BatchRoutes = require("./routes/batch");

app.use("/batches", BatchRoutes);

// Import result routes
const resultRoutes = require("./routes/results");

app.use("/results", resultRoutes);

//student
const studentRoutes = require("./routes/students");

// Use student routes
app.use("/students", studentRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
