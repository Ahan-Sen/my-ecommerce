require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");
const Product = require("../models/Product");

router.post("/:id", auth, async (req, res) => {
  try {
    const present = await User.find({ "myCart.cart": req.params.id });
    if (present[0]) {
      console.log("yes");
      await User.findOneAndUpdate(
        {
          _id: req.user.id,
          myCart: {
            $elemMatch: {
              cart: req.params.id,
            },
          },
        },
        {
          $set: {
            "myCart.$.qty": 5,
          },
        }
      );
    } else {
      console.log("NO");
      await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          $push: {
            myCart: { cart: req.params.id, qty: 2 },
          },
        }
      );
    }
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("myCart.cart");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
