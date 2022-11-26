import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";

const VerifySeller = () => {
  const imgbbkey = process.env.REACT_APP_IMGBB_API;

  const [loading, setLoading] = useState(false);

  const { user } = useContext(Authentication);

  if (loading) {
    return <Loading />;
  }
  const handleApplyVerification = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const imgfile = form.photo.files[0];

    const formData = new FormData();
    formData.append("image", imgfile);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbkey}`;

    fetch(url, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((imgdata) => {
        if (imgdata.success) {
          const imgurl = imgdata.data.url;

          const userInfo = {
            sellerEmail: user.email,
            sellerName: user.displayName,
            sellerDoc: imgurl,
          };

          // now this data will ben sent on server
          fetch("http://localhost:5000/applyverify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((appliedResponse) => {
              if (appliedResponse.result.insertedId) {
                setLoading(false);
                toast.success(
                  "Applied For Verification Wait For Admin Response"
                );
              }
            })
            .catch((err) => console.error(err.message));
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">
        Apply For Verified Badge
      </h2>

      <div className="flex justify-center">
        <form className="mt-6" onSubmit={handleApplyVerification}>
          <div>
            <label htmlFor="photo">Upload Your Nid</label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="w-full px-2 py-2 rounded my-1 border border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded border-2 border-transparent hover:bg-transparent hover:border-orange-500 hover:text-orange-500 mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifySeller;
