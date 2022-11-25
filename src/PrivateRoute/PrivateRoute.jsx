import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { Authentication } from "../Contexts/Auth/AuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(Authentication);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
