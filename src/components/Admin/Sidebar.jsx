/* eslint-disable react/prop-types */

import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  BarChartOutlined,
  GiftOutlined,
  LogoutOutlined,
  BookOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Sider } = Layout;

const Sidebar = ({ handleLogout, collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState("");
  const [visibleMenuItems, setVisibleMenuItems] = useState([]);

  // Lấy role từ localStorage khi component mount
  useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));
    if (adminUser && adminUser.role) {
      setUserRole(adminUser.role);
    } else {
      // Fallback nếu không tìm thấy trong adminUser
      const adminRole = localStorage.getItem("admin");
      if (adminRole) {
        setUserRole(adminRole);
      }
    }
  }, []);

  // Danh sách tất cả các menu item
  const allMenuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
      roles: ["ADMIN"], // Không hiển thị cho DELIVERY
    },
    {
      key: "/admin/user",
      icon: <UserOutlined />,
      label: <Link to="/admin/user">User Management</Link>,
      roles: ["ADMIN", "MANAGER"], // Chỉ ADMIN mới có quyền quản lý user
    },
    {
      key: "/admin/order",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/order">Order Management</Link>,
      roles: ["ADMIN", "STAFF", "MANAGER", "DELIVERY"], // Tất cả các role đều thấy
    },
    {
      key: "/admin/product",
      icon: <InboxOutlined />,
      label: <Link to="/admin/product">Products</Link>,
      roles: ["ADMIN", "STAFF", "MANAGER"], // STAFF chỉ xem, không thêm/sửa/xóa
    },
    {
      key: "/admin/category",
      icon: <InboxOutlined />,
      label: <Link to="/admin/category">Category Management</Link>,
      roles: ["ADMIN", "MANAGER"], // Chỉ ADMIN và MANAGER có quyền quản lý category
    },
    {
      key: "/admin/brand",
      icon: <BarChartOutlined />,
      label: <Link to="/admin/brand">Brand Management</Link>,
      roles: ["ADMIN", "MANAGER"], // Chỉ ADMIN và MANAGER có quyền quản lý brand
    },
    {
      key: "/admin/voucher",
      icon: <GiftOutlined />,
      label: <Link to="/admin/voucher">Vouchers</Link>,
      roles: ["ADMIN", "MANAGER"], // Chỉ ADMIN và MANAGER có quyền quản lý voucher
    },
    {
      key: "/admin/blog",
      icon: <BookOutlined />,
      label: <Link to="/admin/blog">Blog</Link>,
      roles: ["ADMIN", "STAFF", "MANAGER"], // STAFF được quản lý blog
    },
    {
      key: "/admin/quiz",
      icon: <QuestionCircleOutlined />,
      label: <Link to="/admin/quiz">Quiz</Link>,
      roles: ["ADMIN", "STAFF"], // STAFF được quản lý quiz
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      className: "mt-auto",
      danger: true,
      onClick: handleLogout,
      roles: ["ADMIN", "STAFF", "MANAGER", "DELIVERY"], // Tất cả đều có nút logout
    },
  ];

  // Lọc menu items dựa trên role
  useEffect(() => {
    if (userRole) {
      const filteredItems = allMenuItems.filter(
        (item) => item.roles && item.roles.includes(userRole)
      );
      setVisibleMenuItems(filteredItems);
    }
  }, [userRole]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        background: "#ffffff",
        height: "100vh",
        position: "fixed",
        left: 0,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="p-4 flex items-center justify-center">
        <div
          className={`transition-all duration-300 ease-in-out ${
            collapsed ? "w-12 h-12" : "w-full"
          }`}
        >
          {collapsed ? (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">S</span>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="flex items-end">
                  <span>SKYN</span>
                  <span className="text-sm text-gray-500 ml-2 mb-1">ADMIN</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {userRole && (
        <div className={`px-4 py-2 ${collapsed ? "text-center" : ""}`}>
          <span
            className={`text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full ${
              collapsed ? "hidden" : ""
            }`}
          >
            {userRole}
          </span>
        </div>
      )}

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={visibleMenuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;
