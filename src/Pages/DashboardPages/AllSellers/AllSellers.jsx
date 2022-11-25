import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Components/Loading/Loading";
import Error from "../../Error/Error";

const AllSellers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sellers");
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

  const sellers = data.sellers;

  return (
    <div className="w-[98%] mx-auto">
      <div>
        <h2 className="text-3xl font-semibold text-center py-4">
          All Sellerss
        </h2>

        {/* table start */}
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Verified</th>
                <th className="">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.role}</td>
                  <td>{seller.verified}</td>
                  <td className="flex justify-center">
                    <button className="btn btn-sm btn-secondary">
                      Delete Seller
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* table end */}
      </div>
    </div>
  );
};

export default AllSellers;
