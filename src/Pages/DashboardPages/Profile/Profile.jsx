import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import { GoCircleSlash, GoCheck } from "react-icons/go";

const Profile = () => {
  const { user, handleUpdateUserInfo, setLoading, loading } =
    useContext(Authentication);

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/user?email=${user.email}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // imgbb api key
  const imgbbApi = process.env.REACT_APP_IMGBB_API;

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    // creating formdata for hosting image
    const formData = new FormData();
    formData.append("image", photo);

    if (loading) {
      return <Loading />;
    }

    // uplodaing image to imgbb
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        console.log(imgdata);
        if (imgdata.success) {
          const imageurl = imgdata.data.url;
          const userInfo = { name: name, imageurl: imageurl };

          //  now calling the firebase function for update
          handleUpdateUserInfo(userInfo)
            .then(() => {
              setLoading(false);
              //  backend api for updating user name in database
              handleUpdateUserInDB(name);
              toast.success("Profile Updated Successfully");
              form.reset();
            })
            .catch((err) => console.error(err.message));
        }
      })
      .catch((err) => console.error(err.message));
  };

  // updating user in database
  const handleUpdateUserInDB = async (name) => {
    const userInfo = { email: user.email, name };

    const res = await fetch("http://localhost:5000/updatename", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    if (data.updateName.matchedCount) {
      toast.success("Name updated in Database");
    }
  };

  const userInfo = userDetails.result;

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold py-4 text-center">
        {user.displayName}'s Profile
      </h2>
      {userInfo.role === "seller" && (
        <>
          {userInfo.sellerVerified === "true" ? (
            <h6 className="text-xl font-bold text-center my-4">
              Verified Seller{" "}
              <GoCheck className="text-xl text-white bg-sky-500 rounded-full inline ml-2" />{" "}
            </h6>
          ) : (
            <h6 className="text-xl font-bold text-center my-4">
              Unverified Seller{" "}
              <GoCircleSlash className="text-xl text-red-500 inline ml-2" />
            </h6>
          )}
        </>
      )}
      {userInfo.role === "admin" && (
        <h4 className="text-xl font-bold text-center my-4">Admin</h4>
      )}
      {/*  */}
      <section className="flex justify-center">
        <div>
          {/* for image */}
          <div className="flex justify-center">
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              }
              alt="user pic"
              className="w-20 h-20 rounded-full"
            />
          </div>
          {/* for image */}

          {/* updating form */}
          <form
            onSubmit={handleUpdateProfile}
            className="w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-auto mx-auto mt-6"
          >
            {/* name field */}
            <div>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-2 py-2 rounded my-1 border border-black"
                required
                defaultValue={user.displayName}
              />
            </div>
            {/* name field */}
            <div>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user.email}
                disabled
                className="w-full px-2 py-2 rounded my-1 border border-black"
              />
            </div>

            {/* photo field */}
            <div>
              <label htmlFor="photo">Choose Photo</label>
              <input
                type="file"
                name="photo"
                id="photo"
                className="w-full px-2 py-2 rounded my-1"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 mt-6 bg-orange-500 text-white font-bold border-2 border-transparent hover:bg-transparent hover:text-orange-500 hover:border-orange-500 rounded"
            >
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
