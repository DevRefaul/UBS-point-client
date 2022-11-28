import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const BookedFalse = ({
  posts,
  handlePromotePost,
  handleDeletePost,
  handleSetAvailable,
}) => {
  return (
    <>
      {posts?.map((post, idx) => (
        <tbody key={post._id}>
          <tr className="h-full">
            {post && <th>{idx + 1}</th>}
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
                defaultValue={post.available}
                onChange={(e) => handleSetAvailable(post._id, e.target.value)}
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
        </tbody>
      ))}
    </>
  );
};

export default BookedFalse;

// !bookedBikes.length &&
