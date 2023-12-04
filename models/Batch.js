const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: String,
  // Add any other batch-related fields
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
