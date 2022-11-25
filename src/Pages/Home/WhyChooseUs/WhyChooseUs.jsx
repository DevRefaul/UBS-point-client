import React, { useState } from "react";
import ForBuyer from "./ForBuyer";
import ForSeller from "./ForSeller";

const WhyChooseUs = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className={`${toggle ? "bg-green-50" : "bg-orange-50"} py-4  `}>
      <h2 className="text-3xl font-semibold text-center my-6">Why Choose Us</h2>
      <p className="text-lg font-bold text-gray-500 text-center mb-4">
        Selling a bike on USB Point is as easy as 1–2–3
      </p>
      <div className="flex justify-center">
        <input
          type="checkbox"
          className={toggle ? "toggle toggle-success" : "toggle"}
          onClick={() => setToggle(!toggle)}
          checked={toggle ? true : false}
          readOnly
        />
      </div>
      {/* content section */}
      <div className="w-[90%] md:w-[80%] mx-auto my-10 min-h-[100vh] md:min-h-[20rem] lg:min-h-[15rem]">
        {toggle ? <ForBuyer /> : <ForSeller />}
      </div>
    </div>
  );
};

export default WhyChooseUs;
