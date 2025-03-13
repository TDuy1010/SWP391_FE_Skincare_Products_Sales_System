import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import UserManagement from "../page/Admin/User/UserManagement";
import Dashboard from "../page/Admin/Dashboard/Dashboard";
import OrderManagement from "../page/Admin/Order/OrderManagement";
import ProductManagement from "../page/Admin/Product/ProductManagement";
import LandingPage from "../page/Customer/LandingPage/LandingPage";
import LoginModal from "../page/Customer/LoginPage/LoginPage";
import AboutUsPage from "../page/Customer/AboutUsPage/AboutUsPage";
import BlogPage from "../page/Customer/BlogPage/BlogPage";
import BlogDetail from "../page/Customer/BlogPage/BlogDetail";
import BlogDetailA from "../page/Admin/Blog/BlogDetail" // Đảm bảo import đúng
import CartPage from "../page/Customer/CartPage/CartPage";
import ShopPage from "../page/Customer/ShopPage/ShopPage";
import ProductDetail from "../page/Customer/ProductPage/ProductDetail";
import HelpPage from "../page/Customer/HelpPage/HelpPage";
import Payment from "../page/Customer/PaymentPage/Payment";
import ProfilePage from "../page/Customer/Profile/ProfilePage";
import AdminPage from "../page/Admin/AdminPage";
import LoginAdmin from "../page/Admin/LoginAdmin/LoginAdmin";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
import CategoryManagement from "../page/Admin/Category/CategoryManagement";
import AddProduct from "../page/Admin/Product/AddProduct";
import AddCategory from "../page/Admin/Category/AddCategory";
import EditCategory from "../page/Admin/Category/EditCategory";
import EditProduct from "../page/Admin/Product/EditProduct";
import BrandManagement from "../page/Admin/Brand/BrandManagement";
import EditBrand from "../page/Admin/Brand/EditBrand";
import AddBrand from "../page/Admin/Brand/AddBrand";
import ProductDetailAdmin from "../page/Admin/Product/ProductDetail";
import EditBlog from "../page/Admin/Blog/EditBlog";
import AddBlog from "../page/Admin/Blog/AddBlog";
import BlogManagement from "../page/Admin/Blog/BlogManagement";
import CategoryDetail from "../page/Admin/Category/CategoryDetail";
import BrandDetail from "../page/Admin/Brand/BrandDetail";
import VoucherManagement from "../page/Admin/Voucher/VoucherManagement";
import AddNewVoucher from "../page/Admin/Voucher/AddNewVoucher";
import EditVoucher from "../page/Admin/Voucher/EditVoucher";
import OrderSuccess from "../components/Order/OrderSuccess";
import OrderFailed from "../components/Order/OrderFailed";
import OrderDetail from "../page/Admin/Order/OrderDetail";
import AddUser from "../page/Admin/User/AddUser";
import EditUser from "../page/Admin/User/EditUser";

export const router = createBrowserRouter([
  //Customer
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginModal />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:id", // Thêm đường dẫn cho trang chi tiết blog
        element: <BlogDetail />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/category/:slug",
        element: <ShopPage />,
      },
      {
        path: "/shop/brand/:slug",
        element: <ShopPage />,
      },
      {
        path: "/product/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/helps",
        element: <HelpPage />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/order-failed",
        element: <OrderFailed />,
      },
      {
        path: "/payment-success",
        element: <OrderSuccess />,
      },
    ],
  },

  //Admin
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <LoginAdmin />,
      },
      {
        path: "",
        element: (
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "user",
            element: <UserManagement />,
          },
          {
            path: "user/add",
            element: <AddUser />,
          },
          {
            path: "user/edit/:id",
            element: <EditUser />,
          },
          {
            path: "order",
            element: <OrderManagement />,
          },
          {
            path: "order/:id",
            element: <OrderDetail />,
          },
          {
            path: "product",
            children: [
              {
                path: "",
                element: <ProductManagement />,
              },
              {
                path: "add",
                element: <AddProduct />,
              },
              {
                path: "edit/:id",
                element: <EditProduct />,
              },
              {
                path: "detail/:id",
                element: <ProductDetailAdmin />,
              },
            ],
          },

          {
            path: "category",
            element: <CategoryManagement />,
          },

          {
            path: "category/edit/:id",
            element: <EditCategory />,
          },
          {
            path: "category/add",
            element: <AddCategory />,
          },
          {
            path: "category/detail/:id",
            element: <CategoryDetail />,
          },
          {
            path: "brand",
            element: <BrandManagement />,
          },
          {
            path: "brand/edit/:id",
            element: <EditBrand />,
          },
          {
            path: "brand/add",
            element: <AddBrand />,
          },
          {
            path: "brand/detail/:id",
            element: <BrandDetail />,
          },
          {
            path: "blog",
            element: <BlogManagement />,
          },
          {
            path: "blog/detail/:id",
            element: <BlogDetailA/>
          },
          {
            path: "blog/edit/:id",
            element: <EditBlog />,
          },
          {
            path: "blog/add",
            element: <AddBlog />,
          },
          {
            path: "vouchers",
            element: <VoucherManagement />,
          },
          {
            path: "vouchers/add",
            element: <AddNewVoucher />,
          },
          {
            path: "vouchers/edit/:id",
            element: <EditVoucher />,
          },
        ],
      },
    ],
  },
]);
