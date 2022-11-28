import React, { useEffect, useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

const PaymentForm = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const price = data.bikeInfo.askingPrice;
  const productId = data._id;
  // navigation
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [cardErr, setCardErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [price]);

  // handle payment
  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      setCardErr(error.message);
    } else {
      setCardErr("");
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: data.bookerName,
            email: data.bookerEmail,
          },
        },
      });
    if (paymentError) {
      return setCardErr(paymentError.message);
    } else {
      setCardErr("");
    }

    if (paymentIntent.id) {
      const res = await fetch("http://localhost:5000/updateProductPayment", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const paymentResponse = await res.json();

      //   making data for saving in server
      const info = {
        sellerEmail: data.sellerEmail,
        sellerName: data.bikeInfo.sellerName,
        bikeName: data.bikeInfo.bikeName,
        totalPrice: data.bikeInfo.askingPrice,
        buyerEmail: data.bookerEmail,
        buyerName: data.buyerName,
        transactionId: paymentIntent.id,
      };

      if (paymentResponse.updatedPaymentResponse.modifiedCount > 0) {
        toast.success("Payment Successfull");
        savePaymentInfoToDB(info);
        setLoading(false);
        navigate("/dashboard/mybookings");
      }
    }
  };

  // deleting bike post fun after payment success
  const deletePostAfterSold = async (id) => {
    const res = await fetch(`http://localhost:5000/deletesellerpost/${id}`, {
      method: "DELETE",
    });
    const deleteResponse = await res.json();
    return;
  };

  // function for saving data in db
  const savePaymentInfoToDB = async (info) => {
    const res = await fetch("http://localhost:5000/soldbikes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    });
    const savedResponse = await res.json();
    if (savedResponse.saveToDB.insertedId) {
      toast.success("Payment Info Saved");
      deletePostAfterSold(data.bikeInfo._id);
      return;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border-2 border-orange-500 py-3 px-4 rounded"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe}
          className="bg-orange-400 text-white px-4 py-2 rounded mt-3"
        >
          Pay
        </button>
      </form>
      {cardErr && (
        <p className="text-red-400 font-medium mt-4 text-lg">{cardErr}</p>
      )}
    </>
  );
};

export default PaymentForm;
