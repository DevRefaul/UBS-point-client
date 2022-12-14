import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import Error from "../../Error/Error";

const AllSellers = () => {
  const { handleDeleteUser } = useContext(Authentication);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch(
        " https://ubs-point-server-side.vercel.app/sellers",
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

  const sellers = data.sellers;

  const handleDeleteSeller = async (id) => {
    const res = await fetch(
      ` https://ubs-point-server-side.vercel.app/deleteuser/${id}`,
      {
        method: "DELETE",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      }
    );
    const data = await res.json();

    if (data.deleteUser.deletedCount) {
      toast.success("Successfully Deleted User");
      handleDeleteUser();
      refetch();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-[98%] mx-auto">
      <div>
        <h2 className="text-3xl font-semibold text-center py-4">All Sellers</h2>

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
                  <td>{seller.sellerVerified}</td>
                  <td className="flex justify-center">
                    <button
                      onClick={() => handleDeleteSeller(seller._id)}
                      className="btn btn-sm btn-secondary"
                    >
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
