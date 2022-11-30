import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../Contexts/Auth/AuthContext";
import Error from "../../Pages/Error/Error";
import Loading from "../Loading/Loading";
import BookingModal from "./BookingModal";
import ReportModal from "./ReportModal";
import "./singleBikeInfo.css";

const SingleBikeFullInfo = () => {
  const id = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

  const {
    data: singleBike,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      if (!id) {
        return <Loading />;
      }
      const res = await fetch(
        ` https://ubs-point-server-side.vercel.app/bikes/${id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  // fetching user infos for conditional rendering
  const { user } = useContext(Authentication);

  const userEmail = user?.email;

  // passing email to server

  const {
    data,
    isLoading: userLoaing,
    error: userError,
  } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(
        ` https://ubs-point-server-side.vercel.app/user?email=${userEmail}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  // loading and error state for loading bike data
  if (isLoading || userLoaing) {
    return <Loading />;
  }

  if (error || userError) {
    return <Error />;
  }

  const {
    sellerName,
    sellerMail,
    bikeName,
    usedTime,
    condition,
    totalrun,
    location,
    buyingPrice,
    askingPrice,
    contactNumber,
    brandName,
    description,
    sellerVerified,
    imageURL,
    postedOn,
    available,
  } = singleBike?.bike;

  const userInfo = data;
  const { role } = userInfo.result;

  const seller = role === "seller";

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-10 py-4">
      {/* bike details */}
      <h2 className="text-3xl font-bold">{bikeName}</h2>
      <p className="para">Posted On : {postedOn}</p>
      <p className="text-lg font-semibold py-1">
        Brand : <span className="capitalize">{brandName}</span>
      </p>
      <p className="text-lg font-semibold py-1">
        By - {sellerName}{" "}
        <span>
          {sellerVerified === "true" && (
            <MdCheckCircle className="text-blue-400 ml-1 inline" />
          )}
        </span>
      </p>
      <div className="my-4">
        <img src={imageURL} alt="" className="w-[50%]" />
      </div>
      <p className="para">Total Run : {totalrun} km</p>
      <p className="para">Used : {usedTime}</p>
      <p className="para">Condition : {condition}</p>

      <p className="para">Location : {location}</p>
      <p className="para">Contact : {contactNumber}</p>
      <p className="para">Seller Email : {sellerMail}</p>
      <p className="para capitalize">This Bike is : {available}</p>
      <p className="para">About Bike : {description}</p>
      <h4 className="text-xl font-bold mt-2">Buying Price : ${buyingPrice}</h4>
      <h4 className="text-xl font-bold mb-2">Asking Price : ${askingPrice}</h4>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* conditional rendering so that seller can't buy product */}
        {!seller && (
          <>
            {/* booking modal */}
            <label
              htmlFor="bookingModal"
              className="text-center px-6 py-2 bg-green-400 text-white font-bold rounded border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500 cursor-pointer"
            >
              Book Now!!!
            </label>

            {/* go back btn */}
            <button
              onClick={() => navigate(-1)}
              className=" px-6 py-2 bg-orange-400 text-white font-bold rounded md:ml-4 border-2 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500"
            >
              Choose Another Bike
            </button>

            {/* report to admin btn */}
            <label
              htmlFor="reportModal"
              className=" px-6 py-2 bg-red-400 text-center text-white font-bold rounded md:ml-4 border-2 border-transparent hover:bg-white hover:text-red-500 hover:border-red-500"
            >
              Report to admin
            </label>
          </>
        )}
      </div>

      <BookingModal bike={singleBike.bike} refetch={refetch} />
      <ReportModal bike={singleBike.bike} />
    </div>
  );
};

export default SingleBikeFullInfo;
