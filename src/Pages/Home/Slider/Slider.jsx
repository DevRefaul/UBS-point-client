import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import honda from "../../../assets/Honda/cbr-150-2021.jpg";
import bmw from "../../../assets/BMW/s1000rr 2018.jpg";
import mvagusta from "../../../assets/MV Agusta/F3-RC.jpg";
import yamaha from "../../../assets/Yamaha/black-yamaha-yzf-r6-motorcycle.jpg";
import "./slider.css";
import { Link } from "react-router-dom";

const Slider = () => {
  const slidersInfo = [
    {
      image: `${honda}`,
      name: "honda",
      text: "Buy New Looking Used Bikes at a Cheap Rate",
    },
    {
      image: `${bmw}`,
      name: "bmw",
      text: "Buy Awesome Used Sports Bikes Direct From the User ",
    },
    {
      image: `${mvagusta}`,
      name: "mvagusta",
      text: "No Thirdparty Company or People Will Disturb",
    },
    {
      image: `${yamaha}`,
      name: "yamaha",
      text: "Get Your Money Back If The Bike Has Major Problems",
    },
  ];

  return (
    <div className="md:w-[80%] mx-auto mb-10">
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: "loop",
          pagination: false,
          autoplay: true,
        }}
      >
        {slidersInfo.map((slide, idx) => (
          <SplideSlide key={idx} className="relative">
            <div className="imageOverlay">
              <img
                src={slide.image}
                alt=""
                className="w-full h-[80vh] object-cover"
              />
            </div>
            <div className="md:w-[50%] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-xl xl:text-5xl font-bold text-gray-100 text-center leading-relaxed">
                {slide.text}
              </h2>
              <div className="flex justify-center my-4">
                <Link to={`/${slide.name}`}>
                  <button className="px-6 py-2 font-bold bg-green-400 text-white rounded ml-4 border-2 border-transparent hover:bg-transparent hover:text-green-500 hover:border-green-500">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Slider;
