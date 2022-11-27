import React, { useContext } from "react";
import toast from "react-hot-toast";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../Contexts/Auth/AuthContext";
import handleUpdateProductBooking from "./updateProductBooking";

const BookingModal = ({ bike, refetch }) => {
  const {
    _id,
    bikeName,
    askingPrice,
    contactNumber,
    sellerName,
    sellerVerified,
    sellerMail,
  } = bike;
  const { user } = useContext(Authentication);

  // naviagte for navigating user to profile to see orders
  const navigate = useNavigate();

  const handleBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bikeInfo = bike;
    bikeInfo.isBooked = "true";
    const bookerName = form.name.value;
    const bookerEmail = form.email.value;
    const bookerPhone = form.userPhone.value;
    const mettingLocation = form.place.value;
    const isPaid = "false";
    const sellerEmail = bikeInfo.sellerMail;
    const postId = bikeInfo._id;
    // const

    const bookingInfo = {
      bikeInfo,
      bookerName,
      bookerEmail,
      bookerPhone,
      mettingLocation,
      isPaid,
      sellerEmail,
      postId,
    };

    const res = await fetch("http://localhost:5000/booked", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo),
    });
    const bookingResponse = await res.json();

    if (bookingResponse.bookingInfo.insertedId) {
      // updating product booked field
      const updateBooked = await handleUpdateProductBooking(_id, "true");

      if (updateBooked?.updatedProductResponse?.modifiedCount > 0) {
        refetch();
        toast.success("Successfully Booked Your Dream");
        navigate("/dashboard/mybookings");
      }
    } else {
      toast.error("Can't Book Your Dream Try Again Sometime Later");
    }
  };

  return (
    <>
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="bookingModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mt-4">Bike Name : {bikeName}</h3>
          <p className="pt-4">
            Seller : {sellerName}{" "}
            <span>
              {sellerVerified && (
                <MdCheckCircle className="text-blue-400 ml-1 inline" />
              )}
            </span>
          </p>
          <h4 className="font-bold">Price : ${askingPrice}</h4>
          <p>Seller Number : {contactNumber}</p>
          <p>Seller Email : {sellerMail}</p>

          <div className="divider"></div>
          {/* user info */}
          <p>User Info : </p>
          <form onSubmit={handleBook}>
            <input
              type="text"
              name="name"
              id="name"
              disabled
              defaultValue={user.displayName}
              className="w-full border-2 py-2 px-1 rounded my-1"
            />
            <input
              type="email"
              name="email"
              id="email"
              disabled
              defaultValue={user.email}
              className="w-full border-2 py-2 px-1 rounded my-1"
            />
            <input
              type="text"
              name="userPhone"
              id="userPhone"
              placeholder="Your Phone Number"
              className="w-full border-2 py-2 px-1 rounded my-1"
              required
            />
            <input
              type="text"
              name="place"
              id="place"
              placeholder="Your Meeting Location"
              className="w-full border-2 py-2 px-1 rounded my-1"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-400 text-white font-bold rounded mt-4 border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500"
            >
              Book Your Dream
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
