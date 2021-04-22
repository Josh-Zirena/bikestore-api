const express = require("express");
const mongoose = require("mongoose");
const customerModel = require("../models/customer.js");

const app = express();

app.get("/customers", async (req, res) => {
  const customers = await customerModel.find({});

  try {
    res.send(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/customers/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const customer = await customerModel.findById(req.params.id);
    try {
      res.send(customer);
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

app.put("/customers/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      await customerModel.findByIdAndUpdate(req.params.id, req.body);
      res.send(req.body);
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

app.post("/customers", async (req, res) => {
  const customer = new customerModel(req.body);

  try {
    await customer.save();
    res.send(customer);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/customers/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      const customer = await customerModel.findByIdAndDelete(req.params.id);

      if (!customer) res.status(404).send("no items found");
      res.status(200).send({ deleted: 1 });
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(500).send({ Error: "Please use a valid object ID." });
});

module.exports = app;
