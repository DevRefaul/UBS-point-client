import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Components/Loading/Loading";
import Error from "../Error/Error";
import Categorys from "./Categorys/Categorys";
import ClientFeedback from "./ClientFeedback/ClientFeedback";
import ContactSection from "./ContactSection/ContactSection";
import PromotedPost from "./PromotedPost/PromotedPost";
import Slider from "./Slider/Slider";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Bikes from "./Bikes/Bikes";

const Home = () => {
  // const [bikeBrands, setBikeBrands] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        " https://ubs-point-server-side.vercel.app/bikes",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const bikes = data?.bikes;
  const allBrands = bikes?.map((bike) => bike?.brandName);

  const brands = [...new Set(allBrands)];

  return (
    <div className="">
      <Slider />
      <Categorys brands={brands} />
      {data?.bikes.map((bike) => {
        const promotedBike = bike?.advertise === "true";
        if (promotedBike) {
          return <PromotedPost bike={bike} />;
        }
      })}
      <WhyChooseUs />
      <Bikes bikes={data.bikes} />
      <ContactSection />
      <ClientFeedback />
    </div>
  );
};

export default Home;
