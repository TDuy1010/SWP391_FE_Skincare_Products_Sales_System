import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import LoginPage from "../page/LoginPage/LoginPage" ;
import LangdingPage from "../page/LandingPage/LandingPage";
import AboutUsPage from "../page/AboutUsPage/AboutUsPage";
import BlogPage from "../page/BlogPage/BlogPage";
import CartPage from "../page/CartPage/CartPage";
import ShopPagce from "../page/ShopPage/ShopPagce";
import HelpPage from "../page/HelpPage/HelpPage";
import AdminPage from "../page/Admin/AdminPage";
import Payment from "../page/PaymentPage/Payment";
import ProfilePage from "../page/Profile/ProfilePage";
import ProductDetail from "../page/ProductPage/ProductDetail";
import UserManagement from "../page/Admin/User/UserManagement";
import Dashboard from "../page/Admin/Dashboard/Dashboard";
import OrderManagement from "../page/Admin/Order/OrderManagement";
import ProductManagement from "../page/Admin/Product/ProductManagement";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <LangdingPage />,
      },
      {
        path: "/login",
        element: <LoginPage/>
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

