import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import LoginPage from "../page/LoginPage/LoginPage" ;
import LangdingPage from "../page/LandingPage/LandingPage";
import AboutUsPage from "../page/AboutUsPage/AboutUsPage";
import BlogPage from "../page/BlogPage/BlogPage";
import CartPage from "../page/CartPage/CartPage";
import ShopPagce from "../page/ShopPage/ShopPagce";
import HelpPage from "../page/HelpPage/HelpPage";

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
        element: <CartPage/>
      },
      {
        path: "/shop",
        element: <ShopPagce/>
      },
      {
        path: "/helps",
        element: <HelpPage/>
      }

    ],
  },
]);

