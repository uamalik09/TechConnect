import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log("Checking ProtectedRoute. User:", user);
  return user ? <Outlet /> : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
