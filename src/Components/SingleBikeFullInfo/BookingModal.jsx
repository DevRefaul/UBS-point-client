import React from "react";
import { MdCheckCircle } from "react-icons/md";

const BookingModal = ({ bike }) => {
  const { bikeName, askingPrice, contact, sellerName, sellerVerified } = bike;

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
          <h4 className="font-bold">Price : {askingPrice}</h4>
          <p>Seller Number : {contact}</p>

          <div className="divider"></div>
          {/* user info */}
          <p>User Info : </p>
          <form>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="w-full border-2 py-2 px-1 rounded my-1"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Name"
              className="w-full border-2 py-2 px-1 rounded my-1"
            />
            <input
              type="text"
              name="userPhone"
              id="userPhone"
              placeholder="Your Phone Number"
              className="w-full border-2 py-2 px-1 rounded my-1"
            />
            <input
              type="text"
              name="place"
              id="place"
              placeholder="Your Meeting Location"
              className="w-full border-2 py-2 px-1 rounded my-1"
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
