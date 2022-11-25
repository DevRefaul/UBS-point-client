import React from "react";

const ForSeller = () => {
  return (
    <>
      <p className="text-xl font-semibold text-center text-green-500">Seller</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6  mt-12">
        {/* first card */}
        <div className="card w-full bg-base-100 shadow-xl my-4 hover:bg-green-50">
          <div className="card-body relative">
            <p className="py-4 px-6 bg-green-400 text-white rounded-[100px] font-bold absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              1
            </p>
            <h2 className="text-center text-2xl font-bold">Create A Post</h2>
          </div>
        </div>

        {/* second card */}
        <div className="card w-full bg-base-100 shadow-xl my-4 hover:bg-green-50">
          <div className="card-body relative">
            <p className="py-4 px-6 bg-green-400 text-white rounded-[100px] font-bold absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              2
            </p>
            <h2 className="text-center text-2xl font-bold">
              Test ride & hand-over meeting
            </h2>
          </div>
        </div>

        {/* third card */}
        <div className="card w-full bg-base-100 shadow-xl my-4 hover:bg-green-50">
          <div className="card-body relative">
            <p className="py-4 px-6 bg-green-400 text-white rounded-[100px] font-bold absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              3
            </p>
            <h2 className="text-center text-2xl font-bold">
              Get paid directly to your account
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForSeller;
