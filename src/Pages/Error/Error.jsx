import React from "react";
import errorAnim from "./error-anim.json";
import Lottie from "lottie-react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const errors = useRouteError();
  console.log(errors);
  const { status, statusText } = errors;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <Lottie animationData={errorAnim} className="w-4/5 md:w-1/2 mx-auto" />
        <h2 className="text-5xl font-bold text-red-500">{status}</h2>
        <p className="text-lg font-medium py-4">
          {statusText} <br /> An unknown error occured
        </p>

        {/* go to home page btn */}
        <div className="flex justify-center my-4">
          <Link to="/">
            <button className="px-8 py-3 text-white bg-green-600 font-semibold rounded-md">
              Go Back To Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
