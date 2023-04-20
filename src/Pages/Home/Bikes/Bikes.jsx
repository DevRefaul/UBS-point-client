import React from "react";
import SingleBikeCard from "../../../Components/SingleBikeCard/SingleBikeCard";
import { SplideSlide, Splide } from "@splidejs/react-splide";

const Bikes = ({ bikes }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold my-4 text-center">Recent Bikes</h2>

      <div>
        <Splide
          aria-label="Recent Bikes"
          options={{
            type: "loop",
            perPage: 4,
            autoplay: true,
            pagination: false,
            autoScroll: {
              speed: 1,
            },
            gap: "20px",
            breakpoints: {
              640: {
                perPage: 1,
              },
              768: {
                perPage: 2,
              },
              1024: {
                perPage: 3,
              },
            },
          }}
        >
          {bikes?.map((bike) => (
            <SplideSlide className="relative py-10" key={bike._id}>
              <SingleBikeCard bike={bike} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Bikes;
