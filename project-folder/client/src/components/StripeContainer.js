import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = process.env.React_App_PRODUCTION_STRIPE_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default StripeContainer;
