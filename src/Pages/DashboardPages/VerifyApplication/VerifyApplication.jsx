import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../../../Components/Loading/Loading";
import Error from "../../Error/Error";

const VerifyApplication = () => {
  const {
    data: appliedDatas,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["verifyapplication"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/verifyapplication");
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

  const applicants = appliedDatas.applications;

  // function for sending data in backend for verify seller
  const handleVerifySeller = async (email, id) => {
    const res = await fetch("http://localhost:5000/verifyseller", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const adminResponse = await res.json();
    if (adminResponse.verifiedSuccess.modifiedCount > 0) {
      toast.success("Verified Seller");
      //
      deleteApplicationFromDB(id);
      //   now for removing
    }
  };

  // cancelverify;
  // function if verification is cancelled
  const handleVerifyCancel = async (email, id) => {
    console.log(email);
    const res = await fetch("http://localhost:5000/cancelverify", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const adminResponse = await res.json();
    console.log(adminResponse);
    if (adminResponse.verifiedSuccess.matchedCount > 0) {
      toast.success("Cancelled Verification");
      //
      //   now for removing
      deleteApplicationFromDB(id);
    }
  };

  // function for deleting application
  const deleteApplicationFromDB = async (id) => {
    const res = await fetch(`http://localhost:5000/deleteapplication/${id}`, {
      method: "DELETE",
    });
    const deletedData = await res.json();

    console.log(deletedData);
    if (deletedData.deleteApplication.deletedCount > 0) {
      toast.success("Application Deleted");
      refetch();
    }
  };

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">
        Verify Requests
      </h2>

      {/* table start */}
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Document</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, idx) => (
              <tr key={applicant._id} className="h-full">
                <th>{idx + 1}</th>
                <td>
                  <div className="flex justify-center">
                    <PhotoProvider>
                      <PhotoView src={applicant.sellerDoc}>
                        <img
                          src={applicant.sellerDoc}
                          alt=""
                          className="h-10 cursor-pointer"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </td>
                <td>{applicant.sellerName}</td>
                <td>{applicant.sellerEmail}</td>
                <td className="flex justify-center items-center">
                  <button
                    onClick={() =>
                      handleVerifySeller(applicant.sellerEmail, applicant._id)
                    }
                    className="btn btn-sm btn-secondary mb-4 mr-1"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() =>
                      handleVerifyCancel(applicant.sellerEmail, applicant._id)
                    }
                    className="btn btn-sm btn-secondary mb-4 ml-1"
                  >
                    Cancel
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

export default VerifyApplication;
