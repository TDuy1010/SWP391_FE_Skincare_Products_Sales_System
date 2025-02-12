
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  BarChartOutlined,
  GiftOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ handleLogout, collapsed, toggleCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/user',
      icon: <UserOutlined />,
      label: <Link to="/admin/user">User Management</Link>,
    },
    {
      key: '/admin/order',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/order">Order Management</Link>,
    },
    {
      key: '/admin/product',
      icon: <InboxOutlined />,
      label: <Link to="/admin/product">Products</Link>,
    },
    {
      key: '/admin/reports',
      icon: <BarChartOutlined />,
      label: <Link to="/admin/reports">Reports</Link>,
    },
    {
      key: '/admin/vouchers',
      icon: <GiftOutlined />,
      label: <Link to="/admin/vouchers">Vouchers</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      className: 'mt-auto',
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
        background: '#001529',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      {!collapsed && (
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white flex items-center">
              <div className="flex items-end">
                <span>SKYN</span>
                <span className="text-sm text-gray-400 ml-2 mb-1">ADMIN</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar; 