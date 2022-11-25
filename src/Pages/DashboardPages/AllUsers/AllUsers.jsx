import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import Error from "../../Error/Error";

const AllUsers = () => {
  const { handleDeleteUser } = useContext(Authentication);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/buyers");
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

  const buyers = data.buyers;

  const handleDeleteBuyer = async (id) => {
    const res = await fetch(`http://localhost:5000/deleteuser/${id}`, {
      method: "DELETE",
    });
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
      <h2 className="text-3xl font-semibold text-center py-4">All Buyers</h2>

      {/* table start */}
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>{buyer.role}</td>
                <td className="flex justify-center">
                  <button
                    onClick={() => handleDeleteBuyer(buyer._id)}
                    className="btn btn-sm btn-secondary"
                  >
                    Delete Buyer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table end */}
    </div>
  );
};

export default AllUsers;
