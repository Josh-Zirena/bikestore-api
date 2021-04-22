const express = require("express");
const mongoose = require("mongoose");
const inventoryModel = require("../models/inventory");

const app = express();

app.get("/inventory", async (req, res) => {
  const inventory = await inventoryModel.find({});

  try {
    res.send(inventory);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/inventory/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const inventory = await inventoryModel.findById(req.params.id);
    try {
      res.send(inventory);
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

app.put("/inventory/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      await inventoryModel.findByIdAndUpdate(req.params.id, req.body);
      res.send(req.body);
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

app.post("/inventory", async (req, res) => {
  const inventory = new inventoryModel(req.body);

  try {
    await inventory.save();
    res.send(inventory);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/inventory/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      const inventory = await inventoryModel.findByIdAndDelete(req.params.id);

      if (!inventory) res.status(404).send("no items found");
      res.status(200).send({ deleted: 1 });
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

module.exports = app;
