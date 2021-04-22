const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema({
  customerNumber: {
    type: Number,
    required: true,
  },
  customerRepairNotes: {
    type: String,
    required: true,
    trim: true,
  },
  bikeSKU: {
    type: Number,
    required: true,
    trim: true,
  },
  repairStatus: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["not started", "in progress", "completed"],
  },
});

const Repairs = mongoose.model("Repairs", RepairSchema);

module.exports = Repairs;
