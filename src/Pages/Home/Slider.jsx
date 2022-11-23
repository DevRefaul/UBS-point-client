import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import honda from "../../assets/Honda/cbr-150-2021.jpg";
import bmw from "../../assets/BMW/s1000rr 2018.jpg";
import "./slider.css";

const Slider = () => {
  return (
    <div className="w-[80%] mx-auto">
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          {/* <div className="imageOverlay">
            <img src={honda} alt="" className="w-full h-[80vh] object-cover" />
          </div> */}
        </SplideSlide>
        <SplideSlide>
          {/* <img src={bmw} alt="" className="w-full h-[80vh] object-cover" /> */}
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Slider;
