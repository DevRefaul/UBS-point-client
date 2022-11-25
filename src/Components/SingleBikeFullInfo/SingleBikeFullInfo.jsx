import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Error from "../../Pages/Error/Error";
import Loading from "../Loading/Loading";
import "./singleBikeInfo.css";

const SingleBikeFullInfo = () => {
  const id = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      if (!id) {
        return <Loading />;
      }
      const res = await fetch(`http://localhost:5000/bikes/${id}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const {
    bikeName,
    brand,
    askingPrice,
    buyingPrice,
    condition,
    contact,
    description,
    image,
    location,
    sellerName,
    sellerVerified,
    totalKiloRun,
    used,
  } = data.bike;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-10 py-4">
      {/* bike details */}
      <h2 className="text-3xl font-bold">{bikeName}</h2>
      <p className="text-lg font-semibold py-1">
        Brand : <span className="capitalize">{brand}</span>
      </p>
      <p className="text-lg font-semibold py-1">
        By - {sellerName}{" "}
        <span>
          {sellerVerified && (
            <MdCheckCircle className="text-blue-400 ml-1 inline" />
          )}
        </span>
      </p>
      <div className="my-4">
        <img src={image} alt="" className="w-[50%]" />
      </div>
      <p className="para">Total Run : {totalKiloRun}k</p>
      <p className="para">Used : {used}</p>
      <p className="para">Condition : {condition}</p>

      <p className="para">Location : {location}</p>
      <p className="para">Contact : {contact}</p>
      <p className="para">About Bike : {description}</p>
      <h4 className="text-xl font-bold mt-2">Buying Price : ${buyingPrice}</h4>
      <h4 className="text-xl font-bold mb-2">Asking Price : ${askingPrice}</h4>
      <div className="mt-6">
        <button className="px-6 py-2 bg-green-400 text-white font-bold rounded border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500">
          Book Now!!!
        </button>
        <span className="mx-4"></span>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-orange-400 text-white font-bold rounded md:ml-4 border-2 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500"
        >
          Choose Another Bike
        </button>
      </div>
    </div>
  );
};

export default SingleBikeFullInfo;
