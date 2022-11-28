import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";

const AddProduct = () => {
  const { user } = useContext(Authentication);

  const [postingDelay, setPostingDelay] = useState(false);

  const navigate = useNavigate();

  // imgbb api key
  const imgbbApi = process.env.REACT_APP_IMGBB_API;

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["sellpost"],
    queryFn: async () => {
      const res = await fetch(
        ` https://ubs-point-server-side.vercel.app/user?email=${user.email}`,
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

  if (postingDelay) {
    return <Loading />;
  }

  const bikeSeller = userDetails.result;

  const handleAddPost = (e) => {
    e.preventDefault();

    setPostingDelay(true);

    const form = e.target;
    const sellerName = bikeSeller.name;
    const sellerMail = bikeSeller.email;
    const bikeName = form.bikeName.value;
    const usedTime = form.usedTime.value;
    const condition = form.condition.value;
    const totalrun = form.totalrun.value;
    const location = form.location.value;
    const buyingPrice = form.buyingPrice.value;
    const askingPrice = form.askingPrice.value;
    const contactNumber = form.contactNumber.value;
    const brandName = form.brandName.value;
    const description = form.description.value;
    const sellerVerified = bikeSeller.sellerVerified;
    const postedOn = format(new Date(), "PP");
    const advertise = "false";
    const available = "available";
    const isBooked = "false";

    const bikePhoto = form.bikePhoto.files[0];

    const formData = new FormData();
    formData.append("image", bikePhoto);

    // uplodaing image to imgbb
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const imageURL = imgData.data.url;
          // gathering all the data about the post and storing inside and object
          const postInfo = {
            sellerName,
            sellerMail,
            bikeName,
            usedTime,
            condition,
            totalrun,
            location,
            buyingPrice,
            askingPrice,
            contactNumber,
            brandName,
            description,
            sellerVerified,
            imageURL,
            postedOn,
            advertise,
            available,
            isBooked,
          };
          form.reset();
          makePost(postInfo);
        }
      })
      .catch((err) => console.error(err.message));
  };

  const makePost = async (postInfo) => {
    const res = await fetch(
      " https://ubs-point-server-side.vercel.app/makepost",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(postInfo),
      }
    );
    const postResponse = await res.json();

    if (postResponse.postResponse.insertedId) {
      toast.success("Successfully Posted Your Bike for Sale");
      setPostingDelay(false);
      navigate("/dashboard/manageproduct");
    }
  };

  return (
    <div className="w-[98%] xl:w-[80%] mx-auto">
      <h2 className="text-3xl font-semibold my-4 text-center">Add Product</h2>
      <div className="flex justify-center my-6">
        <form
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid "
          onSubmit={handleAddPost}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-center">
            {/* seller name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="sellerName" className="block text-gray-800">
                Seller Name
              </label>
              <input
                type="text"
                name="sellerName"
                id="sellerName"
                defaultValue={bikeSeller.name}
                disabled
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* seller email */}
            <div className="space-y-1 text-sm">
              <label htmlFor="sellerMail" className="block text-gray-800">
                Seller Email
              </label>
              <input
                type="email"
                name="sellerMail"
                id="sellerMail"
                defaultValue={bikeSeller.email}
                disabled
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* bike name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="bikeName" className="block text-gray-800">
                Bike Name
              </label>
              <input
                type="text"
                name="bikeName"
                id="bikeName"
                placeholder="Your Bike Name"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* used time field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="usedTime" className="block text-gray-800">
                Used Time
              </label>
              <input
                type="text"
                name="usedTime"
                id="usedTime"
                placeholder="Used Time (ex.3 Months / 1 Year)"
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* condition field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="condition" className="block text-gray-800">
                Bike Condition
              </label>
              <select
                name="condition"
                id="condition"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2"
              >
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Excelent">Excelent</option>
              </select>
            </div>

            {/* total kilo run field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="totalrun" className="block text-gray-800">
                Total Kilo Run
              </label>
              <input
                type="text"
                name="totalrun"
                id="totalrun"
                placeholder="Total Kilo Run (ex: 1000)"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* location field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-800">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Your Location"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* buying price field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="buyingPrice" className="block text-gray-800">
                Buying Price
              </label>
              <input
                type="text"
                name="buyingPrice"
                id="buyingPrice"
                placeholder="Bike Buying Price"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>
            {/* asking price field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="askingPrice" className="block text-gray-800">
                Asking Price
              </label>
              <input
                type="text"
                name="askingPrice"
                id="askingPrice"
                placeholder="Your Asking Price"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>

            {/* contact number field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="contactNumber" className="block text-gray-800">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                placeholder="Your Contact Number"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
              />
            </div>
            {/* brand name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="brandName" className="block text-gray-800">
                Brand Name
              </label>
              <select
                name="brandName"
                id="brandName"
                required
                className="w-full px-4 py-3 rounded-md border-green-500 border-2"
              >
                <option value="honda">Honda</option>
                <option value="yamaha">Yamaha</option>
                <option value="mv">Mv Agusta</option>
                <option value="bmw">BMW</option>
              </select>
            </div>

            {/*bike photo field */}
            <div>
              <label htmlFor="bikePhoto">Bikes Photo</label>
              <input
                type="file"
                name="bikePhoto"
                id="bikePhoto"
                className="w-full px-2 py-2 rounded-md border-green-500 border-2"
                required
              />
            </div>
          </div>

          {/* bike description */}
          <div>
            <label htmlFor="description">Bike Description</label>
            <textarea
              name="description"
              id="description"
              // cols="30"
              rows="5"
              placeholder="Write about your bike"
              className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400 focus:outline-none"
            ></textarea>
          </div>

          {/* btn */}
          <button
            type="submit"
            className="block w-full p-3 font-bold text-center border-transparent rounded-sm text-white bg-green-400 hover:bg-white hover:text-green-500 hover:border-orange-500 border-2"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
