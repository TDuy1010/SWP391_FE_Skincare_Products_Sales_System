/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập admin
  if (!adminUser?.token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Kiểm tra role (chỉ cho phép 'admin' và 'staff')
  const allowedRoles = ["admin", "staff"];
  if (!allowedRoles.includes(adminUser.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};
