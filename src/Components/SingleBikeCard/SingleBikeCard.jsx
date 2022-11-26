import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const SingleBikeCard = ({ bike }) => {
    
    const {
        _id,
      bikeName,
      image,
      used,
      askingPrice,
      location,
      condition,
      sellerName,
        sellerVerified,
      brand
    } = bike;

  return (
    <div>
      <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
        <figure>
          <PhotoProvider>
            <PhotoView src={image}>
              <img
                src={image}
                alt="Album"
                className="h-[300px] w-full object-cover"
              />
            </PhotoView>
          </PhotoProvider>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{bikeName}</h2>
          <div className="font-medium py-4">
            <p className="flex items-center">
              Seller :{" "}
              <span className="flex items-center ml-1">
                {sellerName}{" "}
                {sellerVerified && (
                  <span>
                    <MdCheckCircle className="text-lg text-blue-400 inline ml-1" />
                  </span>
                )}
              </span>
            </p>
            <p>Used : {used}</p>
            <p>Condition : {condition}</p>
            <p>Location : {location}</p>
            <p className="font-bold">Asking Price : ${askingPrice}</p>
          </div>
          <div className="flex justify-start">
            <Link to={`/${brand}/${_id}`}>
              <button className="px-6 py-2 bg-green-400 text-white font-bold rounded md:ml-4 border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500">
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBikeCard;


/* 
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
            advertise,
            available,
            isBooked,
*/