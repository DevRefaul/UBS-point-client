import React from "react";
import bmw from "../../../assets/BMW/s1000rr 2018.jpg";
import honda from "../../../assets/Honda/cbr-150-2021.jpg";
import mv from "../../../assets/MV Agusta/MV-Agusta-F3-RR.webp";
import yamaha from "../../../assets/Yamaha/black-yamaha-yzf-r6-motorcycle.jpg";
import { Link } from "react-router-dom";

const Categorys = ({ brands }) => {
  let categorysInfo = [];

  brands.map((brand) => {
    if (brand === "honda") {
      categorysInfo.push({
        name: "Honda",
        image: `${honda}`,
        to: "honda",
      });
    } else if (brand === "yamaha") {
      categorysInfo.push({
        name: "Yamaha",
        image: `${yamaha}`,
        to: "yamaha",
      });
    } else if (brand === "mv") {
      categorysInfo.push({
        name: "MV Agusta",
        image: `${mv}`,
        to: "mv",
      });
    } else if (brand === "bmw") {
      categorysInfo.push({
        name: "BMW",
        image: `${bmw}`,
        to: "bmw",
      });
    }

    return null;
  });

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center my-6">Categorys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categorysInfo.map((category, idx) => (
          <Link key={idx} to={`/${category.to}`}>
            <div className="card h-full w-full bg-base-100 shadow-xl image-full">
              <figure>
                <img src={category.image} alt="Shoes" className="" />
              </figure>
              <div className="card-body flex justify-center items-center">
                <h2 className="text-center text-4xl font-bold text-white">
                  {category.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categorys;
