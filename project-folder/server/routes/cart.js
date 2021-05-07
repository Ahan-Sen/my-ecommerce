require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("myCart")
      .populate("myCart.cart");
    res.json(user.myCart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addAddress", auth, async (req, res) => {
  try {
    const { fullName, houseNumber, city, postalcode, country } = req.body;

    await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $set: {
          "myAddress.fullName": fullName,
          "myAddress.houseNumber": houseNumber,
          "myAddress.city": city,
          "myAddress.postalcode": postalcode,
          "myAddress.country": country,
        },
      }
    );
    const user = await User.findById(req.user.id);
    res.send(user.myAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/address", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user.myAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    const { qty } = req.body;
    const user = await User.findById(req.user.id);
    var present = false;
    var i;
    for (i = 0; i < user.myCart.length; i++) {
      if (user.myCart[i].cart._id == req.params.id) {
        present = true;
        break;
      }
    }
    if (present == true) {
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
            "myCart.$.qty": qty,
          },
        }
      );
    } else {
      await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          $push: {
            myCart: { cart: req.params.id, qty: qty },
          },
        }
      );
    }
    const nuser = await User.findById(req.user.id).populate("myCart.cart");
    if (present == true) {
      res.json(nuser.myCart[i]);
    } else {
      res.json(nuser.myCart[nuser.myCart.length - 1]);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/delete", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      { $set: { myCart: [] } },
      { multi: true }
    );
    const user = await User.findById(req.user.id);
    res.json(user.myCart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/delete/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    var present = false;
    var i;
    for (i = 0; i < user.myCart.length; i++) {
      if (user.myCart[i]._id == req.params.id) {
        present = true;
        break;
      }
    }
    if (present == false) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await User.update(
      { _id: req.user.id },
      { $pull: { myCart: { _id: req.params.id } } },
      { multi: true }
    );
    const nuser = await User.findById(req.user.id).populate("myCart.cart");
    res.send(nuser.myCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
