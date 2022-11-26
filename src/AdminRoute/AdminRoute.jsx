import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { Authentication } from "../Contexts/Auth/AuthContext";
import Error from "../Pages/Error/Error";

const AdminRoute = ({ children }) => {
  const { user } = useContext(Authentication);

  const userEmail = user?.email;

  const { data, isLoading, error } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/user?email=${userEmail}`);
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

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
