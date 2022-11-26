import React from "react";

const VerifyApplication = () => {
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
            {/* {buyers.map((buyer, idx) => (
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
            ))} */}
          </tbody>
        </table>
      </div>
      {/* table end */}
    </div>
  );
};

export default VerifyApplication;
