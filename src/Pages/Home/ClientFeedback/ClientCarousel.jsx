import React from "react";
import { MdStarRate } from "react-icons/md";

const ClientCarousel = ({ review }) => {
  const { reviewer, message, image, rating } = review;
  return (
    <div className="mt-14">
      <div className="card w-[90%] mx-auto h-full bg-green-100 relative p-4">
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={image}
            alt=""
            className="w-20 h-20 rounded-full object-cover "
          />
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg font-medium">"{message}"</p>
          <p className="font-bold text-orange-400 flex items-center justify-center py-2">
            {rating} <MdStarRate className="ml-1 font-bold" />
          </p>
          <h4 className="text-xl font-semibold">-{reviewer}</h4>
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
