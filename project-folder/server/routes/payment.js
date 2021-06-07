require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

router.post("/", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
      description: "Buy Item",
      payment_method: id,
      confirm: true,
    });
    //console.log("payment", payment);
    res.json({
      message: "payment successful",
      success: true,
    });
  } catch (error) {
    //console.log("Error", error);
    res.json({
      message: "payment Failed",
      success: false,
    });
  }
});

module.exports = router;
