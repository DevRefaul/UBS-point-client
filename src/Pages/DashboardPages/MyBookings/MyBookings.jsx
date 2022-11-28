import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import Error from "../../Error/Error";

const MyBookings = () => {
  const { user } = useContext(Authentication);
  const [loader, setLoader] = useState(false);

  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["sellerbookings"],
    queryFn: async () => {
      const res = await fetch(
        ` https://ubs-point-server-side.vercel.app/userbookings?email=${user.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const bookedData = await res.json();
      return bookedData;
    },
  });

  const updatingBookingValue = async (id) => {
    const res = await fetch(
      ` https://ubs-point-server-side.vercel.app/bikes/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ isBooked: "false" }),
      }
    );
    const updateResponse = await res.json();
    return updateResponse;
  };

  const handleDeleteBooking = async (id, postId) => {
    setLoader(true);
    const res = await fetch(
      ` https://ubs-point-server-side.vercel.app/deletebooking/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const deleteResponse = await res.json();

    if (deleteResponse.deletedResponse.deletedCount > 0) {
      toast.success("Booking Cancelled");
      updatingBookingValue(postId);
      refetch();
      setLoader(false);
    }
  };

  if (isLoading || loader) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const userBookings = bookings.bookedBikes;

  return (
    <div className="w-[98%] mx-auto">
      <div>
        <h2 className="text-3xl font-semibold text-center py-4">All Sellers</h2>

        {/* table start */}
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th></th>
                <th>Bike Image</th>
                <th>Bike Name</th>
                <th>Seller Email</th>
                <th>Price</th>
                <th>Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking, idx) => (
                <tr key={booking._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex justify-center">
                      <PhotoProvider>
                        <PhotoView src={booking.bikeInfo.imageURL}>
                          <img
                            src={booking.bikeInfo.imageURL}
                            alt=""
                            className="h-10 cursor-pointer"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </div>
                  </td>
                  <td>{booking.bikeInfo.bikeName}</td>
                  <td>{booking.bikeInfo.sellerMail}</td>

                  <td>{booking.bikeInfo.askingPrice}</td>

                  {/* pay section */}
                  <td>
                    {booking.isPaid === "false" ? (
                      <>
                        <Link
                          to={"/dashboard/payment"}
                          state={{ bookingData: booking }}
                        >
                          <p className="bg-red-400 text-white font-semibold text-center p-3 inline rounded">
                            Pay Now
                          </p>
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="bg-green-400 text-white font-semibold text-center p-3 inline rounded">
                          Paid
                        </p>
                      </>
                    )}
                  </td>

                  {/* pay section */}

                  {booking.isPaid === "false" ? (
                    <td className="flex justify-center">
                      <button
                        onClick={() =>
                          handleDeleteBooking(booking._id, booking.bikeInfo._id)
                        }
                        className="btn btn-warning"
                      >
                        Cancel Booking
                      </button>
                    </td>
                  ) : (
                    <>
                      <td>
                        <p>Order Closed</p>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* table end */}
      </div>
    </div>
  );
};

export default MyBookings;
