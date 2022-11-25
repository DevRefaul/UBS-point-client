import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import Error from "../../Error/Error";

const ReportedProducts = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reported"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reported");
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = async (id, _id) => {
    console.log(id);
    const res = await fetch(
      `http://localhost:5000/deletepost?reportedpost=${id}&reportedqueue=${_id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.deletePost.deletedCount) {
      toast.success("Successfully Deleted Post");
      refetch();
    } else {
      toast.error("Can't Delete Post");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const reportedItems = data.reportedItems;

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">All Buyers</h2>

      {/* table start */}
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Reporter</th>
              <th>Reported</th>
              <th>Post ID</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedItems.map((item, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{item.reportedInfo.reporter}</td>
                <td>{item.reportedInfo.reported}</td>
                <td>{item.reportedInfo.reportedPost}</td>
                <td>{item.reportedInfo.message}</td>
                <td className="flex justify-center">
                  <button
                    onClick={() =>
                      handleDelete(item.reportedInfo.reportedPost, item._id)
                    }
                    className="btn btn-sm btn-secondary"
                  >
                    Delete Post
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

export default ReportedProducts;
