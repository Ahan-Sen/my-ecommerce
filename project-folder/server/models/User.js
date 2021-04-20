const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    myCart: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        qty: {
          type: Number,
        },
      },
    ],
    myAddress: {
      fullName: {
        type: String,
        default: "",
      },
      houseNumber: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      postalcode: {
        type: Number,
        default: null,
      },
      country: {
        type: String,
        default: "",
      },
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
