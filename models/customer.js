const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
