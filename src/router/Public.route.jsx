import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoutes = () => {
  const location = useLocation();
  const { token } = useAuth();
  return !token ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  );
};

export default PublicRoutes;
