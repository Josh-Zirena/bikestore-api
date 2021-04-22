const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  SKU: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
  numberOfItems: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["bicycles", "parts", "accessories"],
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
