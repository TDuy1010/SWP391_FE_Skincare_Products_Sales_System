/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  const ALLOWED_ROLES = ["ADMIN", "STAFF", "MANAGER", "DELIVERY"];
  
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!ALLOWED_ROLES.includes(admin)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};