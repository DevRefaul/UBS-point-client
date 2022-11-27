import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import { promote, deletePost } from "./manageProductsFunctionality";
import toast from "react-hot-toast";

const ManageProduct = () => {
  const { user } = useContext(Authentication);
  const [loader, setloader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [posts, setPosts] = useState({});

  useEffect(() => {
    setloader(true);
    axios
      .get(`http://localhost:5000/singlesellerposts?email=${user.email}`)
      .then((res) => {
        setPosts(res.data);
        setloader(false);
      });
  }, [user.email, refresh]);

  const singleSellerPosts = posts.sellerPosts;

  // promote handler
  const handlePromotePost = async (id) => {
    setloader(true);
    const promoteFun = await promote(id);
    if (promoteFun.promotedResponse.modifiedCount) {
      toast.success("Post Promoted Successfully");
      setloader(false);
    }
  };

  // delete post handler
  const handleDeletePost = async (id) => {
    const confirm = window.confirm();
    if (confirm) {
      setloader(true);
      const deleteFun = await deletePost(id);
      console.log(deleteFun);
      if (deleteFun.deleteResponse.deletedCount > 0) {
        toast.success("Post Deleted Successfully");
        setloader(false);
        setRefresh(true);
      }
    } else {
      toast.error("Deletation Failed");
    }
  };

  if (loader) {
    return <Loading />;
  }

  return (
    <div className="w-[98%] mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">All Posts</h2>

      {/* table start */}
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Bike Image</th>
              <th>Bike</th>
              <th>Promote</th>
              <th>Actions</th>
              <th>Availibility</th>
              <th>Is Booked</th>
            </tr>
          </thead>
          <tbody>
            {singleSellerPosts?.map((post, idx) => (
              <tr key={post._id} className="h-full">
                <th>{idx + 1}</th>

                {/* bike image */}
                <td>
                  <div className="flex justify-center">
                    <PhotoProvider>
                      <PhotoView src={post.imageURL}>
                        <img
                          src={post.imageURL}
                          alt=""
                          className="h-10 cursor-pointer"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </td>

                {/* boke name */}
                <td>{post.bikeName}</td>

                {/* table data for promoting post */}
                <td>
                  {post.advertise && post.advertise === "false" ? (
                    <>
                      <div className="flex items-center justify-center">
                        <button
                          className="btn py-1  btn-info"
                          onClick={() => handlePromotePost(post._id)}
                        >
                          Promote
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center font-bold text-lg">
                        <h4>Already Promoted</h4>
                      </div>
                    </>
                  )}
                </td>

                {/* table data for deleting post */}
                <td>
                  <div className="flex items-center justify-center">
                    <button
                      className="btn py-1  btn-warning"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete Post
                    </button>
                  </div>
                </td>

                {/* selecting options if the prodcut is still available */}
                <td>
                  <select
                    name="available"
                    id="available"
                    className="bg-green-400 text-white px-3 py-2 rounded font-bold"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>

                {/* booked status */}
                <td>
                  <div className="text-center font-bold text-lg">
                    {post.isBooked === "true" ? (
                      <h4 className="text-green-500">Booked</h4>
                    ) : (
                      <h4 className=" text-red-500 ">Not Booked Yet</h4>
                    )}
                  </div>
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

export default ManageProduct;
