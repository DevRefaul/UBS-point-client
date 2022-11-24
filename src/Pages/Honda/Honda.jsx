import { useQuery } from "@tanstack/react-query";
import React from "react";

const Honda = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["honda"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/bikes?brand=honda");
      const data = res.json();
      return data;
    },
  });

  console.log(isLoading);
  console.log(data);

  return (
    <div>
      <h2>This is Honda page</h2>
    </div>
  );
};

export default Honda;
