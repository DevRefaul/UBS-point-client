import React from "react";
import { Link } from "react-router-dom";
import bike from "../../../assets/bike.png";

const Contact = () => {
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto flex flex-col items-center md:flex-row md:justify-between bg-orange-50 px-6 py-8 my-10 rounded">
      <div>
        <img src={bike} alt="" className="w-24" />
      </div>
      <div>
        <p className="text-lg font-semibold text-center">
          Facing Problem Buying Bike{" "}
          <button className="block md:inline mt-3 md:mt-0 w-full md:w-auto px-6 py-2 bg-green-400 text-white rounded md:ml-4 border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500">
            <Link to="/contact">Contact us</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Contact;
