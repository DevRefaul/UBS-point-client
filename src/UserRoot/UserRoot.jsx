import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { Authentication } from "../Contexts/Auth/AuthContext";
import Error from "../Pages/Error/Error";

const UserRoot = ({ children }) => {
  const { user } = useContext(Authentication);

  const userEmail = user?.email;

  // passing email to server

  const { data, isLoading, error } = useQuery({
    queryKey: ["selleremail"],
    queryFn: async () => {
      const res = await fetch(
        ` https://ubs-point-server-side.vercel.app/user?email=${userEmail}`,
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
  if (error) {
    return <Error />;
  }

  const userInfo = data;
  const { role } = userInfo.result;

  if (role === "seller" || role === "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default UserRoot;
