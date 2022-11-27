import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import {
  promote,
  deletePost,
  updateProductAvailability,
} from "./manageProductsFunctionality";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import BookedTrue from "./BookedTrue";
import BookedFalse from "./BookedFalse";

const ManageProduct = () => {
  const { user } = useContext(Authentication);
  const [loader, setloader] = useState(false);

  // resresh state to updated data after changes
  const [refresh, setRefresh] = useState(false);

  const [posts, setPosts] = useState({});

  useEffect(() => {
    setloader(true);
    axios
      .get(`http://localhost:5000/singlesellerposts?email=${user.email}`)
      .then((res) => {
        setPosts(res.data);
        setRefresh(false);
        setloader(false);
      });
  }, [user.email, refresh]);

  // const singleSellerPosts = posts.sellerPosts;

  // checking if the bike is sold

  const { data, isLoading } = useQuery({
    queryKey: ["soldProducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellerBookedPosts?email=${user.email}`
      );
      const posts = await res.json();
      return posts;
    },
  });

  // promote handler
  const handlePromotePost = async (id) => {
    setloader(true);
    const promoteFun = await promote(id);
    if (promoteFun.promotedResponse.modifiedCount) {
      setRefresh(true);
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
      if (deleteFun.deleteResponse.deletedCount > 0) {
        setRefresh(true);
        toast.success("Post Deleted Successfully");
        setloader(false);
      }
    } else {
      toast.error("Deletation Failed");
      setRefresh(true);
      setloader(false);
    }
  };

  const handleSetAvailable = async (id, value) => {
    setloader(true);
    const availableFun = await updateProductAvailability(id, value);

    if (availableFun.updatedProductResponse.modifiedCount > 0) {
      setRefresh(true);
      toast.success("Post Availability Changed Successfully");
      setloader(false);
    } else {
      toast.error("Can't Change Availablity");
      setRefresh(true);
      setloader(false);
    }
  };

  if (loader || isLoading) {
    return <Loading />;
  }

  // array of bikes sold
  const bookedBikes = data.bookedBikes;
  console.log(bookedBikes);
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

          <>
            {bookedBikes.length && (
              <BookedTrue
                bookedBikes={bookedBikes}
                posts={posts}
                handlePromotePost={handlePromotePost}
                handleDeletePost={handleDeletePost}
                handleSetAvailable={handleSetAvailable}
              />
            )}

            {!bookedBikes.length && (
              <BookedFalse
                bookedBikes={bookedBikes}
                posts={posts}
                handlePromotePost={handlePromotePost}
                handleDeletePost={handleDeletePost}
                handleSetAvailable={handleSetAvailable}
              />
            )}
          </>
        </table>
      </div>
      {/* table end */}
    </div>
  );
};

export default ManageProduct;


