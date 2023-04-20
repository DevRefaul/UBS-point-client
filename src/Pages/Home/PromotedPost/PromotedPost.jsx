import React from "react";
import SingleBikeCard from "../../../Components/SingleBikeCard/SingleBikeCard";

const PromotedPost = ({ bike }) => {

  return (
    <div className="my-10 w-[98%] md:w-[80%] mx-auto">
      <h2 className="text-3xl font-semibold text-center my-4">
        Featured Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {<SingleBikeCard bike={bike} />}
      </div>
    </div>
  );
};

export default PromotedPost;
