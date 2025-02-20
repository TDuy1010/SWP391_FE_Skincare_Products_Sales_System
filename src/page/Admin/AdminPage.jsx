import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import AdminHeader from "../../components/Admin/Header";
import { logout } from "../../service/logout";

const { Content } = Layout;

const AdminPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  console.log("AdminPage Rendered, User:", adminUser); // ✅ Kiểm tra user có load đúng không

  const handleLogout = async () => {
    try {
      const token = adminUser?.token;
      if (token) {
        const response = await logout(token);
        if (!response.error) {
          localStorage.clear();
          navigate("/admin/login");
        } else {
          console.error("Lỗi đăng xuất:", response.message);
        }
      } else {
        localStorage.clear();
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      localStorage.clear();
      navigate("/admin/login");
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar
        handleLogout={handleLogout}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.2s",
          background: "#0f172a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminHeader
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          adminUser={adminUser}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            flex: 1,
            background: "#1e293b",
            borderRadius: 8,
            color: "#fff",
            overflow: "auto",
          }}
        >
          <Outlet /> {/* ✅ Đảm bảo Dashboard có thể hiển thị */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
