import React from "react";

const SingleBikeFullInfo = () => {

    const location = window.location.pathname.split("/")[2];
    console.log(location);

  return (
    <div>
      <h2>This is single bike all details</h2>
    </div>
  );
};

export default SingleBikeFullInfo;
