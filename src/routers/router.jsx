import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Homepage from "../page/Homepage";
import LangdingPage from "../page/LandingPage";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <LangdingPage />,
      },
    ],
  },
]);
