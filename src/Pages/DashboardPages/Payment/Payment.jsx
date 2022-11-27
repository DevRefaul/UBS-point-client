import React from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const { state } = useLocation();

  const data = state.bookingData;

  return (
    <div className="w-[98%] md:w-[80%] mx-auto">
      <h2 className="text-3xl font-bold text-center py-4">
        Payment for {data.bikeInfo.bikeName}
      </h2>
      <p className="text-center font-semibold ">
        Total Payment : {data.bikeInfo.askingPrice}
      </p>

      <div className="w-[80%] md:w-[60%] lg:w-[40%] mx-auto my-6">
        <Elements stripe={stripePromise}>
          <PaymentForm data={data} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
