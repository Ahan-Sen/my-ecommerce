import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { payOrder, paymentInitiated } from "../redux/order/orderActions";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",

  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm(props) {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      dispatch(paymentInitiated());
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: orderDetails.order.totalPrice,
          id,
        });

        if (response.data.success) {
          dispatch(payOrder(orderDetails.order._id));
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button
          className="btn btn-lg btn-block btn-success"
          disabled={orderDetails.paymentInitiate}
        >
          Pay{" "}
          {orderDetails.paymentInitiate ? (
            <i class="fa fa-spinner" aria-hidden="true"></i>
          ) : (
            <></>
          )}{" "}
        </button>
      </form>
    </>
  );
}
