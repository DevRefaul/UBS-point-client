import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Authentication } from "../../../Contexts/Auth/AuthContext";

const Profile = () => {
  const { user, handleUpdateUserInfo, setLoading } = useContext(Authentication);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const userInfo = { name: name };
    handleUpdateUserInfo(userInfo)
      .then(() => {
        setLoading(false);
        toast.success("Profile Updated Successfully");
      })
      .catch((err) => console.error(err.message));

    form.reset();
  };

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold py-4 text-center">
        {user.displayName}'s Profile
      </h2>

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
