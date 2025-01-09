import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import LoginPage from "../page/LoginPage/LoginPage" ;
import LangdingPage from "../page/LandingPage/LandingPage";

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
      }
    ],
  },
]);
