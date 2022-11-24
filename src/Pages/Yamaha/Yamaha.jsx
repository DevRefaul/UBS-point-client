import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Components/Loading/Loading";
import SingleBikeCard from "../../Components/SingleBikeCard/SingleBikeCard";
import Error from "../Error/Error";

const Yamaha = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["yamaha"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/bikes?brand=yamaha");
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div>
      <div className="w-[90%] md:w-[80%] mx-auto my-12">
        <h2 className="text-3xl font-bold text-center my-10">Yamaha Bikes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.bikes?.map((bike) => (
            <SingleBikeCard key={bike._id} bike={bike} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Yamaha;
