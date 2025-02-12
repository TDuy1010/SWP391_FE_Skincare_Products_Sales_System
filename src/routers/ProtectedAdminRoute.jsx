/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

export const ProtectedAdminRoute = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem('adminUser'));
  
  if (!adminUser) {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập admin
    return <Navigate to="/admin/login" replace />;
  }

  // Kiểm tra role (nếu cần phân quyền admin và staff)
  if (adminUser.role !== 'admin' && adminUser.role !== 'staff') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}; 