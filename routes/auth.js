// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
//const User = require("../models/User");

const router = express.Router();

// Basic User Schema

// Home
router.get("/", (req, res) => {
  res.render("login");
});

// Sign Up
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect("/login"); // Redirect to the login page after successful signup
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      // User found, implement your login logic here (e.g., create a session)
      res.send("Login successful!");
    } else {
      res.send("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Dashboard (Example authenticated route)
router.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.send("Welcome to the Dashboard!");
  } else {
    res.redirect("/login");
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
