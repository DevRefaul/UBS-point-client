import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const SingleBikeCard = ({ bike }) => {
    
    const {
      _id,
      sellerName,
      bikeName,
      usedTime,
      condition,
      location,
      askingPrice,
      brandName,
      sellerVerified,
      imageURL,
      postedOn,
      isBooked,
    } = bike;

    return (
      <div className="h-full">
        <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
          <figure>
            <PhotoProvider>
              <PhotoView src={imageURL}>
                <img
                  src={imageURL}
                  alt="Album"
                  className="h-[300px] w-full object-cover cursor-pointer"
                />
              </PhotoView>
            </PhotoProvider>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{bikeName}</h2>
            <p>Posted On : {postedOn}</p>
            <div className="font-medium py-4">
              <p className="flex items-center">
                Seller :{" "}
                <span className="flex items-center ml-1">
                  {sellerName}{" "}
                  {sellerVerified === "true" && (
                    <span>
                      <MdCheckCircle className="text-lg text-blue-400 inline ml-1" />
                    </span>
                  )}
                </span>
              </p>
              <p>Used : {usedTime}</p>
              <p>Condition : {condition}</p>
              <p>Location : {location}</p>
              <p className="font-bold">Asking Price : ${askingPrice}</p>
            </div>
            <div className="flex justify-start">
              {isBooked === "true" ? (
                <>
                  <button
                    className="px-6 py-2 bg-gray-400 text-white font-bold rounded w-full cursor-not-allowed"
                    disabled
                  >
                    This Bike is Currently Booked
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/${brandName}/${_id}`}>
                    <button className="px-6 py-2 bg-green-400 text-white font-bold rounded border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500">
                      See Details
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default SingleBikeCard;
