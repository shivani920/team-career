// routes/batch.js
const express = require("express");
const router = express.Router(); // Create a router instance

const Batch = require("../models/Batch");

// List all batches
router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.render("batches", { batches });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Form to add a new batch
router.get("/add", (req, res) => {
  res.render("add-batch");
});

// Add a new batch
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new batch in the database
    const newBatch = new Batch({ name });
    await newBatch.save();

    res.redirect("/batches");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// View details of a specific batch
router.get("/:id", async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    res.render("batch-details", { batch });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router; // Export the router
