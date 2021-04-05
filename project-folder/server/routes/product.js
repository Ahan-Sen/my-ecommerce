const router = require("express").Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const data = require("../data");

const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/seed", async (req, res) => {
  //await Product.remove({});
  try {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
