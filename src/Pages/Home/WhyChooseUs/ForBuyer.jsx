import React from "react";

const ForBuyer = () => {
  return (
    <>
      <p className="text-xl font-semibold text-center text-green-500">Buyer</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 mt-12">
        {/* first card */}
        <div className="card w-full bg-base-100 shadow-xl my-4 hover:bg-orange-50">
          <div className="card-body relative">
            <p className="py-4 px-6 bg-green-400 text-white rounded-[100px] font-bold absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              1
            </p>
            <h2 className="text-center text-2xl font-bold">
              Find your second-hand bike
            </h2>
          </div>
        </div>

        {/* second card */}
        <div className="card w-full bg-base-100 shadow-xl my-4 hover:bg-orange-50">
          <div className="card-body relative">
            <p className="py-4 px-6 bg-green-400 text-white rounded-[100px] font-bold absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              2
            </p>
            <h2 className="text-center text-2xl font-bold">
              Make an appointment with the seller
            </h2>
          </div>
        </div>

        {/* third card */}
        <div className="card w-full bg-base-100 shadow-xl my-4 hover:bg-orange-50">
          <div className="card-body relative">
            <p className="py-4 px-6 bg-green-400 text-white rounded-[100px] font-bold absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              3
            </p>
            <h2 className="text-center text-2xl font-bold">Click to confirm</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForBuyer;
