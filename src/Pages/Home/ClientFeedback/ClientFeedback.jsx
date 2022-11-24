import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ClientCarousel from "./ClientCarousel";

const ClientFeedback = () => {
  const reviews = [
    {
      reviewer: "Josh",
      message:
        "The delivery is extremely fast and reliable. Also, the customer service and the seller are very friendly. Not to mention, the quality of the bike is very nice for a used one. Overall 10/10.",
      rating: 4.6,
      image:
        "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
    },
    {
      reviewer: "Bill Gates",
      message:
        "BikeFair is a great tool to sell a couple of our bikes every day - a big difference-maker for us! They take care of the marketing, customer support, and do everything we ask for and more, so we can focus on our own thing.",
      rating: 4.5,
      image:
        "https://image.cnbcfm.com/api/v1/image/104891709-Bill_Gates_the_co-Founder.jpg?v=1558120888",
    },
    {
      reviewer: "Kim",
      message: "Thank you BikeFair for your help. So happy with my bike!",
      rating: 4.1,
      image:
        "https://t4.ftcdn.net/jpg/02/87/35/99/360_F_287359914_HU3P7rhmyJMyyhBBcILcWd2S7DDwkJSs.jpg",
    },
  ];

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-10">
      <h2 className="text-3xl font-bold text-center py-4 ">
        What Clients Say About Us
      </h2>

      {/* reviews slider */}
      <div>
        <Splide
          aria-label="clients review"
          options={{
            type: "loop",
            pagination: false,
            arrows: false,
            autoplay: true,
          }}
        >
          {reviews.map((review, idx) => (
            <SplideSlide key={idx}>
              <ClientCarousel review={review} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ClientFeedback;
