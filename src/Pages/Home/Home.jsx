import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Components/Loading/Loading";
import Error from "../Error/Error";
import Categorys from "./Categorys/Categorys";
import ClientFeedback from "./ClientFeedback/ClientFeedback";
import ContactSection from "./ContactSection/ContactSection";
import Slider from "./Slider/Slider";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

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
      <WhyChooseUs />
      <ContactSection />
      <ClientFeedback />
    </div>
  );
};

export default Home;
