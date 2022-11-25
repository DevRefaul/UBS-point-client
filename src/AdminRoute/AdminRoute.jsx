import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { Authentication } from "../Contexts/Auth/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading, handleSignOut } = useContext(Authentication);

  const userEmail = user?.email;

  const [userInfo, setUserInfo] = useState("");

  // passing email to server
  useEffect(() => {
    fetch(`http://localhost:5000/user?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data.result))
      .catch((err) => console.error(err.message));
  }, [userEmail]);

  const { role } = userInfo;

  console.log(userInfo);

  if (loading) {
    return <Loading />;
  }

  if (role !== "admin") {
    handleSignOut();
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
