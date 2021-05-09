const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/myorders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.send(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.body.cart.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        cart: req.body.cart,
        address: req.body.address,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user.id,
      });
      const createdOrder = await order.save();
      createdOrder.populate("cart.cart");
      res.status(201).send(createdOrder);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id/pay", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      res.send(updatedOrder);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("cart.cart");
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
