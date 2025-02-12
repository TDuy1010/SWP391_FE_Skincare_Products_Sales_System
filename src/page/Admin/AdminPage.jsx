import { FaShoppingCart } from 'react-icons/fa';
import { FaBoxOpen, FaUser } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { SlLogout, SlPresent } from 'react-icons/sl';
import { TbReportAnalytics } from 'react-icons/tb';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminPage = () => {

  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-slate-700">
        <div className="flex items-center mb-8">
          <div className="text-2xl font-bold text-white">SKYN</div>
          <div className="text-sm text-gray-400 ml-2">ADMIN</div>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin" className={`flex items-center ${location.pathname === '/admin' ? 'text-white' : 'text-gray-400'}`}>
                <MdDashboard className="mr-2"/>
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/user" className={`flex items-center ${location.pathname === '/admin/user' ? 'text-white' : 'text-gray-400'}`}>
                <FaUser className="mr-2"/>
                User management
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/order" className={`flex items-center ${location.pathname === '/admin/order' ? 'text-white' : 'text-gray-400'}`}>
                <FaShoppingCart className="mr-2"/>
                Order management
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/product" className={`flex items-center ${location.pathname === '/admin/product' ? 'text-white' : 'text-gray-400'}`}>
                <FaBoxOpen className="mr-2"/>
                Products
              </Link>
            </li>
            <li className="mb-4">
              <Link to="#" className="flex items-center text-gray-400">
                <TbReportAnalytics className="mr-2"/>
                Reports
              </Link>
            </li>
            <li className="mb-4">
              <Link to="#" className="flex items-center text-gray-400">
                <SlPresent className="mr-2"/>
                Vouchers
              </Link>
            </li>
            <li className="mt-8">
              <Link to="#" className="flex items-center text-gray-400 hover:text-white">
                <SlLogout className="mr-2"/>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-900">
        <Outlet/>
      </div>
    </div>
  );
}

export default AdminPage