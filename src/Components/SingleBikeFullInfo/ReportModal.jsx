import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Authentication } from "../../Contexts/Auth/AuthContext";

const ReportModal = ({ bike }) => {
  const { _id, sellerEmail } = bike;
  const { user } = useContext(Authentication);

  // report to admin
  const handleReportPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reporter = user.email;
    const reported = sellerEmail;
    const reportedPost = _id;
    const message = form.message.value;

    const reportedInfo = { reporter, reported, reportedPost, message };
    console.log(reportedInfo);

    const res = await fetch(`http://localhost:5000/report`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(reportedInfo),
    });
    const data = await res.json();
    console.log(data);
    if (data.reported.acknowledged) {
      toast.success("Successfully Reported To Admin");
      form.reset();
    } else {
      toast.error("Can't Report To Admin . Try Again sometime later");
    }
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="reportModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="reportModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Report To Admin</h3>
          <form onSubmit={handleReportPost}>
            <div>
              <label htmlFor="reporter">Reporter</label>
              <input
                type="email"
                name="reporter"
                id="reporter"
                disabled
                defaultValue={user.email}
                className="w-full border-2 py-2 px-1 rounded my-1"
              />
            </div>
            <div>
              <label htmlFor="reporter">Reported </label>
              <input
                type="email"
                name="reported"
                id="reported"
                disabled
                defaultValue={sellerEmail}
                className="w-full border-2 py-2 px-1 rounded my-1"
              />
            </div>
            <div>
              <label htmlFor="message">Report Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                className="w-full border-2 py-2 px-1 rounded my-1"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-400 text-white font-bold rounded mt-4 border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500"
            >
              Book Your Dream
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;