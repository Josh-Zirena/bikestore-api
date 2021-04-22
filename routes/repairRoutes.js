const express = require("express");
const mongoose = require("mongoose");
const repairsModel = require("../models/repairs.js");

const app = express();

app.get("/repairs", async (req, res) => {
  const repairs = await repairsModel.find({});

  try {
    res.send(repairs);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/repairs/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const repairs = await repairsModel.findById(req.params.id);
    try {
      res.send(repairs);
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

app.put("/repairs/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      await repairsModel.findByIdAndUpdate(req.params.id, req.body);
      res.send(req.body);
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

app.post("/repairs", async (req, res) => {
  const repair = new repairsModel(req.body);

  try {
    await repair.save();
    res.send(repair);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/repairs/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      const repair = await repairsModel.findByIdAndDelete(req.params.id);

      if (!repair) return res.status(404).send({ Error: "ObjectID not found" });
      res.status(200).send({ deleted: 1 });
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

module.exports = app;
