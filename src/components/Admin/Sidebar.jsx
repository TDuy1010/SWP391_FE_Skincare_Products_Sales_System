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
  BookOutlined, // Import the new icon
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ handleLogout, collapsed, toggleCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/user",
      icon: <UserOutlined />,
      label: <Link to="/admin/user">User Management</Link>,
    },
    {
      key: "/admin/order",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/order">Order Management</Link>,
    },
    {
      key: "/admin/product",
      icon: <InboxOutlined />,
      label: <Link to="/admin/product">Products</Link>,
    },
    {
      key: "/admin/category",
      icon: <InboxOutlined />,
      label: <Link to="/admin/category">Category Management</Link>,
    },
    {
      key: "/admin/brand",
      icon: <BarChartOutlined />,
      label: <Link to="/admin/brand">Brand Management</Link>,
    },
    {
      key: "/admin/vouchers",
      icon: <GiftOutlined />,
      label: <Link to="/admin/vouchers">Vouchers</Link>,
    },
    {
      key: "/admin/blog",
      icon: <BookOutlined />, 
      label: <Link to="/admin/blog">Blog</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      className: "mt-auto",
      danger: true,
      onClick: handleLogout,
    },
  ];

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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
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

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;
