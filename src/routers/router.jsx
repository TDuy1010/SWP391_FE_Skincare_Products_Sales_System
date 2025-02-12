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
import CartPage from "../page/Customer/CartPage/CartPage";
import ShopPagce from "../page/Customer/ShopPage/ShopPagce";
import ProductDetail from "../page/Customer/ProductPage/ProductDetail";
import HelpPage from "../page/Customer/HelpPage/HelpPage";
import Payment from "../page/Customer/PaymentPage/Payment";
import ProfilePage from "../page/Customer/Profile/ProfilePage";
import AdminPage from "../page/Admin/AdminPage";

export const router = createBrowserRouter ([
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
        element: <LoginModal/>
      },
      {
        path: "/about-us",
        element: <AboutUsPage/>
      },
      {
        path: "/blog",
        element: <BlogPage/>
      },
      {
        path: "/cart",
        element: <CartPage/>,

      },
      {
        path: "/shop",
        element: <ShopPagce/>,
      },
      {
        path: "/product-detail",
        element: <ProductDetail/>
      },
      {
        path: "/helps",
        element: <HelpPage/>
      },

      {
        path:"/payment",
        element:<Payment/>
      },
      {
        path:"/profile",
        element:<ProfilePage/>
      }

    ],
  },
  {
    path :"/admin",
    element: <AdminPage/>,
    children: [
      {
        path: "",
        element: <Dashboard/>
      },
      {
        path: "user",
        element: <UserManagement/>
      },
      {
        path: "order",
        element: <OrderManagement/>
      },
      {
        path: "product",
        element: <ProductManagement/>
      }
    ]
  }
]);

