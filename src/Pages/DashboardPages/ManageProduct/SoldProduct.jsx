import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";

const SoldProduct = () => {
  const { user } = useContext(Authentication);

  const { data, isLoading } = useQuery({
    queryKey: ["soldBikes"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellersoldbikes?email=${user.email}`
      );
      const soldBikes = res.json();
      return soldBikes;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  const soldBikes = data.soldBikes;

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">Sold Bikes</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-center font-bold text-lg">
              <th></th>
              <th>Bike Image</th>
              <th>Bike Name</th>
              <th>Buyer Email</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="text-center font-bold text-lg">
            {soldBikes.map((bike, idx) => {
              return (
                <tr key={bike._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex justify-center">
                      <PhotoProvider>
                        <PhotoView src={bike.bikeInfo.imageURL}>
                          <img
                            src={bike.bikeInfo.imageURL}
                            alt=""
                            className="h-10 cursor-pointer"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </div>
                  </td>
                  <td>{bike.bikeInfo.bikeName}</td>
                  <td>{bike.bookerEmail}</td>
                  <td>{bike.bikeInfo.askingPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldProduct;
